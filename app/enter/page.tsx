"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Sparkles, Mail, Users, Star, X } from "lucide-react";

export default function EnterPage() {
  const ambientAudioRef = useRef<HTMLAudioElement>(null);
  const clickAudioRef = useRef<HTMLAudioElement>(null);
  const [menuOpen, setMenuOpen] = useState(true); // Menu open on load

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
    <div className="relative min-h-screen w-full overflow-hidden text-white bg-gradient-to-br from-[#fbe8ff] via-[#e5d6f5] to-[#d0f0ff] animate-gradient">
      <audio ref={ambientAudioRef} src="/ambient.mp3" preload="none" loop />
      <audio ref={clickAudioRef} src="/ui-hover.mp3" preload="none" />

      {/* Background Gradient Layer (animated) */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,200,255,0.3)_0%,transparent_70%)] blur-2xl opacity-70 animate-gradientPulse" />

      {/* Page Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-24 text-center space-y-6">

        {/* Orb Header */}
        <div className="rounded-full bg-white/10 border border-white/20 p-6 md:p-8 backdrop-blur-md shadow-[0_0_30px_rgba(213,179,255,0.4)] max-w-xl">
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

        {/* Logo Toggle Button */}
        <motion.img
          onClick={() => {
            handleClickSound();
            setMenuOpen(!menuOpen);
          }}
          src="/logo.png"
          alt="MagicDrop Nav"
          className="mt-12 h-20 w-20 rounded-full border-2 border-purple-400 bg-black/50 p-2 cursor-pointer z-30 hover:scale-105 transition-transform backdrop-blur-md shadow-lg"
          whileTap={{ scale: 0.95 }}
        />

        {/* Nav Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute top-28 md:top-36 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-md rounded-2xl px-6 py-6 z-50 shadow-xl border border-white/20 flex flex-col gap-4 items-center w-[90%] max-w-sm"
            >
              <button
                onClick={() => setMenuOpen(false)}
                className="absolute top-3 right-4 text-white/60 hover:text-white transition"
              >
                <X size={18} />
              </button>
              <h2 className="text-xl font-bold text-white text-shadow-strong mb-4">
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
                  className="w-full flex items-center gap-3 px-5 py-3 rounded-full border border-white/30 text-white bg-white/5 hover:bg-purple-600 hover:text-white hover:border-purple-400 transition-all text-sm font-semibold"
                >
                  {item.icon} {item.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* HUD */}
      <p className="absolute top-2 left-3 text-xs text-white/60 font-mono tracking-wide z-50">
        MAGICDROP UI
      </p>
      <p className="absolute bottom-2 left-3 text-xs text-white/60 font-mono tracking-wide z-50">
        Build 01 — Public Alpha
      </p>
      <p className="absolute bottom-2 right-3 text-xs text-white/60 font-mono tracking-wide z-50">
        Powered by Fan Magic
      </p>

      {/* Global Styling */}
      <style jsx global>{`
        .text-glow-hard {
          text-shadow: 0 0 12px rgba(255, 255, 255, 0.9),
            0 0 28px rgba(213, 179, 255, 0.4),
            0 0 48px rgba(213, 179, 255, 0.2);
        }
        .text-shadow-strong {
          text-shadow: 0 0 10px rgba(0, 0, 0, 0.4),
            0 0 2px rgba(0, 0, 0, 0.2);
        }
        .animate-gradientPulse {
          animation: gradientPulse 20s ease infinite;
        }
        @keyframes gradientPulse {
          0% {
            transform: scale(1) translate(0, 0);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.05) translate(5px, -5px);
            opacity: 0.8;
          }
          100% {
            transform: scale(1) translate(0, 0);
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
}
