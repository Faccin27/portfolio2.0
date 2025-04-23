"use client"

import { useState, useEffect } from "react"
import { Moon, Sun, VolumeX, Volume2 } from "lucide-react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"

interface HeaderProps {
  isDarkMode: boolean
  toggleTheme: () => void
  isMuted: boolean
  toggleMute: () => void
  playHoverSound: () => void
}

export default function Header({ isDarkMode, toggleTheme, isMuted, toggleMute, playHoverSound }: HeaderProps) {
  const [showBulb, setShowBulb] = useState(true)
  const [showThemeIcon, setShowThemeIcon] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100

      // Define as páginas onde a lâmpada NÃO deve aparecer
      const pagesWithoutBulb = ['/playground']

      const shouldHideBulb = pagesWithoutBulb.includes(pathname)

      if (scrollPercentage >= 10 || shouldHideBulb) {
        setShowBulb(false)
        setShowThemeIcon(true)
      } else {
        setShowBulb(true)
        setShowThemeIcon(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [pathname])

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 py-6 px-4 border-b-2 border-purple-500/20 ${
        isDarkMode ? "bg-zinc-800" : "bg-white"
      }`}
    >
      <nav className="container mx-auto">
        <div className="flex justify-between items-center">
          <motion.span
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`font-bold text-xl md:text-2xl tracking-wider ${
              isDarkMode ? "text-purple-500" : "text-purple-700"
            } relative`}
          >
            <a href="/"><span className="relative z-10">FaccinDEV</span></a>
            <span className={`absolute inset-0 blur-md ${isDarkMode ? "bg-purple-500/30" : "bg-purple-300/30"}`}></span>
          </motion.span>
          <div className="flex items-center space-x-2">
            <AnimatePresence>
              {showThemeIcon && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="cursor-pointer"
                  onClick={toggleTheme}
                >
                  {isDarkMode ? (
                    <Sun className="text-yellow-400" size={24} onMouseEnter={isMuted ? undefined : playHoverSound} />
                  ) : (
                    <Moon className="text-gray-600" size={24} onMouseEnter={isMuted ? undefined : playHoverSound} />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="cursor-pointer"
              onClick={toggleMute}
            >
              {isMuted ? (
                <VolumeX
                  className={isDarkMode ? "text-gray-400" : "text-gray-600"}
                  size={24}
                  onMouseEnter={isMuted ? undefined : playHoverSound}
                />
              ) : (
                <Volume2
                  className={isDarkMode ? "text-purple-400" : "text-purple-600"}
                  size={24}
                  onMouseEnter={isMuted ? undefined : playHoverSound}
                />
              )}
            </motion.div>
          </div>
        </div>
      </nav>
      <AnimatePresence>
        {showBulb && (
          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute top-full left-1/3 max-sm:left-3/4 transform -translate-x-1/2 cursor-pointer z-50"
            style={{ marginTop: "-8px" }}
            onClick={toggleTheme}
            onMouseEnter={isMuted ? undefined : playHoverSound}
          >
            <div className="relative">
              <div className="absolute bottom-0 left-[43%] transform -translate-x-1/2 -translate-y-5 bg-white rounded-full filter blur-md h-8 w-8"></div>
              <div className="relative z-10">
                <Image
                  src="/bulb.png"
                  alt="Light Bulb"
                  width={100}
                  height={120}
                  className={`transition-all duration-500 ${isDarkMode ? "filter-none" : "brightness-75"}`}
                />
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full mb-2">
                  <svg viewBox="0 0 100 25" className="w-full">
                    <defs>
                      <path id="curve" d="M 0 0 Q 50 50 100 0" fill="transparent" />
                    </defs>
                    <text fill="white" fontSize="10">
                      <textPath href="#curve" startOffset="40%" textAnchor="middle">
                        Light mode
                      </textPath>
                    </text>
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
