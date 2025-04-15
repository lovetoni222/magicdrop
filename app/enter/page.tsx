"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Mail, Users, Star, X, RotateCcw } from "lucide-react";
import "../globals.css"; // Make sure global CSS is still linked properly

// Sticker list
const stickers = [
  { id: "pop", label: "Pop", image: "/icons/pop.png", sound: "/pop.mp3" },
  { id: "hip-hop", label: "Hip-Hop", image: "/icons/hip-hop.png", sound: "/hip-hop.mp3" },
  { id: "electronic", label: "Electronic", image: "/icons/electronic.png", sound: "/electronic.mp3" },
  { id: "rock", label: "Rock", image: "/icons/rock.png", sound: "/rock.mp3" },
  { id: "house", label: "House", image: "/icons/house.png", sound: "/house.mp3" },
  { id: "reggaeton", label: "Reggaeton", image: "/icons/reggaeton.png", sound: "/reggaeton.mp3" },
  { id: "kpop", label: "K-Pop", image: "/icons/kpop.png", sound: "/kpop.mp3" },
  { id: "indie", label: "Indie", image: "/icons/indie.png", sound: "/indie.mp3" },
  { id: "trap", label: "Trap", image: "/icons/trap.png", sound: "/trap.mp3" },
  { id: "experimental", label: "Experimental", image: "/icons/experimental.png", sound: "/experimental.mp3" },
];

