"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Mail, Users, Star, X } from "lucide-react";

const team = [
  {
    id: "toni",
    name: "Toni Dippolito",
    title: "Founder & Chief Vision Weaver",
    description:
      "Toni blends a decade of cross-industry experience across tech and CPG startups with a background in creator strategy at Instagram, where she worked alongside top video creators and artists. As MagicDrop’s visionary founder, she leads brand direction, strategy, and partnerships — crafting a world where fans, artists, and storytelling collide in ways that feel intimate, immersive, and unforgettable.",
    img: "/toni.png",
  },
  {
    id: "patrick",
    name: "Patrick Stephens",
    title: "Head of Artist & Brand Alchemy",
    description:
      "A true architect of iconic collaborations, Patrick brings senior-level experience from Capitol Records and Salxco, where he supported global artists like The Weeknd and Doja Cat. At MagicDrop, he shapes transformative artist and brand partnerships — ensuring every drop adds depth to the narrative and becomes a living, breathing part of the fandom.",
    img: "/patrick.png",
  },
  {
    id: "oliver",
    name: "Oliver Sussman",
    title: "Head of Narrative Worlds & Visual Identity",
    description:
      "Oliver’s creative eye was shaped by his work in creative production at VFILES, where he contributed to projects across fashion, music, and editorial. He’s worked with high-profile celebrities and editorial properties on creative direction that’s bold, expressive, and highly visual. At MagicDrop, he transforms each drop into a story-driven world — immersive, cinematic, and collectable.",
    img: "/oliver.png",
  },
  {
    id: "pammy",
    name: "Pammy Hilton",
    title: "Head of Fandom & Community Weaving",
    description:
      "A notable leader in the fan community and trusted advisor to Paris Hilton’s brand and fandom, Pammy channels a deep understanding of fan culture into everything MagicDrop creates. She ensures the fan perspective remains sacred, weaving authentic community touchpoints throughout every project and turning fans into collaborators.",
    img: "/pammy.png",
  },
  {
    id: "em",
    name: "Em Argio",
    title: "Lead Design Alchemist",
    description:
      "With a background designing for RCA Records and shaping visuals for stars like Miley Cyrus, Em brings a multi-sensory approach to MagicDrop’s creative output. They translate emotion and narrative into stunning visual systems — turning each drop into a design-forward expression of fandom, magic, and identity.",
    img: "/em.png",
  },
  {
    id: "mystery",
    name: "You?",
    title: "Future MagicDrop Collaborator",
    description:
      "MagicDrop is growing, and we’re always looking for curious, passionate minds who believe in the power of fandom and storytelling. If you’re a designer, developer, strategist, or vibe curator who feels called to build with us, we’d love to hear from you.",
    img: undefined,
  },
];

