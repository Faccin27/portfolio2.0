"use client";

import { Code } from "lucide-react";
import AnimatedSection from "@/components/animatedsection";
import ProjectCard from "@/components/project-card";
import { useProjects } from "@/hooks/useProjects";
import { mapProjectToCard, generateSkills } from "@/utils/projectMapper";

interface ProjectsSectionProps {
  isDarkMode: boolean;
  isMuted: boolean;
  playHoverSound: () => void;
  playClickSound: () => void;
}

export default function ProjectsSection({
  isDarkMode,
  isMuted,
  playHoverSound,
  playClickSound,
}: ProjectsSectionProps) {
  const { projects, loading, error } = useProjects();

  const skills = [
    { name: "HTML5", icon: "/assets/svgs/html.svg" },
    { name: "CSS3", icon: "/assets/svgs/css.svg" },
    { name: "Bootstrap", icon: "/assets/svgs/bootstrap.svg" },
    { name: "Tailwind", icon: "/assets/svgs/tailwindcss.svg" },
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
  ];

  if (loading) {
    return (
      <section id="projects" className="py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeUp">
            <div className="text-center mb-8">
              <h2
                className={`text-4xl font-bold mb-4 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                } text-left`}
              >
                Featured Projects
              </h2>
            </div>
          </AnimatedSection>

          <div className="space-y-16">
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className={`animate-pulse rounded-xl p-6 ${
                  isDarkMode ? "bg-zinc-800/50" : "bg-gray-200"
                }`}
              >
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="w-full md:w-1/2">
                    <div
                      className={`aspect-video rounded-lg ${
                        isDarkMode ? "bg-zinc-700" : "bg-gray-300"
                      }`}
                    ></div>
                  </div>
                  <div className="w-full md:w-1/2 space-y-4">
                    <div
                      className={`h-6 rounded ${
                        isDarkMode ? "bg-zinc-700" : "bg-gray-300"
                      }`}
                    ></div>
                    <div
                      className={`h-4 rounded ${
                        isDarkMode ? "bg-zinc-700" : "bg-gray-300"
                      }`}
                    ></div>
                    <div
                      className={`h-4 rounded w-3/4 ${
                        isDarkMode ? "bg-zinc-700" : "bg-gray-300"
                      }`}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeUp">
            <div className="text-center mb-8">
              <h2
                className={`text-4xl font-bold mb-4 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                } text-left`}
              >
                Featured Projects
              </h2>
              <div
                className={`p-4 rounded-lg ${
                  isDarkMode
                    ? "bg-red-900/20 text-red-300"
                    : "bg-red-100 text-red-700"
                }`}
              >
                <p>Error loading projects: {error}</p>
                <p className="text-sm mt-2">Please try refreshing the page.</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    );
  }

  const featuredProjects = projects.slice(0, 3).map((project) => ({
    ...mapProjectToCard(project),
    skills: generateSkills(project),
  }));

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <AnimatedSection animation="fadeUp">
          <div className="text-center mb-8">
            <h2
              className={`text-4xl font-bold mb-4 ${
                isDarkMode ? "text-white" : "text-gray-900"
              } text-left`}
            >
              Featured Projects
            </h2>
          </div>
        </AnimatedSection>

        <div className="space-y-16">
          {featuredProjects.map((project, index) => (
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
  );
}
