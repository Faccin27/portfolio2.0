"use client"

import { useState, type FormEvent } from "react"
import Image from "next/image"
import AnimatedSection from "@/components/animatedsection"
import { SuccessModal } from "@/components/successModal"
import { QRCodeModal } from "@/components/qr-code-modal"
import { motion } from "framer-motion"
import { Dot, QrCode } from "lucide-react"
import { url } from "inspector"

interface ContactSectionProps {
  isDarkMode: boolean
  isMuted: boolean
  playHoverSound: () => void
}

export default function ContactSection({ isDarkMode, isMuted, playHoverSound }: ContactSectionProps) {
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isQRModalOpen, setIsQRModalOpen] = useState(false)
  const [visitorCount, setVisitorCount] = useState(0)

  const discordWebhookUrl = process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL

  const sendToDiscordWebhook = async (formData: { email: string; subject: string; message: string }) => {
    if (!discordWebhookUrl) {
      console.error("Discord webhook URL is not set")
      setStatus("Configuration error. Please try again later.")
      return false
    }

    try {
      const response = await fetch(discordWebhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          embeds: [
            {
              title: "📩 Novo Contato Recebido!",
              color: 8388736, 
              fields: [
                { name: "📧 E-mail", value: formData.email, inline: true },
                { name: "📝 Assunto", value: formData.subject, inline: true },
                { name: "💬 Mensagem", value: formData.message, inline: false },
              ],
              image: {
                url: "https://media.discordapp.net/attachments/1363219914642424109/1363221222376214790/logo.png?ex=68053e32&is=6803ecb2&hm=4201c6c7acf6a65bd0bc133d40f7bb2de28ce8b71a413591b56925e06bd11ac2&=&format=webp&quality=lossless&width=770&height=462",
              },
              footer: {
                text: "Faccindev.pro",
                url: 'https://faccindev.pro',
                icon_url: "https://media.discordapp.net/attachments/1363219914642424109/1363221222376214790/logo.png?ex=68053e32&is=6803ecb2&hm=4201c6c7acf6a65bd0bc133d40f7bb2de28ce8b71a413591b56925e06bd11ac2&=&format=webp&quality=lossless&width=770&height=462",
              },
              timestamp: new Date().toISOString(),
            },
          ],
        }),
      })

      return response.ok
    } catch (error) {
      console.error("Failed to send to Discord webhook:", error)
      return false
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = {
      email,
      subject,
      message,
    }

    const success = await sendToDiscordWebhook(formData)

    if (success) {
      setEmail("")
      setSubject("")
      setMessage("")
      setIsModalOpen(true)
      setStatus("")
    } else {
      setStatus("Failed to send the message. Please try again later.")
    }
  }

  return (
    <AnimatedSection className="mt-16" animation="fadeDown">
      <div className="container mx-auto px-4 py-12" id="contact">
        <div
          className={`w-4/5 mx-auto rounded-2xl border transition-all duration-300 relative z-10 ${
            isDarkMode ? "bg-zinc-800/80 border-white/10" : "bg-slate-300/80 border-gray-200"
          }`}
          onMouseEnter={isMuted ? undefined : playHoverSound}
        >
          <div className="flex flex-col md:flex-row items-stretch gap-12 p-8">
            <div className="w-full md:w-1/2 flex items-center justify-center">
              <Image
                src="/assets/svgs/email.svg"
                alt="Contact"
                width={300}
                height={300}
                onMouseEnter={isMuted ? undefined : playHoverSound}
              />
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-between space-y-6">
              <h2 className={`text-4xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Get in Touch</h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <label
                      htmlFor="email"
                      className={`text-sm font-medium leading-none ${isDarkMode ? "text-white" : "text-gray-700"}`}
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className={`flex h-10 w-full rounded-md border px-3 py-2 text-sm ${
                        isDarkMode
                          ? "bg-zinc-700 border-zinc-600 text-white placeholder:text-zinc-400"
                          : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-400"
                      }`}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <label
                      htmlFor="subject"
                      className={`text-sm font-medium leading-none ${isDarkMode ? "text-white" : "text-gray-700"}`}
                    >
                      Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="What's this about?"
                      className={`flex h-10 w-full rounded-md border px-3 py-2 text-sm ${
                        isDarkMode
                          ? "bg-zinc-700 border-zinc-600 text-white placeholder:text-zinc-400"
                          : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-400"
                      }`}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <label
                      htmlFor="message"
                      className={`text-sm font-medium leading-none ${isDarkMode ? "text-white" : "text-gray-700"}`}
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Your message here..."
                      className={`flex w-full rounded-md border px-3 py-2 text-sm ${
                        isDarkMode
                          ? "bg-zinc-700 border-zinc-600 text-white placeholder:text-zinc-400"
                          : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-400"
                      }`}
                      rows={4}
                      required
                    ></textarea>
                  </div>
                </div>
                <button
                  type="submit"
                  className={`inline-flex h-10 items-center justify-center rounded-md px-8 text-sm font-medium transition-colors ${
                    isDarkMode
                      ? "bg-purple-600 text-white hover:bg-purple-700"
                      : "bg-purple-600 text-white hover:bg-purple-700"
                  }`}
                >
                  Send Message
                </button>
              </form>
              <SuccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} isDarkMode={isDarkMode} />
              {status && (
                <div className={`mt-4 ${isDarkMode ? "text-red-300" : "text-red-600"}`}>
                  <p>{status}</p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

      <QRCodeModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        isDarkMode={isDarkMode}
        url="https://faccindev.pro"
      />
    </AnimatedSection>
  )
}
