"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Sparkles, Mail, Users, Star, X } from "lucide-react";

const drops = [
  {
    id: "becky",
    title: "Becky G: Drop 01",
    img: "/becky.jpg",
    short:
      "Becky G's 'Otro Capítulo del Mercado' celebrated her album Encuentros through a vibrant fan reunion.",
    full: `Becky G's “Otro Capítulo del Mercado,” celebrating her album “Encuentros,” was designed
as a “reunión” for fans and community, honoring Mexican culture. It translated her music's essence
into a tangible experience, fostering connection and empowerment. The event featured a curated
market, where limited-edition mercado bags, distributed upon entry, became a unifying element as
fans explored the various vendors and shopped. Through these shared experiences, alongside immersive
activities, the event mirrored her authentic artistry, creating a space for vulnerability and growth,
and inspiring a shared sense of belonging.`,
    link: "https://beckygmercado.com",
  },
];

export default function DropsPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const ambientAudioRef = useRef<HTMLAudioElement>(null);
  const navClickAudioRef = useRef<HTMLAudioElement>(null);
  const dropClickAudioRef = useRef<HTMLAudioElement>(null);
  const beckyAudioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (ambientAudioRef.current) {
      ambientAudioRef.current.volume = 0.4;
      ambientAudioRef.current.play().catch(() => {});
    }
  }, []);

  const playNavClick = () => {
    if (navClickAudioRef.current) {
      navClickAudioRef.current.currentTime = 0;
      navClickAudioRef.current.play().catch(() => {});
    }
  };

  const playDropClick = () => {
    if (dropClickAudioRef.current) {
      dropClickAudioRef.current.currentTime = 0;
      dropClickAudioRef.current.play().catch(() => {});
    }
  };

  const openDrop = (id: string) => {
    playDropClick();
    setSelectedId(id);

    if (id === "becky" && beckyAudioRef.current) {
      beckyAudioRef.current.play().catch(() => {});
    }
  };

  const closeDrop = () => {
    if (beckyAudioRef.current) {
      beckyAudioRef.current.pause();
      beckyAudioRef.current.currentTime = 0;
    }
    setSelectedId(null);
  };
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      {/* Audio */}
      <audio ref={ambientAudioRef} src="/ambient.mp3" preload="none" loop />
      <audio ref={navClickAudioRef} src="/ui-hover.mp3" preload="auto" />
      <audio ref={dropClickAudioRef} src="/team-click.mp3" preload="auto" />
      <audio ref={beckyAudioRef} src="/becky-snippet.mp3" preload="auto" />

      {/* Background */}
      <div className="absolute inset-0 z-0 animated-prism" />

      {/* Header */}
      <div className="pt-24 text-center z-20 relative px-4">
        <div className="rounded-full bg-white/10 border border-white/20 p-6 md:p-8 backdrop-blur-md shadow-[0_0_40px_rgba(213,179,255,0.4)] max-w-xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold font-cinzel text-white text-shadow-strong mb-3">
            Explore the Dropverse
          </h1>
          <p className="max-w-xl mx-auto text-white/80 text-shadow-strong text-sm md:text-base">
            Where story-driven drops live and evolve. Start your journey below.
          </p>
        </div>
      </div>

      {/* Drop Orbs */}
      <div className="relative z-20 mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6 pb-40">
        {drops.map((drop) => (
          <motion.div
            key={drop.id}
            onClick={() => openDrop(drop.id)}
            className="flex flex-col items-center text-center cursor-pointer group"
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative">
              <img
                src={drop.img}
                alt={drop.title}
                className="w-32 h-32 rounded-full object-cover border border-white/20 shadow-lg z-10"
              />
              <div className="absolute inset-0 rounded-full glow-halo z-0" />
            </div>
            <h3 className="text-lg font-semibold text-white mt-4">{drop.title}</h3>
            <p className="text-xs text-white/70 mt-2 max-w-xs">{drop.short}</p>
          </motion.div>
        ))}

        {/* Coming Soon Cards */}
        {[1, 2].map((i) => (
          <motion.div
            key={`coming-soon-${i}`}
            className="bg-white/5 border border-white/10 p-6 rounded-xl backdrop-blur-md text-center text-white/60 shadow-inner"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 + i * 0.2 }}
          >
            <h3 className="text-lg font-semibold">Coming Soon</h3>
            <p className="text-sm">New artist drops are being conjured.</p>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedId && (
          <motion.div
            key="drop-modal"
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl max-w-md w-full p-6 text-center shadow-xl relative overflow-hidden"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <button
                onClick={closeDrop}
                className="absolute top-4 right-5 text-white/60 hover:text-white"
              >
                <X size={20} />
              </button>
              <img
                src={drops.find((d) => d.id === selectedId)?.img}
                alt=""
                className="w-full h-40 object-cover rounded-xl border border-white/20 mb-4"
              />
              <h3 className="text-xl font-cinzel font-semibold mb-2">
                {drops.find((d) => d.id === selectedId)?.title}
              </h3>
              <p className="text-xs text-white/80">
                {drops.find((d) => d.id === selectedId)?.full}
              </p>
              <a
                href={drops.find((d) => d.id === selectedId)?.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block px-4 py-2 rounded-full border border-purple-400 text-sm text-white bg-purple-600 hover:bg-purple-700 transition"
              >
                View Full Drop →
              </a>

              {selectedId === "becky" && (
                <audio
                  ref={beckyAudioRef}
                  src="/becky-snippet.mp3"
                  autoPlay
                  preload="auto"
                  controls
                  className="mt-4 mx-auto w-full"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* NAV + LOGO */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-50">
        {menuOpen && (
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="px-6 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl w-[90vw] max-w-sm shadow-2xl flex flex-col items-center gap-3 relative"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-3 right-4 text-white/60 hover:text-white"
            >
              <X size={18} />
            </button>
            <h2 className="text-lg font-bold text-shadow-strong mt-3 mb-1">Navigate the Dropverse</h2>
            {[
              { label: "Home", link: "/enter", icon: <Home size={18} /> },
              { label: "Explore Drops", link: "/drops", icon: <Sparkles size={18} /> },
              { label: "Collaborate", link: "/collaborate", icon: <Mail size={18} /> },
              { label: "Meet Our Team", link: "/team", icon: <Users size={18} /> },
              { label: "Become a Fan Advisor", link: "/fan-advisor", icon: <Star size={18} /> },
            ].map((item) => (
              <button
                key={item.link}
                onClick={() => {
                  playNavClick();
                  window.location.href = item.link;
                }}
                className="w-full flex items-center gap-2 justify-start px-4 py-2 rounded-full border border-white/30 bg-white/10 text-white hover:bg-purple-600 hover:border-purple-600 transition text-sm font-semibold"
              >
                {item.icon} {item.label}
              </button>
            ))}
          </motion.div>
        )}

        <motion.img
          onClick={() => {
            playNavClick();
            setMenuOpen(!menuOpen);
          }}
          src="/logo.png"
          alt="MagicDrop Nav"
          className="h-16 w-16 rounded-full border-2 border-purple-400 bg-black/40 p-2 cursor-pointer hover:scale-110 transition-transform duration-300 shimmer"
          whileTap={{ scale: 0.95 }}
        />
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

        .glow-halo {
          pointer-events: none;
          border: 2px solid rgba(213, 179, 255, 0.6);
          border-radius: 9999px;
          box-shadow: 0 0 6px rgba(213, 179, 255, 0.4),
                      0 0 14px rgba(213, 179, 255, 0.3);
          animation: haloPulse 3s ease-in-out infinite;
        }

        @keyframes haloPulse {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
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
