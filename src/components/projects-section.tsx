"use client"

import { Code, Globe } from "lucide-react"
import AnimatedSection from "@/components/animatedsection"
import ProjectCard from "@/components/project-card"

interface ProjectsSectionProps {
  isDarkMode: boolean
  isMuted: boolean
  playHoverSound: () => void
  playClickSound: () => void
}

export default function ProjectsSection({ isDarkMode, isMuted, playHoverSound, playClickSound }: ProjectsSectionProps) {
  const projects = [
    {
      title: "Nyx RAT",
      image: "/nyx.png",
      description:
        "A remote access trojan with stealing and additional features, fully controlled through your browser, and it also supports Discord webhooks.",
      skills: ["Development", "API"],
      technologies: ["Python", "Next.js", "Node.js", "MySQL", "Fastify", "Motion"],
      icon: Code,
      link: "https://github.com/Faccin27/Nyx---Stealthy-Remote-Access-Tool-RAT",
    },
    {
      title: "Full stack music app",
      image: "/music.png",
      description:
        "A complete music streaming application with user authentication, playlist management, and real-time playback features.",
      skills: ["API", "SPA", "Development", "restFull"],
      technologies: ["Vue", "TypeScript", "Electron"],
      icon: Globe,
      link: "https://github.com/Faccin27",
    },
    {
      title: "Notice day",
      image: "/noticeday.png",
      description: "A news website with options to like, comment, post news, job offers, events, and other items.",
      skills: ["API", "MVC"],
      technologies: ["Handlebars", "Express.js", "MySQL", "Node.js"],
      icon: Code,
      link: "https://github.com/Faccin27/Portal_Noticias",
    },
  ]

  const skills = [
    { name: "HTML5", icon: "/assets/svgs/html.svg" },
    { name: "CSS3", icon: "/assets/svgs/css.svg" },
    { name: "Bootstrap", icon: "/assets/svgs/bootstrap.svg" },
    { name: "Tailwind CSS", icon: "/assets/svgs/tailwindcss.svg" },
    { name: "JavaScript", icon: "/assets/svgs/javascript.svg" },
    { name: "TypeScript", icon: "/assets/svgs/typescript.svg" },
    { name: "Vue", icon: "/assets/svgs/vue.svg" },
    { name: "React", icon: "/assets/svgs/react.svg" },
    { name: "Next.js", icon: "/assets/svgs/nextjs.svg" },
    { name: "Electron", icon: "/assets/svgs/electron.svg" },
    { name: "Motion", icon: "/assets/svgs/motion.svg" },
    { name: "Node.js", icon: "/assets/svgs/nodejs.svg" },
    { name: "Express.js", icon: "/assets/svgs/express.svg" },
    { name: "Fastify", icon: "/assets/svgs/fastify.svg" },
    { name: "Prisma", icon: "/assets/svgs/prisma.svg" },
    { name: "Handlebars", icon: "/assets/svgs/handlebars.svg" },
    { name: "PostgreSQL", icon: "/assets/svgs/postgresql.svg" },
    { name: "MySQL", icon: "/assets/svgs/mysql.svg" },
    { name: "Python", icon: "/assets/svgs/python.svg" },
    { name: "Git", icon: "/assets/svgs/git.svg" },
    { name: "GitHub", icon: "/assets/svgs/github.svg" },
    { name: "Postman", icon: "/assets/svgs/postman.svg" },
    { name: "Insomnia", icon: "/assets/svgs/insomnia.svg" },
    { name: "Figma", icon: "/assets/svgs/figma.svg" },
  ]

  return (
    <AnimatedSection className="mt-16" animation="fadeLeft">
      <h2 className={`text-3xl font-bold mb-8 ${isDarkMode ? "text-white" : "text-gray-900"}`}>Featured Projects</h2>
      <div className="space-y-16">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            project={project}
            skills={skills}
            index={index}
            isDarkMode={isDarkMode}
            isMuted={isMuted}
            playHoverSound={playHoverSound}
            playClickSound={playClickSound}
          />
        ))}
      </div>
    </AnimatedSection>
  )
}
