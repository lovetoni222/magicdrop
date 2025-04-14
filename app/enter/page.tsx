"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Sparkles, Mail, Users, Star, X } from "lucide-react";

export default function EnterPage() {
  const ambientAudioRef = useRef<HTMLAudioElement>(null);
  const clickAudioRef = useRef<HTMLAudioElement>(null);
  const [menuOpen, setMenuOpen] = useState(true); // Auto open on page load

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
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      {/* 🌌 Background Video */}
      <video
        muted
        playsInline
        autoPlay
        loop
        preload="auto"
        className="fixed top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src="/bg-enter.mp4" type="video/mp4" />
      </video>

      {/* 🎵 Audio */}
      <audio ref={ambientAudioRef} src="/ambient.mp3" preload="none" loop />
      <audio ref={clickAudioRef} src="/ui-hover.mp3" preload="none" />

      {/* 🌟 Logo Toggle (Bottom Center) */}
      <motion.img
        onClick={() => {
          handleClickSound();
          setMenuOpen(!menuOpen);
        }}
        src="/logo.png"
        alt="MagicDrop Nav"
        className="fixed bottom-6 left-1/2 -translate-x-1/2 h-20 z-50 cursor-pointer hover:scale-105 transition-transform duration-300 drop-shadow-[0_0_20px_rgba(213,179,255,0.6)]"
        whileTap={{ scale: 0.95 }}
      />

      {/* 🎮 Nav Overlay Panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-xl z-40 flex flex-col items-center justify-center px-6"
          >
            {/* Close Button */}
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition"
            >
              <X size={22} />
            </button>

            {/* Title */}
            <motion.h2
              className="text-2xl md:text-4xl font-semibold text-white mb-6 text-glow-hard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              Navigate the Dropverse
            </motion.h2>

            {/* Nav Options */}
            <div className="flex flex-col gap-4 w-full max-w-xs">
              {[
                { label: "Explore Drops", link: "/drops", icon: <Sparkles size={18} /> },
                { label: "Collaborate", link: "/collaborate", icon: <Mail size={18} /> },
                { label: "Meet Our Team", link: "/team", icon: <Users size={18} /> },
                { label: "Become a Fan Advisor", link: "/fan-advisor", icon: <Star size={18} /> },
              ].map((item) => (
                <button
                  key={`${item.label}-${item.link}`}
                  onClick={() => navigateTo(item.link)}
                  className="w-full px-6 py-3 flex items-center justify-center gap-2 rounded-full font-semibold text-white border border-white/30 bg-white/10 backdrop-blur-md hover:bg-purple-600 hover:border-purple-600 hover:text-white transition-all duration-300"
                >
                  {item.icon} {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🧭 HUD Labels */}
      <p className="absolute top-2 left-3 text-xs text-white/50 font-mono tracking-wide z-50">
        MAGICDROP UI
      </p>
      <p className="absolute bottom-2 left-3 text-xs text-white/50 font-mono tracking-wide z-50">
        Build 01 — Public Alpha
      </p>
      <p className="absolute bottom-2 right-3 text-xs text-white/50 font-mono tracking-wide z-50 text-right">
        Powered by Fan Magic
      </p>

      {/* 🌐 Global Fixes */}
      <style jsx global>{`
        video::-webkit-media-controls {
          display: none !important;
        }

        .text-glow-hard {
          text-shadow: 0 0 12px rgba(255, 255, 255, 0.9),
            0 0 28px rgba(213, 179, 255, 0.5),
            0 0 48px rgba(213, 179, 255, 0.3);
        }

        .sparkle:hover {
          text-shadow: 0 0 10px rgba(213, 179, 255, 0.8),
            0 0 20px rgba(213, 179, 255, 0.5);
        }
      `}</style>
    </div>
  );
}
