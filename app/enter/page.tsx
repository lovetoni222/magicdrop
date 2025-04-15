"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Mail, Users, Star, X, RotateCcw, Camera } from "lucide-react";
import html2canvas from "html2canvas";

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

type StickerState = {
  x: number;
  y: number;
  scale: number;
  rotation: number;
};

export default function EnterPage() {
  const [menuOpen, setMenuOpen] = useState(true);
  const [active, setActive] = useState<string | null>(null);
  const [playing, setPlaying] = useState<string | null>(null);
  const audioRefs = useRef<Record<string, HTMLAudioElement | null>>({});
  const clickAudioRef = useRef<HTMLAudioElement>(null);

  const [state, setState] = useState<Record<string, StickerState>>(() =>
    stickers.reduce((acc, s) => {
      acc[s.id] = {
        x: Math.floor(Math.random() * 200) + 60,
        y: Math.floor(Math.random() * 250) + 100,
        scale: 1,
        rotation: 0,
      };
      return acc;
    }, {} as Record<string, StickerState>)
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
      [id]: {
        ...prev[id],
        rotation: (prev[id].rotation + 90) % 360,
      },
    }));
  };

  const captureScreenshot = async () => {
    const canvas = await html2canvas(document.body, { useCORS: true });
    const link = document.createElement("a");
    link.download = "magicdrop-remix.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
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
    <div
      className="relative min-h-screen w-full overflow-hidden bg-black text-white font-inter touch-none"
      onClick={(e) => {
        const target = (e.target as HTMLElement).closest("[data-id]");
        if (!target) setActive(null);
      }}
    >
      <audio ref={clickAudioRef} src="/ui-hover.mp3" preload="auto" />
      <div className="absolute inset-0 z-0 animated-prism" />

      {/* Header */}
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

        <button
          onClick={captureScreenshot}
          className="flex items-center gap-2 text-sm px-4 py-2 border border-white/20 text-white hover:text-purple-300 hover:border-purple-300 rounded-full mt-2 transition z-30"
        >
          <Camera size={16} /> Save My Mix
        </button>
      </div>

      {/* Stickers */}
      <AnimatePresence>
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
              transition={{ delay: i * 0.06, type: "spring" }}
              onClick={(e) => {
                e.stopPropagation();
                setActive(s.id);
                toggleAudio(s.id);
              }}
              className={`absolute select-none cursor-pointer z-30 ${
                isActive ? "shadow-2xl ring-1 ring-white/20" : ""
              }`}
              style={{ width: 64, height: 64 }}
            >
              <img
                src={s.image}
                alt={s.label}
                className={`w-full h-full object-contain ${
                  active === s.id ? "drag-glow" : ""
                }`}
                draggable={false}
              />
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
      </AnimatePresence>

      {/* Logo Nav Toggle */}
      <motion.img
        onClick={() => setMenuOpen(!menuOpen)}
        src="/logo.png"
        alt="MagicDrop Nav"
        className="fixed bottom-6 left-1/2 -translate-x-1/2 h-16 w-16 rounded-full border-2 border-purple-400 bg-black/40 p-2 z-50 cursor-pointer hover:scale-110 transition-transform shimmer"
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
                onClick={() => (window.location.href = item.link)}
                className="w-full flex items-center gap-3 justify-center px-5 py-2 rounded-full border border-white/30 bg-white/10 text-white hover:bg-purple-600 hover:border-purple-600 transition text-sm font-semibold"
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

      <style jsx global>{`
        .animated-prism {
          background: linear-gradient(135deg, #e879f9, #a855f7, #60a5fa, #38bdf8, #22d3ee);
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

        .drag-glow {
          filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.6));
        }
      `}</style>
    </div>
  );
}
