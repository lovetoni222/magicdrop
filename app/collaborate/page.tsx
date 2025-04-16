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
      <audio ref={ambientAudioRef} src="/ambient.mp3" preload="none" loop />
      <audio ref={clickAudioRef} src="/team-click.mp3" preload="auto" />
      <div className="absolute inset-0 z-0 animated-prism" />

      {/* Header */}
      <div className="pt-24 text-center z-20 relative px-4">
        <div className="rounded-full bg-white/10 border border-white/20 p-6 md:p-8 backdrop-blur-md shadow-[0_0_40px_rgba(213,179,255,0.4)] max-w-xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold font-kalnia-glaze text-white text-shadow-strong mb-3">
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
                  <h3 className="text-xl font-kalnia-glaze font-semibold mb-4 text-white">Partner With MagicDrop</h3>
                  <div className="text-sm text-white/80 text-left space-y-4">
                    <p>MagicDrop exists to bring artists’ worlds to life — from <strong>co-created products</strong> to <strong>immersive experiences</strong>.</p>
                    <ul className="list-disc list-inside space-y-2">
                      <li>
                        We partner with <strong>top suppliers and leading brands</strong> across
                        <br /> <strong>beauty</strong>, <strong>lifestyle</strong>, <strong>food & beverage</strong>, and <strong>premium textiles</strong>.
                      </li>
                      <li>
                        Every drop includes <strong>a custom-built experience</strong> — which can be <strong>web</strong>, <strong>mobile</strong>, <strong>IRL</strong>, or a mix of all three — depending on the creative vision.
                        <br /><em>(Every drop is different, and we build around the artist’s world.)</em>
                      </li>
                      <li>
                        We <strong>fully fund drop production</strong>, manage <strong>creative</strong> and <strong>logistics</strong>,
                        <br /> and generate revenue through <strong>brand sponsorships</strong> and <strong>product sales</strong>.
                      </li>
                      <li>
                        Artists retain <strong>full creative control</strong> — with <strong>no upfront risk</strong>.
                      </li>
                    </ul>
                  </div>
                  <a
                    href="mailto:partnerships@getmagicdrop.com?subject=MAGICDROP BRANDS - CODE 9143BR"
                    className="mt-6 inline-block px-4 py-2 rounded-full border border-purple-400 text-sm text-white bg-purple-600 hover:bg-purple-700 transition"
                  >
                    Email Us →
                  </a>
                </>
              )}

              {selectedCard === "artist" && (
                <>
                  <div className="text-4xl mb-3">🎤</div>
                  <h3 className="text-xl font-kalnia-glaze font-semibold mb-4 text-white">Built For Artists</h3>
                  <p className="text-sm text-white/80">
                    Whether you're launching your next moment or unlocking new dimensions of fan engagement,
                    we fund, build, and manage your drop — and you retain creative control from start to finish.
                  </p>
                  <a
                    href="mailto:partnerships@getmagicdrop.com?subject=MAGICDROP ARTIST - CODE 5480AR"
                    className="mt-6 inline-block px-4 py-2 rounded-full border border-purple-400 text-sm text-white bg-purple-600 hover:bg-purple-700 transition"
                  >
                    Email Us →
                  </a>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Additional UI like Nav, Logo, etc. can follow here */}
    </div>
  );
}
