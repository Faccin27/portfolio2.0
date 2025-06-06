import {
  IContributionCalendar,
  IContributionCountByDay,
  IContributionDay,
  IGitHubProfileResponse,
  IGitHubRepositoriesAPIResponse,
  IUserContributionDetails,
  IWeek,
} from "./interface";

import { GithubRepo } from "./types";
import moment from "moment";

const headers = new Headers({
  Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
});

// its for /api/stats/github
export async function fetchGithub(): Promise<IGitHubProfileResponse> {
  const requestOptions: RequestInit = {
    method: "GET",
    headers,
  };

  try {
    const response = await fetch(
      "https://api.github.com/users/Faccin27",
      requestOptions
    );
    if (!response.ok) {
      throw new Error("Error fetching GitHub data: " + response.statusText);
    }
    const data = await response.json(); // Await the JSON promise
    return data as IGitHubProfileResponse;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/* Retrieves the number of stars and forks for the user's repositories on GitHub. */
export async function getGithubStarsAndForks() {
  try {
    // Fetch user's repositories from the GitHub API
    const res = await fetch(
      "https://api.github.com/users/Faccin27/repos?per_page=100",
      { headers }
    );
    const userRepos: IGitHubRepositoriesAPIResponse[] = await res.json();

    // filter those repos that are not forked
    const mineRepos: GithubRepo[] = userRepos.filter(
      (repo: GithubRepo) => !repo.fork
    );

    // Calculate the total number of stars for the user's repositories
    const githubStars = mineRepos.reduce(
      (accumulator: number, repository: GithubRepo) => {
        return accumulator + repository["stargazers_count"];
      },
      0
    );

    // Calculate the total number of forks for the user's repositories
    const forks = mineRepos.reduce(
      (accumulator: number, repository: GithubRepo) => {
        return accumulator + repository["forks_count"];
      },
      0
    );
    return { githubStars, forks };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// function to calculate actual commits streak
export function calculateCurrentStreak(
  contributions: IContributionDay[]
): number {
  const sorted = [...contributions].sort((a, b) =>
    moment(b.date).diff(moment(a.date))
  );

  let streak = 0;
  let currentDate = moment().startOf("day");

  for (const day of sorted) {
    const dayDate = moment(day.date).startOf("day");

    if (dayDate.isSame(currentDate)) {
      if (day.contributionCount > 0) {
        streak++;
        currentDate.subtract(1, "day");
      } else {
        break;
      }
    } else if (dayDate.isSame(currentDate.clone().subtract(1, "day"))) {
      if (day.contributionCount > 0) {
        streak++;
        currentDate.subtract(1, "day");
      } else {
        break;
      }
    } else if (dayDate.isBefore(currentDate)) {
      break;
    }
  }
  return streak;
}

export function calculateLongestStreak(contributions: IContributionDay[]): number {
  const sorted = [...contributions].sort((a, b) =>
    moment(a.date).diff(moment(b.date))
  );

  let maxStreak = 0;
  let currentStreak = 0;
  let prevDate: moment.Moment | null = null;

  for (const day of sorted) {
    const dayDate = moment(day.date).startOf("day");

    if (day.contributionCount > 0) {
      if (prevDate && dayDate.diff(prevDate, "days") === 1) {
        currentStreak++;
      } else {
        currentStreak = 1;
      }

      maxStreak = Math.max(maxStreak, currentStreak);
    } else {
      currentStreak = 0;
    }

    prevDate = dayDate;
  }

  return maxStreak;
}

export async function getGithubContribution(year?: number) {
  const now = moment();
  let from;
  // também inclui o próximo dia caso nosso servidor esteja com o tempo atrasado em relação ao GitHub
  let to;
  if (year) {
    // If year is provided, get contributions for that specific year
    from = moment().year(year).startOf("year").utc().toISOString();
    to = moment().year(year).endOf("year").utc().toISOString();
  } else {
    // Default to last 367 days
    from = moment(now).subtract(367, "days").utc().toISOString();
    // also include the next day in case our server is behind in time with respect to GitHub
    to = moment(now).add(1, "days").utc().toISOString();
  }

  const q = {
    query: `
                query userInfo($LOGIN: String!, $FROM: DateTime!, $TO: DateTime!) {
                  user(login: $LOGIN) {
                    name
                    contributionsCollection(from: $FROM, to: $TO) {
                      contributionCalendar {
                        weeks {
                          contributionDays {
                            contributionCount
                            date
                          }
                        }
                      }
                    }
                  }
                }
              `,
    variables: {
      LOGIN: "Faccin27",
      FROM: from,
      TO: to,
    },
  };

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    body: JSON.stringify(q),
    headers,
  });
  const apiResponse = await response.json();

  const userData: IUserContributionDetails = {
    contributions: [],
    name: apiResponse.data.user.name,
  };

  const weeks =
    apiResponse.data.user.contributionsCollection.contributionCalendar.weeks;
  weeks.map((week: IWeek) =>
    week.contributionDays.map((contributionDay: IContributionDay) => {
      contributionDay.shortDate = moment(contributionDay.date, moment.ISO_8601)
        .date()
        .toString();
      userData.contributions.push(contributionDay);
    })
  );

  const contributionCountByDayOfWeek = calculateMostProductiveDayOfWeek(
    apiResponse.data.user.contributionsCollection.contributionCalendar
  );

  return { ...userData, contributionCountByDayOfWeek };
}

// Function to calculate the productive data by days
function calculateMostProductiveDayOfWeek(
  contributionCalendar: IContributionCalendar
): { day: string; count: number }[] {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const contributionCountByDayOfWeek: IContributionCountByDay = {
    Sunday: 0,
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
  };

  for (const week of contributionCalendar.weeks) {
    for (const day of week.contributionDays) {
      const date = new Date(day.date);
      const dayOfWeek = daysOfWeek[date.getUTCDay()];
      contributionCountByDayOfWeek[dayOfWeek] += day.contributionCount;
    }
  }

  const sortedData = Object.entries(contributionCountByDayOfWeek)
    .sort((a, b) => daysOfWeek.indexOf(a[0]) - daysOfWeek.indexOf(b[0]))
    .map(([day, count]) => ({ day, count }));

  const sunday = sortedData.shift();

  if (sunday) {
    sortedData.push(sunday);
  }

  return sortedData;
}
