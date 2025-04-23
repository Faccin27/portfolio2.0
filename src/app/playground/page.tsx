"use client";

import { useState, useCallback } from "react";
import { useSoundEffect } from "@/hooks/useSoundEffect";
import React from "react";
import { Particles } from "@/components/particles";
import Header from "@/components/layout/header";
import AnimatedSection from "@/components/animatedsection";
import VSCodeEditor from "@/components/vscode/vscode-editor";

const MemoizedParticles = React.memo(Particles);

export default function Playground() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const { playHoverSound, playClickSound } = useSoundEffect();
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
    playClickSound();
  }, [playClickSound]);

  const toggleTheme = useCallback(() => {
    setIsDarkMode((prev) => !prev);
    playClickSound();
  }, [playClickSound]);

  return (
    <div
      className={`min-h-screen overflow-x-hidden cursor-default ${
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

      <Header
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        isMuted={isMuted}
        toggleMute={toggleMute}
        playHoverSound={playHoverSound}
      />

      <div className="container mx-auto px-4 mt-20 pt-8">
        <AnimatedSection className="mt-4 mb-8" animation="fadeUp">
          <h1
            className={`text-3xl font-bold text-center ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            VS Code Editor Playground
          </h1>
          <p
            className={`text-center mt-2 ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            A faithful recreation of the VS Code interface
          </p>
        </AnimatedSection>

        <AnimatedSection animation="fadeRight">
          <VSCodeEditor 
            isDarkMode={isDarkMode} 
            isMuted={isMuted} 
            playHoverSound={playHoverSound} 
            playClickSound={playClickSound} 
          />
        </AnimatedSection>
      </div>
    </div>
  );
}
