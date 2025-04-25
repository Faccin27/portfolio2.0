"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Code, Terminal, Layers, Globe, ChevronRight } from "lucide-react"
import AnimatedSection from "@/components/animatedsection"

interface PlaygroundPreviewSectionProps {
  isDarkMode: boolean
  isMuted: boolean
  playHoverSound: () => void
  playClickSound: () => void
}

export default function PlaygroundPreviewSection({
  isDarkMode,
  isMuted,
  playHoverSound,
  playClickSound,
}: PlaygroundPreviewSectionProps) {
  const [activeFeature, setActiveFeature] = useState(0)

  const features = [
    {
      title: "VS Code Editor",
      description:
        "Experience a faithful recreation of the VS Code interface with syntax highlighting and interactive features.",
      icon: <Code className="size-6" />,
      color: "from-blue-500 to-blue-600",
      preview: "/images/vscode-preview.png",
    },
    {
      title: "Interactive Terminal",
      description:
        "Explore a simulated command-line interface with custom commands to discover more about my skills and projects.",
      icon: <Terminal className="size-6" />,
      color: "from-green-500 to-green-600",
      preview: "/images/terminal-preview.png",
    },
    {
      title: "Dev Quiz",
      description:
        "Discover if your passion lies in design or structure through an interactive developer quiz experience.",
      icon: <Layers className="size-6" />,
      color: "from-purple-500 to-purple-600",
      preview: "/images/quiz-preview.png",
    },
    {
      title: "World Map",
      description: "Visualize geographic data with an interactive D3.js powered world map visualization.",
      icon: <Globe className="size-6" />,
      color: "from-amber-500 to-amber-600",
      preview: "/images/map-preview.png",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [features.length])

  return (
    <AnimatedSection animation="fadeUp" className="my-24">
      <div className="text-center mb-12">
        <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
          Interactive Playground
        </h2>
        <p className={`text-lg max-w-3xl mx-auto ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
          Explore my technical skills through interactive demos and experiments. The playground offers hands-on
          experiences that showcase both creativity and technical expertise.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Preview Image */}
        <div
          className={`relative h-[350px] rounded-xl overflow-hidden border ${
            isDarkMode ? "border-gray-700" : "border-gray-300"
          } shadow-lg`}
        >
          <div
            className={`absolute inset-0 bg-gradient-to-br ${
              isDarkMode ? "from-gray-800 to-gray-900" : "from-gray-100 to-gray-200"
            } flex items-center justify-center`}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  opacity: activeFeature === index ? 1 : 0,
                  scale: activeFeature === index ? 1 : 0.9,
                  zIndex: activeFeature === index ? 10 : 0,
                }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-full h-full p-4 flex items-center justify-center">
                  <div
                    className={`w-full h-full rounded-lg overflow-hidden border ${
                      isDarkMode ? "border-gray-700" : "border-gray-200"
                    } relative`}
                  >
                    <div
                      className={`absolute inset-0 flex items-center justify-center ${
                        isDarkMode ? "bg-gray-800" : "bg-gray-100"
                      }`}
                    >
                      <div className="text-center p-4">
                        <div
                          className={`mx-auto mb-4 size-16 rounded-full flex items-center justify-center bg-gradient-to-br ${feature.color}`}
                        >
                          {feature.icon}
                        </div>
                        <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                          {feature.title}
                        </h3>
                        <p className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>{feature.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Feature Selection */}
        <div className="space-y-6">
          <h3 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            Explore Interactive Features
          </h3>
          <div className="space-y-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={`p-4 rounded-lg cursor-pointer transition-all ${
                  activeFeature === index
                    ? `bg-gradient-to-r ${feature.color} text-white`
                    : isDarkMode
                      ? "bg-gray-800 hover:bg-gray-700 text-white"
                      : "bg-white hover:bg-gray-100 text-gray-900 border border-gray-200"
                }`}
                onClick={() => {
                  setActiveFeature(index)
                  playClickSound()
                }}
                onMouseEnter={playHoverSound}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center">
                  <div className="mr-4">{feature.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-medium">{feature.title}</h4>
                    <p
                      className={`text-sm ${activeFeature === index ? "text-white/80" : isDarkMode ? "text-gray-300" : "text-gray-600"}`}
                    >
                      {feature.description}
                    </p>
                  </div>
                  <ChevronRight className="size-5 opacity-50" />
                </div>
              </motion.div>
            ))}
          </div>

          <Link href="/playground" passHref>
            <motion.div
              className={`mt-8 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 cursor-pointer`}
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Enter the Playground</span>
              <ChevronRight className="size-4" />
            </motion.div>
          </Link>
        </div>
      </div>

      {/* Interactive Code Snippet */}
      <div
        className={`mt-12 p-6 rounded-xl ${
          isDarkMode ? "bg-gray-800/50 text-gray-300" : "bg-white text-gray-800 border border-gray-200"
        }`}
      >
        <div className="flex items-center mb-4">
          <div className="flex space-x-2 mr-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-sm opacity-70">playground.tsx</div>
        </div>
        <pre className={`font-mono text-sm overflow-x-auto ${isDarkMode ? "text-gray-300" : "text-gray-800"}`}>
          <code>
            {`// Experience interactive demos
import { VSCodeEditor, Terminal, DevQuiz, WorldMap } from '@/components';

export default function Playground() {
  return (
    <div className="interactive-playground">
      <VSCodeEditor /> {/* Code editor experience */}
      <Terminal />    {/* Command-line interface */}
      <DevQuiz />     {/* Developer quiz */}
      <WorldMap />    {/* Interactive visualization */}
    </div>
  );
}`}
          </code>
        </pre>
      </div>
    </AnimatedSection>
  )
}
