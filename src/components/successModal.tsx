import { X } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import successSvg from "@/assets/svgs/success.svg";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

export function SuccessModal({
  isOpen,
  onClose,
  isDarkMode,
}: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div
        className={`relative w-full max-w-md p-6 rounded-lg shadow-lg ${
          isDarkMode ? "bg-zinc-800" : "bg-white"
        }`}
      >
        <button
          onClick={onClose}
          className={`absolute top-2 right-2 p-1 rounded-full ${
            isDarkMode
              ? "text-gray-400 hover:text-white"
              : "text-gray-600 hover:text-black"
          }`}
        >
          <X size={24} />
        </button>
        <div className="flex flex-col items-center">
          <h2
            className={`mt-4 text-2xl font-bold ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Your message was sent!
          </h2>
          <Image src={successSvg} alt="Success" />
          <p
            className={`mt-2 text-center ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Thank you for reaching out. I'll get back to you as soon as
            possible.
          </p>
          <div className="mt-6 flex w-full space-x-2">
            <button
              onClick={onClose}
              className={`flex-1 px-4 py-2 rounded-md ${
                isDarkMode
                  ? "bg-gray-600 hover:bg-gray-700"
                  : "bg-gray-200 hover:bg-gray-300"
              } ${isDarkMode ? "text-white" : "text-gray-800"}`}
            >
              Close
            </button>
            <Link
              href="https://wa.me/49999215720"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <button
                className={`w-full px-4 py-2 rounded-md ${
                  isDarkMode
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-green-500 hover:bg-green-600"
                } text-white`}
              >
                Contact on WhatsApp
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

