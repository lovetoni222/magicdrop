"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Sparkles, Mail, Users, Star, X } from "lucide-react";

export default function CollaboratePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const ambientAudioRef = useRef<HTMLAudioElement>(null);
  const clickAudioRef = useRef<HTMLAudioElement>(null);
  const sparkleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ambientAudioRef.current) {
      ambientAudioRef.current.volume = 0.4;
      ambientAudioRef.current.play().catch(() => {});
    }
  }, []);

  const playClick = () => {
    if (clickAudioRef.current) {
      clickAudioRef.current.currentTime = 0;
      clickAudioRef.current.play().catch(() => {});
    }
  };

  const openModal = (id: string) => {
    playClick();
    setSelectedCard(id);
    if (sparkleRef.current) {
      sparkleRef.current.classList.remove("fade");
      void sparkleRef.current.offsetWidth;
      sparkleRef.current.classList.add("fade");
    }
  };

  const navigateTo = (url: string) => {
    playClick();
    setMenuOpen(false);
    window.location.href = url;
  };
  return (
    <div className="relative min-h-screen w-full overflow-hidden text-white font-inter bg-black">
      {/* Audio */}
      <audio ref={ambientAudioRef} src="/ambient.mp3" preload="none" loop />
      <audio ref={clickAudioRef} src="/team-click.mp3" preload="auto" />
      <div className="absolute inset-0 z-0 animated-prism" />

      {/* Header */}
      <div className="pt-24 text-center z-20 relative px-4">
        <div className="rounded-full bg-white/10 border border-white/20 p-6 md:p-8 backdrop-blur-md shadow-[0_0_40px_rgba(213,179,255,0.4)] max-w-xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold font-cinzel text-white text-shadow-strong mb-3">
            Collaborate with Us
          </h1>
          <p className="max-w-xl mx-auto text-white/80 text-shadow-strong text-sm md:text-base">
            Whether you're an artist or a brand, MagicDrop is your gateway to story-driven commerce.
          </p>
        </div>
      </div>

      {/* Orbs */}
      <div className="relative z-20 mt-12 grid grid-cols-2 sm:grid-cols-2 gap-6 px-6 pb-40">
        {/* Brand Orb */}
        <motion.div
          className="flex flex-col items-center cursor-pointer group"
          onClick={() => openModal("brand")}
          whileHover={{ scale: 1.08 }}
        >
          <div className="relative flex items-center justify-center">
            <div className="w-24 h-24 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-3xl font-bold text-purple-200 z-10">
              💼
            </div>
            <div className="absolute inset-0 rounded-full glow-halo z-0" />
          </div>
          <p className="text-sm text-white mt-2 font-semibold">Brand Partners</p>
        </motion.div>

        {/* Artist Orb */}
        <motion.div
          className="flex flex-col items-center cursor-pointer group"
          onClick={() => openModal("artist")}
          whileHover={{ scale: 1.08 }}
        >
          <div className="relative flex items-center justify-center">
            <div className="w-24 h-24 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-3xl font-bold text-purple-200 z-10">
              🎤
            </div>
            <div className="absolute inset-0 rounded-full glow-halo z-0" />
          </div>
          <p className="text-sm text-white mt-2 font-semibold">Artist Partners</p>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedCard && (
          <motion.div
            key="collab-modal"
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
              <div ref={sparkleRef} className="sparkle-overlay pointer-events-none" />
              <button
                onClick={() => setSelectedCard(null)}
                className="absolute top-4 right-5 text-white/60 hover:text-white"
              >
                <X size={20} />
              </button>

              {selectedCard === "brand" && (
                <>
                  <div className="text-4xl mb-3">💼</div>
                  <h3 className="text-xl font-cinzel font-semibold mb-2">Partner With MagicDrop</h3>
                  <p className="text-sm text-white/80">
                    We embed your product, service, or story inside immersive artist drops. Our
                    brand collabs include physical events, co-branded merch, digital content, and
                    narrative-driven app integrations. We focus on authentic matchmaking between high-value artists
                    and partner brands for unforgettable experiences and hyper-targeted delivery.
                  </p>
                  <a
                    href="mailto:partnerships@getmagicdrop.com?subject=MAGICDROP BRANDS - CODE 9143BR"
                    className="mt-4 inline-block px-4 py-2 rounded-full border border-purple-400 text-sm text-white bg-purple-600 hover:bg-purple-700 transition"
                  >
                    Email Us →
                  </a>
                </>
              )}

              {selectedCard === "artist" && (
                <>
                  <div className="text-4xl mb-3">🎤</div>
                  <h3 className="text-xl font-cinzel font-semibold mb-2">Built For Artists</h3>
                  <p className="text-sm text-white/80">
                    MagicDrop exists to bring your world to life — from co-created products to immersive events.
                    We partner with the same manufacturers as Boy Smells, Vacation Inc, Sephora, Pink Friday Nails, Brooklinen, Olipop and other notable brands as well as small vendors hand selected by artists.
                    Every drop includes a custom-built web and mobile experience.
                    We fully fund drop production, manage creative and logistics, and generate revenue from brand sponsorship and product sales.
                    You retain full creative control — with no upfront risk.
                  </p>
                  <a
                    href="mailto:partnerships@getmagicdrop.com?subject=MAGICDROP ARTIST - CODE 5480AR"
                    className="mt-4 inline-block px-4 py-2 rounded-full border border-purple-400 text-sm text-white bg-purple-600 hover:bg-purple-700 transition"
                  >
                    Email Us →
                  </a>
                </>
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
                onClick={() => navigateTo(item.link)}
                className="w-full flex items-center gap-2 justify-start px-4 py-2 rounded-full border border-white/30 bg-white/10 text-white hover:bg-purple-600 hover:border-purple-600 transition text-sm font-semibold"
              >
                {item.icon} {item.label}
              </button>
            ))}
          </motion.div>
        )}

        <motion.img
          onClick={() => {
            playClick();
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

        .sparkle-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: url('/sparkle.gif') center/contain no-repeat;
          opacity: 0;
        }

        .sparkle-overlay.fade {
          opacity: 1;
          animation: sparkleFade 1s ease-out forwards;
        }

        @keyframes sparkleFade {
          0% { opacity: 1; }
          100% { opacity: 0; }
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

        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700&family=Inter:wght@400;600&display=swap');
        .font-cinzel { font-family: 'Cinzel', serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
      `}</style>
    </div>
  );
}
