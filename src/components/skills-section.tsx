"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import AnimatedSection from "@/components/animatedsection"

interface SkillsSectionProps {
  isDarkMode: boolean
  isMuted: boolean
  playHoverSound: () => void
  playClickSound: () => void
}

export default function SkillsSection({ isDarkMode, isMuted, playHoverSound, playClickSound }: SkillsSectionProps) {
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
    <AnimatedSection className="mt-16" animation="fadeUp">
      <h2 id="skills" className={`text-3xl font-bold mb-8 ${isDarkMode ? "text-white" : "text-gray-900"}`}>My Skills</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-8 gap-4 relative z-10">
        {skills.map((skill, index) => (
          <AnimatedSection key={index} animation={index % 2 === 0 ? "fadeLeft" : "fadeRight"}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className={`relative p-4 rounded-2xl border transition-all duration-300 ${
                isDarkMode
                  ? "bg-black/20 border-white/10 hover:border-white/20"
                  : "bg-slate-300/80 border-gray-200 hover:border-gray-300"
              }`}
              onMouseEnter={isMuted ? undefined : playHoverSound}
              onClick={isMuted ? undefined : playClickSound}
            >
              <div className="flex items-center gap-3">
                <div className="relative w-7 h-7">
                  <Image
                    src={skill.icon || "/placeholder.svg"}
                    alt={skill.name}
                    layout="fill"
                    objectFit="contain"
                    className="transition-transform duration-300"
                  />
                </div>
                <span className={`text-sm font-bold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  {skill.name}
                </span>
              </div>
            </motion.div>
          </AnimatedSection>
        ))}
      </div>
    </AnimatedSection>
  )
}
