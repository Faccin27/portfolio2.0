"use client"

import { useEffect, useState } from "react"
import { getGithubContribution } from "@/lib/github"
import type { IContributionDay, IUserContributionDetails } from "@/lib/interface"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Skeleton } from "@/components/ui/skeleton"

interface GitHubContributionsCalendarProps {
  isDarkMode: boolean
  isMuted: boolean
  playHoverSound: () => void
  playClickSound: () => void
}

export default function GitHubContributionsCalendar({
  isDarkMode,
  isMuted,
  playHoverSound,
}: GitHubContributionsCalendarProps) {
  // 1. Add useState for year selection at the top of the component
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())
  const [contributionData, setContributionData] = useState<IUserContributionDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 2. Modify the useEffect to include selectedYear as a dependency and pass it to getGithubContribution
  useEffect(() => {
    async function fetchContributions() {
      try {
        setLoading(true)
        const data = await getGithubContribution(selectedYear)
        setContributionData(data)
      } catch (err) {
        console.error("Error fetching GitHub contributions:", err)
        setError("Failed to load GitHub contributions")
      } finally {
        setLoading(false)
      }
    }

    fetchContributions()
  }, [selectedYear])

  // Function to determine the color based on contribution count - GitHub exact colors
  const getContributionColor = (count: number) => {
    if (isDarkMode) {
      if (count === 0) return "bg-[#161b22]"
      if (count < 5) return "bg-[#0e4429]"
      if (count < 10) return "bg-[#006d32]"
      if (count < 15) return "bg-[#26a641]"
      return "bg-[#39d353]"
    } else {
      if (count === 0) return "bg-[#ebedf0]"
      if (count < 5) return "bg-[#9be9a8]"
      if (count < 10) return "bg-[#40c463]"
      if (count < 15) return "bg-[#30a14e]"
      return "bg-[#216e39]"
    }
  }

  // Format date for tooltip
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Group contributions by week
  const groupByWeek = (contributions: IContributionDay[]) => {
    const weeks: IContributionDay[][] = []
    let currentWeek: IContributionDay[] = []

    // Sort contributions by date
    const sortedContributions = [...contributions].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    )

    // Get the day of the week for the first contribution (0 = Sunday, 1 = Monday, etc.)
    const firstDay = new Date(sortedContributions[0]?.date || new Date()).getDay()

    // Add empty cells for days before the first contribution
    for (let i = 0; i < firstDay; i++) {
      currentWeek.push({
        contributionCount: 0,
        date: "",
        shortDate: "",
      })
    }

    // Group contributions into weeks
    sortedContributions.forEach((contribution) => {
      const dayOfWeek = new Date(contribution.date).getDay()

      if (dayOfWeek === 0 && currentWeek.length > 0) {
        weeks.push(currentWeek)
        currentWeek = []
      }

      currentWeek.push(contribution)

      if (currentWeek.length === 7) {
        weeks.push(currentWeek)
        currentWeek = []
      }
    })

    // Add the last week if it's not complete
    if (currentWeek.length > 0) {
      weeks.push(currentWeek)
    }

    return weeks
  }

  // Get month labels for the top of the calendar
  const getMonthLabels = (contributions: IContributionDay[]) => {
    if (!contributions.length) return []

    const sortedContributions = [...contributions].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    )

    const firstDate = new Date(sortedContributions[0].date)
    const lastDate = new Date(sortedContributions[sortedContributions.length - 1].date)

    const months = []
    const currentDate = new Date(firstDate)
    currentDate.setDate(1) // Start from the 1st of the month

    while (currentDate <= lastDate) {
      months.push({
        name: currentDate.toLocaleDateString("en-US", { month: "short" }),
        year: currentDate.getFullYear(),
        index: currentDate.getMonth(),
        firstDay: new Date(currentDate).getDay(),
      })

      currentDate.setMonth(currentDate.getMonth() + 1)
    }

    return months
  }

  if (loading) {
    return (
      <div className="py-4 font-sans">
        <h2 className="text-base font-semibold mb-2 text-[#24292f] dark:text-[#c9d1d9]">
          {contributionData?.name || "Your"} contributions
        </h2>
        <Skeleton className="h-[112px] w-full" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-4 font-sans">
        <h2 className="text-base font-semibold mb-2 text-[#24292f] dark:text-[#c9d1d9]">
          {contributionData?.name || "Your"} contributions
        </h2>
        <div className="text-sm text-[#57606a] dark:text-[#8b949e]">{error}</div>
      </div>
    )
  }

  if (!contributionData || !contributionData.contributions || contributionData.contributions.length === 0) {
    return (
      <div className="py-4 font-sans">
        <h2 className="text-base font-semibold mb-2 text-[#24292f] dark:text-[#c9d1d9]">
          {contributionData?.name || "Your"} contributions
        </h2>
        <div className="text-sm text-[#57606a] dark:text-[#8b949e]">No contribution data available</div>
      </div>
    )
  }

  const weeks = groupByWeek(contributionData.contributions)
  const months = getMonthLabels(contributionData.contributions)

  // Calculate total contributions
  const totalContributions = contributionData.contributions.reduce((sum, day) => sum + day.contributionCount, 0)

  // 3. Replace the return statement with the updated version that includes all requested changes
  return (
    <div className={`py-4 font-sans container mx-auto px-4`}>
      <div
        className={`w-full sm:w-11/12 md:w-4/5 mx-auto rounded-2xl border transition-all duration-300 relative z-10 ${
          isDarkMode ? "bg-zinc-800/80 border-white/10" : "bg-slate-300/80 border-gray-200"
        }`}
      >
        <div className="p-6 md:p-8 max-w-[930px] w-full mx-auto">
          <div className="flex items-center justify-between mb-2">
            <h2 className={`text-base font-semibold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              {totalContributions} contributions in the last year
            </h2>

            {/* Year selector */}
            <div className="relative">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                onMouseEnter={isMuted ? undefined : playHoverSound}
                className={`appearance-none border rounded-md px-3 py-1 pr-8 text-sm cursor-pointer ${
                  isDarkMode
                    ? "bg-zinc-700/80 border-white/20 text-white"
                    : "bg-slate-200/80 border-gray-300 text-gray-900"
                }`}
              >
                {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg width="10" height="10" fill="currentColor" className="text-[#57606a] dark:text-[#8b949e]">
                  <path d="M6 8.825c-.2 0-.4-.1-.5-.2l-3.3-3.3c-.3-.3-.3-.8 0-1.1.3-.3.8-.3 1.1 0l2.7 2.7 2.7-2.7c.3-.3.8-.3 1.1 0 .3.3.3.8 0 1.1l-3.3 3.3c-.1.1-.3.2-.5.2Z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-max">
              {/* Month labels */}
              <div className={`flex mb-1 text-xs h-5 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                <div className="w-[30px]"></div> {/* Increased width for day labels */}
                <div className="flex-1 flex">
                  {months.map((month, i) => (
                    <div
                      key={`${month.name}-${i}`}
                      className="flex-shrink-0"
                      style={{
                        paddingRight: "40px", // Increased padding
                      }}
                    >
                      {month.name}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex">
                {/* Day of week labels */}
                <div className="flex flex-col justify-between text-xs text-[#57606a] dark:text-[#8b949e] pr-4 pt-1 w-[30px] text-center">
                  <div className="h-[15px]">M</div>
                  <div className="h-[15px]"></div>
                  <div className="h-[15px]">W</div>
                  <div className="h-[15px]"></div>
                  <div className="h-[15px]">F</div>
                  <div className="h-[15px]"></div>
                  <div className="h-[15px]"></div>
                </div>

                {/* Contribution grid */}
                <div className="flex">
                  <TooltipProvider>
                    {weeks.map((week, weekIndex) => (
                      <div key={weekIndex} className="flex flex-col gap-[2px] mr-[2px] ">
                        {week.map((day, dayIndex) => (
                          <Tooltip key={`${weekIndex}-${dayIndex}`}>
                            <TooltipTrigger asChild>
                              <div
                                onMouseEnter={day.date && !isMuted ? playHoverSound : undefined}
                                className={`w-[12px] h-[12px] rounded-sm ${
                                  day.date ? getContributionColor(day.contributionCount) : "bg-transparent"
                                }`}
                              />
                            </TooltipTrigger>
                            {day.date && (
                              <TooltipContent
                                side="top"
                                className={`text-xs p-2 ${
                                  isDarkMode
                                    ? "bg-zinc-700 text-white border-zinc-600"
                                    : "bg-white text-gray-900 border-gray-200"
                                }`}
                              >
                                <div>
                                  <p className="font-medium">{day.contributionCount} contributions</p>
                                  <p className="text-[#8b949e] dark:text-[#57606a]">{formatDate(day.date)}</p>
                                </div>
                              </TooltipContent>
                            )}
                          </Tooltip>
                        ))}
                      </div>
                    ))}
                  </TooltipProvider>
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center justify-end mt-2 text-xs">
                <span className={`mr-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Less</span>
                <div className="flex gap-[2px] items-center">
                  <div className={`w-[12px] h-[12px] rounded-sm ${isDarkMode ? "bg-[#161b22]" : "bg-[#ebedf0]"}`} />
                  <div className={`w-[12px] h-[12px] rounded-sm ${isDarkMode ? "bg-[#0e4429]" : "bg-[#9be9a8]"}`} />
                  <div className={`w-[12px] h-[12px] rounded-sm ${isDarkMode ? "bg-[#006d32]" : "bg-[#40c463]"}`} />
                  <div className={`w-[12px] h-[12px] rounded-sm ${isDarkMode ? "bg-[#26a641]" : "bg-[#30a14e]"}`} />
                  <div className={`w-[12px] h-[12px] rounded-sm ${isDarkMode ? "bg-[#39d353]" : "bg-[#216e39]"}`} />
                </div>
                <span className={`ml-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>More</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
