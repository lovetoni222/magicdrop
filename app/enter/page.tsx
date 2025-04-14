"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Sparkles, Mail, Users, Star, X } from "lucide-react";

export default function EnterPage() {
  const ambientAudioRef = useRef<HTMLAudioElement>(null);
  const clickAudioRef = useRef<HTMLAudioElement>(null);
  const [menuOpen, setMenuOpen] = useState(true); // Menu opens by default on this page

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
      {/* Background Gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#f4c4f3] via-[#e6d0ff] to-[#c9e4ff] animate-gradientFade" />

      {/* 🎵 Audio */}
      <audio ref={ambientAudioRef} src="/ambient.mp3" preload="none" loop />
      <audio ref={clickAudioRef} src="/ui-hover.mp3" preload="none" />

      {/* Orb Header */}
      <div className="relative z-10 flex flex-col items-center justify-start pt-28 text-center px-4 space-y-6">
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

      {/* Logo Nav Toggle Button */}
      <motion.img
        onClick={() => {
          handleClickSound();
          setMenuOpen(!menuOpen);
        }}
        src="/logo.png"
        alt="MagicDrop Nav"
        className="fixed bottom-[6%] left-1/2 -translate-x-1/2 z-50 h-20 w-20 cursor-pointer rounded-full object-contain bg-white/5 border border-purple-500 shadow-[0_0_20px_rgba(213,179,255,0.4)] animate-pulse-glow transition-all duration-300 hover:scale-105 hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.8)] sparkle"
        whileTap={{ scale: 0.95 }}
      />

      {/* Nav Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-28 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-sm bg-black/70 backdrop-blur-md rounded-2xl px-6 py-6 shadow-xl border border-white/20 flex flex-col items-start gap-4"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-3 right-3 text-white/60 hover:text-white transition"
            >
              <X size={18} />
            </button>

            <h2 className="text-lg font-semibold mb-2 text-glow-hard">Navigate the Dropverse</h2>

            {[
              { label: "Explore Drops", link: "/drops", icon: <Sparkles size={18} /> },
              { label: "Collaborate", link: "/collaborate", icon: <Mail size={18} /> },
              { label: "Meet Our Team", link: "/team", icon: <Users size={18} /> },
              { label: "Become a Fan Advisor", link: "/fan-advisor", icon: <Star size={18} /> },
            ].map((item) => (
              <button
                key={`${item.label}-${item.link}`}
                onClick={() => navigateTo(item.link)}
                className="w-full flex items-center gap-2 text-white sparkle hover:text-purple-300 transition px-4 py-3 border border-white/30 rounded-full text-sm backdrop-blur-md bg-white/5"
              >
                {item.icon} {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* HUD Text */}
      <p className="absolute top-2 left-3 text-xs text-white/50 font-mono tracking-wide z-50">
        MAGICDROP UI
      </p>
      <p className="absolute bottom-2 left-3 text-xs text-white/50 font-mono tracking-wide z-50">
        Build 01 — Public Alpha
      </p>
      <p className="absolute bottom-2 right-3 text-xs text-white/50 font-mono tracking-wide z-50 text-right">
        Powered by Fan Magic
      </p>

      {/* Styles */}
      <style jsx global>{`
        @keyframes shimmerAnim {
          0% {
            filter: brightness(1) drop-shadow(0 0 6px rgba(213, 179, 255, 0.3));
          }
          50% {
            filter: brightness(1.3) drop-shadow(0 0 20px rgba(213, 179, 255, 0.6));
          }
          100% {
            filter: brightness(1) drop-shadow(0 0 6px rgba(213, 179, 255, 0.3));
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 0 rgba(213, 179, 255, 0.4);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 20px rgba(213, 179, 255, 0.6);
          }
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

        .sparkle:hover {
          text-shadow: 0 0 10px rgba(213, 179, 255, 0.8),
            0 0 20px rgba(213, 179, 255, 0.5);
        }

        .animate-pulse-glow {
          animation: pulse-glow 4s ease-in-out infinite;
        }

        .animate-gradientFade {
          animation: gradientFade 16s ease infinite;
        }

        @keyframes gradientFade {
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
      `}</style>
    </div>
  );
}
