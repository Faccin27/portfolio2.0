"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Filter, Github, Globe } from "lucide-react"
import AnimatedSection from "@/components/animatedsection"
import ProjectCard from "@/components/project-card"

interface AllProjectsSectionProps {
  isDarkMode: boolean
  isMuted: boolean
  playHoverSound: () => void
  playClickSound: () => void
}

export default function AllProjectsSection({
  isDarkMode,
  isMuted,
  playHoverSound,
  playClickSound,
}: AllProjectsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const allProjects = [
    {
      title: "Nyx RAT",
      image: "/nyx.png",
      description:
        "A remote access trojan with stealing and additional features, fully controlled through your browser, and it also supports Discord webhooks.",
      skills: ["Development", "API", "Security"],
      technologies: ["Python", "Next.js", "Node.js", "MySQL", "Fastify", "Motion"],
      link_github: "https://github.com/Faccin27/Nyx---Stealthy-Remote-Access-Tool-RAT",
      category: "desktop",
      featured: true,
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
      category: "web",
      featured: true,
    },
    {
      title: "Notice Day",
      image: "/noticeday.png",
      description: "A news website with options to like, comment, post news, job offers, events, and other items.",
      skills: ["API", "MVC", "Full Stack"],
      technologies: ["Handlebars", "Express.js", "MySQL", "Node.js"],
      link_github: "https://github.com/Faccin27/Portal_Noticias",
      link_site: "https://notice-day.herokuapp.com",
      category: "web",
      featured: true,
    }
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

  const categories = [
    { id: "all", name: "All Projects", icon: Filter },
    { id: "web", name: "Web Apps", icon: Globe },
    { id: "desktop", name: "Desktop", icon: Github },
    // { id: "mobile", name: "Mobile", icon: Globe },
    { id: "api", name: "APIs", icon: Github },
    // { id: "bot", name: "Bots", icon: Github },
  ]

  const filteredProjects = allProjects.filter((project) => {
    const matchesCategory = selectedCategory === "all" || project.category === selectedCategory
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.technologies.some((tech) => tech.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const featuredProjects = filteredProjects.filter((project) => project.featured)
  const otherProjects = filteredProjects.filter((project) => !project.featured)

  return (
    <div className="space-y-12">
      {/* Search and Filter */}
      <AnimatedSection animation="fadeUp">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search
              size={20}
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-300 ${
                isDarkMode
                  ? "bg-zinc-800/50 border-white/10 text-white placeholder-gray-400 focus:border-purple-500/50"
                  : "bg-white/50 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-purple-500/50"
              } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
              onFocus={isMuted ? undefined : playHoverSound}
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedCategory(category.id)
                  if (!isMuted) playClickSound()
                }}
                onMouseEnter={isMuted ? undefined : playHoverSound}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  selectedCategory === category.id
                    ? isDarkMode
                      ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                      : "bg-purple-100 text-purple-700 border border-purple-200"
                    : isDarkMode
                      ? "bg-zinc-800/50 text-gray-300 border border-white/10 hover:border-white/20"
                      : "bg-white/50 text-gray-600 border border-gray-200 hover:border-gray-300"
                }`}
              >
                <category.icon size={16} />
                <span className="text-sm font-medium">{category.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Results Count */}
      <AnimatedSection animation="fadeUp">
        <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"} mb-6`}>
          Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""}
          {selectedCategory !== "all" && ` in ${categories.find((c) => c.id === selectedCategory)?.name}`}
          {searchTerm && ` matching "${searchTerm}"`}
        </p>
      </AnimatedSection>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <AnimatedSection animation="fadeUp">
          <h2 className={`text-2xl font-bold mb-8 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            Featured Projects
          </h2>
          <div className="space-y-16">
            {featuredProjects.map((project, index) => (
              <ProjectCard
                key={`featured-${project.title}`}
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
      )}

      {/* Other Projects */}
      {otherProjects.length > 0 && (
        <AnimatedSection animation="fadeUp">
          <h2 className={`text-2xl font-bold mb-8 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            {featuredProjects.length > 0 ? "Other Projects" : "All Projects"}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {otherProjects.map((project, index) => (
              <motion.div
                key={`other-${project.title}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`group rounded-xl overflow-hidden ${
                  isDarkMode ? "bg-zinc-800/50" : "bg-slate-300/70"
                } backdrop-blur-sm border ${isDarkMode ? "border-white/10" : "border-gray-200"} hover:border-purple-500/30 transition-all duration-300`}
                onMouseEnter={isMuted ? undefined : playHoverSound}
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      {project.title}
                    </h3>
                    <div className="flex gap-2">
                      {project.link_github && (
                        <motion.a
                          href={project.link_github}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          onClick={isMuted ? undefined : playClickSound}
                          onMouseEnter={isMuted ? undefined : playHoverSound}
                          className={`p-2 rounded-full ${isDarkMode ? "bg-purple-500/20" : "bg-purple-100"}`}
                        >
                          <Github size={20} className={isDarkMode ? "text-purple-400" : "text-purple-600"} />
                        </motion.a>
                      )}
                      {project.link_site && (
                        <motion.a
                          href={project.link_site}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          onClick={isMuted ? undefined : playClickSound}
                          onMouseEnter={isMuted ? undefined : playHoverSound}
                          className={`p-2 rounded-full ${isDarkMode ? "bg-purple-500/20" : "bg-purple-100"}`}
                        >
                          <Globe size={20} className={isDarkMode ? "text-purple-400" : "text-purple-600"} />
                        </motion.a>
                      )}
                    </div>
                  </div>
                  <p className={`mb-4 text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                    {project.description}
                  </p>
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
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech, techIndex) => {
                      const skillItem = skills.find((skill) => skill.name.toLowerCase() === tech.toLowerCase())
                      return (
                        <div
                          key={techIndex}
                          className={`flex items-center gap-1 text-xs px-2 py-1 rounded ${
                            isDarkMode ? "bg-black/20 text-gray-400" : "bg-white/50 text-gray-600"
                          }`}
                        >
                          {skillItem && (
                            <img src={skillItem.icon || "/placeholder.svg"} alt={tech} className="w-3 h-3" />
                          )}
                          <span>{tech}</span>
                        </div>
                      )
                    })}
                    {project.technologies.length > 4 && (
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          isDarkMode ? "bg-black/20 text-gray-400" : "bg-white/50 text-gray-600"
                        }`}
                      >
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      )}

      {/* No Results */}
      {filteredProjects.length === 0 && (
        <AnimatedSection animation="fadeUp">
          <div className="text-center py-12">
            <div className={`text-6xl mb-4 ${isDarkMode ? "text-gray-600" : "text-gray-400"}`}>🔍</div>
            <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              No projects found
            </h3>
            <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              Try adjusting your search terms or category filter.
            </p>
          </div>
        </AnimatedSection>
      )}
    </div>
  )
}
