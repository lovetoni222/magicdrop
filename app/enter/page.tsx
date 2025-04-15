"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Mail, Users, Star, X } from "lucide-react";

type Sticker = {
  id: string;
  label: string;
  image: string;
  sound: string;
  x: number;
  y: number;
  scale?: number;
  rotation?: number;
};

const stickers: Sticker[] = [
  { id: "pop", label: "Pop", image: "/icons/pop.png", sound: "/pop.mp3", x: 50, y: 360 },
  { id: "hiphop", label: "Hip-Hop", image: "/icons/hip-hop.png", sound: "/hip-hop.mp3", x: 180, y: 250 },
  { id: "electronic", label: "Electronic", image: "/icons/electronic.png", sound: "/electronic.mp3", x: 300, y: 420 },
  { id: "rock", label: "Rock", image: "/icons/rock.png", sound: "/rock.mp3", x: 450, y: 320 },
  { id: "house", label: "House", image: "/icons/house.png", sound: "/house.mp3", x: 160, y: 500 },
  { id: "reggaeton", label: "Reggaeton", image: "/icons/reggaeton.png", sound: "/reggaeton.mp3", x: 600, y: 200 },
  { id: "kpop", label: "K-Pop", image: "/icons/kpop.png", sound: "/kpop.mp3", x: 80, y: 520 },
  { id: "indie", label: "Indie", image: "/icons/indie.png", sound: "/indie.mp3", x: 240, y: 320 },
  { id: "trap", label: "Trap", image: "/icons/trap.png", sound: "/trap.mp3", x: 420, y: 180 },
  { id: "experimental", label: "Experimental", image: "/icons/experimental.png", sound: "/experimental.mp3", x: 500, y: 450 },
];

export default function EnterPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [playing, setPlaying] = useState<string | null>(null);
  const [layout, setLayout] = useState<Record<string, Sticker>>({});
  const audioRefs = useRef<Record<string, HTMLAudioElement | null>>({});
  const clickAudioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const stickerState: Record<string, Sticker> = {};
    stickers.forEach((s) => {
      stickerState[s.id] = { ...s, scale: 1, rotation: 0 };
    });
    setLayout(stickerState);
  }, []);

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
    setLayout((prev) => {
      const sticker = prev[id];
      const newScale = Math.max(0.5, Math.min(2, (sticker.scale || 1) + e.deltaY * -0.001));
      return {
        ...prev,
        [id]: { ...sticker, scale: newScale },
      };
    });
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
    <div className="relative min-h-screen w-full overflow-hidden text-white font-inter touch-none bg-black">
      <audio ref={clickAudioRef} src="/ui-hover.mp3" preload="auto" />
      <div className="absolute inset-0 z-0 animated-prism" />

      {/* Header */}
      <div className="relative z-20 flex flex-col items-center text-center px-4 pt-16 space-y-4">
        <h1 className="text-3xl md:text-5xl font-bold tracking-wide text-white text-shadow-strong [font-family:var(--font-playfair)]">
          Welcome to
        </h1>
        <motion.img
          src="/logo.png"
          alt="MagicDrop"
          className="h-24 w-auto shimmer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        />
        <p className="text-base md:text-lg max-w-md mt-2 text-white/90 text-shadow-strong">
          Customize the Dropverse. Move, shape, and remix your world. Tap to play.
        </p>
      </div>

      {/* Stickers */}
      <div className="absolute inset-0 z-10">
        {Object.values(layout).map((s, i) => (
          <motion.div
            key={s.id}
            data-id={s.id}
            drag
            dragMomentum={false}
            dragElastic={0.2}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
            animate={{
              x: s.x,
              y: s.y,
              scale: s.scale,
              rotate: s.rotation,
            }}
            onClick={(e) => {
              e.stopPropagation();
              setActive(s.id);
              toggleAudio(s.id);
            }}
            className={`absolute z-30 select-none cursor-pointer ${
              active === s.id ? "drop-shadow-lg" : ""
            }`}
            style={{ width: 70, height: 70 }}
          >
            <img
              src={s.image}
              alt={s.label}
              className="w-full h-full object-contain"
              draggable={false}
            />
            <audio
              ref={(el) => {
                audioRefs.current[s.id] = el;
              }}
              src={s.sound}
              preload="auto"
            />
          </motion.div>
        ))}
      </div>

      {/* Nav Button */}
      <motion.img
        onClick={() => setMenuOpen(!menuOpen)}
        src="/logo.png"
        alt="MagicDrop Nav"
        className="fixed bottom-6 left-1/2 -translate-x-1/2 h-16 w-16 rounded-full border-2 border-purple-400 bg-black/40 p-2 z-50 cursor-pointer hover:scale-110 transition-transform shimmer"
        whileTap={{ scale: 0.95 }}
      />

      {/* Menu */}
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
          background: linear-gradient(135deg, #f472b6, #a855f7, #60a5fa, #38bdf8, #22d3ee);
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
      `}</style>
    </div>
  );
}
