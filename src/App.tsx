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
  const [velocity, setVelocity] = useState(0)

  const lastScrollY = useRef(0)
  const lastScrollTime = useRef(Date.now())
  const scrollTimeout = useRef<number | null>(null)

  useEffect(() => {
    if (revealed) {
      setTimeout(() => setShowContent(true), 600)
    }
  }, [revealed])

  // Mouse tilt tracker (3D Perspective Tilt)
  useEffect(() => {
    if (!showContent) return

    const handleMouseMove = (e: MouseEvent) => {
      // Gently tilt layout depending on mouse coordinate relative to screen center
      const rx = (e.clientY / window.innerHeight - 0.5) * -4 // tilt up/down
      const ry = (e.clientX / window.innerWidth - 0.5) * 4   // tilt left/right
      setTilt({ x: rx, y: ry })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [showContent])

  // Scroll Velocity Tracker
  useEffect(() => {
    if (!showContent) return

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const currentTime = Date.now()
      
      const dy = Math.abs(currentScrollY - lastScrollY.current)
      const dt = Math.max(1, currentTime - lastScrollTime.current)
      
      // Calculate speed (px/ms)
      const speed = dy / dt
      // Cap velocity to avoid excessive distortion
      const computedVelocity = Math.min(speed, 2.5)
      
      setVelocity(computedVelocity)
      
      lastScrollY.current = currentScrollY
      lastScrollTime.current = currentTime

      // Reset velocity decay after scrolling ceases
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current)
      
      scrollTimeout.current = window.setTimeout(() => {
        setVelocity(0)
      }, 100)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current)
    }
  }, [showContent])

  // Derived chromatic distortion values
  const chromaX = velocity > 0.4 ? velocity * 3.5 : 0
  const hueShift = velocity > 0.4 ? velocity * 28 : 0
  const satBoost = velocity > 0.6 ? 1 + velocity * 0.4 : 1

  return (
    <div style={{ background: 'var(--background)', minHeight: '100vh', position: 'relative' }}>
      {/* Liquid cursor trail overlay (desktop only) */}
      <CursorTrail />

      {/* Velocity-based chromatic aberration style injection */}
      <style>{`
        .vel-wrap {
          filter: ${hueShift > 0
            ? `hue-rotate(${hueShift}deg) saturate(${satBoost})`
            : 'none'
          };
          transition: filter 0.12s ease;
        }
        .vel-wrap h1, .vel-wrap h2, .vel-wrap h3 {
          text-shadow: ${chromaX > 0
            ? `${chromaX}px 0 0 #ff007f, -${chromaX}px 0 0 #00ffff`
            : 'none'
          };
          transition: text-shadow 0.12s ease;
        }
      `}</style>

      <Particles />

      {!showContent && <Curtain onReveal={() => setRevealed(true)} />}

      {showContent && (
        <div
          className="vel-wrap"
          style={{
            transform: `perspective(1100px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scaleY(${1 + velocity * 0.04}) skewX(${tilt.y * 0.18}deg)`,
            transformStyle: 'preserve-3d',
            transition: velocity > 0 ? 'none' : 'transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)',
            willChange: 'transform, filter',
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
