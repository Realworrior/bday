import { useEffect, useRef, useState } from 'react'

export function HeroSection() {
  const [assembled, setAssembled] = useState(false)
  const [glitchText, setGlitchText] = useState('CARO')
  const [systemLogs, setSystemLogs] = useState<string[]>([])
  const [clickCount, setClickCount] = useState(0)
  const [neonActive, setNeonActive] = useState(true)
  const [hoverGlitch, setHoverGlitch] = useState<string | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })
  const ref = useRef<HTMLDivElement>(null)

  const heroImage = '/imgss/WhatsApp Image 2026-07-08 at 16.53.50.jpeg'

  // Controlled scatter → order (short delay so user registers the scatter)
  useEffect(() => {
    const t = setTimeout(() => setAssembled(true), 500)
    return () => clearTimeout(t)
  }, [])

  // Glitch name loop
  useEffect(() => {
    const chars = 'C4R0✦★🌸✨'
    const interval = setInterval(() => {
      if (Math.random() > 0.82) {
        const glitched = 'CARO'
          .split('')
          .map(c => (Math.random() > 0.65 ? chars[Math.floor(Math.random() * chars.length)] : c))
          .join('')
        setGlitchText(glitched)
        setTimeout(() => setGlitchText('CARO'), 150)
      }
    }, 500)
    return () => clearInterval(interval)
  }, [])

  // System logs typed in — normal english nurse edition
  useEffect(() => {
    const logs = [
      'CARO PROFILE SYSTEM DETECTED... 🌸',
      'ACTIVATING: HERO PROFILE...',
      'ESTABLISHED: YEAR 2000 🩺',
      'BIRTHDAY CELEBRATION UNLOCKED ✨',
      'STATUS: AMAZING NURSE & CARING SOUL. 👑',
    ]
    logs.forEach((log, i) => {
      setTimeout(() => setSystemLogs(prev => [...prev, log]), (i + 1) * 750)
    })
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    })
  }

  const triggerCheatCode = () => {
    setClickCount(c => c + 1)
    const eggs = [
      '🌸 COMPASSION ENGINE: MAXIMUM POWER',
      '✨ BRIGHTENING LIVES SINCE 2000 🩺',
      '💖 WE LOVE YOU CARO 👑',
      '🎀 CELEBRATION SHIELD: FULLY CHARGED',
      '🥂 CHEERS TO A BEAUTIFUL CELEBRATION',
    ]
    setSystemLogs(prev => [eggs[Math.floor(Math.random() * eggs.length)], ...prev.slice(0, 4)])
  }

  /**
   * Controlled scatter: each block has a FIXED, intentional offset
   * so it looks like a deliberate "designer toss" rather than a bug.
   */
  const presets = [
    { tx: '-5vw', ty: '-4vh', rot: '-6deg' },  // block 0 — photo
    { tx: '4vw',  ty: '-2vh', rot: '3deg'  },  // block 1 — label
    { tx: '-3vw', ty: '3vh',  rot: '-4deg' },  // block 2 — headline
    { tx: '6vw',  ty: '4vh',  rot: '5deg'  },  // block 3 — stats
    { tx: '-4vw', ty: '-3vh', rot: '-3deg' },  // block 4 — console
    { tx: '3vw',  ty: '5vh',  rot: '4deg'  },  // block 5 — buttons
  ]

  const blockStyle = (i: number, delay = 0): React.CSSProperties => ({
    opacity: assembled ? 1 : 0.85,
    transform: assembled
      ? 'translate(0, 0) rotate(0deg) scale(1)'
      : `translate(${presets[i].tx}, ${presets[i].ty}) rotate(${presets[i].rot}) scale(0.94)`,
    transition: `transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms,
                 opacity 0.5s ease ${delay}ms`,
  })

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
        padding: '100px 16px 60px',
        overflow: 'hidden',
        background: 'linear-gradient(160deg, #04020a 0%, #160520 50%, #04020a 100%)',
        borderBottom: '2px solid #ff007f',
      }}
    >
      {/* Soft feminine background glows */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `
          radial-gradient(ellipse at 15% 30%, rgba(212,88,138,0.12) 0%, transparent 55%),
          radial-gradient(ellipse at 85% 70%, rgba(0,255,255,0.07) 0%, transparent 50%),
          radial-gradient(ellipse at 50% 10%, rgba(244,160,176,0.08) 0%, transparent 40%)
        `,
      }} />

      {/* Cyber Grid */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.07, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(to right, #ff007f 1px, transparent 1px), linear-gradient(to bottom, #c9a0dc 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      {/* Parallax mouse glow (rose-gold) */}
      <div style={{
        position: 'absolute',
        width: 'min(500px, 90vw)', height: 'min(500px, 90vw)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(244,160,176,0.08) 0%, transparent 70%)',
        filter: 'blur(50px)',
        top: `${mousePos.y * 60}%`, left: `${mousePos.x * 70}%`,
        transform: 'translate(-50%, -50%)',
        transition: 'top 0.6s ease, left 0.6s ease',
        pointerEvents: 'none',
      }} />

      {/* Orbiting ring */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'min(700px, 95vw)', height: 'min(700px, 95vw)',
        border: '1px dashed rgba(244,160,176,0.1)',
        borderRadius: '50%',
        pointerEvents: 'none',
        animation: 'spin-slow 35s linear infinite',
      }} />

      {/* Main 2-column grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '36px',
        maxWidth: '1200px',
        width: '100%',
        zIndex: 2,
        position: 'relative',
      }}>

        {/* ─── PHOTO CARD — block 0 ─── */}
        <div style={{ display: 'flex', justifyContent: 'center', ...blockStyle(0, 0) }}>
          <div style={{ position: 'relative' }}>
            {/* Feminine neon backing — pink → lilac */}
            <div style={{
              position: 'absolute', inset: '-8px',
              background: 'linear-gradient(135deg, #ff007f, #c9a0dc, #ff007f)',
              backgroundSize: '200%',
              borderRadius: '2px',
              opacity: neonActive ? 0.7 : 0.12,
              filter: 'blur(12px)',
              animation: 'shimmer 3s linear infinite',
              transition: 'opacity 0.4s ease',
            }} />

            <div style={{
              background: '#0a0512',
              border: '3px solid #ff007f',
              padding: '12px 12px 28px',
              boxShadow: '6px 6px 0px #c9a0dc',
              position: 'relative',
              width: 'min(310px, 82vw)',
            }}>
              {/* Scanlines */}
              <div style={{
                position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none',
                backgroundImage: 'linear-gradient(rgba(0,0,0,0) 50%, rgba(0,0,0,0.22) 50%)',
                backgroundSize: '100% 4px',
              }} />

              <div style={{ position: 'absolute', top: 5, left: 8, color: '#f4a0b0', fontFamily: 'monospace', fontSize: '9px' }}>[SURPRISE_CAM ♡]</div>
              <div style={{ position: 'absolute', top: 5, right: 8, color: '#c9a0dc', fontFamily: 'monospace', fontSize: '9px' }}>EST. 2000</div>

              <img
                src={heroImage}
                alt="Caro — the birthday queen 🎀"
                style={{
                  width: '100%',
                  aspectRatio: '4/5',
                  objectFit: 'cover',
                  border: '2px solid #ff007f',
                  display: 'block',
                  filter: 'contrast(1.08) brightness(1.03) saturate(1.1)',
                  position: 'relative', zIndex: 1,
                }}
              />

              <div style={{
                marginTop: '10px', display: 'flex', justifyContent: 'space-between',
                fontFamily: 'monospace', fontSize: '10px',
              }}>
                <div style={{ color: '#f4a0b0' }}>🌸 JULY 11TH</div>
                <div style={{ color: '#c9a0dc' }}>HEALER & QUEEN</div>
              </div>

              <div style={{
                position: 'absolute', bottom: '-22px', left: '50%',
                transform: 'translateX(-50%)',
                background: '#ff007f', color: '#fff',
                fontFamily: 'monospace', fontSize: '10px', fontWeight: 'bold',
                padding: '2px 12px',
                clipPath: 'polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)',
                whiteSpace: 'nowrap',
              }}>
                👩‍⚕️ BRIGHTENING LIVES
              </div>
            </div>
          </div>
        </div>

        {/* ─── TEXT COLUMN ─── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* System ID — block 1 */}
          <div style={{ ...blockStyle(1, 60) }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              fontFamily: 'monospace', color: '#f4a0b0', fontSize: '11px',
              letterSpacing: '0.25em',
            }}>
              <span style={{ display: 'inline-block', width: '8px', height: '8px', background: '#ff007f', borderRadius: '50%' }} />
              CELEBRATING CARO — JULY 11TH 🎀
            </div>
          </div>

          {/* Giant headline — block 2 */}
          <div style={{ position: 'relative', ...blockStyle(2, 120) }}>
            {/* Ghost stroke */}
            <div className="playfair" style={{
              fontSize: 'clamp(54px, 15vw, 110px)',
              fontWeight: 900,
              color: 'transparent',
              WebkitTextStroke: '1px rgba(244,160,176,0.12)',
              lineHeight: 0.85,
              position: 'absolute', top: '-15px', left: '5px',
              zIndex: -1, pointerEvents: 'none',
            }}>
              JULY 11
            </div>

            <h1
              className="gochi"
              onMouseEnter={() => setHoverGlitch('happy')}
              onMouseLeave={() => setHoverGlitch(null)}
              style={{
                fontSize: 'clamp(52px, 14vw, 100px)',
                lineHeight: 0.9,
                color: '#f5e6d3',
                margin: '10px 0',
                textShadow: hoverGlitch === 'happy'
                  ? '4px 2px 0 #ff007f, -4px -2px 0 #c9a0dc'
                  : '2px 2px 0 #ff007f',
                transform: hoverGlitch === 'happy' ? 'rotate(-3deg) skewX(-4deg)' : 'rotate(-2deg)',
                transition: 'transform 0.15s ease, text-shadow 0.15s ease',
                cursor: 'default',
              }}
            >
              Happy
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <h1
                className="playfair"
                onMouseEnter={() => setHoverGlitch('caro')}
                onMouseLeave={() => setHoverGlitch(null)}
                style={{
                  fontSize: 'clamp(56px, 15vw, 115px)',
                  fontWeight: 900, lineHeight: 0.85,
                  letterSpacing: '-0.02em',
                  background: hoverGlitch === 'caro'
                    ? 'linear-gradient(90deg, #c9a0dc, #ff007f, #f4a0b0)'
                    : 'linear-gradient(90deg, #ff007f, #f4a0b0, #c9a0dc)',
                  backgroundSize: '200%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  animation: 'shimmer 2.5s linear infinite',
                  transform: hoverGlitch === 'caro' ? 'scaleX(1.06) skewY(-2deg)' : 'none',
                  transition: 'transform 0.12s ease',
                  cursor: 'default',
                }}
              >
                {glitchText}
              </h1>
              <div style={{
                background: 'rgba(244,160,176,0.12)', border: '1px solid #f4a0b0',
                color: '#f4a0b0', fontSize: '11px', fontFamily: 'monospace',
                padding: '3px 10px', borderRadius: '20px',
                display: 'flex', alignItems: 'center', gap: '4px',
              }}>
                🌸 Born 2000
              </div>
            </div>
          </div>

          {/* Stats card — block 3 */}
          <div style={{ ...blockStyle(3, 180) }}>
            <div style={{
              background: 'rgba(10,5,18,0.88)',
              border: '1px solid rgba(244,160,176,0.3)',
              borderRadius: '4px', padding: '16px',
              fontFamily: 'monospace', fontSize: '12px',
              boxShadow: 'inset 0 0 14px rgba(212,88,138,0.04)',
            }}>
              <div style={{
                color: '#ff007f', borderBottom: '1px dashed rgba(244,160,176,0.25)',
                paddingBottom: '6px', marginBottom: '10px', fontWeight: 'bold',
              }}>
                [CARO_PROFILE_STATS 💖]
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 140px', gap: '7px', color: '#f5e6d3' }}>
                <div>CARE & COMPASSION:</div>
                <div style={{ color: '#f4a0b0' }}>██████████ 999+ 🩺</div>
                <div>SMILE & JOY LEVEL:</div>
                <div style={{ color: '#c9a0dc' }}>██████████ 100% ✨</div>
                <div>ESTABLISHED YEAR:</div>
                <div style={{ color: '#ffb6a0' }}>2000 🎂</div>
                <div>PROFESSION:</div>
                <div style={{ color: '#f4a0b0' }}>NURSE 👩‍⚕️</div>
              </div>
            </div>
          </div>

          {/* Console log — block 4 */}
          <div style={{ ...blockStyle(4, 240) }}>
            <div style={{
              background: 'linear-gradient(135deg, #06030a, #100520)',
              borderLeft: '3px solid #ff007f',
              padding: '10px 14px', fontFamily: 'monospace',
              fontSize: '10px', color: 'rgba(245,230,211,0.65)',
              minHeight: '70px',
            }}>
              {systemLogs.slice(0, 3).map((log, i) => (
                <div key={i} style={{
                  color: log.startsWith('💅') || log.startsWith('🌸') || log.startsWith('✨')
                    ? '#f4a0b0'
                    : 'rgba(245,230,211,0.65)',
                  marginBottom: '3px',
                }}>
                  &gt; {log}
                </div>
              ))}
              {systemLogs.length < 3 && (
                <span style={{ color: '#ff007f', animation: 'twinkle 0.8s ease-in-out infinite' }}>█</span>
              )}
            </div>
          </div>

          {/* Buttons — block 5 */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', ...blockStyle(5, 300) }}>
            <button
              onClick={triggerCheatCode}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translate(2px,2px)'
                e.currentTarget.style.boxShadow = '2px 2px 0px #c9a0dc'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translate(0,0)'
                e.currentTarget.style.boxShadow = '4px 4px 0px #c9a0dc'
              }}
              style={{
                background: '#ff007f', color: '#fff',
                border: 'none', fontWeight: 'bold', textTransform: 'uppercase',
                padding: '12px 22px', fontFamily: 'monospace', fontSize: '11px',
                cursor: 'pointer', letterSpacing: '0.1em',
                boxShadow: '4px 4px 0px #c9a0dc', transition: 'all 0.1s ease',
                minHeight: 'unset', minWidth: 'unset',
              }}
            >
              🌸 Birthday Gift [×{clickCount}]
            </button>

            <button
              onClick={() => setNeonActive(!neonActive)}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#f4a0b0'
                e.currentTarget.style.color = '#000'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = '#f4a0b0'
              }}
              style={{
                background: 'transparent', color: '#f4a0b0',
                border: '1px solid #f4a0b0', textTransform: 'uppercase',
                padding: '12px 20px', fontFamily: 'monospace', fontSize: '11px',
                cursor: 'pointer', letterSpacing: '0.1em',
                transition: 'all 0.2s ease',
                minHeight: 'unset', minWidth: 'unset',
              }}
            >
              {neonActive ? '🌸 Dim Lights' : '✨ Max Glow'}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop 2-col override */}
      <style>{`
        @media (min-width: 850px) {
          section > div[style*="grid-template-columns"] {
            grid-template-columns: 1.1fr 1.3fr !important;
            gap: 60px !important;
          }
        }
      `}</style>
    </section>
  )
}
