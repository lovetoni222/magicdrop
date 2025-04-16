"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Sparkles, Mail, Users, Star, X as LucideX } from "lucide-react";

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

  const closeModal = () => {
    playClick();
    setSelectedCard(null);
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

      {/* Corner Branding */}
      <p className="absolute top-2 left-3 text-xs text-white/50 font-mono tracking-wide z-50">MAGICDROP UI</p>
      <p className="absolute bottom-2 left-3 text-xs text-white/50 font-mono tracking-wide z-50">Build 01 — Public Alpha</p>
      <p className="absolute bottom-2 right-3 text-xs text-white/50 font-mono tracking-wide z-50 text-right">Powered by Fan Magic</p>

      {/* Header */}
      <div className="pt-24 text-center z-20 relative px-4">
        <div className="rounded-full bg-white/10 border border-white/20 p-6 md:p-8 backdrop-blur-md shadow-[0_0_40px_rgba(213,179,255,0.4)] max-w-xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold font-kalnia-glaze text-white text-shadow-strong mb-3">
            Collaborate with Us
          </h1>
          <p className="max-w-xl mx-auto text-white text-shadow-strong text-sm md:text-base mt-2">
            Whether you're an artist or a brand, MagicDrop is your gateway to story-driven commerce.
          </p>
        </div>
      </div>

      {/* Visual Module */}
      <div className="mt-12 mb-6 px-4 text-center z-30">
        <p className="text-white text-lg md:text-xl font-semibold tracking-wide text-glow-white">
          Trusted by artists. Backed by magic.
        </p>
      </div>

      {/* Orbs */}
      <div className="relative z-20 mt-6 grid grid-cols-2 sm:grid-cols-2 gap-6 px-6 pb-40">
        {[
          { id: "brand", icon: "💼", label: "Brand Partners" },
          { id: "artist", icon: "🎤", label: "Artist Partners" },
        ].map(({ id, icon, label }) => (
          <motion.div
            key={id}
            className="flex flex-col items-center cursor-pointer group"
            onClick={() => openModal(id)}
            whileHover={{ scale: 1.08 }}
          >
            <div className="relative flex items-center justify-center">
              <div className="w-24 h-24 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-3xl font-bold text-purple-200 z-10">
                {icon}
              </div>
              <div className="absolute inset-0 rounded-full glow-halo z-0" />
            </div>
            <p className="text-sm text-white mt-2 font-semibold">{label}</p>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedCard && (
          <motion.div
            key="modal"
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="card-luxe max-w-md w-full p-6 text-center shadow-xl relative z-50"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <div ref={sparkleRef} className="sparkle-overlay pointer-events-none z-10" />
              <button onClick={closeModal} className="absolute top-4 right-5 text-white/60 hover:text-white z-50">
                <LucideX size={20} />
              </button>

              {selectedCard === "brand" && (
                <>
                  <div className="text-4xl mb-3">💼</div>
                  <h3 className="text-xl font-kalnia-glaze font-semibold mb-4 text-white text-glow-white">
                    Partner With MagicDrop
                  </h3>
                  <div className="text-sm text-white/80 text-left space-y-4">
                    <p>We embed your brand into immersive, artist-led moments — from <strong>physical products</strong> to <strong>narrative content</strong> and <strong>IRL experiences</strong>.</p>
                    <ul className="list-disc list-inside space-y-2">
                      <li>
                        Collaborate on <strong>limited-edition products</strong>, <strong>co-branded merch</strong>, and <strong>custom drops</strong> built around artist vision.
                      </li>
                      <li>
                        Tap into artist fanbases through <strong>authentic storytelling</strong> and <strong>narrative app experiences</strong>.
                      </li>
                      <li>
                        Extend your reach via <strong>physical events</strong>, <strong>social rollouts</strong>, and <strong>fan-powered discovery</strong>.
                      </li>
                      <li>
                        Enjoy turnkey execution: we handle <strong>production</strong>, <strong>creative</strong>, and <strong>logistics</strong> — with measurable ROI.
                      </li>
                    </ul>
                  </div>
                  <a
                    href="mailto:partnerships@getmagicdrop.com?subject=MAGICDROP BRANDS - CODE 9143BR"
                    className="mt-6 inline-block px-4 py-2 rounded-full border border-purple-400 text-sm text-white bg-purple-600 hover:bg-purple-700 transition z-50"
                  >
                    Email Us →
                  </a>
                </>
              )}

              {selectedCard === "artist" && (
                <>
                  <div className="text-4xl mb-3">🎤</div>
                  <h3 className="text-xl font-kalnia-glaze font-semibold mb-4 text-white text-glow-white">
                    Built For Artists
                  </h3>
                  <div className="text-sm text-white/80 text-left space-y-4">
                    <p>MagicDrop exists to bring artists’ worlds to life — from <strong>co-created products</strong> to <strong>immersive experiences</strong>.</p>
                    <ul className="list-disc list-inside space-y-2">
                      <li>We partner with <strong>top suppliers and leading brands</strong> across <br /> <strong>beauty</strong>, <strong>lifestyle</strong>, <strong>food & beverage</strong>, and <strong>premium textiles</strong>.</li>
                      <li>Every drop includes <strong>a custom-built experience</strong> — web, mobile, IRL, or a mix of all three. <br /><em>(Every drop is different, and we build around the artist’s world.)</em></li>
                      <li>We <strong>fully fund drop production</strong>, manage <strong>creative</strong> and <strong>logistics</strong>, <br /> and generate revenue through <strong>brand sponsorships</strong> and <strong>product sales</strong>.</li>
                      <li>Artists retain <strong>full creative control</strong> — with <strong>no upfront risk</strong>.</li>
                    </ul>
                  </div>
                  <a
                    href="mailto:partnerships@getmagicdrop.com?subject=MAGICDROP ARTIST - CODE 5480AR"
                    className="mt-6 inline-block px-4 py-2 rounded-full border border-purple-400 text-sm text-white bg-purple-600 hover:bg-purple-700 transition z-50"
                  >
                    Email Us →
                  </a>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Nav */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-50">
        {menuOpen && (
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="px-6 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl w-[90vw] max-w-sm shadow-2xl flex flex-col items-center gap-3 relative"
          >
            <button onClick={() => setMenuOpen(false)} className="absolute top-3 right-4 text-white/60 hover:text-white z-50">
              <LucideX size={18} />
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
    </div>
  );
}
