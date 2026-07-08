import { useState } from 'react'

interface CurtainProps {
  onReveal: () => void
}

export function Curtain({ onReveal }: CurtainProps) {
  const [opening, setOpening] = useState(false)
  const [pulse, setPulse] = useState(false)

  const handleClick = () => {
    setOpening(true)
    setTimeout(onReveal, 1200)
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Left curtain panel */}
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '50%',
          height: '100%',
          background: 'linear-gradient(135deg, #06030a 0%, #1a0a2e 50%, #2a0f3d 100%)',
          zIndex: 2,
          transform: opening ? 'translateX(-100%)' : 'translateX(0)',
          transition: 'transform 1.2s cubic-bezier(0.77,0,0.175,1)',
          borderRight: '1px solid rgba(201,149,110,0.3)',
        }}
      >
        <div style={{
          position: 'absolute',
          right: 0, top: 0, bottom: 0,
          width: '60px',
          background: 'linear-gradient(to right, transparent, rgba(201,149,110,0.08))',
        }} />
        {/* Velvet texture lines */}
        {[...Array(8)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            top: 0, bottom: 0,
            left: `${10 + i * 10}%`,
            width: '1px',
            background: `rgba(201,149,110,${0.03 + i * 0.01})`,
          }} />
        ))}
      </div>

      {/* Right curtain panel */}
      <div
        style={{
          position: 'absolute',
          top: 0, right: 0,
          width: '50%',
          height: '100%',
          background: 'linear-gradient(225deg, #06030a 0%, #1a0a2e 50%, #2a0f3d 100%)',
          zIndex: 2,
          transform: opening ? 'translateX(100%)' : 'translateX(0)',
          transition: 'transform 1.2s cubic-bezier(0.77,0,0.175,1)',
          borderLeft: '1px solid rgba(201,149,110,0.3)',
        }}
      >
        <div style={{
          position: 'absolute',
          left: 0, top: 0, bottom: 0,
          width: '60px',
          background: 'linear-gradient(to left, transparent, rgba(201,149,110,0.08))',
        }} />
        {[...Array(8)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            top: 0, bottom: 0,
            right: `${10 + i * 10}%`,
            width: '1px',
            background: `rgba(201,149,110,${0.03 + i * 0.01})`,
          }} />
        ))}
      </div>

      {/* Center reveal button */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          textAlign: 'center',
          opacity: opening ? 0 : 1,
          transition: 'opacity 0.4s ease',
          transform: opening ? 'scale(0.8)' : 'scale(1)',
        }}
      >
        <div style={{
          marginBottom: '24px',
          color: 'rgba(201,149,110,0.6)',
          letterSpacing: '0.4em',
          fontSize: '11px',
          fontFamily: "'DM Sans', sans-serif",
          textTransform: 'uppercase',
        }}>
          A gift awaits you
        </div>

        <h1 className="playfair" style={{
          fontSize: 'clamp(36px, 6vw, 72px)',
          fontStyle: 'italic',
          fontWeight: 400,
          color: 'transparent',
          background: 'linear-gradient(135deg, #c9956e, #e8c4a0, #c9956e)',
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          animation: 'shimmer 3s linear infinite',
          marginBottom: '8px',
          lineHeight: 1.2,
        }}>
          Caro
        </h1>
        <div className="playfair" style={{
          fontSize: 'clamp(14px, 2vw, 18px)',
          color: 'rgba(245,230,211,0.5)',
          letterSpacing: '0.2em',
          marginBottom: '48px',
        }}>
          — Fundi —
        </div>

        <button
          onClick={handleClick}
          onMouseEnter={() => setPulse(true)}
          onMouseLeave={() => setPulse(false)}
          style={{
            background: 'transparent',
            border: '1px solid rgba(201,149,110,0.5)',
            color: '#c9956e',
            padding: '16px 40px',
            fontSize: '12px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            borderRadius: '2px',
            transition: 'all 0.3s ease',
            animation: pulse ? 'pulse-glow 1.5s ease-in-out infinite' : 'pulse-glow 3s ease-in-out infinite',
            background: pulse ? 'rgba(201,149,110,0.08)' : 'transparent',
          }}
        >
          Open Your Gift
        </button>

        {/* Decorative orbiting ring */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '300px',
          height: '300px',
          border: '1px solid rgba(201,149,110,0.1)',
          borderRadius: '50%',
          animation: 'spin-slow 20s linear infinite',
          pointerEvents: 'none',
        }}>
          {[0, 90, 180, 270].map(deg => (
            <div key={deg} style={{
              position: 'absolute',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#c9956e',
              top: '50%',
              left: '50%',
              transform: `rotate(${deg}deg) translateX(150px) translate(-50%, -50%)`,
              animation: `twinkle ${1 + deg / 180}s ease-in-out infinite`,
            }} />
          ))}
        </div>

        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '400px',
          height: '400px',
          border: '1px solid rgba(139,58,107,0.08)',
          borderRadius: '50%',
          animation: 'spin-slow 30s linear infinite reverse',
          pointerEvents: 'none',
        }} />
      </div>
    </div>
  )
}
