"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, Code, Users, Wrench, Mail } from "lucide-react";

interface FaqSectionProps {
  isDarkMode: boolean;
  isMuted: boolean;
  playHoverSound: () => void;
  playClickSound: () => void;
}

const PORTFOLIO_FAQS = [
  {
    question: "What technologies do you specialize in?",
    answer:
      "I specialize in fullstack development with JavaScript, TypeScript, React, Vue.js, Node.js, and Python. I also work with databases like PostgreSQL and MySQL, and have experience with frameworks like Next.js, Express.js, and Fastify.",
    icon: Code,
  },
  {
    question: "Are you available for freelance work?",
    answer:
      "Yes! I'm currently available for freelance projects. I work with clients worldwide and can adapt to different time zones and project requirements.",
    icon: Users,
  },
  {
    question: "How do you approach new projects?",
    answer:
      "I start by understanding your requirements and goals, then create a detailed plan with clear milestones. I focus on clean, maintainable code and ensure regular communication throughout the development process.",
    icon: HelpCircle,
  },
  {
    question: "Do you provide ongoing support and maintenance?",
    answer:
      "I offer ongoing support and maintenance for all projects I develop. This includes bug fixes, updates, performance optimization, and feature enhancements as needed.",
    icon: Wrench,
  },
  {
    question: "How can I get started working with you?",
    answer:
      "Simply reach out through the contact form or email me at gfaccin27@gmail.com. We'll discuss your project requirements, timeline, and budget to see if we're a good fit to work together.",
    icon: Mail,
  },
];

export default function FaqSection({
  isDarkMode,
  isMuted,
  playHoverSound,
  playClickSound,
}: FaqSectionProps) {
  const [hoverDirection, setHoverDirection] = useState<"left" | "right">(
    "left"
  );
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (!isMuted) {
      playHoverSound();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Alterna a direção para o próximo hover
    setHoverDirection((prev) => (prev === "left" ? "right" : "left"));
  };

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
    <section
      className={`flex flex-col items-center justify-center relative w-full py-16 lg:py-24 overflow-hidden ${
        isDarkMode ? "bg-zinc-900" : "bg-gray-50"
      } mt-36 rounded-t-[40px] border-t-[1px] border-purple-800/20`}
      id="faq"
    >
      {/* Background Effects */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-violet-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(147,51,234,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(147,51,234,0.2)_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-30"></div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* FAQ Content */}
          <div className="flex flex-col">
            <div className="flex flex-col items-start justify-start mb-8">
              <div
                onMouseEnter={handleAccordionHover}
                onClick={handleAccordionClick}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                  isDarkMode
                    ? "bg-purple-500/10 border-purple-500/20 hover:bg-purple-500/20"
                    : "bg-purple-100 border-purple-200 hover:bg-purple-200"
                } border mb-4 absolute left-12 -top-3 lg:left-auto lg:right-0 lg:top-1 transition-all duration-300`}
              >
                <HelpCircle
                  className={`w-4 h-4 ${
                    isDarkMode ? "text-purple-400" : "text-purple-600"
                  }`}
                />
                <span
                  className={`text-sm font-medium ${
                    isDarkMode ? "text-purple-300" : "text-purple-700"
                  }`}
                >
                  FAQ
                </span>
              </div>
              <h2
                className={`text-3xl lg:text-5xl font-bold text-left tracking-tight ${
                  isDarkMode ? "text-white" : "text-gray-900"
                } mb-4`}
              >
                Frequently Asked{" "}
                <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                  Questions
                </span>
              </h2>
              <p
                className={`text-base lg:text-lg font-normal ${
                  isDarkMode ? "text-zinc-400" : "text-gray-600"
                } text-left max-w-md leading-relaxed`}
              >
                Have questions about working together? Here are some common
                questions I receive from clients.
              </p>
            </div>

            <div className="space-y-4">
              <Accordion type="single" collapsible className="w-full space-y-4">
                {PORTFOLIO_FAQS.map((faq, index) => {
                  const IconComponent = faq.icon;
                  return (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className={`border rounded-xl backdrop-blur-sm transition-all duration-300 px-6 py-2 ${
                        isDarkMode
                          ? "border-zinc-800 bg-zinc-800/50 hover:border-purple-500/30"
                          : "border-gray-200 bg-white/80 hover:border-purple-300 hover:shadow-md"
                      }`}
                      onMouseEnter={handleAccordionHover}
                      onClick={handleAccordionClick}
                    >
                      <AccordionTrigger
                        className={`text-base font-semibold text-left transition-colors duration-200 hover:no-underline ${
                          isDarkMode
                            ? "text-white hover:text-purple-300"
                            : "text-gray-900 hover:text-purple-600"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex items-center justify-center w-8 h-8 rounded-lg border ${
                              isDarkMode
                                ? "bg-purple-500/10 border-purple-500/20"
                                : "bg-purple-50 border-purple-200"
                            }`}
                          >
                            <IconComponent
                              className={`w-4 h-4 ${
                                isDarkMode
                                  ? "text-purple-400"
                                  : "text-purple-600"
                              }`}
                            />
                          </div>
                          <span>{faq.question}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent
                        className={`text-base leading-relaxed pt-4 pl-11 ${
                          isDarkMode ? "text-zinc-300" : "text-gray-700"
                        }`}
                      >
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </div>
          </div>

          {/* FAQ Image */}
          <div className="col-span-1 w-full z-10 order-first lg:order-last">
            <div className="flex w-full justify-center">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-violet-500/20 rounded-full blur-2xl group-hover:blur-[90px] transition-all duration-500"></div>
                <Image
                  src={isDarkMode ? "/faq.svg" : "/faq-purple.svg"}
                  alt="FAQ Illustration"
                  width={500}
                  height={500}
                  className={`w-full max-w-md h-auto relative z-10 transition-all duration-1000 ${
                    isHovered
                      ? `animate-float -translate-y-10 ${
                          hoverDirection === "left"
                            ? "-translate-x-6"
                            : "translate-x-6"
                        }`
                      : ""
                  }`}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-10px) rotate(1deg);
          }
          50% {
            transform: translateY(-5px) rotate(-1deg);
          }
          75% {
            transform: translateY(-15px) rotate(0.5deg);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
