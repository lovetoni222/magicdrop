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

export default function EnterPage() {
  const [menuOpen, setMenuOpen] = useState(true);
  const [playing, setPlaying] = useState<string | null>(null);
  const audioRefs = useRef<Record<string, HTMLAudioElement | null>>({});
  const boardRef = useRef<HTMLDivElement>(null);
  const clickAudioRef = useRef<HTMLAudioElement>(null);

  const [positions, setPositions] = useState(
    () =>
      stickers.reduce((acc, s, i) => {
        acc[s.id] = {
          x: Math.floor(Math.random() * 180) + 30,
          y: Math.floor(Math.random() * 100) + 40,
          scale: 1,
        };
        return acc;
      }, {} as Record<string, { x: number; y: number; scale: number }>)
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

  const handleDragEnd = (id: string, _, info: { point: { x: number; y: number } }) => {
    const bounds = boardRef.current?.getBoundingClientRect();
    if (!bounds) return;
    const x = Math.min(bounds.width - 80, Math.max(0, info.point.x - bounds.left - 32));
    const y = Math.min(bounds.height - 80, Math.max(0, info.point.y - bounds.top - 32));
    setPositions((prev) => ({ ...prev, [id]: { ...prev[id], x, y } }));
  };

  const navigateTo = (url: string) => {
    clickAudioRef.current?.play().catch(() => {});
    setMenuOpen(false);
    window.location.href = url;
  };

  const handleWheel = (id: string, event: WheelEvent) => {
    setPositions((prev) => {
      const newScale = Math.max(0.6, Math.min(2, prev[id].scale + event.deltaY * -0.001));
      return { ...prev, [id]: { ...prev[id], scale: newScale } };
    });
  };

  useEffect(() => {
    const handle = (e: WheelEvent) => {
      const el = e.target as HTMLElement;
      const match = el?.closest("[data-id]");
      if (match) {
        const id = match.getAttribute("data-id");
        if (id) handleWheel(id, e);
      }
    };
    document.addEventListener("wheel", handle, { passive: false });
    return () => document.removeEventListener("wheel", handle);
  }, []);
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white font-inter">
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
          Arrange your personal fan chart. Tap to play trending sounds. Scroll to resize. Drag to rank.
        </p>
      </div>

      {/* Sticker Canvas */}
      <div
        ref={boardRef}
        className="relative z-10 mx-auto mt-12 mb-36 w-full max-w-lg h-[340px] border border-white/10 rounded-3xl backdrop-blur-sm bg-white/5 overflow-hidden"
      >
        {stickers.map((s) => (
          <motion.div
            key={s.id}
            data-id={s.id}
            drag
            dragConstraints={boardRef}
            dragElastic={0.1}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
            animate={{
              x: positions[s.id].x,
              y: positions[s.id].y,
              scale: positions[s.id].scale,
            }}
            onDragEnd={(e, info) => handleDragEnd(s.id, e, info)}
            onClick={() => toggleAudio(s.id)}
            className="absolute select-none cursor-pointer hover:scale-105 transition"
            style={{
              width: 64,
              height: 64,
              zIndex: 30,
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
          </motion.div>
        ))}
      </div>

      {/* Nav Toggle */}
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
                onClick={() => navigateTo(item.link)}
                className="w-full text-white text-sm font-semibold px-4 py-2 rounded-full border border-white/30 bg-white/10 hover:bg-purple-600 hover:border-purple-600 hover:text-white transition"
              >
                {item.icon} {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

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

      <style jsx global>{`
        .animated-prism {
          background: linear-gradient(135deg, #c084fc, #f472b6, #60a5fa, #fcd34d, #a5f3fc);
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

        .text-glow {
          text-shadow: 0 0 8px rgba(255, 255, 255, 0.7),
            0 0 14px rgba(213, 179, 255, 0.4);
        }

        .text-shadow-strong {
          text-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
        }
      `}</style>
    </div>
  );
}
