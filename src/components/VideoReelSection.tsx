import { useEffect, useRef, useState } from 'react'

export function VideoReelSection() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const videos = [
    {
      src: '/imgss/WhatsApp Video 2026-07-08 at 16.53.51.mp4',
      title: 'In Motion',
      desc: 'Captured energy, never contained.',
    },
    {
      src: '/imgss/WhatsApp Video 2026-07-08 at 16.53.51 (1).mp4',
      title: 'Real Moments',
      desc: 'Pure, authentic joy.',
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      style={{
        padding: 'var(--section-v) var(--section-h)',
        background: '#07030e',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(244,160,176,0.15)',
        borderBottom: '1px solid rgba(244,160,176,0.15)',
      }}
    >
      {/* Background cyber grid */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.05, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(to right, #ff007f 1px, transparent 1px), linear-gradient(to bottom, #00ffff 1px, transparent 1px)',
        backgroundSize: '30px 30px',
      }} />

      <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="handwritten" style={{
            fontSize: 'clamp(18px, 4vw, 24px)',
            color: '#f4a0b0',
            display: 'block',
            marginBottom: '6px',
          }}>
            🎥 caro in motion
          </span>
          <h2 className="playfair" style={{
            fontSize: 'clamp(28px, 7vw, 48px)',
            color: '#f5e6d3',
            fontStyle: 'italic',
            fontWeight: 400,
          }}>
            Cinematic{' '}
            <span style={{
              background: 'linear-gradient(135deg, #ff007f, #c9a0dc)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Reels
            </span>
          </h2>
        </div>

        {/* Videos Container: Dual columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth < 650 ? '1fr' : '1fr 1fr',
          gap: '32px',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          {videos.map((vid, idx) => (
            <div
              key={idx}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(40px)',
                transition: `all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${idx * 200}ms`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {/* Phone-style Y2K mockup frame with glowing borders */}
              <div style={{
                width: 'min(280px, 85vw)',
                aspectRatio: '9/16',
                background: '#000',
                border: '3px solid #ff007f',
                borderRadius: '32px',
                padding: '10px',
                position: 'relative',
                boxShadow: '0 20px 50px rgba(255,0,127,0.25), 0 0 0 1px rgba(0,255,255,0.2)',
                overflow: 'hidden',
              }}>
                {/* Camera lens top notch */}
                <div style={{
                  position: 'absolute',
                  top: '12px', left: '50%',
                  transform: 'translateX(-50%)',
                  width: '60px', height: '14px',
                  background: '#0f071a',
                  borderRadius: '10px',
                  zIndex: 10,
                  border: '1px solid rgba(255,255,255,0.1)',
                }} />

                {/* Autoplaying loop video */}
                <video
                  src={vid.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '22px',
                    display: 'block',
                  }}
                />

                {/* Bottom home indicator line */}
                <div style={{
                  position: 'absolute',
                  bottom: '8px', left: '50%',
                  transform: 'translateX(-50%)',
                  width: '80px', height: '4px',
                  background: 'rgba(255,255,255,0.3)',
                  borderRadius: '2px',
                  zIndex: 10,
                }} />
              </div>

              {/* Title & Desc */}
              <div style={{ textAlign: 'center', marginTop: '16px' }}>
                <h3 className="playfair" style={{
                  fontSize: '20px',
                  color: '#f5e6d3',
                  fontStyle: 'italic',
                  marginBottom: '4px',
                }}>
                  {vid.title}
                </h3>
                <p className="handwritten" style={{
                  fontSize: '16px',
                  color: 'rgba(245,230,211,0.5)',
                }}>
                  {vid.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
