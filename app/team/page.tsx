"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Sparkles, Mail, Users, Star, X } from "lucide-react";

const team = [
  {
    name: "Toni Dippolito",
    title: "Founder & Chief Vision Weaver",
    image: "/toni.png",
    bio: `The driving force and visionary behind MagicDrop, leveraging a decade of cross-industry expertise – including experience at Instagram working directly with superstar video creators and artists, preceded by roles at successful beauty and technology startups – to reimagine fandom. Toni's focus on strategy and partnerships ensures MagicDrop stays true to its core mission while building the alliances needed for groundbreaking experiences.`,
  },
  {
    name: "Patrick Stephens",
    title: "Head of Artist & Brand Alchemy",
    image: "/patrick.png",
    bio: `With senior-level experience forging impactful partnerships at powerhouses like Capitol Records and Salxco (working with major artists including The Weeknd and Doja Cat), Patrick brings invaluable industry insight. He is the catalyst for strategic alliances, ensuring our collaborations are transformative additions to the artist's story.`,
  },
  {
    name: "Oliver Sussman",
    title: "Head of Narrative Worlds & Visual Identity",
    image: "/oliver.png",
    bio: `Oliver brings a high-caliber creative eye honed through directing high-profile celebrity and editorial shoots. He is the architect of our visual language, ensuring every campaign and product powerfully communicates the intended narrative and resonates with the artist's unique world.`,
  },
  {
    name: "Pammy Hilton",
    title: "Head of Fandom & Community Weaving",
    image: "/pammy.png",
    bio: `As a proven community leader (Head of Little Hiltons) and trusted advisor, Pammy brings unparalleled expertise in mobilizing fan passion. Her role is crucial for MagicDrop's authenticity, weaving the fan perspective directly into the fabric of our projects.`,
  },
  {
    name: "Em Argio",
    title: "Lead Design Alchemist",
    image: "/em.png",
    bio: `Em possesses versatile design expertise, honed through experience at labels like RCA Records creating iconic visuals for major artists such as Miley Cyrus. They magically transform narratives into the stunning visuals that define our brand across all platforms.`,
  },
];

export default function TeamPage() {
  const ambientAudioRef = useRef<HTMLAudioElement>(null);
  const clickAudioRef = useRef<HTMLAudioElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);

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
    <div className="relative h-screen w-full overflow-hidden bg-black text-white">
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

      {/* 👥 Floating Orbs */}
      <div className="absolute inset-0 z-20 pointer-events-none hidden md:block">
        {team.map((member, index) => (
          <div
            key={member.name}
            className="absolute pointer-events-auto text-center z-30"
            style={{
              top: `${20 + index * 10}%`,
              left: `${10 + (index % 3) * 25}%`,
            }}
          >
            <motion.img
              src={member.image}
              alt={member.name}
              onClick={() => {
                handleClickSound();
                setSelectedMember(member);
              }}
              className="h-32 w-32 object-cover rounded-full border-2 border-white shadow-md hover:shadow-xl hover:scale-105 transition duration-300 cursor-pointer"
              animate={{ y: [0, -5, 0], x: [0, 3, 0] }}
              transition={{
                repeat: Infinity,
                duration: 6 + index,
                ease: "easeInOut",
              }}
            />
            <p className="mt-2 text-sm text-white/90 font-semibold drop-shadow-sm">
              {member.name.split(" ")[0]}
            </p>
          </div>
        ))}
      </div>

      {/* 📖 Bio Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="bg-white/10 p-6 rounded-xl border border-white/30 max-w-xl text-left relative backdrop-blur-md">
              <button
                onClick={() => setSelectedMember(null)}
                className="text-sm text-white/70 hover:text-white absolute top-4 right-4"
              >
                <X size={20} />
              </button>
              <h2 className="text-xl font-bold text-white mb-1">
                {selectedMember.name}
              </h2>
              <p className="text-purple-300 font-medium mb-4">
                {selectedMember.title}
              </p>
              <p className="text-sm text-white/80 leading-relaxed whitespace-pre-line">
                {selectedMember.bio}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🧭 HUD Corner Branding */}
      <p className="absolute top-2 left-3 text-xs text-white/50 font-mono tracking-wide z-50">
        MAGICDROP UI
      </p>
      <p className="absolute bottom-2 left-3 text-xs text-white/50 font-mono tracking-wide z-50">
        Build 01 — Public Alpha
      </p>
      <p className="absolute bottom-2 right-3 text-xs text-white/50 font-mono tracking-wide z-50 text-right">
        Powered by Fan Magic
      </p>

      {/* 💎 Logo Toggle Nav */}
      <motion.img
        onClick={() => {
          handleClickSound();
          setMenuOpen(!menuOpen);
        }}
        src="/logo.png"
        alt="MagicDrop Logo"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 h-16 shimmer cursor-pointer z-50"
        whileTap={{ scale: 0.9 }}
      />

      {/* 🎮 Toggle Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md rounded-2xl px-8 py-6 z-50 shadow-lg border border-white/20 flex flex-col gap-4 items-start min-w-[240px]"
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
        .sparkle:hover {
          text-shadow: 0 0 10px rgba(213, 179, 255, 0.8),
            0 0 20px rgba(213, 179, 255, 0.5);
        }
      `}</style>
    </div>
  );
}
