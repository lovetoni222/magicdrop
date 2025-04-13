"use client";
import { motion } from "framer-motion";

export default function DropsPage() {
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

      {/* Content */}
      <div className="relative z-10 px-4 py-12 flex flex-col items-center">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-white text-glow-hard mb-10 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Explore the Dropverse
        </motion.h1>

        <div className="grid gap-6 md:grid-cols-2 max-w-5xl w-full">
          {/* Becky G Drop */}
          <div className="bg-white/10 border border-white/20 rounded-xl p-6 backdrop-blur-md shadow-md">
            <img
              src="/becky.jpg"
              alt="Becky G Mercado"
              className="w-full h-48 object-cover rounded-lg mb-4 border border-white/20"
            />
            <h2 className="text-xl font-bold mb-2">Becky G: Drop 01</h2>
            <p className="text-sm text-white/90 mb-4">
              Becky G’s <em>"Otro Capítulo del Mercado"</em> celebrated her album <em>Encuentros</em> through a vibrant fan reunion. Inspired by Mexican culture, this immersive experience featured a curated market and limited-edition mercado bags — given upon entry — that unified fans as they explored, shopped, and connected. The event transformed Becky’s music into tangible moments of vulnerability, empowerment, and shared belonging.
            </p>
            <a
              href="https://beckygmercado.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-purple-300 hover:text-purple-500 transition"
            >
              View Drop →
            </a>
          </div>

          {/* Placeholder Drops */}
          {[1, 2].map((i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-md text-white/40 text-center shadow-inner"
            >
              <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
              <p className="text-sm">
                New artist drops are being conjured.
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* HUD Text */}
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
