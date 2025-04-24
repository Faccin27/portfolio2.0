"use client";

import type React from "react";

import { useState, useEffect, useRef, type KeyboardEvent } from "react";
import { X, Maximize2, Minimize2 } from "lucide-react";
import { motion } from "framer-motion";
import { url } from "inspector";

interface TerminalProps {
  isDarkMode: boolean;
  playHoverSound: () => void;
  playClickSound: () => void;
}

interface CommandEntry {
  command: string;
  output: React.ReactNode;
  isError?: boolean;
}

export default function Terminal({
  isDarkMode,
  playHoverSound,
  playClickSound,
}: TerminalProps) {
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<CommandEntry[]>([
    {
      command: "",
      output: (
        <div className="text-green-400 mb-2">
          <p>
            Welcome to the interactive terminal. Type{" "}
            <span className="text-yellow-400">help</span> to see available
            commands.
          </p>
          <p>
            Try commands like <span className="text-yellow-400">whoami</span>,{" "}
            <span className="text-yellow-400">ls projects</span>, or{" "}
            <span className="text-yellow-400">cat about.txt</span>
          </p>
        </div>
      ),
    },
  ]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isMinimized, setIsMinimized] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commandHistory]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        terminalRef.current &&
        !terminalRef.current.contains(e.target as Node)
      ) {
        inputRef.current?.blur();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex].command);
      }
    }
    else if (e.key === "Tab") {
      e.preventDefault();
      handleTabCompletion();
    }
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex].command);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    }
    else if (e.key === "Enter") {
      executeCommand();
    }
  };

  const handleTabCompletion = () => {
    const commands = [
      "help",
      "clear",
      "whoami",
      "ls",
      "ls projects",
      "cat",
      "cat about.txt",
      "cat skills.txt",
      "cat contact.txt",
      "echo",
      "date",
    ];

    if (input) {
      const matchingCommands = commands.filter((cmd) => cmd.startsWith(input));
      if (matchingCommands.length === 1) {
        setInput(matchingCommands[0]);
      } else if (matchingCommands.length > 1) {
        addToCommandHistory(
          input,
          <div className="flex flex-wrap gap-2">
            {matchingCommands.map((cmd, i) => (
              <span key={i} className="text-yellow-400">
                {cmd}
              </span>
            ))}
          </div>
        );
      }
    }
  };

  const executeCommand = () => {
    if (!input.trim()) return;

    const trimmedInput = input.trim();
    const commandParts = trimmedInput.split(" ");
    const command = commandParts[0].toLowerCase();
    const args = commandParts.slice(1);

    playClickSound();

    let output: React.ReactNode;
    let isError = false;

    console.log(`Terminal command: ${trimmedInput}`);

    switch (command) {
      case "help":
        output = (
          <div className="space-y-1">
            <p className="text-green-400 font-bold">Available commands:</p>
            <p>
              <span className="text-yellow-400">help</span> - Display this help
              message
            </p>
            <p>
              <span className="text-yellow-400">clear</span> - Clear the
              terminal
            </p>
            <p>
              <span className="text-yellow-400">whoami</span> - Display user
              profile
            </p>
            <p>
              <span className="text-yellow-400">ls [directory]</span> - List
              contents of directory
            </p>
            <p>
              <span className="text-yellow-400">cat [file]</span> - Display file
              contents
            </p>
            <p>
              <span className="text-yellow-400">echo [text]</span> - Display
              text
            </p>
            <p>
              <span className="text-yellow-400">date</span> - Display current
              date and time
            </p>
          </div>
        );
        break;

      case "clear":
        setCommandHistory([]);
        setInput("");
        return;

      case "whoami":
        output = (
          <div className="space-y-1">
            <p className="text-green-400 font-bold">User Profile:</p>
            <p>
              <span className="text-blue-400">Name:</span> Guilherme Faccin
            </p>
            <p>
              <span className="text-blue-400">Role:</span> Full Stack Developer
            </p>
            <p>
              <span className="text-blue-400">Location:</span> Joaçaba, Santa
              Catarina - Brazil
            </p>
            <p>
              <span className="text-blue-400">Status:</span>{" "}
              <span className="text-green-400">Available for hire</span>
            </p>
          </div>
        );
        break;

      case "ls":
        if (args.length === 0 || args[0] === "/") {
          output = (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              <span className="text-blue-400">projects/</span>
              <span className="text-yellow-400">about.txt</span>
              <span className="text-yellow-400">skills.txt</span>
              <span className="text-yellow-400">contact.txt</span>
            </div>
          );
        } else if (args[0] === "projects" || args[0] === "projects/") {
          const projects = [
            {
              name: "portfolio2.0.git",
              url: "https://github.com/Faccin27/portfolio2.0",
            },
            {
              name: "AB_Pinturas.git",
              url: "https://github.com/Faccin27/AB_Pinturas",
            },
            {
              name: "jobfinder.git",
              url: "https://github.com/Faccin27/jobfinder",
            },
            {
              name: "fixteam.git",
              url: "https://github.com/Faccin27/fixteam.uk",
            },
            {
              name: "linkedin_bot.git",
              url: "https://github.com/Faccin27/linkedin_bot",
            },
            {
              name: "Nyx---Stealthy-Remote-Access-Tool-RAT",
              url: "https://github.com/Faccin27/Nyx---Stealthy-Remote-Access-Tool-RAT",
            },
          ];

          output = (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {projects.map((project, index) => (
                <a
                  key={index}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:text-green-300 hover:underline flex items-center cursor-pointer"
                  onMouseEnter={playHoverSound}
                  onClick={(e) => {
                    e.stopPropagation();
                    playClickSound();
                    addToCommandHistory(
                      `open ${project.name}`,
                      <p className="text-blue-400">
                        Opening {project.name} in a new tab...
                      </p>
                    );
                  }}
                >
                  <span>{project.name}</span>
                </a>
              ))}
            </div>
          );
        } else {
          output = (
            <p className="text-red-400">Directory not found: {args[0]}</p>
          );
          isError = true;
        }
        break;

      case "cat":
        if (args.length === 0) {
          output = <p className="text-red-400">Usage: cat [file]</p>;
          isError = true;
        } else if (args[0] === "about.txt") {
          output = (
            <div className="space-y-2">
              <p className="text-green-400 font-bold">About Me:</p>
              <p>
                Full Stack Developer with 3+ years of experience building web
                applications and interactive experiences.
              </p>
              <p>
                Passionate about creating intuitive user interfaces and robust
                backend systems.
              </p>
              <p>
                Currently focused on React, Next.js, TypeScript, and Node.js
                development.
              </p>
            </div>
          );
        } else if (args[0] === "skills.txt") {
          output = (
            <div className="space-y-2">
              <p className="text-green-400 font-bold">Technical Skills:</p>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-blue-400 font-bold">Frontend:</p>
                  <p>React, Next.js</p>
                  <p>TypeScript, JavaScript</p>
                  <p>HTML5, CSS3, Tailwind</p>
                  <p>Framer Motion</p>
                </div>
                <div>
                  <p className="text-blue-400 font-bold">Backend:</p>
                  <p>Node.js, Express</p>
                  <p>MongoDB, PostgreSQL</p>
                  <p>GraphQL, REST APIs</p>
                  <p>AWS, Vercel</p>
                </div>
              </div>
            </div>
          );
        } else if (args[0] === "contact.txt") {
          output = (
            <div className="space-y-1">
              <p className="text-green-400 font-bold">Contact Information:</p>
              <p>
                <span className="text-blue-400">Email:</span>{" "}
                gfaccin27@gmail.com
              </p>
              <p>
                <span className="text-blue-400">GitHub:</span>{" "}
                github.com/Faccin27
              </p>
              <p>
                <span className="text-blue-400">LinkedIn:</span>{" "}
                linkedin.com/in/guilherme-faccin
              </p>
              <p>
                <span className="text-blue-400">Discord:</span> @thefaccin
              </p>
            </div>
          );
        } else {
          output = <p className="text-red-400">File not found: {args[0]}</p>;
          isError = true;
        }
        break;

      case "echo":
        if (args.length === 0) {
          output = <p></p>;
        } else {
          output = <p>{args.join(" ")}</p>;
        }
        break;

      case "date":
        output = <p>{new Date().toString()}</p>;
        break;

      default:
        output = (
          <p className="text-red-400">
            Command not found: {command}. Type 'help' for available commands.
          </p>
        );
        isError = true;
    }

    addToCommandHistory(trimmedInput, output, isError);
    setInput("");
    setHistoryIndex(-1);
  };

  const addToCommandHistory = (
    command: string,
    output: React.ReactNode,
    isError = false
  ) => {
    setCommandHistory((prev) => [
      ...prev,
      {
        command,
        output,
        isError,
      },
    ]);
  };

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
    playClickSound();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`w-3/4 mx-auto rounded-lg overflow-hidden border shadow-lg z-10 ${
        isDarkMode
          ? "bg-[#0d1117] border-gray-800"
          : "bg-[#f3f3f3] border-gray-300"
      }`}
    >
      {/* Terminal Header */}
      <div
        className={`flex items-center justify-between px-4 py-2 ${
          isDarkMode
            ? "bg-[#161b22] text-gray-300"
            : "bg-[#e1e1e1] text-gray-700"
        }`}
      >
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5">
            <div
              className="w-3 h-3 rounded-full bg-red-500 cursor-pointer"
              onMouseEnter={playHoverSound}
              onClick={() => {
                playClickSound();
                addToCommandHistory(
                  "exit",
                  <p className="text-red-400">
                    Nice try! This terminal can't be closed.
                  </p>
                );
              }}
            ></div>
            <div
              className="w-3 h-3 rounded-full bg-yellow-500 cursor-pointer"
              onMouseEnter={playHoverSound}
              onClick={toggleMinimize}
            ></div>
            <div
              className="w-3 h-3 rounded-full bg-green-500 cursor-pointer"
              onMouseEnter={playHoverSound}
              onClick={() => {
                playClickSound();
                addToCommandHistory(
                  "maximize",
                  <p className="text-green-400">
                    Terminal is already at optimal size.
                  </p>
                );
              }}
            ></div>
          </div>
          <span className="font-mono text-sm ml-2">terminal@playground ~ </span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            className="p-1 rounded hover:bg-gray-700/20"
            onMouseEnter={playHoverSound}
            onClick={toggleMinimize}
          >
            {isMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
          </button>
          <button
            className="p-1 rounded hover:bg-gray-700/20"
            onMouseEnter={playHoverSound}
            onClick={() => {
              playClickSound();
              setCommandHistory([]);
            }}
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Terminal Content */}
      {!isMinimized && (
        <div
          ref={terminalRef}
          className={`font-mono text-sm p-4 h-80 overflow-y-auto z-10 relative ${
            isDarkMode
              ? "bg-[#0d1117] text-gray-200"
              : "bg-[#f3f3f3] text-gray-800"
          }`}
          onClick={handleTerminalClick}
        >
          {commandHistory.map((entry, index) => (
            <div key={index} className="mb-2">
              {entry.command && (
                <div className="flex items-start">
                  <span className="text-green-400 mr-2">$</span>
                  <span>{entry.command}</span>
                </div>
              )}
              <div className={`ml-4 ${entry.isError ? "text-red-400" : ""}`}>
                {entry.output}
              </div>
            </div>
          ))}

          <div className="flex items-center mt-1">
            <span className="text-green-400 mr-2">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className={`flex-1 bg-transparent outline-none ${
                isDarkMode ? "text-gray-200" : "text-gray-800"
              }`}
              autoComplete="off"
              spellCheck="false"
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}
