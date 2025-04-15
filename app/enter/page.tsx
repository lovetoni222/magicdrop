"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Mail, Users, Star, X } from "lucide-react";

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

type Pos = { x: number; y: number; scale: number };

export default function EnterPage() {
  const [menuOpen, setMenuOpen] = useState(true);
  const [playing, setPlaying] = useState<string | null>(null);
  const [activeSticker, setActiveSticker] = useState<string | null>(null);
  const audioRefs = useRef<Record<string, HTMLAudioElement | null>>({});
  const clickAudioRef = useRef<HTMLAudioElement>(null);

  const [positions, setPositions] = useState<Record<string, Pos>>(() =>
    stickers.reduce((acc, s) => {
      acc[s.id] = {
        x: Math.floor(Math.random() * 200) + 60,
        y: Math.floor(Math.random() * 250) + 100,
        scale: 1,
      };
      return acc;
    }, {} as Record<string, Pos>)
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

  const handleResize = (id: string, delta: number) => {
    setPositions((prev) => {
      const next = Math.max(0.5, Math.min(2, prev[id].scale + delta));
      return { ...prev, [id]: { ...prev[id], scale: next } };
    });
  };

  const deselectSticker = () => {
    setActiveSticker(null);
  };

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      const el = (e.target as HTMLElement).closest("[data-id]");
      const id = el?.getAttribute("data-id");
      if (id) {
        handleResize(id, e.deltaY * -0.001);
      }
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);
  return (
    <div
      className="relative min-h-screen w-full overflow-hidden bg-black text-white font-inter"
      onClick={(e) => {
        const target = (e.target as HTMLElement).closest("[data-id]");
        if (!target) deselectSticker();
      }}
    >
      <audio ref={clickAudioRef} src="/ui-hover.mp3" preload="auto" />
      <div className="absolute inset-0 z-0 animated-prism" />

      {/* Header */}
      <div className="relative z-20 flex flex-col items-center justify-center pt-24 text-center px-4 space-y-6">
        <div className="rounded-full bg-white/10 border border-white/20 p-6 md:p-8 backdrop-blur-md shadow-[0_0_40px_rgba(213,179,255,0.4)] max-w-xl">
          <h1 className="text-3xl md:text-5xl font-bold text-white text-glow tracking-wide font-cinzel">
            Welcome to MagicDrop
          </h1>
          <p className="mt-4 text-base md:text-xl text-white/80 text-shadow-strong">
            Choose your path. Explore immersive drops, co-created stories, and artist-led worlds.
          </p>
        </div>
        <p className="text-sm text-white/60 max-w-sm mt-2">
          Tap to play. Pinch or scroll to resize. Drag to arrange.
        </p>
      </div>

      {/* Sticker Canvas */}
      {stickers.map((s) => {
        const isActive = s.id === activeSticker;
        return (
          <motion.div
            key={s.id}
            data-id={s.id}
            drag
            dragMomentum={false}
            dragElastic={0.1}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
            animate={{
              x: positions[s.id].x,
              y: positions[s.id].y,
              scale: positions[s.id].scale,
            }}
            onClick={(e) => {
              e.stopPropagation();
              toggleAudio(s.id);
              setActiveSticker(s.id);
            }}
            className="absolute select-none cursor-pointer z-30"
            style={{
              width: 64,
              height: 64,
              transformOrigin: "center",
              transformBox: "fill-box",
            }}
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
            {/* Resize Handles */}
            {isActive && (
              <div className="absolute inset-0 border border-white/30 pointer-events-none rounded-lg">
                <div className="w-2 h-2 bg-white rounded-full absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2"></div>
                <div className="w-2 h-2 bg-white rounded-full absolute top-0 right-0 translate-x-1/2 -translate-y-1/2"></div>
                <div className="w-2 h-2 bg-white rounded-full absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2"></div>
                <div className="w-2 h-2 bg-white rounded-full absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2"></div>
              </div>
            )}
          </motion.div>
        );
      })}

      {/* Logo Nav Toggle */}
      <motion.img
        onClick={() => {
          clickAudioRef.current?.play().catch(() => {});
          setMenuOpen(!menuOpen);
        }}
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
      <p className="absolute bottom-2 left-3 text-xs text-white/50 font-mono tracking-wide z-50">
        Build 01 — Public Alpha
      </p>
      <p className="absolute bottom-2 right-3 text-xs text-white/50 font-mono tracking-wide z-50 text-right">
        Powered by Fan Magic
      </p>
    </div>
  );
}
