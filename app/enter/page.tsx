"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Mail, Users, Star, X, Home } from "lucide-react";

const stickers = [
  { id: "pop", img: "/pop-sticker.png", sound: "/pop.mp3" },
  { id: "hiphop", img: "/hiphop-sticker.png", sound: "/hip-hop.mp3" },
  { id: "electronic", img: "/electronic-sticker.png", sound: "/electronic.mp3" },
  // Add more stickers here!
];

export default function EnterPage() {
  const [menuOpen, setMenuOpen] = useState(true);
  const [playing, setPlaying] = useState<{ [id: string]: boolean }>({});
  const [positions, setPositions] = useState<{ [id: string]: { x: number; y: number } }>({});
  const audioRefs = useRef<{ [id: string]: HTMLAudioElement | null }>({});

  useEffect(() => {
    stickers.forEach((s) => {
      setPositions((prev) => ({
        ...prev,
        [s.id]: {
          x: Math.random() * window.innerWidth * 0.6,
          y: 350 + Math.random() * 300,
        },
      }));
    });
  }, []);

  const handleStickerClick = (id: string) => {
    const audio = audioRefs.current[id];
    if (audio) {
      if (playing[id]) {
        audio.pause();
        audio.currentTime = 0;
        setPlaying((p) => ({ ...p, [id]: false }));
      } else {
        audio.play().catch(() => {});
        setPlaying((p) => ({ ...p, [id]: true }));
      }
    }
  };

  const handleDragEnd = (id: string, _: any, info: { point: { x: number; y: number } }) => {
    setPositions((prev) => ({
      ...prev,
      [id]: { x: info.point.x, y: info.point.y },
    }));
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden text-white font-inter">
      <div className="absolute inset-0 z-0 animated-prism" />

      {/* 🎧 Audio */}
      {stickers.map((s) => (
        <audio
          key={s.id}
          ref={(el) => (audioRefs.current[s.id] = el)}
          src={s.sound}
          preload="auto"
        />
      ))}

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

      {/* ✨ HERO HEADER */}
      <div className="relative z-20 flex flex-col items-center justify-center pt-24 text-center px-4 space-y-6">
        <motion.img
          src="/title/welcome-magicdrop.png"
          alt="Welcome to MagicDrop"
          className="w-full max-w-md md:max-w-lg xl:max-w-2xl mx-auto shimmer delay-[1s]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        />

        <p className="text-base md:text-lg text-white text-shadow-strong max-w-md">
          Customize the Dropverse. Move, shape, and remix your world. Tap to play.
        </p>
      </div>

      {/* 🎵 INTERACTIVE STICKERS */}
      <div className="absolute inset-0 z-10">
        {stickers.map((sticker) => (
          <motion.img
            key={sticker.id}
            src={sticker.img}
            alt={sticker.id}
            className="absolute w-20 md:w-24 lg:w-28 h-auto cursor-grab"
            drag
            dragMomentum={false}
            style={{
              x: positions[sticker.id]?.x ?? 0,
              y: positions[sticker.id]?.y ?? 0,
            }}
            onClick={() => handleStickerClick(sticker.id)}
            onDragEnd={(e, info) => handleDragEnd(sticker.id, e, info)}
            whileTap={{ scale: 1.1 }}
          />
        ))}
      </div>

      {/* 💎 LOGO + NAV MENU */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-50">
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="px-6 py-5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl w-[90vw] max-w-sm shadow-2xl flex flex-col items-center gap-3"
            >
              <button
                onClick={() => setMenuOpen(false)}
                className="absolute top-2 right-4 text-white/60 hover:text-white transition"
              >
                <X size={18} />
              </button>
              <h2 className="text-lg font-bold text-shadow-strong mb-2 mt-1">
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
                  onClick={() => (window.location.href = item.link)}
                  className="w-full flex items-center gap-3 justify-center px-5 py-2 rounded-full border border-white/30 bg-white/10 text-white hover:bg-purple-600 hover:border-purple-600 transition text-sm font-semibold"
                >
                  {item.icon} {item.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.img
          onClick={() => setMenuOpen(!menuOpen)}
          src="/logo.png"
          alt="MagicDrop Nav"
          className="h-16 w-16 rounded-full border-2 border-purple-400 bg-black/40 p-2 cursor-pointer hover:scale-110 transition-transform duration-300 shimmer"
          whileTap={{ scale: 0.95 }}
        />
      </div>

      {/* 🌐 GLOBAL STYLES */}
      <style jsx global>{`
        .font-cinzel {
          font-family: 'Cinzel', serif;
        }
        .font-inter {
          font-family: 'Inter', sans-serif;
        }
        .text-shadow-strong {
          text-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
        }
        .animated-prism {
          background: linear-gradient(135deg, #c084fc, #f472b6, #60a5fa, #fcd34d, #a5f3fc);
          background-size: 600% 600%;
          animation: prismShift 30s ease infinite;
        }
        @keyframes prismShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .shimmer {
          animation: shimmerPulse 4s ease-in-out infinite;
        }
        @keyframes shimmerPulse {
          0% { filter: brightness(1) drop-shadow(0 0 6px rgba(213, 179, 255, 0.3)); }
          50% { filter: brightness(1.3) drop-shadow(0 0 20px rgba(213, 179, 255, 0.6)); }
          100% { filter: brightness(1) drop-shadow(0 0 6px rgba(213, 179, 255, 0.3)); }
        }
      `}</style>
    </div>
  );
}
