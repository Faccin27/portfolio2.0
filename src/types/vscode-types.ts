import type { ReactNode } from "react"

export type FileContent = {
  content: string
  type: "code" | "image" | "text"
  language?: string
  path?: string
}

export type Folder = {
  name: string
  isOpen: boolean
  files: {
    name: string
    icon: ReactNode
    type: "code" | "image" | "text"
    content: string
    language?: string
    path?: string
  }[]
}
