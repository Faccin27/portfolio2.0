"use client"

import type React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export const LampContainer = ({
  children,
  className,
  isDarkMode = true,
}: {
  children: React.ReactNode
  className?: string
  isDarkMode?: boolean
}) => {
  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-col items-center justify-center overflow-hidden w-full rounded-md z-0 border-b-[1px] rounded-b-[40px]",
        isDarkMode
          ? "bg-zinc-900 border-purple-800/20"
          : "bg-gradient-to-b from-white to-purple-50/30 border-purple-200/40",
        className,
      )}
    >
      <div
        className={`absolute top-72 right-0 w-96 h-96 rounded-full blur-3xl animate-pulse ${
          isDarkMode ? "bg-purple-500/10" : "bg-purple-300/15"
        }`}
      ></div>
      <div
        className={`absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl animate-pulse delay-1000 ${
          isDarkMode ? "bg-violet-500/5" : "bg-violet-300/10"
        }`}
      ></div>
      <div
        className={`absolute inset-0 bg-[size:3rem_3rem] ${
          isDarkMode
            ? "bg-[linear-gradient(to_right,rgba(147,51,234,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(147,51,234,0.2)_1px,transparent_1px)] opacity-30"
            : "bg-[linear-gradient(to_right,rgba(147,51,234,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(147,51,234,0.08)_1px,transparent_1px)] opacity-40"
        }`}
      ></div>

      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0">
        {/* Left gradient cone */}
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className={`absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] text-white [--conic-position:from_70deg_at_center_top] ${
            isDarkMode
              ? "bg-gradient-conic from-purple-500 via-transparent to-transparent"
              : "bg-gradient-conic from-purple-400/60 via-transparent to-transparent"
          }`}
        >
          <div
            className={`absolute w-[100%] left-0 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,black,transparent)] ${
              isDarkMode ? "bg-zinc-900" : "bg-white"
            }`}
          />
          <div
            className={`absolute w-40 h-[100%] left-0 bottom-0 z-20 [mask-image:linear-gradient(to_right,black,transparent)] ${
              isDarkMode ? "bg-zinc-900" : "bg-white"
            }`}
          />
        </motion.div>

        {/* Right gradient cone */}
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className={`absolute inset-auto left-1/2 h-56 w-[30rem] text-white [--conic-position:from_290deg_at_center_top] ${
            isDarkMode
              ? "bg-gradient-conic from-transparent via-transparent to-purple-500"
              : "bg-gradient-conic from-transparent via-transparent to-purple-400/60"
          }`}
        >
          <div
            className={`absolute w-40 h-[100%] right-0 bottom-0 z-20 [mask-image:linear-gradient(to_left,black,transparent)] ${
              isDarkMode ? "bg-zinc-900" : "bg-white"
            }`}
          />
          <div
            className={`absolute w-[100%] right-0 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,black,transparent)] ${
              isDarkMode ? "bg-zinc-900" : "bg-white"
            }`}
          />
        </motion.div>

        {/* Background blur effect */}
        <div
          className={`absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 blur-2xl ${
            isDarkMode ? "bg-zinc-900" : "bg-white"
          }`}
        ></div>

        {/* Central glow */}
        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "16rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className={`absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full blur-2xl ${
            isDarkMode ? "bg-purple-400 opacity-30" : "bg-purple-300 opacity-20"
          }`}
        ></motion.div>

        {/* The main lamp line */}
        <motion.div
          initial={{ width: "15rem" }}
          whileInView={{ width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className={`absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] shadow-2xl ${
            isDarkMode ? "bg-purple-400 shadow-purple-500/50" : "bg-purple-500 shadow-purple-400/40"
          }`}
        ></motion.div>

        {/* Top mask to hide overflow */}
        <div
          className={`absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] ${
            isDarkMode ? "bg-zinc-900" : "bg-white"
          }`}
        >
          <div
            className={`absolute inset-0 bg-[size:3rem_3rem] ${
              isDarkMode
                ? "bg-[linear-gradient(to_right,rgba(147,51,234,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(147,51,234,0.2)_1px,transparent_1px)] opacity-30"
                : "bg-[linear-gradient(to_right,rgba(147,51,234,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(147,51,234,0.08)_1px,transparent_1px)] opacity-40"
            }`}
          ></div>
        </div>
      </div>

      <div className="relative z-50 flex -translate-y-80 flex-col items-center px-5">{children}</div>
    </div>
  )
}
