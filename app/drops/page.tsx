"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Sparkles, Mail, Users, Star, X } from "lucide-react";

export default function DropsPage() {
  const ambientAudioRef = useRef<HTMLAudioElement>(null);
  const clickAudioRef = useRef<HTMLAudioElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

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
      <audio ref={ambientAudioRef} src="/ambient.mp3" preload="none" loop />
      <audio ref={clickAudioRef} src="/ui-hover.mp3" preload="none" />

      <video
        className="absolute inset-0 h-full w-full object-cover z-0"
        src="/bg-enter.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 pt-32 pb-20">
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-white text-glow-hard [font-family:var(--font-playfair)] mb-12"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Explore the Dropverse
        </motion.h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl w-full">
          {/* Becky G Drop */}
          <motion.div
            className="bg-white/10 border border-white/20 p-4 rounded-xl backdrop-blur-md shadow-md hover:shadow-xl transition duration-300 text-left"
            whileHover={{ scale: 1.03 }}
          >
            <img
              src="/becky.jpg"
              alt="Becky G Drop"
              className="w-full h-40 object-cover rounded-lg mb-4 border border-white/20"
            />
            <h3 className="text-xl font-semibold text-white mb-2">
              Becky G: Drop 01
            </h3>
            <p className="text-sm text-white/80 mb-4">
              Becky G's "Otro Capítulo del Mercado" celebrated her album{" "}
              <em>Encuentros</em> through a vibrant fan reunion. Inspired by
              Mexican culture, this immersive experience featured a curated
              market and limited-edition mercado bags — given upon entry — that
              unified fans as they explored, shopped, and connected. The event
              transformed Becky’s music into tangible moments of vulnerability,
              empowerment, and shared belonging.
            </p>
            <a
              href="https://beckygmercado.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClickSound}
              className="text-[#a855f7] hover:text-white font-semibold text-[15px] sparkle"
            >
              View Drop →
            </a>
          </motion.div>

          {/* Placeholder Drops */}
          <motion.div
            className="bg-white/5 border border-white/10 p-6 rounded-xl backdrop-blur-md text-center text-white/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-lg font-semibold">Coming Soon</h3>
            <p className="text-sm">New artist drops are being conjured.</p>
          </motion.div>

          <motion.div
            className="bg-white/5 border border-white/10 p-6 rounded-xl backdrop-blur-md text-center text-white/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <h3 className="text-lg font-semibold">Coming Soon</h3>
            <p className="text-sm">New artist drops are being conjured.</p>
          </motion.div>
        </div>
      </div>

      {/* 🧭 HUD */}
      <p className="absolute top-2 left-3 text-xs text-white/50 font-mono tracking-wide z-50">
        MAGICDROP UI
      </p>
      <p className="absolute bottom-2 left-3 text-xs text-white/50 font-mono tracking-wide z-50">
        Build 01 — Public Alpha
      </p>
      <p className="absolute bottom-2 right-3 text-xs text-white/50 font-mono tracking-wide z-50 text-right">
        Powered by Fan Magic
      </p>

      {/* 💎 Logo Toggle Nav */}
      <motion.img
        onClick={() => {
          handleClickSound();
          setMenuOpen(!menuOpen);
        }}
        src="/logo.png"
        alt="MagicDrop Logo"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 h-16 shimmer cursor-pointer z-50"
        whileTap={{ scale: 0.9 }}
      />

      {/* 🎮 Nav Toggle */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md rounded-2xl px-8 py-6 z-50 shadow-lg border border-white/20 flex flex-col gap-4 items-start min-w-[240px]"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-2 right-2 text-white/50 hover:text-white transition"
            >
              <X size={18} />
            </button>

            <button
              onClick={() => navigateTo("/enter")}
              className="flex items-center gap-2 text-white sparkle hover:text-purple-300 transition"
            >
              <Home size={18} /> Home
            </button>
            <button
              onClick={() => navigateTo("/drops")}
              className="flex items-center gap-2 text-white sparkle hover:text-purple-300 transition"
            >
              <Sparkles size={18} /> Explore Drops
            </button>
            <button
              onClick={() => navigateTo("/collaborate")}
              className="flex items-center gap-2 text-white sparkle hover:text-purple-300 transition"
            >
              <Mail size={18} /> Collaborate
            </button>
            <button
              onClick={() => navigateTo("/team")}
              className="flex items-center gap-2 text-white sparkle hover:text-purple-300 transition"
            >
              <Users size={18} /> Meet Our Team
            </button>
            <button
              onClick={() => navigateTo("/fan-advisor")}
              className="flex items-center gap-2 text-white sparkle hover:text-purple-300 transition"
            >
              <Star size={18} /> Become a Fan Advisor
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .shimmer {
          animation: shimmerAnim 4s infinite ease-in-out;
        }
        @keyframes shimmerAnim {
          0% {
            filter: brightness(1)
              drop-shadow(0 0 6px rgba(213, 179, 255, 0.3));
          }
          50% {
            filter: brightness(1.3)
              drop-shadow(0 0 20px rgba(213, 179, 255, 0.6));
          }
          100% {
            filter: brightness(1)
              drop-shadow(0 0 6px rgba(213, 179, 255, 0.3));
          }
        }
        .sparkle:hover {
          text-shadow: 0 0 10px rgba(213, 179, 255, 0.8),
            0 0 20px rgba(213, 179, 255, 0.5);
        }
        .text-glow-hard {
          text-shadow: 0 0 12px rgba(255, 255, 255, 0.9),
            0 0 28px rgba(213, 179, 255, 0.5),
            0 0 48px rgba(213, 179, 255, 0.3);
        }
      `}</style>
    </div>
  );
}
