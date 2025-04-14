"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Mail, Users, Star, X } from "lucide-react";

const stickers = [
  { id: "pop", icon: "🎤", audio: "/pop.mp3" },
  { id: "hip-hop", icon: "🎧", audio: "/hip-hop.mp3" },
  { id: "electronic", icon: "🎛️", audio: "/electronic.mp3" },
];

export default function EnterPage() {
  const [menuOpen, setMenuOpen] = useState(true);
  const [playing, setPlaying] = useState<Record<string, boolean>>({});
  const boardRef = useRef<HTMLDivElement>(null);
  const ambientAudioRef = useRef<HTMLAudioElement>(null);
  const clickAudioRef = useRef<HTMLAudioElement>(null);
  const audioRefs = useRef<Record<string, HTMLAudioElement>>({});

  const [positions, setPositions] = useState(() =>
    stickers.reduce((acc, { id }) => {
      acc[id] = {
        x: Math.floor(Math.random() * 240) + 30,
        y: Math.floor(Math.random() * 120) + 30,
      };
      return acc;
    }, {} as Record<string, { x: number; y: number }>)
  );

  useEffect(() => {
    ambientAudioRef.current?.play().catch(() => {});
  }, []);

  const playClick = () => {
    clickAudioRef.current?.play().catch(() => {});
  };

  const toggleStickerAudio = (id: string) => {
    const audio = audioRefs.current[id];
    if (!audio) return;

    if (playing[id]) {
      audio.pause();
      setPlaying((prev) => ({ ...prev, [id]: false }));
    } else {
      Object.values(audioRefs.current).forEach((a) => a.pause());
      Object.keys(playing).forEach((k) => playing[k] && setPlaying((p) => ({ ...p, [k]: false })));

      audio.currentTime = 0;
      audio.play().catch(() => {});
      setPlaying((prev) => ({ ...prev, [id]: true }));
    }
  };

  const handleDragEnd = (
    id: string,
    e: MouseEvent | TouchEvent,
    info: { point: { x: number; y: number } }
  ) => {
    const board = boardRef.current;
    const boardRect = board?.getBoundingClientRect();
    const iconSize = 60;

    if (
      !boardRect ||
      info.point.x < boardRect.left ||
      info.point.x > boardRect.right - iconSize ||
      info.point.y < boardRect.top ||
      info.point.y > boardRect.bottom - iconSize
    ) {
      return;
    }

    setPositions((prev) => ({
      ...prev,
      [id]: {
        x: info.point.x - boardRect.left - iconSize / 2,
        y: info.point.y - boardRect.top - iconSize / 2,
      },
    }));
  };

  const navigateTo = (url: string) => {
    playClick();
    setMenuOpen(false);
    window.location.href = url;
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white font-inter">
      <audio ref={ambientAudioRef} src="/ambient.mp3" preload="none" loop />
      <audio ref={clickAudioRef} src="/ui-hover.mp3" preload="auto" />
      {stickers.map((s) => (
        <audio
          key={s.id}
          ref={(el) => {
            if (el) audioRefs.current[s.id] = el;
          }}
          id={`audio-${s.id}`}
          src={s.audio}
          preload="auto"
        />
      ))}

      {/* Background */}
      <div className="absolute inset-0 z-0 animated-prism" />

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

      {/* Header Orb */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-24 text-center px-4 space-y-6">
        <div className="rounded-full bg-white/10 border border-white/20 p-6 md:p-8 backdrop-blur-md shadow-[0_0_40px_rgba(213,179,255,0.4)] max-w-xl">
          <h1 className="text-3xl md:text-5xl font-bold text-white font-cinzel tracking-wide">
            Welcome to MagicDrop
          </h1>
          <p className="mt-4 text-base md:text-xl text-white text-shadow-strong">
            Choose your path. Explore immersive drops, co-created stories, and artist-led worlds.
          </p>
        </div>
        <p className="text-sm text-white/70 max-w-sm mt-4">
          ✨ Tap an icon to play a sound — tap again to stop. Drag anywhere to create your own vibe.
        </p>
      </div>

      {/* Sticker Zone */}
      <div
        ref={boardRef}
        id="sticker-board"
        className="relative z-10 mx-auto mt-12 mb-24 w-full max-w-3xl h-[280px] border border-white/10 rounded-3xl backdrop-blur-sm bg-white/5 overflow-hidden"
      >
        {stickers.map((s) => (
          <motion.div
            key={s.id}
            drag
            dragConstraints={boardRef}
            dragElastic={0.2}
            dragTransition={{ power: 0, bounceStiffness: 300, bounceDamping: 20 }}
            animate={{ x: positions[s.id].x, y: positions[s.id].y }}
            onClick={() => toggleStickerAudio(s.id)}
            onDragEnd={(e, info) => handleDragEnd(s.id, e, info)}
            className="absolute text-4xl cursor-pointer hover:scale-110 transition-transform duration-200 select-none"
            style={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(255, 255, 255, 0.1)",
              boxShadow: "0 0 10px rgba(213, 179, 255, 0.6)",
              zIndex: 30,
            }}
          >
            {s.icon}
          </motion.div>
        ))}
      </div>

      {/* Logo Toggle */}
      <motion.img
        onClick={() => setMenuOpen(!menuOpen)}
        src="/logo.png"
        alt="MagicDrop Nav"
        className="fixed bottom-6 left-1/2 -translate-x-1/2 h-16 w-16 rounded-full border-2 border-purple-400 bg-black/40 p-2 cursor-pointer hover:scale-110 transition-transform duration-300 shimmer z-50"
        whileTap={{ scale: 0.95 }}
      />

      {/* Nav Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl w-[90%] max-w-sm px-6 py-5 z-40 shadow-2xl flex flex-col items-center gap-4"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-3 right-4 text-white/60 hover:text-white"
            >
              <X size={18} />
            </button>
            <h2 className="text-lg font-bold text-shadow-strong mt-3 mb-1">Navigate the Dropverse</h2>
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

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700&family=Inter:wght@400;600&display=swap');

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
