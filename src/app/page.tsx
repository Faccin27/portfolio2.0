"use client";

import { useState, useEffect, useCallback } from "react";
import { useSoundEffect } from "@/hooks/useSoundEffect";
import React from "react";
import { Particles } from "@/components/particles";
import Header from "@/components/layout/header";
import HeroSection from "@/components/hero-section";
import ProjectsSection from "@/components/projects-section";
import AboutSection from "@/components/about-section";
import SkillsSection from "@/components/skills-section";
import ContactSection from "@/components/contact-section";
import GitHubContributionsCalendar from "@/components/github-contributions-calendar";
import GitHubStats from "@/components/GitHubStats";
import PlaygroundPuzzle from "@/components/playground-puzzle";
import FloatingNav from "@/components/floating-nav";
import FaqSection from "@/components/faq-section";

const MemoizedParticles = React.memo(Particles);

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const { playHoverSound, playClickSound, playKeySound } = useSoundEffect();
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
    playClickSound();
  }, [playClickSound]);

  const toggleTheme = useCallback(() => {
    setIsDarkMode((prev) => !prev);
    playClickSound();
  }, [playClickSound]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      const isInputElement =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      if (!isInputElement && !isMuted) {
        playKeySound();
      }
    };

    document.addEventListener("keydown", handleGlobalKeyDown);

    return () => {
      document.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, [playKeySound, isMuted]);

  return (
    <div
      className={`min-h-screen overflow-x-hidden cursor-crosshair ${
        isDarkMode ? "bg-zinc-900" : "bg-gray-100"
      }`}
      onClick={isMuted ? undefined : playClickSound}
      onKeyDown={playKeySound}
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

      <Header
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        isMuted={isMuted}
        toggleMute={toggleMute}
        playHoverSound={playHoverSound}
      />
      <FloatingNav />
      <div className="container mx-auto px-4 mt-20 pt-16">
        <HeroSection
          isDarkMode={isDarkMode}
          isMuted={isMuted}
          playHoverSound={playHoverSound}
          playClickSound={playClickSound}
        />

        <ProjectsSection
          isDarkMode={isDarkMode}
          isMuted={isMuted}
          playHoverSound={playHoverSound}
          playClickSound={playClickSound}
        />

        <AboutSection
          isDarkMode={isDarkMode}
          isMuted={isMuted}
          playHoverSound={playHoverSound}
          playClickSound={playClickSound}
        />

        <SkillsSection
          isDarkMode={isDarkMode}
          isMuted={isMuted}
          playHoverSound={playHoverSound}
          playClickSound={playClickSound}
        />

        <div id="github">
          <h1
            className={`text-3xl ${
              isDarkMode ? "text-white" : "text-gray-900"
            } mt-12 font-bold mb-6`}
          >
            GitHub Profile
          </h1>

          <GitHubStats
            isDarkMode={isDarkMode}
            isMuted={isMuted}
            playHoverSound={playHoverSound}
            playClickSound={playClickSound}
          />
          <GitHubContributionsCalendar
            isDarkMode={isDarkMode}
            isMuted={isMuted}
            playHoverSound={playHoverSound}
            playClickSound={playClickSound}
          />
        </div>
      </div>

      <FaqSection
        isDarkMode={isDarkMode}
        isMuted={isMuted}
        playHoverSound={playHoverSound}
        playClickSound={playClickSound}
      />
      <ContactSection
        isDarkMode={isDarkMode}
        isMuted={isMuted}
        playHoverSound={playHoverSound}
      />

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
