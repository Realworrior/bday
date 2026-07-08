import { useEffect, useState, useRef } from 'react'
import { Curtain } from './components/Curtain'
import { Particles } from './components/Particles'
import { HeroSection } from './components/HeroSection'
import { GallerySection } from './components/GallerySection'
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

  return (
    <div style={{ background: 'var(--background)', minHeight: '100vh', position: 'relative' }}>
      {/* Chromatic aberration inject */}
      <style>{`
        .velocity-glitch {
          text-shadow: ${velocity > 0.4 ? `${velocity * 3}px 0 0 #ff007f, -${velocity * 3}px 0 0 #00ffff` : 'none'} !important;
          filter: ${velocity > 0.4 ? `hue-rotate(${velocity * 25}deg)` : 'none'} !important;
          transition: filter 0.15s ease, text-shadow 0.15s ease;
        }
      `}</style>
      
      <Particles />

      {!showContent && <Curtain onReveal={() => setRevealed(true)} />}

      {showContent && (
        <div
          className="velocity-glitch"
          style={{
            transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scaleY(${1 + velocity * 0.05}) skewX(${tilt.y * 0.2}deg)`,
            transformStyle: 'preserve-3d',
            transition: velocity > 0 ? 'none' : 'transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
            willChange: 'transform, filter',
          }}
        >
          <main>
            <HeroSection />
            <GallerySection />
            <MessageSection />
            <CountdownSection />
            <ClosingSection />
          </main>
        </div>
      )}
    </div>
  )
}
