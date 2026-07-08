import { useEffect, useRef, useState } from 'react'
import photo2 from '@/imports/WhatsApp_Image_2026-07-08_at_16.53.50__4_.jpeg'

export function ClosingSection() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: '120px 24px',
        overflow: 'hidden',
      }}
    >
      {/* Full bleed photo behind with overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
      }}>
        <img
          src={photo2}
          alt="Fundi"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            opacity: 0.25,
            filter: 'saturate(0.6) brightness(0.5)',
            transform: visible ? 'scale(1.05)' : 'scale(1.15)',
            transition: 'transform 3s ease',
          }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, var(--background) 0%, rgba(6,3,10,0.4) 50%, var(--background) 100%)',
        }} />
      </div>

      <div style={{
        position: 'relative',
        zIndex: 1,
        textAlign: 'center',
        maxWidth: '680px',
      }}>
        {/* Ornamental top */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          justifyContent: 'center',
          marginBottom: '48px',
          opacity: visible ? 1 : 0,
          transition: 'opacity 1s ease',
        }}>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(201,149,110,0.5))' }} />
          <span style={{ color: '#c9956e', fontSize: '20px' }}>❧</span>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(201,149,110,0.5))' }} />
        </div>

        <div style={{
          fontSize: '11px',
          letterSpacing: '0.5em',
          color: '#c9956e',
          textTransform: 'uppercase',
          marginBottom: '32px',
          opacity: visible ? 1 : 0,
          transition: 'opacity 1s ease 0.2s',
        }}>
          With all the love in the world
        </div>

        <h2 className="playfair" style={{
          fontSize: 'clamp(40px, 7vw, 80px)',
          fontStyle: 'italic',
          fontWeight: 400,
          color: '#f5e6d3',
          lineHeight: 1.15,
          marginBottom: '32px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 1s ease 0.3s',
        }}>
          May this year be your<br />most beautiful yet
        </h2>

        <p style={{
          fontSize: '17px',
          lineHeight: 1.9,
          color: 'rgba(245,230,211,0.6)',
          fontWeight: 300,
          fontStyle: 'italic',
          marginBottom: '56px',
          opacity: visible ? 1 : 0,
          transition: 'opacity 1s ease 0.5s',
        }}>
          You deserve every flower, every candle, every whispered wish,<br />
          every moment of joy, and every dream that finally comes true.<br />
          This is your time, Fundi. Shine.
        </p>

        {/* Signature */}
        <div style={{
          opacity: visible ? 1 : 0,
          transition: 'opacity 1s ease 0.7s',
        }}>
          <div className="cormorant" style={{
            fontSize: '48px',
            fontStyle: 'italic',
            fontWeight: 300,
            background: 'linear-gradient(135deg, #c9956e, #e8c4a0)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '8px',
          }}>
            Happy Birthday
          </div>
          <div style={{
            fontSize: '11px',
            letterSpacing: '0.4em',
            color: 'rgba(201,149,110,0.5)',
            textTransform: 'uppercase',
          }}>
            July 11th · Forever Celebrated
          </div>
        </div>

        {/* Star row */}
        <div style={{
          marginTop: '64px',
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          opacity: visible ? 1 : 0,
          transition: 'opacity 1s ease 0.9s',
        }}>
          {['✦', '◈', '✦', '◈', '✦'].map((s, i) => (
            <span key={i} style={{
              color: `rgba(201,149,110,${0.2 + i * 0.15})`,
              fontSize: '14px',
              animation: `twinkle ${1.5 + i * 0.3}s ease-in-out infinite`,
            }}>
              {s}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          marginTop: '80px',
          fontSize: '11px',
          color: 'rgba(245,230,211,0.2)',
          letterSpacing: '0.2em',
          opacity: visible ? 1 : 0,
          transition: 'opacity 1s ease 1.1s',
        }}>
          Made with love · For Fundi · 2026
        </div>
      </div>
    </section>
  )
}
