"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Sparkles, Mail, Users, Star, X } from "lucide-react";

export default function EnterPage() {
  const ambientAudioRef = useRef<HTMLAudioElement>(null);
  const clickAudioRef = useRef<HTMLAudioElement>(null);
  const [menuOpen, setMenuOpen] = useState(true);

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
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      {/* Audio */}
      <audio ref={ambientAudioRef} src="/ambient.mp3" preload="none" loop />
      <audio ref={clickAudioRef} src="/ui-hover.mp3" preload="none" />

      {/* Animated Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 animate-pulse-slow z-0" />

      {/* Particle Layer */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/50"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              opacity: 0,
            }}
            animate={{
              y: "-10%",
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Header + Subtitle */}
      <div className="relative z-30 flex flex-col items-center justify-center h-[75vh] text-center px-4 space-y-6">
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

      {/* Toggle Logo */}
      <motion.img
        onClick={() => {
          handleClickSound();
          setMenuOpen(!menuOpen);
        }}
        src="/logo.png"
        alt="MagicDrop Nav"
        className="fixed bottom-[10%] left-1/2 -translate-x-1/2 h-16 w-16 rounded-full bg-white/10 backdrop-blur-lg shadow-xl border-2 border-purple-400 p-2 z-50 cursor-pointer hover:scale-110 transition-transform duration-300"
        whileTap={{ scale: 0.95 }}
      />

      {/* Nav Panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-[15%] left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-xl text-white px-6 py-6 rounded-2xl z-40 border border-white/20 shadow-xl w-[90vw] max-w-sm"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-3 right-4 text-white/70 hover:text-white"
            >
              <X size={20} />
            </button>
            <h2 className="text-lg font-bold mb-5 text-center text-shadow-strong">Navigate the Dropverse</h2>
            <div className="flex flex-col gap-4">
              {[
                { label: "Explore Drops", link: "/drops", icon: <Sparkles size={18} /> },
                { label: "Collaborate", link: "/collaborate", icon: <Mail size={18} /> },
                { label: "Meet Our Team", link: "/team", icon: <Users size={18} /> },
                { label: "Become a Fan Advisor", link: "/fan-advisor", icon: <Star size={18} /> },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => navigateTo(item.link)}
                  className="flex items-center justify-center gap-2 rounded-full px-5 py-3 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-purple-600 transition text-white text-sm font-medium"
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HUD Footer */}
      <p className="absolute top-2 left-3 text-xs text-white/50 font-mono tracking-wide z-50">MAGICDROP UI</p>
      <p className="absolute bottom-2 left-3 text-xs text-white/50 font-mono tracking-wide z-50">Build 01 — Public Alpha</p>
      <p className="absolute bottom-2 right-3 text-xs text-white/50 font-mono tracking-wide z-50 text-right">Powered by Fan Magic</p>

      {/* Global CSS */}
      <style jsx global>{`
        .text-glow-hard {
          text-shadow: 0 0 12px rgba(255, 255, 255, 0.9),
            0 0 28px rgba(213, 179, 255, 0.5),
            0 0 48px rgba(213, 179, 255, 0.3);
        }

        .text-shadow-strong {
          text-shadow: 0 0 12px rgba(0, 0, 0, 0.5),
            0 0 4px rgba(0, 0, 0, 0.3);
        }

        .animate-pulse-slow {
          animation: pulseBg 20s ease-in-out infinite alternate;
        }

        @keyframes pulseBg {
          0% {
            filter: hue-rotate(0deg) brightness(1);
          }
          100% {
            filter: hue-rotate(30deg) brightness(1.1);
          }
        }
      `}</style>
    </div>
  );
}