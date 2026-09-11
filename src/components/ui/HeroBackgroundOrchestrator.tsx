import React, { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { HeroLivingPortrait } from '../3d/HeroLivingPortrait'

export const HeroBackgroundOrchestrator: React.FC = () => {
  const { scrollYProgress } = useScroll()
  const [hasCustomVideo, setHasCustomVideo] = useState(false)

  // Check if user has dropped in a real video file (e.g. /hero-video.mp4)
  useEffect(() => {
    fetch('/hero-video.mp4', { method: 'HEAD' })
      .then(res => {
        if (res.ok) setHasCustomVideo(true)
      })
      .catch(() => setHasCustomVideo(false))
  }, [])

  // Dynamic Opacity based on scroll progress (Matching video 00:00 to 00:12):
  // - Top Hero (0 to 0.25): Full 100% opacity
  // - Collection Grid (0.28 to 0.55): Dims to 4% for clean 3D ring focus
  // - "Made Without Compromise" (0.58 to 0.85): Rises to 18% as background watermark
  // - Footer (0.9 to 1.0): Fades to 0%
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.22, 0.32, 0.55, 0.65, 0.82, 0.95],
    [1, 1, 0.04, 0.04, 0.18, 0.18, 0]
  )

  const scale = useTransform(scrollYProgress, [0, 1], [1.0, 1.12])
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
      <motion.div
        style={{ opacity, scale, y }}
        className="relative w-full h-full flex items-center justify-center"
      >
        {hasCustomVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            src="/hero-video.mp4"
            className="w-full h-full object-cover object-[65%_35%] md:object-center filter contrast-[1.03]"
          />
        ) : (
          <div className="w-full h-full">
            <HeroLivingPortrait />
          </div>
        )}

        {/* Studio Off-White Edge Vignettes */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#f6f6f8]/80 via-transparent to-transparent opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f6f6f8] via-transparent to-transparent opacity-60" />
      </motion.div>
    </div>
  )
}
