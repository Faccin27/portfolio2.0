"use client";

import { useState, useEffect, useCallback, useRef, createContext, useContext, ReactNode } from "react";
import { Linkedin, Github, Mail, Moon, Sun, Globe, Code, Phone, ChevronDown } from 'lucide-react';
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Particles } from "@/components/particles";
import React from "react";
import AnimatedSection from "@/components/animatedsection";
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
import contactsvg from "@/assets/svgs/email.svg";

const MemoizedParticles = React.memo(Particles);

// Types
type Language = 'en' | 'pt';

interface Skill {
  name: string;
  icon: string;
}

interface Project {
  title: string;
  image: StaticImageData;
  description: string;
  skills: string[];
  technologies: string[];
  icon: React.ElementType;
  link: string;
}

interface SocialLink {
  Icon: React.ElementType;
  href: string;
}

// Translations
const translations = {
  en: {
    greeting: "Hey there! 👋",
    introduction: "I am",
    name: "GUILHERME FACCIN",
    role: "Fullstack Developer",
    description: "I am a developer with experience in JavaScript, React, and Node.js. I work to create simple, strong, and scalable solutions, always focusing on performance and user experience. My goal is to deliver high-quality applications that meet project needs.",
    viewAllProjects: "View All Projects",
    featuredProjects: "Featured Projects",
    mySkills: "My Skills",
    getInTouch: "Get in Touch",
  },
  pt: {
    greeting: "Olá! 👋",
    introduction: "Eu sou",
    name: "GUILHERME FACCIN",
    role: "Desenvolvedor Fullstack",
    description: "Sou um desenvolvedor com experiência em JavaScript, React e Node.js. Trabalho para criar soluções simples, robustas e escaláveis, sempre focando em desempenho e experiência do usuário. Meu objetivo é entregar aplicações de alta qualidade que atendam às necessidades do projeto.",
    viewAllProjects: "Ver Todos os Projetos",
    featuredProjects: "Projetos em Destaque",
    mySkills: "Minhas Habilidades",
    getInTouch: "Entre em Contato",
  },
};

// Language context
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations.en) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = useCallback((key: keyof typeof translations.en): string => {
    return translations[language][key] || key;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Data
const languages: { value: Language; label: string; flag: string }[] = [
  { value: "en", label: "English", flag: "🇺🇸" },
  { value: "pt", label: "Português", flag: "🇧🇷" },
];

const projects: Project[] = [
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
  // ... other projects
];

const skills: Skill[] = [
  { name: "HTML5", icon: html },
  { name: "CSS3", icon: css },
  // ... other skills
];

const socialLinks: SocialLink[] = [
  {
    Icon: Linkedin,
    href: "https://www.linkedin.com/in/guilherme-faccin-5b71a5172/",
  },
  { Icon: Github, href: "https://github.com/Faccin27" },
  { Icon: Mail, href: "mailto:gfaccin27@gmail.com" },
  { Icon: Phone, href: "https://wa.me/49999215720" },
];

function PortfolioContent() {
  const { language, setLanguage, t } = useLanguage();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [textIndex, setTextIndex] = useState<number>(0);
  const [showBulb, setShowBulb] = useState<boolean>(true);
  const [showThemeIcon, setShowThemeIcon] = useState<boolean>(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState<boolean>(false);
  const languageDropdownRef = useRef<HTMLDivElement>(null);

  const texts: (string | JSX.Element)[] = [
    t('greeting'),
    <>
      {t('introduction')}{" "}
      <span className={isDarkMode ? "text-purple-500" : "text-purple-700"}>
        {t('name')}
      </span>
    </>,
  ];

  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

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

  const toggleLanguageDropdown = useCallback(() => {
    setIsLanguageDropdownOpen((prev) => !prev);
  }, []);

  const changeLanguage = useCallback((lang: Language) => {
    setLanguage(lang);
    setIsLanguageDropdownOpen(false);
  }, [setLanguage]);

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
    const handleClickOutside = (event: MouseEvent) => {
      if (
        languageDropdownRef.current &&
        !languageDropdownRef.current.contains(event.target as Node)
      ) {
        setIsLanguageDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
            <div className="flex items-center space-x-4">
              <div className="relative" ref={languageDropdownRef}>
                <button
                  onClick={toggleLanguageDropdown}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    isDarkMode
                      ? "bg-zinc-800 text-white hover:bg-zinc-700"
                      : "bg-white text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  <Globe className="h-5 w-5" />
                  <span className="text-sm font-medium">{languages.find(lang => lang.value === language)?.label}</span>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </button>
                {isLanguageDropdownOpen && (
                  <div
                    className={`absolute right-0 mt-2 w-48 rounded-xl shadow-lg ${
                      isDarkMode 
                        ? "bg-zinc-800 border border-zinc-700" 
                        : "bg-white border border-gray-100"
                    } py-2`}
                  >
                    <div className="space-y-1">
                      {languages.map((lang) => (
                        <button
                          key={lang.value}
                          onClick={() => changeLanguage(lang.value)}
                          className={`flex items-center w-full px-3 py-2 text-sm transition-colors ${
                            isDarkMode
                              ? "hover:bg-zinc-700 text-gray-300"
                              : "hover:bg-gray-50 text-gray-700"
                          } ${
                            language === lang.value
                              ? isDarkMode 
                                ? "bg-zinc-700 text-white"
                                : "bg-gray-50 text-gray-900"
                              : ""
                          }`}
                        >
                          <span className="mr-2 text-xl">{lang.flag}</span>
                          {lang.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
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
                      <Sun className="text-yellow-400" size={24} />
                    ) : (
                      <Moon className="text-gray-600" size={24} />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
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

      <main className="container mx-auto px-4 mt-20 pt-16">
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
                {t('role')}
              </p>
              <p
                className={`mb-6 ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {t('description')}
              </p>
              <div className="flex space-x-6">
                {socialLinks.map(({ Icon, href }, index) => (
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
                    >
                      <Icon size={24} />
                    </Link>
                  </motion.div>
                ))}
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
            {t('featuredProjects')}
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
                          <Link
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
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

        <AnimatedSection className="mt-16" animation="fadeUp">
          <h2
            className={`text-3xl font-bold mb-8 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {t('mySkills')}
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

        <AnimatedSection className="mt-16" animation="fadeDown">
          <div className="container mx-auto px-4 py-12">
            <div
              className={`w-4/5 mx-auto rounded-2xl border transition-all duration-300 relative z-10 ${
                isDarkMode
                  ? "bg-zinc-800/80 border-white/10"
                  : "bg-slate-300/80 border-gray-200"
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
                    {t('getInTouch')}
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
      </main>

      <div className="pointer-events-none">
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