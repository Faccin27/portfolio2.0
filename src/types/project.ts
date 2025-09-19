export interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  images: string[]
  author: string
  slug: string
  url?: string
  createdAt: string
  updatedAt: string
}

export interface ProjectsResponse {
  author: string
  projects: Project[]
  total: number
}
