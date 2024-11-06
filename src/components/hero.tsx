'use client'

import { useState, useEffect } from "react"
import { Linkedin, Github, Instagram, Mail } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import logo from "@/assets/logo.png"
import bulb from "@/assets/bulb.png"

type NavItem = "HOME" | "ABOUT" | "PROJECTS" | "CONTACT"

export default function Component() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true)
  const [activeLink, setActiveLink] = useState<NavItem>("HOME")
  const [textIndex, setTextIndex] = useState<number>(0)
  const texts: string[] = ["Hey there! 👋", "I am <span className=\"text-purple-500\">GUILHERME FACCIN</span>"]

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % texts.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        isDarkMode ? "bg-zinc-900" : "bg-gray-100"
      }`}
    >
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative py-6 px-4 bg-zinc-800 border-b-2 border-purple-500/20"
      >
        <nav className="container mx-auto">
          <div className="flex justify-between items-center">
            <motion.span
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-purple-500 font-bold text-2xl tracking-wider"
            >
              Portfolio.
            </motion.span>
            <div className="flex space-x-8">
              {(["HOME", "ABOUT", "PROJECTS", "CONTACT"] as const).map(
                (item, index) => (
                  <motion.div
                    key={item}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Link
                      href="#"
                      className={`relative group py-2 ${
                        isDarkMode ? "text-white" : "text-gray-800"
                      }`}
                      onMouseEnter={() => setActiveLink(item)}
                    >
                      <span className="relative z-10">{item}</span>
                      <span
                        className={`absolute bottom-0 left-0 w-full h-0.5 bg-purple-500 transform origin-left transition-transform duration-300 ${
                          activeLink === item
                            ? "scale-x-100"
                            : "scale-x-0 group-hover:scale-x-100"
                        }`}
                      />
                    </Link>
                  </motion.div>
                )
              )}
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Main content */}
      <div className="container mx-auto px-4 mt-12">
        <div className="flex items-center justify-between relative">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-2/5 relative" 
          >
            <Image
              src={logo}
              alt="Profile"
              width={2000}
              height={2000}
              className="rounded-lg filter grayscale hover:grayscale-0 transition-all duration-300"
            />
          </motion.div>

          
        </div>
      </div>

      <div className="fixed inset-0 pointer-events-none">
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