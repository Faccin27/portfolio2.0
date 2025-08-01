"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface AnimationContainerProps {
  children: ReactNode
  delay?: number
  className?: string
  isDarkMode?: boolean
}

export default function AnimationContainer({
  children,
  delay = 0,
  className = "",
  isDarkMode = true,
}: AnimationContainerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
