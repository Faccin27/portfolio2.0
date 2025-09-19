import type { Project } from "@/types/project"

// Map API project to component format
export function mapProjectToCard(project: Project) {
  return {
    title: project.title,
    image: project.images[0] || "/placeholder.svg",
    description: project.description,
    skills: ["Development", "API", "Full Stack"], // Default skills, can be enhanced later
    technologies: project.technologies,
    link_github: `https://github.com/Faccin27/${project.slug}`, // Assuming GitHub pattern
    link_site: project.url,
    category: "web", // Default category, can be enhanced later
    featured: true, // All projects are featured for now
  }
}

// Determine project category based on technologies
export function getProjectCategory(technologies: string[]): string {
  const webTechs = ["Next.js", "React", "Vue", "HTML", "CSS", "JavaScript", "TypeScript"]
  const desktopTechs = ["Electron", "Python", "C++", "Java"]
  const apiTechs = ["Node.js", "Express", "Fastify", "API"]

  if (technologies.some((tech) => desktopTechs.includes(tech))) return "desktop"
  if (technologies.some((tech) => apiTechs.includes(tech)) && !technologies.some((tech) => webTechs.includes(tech)))
    return "api"
  return "web"
}

// Generate skills based on technologies and description
export function generateSkills(project: Project): string[] {
  const skills = new Set<string>()

  // Add default skills
  skills.add("Development")

  // Add skills based on technologies
  if (project.technologies.some((tech) => ["Node.js", "Express", "Fastify"].includes(tech))) {
    skills.add("API")
  }

  if (project.technologies.some((tech) => ["React", "Vue", "Next.js"].includes(tech))) {
    skills.add("SPA")
  }

  if (project.technologies.some((tech) => ["MySQL", "PostgreSQL", "MongoDB"].includes(tech))) {
    skills.add("Database")
  }

  // Add Full Stack if both frontend and backend technologies are present
  const frontendTechs = ["React", "Vue", "Next.js", "HTML", "CSS"]
  const backendTechs = ["Node.js", "Express", "Fastify", "Python"]

  if (
    project.technologies.some((tech) => frontendTechs.includes(tech)) &&
    project.technologies.some((tech) => backendTechs.includes(tech))
  ) {
    skills.add("Full Stack")
  }

  return Array.from(skills)
}
