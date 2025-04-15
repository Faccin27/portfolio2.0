"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import AnimatedSection from "@/components/animatedsection"

interface AboutSectionProps {
  isDarkMode: boolean
  isMuted: boolean
  playHoverSound: () => void
  playClickSound: () => void
}

export default function AboutSection({ isDarkMode, isMuted, playHoverSound, playClickSound }: AboutSectionProps) {
  return (
    <AnimatedSection className="mt-16" animation="fadeRight">
      <div className="container mx-auto px-4 py-12">
        <div
          className={`w-full sm:w-11/12 md:w-4/5 mx-auto rounded-2xl border transition-all duration-300 relative z-10 ${
            isDarkMode ? "bg-zinc-800/80 border-white/10" : "bg-slate-300/80 border-gray-200"
          }`}
        >
          <div className="flex flex-col md:flex-row items-center md:items-stretch gap-12 p-6 md:p-8">
            <div className="w-full md:w-1/2 flex items-center justify-center">
              <div className="relative w-3/4 h-0 pb-[100%] rounded-full overflow-hidden border-4 border-purple-500 shadow-[0_0_30px_15px_rgba(147,51,234,0.3)]">
                <Image src="/me.png" alt="Profile" layout="fill" objectFit="cover" />
              </div>
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-between space-y-6 py-4 md:py-8">
              <div className="space-y-6">
                <h2
                  className={`text-3xl sm:text-4xl md:text-2xl font-bold whitespace-nowrap ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  More about me
                </h2>
                <div className="space-y-4 md:space-y-6">
                  {[
                    { label: "Name", value: "Guilherme Faccin" },
                    { label: "Experience", value: "3 Years" },
                    { label: "Specialty", value: "Fullstack Developer" },
                    { label: "Email", value: "gfaccin27@gmail.com" },
                    { label: "Phone", value: "(49) 999215720" },
                    { label: "Freelance", value: "Available" },
                  ].map((item, index) => (
                    <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
                      <p
                        className={`text-sm sm:text-base md:text-lg ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                      >
                        {item.label}:
                      </p>
                      <p
                        className={`text-base sm:text-lg md:text-xl font-medium ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mt-4 md:mt-6">
                <a
                  href="https://github.com/Faccin27"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full sm:w-auto"
                >
                  <button
                    onMouseEnter={isMuted ? undefined : playHoverSound}
                    onClick={isMuted ? undefined : playClickSound}
                    className={`w-full sm:w-auto px-6 py-2 rounded-xl cursor-pointer ${
                      isDarkMode ? "bg-purple-500 hover:bg-purple-600" : "bg-purple-600 hover:bg-purple-700"
                    } text-white transition-colors duration-300`}
                  >
                    Ver Todos os Projetos
                  </button>
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
