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
          <h1 className="text-4xl md:text-5xl font-bold font-kalnia-glaze text-white text-shadow-strong mb-3">
            Collaborate with Us
          </h1>
          <div className="space-y-4 text-white text-base leading-relaxed text-shadow-strong">
            <p>MagicDrop exists to bring artists’ worlds to life — from <strong>co-created products</strong> to <strong>immersive experiences</strong>.</p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                We partner with <strong>top suppliers and leading brands</strong> across
                <br /> <strong>beauty</strong>, <strong>lifestyle</strong>, <strong>food & beverage</strong>, and <strong>premium textiles</strong>.
              </li>
              <li>
                Every drop includes <strong>a custom-built experience</strong> — which can be <strong>web</strong>, <strong>mobile</strong>, <strong>IRL</strong>, or a mix of all three — depending on the creative vision.
                <br /> <em>(Every drop is different, and we build around the artist’s world.)</em>
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
        </div>
      </div>

      {/* Orbs */}
      ...
