// File: /src/app/enter/page.tsx

"use client";

import { useState, useEffect } from "react"; import { motion } from "framer-motion"; import { Sparkles, RotateCcw, Maximize, Menu } from "lucide-react"; import Image from "next/image"; import Link from "next/link"; import "../../styles/globals.css";

const STICKERS = [ { genre: "Pop", src: "/icons/pop.png" }, { genre: "Hip-Hop", src: "/icons/hip-hop.png" }, { genre: "Electronic", src: "/icons/electronic.png" }, ];

export default function EnterPage() { const [showMenu, setShowMenu] = useState(false); const [loaded, setLoaded] = useState(false);

useEffect(() => { const timer = setTimeout(() => setLoaded(true), 500); return () => clearTimeout(timer); }, []);

return ( <main className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-black via-purple-900 to-pink-800 text-white"> {/* Hero Section */} <section className="absolute top-10 left-1/2 -translate-x-1/2 text-center z-20"> <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="text-4xl font-serif text-white shimmer"> Welcome to MagicDrop </motion.h1> <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }} className="mt-4 text-lg font-inter text-white"> Remix your reality. Drop into the vibe. </motion.p> <motion.button whileHover={{ scale: 1.05 }} className="mt-6 px-6 py-2 bg-white/10 border border-white/20 rounded-full backdrop-blur-sm text-sm hover:bg-white/20"> Start Remixing </motion.button> </section>

{/* Floating Menu Button */}
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.5 }}
    className="absolute bottom-6 right-6 z-30">
    <button
      onClick={() => setShowMenu(!showMenu)}
      className="p-4 bg-white/10 border border-white/10 rounded-full backdrop-blur-md shadow-xl hover:scale-105 transition-all">
      <Sparkles className="w-6 h-6 text-white" />
    </button>
    {showMenu && (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="absolute bottom-16 right-0 w-48 p-4 bg-black/80 rounded-xl shadow-lg space-y-2">
        <Link href="/drops" className="block text-sm hover:underline">
          Explore Drops
        </Link>
        <Link href="/collaborate" className="block text-sm hover:underline">
          Collaborate
        </Link>
        <Link href="/team" className="block text-sm hover:underline">
          Meet Our Team
        </Link>
      </motion.div>
    )}
  </motion.div>

  {/* Sticker Canvas */}
  <div className="absolute inset-0 z-10">
    {STICKERS.map((sticker, index) => (
      <motion.div
        key={sticker.genre}
        initial={{ opacity: 0, scale: 0.8, x: -20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ delay: 0.2 * index }}
        className="absolute cursor-move hover:scale-105 transition-transform"
        style={{ top: `${20 + index * 120}px`, left: `${100 + index * 150}px` }}>
        <div className="relative group">
          <Image
            src={sticker.src}
            alt={sticker.genre}
            width={80}
            height={80}
            className="rounded-lg shadow-lg"
          />
          <div className="absolute -top-3 -right-3 hidden group-hover:flex gap-1">
            <button className="p-1 bg-white/10 rounded-full">
              <RotateCcw className="w-4 h-4 text-white" />
            </button>
            <button className="p-1 bg-white/10 rounded-full">
              <Maximize className="w-4 h-4 text-white" />
            </button>
          </div>
          <div className="absolute top-full mt-1 text-xs text-white text-center w-full">
            {sticker.genre}
          </div>
        </div>
      </motion.div>
    ))}
  </div>

  {/* Particle Layer (visual only) */}
  <div className="absolute inset-0 z-0 pointer-events-none bg-[url('/sparkle.gif')] bg-cover opacity-20 animate-pulse" />
</main>

); }

