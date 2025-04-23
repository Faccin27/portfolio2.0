"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import {
  ChevronRight,
  File,
  FolderClosed,
  FolderOpen,
  Settings,
  Search,
  GitBranch,
  Package,
  Play,
  X,
  Save,
  FileCode,
  FileJson,
  FileText,
  ImageIcon,
  Terminal,
} from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import AnimatedSection from "@/components/animatedsection";
import {
  vscDarkPlus,
  vs,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import { FileContent, Folder } from "@/types/vscode-types";
import { fileContents, initialFolders } from "./vscode-data";

interface VSCodeEditorProps {
  isDarkMode: boolean;
  isMuted: boolean;
  playHoverSound: () => void;
  playClickSound: () => void;
}

export default function VSCodeEditor({
  isDarkMode,
  isMuted,
  playHoverSound,
  playClickSound,
}: VSCodeEditorProps) {
  const [isEditorFocused, setIsEditorFocused] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("index.js");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [editorContent, setEditorContent] = useState<string>(
    "// Write your code here\nconsole.log('Hello, world!');\n\nfunction greet(name) {\n  return `Hello, ${name}!`;\n}\n\nconst result = greet('Developer');\nconsole.log(result);"
  );
  const [lineCount, setLineCount] = useState<number>(8);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [showConsole, setShowConsole] = useState<boolean>(false);
  const [activeFile, setActiveFile] = useState<FileContent>({
    content:
      "// Write your code here\nconsole.log('Hello, world!');\n\nfunction greet(name) {\n  return `Hello, ${name}!`;\n}\n\nconst result = greet('Developer');\nconsole.log(result);",
    type: "code",
    language: "javascript",
  });
  const [openTabs, setOpenTabs] = useState<string[]>(["index.js"]);
  const [cursorPosition, setCursorPosition] = useState<{
    line: number;
    column: number;
  }>({ line: 1, column: 1 });
  const [caretPosition, setCaretPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });
  const [scrollPosition, setScrollPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });
  const [folders, setFolders] = useState<Folder[]>(initialFolders);

  const syntaxHighlighterRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLTextAreaElement>(null);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
    playClickSound();
  }, [playClickSound]);

  const toggleConsole = useCallback(() => {
    setShowConsole((prev) => !prev);
    playClickSound();
  }, [playClickSound]);

  useEffect(() => {
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      const isInputElement =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      if (!isInputElement && !isMuted) {
        playClickSound();
      }
    };

    document.addEventListener("keydown", handleGlobalKeyDown);

    return () => {
      document.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, [playClickSound, isMuted]);

  const updateCursorPosition = () => {
    if (!editorRef.current) return;

    const textarea = editorRef.current;
    const cursorPos = textarea.selectionStart;

    const textBeforeCursor = textarea.value.substring(0, cursorPos);
    const lines = textBeforeCursor.split("\n");
    const line = lines.length;
    const column = lines[lines.length - 1].length + 1;

    setCursorPosition({ line, column });

    const charWidth = 8.4;
    const lineHeight = 21;

    const left = (column - 1) * charWidth + 10;
    const top = (line - 1) * lineHeight + 10;

    setCaretPosition({ top, left });
  };

  const syncScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    const { scrollTop, scrollLeft } = e.currentTarget;
    setScrollPosition({ top: scrollTop, left: scrollLeft });

    //Sync da syntaxe
    if (syntaxHighlighterRef.current) {
      syntaxHighlighterRef.current.scrollTop = scrollTop;
      syntaxHighlighterRef.current.scrollLeft = scrollLeft;
    }
  };

  const updateFileContentInFolders = (fileName: string, content: string) => {
    const newFolders = [...folders];

    for (const folder of newFolders) {
      const fileIndex = folder.files.findIndex(
        (file) => file.name === fileName
      );
      if (fileIndex !== -1) {
        folder.files[fileIndex].content = content;
        break;
      }
    }

    setFolders(newFolders);
  };

  const handleTabClick = (tabName: string) => {
    if (activeTab === tabName) return;

    setActiveTab(tabName);

    // Get conteudo do arquivo
    const fileContent = fileContents[tabName] || findFileInFolders(tabName);

    if (fileContent) {
      setActiveFile(fileContent);

      if (fileContent.type === "code" || fileContent.type === "text") {
        setEditorContent(fileContent.content);
        const lines = fileContent.content.split("\n");
        setLineCount(lines.length);
      }
    }

    // Add to open tabs
    if (!openTabs.includes(tabName)) {
      setOpenTabs([...openTabs, tabName]);
    }

    playClickSound();
  };

  const findFileInFolders = (fileName: string): FileContent | undefined => {
    for (const folder of folders) {
      const file = folder.files.find((file) => file.name === fileName);
      if (file) {
        return {
          content: file.content,
          type: file.type,
          language: file.language,
          path: file.path,
        };
      }
    }
    return undefined;
  };

  const closeTab = (tabName: string, e: React.MouseEvent) => {
    e.stopPropagation();

    // remove a tab das tabs abertas
    const newTabs = openTabs.filter((tab) => tab !== tabName);
    setOpenTabs(newTabs);

    // Se a tab ativa for fechada, troca pela nova última tab
    if (activeTab === tabName && newTabs.length > 0) {
      handleTabClick(newTabs[newTabs.length - 1]);
    }

    playClickSound();
  };

  const toggleFolder = (folderIndex: number) => {
    const newFolders = [...folders];
    newFolders[folderIndex].isOpen = !newFolders[folderIndex].isOpen;
    setFolders(newFolders);
    playClickSound();
  };

  const executeCode = () => {
    if (activeFile.type !== "code" || activeFile.language !== "javascript") {
      setConsoleOutput(["[error] Error: Can only execute JavaScript files"]);
      setShowConsole(true);
      return;
    }

    setConsoleOutput([]);

    const originalConsoleLog = console.log;
    const originalConsoleError = console.error;
    const originalConsoleWarn = console.warn;
    const logs: string[] = [];

    console.log = (...args) => {
      const output = args
        .map((arg) =>
          typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg)
        )
        .join(" ");
      logs.push(`[log] ${output}`);
    };

    console.error = (...args) => {
      const output = args
        .map((arg) =>
          typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg)
        )
        .join(" ");
      logs.push(`[error] ${output}`);
    };

    console.warn = (...args) => {
      const output = args
        .map((arg) =>
          typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg)
        )
        .join(" ");
      logs.push(`[warn] ${output}`);
    };

    try {
      const codeToExecute = editorContent.replace(/export\s+/g, "");
      // execute o codigo
      const result = new Function(codeToExecute)();

      if (result !== undefined && logs.length === 0) {
        logs.push(
          `[return] ${
            typeof result === "object"
              ? JSON.stringify(result, null, 2)
              : result
          }`
        );
      }

      // return value = null ? show a success message : fuck me this doesnt work because ??????????????????????????????
      if (logs.length === 0) {
        logs.push("[success] Code executed successfully with no output");
      }
    } catch (error: any) {
      logs.push(`[error] ${error.name}: ${error.message}`);

      if (error.stack) {
        const stackLines = error.stack.split("\n");
        for (let i = 1; i < stackLines.length; i++) {
          logs.push(`  ${stackLines[i].trim()}`);
        }
      }
    } finally {
      console.log = originalConsoleLog;
      console.error = originalConsoleError;
      console.warn = originalConsoleWarn;

      setConsoleOutput(logs);
      setShowConsole(true);
    }

    playClickSound();
  };

  const renderLineNumbers = () => {
    return Array.from({ length: lineCount }).map((_, i) => (
      <div
        key={i}
        className={`text-right pr-3 py-[2px] select-none ${
          i + 1 === cursorPosition.line
            ? isDarkMode
              ? "text-white bg-[#282828]"
              : "text-black bg-[#e0e0e0]"
            : isDarkMode
            ? "text-gray-500"
            : "text-gray-400"
        }`}
      >
        {i + 1}
      </div>
    ));
  };

  const blinkingCursorStyle = `
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
    .animate-blink {
      animation: blink 1s step-end infinite;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: blinkingCursorStyle }} />
      <AnimatedSection animation="fadeUp">


      <div
        className={`w-full rounded-lg overflow-hidden border shadow-lg  ${
          isDarkMode
            ? "bg-[#1e1e1e] border-gray-800"
            : "bg-[#f3f3f3] border-gray-300"
        }`}
        style={{ height: "70vh" }}
      >
        {/* VS Code Bar */}
        <div className="flex h-full">
          <div
            className={`w-12 flex-shrink-0 flex flex-col items-center py-2 ${
              isDarkMode ? "bg-[#333333]" : "bg-[#2c2c2c]"
            }`}
          >
            <button
              className={`p-2 mb-2 rounded hover:bg-opacity-20 ${
                isDarkMode
                  ? "hover:bg-white text-gray-400 hover:text-white"
                  : "hover:bg-white text-gray-300 hover:text-white"
              }`}
              onClick={toggleSidebar}
              onMouseEnter={isMuted ? undefined : playHoverSound}
            >
              <File className="h-5 w-5" />
            </button>
            <button
              className={`p-2 mb-2 rounded hover:bg-opacity-20 ${
                isDarkMode
                  ? "hover:bg-white text-gray-400 hover:text-white"
                  : "hover:bg-white text-gray-300 hover:text-white"
              }`}
              onMouseEnter={isMuted ? undefined : playHoverSound}
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              className={`p-2 mb-2 rounded hover:bg-opacity-20 ${
                isDarkMode
                  ? "hover:bg-white text-gray-400 hover:text-white"
                  : "hover:bg-white text-gray-300 hover:text-white"
              }`}
              onMouseEnter={isMuted ? undefined : playHoverSound}
            >
              <GitBranch className="h-5 w-5" />
            </button>
            <button
              className={`p-2 mb-2 rounded hover:bg-opacity-20 ${
                isDarkMode
                  ? "hover:bg-white text-gray-400 hover:text-white"
                  : "hover:bg-white text-gray-300 hover:text-white"
              }`}
              onMouseEnter={isMuted ? undefined : playHoverSound}
            >
              <Package className="h-5 w-5" />
            </button>
            <div className="flex-grow"></div>
            <button
              className={`p-2 rounded hover:bg-opacity-20 ${
                isDarkMode
                  ? "hover:bg-white text-gray-400 hover:text-white"
                  : "hover:bg-white text-gray-300 hover:text-white"
              }`}
              onMouseEnter={isMuted ? undefined : playHoverSound}
            >
              <Settings className="h-5 w-5" />
            </button>
          </div>

          {/* Sidebar */}
          {sidebarOpen && (
            <div
              className={`w-64 flex-shrink-0 overflow-y-auto ${
                isDarkMode ? "bg-[#252526]" : "bg-[#e8e8e8]"
              }`}
            >
              <div
                className={`px-4 py-2 uppercase text-xs font-semibold ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Explorer
              </div>
              <div className="px-2">
                {folders.map((folder, index) => (
                  <div key={index} className="mb-1">
                    <div
                      className={`flex items-center px-2 py-1 rounded cursor-pointer ${
                        isDarkMode
                          ? "hover:bg-[#2a2d2e] text-gray-300"
                          : "hover:bg-[#d8d8d8] text-gray-700"
                      }`}
                      onClick={() => toggleFolder(index)}
                      onMouseEnter={isMuted ? undefined : playHoverSound}
                    >
                      <ChevronRight
                        className={`h-4 w-4 mr-1 transition-transform ${
                          folder.isOpen ? "transform rotate-90" : ""
                        }`}
                      />
                      {folder.isOpen ? (
                        <FolderOpen className="h-4 w-4 mr-2 text-blue-400" />
                      ) : (
                        <FolderClosed className="h-4 w-4 mr-2 text-blue-400" />
                      )}
                      <span>{folder.name}</span>
                    </div>

                    {folder.isOpen && folder.files.length > 0 && (
                      <div className="ml-4">
                        {folder.files.map((file, fileIndex) => (
                          <div
                            key={fileIndex}
                            className={`flex items-center px-2 py-1 rounded cursor-pointer ${
                              activeTab === file.name
                                ? isDarkMode
                                  ? "bg-[#37373d] text-white"
                                  : "bg-[#d0d0d0] text-black"
                                : isDarkMode
                                ? "hover:bg-[#2a2d2e] text-gray-300"
                                : "hover:bg-[#d8d8d8] text-gray-700"
                            }`}
                            onClick={() => handleTabClick(file.name)}
                            onMouseEnter={isMuted ? undefined : playHoverSound}
                          >
                            {file.icon}
                            <span className="ml-2">{file.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AREA DOS FUDIDO */}
          <div className="flex-grow flex flex-col">
            {/* Tabs */}
            <div
              className={`flex overflow-x-auto ${
                isDarkMode
                  ? "bg-[#252526] border-b border-[#3c3c3c]"
                  : "bg-[#e8e8e8] border-b border-[#cccccc]"
              }`}
            >
              {openTabs.map((tab) => {
                let icon = <FileText className="h-4 w-4" />;
                if (tab.endsWith(".js"))
                  icon = <FileCode className="h-4 w-4" />;
                if (tab.endsWith(".json"))
                  icon = <FileJson className="h-4 w-4" />;
                if (tab.endsWith(".png"))
                  icon = <ImageIcon className="h-4 w-4" />;

                return (
                  <div
                    key={tab}
                    className={`flex items-center px-3 py-1 border-r cursor-pointer ${
                      activeTab === tab
                        ? isDarkMode
                          ? "bg-[#1e1e1e] text-white border-t-2 border-t-blue-500"
                          : "bg-[#f3f3f3] text-black border-t-2 border-t-blue-500"
                        : isDarkMode
                        ? "bg-[#2d2d2d] text-gray-400 hover:bg-[#1e1e1e]"
                        : "bg-[#d8d8d8] text-gray-700 hover:bg-[#e8e8e8]"
                    } ${
                      isDarkMode ? "border-r-[#3c3c3c]" : "border-r-[#cccccc]"
                    }`}
                    onClick={() => handleTabClick(tab)}
                    onMouseEnter={isMuted ? undefined : playHoverSound}
                  >
                    {icon}
                    <span className="ml-2">{tab}</span>
                    <button
                      className={`ml-2 rounded-full p-0.5 ${
                        isDarkMode
                          ? "hover:bg-[#3c3c3c] text-gray-400"
                          : "hover:bg-[#cccccc] text-gray-600"
                      }`}
                      onClick={(e) => closeTab(tab, e)}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Editor cntnt */}
            <div className="flex-grow flex flex-col overflow-hidden relative">
              <div className={`absolute top-2 right-2 z-20 flex space-x-2`}>
                <button
                  className={`p-1.5 rounded-md ${
                    isDarkMode
                      ? "bg-[#333333] hover:bg-[#444444] text-gray-300"
                      : "bg-[#e0e0e0] hover:bg-[#d0d0d0] text-gray-700"
                  }`}
                  onClick={executeCode}
                  title="Run Code"
                  onMouseEnter={isMuted ? undefined : playHoverSound}
                >
                  <Play className="h-4 w-4" />
                </button>
                <button
                  className={`p-1.5 rounded-md ${
                    isDarkMode
                      ? "bg-[#333333] hover:bg-[#444444] text-gray-300"
                      : "bg-[#e0e0e0] hover:bg-[#d0d0d0] text-gray-700"
                  }`}
                  onClick={toggleConsole}
                  title="Toggle Console"
                  onMouseEnter={isMuted ? undefined : playHoverSound}
                >
                  <Terminal className="h-4 w-4" />
                </button>
                <button
                  className={`p-1.5 rounded-md ${
                    isDarkMode
                      ? "bg-[#333333] hover:bg-[#444444] text-gray-300"
                      : "bg-[#e0e0e0] hover:bg-[#d0d0d0] text-gray-700"
                  }`}
                  title="Save File"
                  onMouseEnter={isMuted ? undefined : playHoverSound}
                  onClick={isMuted ? undefined : playClickSound}
                >
                  <Save className="h-4 w-4" />
                </button>
              </div>

              {activeFile.type === "image" ? (
                <div
                  className={`flex-grow flex items-center justify-center p-4 ${
                    isDarkMode ? "bg-[#1e1e1e]" : "bg-[#f3f3f3]"
                  }`}
                >
                  <div
                    className={`relative rounded-lg overflow-hidden border ${
                      isDarkMode ? "border-gray-700" : "border-gray-300"
                    }`}
                  >
                    <Image
                      src={
                        activeFile.path ||
                        "/placeholder.svg?height=200&width=200" ||
                        "/placeholder.svg"
                        // Nao esquecer de remover o placeholder
                      }
                      alt={activeTab}
                      width={400}
                      height={300}
                      className="max-h-[50vh] w-auto"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex-grow flex overflow-auto">
                  <div
                    className={`w-12 flex-shrink-0 pt-2 text-xs font-mono overflow-y-hidden ${
                      isDarkMode ? "bg-[#1e1e1e]" : "bg-[#f3f3f3]"
                    }`}
                  >
                    {renderLineNumbers()}
                  </div>

                  {/* codigo com syntax hightlight */}
                  <div className="flex-grow relative overflow-auto">
                    <textarea
                      ref={editorRef}
                      value={editorContent}
                      onChange={(e) => {
                        const content = e.target.value;
                        setEditorContent(content);

                        if (
                          activeFile.type === "code" ||
                          activeFile.type === "text"
                        ) {
                          setActiveFile({
                            ...activeFile,
                            content: content,
                          });

                          updateFileContentInFolders(activeTab, content);
                        }

                        const lines = content.split("\n");
                        setLineCount(lines.length);

                        updateCursorPosition();
                      }}
                      onKeyDown={(e) => {
                        if (!isMuted) {
                          playClickSound();
                        }
                        if (e.key === "Tab") {
                          e.preventDefault();
                          const start = e.currentTarget.selectionStart;
                          const end = e.currentTarget.selectionEnd;

                          const newValue =
                            editorContent.substring(0, start) +
                            "  " +
                            editorContent.substring(end);
                          setEditorContent(newValue);

                          setTimeout(() => {
                            e.currentTarget.selectionStart = start + 2;
                            e.currentTarget.selectionEnd = start + 2;
                            updateCursorPosition();
                          }, 0);
                        }

                        requestAnimationFrame(updateCursorPosition);
                      }}
                      onKeyUp={updateCursorPosition}
                      onClick={updateCursorPosition}
                      onSelect={updateCursorPosition}
                      onInput={updateCursorPosition}
                      onScroll={syncScroll}
                      onFocus={() => setIsEditorFocused(true)}
                      onBlur={() => setIsEditorFocused(false)}
                      className={`absolute inset-0 w-full h-full p-2 font-mono text-sm resize-none outline-none opacity-0 z-10 overflow-auto`}
                      spellCheck={false}
                    />

                    <div
                      ref={syntaxHighlighterRef}
                      className="absolute inset-0 overflow-auto"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                      }}
                    >
                      <SyntaxHighlighter
                        language={activeFile.language || "javascript"}
                        style={isDarkMode ? vscDarkPlus : vs}
                        className={`w-full h-full p-2 font-mono text-sm`}
                        customStyle={{
                          margin: 0,
                          background: isDarkMode ? "#1e1e1e" : "#f3f3f3",
                          height: "auto",
                          minHeight: "100%",
                        }}
                        codeTagProps={{
                          style: {
                            fontFamily: "inherit",
                          },
                        }}
                        showLineNumbers={false}
                      >
                        {editorContent}
                      </SyntaxHighlighter>
                    </div>

                    {/* Blinking cursor */}
                    <div
                      className="absolute w-[2px] h-[14px] bg-white animate-blink pointer-events-none"
                      style={{
                        top: `${caretPosition.top - scrollPosition.top + 3}px`,
                        left: `${caretPosition.left}px`,
                        display: isEditorFocused ? "block" : "none",
                      }}
                    />

                    <div
                      className={`absolute bottom-0 right-0 px-2 py-0.5 text-xs ${
                        isDarkMode
                          ? "bg-[#252526] text-gray-300"
                          : "bg-[#e8e8e8] text-gray-700"
                      }`}
                    >
                      Ln {cursorPosition.line}, Col {cursorPosition.column}
                    </div>
                  </div>
                </div>
              )}
              {showConsole && (
                <div
                  className={`h-1/3 border-t overflow-auto ${
                    isDarkMode
                      ? "bg-[#1e1e1e] border-[#3c3c3c] text-[#d4d4d4]"
                      : "bg-[#f3f3f3] border-[#cccccc] text-[#333333]"
                  }`}
                >
                  <div
                    className={`flex items-center justify-between px-3 py-1 ${
                      isDarkMode ? "bg-[#252526]" : "bg-[#e8e8e8]"
                    }`}
                  >
                    <div className="flex items-center">
                      <Terminal className="h-4 w-4 mr-2" />
                      <span className="text-sm font-medium">Console</span>
                    </div>
                    <button
                      className={`rounded p-1 ${
                        isDarkMode
                          ? "hover:bg-[#3c3c3c] text-gray-400"
                          : "hover:bg-[#cccccc] text-gray-600"
                      }`}
                      onClick={toggleConsole}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="p-2 font-mono text-sm whitespace-pre-wrap">
                    {consoleOutput.map((output, index) => (
                      <div
                        key={index}
                        className={`mb-1 ${
                          output.startsWith("[error]")
                            ? "text-red-500"
                            : output.startsWith("[warn]")
                            ? "text-yellow-500"
                            : output.startsWith("[return]")
                            ? "text-purple-400"
                            : output.startsWith("[success]")
                            ? "text-green-500"
                            : ""
                        }`}
                      >
                        {output}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Status Bar */}
              <div
                className={`flex items-center justify-between px-3 py-1 text-xs ${
                  isDarkMode
                    ? "bg-[#007acc] text-white"
                    : "bg-[#007acc] text-white"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="flex items-center">
                    <GitBranch className="h-3.5 w-3.5 mr-1" />
                    <span>main</span>
                  </div>
                  <div className="flex items-center">
                    <span>
                      {activeFile.type === "code"
                        ? activeFile.language === "javascript"
                          ? "JavaScript"
                          : activeFile.language === "css"
                          ? "CSS"
                          : activeFile.language === "json"
                          ? "JSON"
                          : "Text"
                        : activeFile.type === "image"
                        ? "Image"
                        : "Markdown"}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span>UTF-8</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center">
                    <span>
                      Ln {cursorPosition.line}, Col {cursorPosition.column}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span>Spaces: 2</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
        </AnimatedSection>
    </>
  );
}