export default function EnterPage() {
  const [menuOpen, setMenuOpen] = useState(true);
  const [active, setActive] = useState<string | null>(null);
  const [playing, setPlaying] = useState<string | null>(null);
  const audioRefs = useRef<Record<string, HTMLAudioElement | null>>({});
  const clickAudioRef = useRef<HTMLAudioElement>(null);

  // Sticker states for movement, scale, and rotation
  const [state, setState] = useState(() =>
    stickers.reduce((acc, s) => {
      acc[s.id] = {
        x: Math.floor(Math.random() * 200) + 60,
        y: Math.floor(Math.random() * 250) + 100,
        scale: 1,
        rotation: 0,
      };
      return acc;
    }, {} as Record<string, { x: number; y: number; scale: number; rotation: number }>)
  );

  const toggleAudio = (id: string) => {
    const audio = audioRefs.current[id];
    if (!audio) return;

    if (playing === id) {
      audio.pause();
      audio.currentTime = 0;
      setPlaying(null);
    } else {
      Object.entries(audioRefs.current).forEach(([key, ref]) => {
        if (ref && key !== id) {
          ref.pause();
          ref.currentTime = 0;
        }
      });
      audio.play().catch(() => {});
      setPlaying(id);
    }
  };

  const handleWheel = (id: string, e: WheelEvent) => {
    setState((prev) => {
      const scale = Math.max(0.4, Math.min(2.2, prev[id].scale + e.deltaY * -0.001));
      return { ...prev, [id]: { ...prev[id], scale } };
    });
  };

  const handleResizeDrag = (id: string, dx: number, dy: number) => {
    const delta = (dx + dy) * 0.005;
    setState((prev) => {
      const scale = Math.max(0.4, Math.min(2.2, prev[id].scale + delta));
      return { ...prev, [id]: { ...prev[id], scale } };
    });
  };

  const rotateSticker = (id: string) => {
    setState((prev) => ({
      ...prev,
      [id]: { ...prev[id], rotation: (prev[id].rotation + 90) % 360 },
    }));
  };

  useEffect(() => {
    const handler = (e: WheelEvent) => {
      const el = (e.target as HTMLElement).closest("[data-id]");
      const id = el?.getAttribute("data-id");
      if (id) handleWheel(id, e);
    };
    window.addEventListener("wheel", handler, { passive: false });

    return () => window.removeEventListener("wheel", handler);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white font-inter touch-none" onClick={(e) => { const target = (e.target as HTMLElement).closest("[data-id]"); if (!target) setActive(null); }}>
      <audio ref={clickAudioRef} src="/ui-hover.mp3" preload="auto" />
      <div className="absolute inset-0 z-0 animated-prism" />

      {/* Static sparkle dots behind stickers */}
      {[...Array(10)].map((_, i) => (
        <div
          key={`static-sparkle-${i}`}
          className="absolute w-2 h-2 bg-white/80 rounded-full opacity-80 blur-sm z-20 pointer-events-none"
          style={{
            top: `${10 + i * 7}%`,
            left: `${(i % 2 === 0 ? 20 : 70) + (i % 3) * 3}%`,
          }}
        />
      ))}

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-30 flex flex-col items-center justify-center pt-24 text-center px-4 space-y-6"
      >
        <div className="rounded-full bg-white/10 border border-white/20 p-6 md:p-8 backdrop-blur-md shadow-[0_0_20px_rgba(213,179,255,0.2)] max-w-xl">
          <h1 className="header">Welcome to MagicDrop</h1>
          <p className="mt-4 text-base md:text-xl text-white/80 text-shadow-strong">
            Customize the dropverse. Move, shape, and remix your world. Tap to play.
          </p>
        </div>
      </motion.div>

      {/* Stickers */}
      {stickers.map((s, i) => {
        const isActive = active === s.id;
        const { x, y, scale, rotation } = state[s.id];
        return (
          <motion.div
            key={s.id}
            data-id={s.id}
            drag
            dragMomentum={false}
            dragElastic={0.1}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ x, y, scale, rotate: rotation, opacity: 1 }}
            transition={{ delay: i * 0.05 }}
            onClick={(e) => {
              e.stopPropagation();
              setActive(s.id);
              toggleAudio(s.id);
            }}
            className="absolute select-none cursor-pointer z-30 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] transition-shadow"
            style={{ width: 64, height: 64 }}
          >
            <img src={s.image} alt={s.label} className="w-full h-full object-contain" draggable={false} />
            <audio
              ref={(el) => {
                audioRefs.current[s.id] = el;
              }}
              src={s.sound}
              preload="auto"
            />
            {isActive && (
              <>
                <div className="absolute inset-0 border border-white/30 pointer-events-none rounded-lg" />
                <motion.div
                  className="w-4 h-4 bg-white absolute bottom-0 right-0 z-40 rounded-full cursor-nesw-resize"
                  drag
                  dragMomentum={false}
                  onDrag={(e, info) => handleResizeDrag(s.id, info.delta.x, info.delta.y)}
                  style={{ touchAction: "none" }}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    rotateSticker(s.id);
                  }}
                  className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 z-40 text-white/70 hover:text-white"
                >
                  <RotateCcw size={16} />
                </button>
              </>
            )}
          </motion.div>
        );
      })}

      {/* Nav Toggle */}
      <motion.img
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          clickAudioRef.current?.play().catch(() => {});
          setMenuOpen(!menuOpen);
        }}
        src="/logo.png"
        alt="MagicDrop Nav"
        className="fixed bottom-6 left-1/2 -translate-x-1/2 h-16 w-16 rounded-full border-2 border-purple-400 bg-black/40 p-2 z-50 cursor-pointer shimmer"
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
                onClick={() => {
                  clickAudioRef.current?.play().catch(() => {});
                  window.location.href = item.link;
                }}
                className="w-full text-white text-sm font-semibold px-4 py-2 rounded-full border border-white/30 bg-white/10 hover:bg-purple-600 hover:border-purple-600 hover:text-white transition"
              >
                {item.icon} {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* HUD */}
      <p className="absolute top-2 left-3 text-xs text-white/50 font-mono tracking-wide z-50">MAGICDROP UI</p>
      <p className="absolute bottom-2 left-3 text-xs text-white/50 font-mono tracking-wide z-50">Build 01 — Public Alpha</p>
      <p className="absolute bottom-2 right-3 text-xs text-white/50 font-mono tracking-wide z-50 text-right">Powered by Fan Magic</p>
    </div>
  );
}
