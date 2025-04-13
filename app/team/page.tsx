"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type TeamMember = {
  name: string;
  title: string;
  bio: string;
  image: string;
};

const team: TeamMember[] = [
  {
    name: "Toni",
    title: "Founder & Chief Vision Weaver",
    bio:
      "The driving force and visionary behind MagicDrop, leveraging a decade of cross-industry expertise – including experience at Instagram working directly with superstar video creators and artists, preceded by roles at successful beauty and technology startups – to reimagine fandom. Toni's focus on strategy and partnerships ensures MagicDrop stays true to its core mission while building the alliances needed for groundbreaking experiences.",
    image: "/toni.png",
  },
  {
    name: "Patrick",
    title: "Head of Artist & Brand Alchemy",
    bio:
      "With senior-level experience forging impactful partnerships at powerhouses like Capitol Records and Salxco (working with major artists including The Weeknd and Doja Cat), Patrick brings invaluable industry insight. He is the catalyst for strategic alliances, ensuring our collaborations are transformative additions to the artist's story.",
    image: "/patrick.png",
  },
  {
    name: "Oliver",
    title: "Head of Narrative Worlds & Visual Identity",
    bio:
      "Oliver brings a high-caliber creative eye honed through directing high-profile celebrity and editorial shoots. He is the architect of our visual language, ensuring every campaign and product powerfully communicates the intended narrative and resonates with the artist's unique world.",
    image: "/oliver.png",
  },
  {
    name: "Pammy",
    title: "Head of Fandom & Community Weaving",
    bio:
      "As a proven community leader (Head of Little Hiltons) and trusted advisor, Pammy brings unparalleled expertise in mobilizing fan passion. Her role is crucial for MagicDrop's authenticity, weaving the fan perspective directly into the fabric of our projects.",
    image: "/pammy.png",
  },
  {
    name: "Em",
    title: "Lead Design Alchemist",
    bio:
      "Em possesses versatile design expertise, honed through experience at labels like RCA Records creating iconic visuals for major artists such as Miley Cyrus. They magically transform narratives into the stunning visuals that define our brand across all platforms.",
    image: "/em.png",
  },
];

export default function TeamPage() {
  const [active, setActive] = useState<TeamMember | null>(null);

  return (
    <div className="relative min-h-[100dvh] w-full overflow-hidden bg-black text-white">
      {/* Background */}
      <video
        className="absolute inset-0 h-full w-full object-cover z-0"
        src="/bg-enter.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Floating Headshots */}
      <div className="relative z-10 flex flex-wrap justify-center items-center gap-6 px-4 py-20">
        {team.map((person, i) => (
          <motion.div
            key={i}
            className="relative flex flex-col items-center cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => setActive(person)}
          >
            <img
              src={person.image}
              alt={person.name}
              className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-2 border-white/30 shadow-lg hover:scale-105 transition"
            />
            <p className="mt-2 text-sm text-white text-glow-hard">{person.name}</p>
          </motion.div>
        ))}
      </div>

      {/* Bio Overlay */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="relative bg-white/10 border border-white/20 p-6 md:p-8 rounded-xl max-w-xl text-left text-white space-y-4 shadow-lg backdrop-blur-md">
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

      {/* Styles */}
      <style jsx global>{`
        .text-glow-hard {
          text-shadow: 0 0 12px rgba(255, 255, 255, 0.9),
            0 0 28px rgba(213, 179, 255, 0.5),
            0 0 48px rgba(213, 179, 255, 0.3);
        }
      `}</style>
    </div>
  );
}
