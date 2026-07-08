import { useEffect, useRef, useState } from 'react'
import photo1 from '@/imports/WhatsApp_Image_2026-07-08_at_16.53.51.jpeg'

export function HeroSection() {
  const [visible, setVisible] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setTimeout(() => setVisible(true), 100)
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    })
  }

  const rotateX = (mousePos.y - 0.5) * -8
  const rotateY = (mousePos.x - 0.5) * 8

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      style={{
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        /* Mobile-first: stack vertically with comfortable padding */
        padding: '100px 20px 60px',
        overflow: 'hidden',
      }}
    >
      {/* Background glow orbs — lighter on mobile */}
      <div style={{
        position: 'absolute',
        top: '20%', left: '5%',
        width: 'min(400px, 80vw)', height: 'min(400px, 80vw)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139,58,107,0.15) 0%, transparent 70%)',
        filter: 'blur(40px)',
        transform: `translate(${(mousePos.x - 0.5) * 20}px, ${(mousePos.y - 0.5) * 14}px)`,
        transition: 'transform 0.5s ease',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '15%', right: '5%',
        width: 'min(500px, 90vw)', height: 'min(500px, 90vw)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,149,110,0.12) 0%, transparent 70%)',
        filter: 'blur(60px)',
        transform: `translate(${(mousePos.x - 0.5) * -14}px, ${(mousePos.y - 0.5) * -10}px)`,
        transition: 'transform 0.5s ease',
        pointerEvents: 'none',
      }} />

      {/* Content — single column on mobile, two columns on desktop */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '48px',
        maxWidth: '1100px',
        width: '100%',
        alignItems: 'center',
        zIndex: 1,
      }}>
        {/* Photo card — shown first on mobile for emotional impact */}
        <div style={{
          opacity: visible ? 1 : 0,
          transition: 'all 1.4s cubic-bezier(0.23,1,0.32,1) 0.2s',
          perspective: '1000px',
          display: 'flex',
          justifyContent: 'center',
          order: -1,
        }}>
          <div style={{
            transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            transformStyle: 'preserve-3d',
            transition: 'transform 0.2s ease',
            position: 'relative',
          }}>
            {/* Glow behind photo */}
            <div style={{
              position: 'absolute',
              inset: '-20px',
              borderRadius: '24px',
              background: 'radial-gradient(circle, rgba(201,149,110,0.25) 0%, transparent 70%)',
              filter: 'blur(20px)',
            }} />
            <img
              src={photo1}
              alt="Fundi — beautiful birthday girl"
              style={{
                /* Responsive image: full width on mobile, fixed on desktop */
                width: 'min(300px, 80vw)',
                height: 'min(400px, 107vw)',
                objectFit: 'cover',
                borderRadius: '20px',
                display: 'block',
                position: 'relative',
                boxShadow: '0 30px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(201,149,110,0.2)',
              }}
            />
            {/* Corner ornaments */}
            {[
              { top: 12, left: 12, borderTop: '2px solid #c9956e', borderLeft: '2px solid #c9956e' },
              { top: 12, right: 12, borderTop: '2px solid #c9956e', borderRight: '2px solid #c9956e' },
              { bottom: 12, left: 12, borderBottom: '2px solid #c9956e', borderLeft: '2px solid #c9956e' },
              { bottom: 12, right: 12, borderBottom: '2px solid #c9956e', borderRight: '2px solid #c9956e' },
            ].map((style, i) => (
              <div key={i} style={{
                position: 'absolute',
                ...style,
                width: '20px',
                height: '20px',
                borderRadius: '2px',
              }} />
            ))}
            {/* Label */}
            <div style={{
              position: 'absolute',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(6,3,10,0.8)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(201,149,110,0.25)',
              borderRadius: '20px',
              padding: '7px 18px',
              fontSize: '11px',
              letterSpacing: '0.2em',
              color: '#c9956e',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}>
              The Birthday Queen
            </div>
          </div>
        </div>

        {/* Text side */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 1.2s cubic-bezier(0.23,1,0.32,1)',
          textAlign: 'center',
          maxWidth: '520px',
        }}>
          <div style={{
            fontSize: '11px',
            letterSpacing: '0.5em',
            color: '#c9956e',
            textTransform: 'uppercase',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
          }}>
            <span style={{ width: '32px', height: '1px', background: 'currentColor', display: 'inline-block' }} />
            July 11th
            <span style={{ width: '32px', height: '1px', background: 'currentColor', display: 'inline-block' }} />
          </div>

          <h1 className="playfair" style={{
            fontSize: 'clamp(44px, 12vw, 96px)',
            fontWeight: 700,
            lineHeight: 0.95,
            marginBottom: '8px',
            color: '#f5e6d3',
          }}>
            Happy
          </h1>
          <h1 className="playfair" style={{
            fontSize: 'clamp(44px, 12vw, 96px)',
            fontWeight: 400,
            fontStyle: 'italic',
            lineHeight: 0.95,
            marginBottom: '24px',
            background: 'linear-gradient(135deg, #c9956e, #e8c4a0, #d4588a)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'shimmer 4s linear infinite',
          }}>
            Birthday,
          </h1>
          <h2 className="cormorant" style={{
            fontSize: 'clamp(40px, 11vw, 88px)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: '#f5e6d3',
            lineHeight: 1,
            marginBottom: '28px',
          }}>
            Caro ✦
          </h2>

          <p style={{
            fontSize: 'clamp(14px, 3.5vw, 16px)',
            lineHeight: 1.8,
            color: 'rgba(245,230,211,0.65)',
            marginBottom: '32px',
            fontWeight: 300,
            padding: '0 4px',
          }}>
            To a woman who lights up every room she walks into —
            today, the universe celebrates you. You are rare,
            radiant, and endlessly loved.
          </p>

          <div style={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
            {['Fundi', 'Beautiful', 'Loved', 'Iconic', 'Magic'].map(tag => (
              <span key={tag} style={{
                padding: '8px 16px',
                border: '1px solid rgba(201,149,110,0.25)',
                borderRadius: '20px',
                fontSize: '11px',
                letterSpacing: '0.15em',
                color: '#c9956e',
                textTransform: 'uppercase',
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop: side-by-side layout override via media query injection */}
      <style>{`
        @media (min-width: 700px) {
          .hero-inner {
            flex-direction: row !important;
            text-align: left !important;
          }
          .hero-text {
            text-align: left !important;
          }
          .hero-tags {
            justify-content: flex-start !important;
          }
          .hero-dateline {
            justify-content: flex-start !important;
          }
          .hero-photo {
            order: 0 !important;
          }
        }
      `}</style>
    </section>
  )
}
