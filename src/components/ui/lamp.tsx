"use client";

import type React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-col items-center justify-center overflow-hidden w-full rounded-md z-0 bg-zinc-900 border-b-[1px] border-purple-800/20 rounded-b-[40px]",
        className
      )}
    >
      <div className="absolute top-72 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-violet-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(147,51,234,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(147,51,234,0.2)_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-30"></div>

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
          className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic from-purple-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute w-[100%] left-0 bg-zinc-900 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,black,transparent)]" />
          <div className="absolute w-40 h-[100%] left-0 bg-zinc-900 bottom-0 z-20 [mask-image:linear-gradient(to_right,black,transparent)]" />
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
          className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-purple-500 text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute w-40 h-[100%] right-0 bg-zinc-900 bottom-0 z-20 [mask-image:linear-gradient(to_left,black,transparent)]" />
          <div className="absolute w-[100%] right-0 bg-zinc-900 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,black,transparent)]" />
        </motion.div>

        {/* Background blur effect */}
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-zinc-900 blur-2xl"></div>

        {/* Central glow */}
        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "16rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-purple-400 opacity-30 blur-2xl"
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
          className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] bg-purple-400 shadow-2xl shadow-purple-500/50"
        ></motion.div>

        {/* Top mask to hide overflow */}
        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-zinc-900">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(147,51,234,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(147,51,234,0.2)_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-30"></div>
        </div>
      </div>

      <div className="relative z-50 flex -translate-y-80 flex-col items-center px-5">
        {children}
      </div>
    </div>
  );
};
