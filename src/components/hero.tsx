"use client";

import { useState, useEffect, useCallback } from "react";
import { Linkedin, Github, Instagram, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import contactsvg from "@/assets/svgs/email.svg";
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
import noticeday from "@/assets/noticeday.png";
import mysqls from "@/assets/svgs/mysql.svg";
import figmas from "@/assets/svgs/figma.svg";
import bootstrap from "@/assets/svgs/bootstrap.svg";
import postgreesql from "@/assets/svgs/postgresql.svg";
import postman from "@/assets/svgs/postman.svg";
import vue from "@/assets/svgs/vue.svg";
import python from "@/assets/svgs/python.svg";
import handlebars from "@/assets/svgs/handlebars.svg";
import electron from "@/assets/svgs/electron.svg";
import fastify from "@/assets/svgs/fastify.svg";
import insomnia from "@/assets/svgs/insomnia.svg";
import prisma from "@/assets/svgs/prisma.svg";
import music from "@/assets/music.png";
import nyx from "@/assets/nyx.png";
import mep from "@/assets/photo.jpg";
import { Particles } from "@/components/particles";
import React from "react";

type NavItem = "HOME" | "ABOUT" | "PROJECTS" | "CONTACT";

const MemoizedParticles = React.memo(Particles);

const projects = [
  {
    title: "Nyx RAT",
    image: nyx,
    description:
      "A complete music streaming application with user authentication, playlist management, and real-time playback features.",
    skills: ["Development", "API"],
    technologies: [
      "Python",
      "Next.js",
      "Node.js",
      "MySQL",
      "Fastify",
      "Motion",
    ],
  },
  {
    title: "Full stack music app",
    image: music,
    description:
      "A complete music streaming application with user authentication, playlist management, and real-time playback features.",
    skills: ["API", "SPA", "Development", "restFull"],
    technologies: ["Vue", "PostgreeSQL", "TypeScript", "Electron"],
  },
  {
    title: "Notice day",
    image: noticeday,
    description:
      "A complete music streaming application with user authentication, playlist management, and real-time playback features.",
    skills: ["API", "MVC"],
    technologies: ["Handlebars", "Express.js", "MySQL", "Node.js"],
  },
];

const skills = [
  { name: "HTML5", icon: html },
  { name: "CSS3", icon: css },
  { name: "Bootstrap", icon: bootstrap },
  { name: "Tailwind CSS", icon: tailwindcss },
  { name: "JavaScript", icon: javascript },
  { name: "TypeScript", icon: typescript },
  { name: "Vue", icon: vue },
  { name: "React", icon: react },
  { name: "Next.js", icon: nextjs },
  { name: "Electron", icon: electron },
  { name: "Motion", icon: motiond },
  { name: "Node.js", icon: nodejs },
  { name: "Express.js", icon: express },
  { name: "Fastify", icon: fastify },
  { name: "Prisma", icon: prisma },
  { name: "Handlebars", icon: handlebars },
  { name: "PostgreSQL", icon: postgreesql },
  { name: "MySQL", icon: mysqls },
  { name: "Python", icon: python },
  { name: "Git", icon: git },
  { name: "GitHub", icon: github },
  { name: "Postman", icon: postman },
  { name: "Insomnia", icon: insomnia },
  { name: "Figma", icon: figmas }
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

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

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
    <div className={`min-h-screen ${isDarkMode ? 'bg-zinc-900' : 'bg-gray-100'}`}>
      <div className="fixed inset-0 pointer-events-none">
        <div
          className={`absolute inset-0 opacity-75 transition-opacity duration-500 ${
            isDarkMode
              ? "bg-gradient-radial from-purple-900/20 via-transparent to-transparent"
              : "bg-gradient-radial from-purple-100/50 via-transparent to-transparent"
          }`}
        ></div>
      </div>

      <MemoizedParticles />
      
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

      <div className="container mx-auto px-4 mt-20">
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
                className={`text-5xl font-bold mb-4  ${
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
                    <div
                      className="relative aspect-video overflow-hidden cursor-zoom-in"
                      onMouseMove={handleMouseMove}
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-300 ease-out group-hover:scale-125"
                        style={{
                          transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                        }}
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
        {/* "More about me" section */}
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16"
        >
          <div className="container mx-auto px-4 py-12">
            <div
              className={`w-4/5 mx-auto rounded-2xl border transition-all duration-300 relative z-10 ${
                isDarkMode
                  ? "bg-zinc-800 border-white/10"
                  : "bg-slate-300 border-gray-200"
              }`}
            >
              <div className="flex flex-col md:flex-row items-stretch gap-12 p-8">
                <div className="w-full md:w-1/2 flex items-center justify-center">
                  <div className="relative w-full h-0 pb-[100%] rounded-full overflow-hidden border-4 border-purple-500">
                    <Image
                      src={mep}
                      alt="Profile"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2 flex flex-col justify-between space-y-6 py-8">
                  <div className="space-y-8">
                    <h2
                      className={`text-4xl font-bold ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      More about me
                    </h2>
                    <div className="space-y-6">
                      {[
                        { label: "Name", value: "Guilherme Faccin" },
                        { label: "Experience", value: "3 Years" },
                        { label: "Specialty", value: "Fullstack Developer" },
                        { label: "Email", value: "gfaccin27@gmail.com" },
                        { label: "Phone", value: "(49) 999215720" },
                        { label: "Freelance", value: "Avaliable" },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <p
                            className={`text-lg ${
                              isDarkMode ? "text-gray-400" : "text-gray-600"
                            }`}
                          >
                            {item.label}:
                          </p>
                          <p
                            className={`text-xl font-medium ${
                              isDarkMode ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {item.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <button
                      className={`px-6 py-2 rounded-xl cursor-pointer ${
                        isDarkMode
                          ? "bg-purple-500 hover:bg-purple-600"
                          : "bg-purple-600 hover:bg-purple-700"
                      } text-white transition-colors duration-300`}
                    >
                      View All Projects
                    </button>
                  </motion.div>
                </div>
              </div>
            </div>
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-8 gap-4 relative z-10">
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

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-16"
      >
        <div className="container mx-auto px-4 py-12">
          <div
            className={`w-4/5 mx-auto rounded-2xl border transition-all duration-300 relative z-10 ${
              isDarkMode
                ? "bg-zinc-800 border-white/10"
                : "bg-slate-300 border-gray-200"
            }`}
          >
            <div className="flex flex-col md:flex-row items-stretch gap-12 p-8">
              <div className="w-full md:w-1/2 flex items-center justify-center">
                <Image
                  src={contactsvg}
                  alt="Contact"
                  width={300}
                  height={300}
                />
              </div>
              <div className="w-full md:w-1/2 flex flex-col justify-between space-y-6">
                <h2
                  className={`text-4xl font-bold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Get in Touch
                </h2>
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="flex flex-col gap-4"
                >
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <label
                        htmlFor="email"
                        className={`text-sm font-medium leading-none ${
                          isDarkMode ? "text-white" : "text-gray-700"
                        }`}
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        className={`flex h-10 w-full rounded-md border px-3 py-2 text-sm ${
                          isDarkMode
                            ? "bg-zinc-700 border-zinc-600 text-white placeholder:text-zinc-400"
                            : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-400"
                        }`}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <label
                        htmlFor="subject"
                        className={`text-sm font-medium leading-none ${
                          isDarkMode ? "text-white" : "text-gray-700"
                        }`}
                      >
                        Subject
                      </label>
                      <input
                        id="subject"
                        type="text"
                        placeholder="What's this about?"
                        className={`flex h-10 w-full rounded-md border px-3 py-2 text-sm ${
                          isDarkMode
                            ? "bg-zinc-700 border-zinc-600 text-white placeholder:text-zinc-400"
                            : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-400"
                        }`}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <label
                        htmlFor="message"
                        className={`text-sm font-medium leading-none ${
                          isDarkMode ? "text-white" : "text-gray-700"
                        }`}
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        placeholder="Your message here..."
                        className={`flex w-full rounded-md border px-3 py-2 text-sm ${
                          isDarkMode
                            ? "bg-zinc-700 border-zinc-600 text-white placeholder:text-zinc-400"
                            : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-400"
                        }`}
                        rows={4}
                        required
                      ></textarea>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className={`inline-flex h-10 items-center justify-center rounded-md px-8 text-sm font-medium transition-colors ${
                      isDarkMode
                        ? "bg-purple-600 text-white hover:bg-purple-700"
                        : "bg-purple-600 text-white hover:bg-purple-700"
                    }`}
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className=" pointer-events-none">
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
