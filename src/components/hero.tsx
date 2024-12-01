"use client";

import { useState, useEffect, useCallback } from "react";
import { useSoundEffect } from "@/hooks/useSoundEffect";
import {
  Linkedin,
  Github,
  Mail,
  Moon,
  Sun,
  Globe,
  Code,
  Phone,
} from "lucide-react";
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
import mep from "@/assets/me.png";
import { Particles } from "@/components/particles";
import React from "react";
import AnimatedSection from "@/components/animatedsection";
// import hoversound from '../assets/sounds/hover.wav'

const MemoizedParticles = React.memo(Particles);
const projects = [
  {
    title: "Nyx RAT",
    image: nyx,
    description:
      "A remote access trojan with stealing and additional features, fully controlled through your browser, and it also supports Discord webhooks.",
    skills: ["Development", "API"],
    technologies: [
      "Python",
      "Next.js",
      "Node.js",
      "MySQL",
      "Fastify",
      "Motion",
    ],
    icon: Code,
    link: "https://github.com/Faccin27/Nyx---Stealthy-Remote-Access-Tool-RAT",
  },
  {
    title: "Full stack music app",
    image: music,
    description:
      "A complete music streaming application with user authentication, playlist management, and real-time playback features.",
    skills: ["API", "SPA", "Development", "restFull"],
    technologies: ["Vue", "TypeScript", "Electron"],
    icon: Globe,
    link: "https://github.com/Faccin27",
  },
  {
    title: "Notice day",
    image: noticeday,
    description:
      "A news website with options to like, comment, post news, job offers, events, and other items.",
    skills: ["API", "MVC"],
    technologies: ["Handlebars", "Express.js", "MySQL", "Node.js"],
    icon: Code,
    link: "https://github.com/Faccin27/Portal_Noticias",
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
  { name: "Figma", icon: figmas },
];
export default function Component() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const { playHoverSound, playClickSound } = useSoundEffect();
  const [textIndex, setTextIndex] = useState<number>(0);
  const [showBulb, setShowBulb] = useState(true);
  const [showThemeIcon, setShowThemeIcon] = useState(false);
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
    playClickSound();
  }, [playClickSound]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [texts.length]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage =
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
        100;
      if (scrollPercentage >= 10) {
        setShowBulb(false);
        setShowThemeIcon(true);
      } else {
        setShowBulb(true);
        setShowThemeIcon(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const socialLinks = [
    {
      Icon: Linkedin,
      href: "https://www.linkedin.com/in/guilherme-faccin-5b71a5172/",
      onMouseEnter: playHoverSound,
      onClick: playClickSound,
    },
    {
      Icon: Github,
      href: "https://github.com/Faccin27",
      onMouseEnter: playHoverSound,
      onClick: playClickSound,
    },
    {
      Icon: Mail,
      href: "mailto:gfaccin27@gmail.com",
      onMouseEnter: playHoverSound,
      onClick: playClickSound,
    },
    {
      Icon: Phone,
      href: "https://wa.me/49999215720",
      onMouseEnter: playHoverSound,
      onClick: playClickSound,
    },
  ];

  return (
    <div
      className={`min-h-screen overflow-x-hidden ${
        isDarkMode ? "bg-zinc-900" : "bg-gray-100"
      }`}
    >
      <div className="fixed inset-0 pointer-events-none">
        <div
          className={`absolute inset-0 opacity-75 transition-opacity duration-500 ${
            isDarkMode
              ? "bg-gradient-radial from-purple-900/20 via-transparent to-transparent"
              : "bg-gradient-radial from-purple-100/50 via-transparent to-transparent"
          }`}
        ></div>
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
              className={`font-bold text-xl md:text-2xl tracking-wider ${
                isDarkMode ? "text-purple-500" : "text-purple-700"
              } relative`}
            >
              <span className="relative z-10">FaccinDEV</span>
              <span
                className={`absolute inset-0 blur-md ${
                  isDarkMode ? "bg-purple-500/30" : "bg-purple-300/30"
                }`}
              ></span>
            </motion.span>
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
                    <Sun
                      className="text-yellow-400"
                      size={24}
                      onMouseEnter={playHoverSound}
                    />
                  ) : (
                    <Moon
                      className="text-gray-600"
                      size={24}
                      onMouseEnter={playHoverSound}
                    />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
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
              onMouseEnter={playHoverSound}
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
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full mb-2">
                    <svg viewBox="0 0 100 25" className="w-full">
                      <defs>
                        <path
                          id="curve"
                          d="M 0 0 Q 50 50 100 0"
                          fill="transparent"
                        />
                      </defs>
                      <text fill="white" fontSize="10">
                        <textPath
                          href="#curve"
                          startOffset="40%"
                          textAnchor="middle"
                        >
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

      <div className="container mx-auto px-4 mt-20 pt-16">
        <AnimatedSection animation="fadeDown">
          <div className="flex flex-col md:flex-row items-center justify-between relative">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full md:w-2/5 mb-8 md:mb-0"
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
              className="w-full md:w-1/2 md:pl-12"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={textIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className={`text-3xl md:text-5xl font-bold mb-4 ${
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
                I am a developer with experience in JavaScript, React, and
                Node.js. I work to create simple, strong, and scalable
                solutions, always focusing on performance and user experience.
                My goal is to deliver high-quality applications that meet
                project needs.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map(
                  ({ Icon, href, onMouseEnter, onClick }, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
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
                  )
                )}
              </div>
            </motion.div>
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-16" animation="fadeLeft">
          <h2
            className={`text-3xl font-bold mb-8 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Featured Projects
          </h2>
          <div className="space-y-16">
            {projects.map((project, index) => (
              <AnimatedSection
                key={index}
                animation={index % 2 === 0 ? "fadeRight" : "fadeLeft"}
              >
                <motion.div
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
                        isDarkMode ? "bg-zinc-800/50" : "bg-slate-300/70"
                      } backdrop-blur-sm border ${
                        isDarkMode ? "border-white/10" : "border-gray-200"
                      }`}
                    >
                      <div
                        className="relative aspect-video overflow-hidden cursor-zoom-in"
                        onMouseMove={handleMouseMove}
                        onClick={playClickSound}
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
                            onMouseEnter={playHoverSound}
                          >
                            {project.title}
                          </h3>
                          <Link
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onMouseEnter={playHoverSound}
                            onClick={playClickSound}
                          >
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              className={`p-2 rounded-full ${
                                isDarkMode
                                  ? "bg-purple-500/20"
                                  : "bg-purple-100"
                              }`}
                            >
                              <project.icon
                                size={20}
                                className={
                                  isDarkMode
                                    ? "text-purple-400"
                                    : "text-purple-600"
                                }
                              />
                            </motion.div>
                          </Link>
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
                              onMouseEnter={playHoverSound}
                              onClick={playClickSound}
                              className={`relative p-2 rounded-xl border transition-all duration-300 ${
                                isDarkMode
                                  ? "bg-black/20 border-white/10 hover:border-white/20"
                                  : "bg-slate-300/70 border-gray-200 hover:border-gray-300"
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
                                    isDarkMode
                                      ? "text-gray-300"
                                      : "text-gray-700"
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
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-16" animation="fadeRight">
          <div className="container mx-auto px-4 py-12">
            <div
              className={`w-full sm:w-11/12 md:w-4/5 mx-auto rounded-2xl border transition-all duration-300 relative z-10 ${
                isDarkMode
                  ? "bg-zinc-800/80 border-white/10"
                  : "bg-slate-300/80 border-gray-200"
              }`}
            >
              <div className="flex flex-col md:flex-row items-center md:items-stretch gap-12 p-6 md:p-8">
                <div className="w-full md:w-1/2 flex items-center justify-center">
                  <div className="relative w-3/4 h-0 pb-[100%] rounded-full overflow-hidden border-4 border-purple-500 shadow-[0_0_30px_15px_rgba(147,51,234,0.3)]">
                    <Image
                      src={mep}
                      alt="Profile"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2 flex flex-col justify-between space-y-6 py-4 md:py-8">
                  <div className="space-y-6">
                    <h2
                      className={`text-3xl sm:text-4xl md:text-2xl font-bold whitespace-nowrap ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      More about me
                    </h2>
                    <div className="space-y-4 md:space-y-6">
                      {[
                        { label: "Name", value: "Guilherme Faccin" },
                        { label: "Experience", value: "3 Years" },
                        { label: "Specialty", value: "Fullstack Developer" },
                        { label: "Email", value: "gfaccin27@gmail.com" },
                        { label: "Phone", value: "(49) 999215720" },
                        { label: "Freelance", value: "Available" },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="flex flex-col sm:flex-row sm:items-center sm:space-x-2"
                        >
                          <p
                            className={`text-sm sm:text-base md:text-lg ${
                              isDarkMode ? "text-gray-400" : "text-gray-600"
                            }`}
                          >
                            {item.label}:
                          </p>
                          <p
                            className={`text-base sm:text-lg md:text-xl font-medium ${
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
                    className="mt-4 md:mt-6"
                  >
                    <a
                      href="https://github.com/Faccin27"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block w-full sm:w-auto"
                    >
                      <button
                        onMouseEnter={playHoverSound}
                        onClick={playClickSound}
                        className={`w-full sm:w-auto px-6 py-2 rounded-xl cursor-pointer ${
                          isDarkMode
                            ? "bg-purple-500 hover:bg-purple-600"
                            : "bg-purple-600 hover:bg-purple-700"
                        } text-white transition-colors duration-300`}
                      >
                        Ver Todos os Projetos
                      </button>
                    </a>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-16" animation="fadeUp">
          <h2
            className={`text-3xl font-bold mb-8 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            My Skills
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-8 gap-4 relative z-10">
            {skills.map((skill, index) => (
              <AnimatedSection
                key={index}
                animation={index % 2 === 0 ? "fadeLeft" : "fadeRight"}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  className={`relative p-4 rounded-2xl border transition-all duration-300 ${
                    isDarkMode
                      ? "bg-black/20 border-white/10 hover:border-white/20"
                      : "bg-slate-300/80 border-gray-200 hover:border-gray-300"
                  }`}
                  onMouseEnter={playHoverSound}
                  onClick={playClickSound}
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
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>
      </div>

      <AnimatedSection className="mt-16" animation="fadeDown">
        <div className="container mx-auto px-4 py-12">
          <div
            className={`w-4/5 mx-auto rounded-2xl border transition-all duration-300 relative z-10 ${
              isDarkMode
                ? "bg-zinc-800/80 border-white/10"
                : "bg-slate-300/80 border-gray-200"
            }`}
            onMouseEnter={playHoverSound}
          >
            <div className="flex flex-col md:flex-row items-stretch gap-12 p-8">
              <div className="w-full md:w-1/2 flex items-center justify-center">
                <Image
                  src={contactsvg}
                  alt="Contact"
                  width={300}
                  height={300}
                  onMouseEnter={playHoverSound}
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
      </AnimatedSection>

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
