import { ArrowRightIcon } from "lucide-react";
import AnimationContainer from "./ui/AnimationContainer";
import { LampContainer } from "./ui/lamp";
import Link from "next/link";
import { useState } from "react";

interface stepSectionProps {
  isDarkMode: boolean;
  isMuted: boolean;
  playHoverSound: () => void;
  playClickSound: () => void;
}

export default function stepSection({
  isDarkMode,
  isMuted,
  playHoverSound,
  playClickSound,
}: stepSectionProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleAccordionHover = () => {
    if (!isMuted) {
      playHoverSound();
    }
  };

  const handleAccordionClick = () => {
    if (!isMuted) {
      playClickSound();
    }
  };
  return (
    <AnimationContainer delay={0.1}>
      <LampContainer>
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-violet-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(147,51,234,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(147,51,234,0.2)_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-30"></div>

        <div className="flex flex-col items-center justify-center relative w-full text-center">
          <h2 className="bg-gradient-to-b from-neutral-200 to-neutral-400 py-4 bg-clip-text text-center text-4xl md:text-7xl !leading-[1.15] font-medium font-heading tracking-tight text-transparent mt-8">
            Let’s bring your dreams to life
          </h2>
          <p className="text-muted-foreground mt-6 max-w-md mx-auto">
            Every dream starts with an idea... let’s craft yours into a real,
            impactful, and unforgettable digital experience.{" "}
          </p>
          <div className="mt-20">
            <Link
              href={"https://wa.me/49999215720"}
              target="_blank"
              className="group relative inline-flex h-[56px] items-center justify-center rounded-full bg-purple-800/80 py-1 pl-6 pr-14 font-medium text-neutral-50 shadow-[0_0_20px_rgba(168,85,247,0.7)]"
              onMouseEnter={handleAccordionHover}
              onClick={handleAccordionClick}
            >
              {/* EFEITO DE FUMAÇA/NEON ATRÁS */}
              <div className="absolute inset-0 rounded-full bg-purple-500 blur-sm opacity-40 group-hover:opacity-60 transition-opacity duration-300" />

              <span className="z-10 pr-2">Build your digital dream</span>

              <div className="absolute right-1 inline-flex h-12 w-12 items-center justify-end rounded-full bg-zinc-700 transition-[width] group-hover:w-[calc(100%-8px)]">
                <div className="mr-3.5 flex items-center justify-center">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-neutral-50"
                  >
                    <path
                      d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </LampContainer>
    </AnimationContainer>
  );
}
