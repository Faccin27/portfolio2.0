"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Linkedin, Github, Mail, Phone } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import AnimatedSection from "@/components/animatedsection"

interface HeroSectionProps {
  isDarkMode: boolean
  isMuted: boolean
  playHoverSound: () => void
  playClickSound: () => void
}

export default function HeroSection({ isDarkMode, isMuted, playHoverSound, playClickSound }: HeroSectionProps) {
  const [textIndex, setTextIndex] = useState<number>(0)

  const texts = [
    "Hey there! 👋",
    <>
      I am <span className={isDarkMode ? "text-purple-500" : "text-purple-700"}>GUILHERME FACCIN</span>
    </>,
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % texts.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [texts.length])

  const socialLinks = [
    {
      Icon: Linkedin,
      href: "https://www.linkedin.com/in/guilherme-faccin-5b71a5172/",
      onMouseEnter: isMuted ? undefined : playHoverSound,
      onClick: isMuted ? undefined : playClickSound,
    },
    {
      Icon: Github,
      href: "https://github.com/Faccin27",
      onMouseEnter: isMuted ? undefined : playHoverSound,
      onClick: isMuted ? undefined : playClickSound,
    },
    {
      Icon: Mail,
      href: "mailto:gfaccin27@gmail.com",
      onMouseEnter: isMuted ? undefined : playHoverSound,
      onClick: isMuted ? undefined : playClickSound,
    },
    {
      Icon: Phone,
      href: "https://wa.me/49999215720",
      onMouseEnter: isMuted ? undefined : playHoverSound,
      onClick: isMuted ? undefined : playClickSound,
    },
  ]

  return (
    <AnimatedSection animation="fadeDown" >
      <div  id="hero" className="flex flex-col md:flex-row items-center justify-between relative">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-2/5 mb-8 md:mb-0"
        >
          <Image
            src="/logo.png"
            alt="Profile"
            width={2000}
            height={2000}
            className={`rounded-lg filter grayscale hover:grayscale-0 transition-all duration-300 ${
              isDarkMode ? "" : "invert"
            }`}
          />
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-1/2 md:pl-12"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={textIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className={`text-3xl md:text-5xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-800"}`}
            >
              {texts[textIndex]}
            </motion.div>
          </AnimatePresence>
          <p className={`mb-2 font-bold ${isDarkMode ? "text-purple-400" : "text-purple-700"}`}>Fullstack Developer</p>
          <p className={`mb-6 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
            I am a developer with experience in JavaScript, React, and Node.js. I work to create simple, strong, and
            scalable solutions, always focusing on performance and user experience. My goal is to deliver high-quality
            applications that meet project needs.
          </p>
          <div className="flex space-x-4">
            {socialLinks.map(({ Icon, href, onMouseEnter, onClick }, index) => (
              <motion.div key={index} whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                <Link
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${
                    isDarkMode ? "text-white" : "text-gray-800"
                  } hover:text-purple-500 transition-colors duration-300`}
                  onMouseEnter={onMouseEnter}
                  onClick={onClick}
                >
                  <Icon size={24} />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  )
}
