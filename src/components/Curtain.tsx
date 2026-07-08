import { useState, useEffect } from 'react'

interface CurtainProps {
  onReveal: () => void
}

export function Curtain({ onReveal }: CurtainProps) {
  const [opening, setOpening] = useState(false)
  const [exploding, setExploding] = useState(false)
  const [glitchText, setGlitchText] = useState('CARO')
  const [countdown, setCountdown] = useState(3)
  const [warningActive, setWarningActive] = useState(true)

  // Glitch effect on the veil
  useEffect(() => {
    const chars = 'C4R0_QU33N_99_★_⚡_✦'
    const interval = setInterval(() => {
      if (Math.random() > 0.75) {
        const glitched = 'CARO'
          .split('')
          .map(char => (Math.random() > 0.6 ? chars[Math.floor(Math.random() * chars.length)] : char))
          .join('')
        setGlitchText(glitched)
        setTimeout(() => setGlitchText('CARO'), 120)
      }
    }, 500)
    return () => clearInterval(interval)
  }, [])

  // Warning text blinker
  useEffect(() => {
    const timer = setInterval(() => {
      setWarningActive(w => !w)
    }, 600)
    return () => clearInterval(timer)
  }, [])

  const handleUnlock = () => {
    setExploding(true)
    
    // Typographic explosion: counts down and shatters
    let current = 3
    const interval = setInterval(() => {
      current -= 1
      setCountdown(current)
      if (current === 0) {
        clearInterval(interval)
        setOpening(true)
        setTimeout(onReveal, 1100)
      }
    }, 300)
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#040206',
        overflow: 'hidden',
      }}
    >
      {/* Cyber Grid Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.1,
        backgroundImage: `
          linear-gradient(to right, #00ffff 1px, transparent 1px),
          linear-gradient(to bottom, #ff007f 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        zIndex: 1,
      }} />

      {/* Retro CRT Scanlines */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.4) 50%)',
        backgroundSize: '100% 4px',
        zIndex: 2,
        pointerEvents: 'none',
      }} />

      {/* Left panel */}
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '50%',
          height: '100%',
          background: 'linear-gradient(135deg, #06030a 0%, #160826 60%, #0d0418 100%)',
          zIndex: 3,
          transform: opening ? 'translateX(-100%)' : 'translateX(0)',
          transition: 'transform 1.1s cubic-bezier(0.77,0,0.175,1)',
          borderRight: '2px solid #00ffff',
          boxShadow: '0 0 30px rgba(0,255,255,0.2)',
        }}
      >
        {/* Tech line markings */}
        {[...Array(6)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            top: 0, bottom: 0,
            left: `${20 + i * 15}%`,
            width: '1px',
            background: `rgba(0,255,255,${0.03 + i * 0.01})`,
          }} />
        ))}
      </div>

      {/* Right panel */}
      <div
        style={{
          position: 'absolute',
          top: 0, right: 0,
          width: '50%',
          height: '100%',
          background: 'linear-gradient(225deg, #06030a 0%, #160826 60%, #0d0418 100%)',
          zIndex: 3,
          transform: opening ? 'translateX(100%)' : 'translateX(0)',
          transition: 'transform 1.1s cubic-bezier(0.77,0,0.175,1)',
          borderLeft: '2px solid #ff007f',
          boxShadow: '0 0 30px rgba(255,0,127,0.2)',
        }}
      >
        {/* Tech line markings */}
        {[...Array(6)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            top: 0, bottom: 0,
            right: `${20 + i * 15}%`,
            width: '1px',
            background: `rgba(255,0,127,${0.03 + i * 0.01})`,
          }} />
        ))}
      </div>

      {/* Center lock & unlock UI */}
      <div
        style={{
          position: 'relative',
          zIndex: 5,
          textAlign: 'center',
          opacity: opening ? 0 : 1,
          transform: exploding ? `scale(${1 + (3 - countdown) * 1.5})` : 'scale(1)',
          transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.4s ease',
          pointerEvents: exploding ? 'none' : 'auto',
        }}
      >
        {/* System Alert Flasher */}
        <div style={{
          marginBottom: '20px',
          color: warningActive ? '#ff007f' : 'rgba(255,255,255,0.4)',
          letterSpacing: '0.4em',
          fontSize: '11px',
          fontFamily: 'monospace',
          textTransform: 'uppercase',
          fontWeight: 'bold',
          transition: 'color 0.2s ease',
        }}>
          [ALERT: QUEEN DETECTED IN VIBE MATRIX]
        </div>

        {/* Glitching Title */}
        <h1 className="playfair" style={{
          fontSize: 'clamp(44px, 8vw, 88px)',
          fontWeight: 900,
          color: 'transparent',
          background: 'linear-gradient(135deg, #00ffff, #ff007f, #00ffff)',
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          animation: 'shimmer 2.5s linear infinite',
          lineHeight: 1.1,
          letterSpacing: '0.05em',
          textShadow: '0 0 20px rgba(0,255,255,0.3)',
        }}>
          {glitchText}
        </h1>

        <div className="handwritten" style={{
          fontSize: 'clamp(18px, 4vw, 24px)',
          color: '#e8c4a0',
          letterSpacing: '0.15em',
          marginTop: '10px',
          marginBottom: '40px',
        }}>
          ✦ Reigning Since 99 ✦
        </div>

        {/* Outer Orbiting Dial Rings */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '320px',
          height: '320px',
          border: '1px dashed rgba(0, 255, 255, 0.3)',
          borderRadius: '50%',
          animation: 'spin-slow 20s linear infinite',
          pointerEvents: 'none',
        }}>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '280px',
            height: '280px',
            border: '2px solid rgba(255, 0, 127, 0.2)',
            borderRadius: '50%',
            animation: 'spin-slow 12s linear infinite reverse',
          }} />
        </div>

        {/* Pulsating Lock Button */}
        <button
          onClick={handleUnlock}
          style={{
            background: 'rgba(255, 0, 127, 0.1)',
            border: '2px solid #ff007f',
            color: '#ff007f',
            padding: '18px 44px',
            fontSize: '12px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            fontFamily: 'monospace',
            fontWeight: 'bold',
            borderRadius: '4px',
            boxShadow: '0 0 25px rgba(255, 0, 127, 0.4)',
            transition: 'all 0.3s ease',
            animation: 'pulse-glow 2s ease-in-out infinite',
            minHeight: 'unset',
            minWidth: 'unset',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#ff007f'
            e.currentTarget.style.color = '#000'
            e.currentTarget.style.boxShadow = '0 0 40px #ff007f, 0 0 80px #00ffff'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(255, 0, 127, 0.1)'
            e.currentTarget.style.color = '#ff007f'
            e.currentTarget.style.boxShadow = '0 0 25px rgba(255, 0, 127, 0.4)'
          }}
        >
          {exploding ? `SHATTERING SYSTEM IN ${countdown}...` : '🔓 INITIALIZE SYSTEM SHATTER'}
        </button>

        {/* Industrial telemetry stamps */}
        <div style={{
          position: 'absolute',
          bottom: '-70px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '24px',
          fontFamily: 'monospace',
          fontSize: '9px',
          color: 'rgba(0, 255, 255, 0.4)',
          whiteSpace: 'nowrap',
        }}>
          <div>CODE: SLAY_99</div>
          <div>SEC_LEVEL: QUEEN_CLEARANCE</div>
          <div>EST: JULY_11</div>
        </div>
      </div>
    </div>
  )
}
