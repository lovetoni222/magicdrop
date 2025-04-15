"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Sparkles, Mail, Users, Star, X } from "lucide-react";

type Sticker = {
  id: string;
  image: string;
  sound: string;
  x: number;
  y: number;
};

const initialStickers: Sticker[] = [
  { id: "pop", image: "/pop.png", sound: "/pop.mp3", x: 60, y: 120 },
  { id: "hiphop", image: "/hip-hop.png", sound: "/hip-hop.mp3", x: 220, y: 150 },
  { id: "electronic", image: "/electronic.png", sound: "/electronic.mp3", x: 120, y: 280 },
  { id: "rnb", image: "/rnb.png", sound: "/rnb.mp3", x: 40, y: 400 },
  { id: "indie", image: "/indie.png", sound: "/indie.mp3", x: 280, y: 350 },
  { id: "hyperpop", image: "/hyperpop.png", sound: "/hyperpop.mp3", x: 160, y: 500 },
  { id: "country", image: "/country.png", sound: "/country.mp3", x: 80, y: 600 },
  { id: "edm", image: "/edm.png", sound: "/edm.mp3", x: 200, y: 450 },
  { id: "experimental", image: "/experimental.png", sound: "/experimental.mp3", x: 260, y: 550 },
  { id: "ambient", image: "/ambient.png", sound: "/ambient.mp3", x: 150, y: 650 },
];

export default function EnterPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [stickers, setStickers] = useState(initialStickers);
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement | null }>({});

  const playSound = (id: string) => {
    const audio = audioRefs.current[id];
    if (audio) {
      if (audio.paused) {
        audio.currentTime = 0;
        audio.play();
      } else {
        audio.pause();
      }
    }
  };
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white font-inter">
      {/* 🎧 Audio */}
      {stickers.map((s) => (
        <audio
          key={s.id}
          ref={(el) => (audioRefs.current[s.id] = el)}
          src={s.sound}
          preload="auto"
        />
      ))}

      {/* 🌈 Background Gradient */}
      <div className="absolute inset-0 z-0 animated-prism" />

      {/* 🌟 Header with Logo */}
      <div className="relative z-10 text-center pt-28 px-4 space-y-3">
        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-wide font-inter text-shadow-strong">
          Welcome to
        </h1>
        <img
          src="/logo.png"
          alt="MagicDrop"
          className="mx-auto h-16 md:h-20 drop-shadow-lg"
        />
        <p className="text-white/90 text-sm md:text-base max-w-md mx-auto text-shadow-strong">
          Customize the Dropverse. Move, shape, and remix your world. Tap to play.
        </p>
      </div>

      {/* 🟣 Stickers */}
      <div className="absolute inset-0 z-10">
        {stickers.map((sticker) => (
          <motion.img
            key={sticker.id}
            src={sticker.image}
            className="absolute w-16 h-16 cursor-pointer select-none touch-none"
            style={{ top: sticker.y, left: sticker.x }}
            drag
            dragMomentum={false}
            dragConstraints={{ top: 0, bottom: window.innerHeight - 80, left: 0, right: window.innerWidth - 80 }}
            onClick={() => playSound(sticker.id)}
            whileTap={{ scale: 0.95 }}
          />
        ))}
      </div>

      {/* 💎 Logo Toggle Nav */}
      <motion.img
        onClick={() => setMenuOpen(!menuOpen)}
        src="/logo.png"
        alt="Nav"
        className="fixed bottom-6 left-1/2 -translate-x-1/2 h-16 w-16 rounded-full border-2 border-purple-400 bg-black/40 p-2 z-50 cursor-pointer hover:scale-110 transition duration-300 shimmer"
        whileTap={{ scale: 0.95 }}
      />

      {/* 🎮 Toggle Nav Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md rounded-2xl px-8 py-6 z-50 shadow-lg border border-white/20 flex flex-col gap-4 items-start min-w-[240px]"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-2 right-2 text-white/50 hover:text-white transition"
            >
              <X size={18} />
            </button>
            <button onClick={() => (window.location.href = "/drops")} className="nav-btn">
              <Sparkles size={18} /> Explore Drops
            </button>
            <button onClick={() => (window.location.href = "/collaborate")} className="nav-btn">
              <Mail size={18} /> Collaborate
            </button>
            <button onClick={() => (window.location.href = "/team")} className="nav-btn">
              <Users size={18} /> Meet Our Team
            </button>
            <button onClick={() => (window.location.href = "/fan-advisor")} className="nav-btn">
              <Star size={18} /> Become a Fan Advisor
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🔧 HUD Labels */}
      <p className="absolute top-2 left-3 text-xs text-white/50 font-mono tracking-wide z-50">
        MAGICDROP UI
      </p>
      <p className="absolute bottom-2 left-3 text-xs text-white/50 font-mono tracking-wide z-50">
        Build 01 — Public Alpha
      </p>
      <p className="absolute bottom-2 right-3 text-xs text-white/50 font-mono tracking-wide z-50 text-right">
        Powered by Fan Magic
      </p>

      {/* 🌍 Global Styles */}
      <style jsx global>{`
        .animated-prism {
          background: linear-gradient(135deg, #60a5fa, #a78bfa, #f472b6);
          background-size: 600% 600%;
          animation: prismShift 30s ease infinite;
        }

        @keyframes prismShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .text-shadow-strong {
          text-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
        }

        .shimmer {
          animation: shimmerPulse 4s ease-in-out infinite;
        }

        @keyframes shimmerPulse {
          0% { filter: brightness(1) drop-shadow(0 0 6px rgba(213, 179, 255, 0.3)); }
          50% { filter: brightness(1.3) drop-shadow(0 0 20px rgba(213, 179, 255, 0.6)); }
          100% { filter: brightness(1) drop-shadow(0 0 6px rgba(213, 179, 255, 0.3)); }
        }

        .nav-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: white;
          font-weight: 600;
          font-size: 0.875rem;
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background-color: rgba(255, 255, 255, 0.05);
          transition: all 0.3s;
        }

        .nav-btn:hover {
          background-color: #9333ea;
          border-color: #9333ea;
        }
      `}</style>
    </div>
  );
}
