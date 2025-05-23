"use client";

import { useState, useCallback } from "react";
import { useSoundEffect } from "@/hooks/useSoundEffect";
import React from "react";
import { Particles } from "@/components/particles";
import Header from "@/components/layout/header";
import AnimatedSection from "@/components/animatedsection";
import VSCodeEditor from "@/components/vscode/vscode-editor";
import DevQuiz from "@/components/dev-quiz";
import WorldMap from "@/components/world-map";
import Terminal from "@/components/terminal";

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
        <AnimatedSection className="mt-20 mb-8" animation="fadeUp">
          <h1
            className={`text-3xl font-bold text-center ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Dev Quiz
          </h1>
          <p
            className={`text-center mt-2 ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Descubra se sua paixão esta no design ou na estrutura
          </p>
        </AnimatedSection>
        <AnimatedSection animation="fadeLeft">
          <div
            id="dev-quiz"
            className={`w-full rounded-lg overflow-hidden border shadow-lg z-10 h-full mb-12  ${
              isDarkMode
                ? "bg-[#1e1e1e] border-gray-800"
                : "bg-[#f3f3f3] border-gray-300"
            }`}
          >
            <DevQuiz
              isDarkMode={isDarkMode}
              playHoverSound={playHoverSound}
              playClickSound={playClickSound}
            />
          </div>
        </AnimatedSection>
        <AnimatedSection className="mt-4 mb-8" animation="fadeUp">
          <h1
            id="vscode"
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
      <div
        className={`mb-12 relative z-10 w-full flex flex-col justify-center mx-auto ${
          isDarkMode ? "bg-zinc-900 text-gray-200" : "bg-gray-100 text-zinc-900"
        } `}
      >
        <AnimatedSection className="mt-20 mb-8" animation="fadeUp">
          <h1
            id="world-map"
            className={`text-3xl font-bold text-center ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Mapa Mundial Interativo
          </h1>
          <p
            className={`text-center mt-2 ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Visualização de dados geográficos dos meus visistantes com D3.js
          </p>
        </AnimatedSection>

        <AnimatedSection animation="fadeLeft">
          <div className="container mx-auto ">
            <WorldMap
              isDarkMode={isDarkMode}
              playHoverSound={playHoverSound}
              playClickSound={playClickSound}
            />
          </div>
        </AnimatedSection>
      </div>

      <AnimatedSection className="mt-20 mb-8" animation="fadeUp">
        <h1
          id="terminal"
          className={`text-3xl font-bold text-center ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Interactive Terminal
        </h1>
        <p
          className={`text-center mt-2 ${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Explore a simulated command-line interface
        </p>
      </AnimatedSection>
      <AnimatedSection animation="fadeRight" className="mb-12">
        <Terminal
          isDarkMode={isDarkMode}
          playHoverSound={playHoverSound}
          playClickSound={playClickSound}
        />
      </AnimatedSection>
    </div>
  );
}
