"use client"

import { useState, useEffect } from "react"
import type { Project, ProjectsResponse } from "@/types/project"

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        const response = await fetch("https://api.gwapo.com.br/api/projects/author/Guilherme")

        if (!response.ok) {
          throw new Error("Failed to fetch projects")
        }

        const data: ProjectsResponse = await response.json()
        setProjects(data.projects)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
        console.error("Error fetching projects:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  return { projects, loading, error }
}
