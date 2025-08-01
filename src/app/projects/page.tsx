"use client"

import { useState, useEffect, useCallback } from "react"
import { useSoundEffect } from "@/hooks/useSoundEffect"
import React from "react"
import { Particles } from "@/components/particles"
import Header from "@/components/layout/header"
import AllProjectsSection from "@/components/all-projects-section"
import Footer from "@/components/footer"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const MemoizedParticles = React.memo(Particles)

export default function ProjectsPage() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true)
  const { playHoverSound, playClickSound, playKeySound } = useSoundEffect()
  const [isMuted, setIsMuted] = useState<boolean>(false)

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev)
    playClickSound()
  }, [playClickSound])

  const toggleTheme = useCallback(() => {
    setIsDarkMode((prev) => !prev)
    playClickSound()
  }, [playClickSound])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement
      const isInputElement = target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable

      if (!isInputElement && !isMuted) {
        playKeySound()
      }
    }

    document.addEventListener("keydown", handleGlobalKeyDown)

    return () => {
      document.removeEventListener("keydown", handleGlobalKeyDown)
    }
  }, [playKeySound, isMuted])

  return (
    <div
      className={`min-h-screen overflow-x-hidden cursor-crosshair ${isDarkMode ? "bg-zinc-900" : "bg-gray-100"}`}
      onClick={isMuted ? undefined : playClickSound}
      onKeyDown={playKeySound}
    >
      <div className="fixed inset-0 pointer-events-none">
        <div
          className={`absolute inset-0 opacity-75 transition-opacity duration-500 ${
            isDarkMode
              ? "bg-gradient-radial from-purple-900/20 via-transparent to-transparent"
              : "bg-gradient-radial from-purple-100/50 via-transparent to-transparent"
          }`}
        ></div>
        <MemoizedParticles />
      </div>

      <Header
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        isMuted={isMuted}
        toggleMute={toggleMute}
        playHoverSound={playHoverSound}
      />

      <div className="container mx-auto px-4 mt-20 pt-16">
        {/* Back to Home Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            href="/"
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
              isDarkMode
                ? "bg-zinc-800/50 hover:bg-zinc-700/50 text-white border border-white/10"
                : "bg-white/50 hover:bg-white/70 text-gray-900 border border-gray-200"
            }`}
            onMouseEnter={isMuted ? undefined : playHoverSound}
            onClick={isMuted ? undefined : playClickSound}
          >
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </Link>
        </motion.div>

        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            All Projects
          </h1>
          <p className={`text-lg ${isDarkMode ? "text-gray-300" : "text-gray-600"} max-w-2xl mx-auto`}>
            Explore my complete collection of projects, from web applications to desktop software and everything in
            between.
          </p>
        </motion.div>

        <AllProjectsSection
          isDarkMode={isDarkMode}
          isMuted={isMuted}
          playHoverSound={playHoverSound}
          playClickSound={playClickSound}
        />
      </div>

      <Footer
        isDarkMode={isDarkMode}
        isMuted={isMuted}
        playHoverSound={playHoverSound}
        playClickSound={playClickSound}
      />

      <div className="pointer-events-none">
        <div
          className={`absolute inset-0 opacity-75 transition-opacity duration-500 ${
            isDarkMode
              ? "bg-gradient-radial from-purple-900/20 via-transparent to-transparent"
              : "bg-gradient-radial from-purple-100/50 via-transparent to-transparent"
          }`}
        ></div>
      </div>
    </div>
  )
}
