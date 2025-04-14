"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Mail, Users, Star, X } from "lucide-react";

const team = [
  {
    name: "Toni Dippolito",
    title: "Founder & Chief Vision Weaver",
    description:
      "The visionary behind MagicDrop, blending strategic partnerships and creative leadership. Previously at Instagram, tech and beauty startups.",
    img: "/team/toni.jpg",
  },
  {
    name: "Patrick Stephens",
    title: "Head of Artist & Brand Alchemy",
    description:
      "Forging legendary partnerships (Capitol, Salxco). Ensures collaborations enhance artist narrative.",
    img: "/team/patrick.jpg",
  },
  {
    name: "Oliver Sussman",
    title: "Head of Narrative Worlds & Visual Identity",
    description:
      "Visual architect behind the Dropverse. Directs campaigns and creative that embody artist stories.",
    img: "/team/oliver.jpg",
  },
  {
    name: "Pammy Hilton",
    title: "Head of Fandom & Community Weaving",
    description:
      "Fan-first strategist, formerly Head of Little Hiltons. Builds authentic bridges between artists and fans.",
    img: "/team/pammy.jpg",
  },
  {
    name: "Em Argio",
    title: "Lead Design Alchemist",
    description:
      "Multi-disciplinary visual artist crafting the look and feel of every drop. RCA Records alum. Designed for Miley.",
    img: "/team/em.jpg",
  },
];

export default function TeamPage() {
  const [menuOpen, setMenuOpen] = useState(false);
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
    <div className="relative min-h-screen w-full overflow-hidden text-white bg-black font-inter">
      <audio ref={ambientAudioRef} src="/ambient.mp3" preload="none" loop />
      <audio ref={clickAudioRef} src="/ui-hover.mp3" preload="none" />

      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0 animated-prism" />

      {/* HEADER */}
      <div className="pt-24 text-center z-20 relative px-4">
        <h1 className="text-4xl md:text-5xl font-bold font-cinzel tracking-wide text-white text-shadow-strong mb-4">
          Meet the Team
        </h1>
        <p className="max-w-xl mx-auto text-white/80 text-shadow-strong text-sm md:text-base">
          The creators, builders, and believers behind the Dropverse.
        </p>
      </div>

      {/* TEAM ORBS */}
      <div className="relative z-20 mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 pb-32">
        {team.map((member, i) => (
          <motion.div
            key={member.name}
            className="flex flex-col items-center text-center rounded-3xl bg-white/10 border border-white/20 p-4 backdrop-blur-md shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <img
              src={member.img}
              alt={member.name}
              className="w-24 h-24 rounded-full object-cover mb-4 border border-white/20 shadow-lg"
            />
            <h3 className="text-lg font-semibold font-cinzel">{member.name}</h3>
            <p className="text-sm text-purple-300 font-medium">{member.title}</p>
            <p className="text-xs text-white/80 mt-2 max-w-xs">{member.description}</p>
          </motion.div>
        ))}
      </div>

      {/* NAV HUD (NAV + LOGO TOGGLE) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-50">
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="px-6 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl w-[90vw] max-w-sm shadow-2xl flex flex-col items-center gap-3"
            >
              <button
                onClick={() => setMenuOpen(false)}
                className="absolute top-3 right-4 text-white/60 hover:text-white"
              >
                <X size={18} />
              </button>
              <h2 className="text-lg font-bold text-shadow-strong mt-3 mb-1">
                Navigate the Dropverse
              </h2>
              {[
                { label: "Explore Drops", link: "/drops", icon: <Sparkles size={18} /> },
                { label: "Collaborate", link: "/collaborate", icon: <Mail size={18} /> },
                { label: "Enter", link: "/enter", icon: <Users size={18} /> },
                { label: "Become a Fan Advisor", link: "/fan-advisor", icon: <Star size={18} /> },
              ].map((item) => (
                <button
                  key={item.link}
                  onClick={() => navigateTo(item.link)}
                  className="w-full flex items-center gap-3 justify-center px-5 py-2 rounded-full border border-white/30 bg-white/10 text-white hover:bg-purple-600 hover:border-purple-600 transition text-sm font-semibold"
                >
                  {item.icon} {item.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* LOGO TOGGLE */}
        <motion.img
          onClick={() => {
            handleClickSound();
            setMenuOpen(!menuOpen);
          }}
          src="/logo.png"
          alt="MagicDrop Nav"
          className="h-16 w-16 rounded-full border-2 border-purple-400 bg-black/40 p-2 cursor-pointer hover:scale-110 transition-transform duration-300 shimmer"
          whileTap={{ scale: 0.95 }}
        />
      </div>

      {/* GLOBAL STYLES */}
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
      `}</style>
    </div>
  );
}
