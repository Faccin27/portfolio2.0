"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Github, Globe } from "lucide-react"
import AnimatedSection from "@/components/animatedsection"

interface Skill {
  name: string
  icon: string
}

interface ProjectCardProps {
  project: {
    title: string
    image: string
    description: string
    skills: string[]
    technologies: string[]
    link_github?: string
    link_site?: string
  }
  skills: Skill[]
  index: number
  isDarkMode: boolean
  isMuted: boolean
  playHoverSound: () => void
  playClickSound: () => void
}

export default function ProjectCard({
  project,
  skills,
  index,
  isDarkMode,
  isMuted,
  playHoverSound,
  playClickSound,
}: ProjectCardProps) {
  return (
    <AnimatedSection animation={index % 2 === 0 ? "fadeRight" : "fadeLeft"}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8`}
      >
        <div className="w-full md:w-1/2">
          <div
            className={`group rounded-xl overflow-hidden ${
              isDarkMode ? "bg-zinc-800/50" : "bg-slate-300/70"
            } backdrop-blur-sm border ${isDarkMode ? "border-white/10" : "border-gray-200"}`}
          >
            <div className="relative aspect-video overflow-hidden" onClick={isMuted ? undefined : playClickSound}>
              <Image src={project.image || "/placeholder.svg"} alt={project.title} layout="fill" objectFit="cover" />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3
                  className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}
                  onMouseEnter={isMuted ? undefined : playHoverSound}
                >
                  {project.title}
                </h3>
                <div className="flex gap-2">
                  {project.link_github && (
                    <Link
                      href={project.link_github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={isMuted ? undefined : playHoverSound}
                      onClick={isMuted ? undefined : playClickSound}
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className={`p-2 rounded-full ${isDarkMode ? "bg-purple-500/20" : "bg-purple-100"}`}
                      >
                        <Github size={20} className={isDarkMode ? "text-purple-400" : "text-purple-600"} />
                      </motion.div>
                    </Link>
                  )}
                  {project.link_site && (
                    <Link
                      href={project.link_site}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={isMuted ? undefined : playHoverSound}
                      onClick={isMuted ? undefined : playClickSound}
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className={`p-2 rounded-full ${isDarkMode ? "bg-purple-500/20" : "bg-purple-100"}`}
                      >
                        <Globe size={20} className={isDarkMode ? "text-purple-400" : "text-purple-600"} />
                      </motion.div>
                    </Link>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className={`text-xs px-3 py-1 rounded-full ${
                      isDarkMode ? "bg-purple-500/20 text-purple-300" : "bg-purple-100 text-purple-700"
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <p className={`mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>{project.description}</p>
          <div className="mb-2">
            <h4 className={`font-semibold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>Technologies Used:</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {project.technologies.map((tech, techIndex) => {
                const skillItem = skills.find((skill) => skill.name.toLowerCase() === tech.toLowerCase())
                return (
                  <motion.div
                    key={techIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.02 }}
                    onMouseEnter={isMuted ? undefined : playHoverSound}
                    onClick={isMuted ? undefined : playClickSound}
                    className={`relative p-2 rounded-xl border transition-all duration-300 ${
                      isDarkMode
                        ? "bg-black/20 border-white/10 hover:border-white/20"
                        : "bg-slate-300/70 border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="relative w-5 h-5">
                        <Image
                          src={skillItem ? skillItem.icon : "/placeholder.svg?height=20&width=20"}
                          alt={tech}
                          layout="fill"
                          objectFit="contain"
                          className="transition-transform duration-300"
                        />
                      </div>
                      <span className={`text-xs font-bold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                        {tech}
                      </span>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatedSection>
  )
}
