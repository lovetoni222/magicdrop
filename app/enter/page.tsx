"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Mail, Users, Star, X } from "lucide-react";

const stickers = [
  {
    id: "pop",
    icon: "💖",
    audio: "/sounds/pop.mp3",
    defaultPos: { x: -100, y: 0 },
  },
  {
    id: "hiphop",
    icon: "🔊",
    audio: "/sounds/hiphop.mp3",
    defaultPos: { x: 0, y: 60 },
  },
  {
    id: "electronic",
    icon: "🎧",
    audio: "/sounds/electronic.mp3",
    defaultPos: { x: 100, y: 0 },
  },
];

export default function EnterPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [positions, setPositions] = useState(
    stickers.reduce((acc, sticker) => {
      acc[sticker.id] = sticker.defaultPos;
      return acc;
    }, {} as Record<string, { x: number; y: number }>)
  );

  const ambientAudioRef = useRef<HTMLAudioElement>(null);
  const clickAudioRef = useRef<HTMLAudioElement>(null);
  const stickerAudioRefs = useRef<Record<string, HTMLAudioElement>>({});

  useEffect(() => {
    if (ambientAudioRef.current) {
      ambientAudioRef.current.volume = 0.4;
      ambientAudioRef.current.play().catch(() => {});
    }
  }, []);

  const playClick = () => {
    if (clickAudioRef.current) {
      clickAudioRef.current.currentTime = 0;
      clickAudioRef.current.play().catch(() => {});
    }
  };

  const playStickerSound = (id: string) => {
    const ref = stickerAudioRefs.current[id];
    if (ref) {
      ref.currentTime = 0;
      ref.play().catch(() => {});
    }
  };

  const handleDragEnd = (
    id: string,
    event: MouseEvent | TouchEvent | PointerEvent,
    info: { point: { x: number; y: number } }
  ) => {
    setPositions((prev) => ({
      ...prev,
      [id]: { x: info.point.x, y: info.point.y },
    }));
  };

  const navigateTo = (url: string) => {
    playClick();
    setMenuOpen(false);
    window.location.href = url;
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      {/* Audio */}
      <audio ref={ambientAudioRef} src="/ambient.mp3" preload="none" loop />
      <audio ref={clickAudioRef} src="/ui-hover.mp3" preload="auto" />
      {stickers.map((s) => (
        <audio
          key={s.id}
          ref={(el) => {
            if (el) stickerAudioRefs.current[s.id] = el;
          }}
          src={s.audio}
          preload="auto"
        />
      ))}

      {/* Background */}
      <div className="absolute inset-0 z-0 animated-prism" />

      {/* Header Orb */}
      <div className="pt-24 text-center z-20 relative px-4">
        <div className="rounded-full bg-white/10 border border-white/20 p-6 md:p-8 backdrop-blur-md shadow-[0_0_40px_rgba(213,179,255,0.4)] max-w-xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold font-cinzel text-white text-shadow-strong mb-3">
            Welcome to MagicDrop
          </h1>
          <p className="max-w-xl mx-auto text-white/80 text-shadow-strong text-sm md:text-base">
            Choose your path. Explore immersive drops, co-created stories, and artist-led worlds.
          </p>
        </div>
      </div>

      {/* Draggable Stickers */}
      <div className="absolute top-[60%] left-1/2 -translate-x-1/2 z-30">
        {stickers.map((s) => (
          <motion.div
            key={s.id}
            drag
            dragMomentum={false}
            dragConstraints={{ top: -300, bottom: 300, left: -300, right: 300 }}
            onDragEnd={(e, info) => handleDragEnd(s.id, e, info)}
            initial={positions[s.id]}
            animate={positions[s.id]}
            whileTap={{ scale: 0.95 }}
            className="absolute cursor-pointer text-3xl sticker-icon"
            onClick={() => playStickerSound(s.id)}
          >
            {s.icon}
          </motion.div>
        ))}
      </div>

      {/* NAV + LOGO */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-50">
        <motion.img
          onClick={() => {
            playClick();
            setMenuOpen(!menuOpen);
          }}
          src="/logo.png"
          alt="MagicDrop Nav"
          className="h-16 w-16 rounded-full border-2 border-purple-400 bg-black/40 p-2 cursor-pointer hover:scale-110 transition-transform duration-300 shimmer"
          whileTap={{ scale: 0.95 }}
        />
        {menuOpen && (
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="px-6 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl max-w-sm shadow-2xl flex flex-col items-center gap-3 relative"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-3 right-4 text-white/60 hover:text-white"
            >
              <X size={18} />
            </button>
            {[
              { label: "Explore Drops", link: "/drops" },
              { label: "Collaborate", link: "/collaborate" },
              { label: "Meet Our Team", link: "/team" },
              { label: "Become a Fan Advisor", link: "/fan-advisor" },
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
      </div>

      <style jsx global>{`
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
        .text-shadow-strong {
          text-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
        }
        .sticker-icon {
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.7),
            0 0 20px rgba(213, 179, 255, 0.6);
          transition: text-shadow 0.3s ease;
        }
        .sticker-icon:hover {
          text-shadow: 0 0 20px rgba(213, 179, 255, 0.8),
            0 0 40px rgba(213, 179, 255, 0.5);
        }
      `}</style>
    </div>
  );
}
