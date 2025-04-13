"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Sparkles, Mail, Users, Star, X } from "lucide-react";

const team = [
  {
    name: "Toni",
    title: "Founder & Chief Vision Weaver",
    bio: `The driving force and visionary behind MagicDrop, leveraging a decade of cross-industry expertise – including experience at Instagram working directly with superstar video creators and artists, preceded by roles at successful beauty and technology startups – to reimagine fandom. Toni's focus on strategy and partnerships ensures MagicDrop stays true to its core mission while building the alliances needed for groundbreaking experiences.`,
    image: "/toni.png",
  },
  {
    name: "Patrick",
    title: "Head of Artist & Brand Alchemy",
    bio: `With senior-level experience forging impactful partnerships at powerhouses like Capitol Records and Salxco (working with major artists including The Weeknd and Doja Cat), Patrick brings invaluable industry insight. He is the catalyst for strategic alliances, ensuring our collaborations are transformative additions to the artist's story.`,
    image: "/patrick.png",
  },
  {
    name: "Oliver",
    title: "Head of Narrative Worlds & Visual Identity",
    bio: `Oliver brings a high-caliber creative eye honed through directing high-profile celebrity and editorial shoots. He is the architect of our visual language, ensuring every campaign and product powerfully communicates the intended narrative and resonates with the artist's unique world.`,
    image: "/oliver.png",
  },
  {
    name: "Pammy",
    title: "Head of Fandom & Community Weaving",
    bio: `As a proven community leader (Head of Little Hiltons) and trusted advisor, Pammy brings unparalleled expertise in mobilizing fan passion. Her role is crucial for MagicDrop's authenticity, weaving the fan perspective directly into the fabric of our projects.`,
    image: "/pammy.png",
  },
  {
    name: "Em",
    title: "Lead Design Alchemist",
    bio: `Em possesses versatile design expertise, honed through experience at labels like RCA Records creating iconic visuals for major artists such as Miley Cyrus. They magically transform narratives into the stunning visuals that define our brand across all platforms.`,
    image: "/em.png",
  },
];

export default function TeamPage() {
  const ambientAudioRef = useRef<HTMLAudioElement>(null);
  const clickAudioRef = useRef<HTMLAudioElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<any>(null);

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
    <div className="relative min-h-[100dvh] w-full overflow-hidden bg-black text-white">
      <audio ref={ambientAudioRef} src="/ambient.mp3" preload="none" loop />
      <audio ref={clickAudioRef} src="/ui-hover.mp3" preload="none" />

      <video
        className="absolute inset-0 h-full w-full object-cover z-0"
        src="/bg-enter.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Headshots */}
      <div className="relative z-10 flex flex-wrap justify-center items-center gap-6 px-4 py-20">
        {team.map((member, i) => (
          <motion.div
            key={i}
            className="relative flex flex-col items-center cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => setActive(member)}
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-2 border-white/30 shadow-lg hover:scale-105 transition"
            />
            <p className="mt-2 text-sm text-white text-glow-hard">{member.name}</p>
          </motion.div>
        ))}
      </div>

      {/* Bio Modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="relative bg-white/10 border border-white/20 p-6 md:p-8 rounded-xl max-w-xl text-left text-white space-y-4 backdrop-blur-md">
              <button
                onClick={() => setActive(null)}
                className="absolute top-3 right-3 text-white/60 hover:text-white"
              >
                <X size={20} />
              </button>
              <h2 className="text-2xl font-bold text-white text-glow-hard">
                {active.name}
              </h2>
              <p className="text-sm font-medium text-purple-300">{active.title}</p>
              <p className="text-sm text-white/90 whitespace-pre-line leading-relaxed">
                {active.bio}
              </p>
            </div>
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

      {/* Logo Toggle Nav */}
      <motion.img
        onClick={() => {
          handleClickSound();
          setMenuOpen(!menuOpen);
        }}
        src="/logo.png"
        alt="MagicDrop Logo"
        className="fixed bottom-6 left-1/2 -translate-x-1/2 h-16 shimmer cursor-pointer z-50"
        whileTap={{ scale: 0.9 }}
      />

      {/* Toggle Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md rounded-2xl px-8 py-6 z-50 shadow-lg border border-white/20 flex flex-col gap-4 items-start min-w-[240px]"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-2 right-2 text-white/50 hover:text-white transition"
            >
              <X size={18} />
            </button>

            <button onClick={() => navigateTo("/enter")} className="flex items-center gap-2 text-white sparkle hover:text-purple-300 transition">
              <Home size={18} /> Home
            </button>
            <button onClick={() => navigateTo("/drops")} className="flex items-center gap-2 text-white sparkle hover:text-purple-300 transition">
              <Sparkles size={18} /> Explore Drops
            </button>
            <button onClick={() => navigateTo("/collaborate")} className="flex items-center gap-2 text-white sparkle hover:text-purple-300 transition">
              <Mail size={18} /> Collaborate
            </button>
            <button onClick={() => navigateTo("/team")} className="flex items-center gap-2 text-white sparkle hover:text-purple-300 transition">
              <Users size={18} /> Meet Our Team
            </button>
            <button onClick={() => navigateTo("/fan-advisor")} className="flex items-center gap-2 text-white sparkle hover:text-purple-300 transition">
              <Star size={18} /> Become a Fan Advisor
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .text-glow-hard {
          text-shadow: 0 0 12px rgba(255, 255, 255, 0.9),
            0 0 28px rgba(213, 179, 255, 0.5),
            0 0 48px rgba(213, 179, 255, 0.3);
        }
        .shimmer {
          animation: shimmerAnim 4s infinite ease-in-out;
        }
        @keyframes shimmerAnim {
          0% {
            filter: brightness(1)
              drop-shadow(0 0 6px rgba(213, 179, 255, 0.3));
          }
          50% {
            filter: brightness(1.3)
              drop-shadow(0 0 20px rgba(213, 179, 255, 0.6));
          }
          100% {
            filter: brightness(1)
              drop-shadow(0 0 6px rgba(213, 179, 255, 0.3));
          }
        }
      `}</style>
    </div>
  );
}
