import { useEffect, useRef, useState } from 'react'

export function HeroSection() {
  const [visible, setVisible] = useState(false)
  const [glitchText, setGlitchText] = useState('CARO')
  const [systemLogs, setSystemLogs] = useState<string[]>([])
  const [clickCount, setClickCount] = useState(0)
  const [neonActive, setNeonActive] = useState(true)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })
  const ref = useRef<HTMLDivElement>(null)

  const heroImage = '/imgss/WhatsApp Image 2026-07-08 at 16.53.50.jpeg'

  // Glitch effect on name
  useEffect(() => {
    const chars = 'C4R0_QU33N_99_★_⚡_✦'
    const interval = setInterval(() => {
      if (Math.random() > 0.82) {
        const glitched = 'CARO'
          .split('')
          .map(char => (Math.random() > 0.65 ? chars[Math.floor(Math.random() * chars.length)] : char))
          .join('')
        setGlitchText(glitched)
        setTimeout(() => setGlitchText('CARO'), 150)
      }
    }, 400)
    return () => clearInterval(interval)
  }, [])

  // Simulated system logs
  useEffect(() => {
    const logs = [
      'INITIALIZING SLAY ENGINE v1.0.7...',
      'SCANNING BEAUTY AND CHARM RADAR... [100%]',
      'WARN: VIBE FIELD HAS SURPASSED SAFE LIMITS.',
      'BIRTHDAY CHEAT CODES ENABLED.',
      'SYSTEM PROFILE: FOREVER ICONIC.',
    ]
    
    logs.forEach((log, index) => {
      setTimeout(() => {
        setSystemLogs(prev => [...prev, log])
      }, (index + 1) * 800)
    })
    
    setTimeout(() => setVisible(true), 100)
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    })
  }

  // Interactive buttons trigger fun cyber alarms
  const triggerCheatCode = () => {
    setClickCount(c => c + 1)
    const easterEggs = [
      '★ CHEAT ENABLED: GODDESS MODE ACTIVE ★',
      '★ NEON POWER CHARGED TO 999% ★',
      '★ ALL EYES ENGAGED ON THE BIRTHDAY QUEEN ★',
      '★ UNLIMITED CHAMPAGNE PROTOCOL SHIELD ON ★',
    ]
    const randomLog = easterEggs[Math.floor(Math.random() * easterEggs.length)]
    setSystemLogs(prev => [randomLog, ...prev.slice(0, 4)])
  }

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
        borderBottom: '2px solid #ff007f', // hot pink cyber border
      }}
    >
      {/* Cyber Grid Background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.12,
        backgroundImage: `
          linear-gradient(to right, #00ffff 1px, transparent 1px),
          linear-gradient(to bottom, #ff007f 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        pointerEvents: 'none',
      }} />

      {/* Retro target crosshair behind main image */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'min(700px, 95vw)',
        height: 'min(700px, 95vw)',
        border: '1px dashed rgba(0, 255, 255, 0.15)',
        borderRadius: '50%',
        pointerEvents: 'none',
      }}>
        {/* Outer orbital ring */}
        <div style={{
          position: 'absolute',
          inset: '30px',
          border: '1px solid rgba(255, 0, 127, 0.08)',
          borderRadius: '50%',
          animation: 'spin-slow 25s linear infinite',
        }} />
        {/* Core target lines */}
        <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: 'rgba(0,255,255,0.1)' }} />
        <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px', background: 'rgba(0,255,255,0.1)' }} />
      </div>

      {/* Main Scattered Dashboard Container */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
        maxWidth: '1200px',
        width: '100%',
        zIndex: 2,
      }} className="hero-inner">
        
        {/* Mobile-first: Column layout that switches to row on large screens */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '36px',
          alignItems: 'center',
        }} className="hero-grid">

          {/* Over-the-top Cyberpunk Poster Card */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            position: 'relative',
            opacity: visible ? 1 : 0,
            transform: visible ? 'scale(1)' : 'scale(0.92)',
            transition: 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          }} className="hero-photo-wrapper">
            
            {/* Liquid neon backing */}
            <div style={{
              position: 'absolute',
              inset: '-8px',
              background: 'linear-gradient(135deg, #ff007f, #00ffff, #ff007f)',
              borderRadius: '2px',
              opacity: neonActive ? 0.75 : 0.2,
              filter: 'blur(10px)',
              transition: 'opacity 0.3s ease',
            }} />

            {/* Industrial brutalist image frame */}
            <div style={{
              background: '#0a0512',
              border: '3px solid #00ffff',
              padding: '12px 12px 24px',
              boxShadow: '8px 8px 0px #ff007f',
              position: 'relative',
              width: 'min(330px, 85vw)',
            }}>
              {/* Scanlines layer */}
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
                backgroundSize: '100% 4px, 6px 100%',
                pointerEvents: 'none',
                zIndex: 5,
              }} />

              {/* Target HUD corners */}
              <div style={{ position: 'absolute', top: 4, left: 4, color: '#00ffff', fontFamily: 'monospace', fontSize: '9px' }}>[HUD_ACTIVE]</div>
              <div style={{ position: 'absolute', top: 4, right: 4, color: '#ff007f', fontFamily: 'monospace', fontSize: '9px' }}>R-99</div>
              
              {/* Main Overhauled Photo */}
              <img
                src={heroImage}
                alt="Caro the Birthday Queen"
                style={{
                  width: '100%',
                  aspectRatio: '4/5',
                  objectFit: 'cover',
                  border: '2px solid #ff007f',
                  display: 'block',
                  filter: 'contrast(1.08) brightness(1.03)',
                }}
              />

              {/* Glitch Tech Footer Stamp */}
              <div style={{
                marginTop: '12px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontFamily: 'monospace',
                color: '#f5e6d3',
                fontSize: '10px',
              }}>
                <div>LAT: 52° 31' 11'' N</div>
                <div style={{ color: '#00ffff' }}>LNG: 13° 24' 36'' E</div>
              </div>

              {/* Angle scale ornament */}
              <div style={{
                position: 'absolute',
                bottom: '-28px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: '#ff007f',
                color: '#000',
                fontFamily: 'monospace',
                fontSize: '10px',
                fontWeight: 'bold',
                padding: '2px 10px',
                clipPath: 'polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)',
                whiteSpace: 'nowrap',
              }}>
                SLAY ENGINE [ACTIVE]
              </div>
            </div>
          </div>

          {/* Brutalist Bold Typography & HUD Stats Panel */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease 0.2s',
          }}>
            {/* Header Stamp */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              fontFamily: 'monospace',
              color: '#00ffff',
              fontSize: '11px',
              letterSpacing: '0.25em',
            }}>
              <span style={{ display: 'inline-block', width: '8px', height: '8px', background: '#ff007f' }} />
              SYSTEM PROTOCOL: BIRTHDAY_QUEEN_v2.6
            </div>

            {/* Kinetic / Giant Brutalist Typography */}
            <div style={{ position: 'relative' }}>
              {/* Background massive stroke text */}
              <div className="playfair" style={{
                fontSize: 'clamp(54px, 15vw, 110px)',
                fontWeight: 900,
                color: 'transparent',
                WebkitTextStroke: '1px rgba(255, 0, 127, 0.2)',
                lineHeight: 0.85,
                position: 'absolute',
                top: '-15px',
                left: '5px',
                zIndex: -1,
                pointerEvents: 'none',
              }}>
                JULY 11
              </div>

              <h1 className="gochi" style={{
                fontSize: 'clamp(52px, 14vw, 100px)',
                lineHeight: 0.9,
                color: '#f5e6d3',
                transform: 'rotate(-2deg)',
                margin: '10px 0',
                textShadow: '3px 3px 0px #ff007f, -1px -1px 0px #00ffff',
              }}>
                Happy
              </h1>

              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <h1 className="playfair" style={{
                  fontSize: 'clamp(56px, 15vw, 115px)',
                  fontWeight: 900,
                  lineHeight: 0.85,
                  letterSpacing: '-0.02em',
                  color: '#fff',
                  background: 'linear-gradient(90deg, #ff007f, #00ffff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  {glitchText}
                </h1>
                
                {/* Cyber badge */}
                <div style={{
                  background: 'rgba(0,255,255,0.1)',
                  border: '1px solid #00ffff',
                  color: '#00ffff',
                  fontSize: '11px',
                  fontFamily: 'monospace',
                  padding: '2px 8px',
                  borderRadius: '2px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                }}>
                  Lvl 99
                </div>
              </div>
            </div>

            {/* UI/UX Cheat Code Stats Board */}
            <div style={{
              background: 'rgba(10, 5, 18, 0.8)',
              border: '1px solid rgba(0, 255, 255, 0.25)',
              borderRadius: '4px',
              padding: '16px',
              fontFamily: 'monospace',
              fontSize: '12px',
              boxShadow: 'inset 0 0 10px rgba(0,255,255,0.05)',
            }}>
              <div style={{ color: '#ff007f', borderBottom: '1px dashed rgba(255,0,127,0.3)', paddingBottom: '6px', marginBottom: '10px', fontWeight: 'bold' }}>
                [CARO_PROFILE_METRIC]
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px', gap: '8px', color: '#f5e6d3' }}>
                <div>CHARM STRENGTH:</div>
                <div style={{ color: '#00ffff' }}>██████████ 999+</div>
                <div>SLAY FACTOR:</div>
                <div style={{ color: '#ff007f' }}>██████████ 100%</div>
                <div>VIBE FIELD:</div>
                <div style={{ color: '#e8c4a0' }}>CHAOTIC GOOD</div>
                <div>LUCK GENERATOR:</div>
                <div style={{ color: '#00ffff' }}>MAX_CAPACITY</div>
              </div>
            </div>

            {/* Animated Console Logger */}
            <div style={{
              background: '#000',
              borderLeft: '3px solid #ff007f',
              padding: '10px 14px',
              fontFamily: 'monospace',
              fontSize: '10px',
              color: 'rgba(245,230,211,0.6)',
              minHeight: '75px',
            }}>
              {systemLogs.slice(0, 3).map((log, i) => (
                <div key={i} style={{ color: log.startsWith('★') ? '#00ffff' : 'inherit', marginBottom: '3px' }}>
                  &gt; {log}
                </div>
              ))}
            </div>

            {/* Interactive Cheat-Code Trigger */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                onClick={triggerCheatCode}
                style={{
                  background: '#ff007f',
                  color: '#000',
                  border: 'none',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  padding: '12px 24px',
                  fontFamily: 'monospace',
                  fontSize: '12px',
                  cursor: 'pointer',
                  letterSpacing: '0.1em',
                  boxShadow: '4px 4px 0px #00ffff',
                  transition: 'all 0.1s ease',
                  minHeight: 'unset',
                  minWidth: 'unset',
                }}
                onMouseDown={e => { e.currentTarget.style.transform = 'translate(2px, 2px)'; e.currentTarget.style.boxShadow = '2px 2px 0px #00ffff' }}
                onMouseUp={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '4px 4px 0px #00ffff' }}
              >
                ⚡ Trigger Cheat Code [x{clickCount}]
              </button>

              <button
                onClick={() => setNeonActive(!neonActive)}
                style={{
                  background: 'transparent',
                  color: '#00ffff',
                  border: '1px solid #00ffff',
                  textTransform: 'uppercase',
                  padding: '12px 20px',
                  fontFamily: 'monospace',
                  fontSize: '12px',
                  cursor: 'pointer',
                  letterSpacing: '0.1em',
                  transition: 'all 0.2s ease',
                  minHeight: 'unset',
                  minWidth: 'unset',
                }}
              >
                {neonActive ? 'Disable Glow' : 'Enable Glow'}
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Desktop Media Query overrides */}
      <style>{`
        @media (min-width: 850px) {
          .hero-grid {
            grid-template-columns: 1.1fr 1.3fr !important;
            gap: 60px !important;
          }
          .hero-photo-wrapper {
            justify-content: flex-end !important;
          }
        }
      `}</style>
    </section>
  )
}
