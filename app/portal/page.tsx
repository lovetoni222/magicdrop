"use client";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function PortalPage() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const router = useRouter();

  useEffect(() => {
    const audio = audioRef.current;

    // Play sound on load
    if (audio) {
      audio.volume = 1;
      audio.play().catch(() => {});
    }

    // Fade out audio in the last 2 seconds
    const fadeOut = setTimeout(() => {
      let volume = 1;
      const fadeInterval = setInterval(() => {
        if (volume > 0.05 && audio) {
          volume -= 0.05;
          audio.volume = volume;
        } else {
          clearInterval(fadeInterval);
        }
      }, 100); // fade over ~2s
    }, 8000); // start fading after 8s

    // Redirect after 10s
    const timer = setTimeout(() => {
      router.push("/enter");
    }, 10000);

    return () => {
      clearTimeout(timer);
      clearTimeout(fadeOut);
    };
  }, [router]);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black text-white">
      {/* 🎧 Portal Sound */}
      <audio ref={audioRef} src="/portal-sound.mp3" preload="auto" />

      {/* 🎥 Portal Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/portal-bg.mp4"
        autoPlay
        muted
        playsInline
      />

      {/* ✨ Flickering lowercase Text */}
      <div className="relative z-10 flex items-center justify-center h-full text-center px-4">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="text-xl md:text-3xl font-medium lowercase text-white flicker"
        >
          opening the portal...
        </motion.h1>
      </div>

      <style jsx global>{`
        .flicker {
          animation: flickerAnim 1.5s infinite;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.8),
            0 0 20px rgba(213, 179, 255, 0.4);
        }

        @keyframes flickerAnim {
          0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
            opacity: 1;
          }
          20%, 22%, 24%, 55% {
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
}
