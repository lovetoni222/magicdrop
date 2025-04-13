"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Sparkles, Mail, Users, Star, X } from "lucide-react";

export default function CollaboratePage() {
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
    <div className="relative h-screen w-full overflow-hidden bg-black text-white">
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

      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-6 md:px-8 space-y-8">
        <motion.h1
          className="text-3xl md:text-5xl font-bold text-white text-glow-hard [font-family:var(--font-playfair)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Collaborate With Us
        </motion.h1>

        <motion.p
          className="max-w-2xl text-md md:text-lg text-white/90 text-shadow-strong leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          We believe in creating with—not just for—artists, brands, and fans.
          If you're an artist, manager, brand, or platform interested in building immersive fan-first experiences that live beyond a drop, we want to hear from you.
        </motion.p>

        <motion.button
          onClick={() => navigateTo("mailto:collaborate@magicdrop.world")}
          className="px-8 py-3 border border-white rounded-full text-white font-semibold hover:bg-purple-600 hover:border-purple-600 hover:text-white transition-all duration-300 sparkle"
          whileTap={{ scale: 0.95 }}
        >
          Let’s Collaborate
        </motion.button>
      </div>

      <p className="absolute top-2 left-3 text-xs text-white/50 font-mono tracking-wide z-50">
        MAGICDROP UI
      </p>
      <p className="absolute bottom-2 left-3 text-xs text-white/50 font-mono tracking-wide z-50">
        Build 01 — Public Alpha
      </p>
      <p className="absolute bottom-2 right-3 text-xs text-white/50 font-mono tracking-wide z-50 text-right">
        Powered by Fan Magic
      </p>

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

            <button onClick={() => navigateTo("/enter")} className="flex items-center gap-2 text-white sparkle hover:text-purple-300 transition">
              <Home size={18} /> Home
            </button>
            <button onClick={() => navigateTo("/drops")} className="flex items-center gap-2 text-white sparkle hover:text-purple-300 transition">
              <Sparkles size={18} /> Explore Drops
            </button>
            <button onClick={() => navigateTo("/collaborate")} className="flex items-center gap-2 text-white sparkle hover:text-purple-300 transition">
              <Mail size={18} /> Collaborate
            </button>
            <button onClick={() => navigateTo("/team")} className="flex items-center gap-2 text-white sparkle hover:text-purple-300 transition">
              <Users size={18} /> Meet Our Team
            </button>
            <button onClick={() => navigateTo("/fan-advisor")} className="flex items-center gap-2 text-white sparkle hover:text-purple-300 transition">
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
      `}</style>
    </div>
  );
}
