"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Sparkles, Mail, Users, Star, X } from "lucide-react";

export default function EnterPage() {
  const ambientAudioRef = useRef<HTMLAudioElement>(null);
  const clickAudioRef = useRef<HTMLAudioElement>(null);
  const [menuOpen, setMenuOpen] = useState(true); // Auto-open nav on load

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
    <div className="relative min-h-screen w-full overflow-hidden text-white">
      {/* 🌈 Animated Gradient Background */}
      <div className="fixed inset-0 z-[-1] animated-gradient" />

      {/* 🔊 Audio */}
      <audio ref={ambientAudioRef} src="/ambient.mp3" preload="none" loop />
      <audio ref={clickAudioRef} src="/ui-hover.mp3" preload="none" />

      {/* 💬 Orb Header */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4 space-y-6">
        <div className="rounded-full bg-white/10 border border-white/20 p-6 md:p-8 backdrop-blur-md shadow-[0_0_40px_rgba(213,179,255,0.5)] max-w-xl">
          <motion.h1
            className="text-3xl md:text-5xl font-bold text-white text-glow-hard tracking-wide [font-family:var(--font-playfair)]"
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

      {/* 🌟 Logo Toggle - bottom center, 1/4 from bottom */}
      <motion.img
        onClick={() => {
          handleClickSound();
          setMenuOpen(!menuOpen);
        }}
        src="/logo.png"
        alt="MagicDrop Nav"
        className="fixed bottom-[25%] left-1/2 -translate-x-1/2 h-20 cursor-pointer z-50 hover:scale-105 transition-transform duration-300"
        whileTap={{ scale: 0.95 }}
      />

      {/* 🎮 Slide-Up Nav Panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35 }}
            className="fixed bottom-28 z-50 px-6 py-6 rounded-3xl bg-black/80 border border-white/20 backdrop-blur-md shadow-lg w-[90%] max-w-sm flex flex-col gap-4"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-3 right-3 text-white/50 hover:text-white"
            >
              <X size={18} />
            </button>

            <h2 className="text-white text-center text-xl font-semibold tracking-wide text-glow-hard mb-2">
              Navigate the Dropverse
            </h2>

            {[
              { label: "Explore Drops", link: "/drops", icon: <Sparkles size={18} /> },
              { label: "Collaborate", link: "/collaborate", icon: <Mail size={18} /> },
              { label: "Meet Our Team", link: "/team", icon: <Users size={18} /> },
              { label: "Become a Fan Advisor", link: "/fan-advisor", icon: <Star size={18} /> },
            ].map((item) => (
              <button
                key={item.link}
                onClick={() => navigateTo(item.link)}
                className="w-full flex items-center gap-2 justify-center px-5 py-3 rounded-full font-semibold text-sm border border-white text-white bg-transparent hover:bg-purple-600 hover:border-purple-600 hover:text-white transition-all duration-300"
              >
                {item.icon} {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🧭 HUD Labels */}
      <p className="absolute top-2 left-3 text-xs text-white/50 font-mono tracking-wide z-50">
        MAGICDROP UI
      </p>
      <p className="absolute bottom-2 left-3 text-xs text-white/50 font-mono tracking-wide z-50">
        Build 01 — Public Alpha
      </p>
      <p className="absolute bottom-2 right-3 text-xs text-white/50 font-mono tracking-wide z-50 text-right">
        Powered by Fan Magic
      </p>

      {/* 🎨 Global Styles */}
      <style jsx global>{`
        .animated-gradient {
          background: linear-gradient(-45deg, #a985ff, #ffe3ec, #d1caff, #c0f0ff);
          background-size: 400% 400%;
          animation: gradientFlow 12s ease infinite;
        }

        @keyframes gradientFlow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        video::-webkit-media-controls {
          display: none !important;
        }

        .text-glow-hard {
          text-shadow: 0 0 12px rgba(255, 255, 255, 0.9),
            0 0 28px rgba(213, 179, 255, 0.5),
            0 0 48px rgba(213, 179, 255, 0.3);
        }

        .text-shadow-strong {
          text-shadow: 0 0 12px rgba(0, 0, 0, 0.5),
            0 0 4px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
}
