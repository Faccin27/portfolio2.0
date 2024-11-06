"use client";

import { useState, useEffect, useCallback } from "react";
import { Linkedin, Github, Instagram, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";
import bulb from "@/assets/bulb.png";
import { Particles } from "@/components/particles";
import React from "react";

type NavItem = "HOME" | "ABOUT" | "PROJECTS" | "CONTACT";

const MemoizedParticles = React.memo(Particles);

export default function Component() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [activeLink, setActiveLink] = useState<NavItem>("HOME");
  const [textIndex, setTextIndex] = useState<number>(0);
  const texts = [
    "Hey there! 👋",
    <>
      I am <span className={isDarkMode ? "text-purple-500" : "text-purple-700"}>GUILHERME FACCIN</span>
    </>
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
      className={`min-h-screen transition-colors duration-500 ${
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
        className={`relative py-6 px-4 border-b-2 border-purple-500/20 ${
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