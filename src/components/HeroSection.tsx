import { useEffect, useRef, useState } from 'react'

export function HeroSection() {
  const [assembled, setAssembled] = useState(false) // chaos → order
  const [glitchText, setGlitchText] = useState('CARO')
  const [systemLogs, setSystemLogs] = useState<string[]>([])
  const [clickCount, setClickCount] = useState(0)
  const [neonActive, setNeonActive] = useState(true)
  const [hoverGlitch, setHoverGlitch] = useState<string | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })
  const ref = useRef<HTMLDivElement>(null)

  const heroImage = '/imgss/WhatsApp Image 2026-07-08 at 16.53.50.jpeg'

  // Chaos → Order: elements scatter then snap after 300ms
  useEffect(() => {
    const t = setTimeout(() => setAssembled(true), 350)
    return () => clearTimeout(t)
  }, [])

  // Glitch name loop
  useEffect(() => {
    const chars = 'C4R0_QU33N_99_★_⚡_✦'
    const interval = setInterval(() => {
      if (Math.random() > 0.82) {
        const glitched = 'CARO'
          .split('')
          .map(c => (Math.random() > 0.65 ? chars[Math.floor(Math.random() * chars.length)] : c))
          .join('')
        setGlitchText(glitched)
        setTimeout(() => setGlitchText('CARO'), 150)
      }
    }, 400)
    return () => clearInterval(interval)
  }, [])

  // System logs (typed-in feel)
  useEffect(() => {
    const logs = [
      'INITIALIZING SLAY ENGINE v1.0.7...',
      'SCANNING BEAUTY AND CHARM RADAR... [100%]',
      'WARN: VIBE FIELD HAS SURPASSED SAFE LIMITS.',
      'BIRTHDAY CHEAT CODES ENABLED.',
      'SYSTEM PROFILE: FOREVER ICONIC.',
    ]
    logs.forEach((log, i) => {
      setTimeout(() => setSystemLogs(prev => [...prev, log]), (i + 1) * 800)
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
      '★ CHEAT ENABLED: GODDESS MODE ACTIVE ★',
      '★ NEON POWER CHARGED TO 999% ★',
      '★ ALL EYES ENGAGED ON THE BIRTHDAY QUEEN ★',
      '★ UNLIMITED CHAMPAGNE PROTOCOL SHIELD ON ★',
      '★ SLAY.EXE RUNNING IN INFINITE LOOP ★',
    ]
    setSystemLogs(prev => [eggs[Math.floor(Math.random() * eggs.length)], ...prev.slice(0, 4)])
  }

  // Generate random scatter offset (in vw/vh units) for each UI block
  const scatter = (seed: number, axis: 'x' | 'y') => {
    const hash = (seed * 31 + 7) % 100
    const val = axis === 'x' ? (hash - 50) * 0.6 : (hash - 50) * 0.4
    return assembled ? 0 : val
  }
  const scatterRot = (seed: number) => assembled ? 0 : ((seed * 17) % 60) - 30

  const blockStyle = (seed: number, delay = 0): React.CSSProperties => ({
    opacity: assembled ? 1 : 0,
    transform: assembled
      ? 'translate(0, 0) rotate(0deg) scale(1)'
      : `translate(${scatter(seed, 'x')}vw, ${scatter(seed, 'y')}vh) rotate(${scatterRot(seed)}deg) scale(0.7)`,
    transition: `transform 0.75s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${delay}ms,
                 opacity 0.55s ease ${delay}ms`,
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
        background: '#040206',
        borderBottom: '2px solid #ff007f',
      }}
    >
      {/* Cyber Grid */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.1, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(to right, #00ffff 1px, transparent 1px), linear-gradient(to bottom, #ff007f 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      {/* Parallax mouse glow */}
      <div style={{
        position: 'absolute',
        width: 'min(500px, 90vw)', height: 'min(500px, 90vw)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,255,255,0.06) 0%, transparent 70%)',
        filter: 'blur(60px)',
        top: `${mousePos.y * 60}%`,
        left: `${mousePos.x * 70}%`,
        transform: 'translate(-50%, -50%)',
        transition: 'top 0.6s ease, left 0.6s ease',
        pointerEvents: 'none',
      }} />

      {/* Rotating targeting ring */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'min(700px, 95vw)', height: 'min(700px, 95vw)',
        border: '1px dashed rgba(0,255,255,0.08)',
        borderRadius: '50%',
        pointerEvents: 'none',
        animation: 'spin-slow 30s linear infinite',
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

        {/* ─── PHOTO CARD (scattered block 1) ─── */}
        <div style={{ display: 'flex', justifyContent: 'center', ...blockStyle(11, 0) }}>
          <div style={{ position: 'relative' }}>
            {/* Liquid neon backing */}
            <div style={{
              position: 'absolute', inset: '-8px',
              background: 'linear-gradient(135deg, #ff007f, #00ffff, #ff007f)',
              backgroundSize: '200%',
              borderRadius: '2px',
              opacity: neonActive ? 0.75 : 0.15,
              filter: 'blur(10px)',
              animation: 'shimmer 3s linear infinite',
              transition: 'opacity 0.4s ease',
            }} />

            {/* Brutalist polaroid frame */}
            <div style={{
              background: '#0a0512',
              border: '3px solid #00ffff',
              padding: '12px 12px 24px',
              boxShadow: '8px 8px 0px #ff007f',
              position: 'relative',
              width: 'min(310px, 82vw)',
              cursor: 'crosshair',
            }}>
              {/* Scanlines overlay */}
              <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3,
                backgroundImage: 'linear-gradient(rgba(0,0,0,0) 50%, rgba(0,0,0,0.25) 50%)',
                backgroundSize: '100% 4px',
              }} />

              <div style={{ position: 'absolute', top: 5, left: 8, color: '#00ffff', fontFamily: 'monospace', fontSize: '9px' }}>[HUD_ACTIVE]</div>
              <div style={{ position: 'absolute', top: 5, right: 8, color: '#ff007f', fontFamily: 'monospace', fontSize: '9px' }}>R-99</div>

              <img
                src={heroImage}
                alt="Caro the Birthday Queen"
                style={{
                  width: '100%',
                  aspectRatio: '4/5',
                  objectFit: 'cover',
                  border: '2px solid #ff007f',
                  display: 'block',
                  filter: 'contrast(1.1) brightness(1.02)',
                  position: 'relative',
                  zIndex: 1,
                }}
              />

              <div style={{
                marginTop: '12px', display: 'flex', justifyContent: 'space-between',
                fontFamily: 'monospace', color: '#f5e6d3', fontSize: '10px',
              }}>
                <div>LAT: 52° 31' N</div>
                <div style={{ color: '#00ffff' }}>LNG: 13° 24' E</div>
              </div>

              <div style={{
                position: 'absolute', bottom: '-24px', left: '50%',
                transform: 'translateX(-50%)',
                background: '#ff007f', color: '#000',
                fontFamily: 'monospace', fontSize: '10px', fontWeight: 'bold',
                padding: '2px 10px',
                clipPath: 'polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)',
                whiteSpace: 'nowrap',
              }}>
                SLAY ENGINE [ACTIVE]
              </div>
            </div>
          </div>
        </div>

        {/* ─── TEXT COLUMN ─── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* System ID label (block 2) */}
          <div style={{ ...blockStyle(22, 60) }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              fontFamily: 'monospace', color: '#00ffff', fontSize: '11px',
              letterSpacing: '0.25em',
            }}>
              <span style={{ display: 'inline-block', width: '8px', height: '8px', background: '#ff007f' }} />
              SYSTEM PROTOCOL: BIRTHDAY_QUEEN_v2.6
            </div>
          </div>

          {/* Giant typography (block 3) */}
          <div style={{ position: 'relative', ...blockStyle(33, 120) }}>
            {/* Ghost stroke behind */}
            <div className="playfair" style={{
              fontSize: 'clamp(54px, 15vw, 110px)',
              fontWeight: 900,
              color: 'transparent',
              WebkitTextStroke: '1px rgba(255,0,127,0.15)',
              lineHeight: 0.85,
              position: 'absolute',
              top: '-15px', left: '5px',
              zIndex: -1, pointerEvents: 'none',
            }}>
              JULY 11
            </div>

            {/* Glitch-on-hover "Happy" */}
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
                  ? '4px 2px 0 #ff007f, -4px -2px 0 #00ffff'
                  : '3px 3px 0px #ff007f, -1px -1px 0px #00ffff',
                transform: hoverGlitch === 'happy' ? 'rotate(-3deg) skewX(-5deg)' : 'rotate(-2deg)',
                transition: 'transform 0.15s ease, text-shadow 0.15s ease',
                cursor: 'default',
              }}
            >
              Happy
            </h1>

            {/* Glitch name */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <h1
                className="playfair"
                onMouseEnter={() => setHoverGlitch('caro')}
                onMouseLeave={() => setHoverGlitch(null)}
                style={{
                  fontSize: 'clamp(56px, 15vw, 115px)',
                  fontWeight: 900,
                  lineHeight: 0.85,
                  letterSpacing: '-0.02em',
                  background: hoverGlitch === 'caro'
                    ? 'linear-gradient(90deg, #00ffff, #ff007f, #00ffff)'
                    : 'linear-gradient(90deg, #ff007f, #00ffff)',
                  backgroundSize: '200%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  animation: 'shimmer 2s linear infinite',
                  transform: hoverGlitch === 'caro' ? 'scaleX(1.08) skewY(-2deg)' : 'none',
                  transition: 'transform 0.12s ease',
                  cursor: 'default',
                }}
              >
                {glitchText}
              </h1>
              <div style={{
                background: 'rgba(0,255,255,0.1)', border: '1px solid #00ffff',
                color: '#00ffff', fontSize: '11px', fontFamily: 'monospace',
                padding: '2px 8px', borderRadius: '2px', height: '20px',
                display: 'flex', alignItems: 'center',
              }}>
                Lvl 99
              </div>
            </div>
          </div>

          {/* Stats card (block 4) */}
          <div style={{ ...blockStyle(44, 180) }}>
            <div style={{
              background: 'rgba(10,5,18,0.85)',
              border: '1px solid rgba(0,255,255,0.25)',
              borderRadius: '4px', padding: '16px',
              fontFamily: 'monospace', fontSize: '12px',
              boxShadow: 'inset 0 0 14px rgba(0,255,255,0.04)',
            }}>
              <div style={{ color: '#ff007f', borderBottom: '1px dashed rgba(255,0,127,0.3)', paddingBottom: '6px', marginBottom: '10px', fontWeight: 'bold' }}>
                [CARO_PROFILE_METRIC]
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 130px', gap: '7px', color: '#f5e6d3' }}>
                {[
                  ['CHARM STRENGTH:', <span style={{ color: '#00ffff' }}>██████████ 999+</span>],
                  ['SLAY FACTOR:', <span style={{ color: '#ff007f' }}>██████████ 100%</span>],
                  ['VIBE FIELD:', <span style={{ color: '#e8c4a0' }}>CHAOTIC GOOD</span>],
                  ['LUCK GENERATOR:', <span style={{ color: '#00ffff' }}>MAX_CAPACITY</span>],
                ].map(([label, val], i) => (
                  <>
                    <div key={`l-${i}`}>{label}</div>
                    <div key={`v-${i}`}>{val}</div>
                  </>
                ))}
              </div>
            </div>
          </div>

          {/* Console log (block 5) */}
          <div style={{ ...blockStyle(55, 240) }}>
            <div style={{
              background: '#000', borderLeft: '3px solid #ff007f',
              padding: '10px 14px', fontFamily: 'monospace',
              fontSize: '10px', color: 'rgba(245,230,211,0.6)',
              minHeight: '70px',
            }}>
              {systemLogs.slice(0, 3).map((log, i) => (
                <div key={i} style={{ color: log.startsWith('★') ? '#00ffff' : 'inherit', marginBottom: '3px' }}>
                  &gt; {log}
                </div>
              ))}
              {systemLogs.length < 3 && (
                <span style={{ color: '#ff007f', animation: 'twinkle 0.8s ease-in-out infinite' }}>█</span>
              )}
            </div>
          </div>

          {/* Buttons (block 6) */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', ...blockStyle(66, 300) }}>
            <button
              onClick={triggerCheatCode}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translate(2px,2px)'
                e.currentTarget.style.boxShadow = '2px 2px 0px #00ffff'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translate(0,0)'
                e.currentTarget.style.boxShadow = '4px 4px 0px #00ffff'
              }}
              style={{
                background: '#ff007f', color: '#000',
                border: 'none', fontWeight: 'bold', textTransform: 'uppercase',
                padding: '12px 24px', fontFamily: 'monospace', fontSize: '12px',
                cursor: 'pointer', letterSpacing: '0.1em',
                boxShadow: '4px 4px 0px #00ffff', transition: 'all 0.1s ease',
                minHeight: 'unset', minWidth: 'unset',
              }}
            >
              ⚡ Cheat Code [×{clickCount}]
            </button>

            <button
              onClick={() => setNeonActive(!neonActive)}
              style={{
                background: 'transparent', color: '#00ffff',
                border: '1px solid #00ffff', textTransform: 'uppercase',
                padding: '12px 20px', fontFamily: 'monospace', fontSize: '12px',
                cursor: 'pointer', letterSpacing: '0.1em',
                transition: 'all 0.2s ease',
                minHeight: 'unset', minWidth: 'unset',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#00ffff'
                e.currentTarget.style.color = '#000'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = '#00ffff'
              }}
            >
              {neonActive ? '◉ Disable Glow' : '◎ Enable Glow'}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop 2-column layout */}
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
