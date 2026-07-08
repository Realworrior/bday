import { useEffect, useState, useRef } from 'react'
import { Curtain } from './components/Curtain'
import { Particles } from './components/Particles'
import { CursorTrail } from './components/CursorTrail'
import { HeroSection } from './components/HeroSection'
import { GallerySection } from './components/GallerySection'
import { VideoReelSection } from './components/VideoReelSection'
import { MessageSection } from './components/MessageSection'
import { CountdownSection } from './components/CountdownSection'
import { ClosingSection } from './components/ClosingSection'

export default function App() {
  const [revealed, setRevealed] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const isMobile = useRef(window.innerWidth < 768)

  useEffect(() => {
    if (revealed) {
      setTimeout(() => setShowContent(true), 600)
    }
  }, [revealed])

  // Subtle 3D mouse tilt — desktop only, no scroll involvement
  useEffect(() => {
    if (!showContent || isMobile.current) return

    const handleMouseMove = (e: MouseEvent) => {
      const rx = (e.clientY / window.innerHeight - 0.5) * -2.5
      const ry = (e.clientX / window.innerWidth - 0.5) * 2.5
      setTilt({ x: rx, y: ry })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [showContent])

  return (
    <div style={{ background: 'var(--background)', minHeight: '100vh', position: 'relative' }}>
      {/* Liquid cursor trail — desktop only */}
      <CursorTrail />

      <Particles />

      {!showContent && <Curtain onReveal={() => setRevealed(true)} />}

      {showContent && (
        <div
          style={{
            // Gentle static 3D tilt from mouse position only — no scroll distortion
            transform: isMobile.current
              ? 'none'
              : `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transformStyle: 'preserve-3d',
            transition: 'transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)',
            willChange: 'transform',
          }}
        >
          <main>
            <HeroSection />
            <GallerySection />
            <VideoReelSection />
            <MessageSection />
            <CountdownSection />
            <ClosingSection />
          </main>
        </div>
      )}
    </div>
  )
}
