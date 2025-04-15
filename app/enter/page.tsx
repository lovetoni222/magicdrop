"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Sparkles, Mail, Users, Star, X } from "lucide-react";

type Sticker = {
  id: string;
  icon: string;
  sound: string;
  x: number;
  y: number;
};

const initialStickers: Sticker[] = [
  { id: "pop", icon: "/pop.png", sound: "/pop.mp3", x: 50, y: 100 },
  { id: "hiphop", icon: "/hip-hop.png", sound: "/hip-hop.mp3", x: 150, y: 250 },
  { id: "electronic", icon: "/electronic.png", sound: "/electronic.mp3", x: 250, y: 180 },
  { id: "rnb", icon: "/rnb.png", sound: "/rnb.mp3", x: 80, y: 320 },
  { id: "hyperpop", icon: "/hyperpop.png", sound: "/hyperpop.mp3", x: 180, y: 400 },
  { id: "latino", icon: "/latino.png", sound: "/latino.mp3", x: 300, y: 300 },
  { id: "reggae", icon: "/reggae.png", sound: "/reggae.mp3", x: 120, y: 500 },
  { id: "house", icon: "/house.png", sound: "/house.mp3", x: 220, y: 80 },
  { id: "drill", icon: "/drill.png", sound: "/drill.mp3", x: 350, y: 420 },
  { id: "experimental", icon: "/experimental.png", sound: "/experimental.mp3", x: 100, y: 600 },
];

export default function EnterPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [stickers, setStickers] = useState(initialStickers);
  const [positions, setPositions] = useState(() =>
    Object.fromEntries(initialStickers.map((s) => [s.id, { x: s.x, y: s.y }]))
  );
  const audioRefs = useRef<Record<string, HTMLAudioElement | null>>({});

  const handleStickerClick = (id: string) => {
    const audio = audioRefs.current[id];
    if (audio) {
      if (audio.paused) {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      } else {
        audio.pause();
      }
    }
  };

  const handleDragEnd = (
    id: string,
    _: unknown,
    info: { point: { x: number; y: number } }
  ) => {
    const newX = info.point.x;
    const newY = info.point.y;
    setPositions((prev) => ({ ...prev, [id]: { x: newX, y: newY } }));
  };

  const handleClickSound = () => {
    const audio = new Audio("/ui-hover.mp3");
    audio.play().catch(() => {});
  };

  const navigateTo = (url: string) => {
    handleClickSound();
    setMenuOpen(false);
    window.location.href = url;
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden text-white font-inter bg-black">
      {/* 🎧 Ambient */}
      <audio src="/ambient.mp3" preload="auto" loop autoPlay />
      {stickers.map((s) => (
        <audio
          key={s.id}
          ref={(el) => {
            audioRefs.current[s.id] = el;
          }}
          src={s.sound}
          preload="auto"
        />
      ))}

      {/* 🌈 Background */}
      <div className="absolute inset-0 z-0 animated-prism" />

      {/* 🪩 Header */}
      <div className="pt-24 text-center z-10 relative px-4 space-y-4">
        <img
          src="/welcome-magicdrop.png"
          alt="Welcome to MagicDrop"
          className="mx-auto w-[280px] md:w-[340px]"
        />
        <p className="text-white/90 text-shadow-strong max-w-xl mx-auto text-sm md:text-base">
          Customize the Dropverse. Move, shape, and remix your world. Tap to play.
        </p>
      </div>

      {/* 🎵 Stickers */}
      {stickers.map((s) => (
        <motion.img
          key={s.id}
          src={s.icon}
          alt={s.id}
          drag
          onClick={() => handleStickerClick(s.id)}
          onDragEnd={(e, info) => handleDragEnd(s.id, e, info)}
          animate={positions[s.id]}
          className="absolute w-14 h-14 md:w-16 md:h-16 cursor-pointer select-none z-20 hover:scale-110 transition-all"
          style={{
            x: positions[s.id]?.x,
            y: positions[s.id]?.y,
          }}
        />
      ))}

      {/* 💎 Logo Toggle */}
      <motion.img
        onClick={() => {
          handleClickSound();
          setMenuOpen(!menuOpen);
        }}
        src="/logo.png"
        alt="MagicDrop Nav"
        className="fixed bottom-8 left-1/2 -translate-x-1/2 h-16 w-16 rounded-full border-2 border-purple-400 bg-black/40 p-2 cursor-pointer z-50 hover:scale-110 transition duration-300 shimmer"
        whileTap={{ scale: 0.95 }}
      />

      {/* 🧭 Nav Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl px-6 py-6 z-50 shadow-xl w-[90vw] max-w-sm flex flex-col items-center gap-4"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-2 right-3 text-white/60 hover:text-white"
            >
              <X size={18} />
            </button>
            <h2 className="text-lg font-bold text-shadow-strong">Navigate the Dropverse</h2>
            {[
              { label: "Explore Drops", link: "/drops", icon: <Sparkles size={18} /> },
              { label: "Collaborate", link: "/collaborate", icon: <Mail size={18} /> },
              { label: "Meet Our Team", link: "/team", icon: <Users size={18} /> },
              { label: "Become a Fan Advisor", link: "/fan-advisor", icon: <Star size={18} /> },
            ].map((item) => (
              <button
                key={item.link}
                onClick={() => navigateTo(item.link)}
                className="w-full text-white text-sm font-semibold px-4 py-2 rounded-full border border-white/30 bg-white/10 hover:bg-purple-600 hover:border-purple-600 hover:text-white transition"
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 💬 HUD */}
      <p className="absolute top-2 left-3 text-xs text-white/50 font-mono tracking-wide z-50">
        MAGICDROP UI
      </p>
      <p className="absolute bottom-2 left-3 text-xs text-white/50 font-mono tracking-wide z-50">
        Build 01 — Public Alpha
      </p>
      <p className="absolute bottom-2 right-3 text-xs text-white/50 font-mono tracking-wide z-50 text-right">
        Powered by Fan Magic
      </p>

      <style jsx global>{`
        .animated-prism {
          background: linear-gradient(135deg, #7dd3fc, #c084fc, #f472b6, #facc15, #60a5fa);
          background-size: 600% 600%;
          animation: prismShift 30s ease infinite;
        }
        @keyframes prismShift {
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
        .shimmer {
          animation: shimmerPulse 4s ease-in-out infinite;
        }
        @keyframes shimmerPulse {
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
        .text-shadow-strong {
          text-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
}
