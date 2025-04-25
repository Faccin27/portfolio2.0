"use client";

import { useEffect, useState } from "react";
import {
  fetchGithub,
  getGithubStarsAndForks,
  getGithubContribution,
  calculateLongestStreak,
} from "@/lib/github";
import type { IGitHubProfileResponse, IContributionDay } from "@/lib/interface";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, Star, GitPullRequestDraft, Flame, Github } from "lucide-react";

interface GitHubStatsProps {
  isDarkMode: boolean;
  isMuted: boolean;
  playHoverSound: () => void;
  playClickSound: () => void;
}

export default function GitHubStats({
  isDarkMode,
  isMuted,
  playHoverSound,
  playClickSound,
}: GitHubStatsProps) {
  const [profileData, setProfileData] = useState<IGitHubProfileResponse | null>(
    null
  );
  const [starsAndForks, setStarsAndForks] = useState<{
    githubStars: number;
    forks: number;
  } | null>(null);
  const [contributionData, setContributionData] = useState<{
    contributions: IContributionDay[];
  } | null>(null);
  const [longestStreak, setLongestStreak] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGitHubData() {
      try {
        setLoading(true);
        const [profile, repoStats, contributions] = await Promise.all([
          fetchGithub(),
          getGithubStarsAndForks(),
          getGithubContribution(),
        ]);
        setProfileData(profile);
        setStarsAndForks(repoStats);
        setContributionData(contributions);

        if (contributions && contributions.contributions) {
          const streak = calculateLongestStreak(contributions.contributions);
          setLongestStreak(streak);
        }
      } catch (err) {
        console.error("Error fetching GitHub data:", err);
        setError("Failed to load GitHub stats");
      } finally {
        setLoading(false);
      }
    }

    fetchGitHubData();
  }, []);

  if (loading) {
    return (
      <div className="py-4 font-sans container mx-auto px-4">
        <div
          className={`w-full sm:w-11/12 md:w-4/5 mx-auto rounded-2xl border transition-all duration-300 relative z-10 ${
            isDarkMode
              ? "bg-zinc-800/80 border-white/10"
              : "bg-slate-300/80 border-gray-200"
          }`}
        >
          <div className="p-6 md:p-8">
            <h2
              className={`text-xl font-semibold ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              GitHub Stats
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Skeleton className="h-16" />
              <Skeleton className="h-16" />
              <Skeleton className="h-16" />
              <Skeleton className="h-16" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-4 font-sans container mx-auto px-4">
        <div
          className={`w-full sm:w-11/12 md:w-4/5 mx-auto rounded-2xl border transition-all duration-300 relative z-10 ${
            isDarkMode
              ? "bg-zinc-800/80 border-white/10"
              : "bg-slate-300/80 border-gray-200"
          }`}
        >
          <div className="p-6 md:p-8">
            <h2
              className={`text-xl font-semibold mb-4 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              GitHub Stats
            </h2>
            <div
              className={`text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {error}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!profileData || !starsAndForks) {
    return (
      <div className="py-4 font-sans container mx-auto px-4">
        <div
          className={`w-full sm:w-11/12 md:w-4/5 mx-auto rounded-2xl border transition-all duration-300 relative z-10 ${
            isDarkMode
              ? "bg-zinc-800/80 border-white/10"
              : "bg-slate-300/80 border-gray-200"
          }`}
        >
          <div className="p-6 md:p-8">
            <h2
              className={`text-xl font-semibold mb-4 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              GitHub Stats
            </h2>
            <div
              className={`text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              No GitHub data available
            </div>
          </div>
        </div>
      </div>
    );
  }

  const stats = [
    {
      label: "Followers",
      value: profileData.followers.toLocaleString(),
      icon: Users,
    },
    {
      label: "Repos (private included)",
      value: Math.ceil(
        profileData.public_repos + profileData.public_repos / 0.8
      ).toLocaleString(),
      icon: GitPullRequestDraft,
    },
    {
      label: "Stars",
      value: starsAndForks.githubStars.toLocaleString(),
      icon: Star,
    },
    {
      label: "Longest Streak",
      value: longestStreak.toLocaleString(),
      icon: Flame,
    },
  ];

  return (
    <div className="py-4 font-sans container mx-auto px-4" id="github">
      <div
        className={`w-full sm:w-11/12 md:w-4/5 mx-auto rounded-2xl border transition-all duration-300 relative z-10 ${
          isDarkMode
            ? "bg-zinc-800/80 border-white/10"
            : "bg-slate-300/80 border-gray-200"
        }`}
      >
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-center">
            <h2
              className={`text-xl font-semibold mb-4 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              GitHub Stats
            </h2>
            <a
              onMouseEnter={isMuted ? undefined : playHoverSound}
              onClick={isMuted ? undefined : playClickSound}
              href="https://github.com/Faccin27"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github
                className={`h-5 w-5 text-xl font-semibold mb-4 text-zinc-500 ${
                  isDarkMode ? "hover:text-purple-400" : "hover:text-purple-600"
                }`}
              />
            </a>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                onMouseEnter={isMuted ? undefined : playHoverSound}
                onClick={isMuted ? undefined : playClickSound}
                className={`flex flex-col p-4 rounded-xl transition-all duration-300 hover:shadow-md ${
                  isDarkMode
                    ? "bg-zinc-700/80 border border-white/10 hover:bg-zinc-600/80"
                    : "bg-white/80 border border-gray-200 hover:bg-gray-50/80"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <stat.icon
                    className={`h-5 w-5  ${
                      isDarkMode ? "text-purple-400" : "text-purple-600"
                    }`}
                  />
                  <span
                    className={`text-xs ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {stat.label}
                  </span>
                </div>
                <div
                  className={`text-xl font-semibold px-[2px] ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
