"use client";

import { useState, useEffect, useCallback } from "react";
import { Linkedin, Github, Instagram, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";
import bulb from "@/assets/bulb.png";
import css from "@/assets/svgs/css.svg";
import express from "@/assets/svgs/express.svg";
import git from "@/assets/svgs/git.svg";
import github from "@/assets/svgs/github.svg";
import html from "@/assets/svgs/html.svg";
import javascript from "@/assets/svgs/javascript.svg";
import motiond from "@/assets/svgs/motion.svg";
import nextjs from "@/assets/svgs/nextjs.svg";
import nodejs from "@/assets/svgs/nodejs.svg";
import react from "@/assets/svgs/react.svg";
import tailwindcss from "@/assets/svgs/tailwindcss.svg";
import typescript from "@/assets/svgs/typescript.svg";
import noticeday from "@/assets/noticeday.png"
import { Particles } from "@/components/particles";
import React from "react";

type NavItem = "HOME" | "ABOUT" | "PROJECTS" | "CONTACT";

const MemoizedParticles = React.memo(Particles);

const projects = [
  {
    title: "Full stack music app",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "A complete music streaming application with user authentication, playlist management, and real-time playback features.",
    skills: ["API", "MVC", "Development"],
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Express.js"],
  },
  {
    title: "Notice day",
    image: noticeday,
    description:
      "A complete music streaming application with user authentication, playlist management, and real-time playback features.",
    skills: ["API", "SPA"],
    technologies: ["React", "Express.js", "MongoDB", "Node.js"],
  },
  {
    title: "Nyx RAT",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "A complete music streaming application with user authentication, playlist management, and real-time playback features.",
    skills: ["Development", "API"],
    technologies: ["Vue.js", "Node.js", "MySQL", "Express.js"],
  },
];

const skills = [
  { name: "CSS3", icon: css },
  { name: "Express.js", icon: express },
  { name: "Git", icon: git },
  { name: "GitHub", icon: github },
  { name: "HTML5", icon: html },
  { name: "PostgreeSQL", icon: "/placeholder.svg?height=30&width=30" },
  { name: "JavaScript", icon: javascript },
  { name: "MySQL", icon: "/placeholder.svg?height=30&width=30" },
  { name: "Next.js", icon: nextjs },
  { name: "Node.js", icon: nodejs },
  { name: "React", icon: react },
  { name: "Tailwind CSS", icon: tailwindcss },
  { name: "TypeScript", icon: typescript },
  { name: "Bootstrap", icon: "/placeholder.svg?height=30&width=30" },
  { name: "Python", icon: "/placeholder.svg?height=30&width=30" },
  { name: "Figma", icon: "/placeholder.svg?height=30&width=30" },
  { name: "Vue", icon: "/placeholder.svg?height=30&width=30" },
  { name: "Prisma", icon: "/placeholder.svg?height=30&width=30" },
  { name: "Handlebars", icon: "/placeholder.svg?height=30&width=30" },
  { name: "Postman", icon: "/placeholder.svg?height=30&width=30" },
  { name: "Insomnia", icon: "/placeholder.svg?height=30&width=30" },
];

export default function Component() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [activeLink, setActiveLink] = useState<NavItem>("HOME");
  const [textIndex, setTextIndex] = useState<number>(0);
  const texts = [
    "Hey there! 👋",
    <>
      I am{" "}
      <span className={isDarkMode ? "text-purple-500" : "text-purple-700"}>
        GUILHERME FACCIN
      </span>
    </>,
  ];

  const toggleTheme = useCallback(() => {
    setIsDarkMode((prev) => !prev);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <div
      className={`min-h-screen pt-24 transition-colors duration-500 ${
        isDarkMode ? "bg-zinc-900" : "bg-gray-100"
      }`}
    >
      <div className="fixed inset-0">
        <MemoizedParticles />
      </div>

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
              className={`font-bold text-2xl tracking-wider ${
                isDarkMode ? "text-purple-500" : "text-purple-700"
              }`}
            >
              FaccinDEV
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
        <motion.div
          className="absolute top-full left-[768px] transform -translate-x-1/2 cursor-pointer z-50"
          style={{ marginTop: "-8px" }}
          onClick={toggleTheme}
        >
          <div className="relative">
            <div className="absolute bottom-0 left-[43%] transform -translate-x-1/2 -translate-y-5 bg-white rounded-full filter blur-md h-8 w-8"></div>
            <div className="relative z-10">
              <Image
                src={bulb}
                alt="Light Bulb"
                width={100}
                height={120}
                className={`transition-all duration-500 ${
                  isDarkMode ? "filter-none" : "brightness-75"
                }`}
              />
            </div>
          </div>
        </motion.div>
      </motion.header>

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
              className={`rounded-lg filter grayscale hover:grayscale-0 transition-all duration-300 ${
                isDarkMode ? "" : "invert"
              }`}
            />
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-1/2 pl-12"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={textIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className={`text-5xl font-bold mb-4 ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                {texts[textIndex]}
              </motion.div>
            </AnimatePresence>
            <p
              className={`mb-2 font-bold ${
                isDarkMode ? "text-purple-400" : "text-purple-700"
              }`}
            >
              Fullstack Developer
            </p>
            <p
              className={`mb-6 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <div className="flex space-x-6">
              {[Linkedin, Github, Instagram, Mail].map((Icon, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link
                    href="#"
                    className={`${
                      isDarkMode ? "text-white" : "text-gray-800"
                    } hover:text-purple-500 transition-colors duration-300`}
                  >
                    <Icon size={24} />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16"
        >
          <h2
            className={`text-3xl font-bold mb-8 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Featured Projects
          </h2>
          <div className="space-y-16">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex flex-col ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } gap-8`}
              >
                <div className="w-full md:w-1/2">
                  <div
                    className={`group rounded-xl overflow-hidden ${
                      isDarkMode ? "bg-zinc-800/50" : "bg-white"
                    } backdrop-blur-sm border ${
                      isDarkMode ? "border-white/10" : "border-gray-200"
                    }`}
                  >
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3
                          className={`text-xl font-bold ${
                            isDarkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {project.title}
                        </h3>
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className={`p-2 rounded-full ${
                            isDarkMode ? "bg-purple-500/20" : "bg-purple-100"
                          }`}
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={
                              isDarkMode ? "text-purple-400" : "text-purple-600"
                            }
                          >
                            <path
                              d="M5 15L15 5M15 5H8M15 5V12"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </motion.div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.skills.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className={`text-xs px-3 py-1 rounded-full ${
                              isDarkMode
                                ? "bg-purple-500/20 text-purple-300"
                                : "bg-purple-100 text-purple-700"
                            }`}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                  <p
                    className={`mb-4 ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {project.description}
                  </p>
                  <div className="mb-2">
                    <h4
                      className={`font-semibold mb-2 ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Technologies Used:
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {project.technologies.map((tech, techIndex) => {
                        const skillItem = skills.find(
                          (skill) =>
                            skill.name.toLowerCase() === tech.toLowerCase()
                        );
                        return (
                          <motion.div
                            key={techIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.02 }}
                            className={`relative p-2 rounded-xl backdrop-blur-md border transition-all duration-300 ${
                              isDarkMode
                                ? "bg-black/20 border-white/10 hover:border-white/20"
                                : "bg-white/90 border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <div className="relative w-5 h-5">
                                <Image
                                  src={
                                    skillItem
                                      ? skillItem.icon
                                      : "/placeholder.svg?height=20&width=20"
                                  }
                                  alt={tech}
                                  layout="fill"
                                  objectFit="contain"
                                  className="transition-transform duration-300"
                                />
                              </div>
                              <span
                                className={`text-xs font-bold ${
                                  isDarkMode ? "text-gray-300" : "text-gray-700"
                                }`}
                              >
                                {tech}
                              </span>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16"
        >
          <h2
            className={`text-3xl font-bold mb-8 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            My Skills
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-4">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                className={`relative p-4 rounded-2xl backdrop-blur-md border transition-all duration-300 ${
                  isDarkMode
                    ? "bg-black/20 border-white/10 hover:border-white/20"
                    : "bg-white/90 border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-7 h-7">
                    <Image
                      src={skill.icon}
                      alt={skill.name}
                      layout="fill"
                      objectFit="contain"
                      className="transition-transform duration-300"
                    />
                  </div>
                  <span
                    className={`text-sm font-bold ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {skill.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
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
  );
}
