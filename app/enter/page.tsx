"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Sparkles, Mail, Users, Star, X } from "lucide-react";

export default function EnterPage() {
  const ambientAudioRef = useRef<HTMLAudioElement>(null);
  const clickAudioRef = useRef<HTMLAudioElement>(null);
  const [menuOpen, setMenuOpen] = useState(true); // Auto-open nav on enter

  useEffect(() => {
    if (ambientAudioRef.current) {
      ambientAudioRef.current.volume = 0.4;
      ambientAudioRef.current.play().catch(() => {});
    }
  }, []);

  const handleClickSound = () => {
    if (clickAudioRef.current) {
      clickAudioRef.current.currentTime = 0;
      clickAudioRef.current.play().catch(() => {});
    }
  };

  const navigateTo = (url: string) => {
    handleClickSound();
    setMenuOpen(false);
    window.location.href = url;
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden text-white bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100">
      {/* Ambient Audio */}
      <audio ref={ambientAudioRef} src="/ambient.mp3" preload="none" loop />
      <audio ref={clickAudioRef} src="/ui-hover.mp3" preload="none" />

      {/* Iridescent Streaks Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute w-full h-full bg-[url('/window.svg')] bg-cover opacity-10 animate-move" />
      </div>

      {/* Orb Header */}
      <div className="relative z-10 flex flex-col items-center justify-start pt-24 px-4 text-center">
        <div className="rounded-full bg-white/10 border border-white/20 p-6 md:p-8 backdrop-blur-lg shadow-elevated max-w-xl">
          <motion.h1
            className="text-3xl md:text-5xl font-bold tracking-wide [font-family:var(--font-playfair)] text-iridescent"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Welcome to MagicDrop
          </motion.h1>
          <motion.p
            className="mt-4 text-base md:text-xl text-white text-shadow-strong"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Choose your path. Explore immersive drops, co-created stories, and artist-led worlds.
          </motion.p>
        </div>
      </div>

      {/* Logo Toggle Button */}
      <motion.img
        onClick={() => {
          handleClickSound();
          setMenuOpen(!menuOpen);
        }}
        src="/logo.png"
        alt="MagicDrop Nav"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 h-20 cursor-pointer z-40 ring-2 ring-purple-400 rounded-full shimmer-glow hover:scale-105 transition duration-300"
        whileTap={{ scale: 0.95 }}
      />

      {/* Navigation Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute z-30 top-[28%] left-1/2 -translate-x-1/2 w-[90%] max-w-md px-6 py-6 bg-black/30 backdrop-blur-xl rounded-3xl border border-white/20 shadow-elevated space-y-5"
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-white font-bold text-lg md:text-xl text-glow-hard">
                Navigate the Dropverse
              </h2>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-white/60 hover:text-white transition"
              >
                <X size={20} />
              </button>
            </div>

            {[
              { label: "Explore Drops", link: "/drops", icon: <Sparkles size={18} /> },
              { label: "Collaborate", link: "/collaborate", icon: <Mail size={18} /> },
              { label: "Meet Our Team", link: "/team", icon: <Users size={18} /> },
              { label: "Become a Fan Advisor", link: "/fan-advisor", icon: <Star size={18} /> },
            ].map((item) => (
              <button
                key={item.link}
                onClick={() => navigateTo(item.link)}
                className="w-full flex items-center justify-start gap-3 px-6 py-3 rounded-full font-semibold text-sm border border-white/20 text-white bg-black/40 hover:bg-purple-600 hover:text-white transition-all duration-300 glow-hover"
              >
                {item.icon} {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* HUD Labels */}
      <p className="absolute top-2 left-3 text-xs text-white/60 font-mono tracking-wide z-50">
        MAGICDROP UI
      </p>
      <p className="absolute bottom-2 left-3 text-xs text-white/60 font-mono tracking-wide z-50">
        Build 01 — Public Alpha
      </p>
      <p className="absolute bottom-2 right-3 text-xs text-white/60 font-mono tracking-wide z-50 text-right">
        Powered by Fan Magic
      </p>

      {/* Style Injections */}
      <style jsx global>{`
        .text-shadow-strong {
          text-shadow: 0 0 12px rgba(0, 0, 0, 0.4), 0 0 4px rgba(0, 0, 0, 0.2);
        }

        .text-glow-hard {
          text-shadow: 0 0 12px rgba(255, 255, 255, 0.9),
            0 0 24px rgba(213, 179, 255, 0.4);
        }

        .text-iridescent {
          background: linear-gradient(to right, #ffffff, #d5b3ff, #ffffff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .shimmer-glow {
          animation: shimmerAnim 3s infinite ease-in-out;
        }

        @keyframes shimmerAnim {
          0%, 100% {
            filter: brightness(1) drop-shadow(0 0 6px rgba(213, 179, 255, 0.2));
          }
          50% {
            filter: brightness(1.3) drop-shadow(0 0 20px rgba(213, 179, 255, 0.5));
          }
        }

        .glow-hover:hover {
          box-shadow: 0 0 12px rgba(213, 179, 255, 0.5),
            0 0 20px rgba(213, 179, 255, 0.3);
          transform: scale(1.03);
        }

        .shadow-elevated {
          box-shadow: 0 10px 40px rgba(213, 179, 255, 0.2);
        }

        @keyframes move {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: 100% 100%;
          }
        }

        .animate-move {
          animation: move 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
