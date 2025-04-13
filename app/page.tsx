"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isUserInteracted, setIsUserInteracted] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const onUserInteraction = () => {
      setIsUserInteracted(true);
      window.removeEventListener("click", onUserInteraction);
      window.removeEventListener("keydown", onUserInteraction);
      window.removeEventListener("mousemove", onUserInteraction);
    };

    const onEnterPress = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        handleMagicSequence(); // treat Enter as a click
      }
    };

    window.addEventListener("click", onUserInteraction);
    window.addEventListener("keydown", onUserInteraction);
    window.addEventListener("mousemove", onUserInteraction);
    window.addEventListener("keydown", onEnterPress);

    return () => {
      window.removeEventListener("click", onUserInteraction);
      window.removeEventListener("keydown", onUserInteraction);
      window.removeEventListener("mousemove", onUserInteraction);
      window.removeEventListener("keydown", onEnterPress);
    };
  }, []);

  const handleMagicSequence = () => {
    if (isClicked) return; // prevent double triggers
    setIsClicked(true);

    // Play the magic sound
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }

    // Trigger smoke animation
    setTimeout(() => {
      document.body.classList.add("smoke-effect");
    }, 100);

    // Transition to portal after 2s
    setTimeout(() => {
      window.location.href = "/portal";
    }, 2000);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black text-white">
      {/* 🎥 Background Video */}
      <video
        className="absolute inset-0 h-full w-full object-cover z-0"
        src="/bg-home.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* 🎧 Hover Sound (only plays on click now) */}
      <audio ref={audioRef} src="/ui-hover.mp3" preload="auto" />

      {/* ✨ HUD + Glows */}
      <div className="absolute top-6 right-6 w-4 h-4 bg-[#D5B3FF] rounded-full blur-md opacity-70 flicker-soft z-10" />
      <div className="absolute bottom-6 left-6 w-3 h-3 bg-[#D5B3FF] rounded-full blur-sm opacity-50 flicker-soft z-10" />

      <div className="absolute top-4 left-6 text-xs text-white/60 tracking-widest uppercase z-10">
        MagicDrop UI
      </div>
      <div className="absolute bottom-4 left-6 text-xs text-white/40">
        Build 01 — Public Alpha
      </div>
      <div className="absolute bottom-4 right-6 text-xs text-white/40">
        Powered by Fan Magic
      </div>

      {/* 💫 Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 space-y-6">
        <motion.h1
          className="text-3xl md:text-5xl font-bold [font-family:var(--font-playfair)] text-white"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          Where Fandom Becomes Universe
        </motion.h1>

        <motion.p
          className="text-md md:text-xl text-gray-300 max-w-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          Limited drops. Artist-led worlds. Co-created with fans like you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <button
            className="mt-4 px-6 py-3 bg-white text-black rounded-full font-semibold text-sm hover:scale-105 hover:bg-purple-600 hover:text-white transition-all duration-300"
            onClick={handleMagicSequence}
          >
            Access the Dropverse →
          </button>
        </motion.div>

        <p className="text-xs text-white/30 italic mt-4">
          Press Enter to continue
        </p>
      </div>

      {/* 🌫️ Smoke Transition Animation */}
      <style jsx global>{`
        body.smoke-effect {
          animation: smokeFade 2s forwards ease-in-out;
          overflow: hidden;
        }

        @keyframes smokeFade {
          0% {
            opacity: 1;
            filter: blur(0px);
          }
          100% {
            opacity: 0;
            filter: blur(8px);
            background-color: black;
          }
        }

        body.smoke-effect::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.2) 1%,
            transparent 60%
          );
          animation: fogRise 2s ease-in-out;
          opacity: 0.6;
        }

        @keyframes fogRise {
          0% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