export default function TeamPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const teamClickAudioRef = useRef<HTMLAudioElement>(null);
  const navClickAudioRef = useRef<HTMLAudioElement>(null);
  const ambientAudioRef = useRef<HTMLAudioElement>(null);
  const sparkleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ambientAudioRef.current) {
      ambientAudioRef.current.volume = 0.4;
      ambientAudioRef.current.play().catch(() => {});
    }
  }, []);

  const playTeamClick = () => {
    if (teamClickAudioRef.current) {
      teamClickAudioRef.current.currentTime = 0;
      teamClickAudioRef.current.play().catch(() => {});
    }
  };

  const playNavClick = () => {
    if (navClickAudioRef.current) {
      navClickAudioRef.current.currentTime = 0;
      navClickAudioRef.current.play().catch(() => {});
    }
  };

  const triggerSparkle = () => {
    if (sparkleRef.current) {
      sparkleRef.current.classList.remove("fade");
      void sparkleRef.current.offsetWidth;
      sparkleRef.current.classList.add("fade");
    }
  };

  const openProfile = (id: string) => {
    playTeamClick();
    setSelectedId(id);
    triggerSparkle();
  };
  return (
    <div className="relative min-h-screen w-full overflow-hidden text-white font-inter bg-black">
      <audio ref={ambientAudioRef} src="/ambient.mp3" preload="none" loop />
      <audio ref={teamClickAudioRef} src="/team-click.mp3" preload="auto" />
      <audio ref={navClickAudioRef} src="/ui-hover.mp3" preload="auto" />
      <div className="absolute inset-0 z-0 animated-prism" />

      {/* Header */}
      <div className="pt-24 text-center z-20 relative px-4">
        <div className="rounded-full bg-white/10 border border-white/20 p-6 md:p-8 backdrop-blur-md shadow-[0_0_40px_rgba(213,179,255,0.4)] max-w-xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold font-cinzel text-white text-shadow-strong mb-3">
            Meet the Team
          </h1>
          <p className="max-w-xl mx-auto text-white/80 text-shadow-strong text-sm md:text-base">
            The creators, builders, and believers behind the Dropverse.
          </p>
        </div>
      </div>

      {/* Orbs */}
      <div className="relative z-20 mt-12 grid grid-cols-2 sm:grid-cols-3 gap-6 px-6 pb-48">
        {team.map((member) => (
          <motion.div
            key={member.id}
            className="flex flex-col items-center cursor-pointer group"
            whileHover={{ scale: 1.08 }}
            onClick={() => openProfile(member.id)}
          >
            <div className="relative flex items-center justify-center">
              {member.img ? (
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-24 h-24 rounded-full border border-white/20 shadow-lg object-cover z-10"
                />
              ) : (
                <div className="w-24 h-24 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-3xl font-bold text-purple-200 z-10">
                  💠
                </div>
              )}
              <div className="absolute inset-0 rounded-full glow-halo z-0" />
            </div>
            <p className="text-sm text-white mt-2 font-semibold">{member.name.split(" ")[0]}</p>
          </motion.div>
        ))}
      </div>

      {/* Bio Modal */}
      <AnimatePresence>
        {selectedId && (
          <motion.div
            key="modal"
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
                onClick={() => setSelectedId(null)}
                className="absolute top-4 right-5 text-white/60 hover:text-white"
              >
                <X size={20} />
              </button>

              {team.find((m) => m.id === selectedId)?.img ? (
                <img
                  src={team.find((m) => m.id === selectedId)?.img}
                  alt=""
                  className="w-24 h-24 rounded-full border border-white/20 mx-auto mb-4 object-cover"
                />
              ) : (
                <div className="w-24 h-24 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-3xl font-bold text-purple-200 mx-auto mb-4">
                  💠
                </div>
              )}

              <h3 className="text-xl font-cinzel font-semibold">
                {team.find((m) => m.id === selectedId)?.name}
              </h3>
              <p className="text-sm text-purple-300 font-medium mt-1">
                {team.find((m) => m.id === selectedId)?.title}
              </p>
              <p className="text-xs text-white/80 mt-3">
                {team.find((m) => m.id === selectedId)?.description}
              </p>

              {selectedId === "mystery" && (
                <a
                  href="mailto:concierge@getmagicdrop.com"
                  className="mt-4 inline-block px-4 py-2 rounded-full border border-purple-400 text-sm text-white bg-purple-600 hover:bg-purple-700 transition"
                >
                  Apply via Email
                </a>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* NAV + LOGO TOGGLE */}
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
              { label: "Explore Drops", link: "/drops", icon: <Sparkles size={18} /> },
              { label: "Collaborate", link: "/collaborate", icon: <Mail size={18} /> },
              { label: "Home", link: "/enter", icon: <Users size={18} /> },
              { label: "Become a Fan Advisor", link: "/fan-advisor", icon: <Star size={18} /> },
            ].map((item) => (
              <button
                key={item.link}
                onClick={() => {
                  playNavClick();
                  window.location.href = item.link;
                }}
                className="w-full flex items-center gap-3 justify-center px-5 py-2 rounded-full border border-white/30 bg-white/10 text-white hover:bg-purple-600 hover:border-purple-600 transition text-sm font-semibold"
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
        .glow-halo {
          pointer-events: none;
          border: 2px solid rgba(213, 179, 255, 0.6);
          border-radius: 9999px;
          box-shadow:
            0 0 6px rgba(213, 179, 255, 0.4),
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

        .shimmer {
          animation: shimmerPulse 4s ease-in-out infinite;
        }

        @keyframes shimmerPulse {
          0% { filter: brightness(1) drop-shadow(0 0 6px rgba(213, 179, 255, 0.3)); }
          50% { filter: brightness(1.3) drop-shadow(0 0 20px rgba(213, 179, 255, 0.6)); }
          100% { filter: brightness(1) drop-shadow(0 0 6px rgba(213, 179, 255, 0.3)); }
        }

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
      `}</style>
    </div>
  );
}
