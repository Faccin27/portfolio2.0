"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

interface PlaygroundPuzzleProps {
  isDarkMode: boolean
  playHoverSound: () => void
  playClickSound: () => void
}

export default function PlaygroundPuzzle({ isDarkMode, playHoverSound, playClickSound }: PlaygroundPuzzleProps) {
  const router = useRouter()

  const handleClick = () => {
    playClickSound()
    router.push("/playground")
  }

  // Colors based on theme
  const fillColor = isDarkMode ? "#1f2937" : "#f3f4f6"
  const strokeColor = isDarkMode ? "#4b5563" : "#d1d5db"
  const textColor = isDarkMode ? "#f9fafb" : "#111827"
  const subtextColor = isDarkMode ? "#9ca3af" : "#4b5563"

  return (
    <div className="flex justify-center my-20">
      <motion.div
        className="w-3/4 cursor-pointer"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onMouseEnter={playHoverSound}
        onClick={handleClick}
      >
        <svg viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-lg">
          {/* Puzzle piece shape */}


          {/* Content */}
          <text
            x="400"
            y="130"
            textAnchor="middle"
            fontSize="32"
            fontWeight="bold"
            fill={textColor}
            fontFamily="sans-serif"
          >
            Interactive Playground
          </text>
          <text x="400" y="170" textAnchor="middle" fontSize="16" fill={subtextColor} fontFamily="sans-serif">
            Explore interactive demos including VS Code, terminal, and more
          </text>

          {/* Click indicator */}
          <g>
            <rect
              x="350"
              y="200"
              width="100"
              height="30"
              rx="15"
              fill={isDarkMode ? "rgba(124, 58, 237, 0.2)" : "rgba(124, 58, 237, 0.1)"}
              stroke={isDarkMode ? "rgba(124, 58, 237, 0.5)" : "rgba(124, 58, 237, 0.3)"}
            />
            <text
              x="400"
              y="220"
              textAnchor="middle"
              fontSize="14"
              fill={isDarkMode ? "#c4b5fd" : "#7c3aed"}
              fontFamily="sans-serif"
            >
              Click to explore
            </text>
          </g>
        </svg>
      </motion.div>
    </div>
  )
}
