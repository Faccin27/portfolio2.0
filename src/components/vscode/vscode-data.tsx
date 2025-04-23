import { FileCode, FileText, ImageIcon } from "lucide-react";
import type { FileContent, Folder } from "@/types/vscode-types";

// File contents
export const fileContents: Record<string, FileContent> = {
  "index.js": {
    content:
      "// Write your code here\nconsole.log('Hello, world!');\n\nfunction greet(name) {\n  return `Hello, ${name}!`;\n}\n\nconst result = greet('Developer');\nconsole.log(result);",
    type: "code",
    language: "javascript",
  },
  "package.json": {
    content:
      '{\n  "name": "vscode-playground",\n  "version": "1.0.0",\n  "description": "VS Code playground created by FaccinDev",\n  "main": "index.js",\n  "scripts": {\n    "start": "node index.js"\n  },\n  "dependencies": {\n     "coupon": "tralalelo-tralala"\n   }\n}',
    type: "code",
    language: "json",
  },
  "README.md": {
    content:
      "# VS Code Playground\n\nThis is a playground that mimics the VS Code interface.\n\n## Features\n\n- File switching\n- Folder toggling\n- Code execution\n- Image preview\n\n## How to use\n\n1. Click on files in the sidebar to open them\n2. Edit code in the editor\n3. Click 'Run Code' to execute JavaScript \n\n## Extra\n\nIf you've read this far and are enjoying my project, congratulations, \nyou've won a 20% discount coupon on your next project with me. \n\n\n\nYour discount coupon is in another file.",
    type: "text",
    language: "markdown",
  },
  "styles.css": {
    content:
      "body {\n  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\n  margin: 0;\n  padding: 0;\n  background-color: #f3f3f3;\n}\n\n.container {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 20px;\n}\n\n.editor {\n  border-radius: 4px;\n  overflow: hidden;\n  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);\n}",
    type: "code",
    language: "css",
  },
  "utils.js": {
    content:
      "/**\n * Utility functions\n */\n\n// Format a date to a readable string\nfunction formatDate(date) {\n  return new Date(date).toLocaleDateString();\n}\n\n// Generate a random ID\nfunction generateId() {\n  return Math.random().toString(36).substring(2, 9);\n}\n\n// Debounce function\nfunction debounce(func, wait) {\n  let timeout;\n  return function(...args) {\n    clearTimeout(timeout);\n    timeout = setTimeout(() => func.apply(this, args), wait);\n  };\n}\n\n// Example usage\nconsole.log(formatDate(new Date()));\nconsole.log(generateId());",
    type: "code",
    language: "javascript",
  },
  "logo.png": {
    content: "",
    type: "image",
    path: "/logo.png",
  },
  "banner.png": {
    content: "",
    type: "image",
    path: "/image.png",
  },
  "me.png": {
    content: "",
    type: "image",
    path: "/me.png",
  },
};

// Estrutra de f0lders e arquivos
export const initialFolders: Folder[] = [
  {
    name: "node_modules",
    isOpen: false,
    files: [],
  },
  {
    name: "src",
    isOpen: true,
    files: [
      {
        name: "index.js",
        icon: <FileCode className="h-4 w-4" />,
        type: "code",
        content: fileContents["index.js"].content,
        language: "javascript",
      },
      {
        name: "styles.css",
        icon: <FileText className="h-4 w-4" />,
        type: "code",
        content: fileContents["styles.css"].content,
        language: "css",
      },
      {
        name: "utils.js",
        icon: <FileCode className="h-4 w-4" />,
        type: "code",
        content: fileContents["utils.js"].content,
        language: "javascript",
      },
    ],
  },
  {
    name: "public",
    isOpen: false,
    files: [
      {
        name: "logo.png",
        icon: <ImageIcon className="h-4 w-4" />,
        type: "image",
        content: "",
        path: "/placeholder.svg?height=200&width=200",
      },
      {
        name: "banner.png",
        icon: <ImageIcon className="h-4 w-4" />,
        type: "image",
        content: "",
        path: "/placeholder.svg?height=400&width=800",
      },
      {
        name: "me.png",
        icon: <ImageIcon className="h-4 w-4" />,
        type: "image",
        content: "",
        path: "/placeholder.svg?height=64&width=64",
      },
    ],
  },
  {
    name: "Secrets",
    isOpen: false,
    files: [
      {
        name: "README.md",
        icon: <FileText className="h-4 w-4" />,
        type: "text",
        content: fileContents["README.md"].content,
        language: "markdown",
      },
      {
        name: "package.json",
        icon: <FileText className="h-4 w-4" />,
        type: "text",
        content: fileContents["package.json"].content,
        language: "json",
      },
    ],
  },
];
