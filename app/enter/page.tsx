"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Mail, Users, Star, X } from "lucide-react";

const stickers = [
  { id: "pop", icon: "💖", audio: "/pop.mp3", x: 40, y: 420 },
  { id: "hiphop", icon: "🎧", audio: "/hip-hop.mp3", x: 240, y: 420 },
  { id: "electronic", icon: "🔊", audio: "/electronic.mp3", x: 140, y: 480 },
];

export default function EnterPage() {
  const ambientAudioRef = useRef<HTMLAudioElement>(null);
  const clickAudioRef = useRef<HTMLAudioElement>(null);
  const [menuOpen, setMenuOpen] = useState(true);
  const [positions, setPositions] = useState(() =>
    stickers.reduce((acc, s) => {
      acc[s.id] = { x: s.x, y: s.y };
      return acc;
    }, {} as Record<string, { x: number; y: number }>)
  );

  useEffect(() => {
    ambientAudioRef.current?.play().catch(() => {});
  }, []);

  const playSound = (src: string) => {
    const audio = new Audio(src);
    audio.volume = 0.5;
    audio.play().catch(() => {});
  };

  const handleDragEnd = (id: string, e: any, info: any) => {
    setPositions((prev) => ({
      ...prev,
      [id]: { x: info.point.x, y: info.point.y },
    }));
    playSound(stickers.find((s) => s.id === id)?.audio || "");
  };

  const handleClickSound = () => {
    clickAudioRef.current?.play().catch(() => {});
  };

  const navigateTo = (url: string) => {
    handleClickSound();
    setMenuOpen(false);
    window.location.href = url;
  };
  return (
    <div className="relative min-h-screen w-full overflow-hidden text-white bg-black font-inter">
      <audio ref={ambientAudioRef} src="/ambient.mp3" preload="none" loop />
      <audio ref={clickAudioRef} src="/ui-hover.mp3" preload="auto" />

      {/* Background */}
      <div className="absolute inset-0 z-0 animated-prism" />

      {/* Header */}
      <div className="relative z-20 flex flex-col items-center justify-center pt-24 text-center px-4 space-y-6">
        <div className="rounded-full bg-white/10 border border-white/20 p-6 md:p-8 backdrop-blur-md shadow-[0_0_40px_rgba(213,179,255,0.4)] max-w-xl">
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-wide font-cinzel text-shadow-strong">
            Welcome to MagicDrop
          </h1>
          <p className="mt-4 text-base md:text-xl text-white text-shadow-strong">
            Choose your path. Explore immersive drops, co-created stories, and artist-led worlds.
          </p>
        </div>
      </div>

      {/* Stickers */}
      {stickers.map((s) => (
        <motion.div
          key={s.id}
          className="absolute text-3xl cursor-grab select-none"
          drag
          dragMomentum={false}
          onDragEnd={(e, info) => handleDragEnd(s.id, e, info)}
          style={{
            left: positions[s.id].x,
            top: positions[s.id].y,
            zIndex: 30,
            touchAction: "none",
          }}
          whileTap={{ scale: 1.2 }}
        >
          <span className="drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">{s.icon}</span>
        </motion.div>
      ))}

      {/* HUD */}
      <p className="absolute top-2 left-3 text-xs text-white/50 font-mono tracking-wide z-50">
        MAGICDROP UI
      </p>
      <p className="absolute bottom-2 left-3 text-xs text-white/50 font-mono tracking-wide z-50">
        Build 01 — Public Alpha
      </p>
      <p className="absolute bottom-2 right-3 text-xs text-white/50 font-mono tracking-wide z-50 text-right">
        Powered by Fan Magic
      </p>

      {/* Nav Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 px-6 py-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl w-[90%] max-w-sm mx-auto shadow-2xl flex flex-col items-center gap-4 z-40"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-3 right-4 text-white/60 hover:text-white"
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
                {item.icon} {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logo Toggle */}
      <motion.img
        onClick={() => {
          handleClickSound();
          setMenuOpen(!menuOpen);
        }}
        src="/logo.png"
        alt="MagicDrop Nav"
        className="fixed bottom-6 left-1/2 -translate-x-1/2 h-16 w-16 rounded-full border-2 border-purple-400 bg-black/40 p-2 z-50 cursor-pointer hover:scale-110 transition-transform shimmer"
        whileTap={{ scale: 0.95 }}
      />

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700&family=Inter:wght@400;600&display=swap');
        .font-cinzel { font-family: 'Cinzel', serif; }
        .font-inter { font-family: 'Inter', sans-serif; }

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
