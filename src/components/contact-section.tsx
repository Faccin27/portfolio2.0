"use client"

import { useState, type FormEvent } from "react"
import Image from "next/image"
import AnimatedSection from "@/components/animatedsection"
import { SuccessModal } from "@/components/successModal"
import emailjs from "emailjs-com"

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

  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!
  const userId = process.env.NEXT_PUBLIC_EMAILJS_USER_ID!

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const templateParams = {
      email,
      subject,
      message,
    }

    emailjs.send(serviceId, templateId, templateParams, userId).then(
      (response) => {
        console.log("SUCCESS!", response)
        setEmail("")
        setSubject("")
        setMessage("")
        setIsModalOpen(true)
      },
      (err) => {
        console.error("FAILED...", err)
        setStatus("Failed to send the message.")
      },
    )
  }

  return (
    <AnimatedSection className="mt-16" animation="fadeDown">
      <div className="container mx-auto px-4 py-12">
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
                <div className="mt-4 text-white">
                  <p>{status}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
