"use client"

import { useEffect, useState } from "react"
import { fetchGithub, getGithubStarsAndForks } from "@/lib/github"
import type { IGitHubProfileResponse } from "@/lib/interface"
import { Skeleton } from "@/components/ui/skeleton"
import { Users, Star, GitFork, GitPullRequestDraft } from "lucide-react"

export default function GitHubStats() {
  const [profileData, setProfileData] = useState<IGitHubProfileResponse | null>(null)
  const [starsAndForks, setStarsAndForks] = useState<{ githubStars: number; forks: number } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchGitHubData() {
      try {
        setLoading(true)
        const [profile, repoStats] = await Promise.all([fetchGithub(), getGithubStarsAndForks()])
        setProfileData(profile)
        setStarsAndForks(repoStats)
      } catch (err) {
        console.error("Error fetching GitHub data:", err)
        setError("Failed to load GitHub stats")
      } finally {
        setLoading(false)
      }
    }

    fetchGitHubData()
  }, [])

  if (loading) {
    return (
      <div className="py-4 font-sans">
        <h2 className="text-base font-semibold mb-2 text-[#24292f] dark:text-[#c9d1d9]">GitHub Stats</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-4 font-sans">
        <h2 className="text-base font-semibold mb-2 text-[#24292f] dark:text-[#c9d1d9]">GitHub Stats</h2>
        <div className="text-sm text-[#57606a] dark:text-[#8b949e]">{error}</div>
      </div>
    )
  }

  if (!profileData || !starsAndForks) {
    return (
      <div className="py-4 font-sans">
        <h2 className="text-base font-semibold mb-2 text-[#24292f] dark:text-[#c9d1d9]">GitHub Stats</h2>
        <div className="text-sm text-[#57606a] dark:text-[#8b949e]">No GitHub data available</div>
      </div>
    )
  }

  const stats = [
    {
      label: "Followers",
      value: profileData.followers.toLocaleString(),
      icon: Users,
    },
    {
      label: "Repos (private included)",
      value: Math.ceil(profileData.public_repos + (profileData.public_repos / 0.8)).toLocaleString(),
      icon: GitPullRequestDraft,
    },
    {
      label: "Stars",
      value: starsAndForks.githubStars.toLocaleString(),
      icon: Star,
    },
    {
      label: "Forks",
      value: starsAndForks.forks.toLocaleString(),
      icon: GitFork,
    },
  ]

  return (
    <div className="py-4 font-sans justify-center w-4/5 mx-auto rounded-2xl border transition-all duration-300 relative z-10 bg-zinc-800/80 border-white/10 px-12 mb-4">
      <h2 className="text-base font-semibold mb-2 text-[#24292f] dark:text-[#c9d1d9]">GitHub Stats</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col p-3 border border-[#d0d7de] dark:border-[#30363d] rounded-md bg-white dark:bg-[#0d1117]"
          >
            <div className="flex items-center gap-2 mb-1">
              <stat.icon className="h-4 w-4 text-[#57606a] dark:text-[#8b949e]" />
              <span className="text-xs text-[#57606a] dark:text-[#8b949e]">{stat.label}</span>
            </div>
            <div className="text-xl font-semibold text-[#24292f] dark:text-[#c9d1d9]">{stat.value}</div>
          </div>
        ))}
        
      </div>
    </div>
    
  )
}
