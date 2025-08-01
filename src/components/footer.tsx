import Link from "next/link";
import AnimationContainer from "@/components/ui/AnimationContainer";
import { Icons } from "@/components/ui/icons";
import { FaWhatsapp, FaDiscord } from "react-icons/fa";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import {
  Dot,
  Flame,
  Github,
  Linkedin,
  Mail,
  MapPin,
  QrCode,
  Twitter,
} from "lucide-react";
import { QRCodeModal } from "@/components/qr-code-modal";
import { useState } from "react";

interface footerProps {
  isDarkMode: boolean;
  isMuted: boolean;
  playHoverSound: () => void;
  playClickSound: () => void;
}

const Footer = ({
  isDarkMode,
  isMuted,
  playHoverSound,
  playClickSound,
}: footerProps) => {
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  return (
    <footer className="flex flex-col relative items-center justify-center border-t border-zinc-800 pt-16 pb-8 md:pb-0 px-6 lg:px-8 w-full max-w-6xl mx-auto lg:pt-32 bg-[radial-gradient(35%_128px_at_50%_0%,rgba(168,85,247,0.08),transparent)]">
      <div className="absolute top-0 left-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-1.5 bg-gradient-to-t from-purple-500 to-purple-800 rounded-full"></div>

      <div className="grid gap-8 xl:grid-cols-3 xl:gap-8 w-full">
        <AnimationContainer delay={0.1}>
          <div className="flex flex-col items-start justify-start md:max-w-[200px]">
            <div className="flex items-start">
              <Flame className="w-7 h-7 text-purple-500" />
            </div>
            <p className="text-zinc-500 mt-4 text-sm text-start">
              Let's build your digital dream{" "}
            </p>
            <span className={` ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'} mt-4  text-sm flex items-center`}>
              FaccinDev • Full Stack Developer
            </span>
          </div>
        </AnimationContainer>

        <div className="grid-cols-2 gap-8 grid mt-16 xl:col-span-2 xl:mt-0">
          <div className="md:grid md:grid-cols-2 md:gap-8">
            <AnimationContainer delay={0.2}>
              <div>
                <h3
                  className={`text-base font-medium ${
                    isDarkMode ? "text-white" : "text-zinc-700"
                  }`}
                >
                  Sections
                </h3>
                <ul className="mt-4 text-sm text-muted-foreground">
                  <li className="mt-2">
                    <Link
                      href="#home"
                      className="hover:text-purple-300 transition-all duration-300"
                      onMouseEnter={isMuted ? undefined : playHoverSound}
                    >
                      Home
                    </Link>
                  </li>
                  <li className="mt-2">
                    <Link
                      href="/projects"
                      onMouseEnter={isMuted ? undefined : playHoverSound}
                      className="hover:text-purple-300 transition-all duration-300"
                    >
                      Projects
                    </Link>
                  </li>
                  <li className="mt-2">
                    <Link
                      href="/playground"
                      onMouseEnter={isMuted ? undefined : playHoverSound}
                      className="hover:text-purple-300 transition-all duration-300"
                    >
                      Playground
                    </Link>
                  </li>
                </ul>
              </div>
            </AnimationContainer>

            <AnimationContainer delay={0.3}>
              <div className="mt-10 md:mt-0">
                <h3
                  className={`text-base font-medium ${
                    isDarkMode ? "text-white" : "text-zinc-700"
                  }`}
                >
                  Contact
                </h3>
                <ul className="mt-4 text-sm text-muted-foreground space-y-2 text-nowrap flex-nowrap whitespace-nowrap flex-shrink">
                  <li className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    <a
                      onMouseEnter={isMuted ? undefined : playHoverSound}
                      href="mailto:gfaccin27@gmail.com"
                      className="hover:text-purple-300 transition"
                    >
                      gfaccin27@gmail.com
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaWhatsapp className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    <a
                      onMouseEnter={isMuted ? undefined : playHoverSound}
                      href="https://wa.me/554999215720"
                      className="hover:text-purple-300 transition"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      49 9 99215720
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    SC - Brazil
                  </li>
                </ul>
              </div>
            </AnimationContainer>
          </div>
          <div>
            <AnimationContainer delay={0.4}>
              <div className="mt-10 md:mt-0">
              <h3
                  className={`text-base font-medium ${
                    isDarkMode ? "text-white" : "text-zinc-700"
                  }`}
                >
                  Socials
                </h3>
                <div className="flex gap-6 mt-4 justify-center mx-auto">
                  <Link
                    onMouseEnter={isMuted ? undefined : playHoverSound}
                    href="https://github.com/faccin27"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`relative flex items-center justify-center p-2 rounded-xl transition-all duration-300 hover:scale-110 border shadow ${
                      isDarkMode
                        ? "bg-zinc-800/80 border-white/10 text-[#a0a0a0] hover:bg-zinc-700/80"
                        : "bg-slate-300/80 border-gray-200 hover:bg-slate-400/80"
                    }`}
                  >
                    <Github className="w-6 h-6" />
                  </Link>
                  <Link
                    onMouseEnter={isMuted ? undefined : playHoverSound}
                    href="https://wa.me/554999215720"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`relative flex items-center justify-center p-2 rounded-xl transition-all duration-300 hover:scale-110 border shadow ${
                      isDarkMode
                        ? "bg-zinc-800/80 border-white/10 text-[#a0a0a0] hover:bg-zinc-700/80"
                        : "bg-slate-300/80 border-gray-200 hover:bg-slate-400/80"
                    }`}
                  >
                    <FaWhatsapp className="w-6 h-6" />
                  </Link>{" "}
                  <Link
                    onMouseEnter={isMuted ? undefined : playHoverSound}
                    href="https://www.linkedin.com/in/guilherme-faccin/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`relative flex items-center justify-center p-2 rounded-xl transition-all duration-300 hover:scale-110 border shadow ${
                      isDarkMode
                        ? "bg-zinc-800/80 border-white/10 text-[#a0a0a0] hover:bg-zinc-700/80"
                        : "bg-slate-300/80 border-gray-200 hover:bg-slate-400/80"
                    }`}
                  >
                    <Linkedin className="w-6 h-6" />
                  </Link>
                  <button
                    onMouseEnter={isMuted ? undefined : playHoverSound}
                    onClick={() =>
                      window.alert(
                        "Hii, feel free to add me on discord: thefaccin"
                      )
                    }
                    className={`relative flex items-center justify-center p-2 rounded-xl transition-all duration-300 hover:scale-110 border shadow ${
                      isDarkMode
                        ? "bg-zinc-800/80 border-white/10 text-[#a0a0a0] hover:bg-zinc-700/80"
                        : "bg-slate-300/80 border-gray-200 hover:bg-slate-400/80"
                    }`}
                  >
                    <FaDiscord className="w-6 h-6" />
                  </button>
                  <button
                    onMouseEnter={isMuted ? undefined : playHoverSound}
                    onClick={() => setIsQRModalOpen(true)}
                    className={`relative flex items-center justify-center p-2 rounded-xl transition-all duration-300 hover:scale-110 border shadow ${
                      isDarkMode
                        ? "bg-zinc-800/80 border-white/10 text-[#a0a0a0] hover:bg-zinc-700/80"
                        : "bg-slate-300/80 border-gray-200 hover:bg-slate-400/80"
                    }`}
                    aria-label="Share QR Code"
                  >
                    <QrCode className="w-5 h-5" />
                  </button>
                </div>
                <div
                  onMouseEnter={isMuted ? undefined : playHoverSound}
                  className={`relative mt-2 flex items-center px-4 py-2 w-2xl text-xs w-2/3 mx-auto rounded-full border shadow sm:text-sm justify-center ${
                    isDarkMode
                      ? "bg-zinc-800/80 border-white/10 text-white"
                      : "bg-slate-300/80 border-gray-200"
                  }`}
                >
                  <Dot className="-ml-2 text-green-500 w-7 h-7 animate-ping" />
                  <div className="flex items-center gap-1">
                    112 visitors in last 7 days
                  </div>
                </div>
              </div>
            </AnimationContainer>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-border/40 pt-4 md:pt-8 md:flex md:items-center md:justify-between w-full">
        <AnimationContainer delay={0.6}>
          <p className="text-sm text-muted-foreground mt-8 md:mt-0">
            &copy; {new Date().getFullYear()} FaccinDev . All rights reserved.
          </p>
        </AnimationContainer>
      </div>

      <div className="h-[20rem] lg:h-[20rem] hidden md:flex items-center justify-center">
        <TextHoverEffect text="Faccin" />
      </div>
      <QRCodeModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        isDarkMode={isDarkMode}
        url="https://faccindev.pro"
      />
    </footer>
  );
};

export default Footer;
