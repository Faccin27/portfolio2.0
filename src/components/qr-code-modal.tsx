"use client"

import { useEffect, useRef } from "react"
import { QRCodeSVG } from "qrcode.react"
import { X } from "lucide-react"

interface QRCodeModalProps {
  isOpen: boolean
  onClose: () => void
  isDarkMode: boolean
  url: string
}

export function QRCodeModal({ isOpen, onClose, isDarkMode, url }: QRCodeModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("keydown", handleEscapeKey)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscapeKey)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        ref={modalRef}
        className={`relative w-full max-w-md p-6 rounded-lg shadow-lg ${
          isDarkMode ? "bg-zinc-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center">
          <h3 className="text-xl font-bold mb-4">Share faccindev.pro</h3>
          <div className="flex justify-center mb-4">
            <div className={`p-4 rounded-lg ${isDarkMode ? "bg-white" : "bg-gray-100"}`}>
              <QRCodeSVG
                value={url}
                size={200}
                bgColor={isDarkMode ? "#ffffff" : "#f3f4f6"}
                fgColor="#000000"
                level="H"
                includeMargin={false}
              />
            </div>
          </div>
          <p className="text-sm mb-4">Scan this QR code to visit faccindev.pro</p>
          <button
            onClick={() => {
              navigator.clipboard.writeText(url)
              alert("URL copied to clipboard!")
            }}
            className={`px-4 py-2 rounded-md text-white ${
              isDarkMode ? "bg-purple-600 hover:bg-purple-700" : "bg-purple-600 hover:bg-purple-700"
            }`}
          >
            Copy URL
          </button>
        </div>
      </div>
    </div>
  )
}
