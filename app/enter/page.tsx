"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Mail, Users, Star, X } from "lucide-react";

export default function EnterPage() {
  const [menuOpen, setMenuOpen] = useState(true);
  const clickAudioRef = useRef<HTMLAudioElement>(null);
  const ambientAudioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (ambientAudioRef.current) {
      ambientAudioRef.current.volume = 0.4;
      ambientAudioRef.current.play().catch(() => {});
    }
  }, []);

  const handleClickSound = () => {
    if (clickAudioRef.current) {
      clickAudioRef.current.currentTime = 0;
      clickAudioRef.current.play().catch(() => {});
    }
  };

  const navigateTo = (url: string) => {
    handleClickSound();
    setMenuOpen(false);
    window.location.href = url;
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden text-white bg-black">
      <audio ref={ambientAudioRef} src="/ambient.mp3" preload="none" loop />
      <audio ref={clickAudioRef} src="/ui-hover.mp3" preload="none" />

      {/* Animated Background */}
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

      {/* Header */}
      <div className="relative z-20 flex flex-col items-center justify-center pt-40 md:pt-52 text-center px-4 space-y-6">
        <div className="rounded-full bg-white/10 border border-white/20 p-6 md:p-8 backdrop-blur-md shadow-[0_0_40px_rgba(213,179,255,0.4)] max-w-xl">
          <h1 className="text-3xl md:text-5xl font-bold tracking-wide [font-family:var(--font-playfair)] text-prism-glow">
            Welcome to MagicDrop
          </h1>
          <p className="mt-4 text-base md:text-xl text-white text-shadow-strong">
            Choose your path. Explore immersive drops, co-created stories, and artist-led worlds.
          </p>
        </div>
      </div>

      {/* Nav Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="relative z-30 mt-20 px-6 py-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl w-[90%] max-w-sm mx-auto shadow-2xl flex flex-col items-center gap-4"
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
                className="w-full flex items-center gap-3 justify-center px-5 py-3 rounded-full border border-white/30 bg-white/10 text-white hover:bg-purple-600 hover:border-purple-600 transition-all text-sm font-semibold"
              >
                {item.icon} {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logo Nav */}
      <motion.img
        onClick={() => {
          handleClickSound();
          setMenuOpen(!menuOpen);
        }}
        src="/logo.png"
        alt="MagicDrop Nav"
        className="fixed bottom-[8%] left-1/2 -translate-x-1/2 h-16 w-16 rounded-full border-2 border-purple-400 bg-black/40 p-2 z-20 cursor-pointer hover:scale-110 transition-transform duration-300 shimmer"
        whileTap={{ scale: 0.95 }}
      />

      {/* Styles */}
      <style jsx global>{`
        .text-shadow-strong {
          text-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
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
        .animated-prism {
          background: linear-gradient(
            135deg,
            #c084fc,
            #f472b6,
            #60a5fa,
            #fcd34d,
            #a5f3fc
          );
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
        .text-prism-glow {
          background: linear-gradient(45deg, #f9a8d4, #c084fc, #60a5fa, #fcd34d);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: glowGradient 6s ease-in-out infinite;
          text-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
        }
        @keyframes glowGradient {
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
      `}</style>
    </div>
  );
}