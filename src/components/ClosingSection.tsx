import { useEffect, useRef, useState } from 'react'
import photo2 from '@/imports/WhatsApp_Image_2026-07-08_at_16.53.50__4_.jpeg'

export function ClosingSection() {
  const [visible, setVisible] = useState(false)
  const [zoom, setZoom] = useState(0) // 0→1 as section scrolls into view
  const [glitchActive, setGlitchActive] = useState(false)
  const [hoverWord, setHoverWord] = useState<number | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const glitchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Intersection-triggered visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  // Scroll-triggered zoom tunneling: scale the central image as user scrolls into section
  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const windowH = window.innerHeight
      // Progress from 0 (bottom of screen) to 1 (section centred)
      const raw = 1 - rect.top / windowH
      setZoom(Math.max(0, Math.min(1, raw)))
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const triggerGlitch = () => {
    setGlitchActive(true)
    if (glitchTimeout.current) clearTimeout(glitchTimeout.current)
    glitchTimeout.current = setTimeout(() => setGlitchActive(false), 600)
  }

  // Words of the closing line that glitch independently on hover
  const closingWords = ['May', 'this', 'year', 'be', 'your', 'most', 'beautiful', 'yet']

  return (
    <section
      ref={ref}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: '80px 24px 120px',
        overflow: 'hidden',
        background: '#040206',
      }}
    >
      {/* SCROLL-TRIGGERED ZOOM TUNNEL IMAGE */}
      <div style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <img
          src={photo2}
          alt="Caro"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            opacity: 0.18,
            filter: `saturate(0.4) brightness(0.4) hue-rotate(${zoom * 20}deg)`,
            // Zoom tunnel: scale grows from 1 to 1.15 as section enters viewport
            transform: `scale(${1 + zoom * 0.15})`,
            transition: 'transform 0.05s linear',
          }}
        />
        {/* Vignette overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 30%, #040206 80%)',
        }} />
        {/* Cyber grid overlay */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.07,
          backgroundImage: 'linear-gradient(to right, #00ffff 1px, transparent 1px), linear-gradient(to bottom, #ff007f 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
        }} />
      </div>

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 1,
        textAlign: 'center', maxWidth: '720px',
      }}>
        {/* Flashing warning → celebration */}
        <div style={{
          marginBottom: '28px',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.8s ease',
          fontFamily: 'monospace',
          fontSize: '10px',
          letterSpacing: '0.35em',
          color: '#ff007f',
        }}>
          [SYSTEM_FINAL_SEQUENCE_ENGAGED]
        </div>

        {/* Decorative line */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '16px',
          justifyContent: 'center', marginBottom: '40px',
          opacity: visible ? 1 : 0, transition: 'opacity 0.8s ease',
        }}>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, #ff007f)' }} />
          <span style={{ color: '#00ffff', fontSize: '18px' }}>◈</span>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, #00ffff)' }} />
        </div>

        {/* Label */}
        <div style={{
          fontSize: '10px', letterSpacing: '0.55em', color: '#c9956e',
          textTransform: 'uppercase', marginBottom: '28px',
          opacity: visible ? 1 : 0, transition: 'opacity 0.8s ease 0.15s',
        }}>
          With all the love in the world
        </div>

        {/* Glitch-on-hover title — word by word */}
        <h2 className="playfair" style={{
          fontSize: 'clamp(36px, 7vw, 80px)',
          fontStyle: 'italic', fontWeight: 400,
          color: '#f5e6d3', lineHeight: 1.2,
          marginBottom: '28px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 0.9s ease 0.25s',
          display: 'flex', flexWrap: 'wrap',
          justifyContent: 'center', gap: '0 0.3em',
        }}>
          {closingWords.map((word, i) => (
            <span
              key={i}
              onMouseEnter={() => setHoverWord(i)}
              onMouseLeave={() => setHoverWord(null)}
              style={{
                display: 'inline-block',
                transform: hoverWord === i
                  ? `rotate(${(i % 2 === 0 ? 1 : -1) * 4}deg) scale(1.08)`
                  : 'none',
                textShadow: hoverWord === i
                  ? '3px 0 #ff007f, -3px 0 #00ffff'
                  : 'none',
                transition: 'transform 0.12s ease, text-shadow 0.12s ease',
                cursor: 'default',
                color: hoverWord === i ? '#e8c4a0' : 'inherit',
              }}
            >
              {word}
            </span>
          ))}
        </h2>

        {/* Body copy */}
        <p style={{
          fontSize: 'clamp(14px, 3.5vw, 18px)',
          lineHeight: 1.9, color: 'rgba(245,230,211,0.6)',
          fontWeight: 300, fontStyle: 'italic',
          marginBottom: '48px',
          opacity: visible ? 1 : 0, transition: 'opacity 0.9s ease 0.4s',
        }}>
          You deserve every flower, every candle, every whispered wish,<br />
          every moment of joy, and every dream that finally comes true.<br />
          This is your time, Caro. Shine.
        </p>

        {/* Signature */}
        <div style={{
          opacity: visible ? 1 : 0, transition: 'opacity 0.9s ease 0.6s',
        }}>
          <div className="cormorant" style={{
            fontSize: 'clamp(36px, 7vw, 60px)',
            fontStyle: 'italic', fontWeight: 300,
            background: 'linear-gradient(135deg, #ff007f, #00ffff, #c9956e)',
            backgroundSize: '200%',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'shimmer 4s linear infinite',
            marginBottom: '10px',
            textShadow: glitchActive ? '4px 0 #ff007f, -4px 0 #00ffff' : 'none',
          }}>
            Happy Birthday
          </div>
          <div style={{
            fontSize: '10px', letterSpacing: '0.4em',
            color: 'rgba(201,149,110,0.5)', textTransform: 'uppercase',
            marginBottom: '28px',
          }}>
            July 11th · Forever Celebrated
          </div>
        </div>

        {/* Glitch demo button */}
        <button
          onClick={triggerGlitch}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#00ffff'
            e.currentTarget.style.color = '#000'
            e.currentTarget.style.boxShadow = '0 0 30px #00ffff, 0 0 60px #ff007f'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = '#00ffff'
            e.currentTarget.style.boxShadow = '0 0 15px rgba(0,255,255,0.3)'
          }}
          style={{
            background: 'transparent', color: '#00ffff',
            border: '2px solid #00ffff',
            padding: '14px 36px',
            fontFamily: 'monospace', fontSize: '12px',
            letterSpacing: '0.3em', textTransform: 'uppercase',
            cursor: 'pointer',
            boxShadow: '0 0 15px rgba(0,255,255,0.3)',
            transition: 'all 0.2s ease',
            opacity: visible ? 1 : 0,
            minHeight: 'unset', minWidth: 'unset',
          }}
        >
          ⚡ SHATTER THE SYSTEM
        </button>

        {/* Twinkling stars */}
        <div style={{
          marginTop: '56px', display: 'flex', justifyContent: 'center', gap: '20px',
          opacity: visible ? 1 : 0, transition: 'opacity 0.9s ease 0.8s',
        }}>
          {['✦', '◈', '★', '◈', '✦'].map((s, i) => (
            <span key={i} style={{
              color: i % 2 === 0 ? '#ff007f' : '#00ffff',
              fontSize: '14px',
              animation: `twinkle ${1.3 + i * 0.3}s ease-in-out infinite`,
            }}>{s}</span>
          ))}
        </div>

        {/* Cyber footer */}
        <div style={{
          marginTop: '60px', fontFamily: 'monospace',
          fontSize: '10px', letterSpacing: '0.25em',
          color: 'rgba(0, 255, 255, 0.2)',
          opacity: visible ? 1 : 0, transition: 'opacity 0.9s ease 1s',
        }}>
          [SYSTEM_OFFLINE] · MADE_WITH_LOVE · FUNDI_2026 · END_PROTOCOL
        </div>
      </div>
    </section>
  )
}
