"use client"

import { Code } from "lucide-react"
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
      skills: ["Development", "API", "Security"],
      technologies: ["Python", "Next.js", "Node.js", "MySQL", "Fastify", "Motion"],
      link_github: "https://github.com/Faccin27/Nyx---Stealthy-Remote-Access-Tool-RAT",
    },
    {
      title: "Full Stack Music App",
      image: "/music.png",
      description:
        "A complete music streaming application with user authentication, playlist management, and real-time playback features.",
      skills: ["API", "SPA", "Development", "restFull"],
      technologies: ["Vue", "TypeScript", "Electron", "Node.js"],
      link_github: "https://github.com/Faccin27",
      link_site: "https://music-app-demo.vercel.app",
    },
    {
      title: "Notice Day",
      image: "/noticeday.png",
      description: "A news website with options to like, comment, post news, job offers, events, and other items.",
      skills: ["API", "MVC", "Full Stack"],
      technologies: ["Handlebars", "Express.js", "MySQL", "Node.js"],
      link_github: "https://github.com/Faccin27/Portal_Noticias",
      link_site: "https://notice-day.herokuapp.com",
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
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <AnimatedSection animation="fadeUp">
          <div className="text-center mb-8">
            <h2 className={`text-4xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"} text-left`}>
              Featured Projects
            </h2>
          </div>
        </AnimatedSection>

        <div className="space-y-16">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
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

        <AnimatedSection animation="fadeUp">
          <div className="text-center mt-16">
            <a
              href="/projects"
              className={`inline-flex items-center gap-2 px-8 py-3 rounded-lg font-medium transition-all duration-300 ${
                isDarkMode
                  ? "bg-purple-500/20 text-purple-300 border border-purple-500/30 hover:bg-purple-500/30"
                  : "bg-purple-100 text-purple-700 border border-purple-200 hover:bg-purple-200"
              }`}
              onMouseEnter={isMuted ? undefined : playHoverSound}
              onClick={isMuted ? undefined : playClickSound}
            >
              View All Projects
              <Code size={20} />
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
