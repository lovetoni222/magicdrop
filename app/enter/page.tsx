"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Mail, Users, Star, X } from "lucide-react";

export default function EnterPage() {
  const [menuOpen, setMenuOpen] = useState(true);
  const clickAudioRef = useRef<HTMLAudioElement>(null);
  const ambientAudioRef = useRef<HTMLAudioElement>(null);

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
    <div className="relative min-h-screen w-full overflow-hidden text-white bg-gradient-to-br from-[#ddb6f2] via-[#bfa6ff] to-[#8e99f3]">
      <audio ref={ambientAudioRef} src="/ambient.mp3" preload="none" loop />
      <audio ref={clickAudioRef} src="/ui-hover.mp3" preload="none" />

      {/* Glow spotlight center orb */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-radial from-white/10 via-transparent to-transparent rounded-full blur-[120px] opacity-30 scale-150 mx-auto my-auto" />
      </div>

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

      {/* Center Title */}
      <div className="relative z-20 flex flex-col items-center justify-center h-screen text-center px-4 space-y-6">
        <div className="rounded-full bg-white/10 border border-white/20 p-6 md:p-8 backdrop-blur-md shadow-[0_0_50px_rgba(213,179,255,0.4)] max-w-xl transition-all duration-700">
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

      {/* Floating MagicDrop Logo Button */}
      <motion.img
        onClick={() => {
          handleClickSound();
          setMenuOpen(!menuOpen);
        }}
        src="/logo.png"
        alt="MagicDrop Nav"
        className="fixed bottom-8 left-1/2 -translate-x-1/2 h-16 w-16 z-40 cursor-pointer rounded-full border border-purple-400 shadow-xl bg-[#8e99f3]/30 hover:scale-105 transition duration-300 backdrop-blur-md"
        whileTap={{ scale: 0.95 }}
      />

      {/* Slide-Up Nav Panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl px-8 py-6 z-50 w-[90%] max-w-sm text-white space-y-4"
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold text-white drop-shadow text-glow-hard">Navigate the Dropverse</h2>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-white/50 hover:text-white transition"
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
                className="w-full flex items-center justify-start gap-3 px-6 py-3 rounded-full text-sm font-medium border border-white/30 bg-white/10 text-white hover:bg-purple-600 hover:text-white transition-all duration-300"
              >
                {item.icon} {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Styles */}
      <style jsx global>{`
        .text-glow-hard {
          text-shadow: 0 0 12px rgba(255, 255, 255, 0.8),
            0 0 24px rgba(213, 179, 255, 0.4);
        }
        .text-shadow-strong {
          text-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
        }
        .bg-radial {
          background: radial-gradient(
            circle at center,
            rgba(255, 255, 255, 0.12) 0%,
            transparent 70%
          );
        }
      `}</style>
    </div>
  );
}