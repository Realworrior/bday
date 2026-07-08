import { useEffect, useState } from 'react'

function getTimeLeft() {
  const birthday = new Date('2026-07-11T00:00:00')
  const now = new Date()
  const diff = birthday.getTime() - now.getTime()

  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, past: true }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
    past: false,
  }
}

function Digit({ value, label }: { value: number; label: string }) {
  const [prev, setPrev] = useState(value)
  const [flipping, setFlipping] = useState(false)

  useEffect(() => {
    if (value !== prev) {
      setFlipping(true)
      setTimeout(() => {
        setPrev(value)
        setFlipping(false)
      }, 300)
    }
  }, [value, prev])

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{
        position: 'relative',
        width: 'clamp(70px, 14vw, 120px)',
        height: 'clamp(80px, 16vw, 140px)',
        background: 'linear-gradient(160deg, rgba(26,15,36,0.95), rgba(17,10,24,0.9))',
        border: '1px solid rgba(201,149,110,0.2)',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
      }}>
        {/* Top half shine */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '50%',
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.03), transparent)',
          borderRadius: '12px 12px 0 0',
          zIndex: 1,
        }} />
        {/* Divider */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: 0, right: 0,
          height: '1px',
          background: 'rgba(0,0,0,0.5)',
          zIndex: 2,
        }} />
        <span className="playfair" style={{
          fontSize: 'clamp(36px, 7vw, 64px)',
          fontWeight: 700,
          color: '#f5e6d3',
          transform: flipping ? 'scale(0.85) rotateX(90deg)' : 'scale(1) rotateX(0deg)',
          transition: 'transform 0.3s ease',
          display: 'block',
          lineHeight: 1,
        }}>
          {String(prev).padStart(2, '0')}
        </span>
        {/* Gold accent corner */}
        <div style={{
          position: 'absolute',
          top: 8, right: 8,
          width: 4, height: 4,
          borderRadius: '50%',
          background: 'rgba(201,149,110,0.4)',
        }} />
      </div>
      <div style={{
        marginTop: '12px',
        fontSize: '10px',
        letterSpacing: '0.35em',
        color: '#c9956e',
        textTransform: 'uppercase',
      }}>
        {label}
      </div>
    </div>
  )
}

export function CountdownSection() {
  const [time, setTime] = useState(getTimeLeft())
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setTime(getTimeLeft()), 1000)
    setTimeout(() => setVisible(true), 200)
    return () => clearInterval(timer)
  }, [])

  const isPast = time.past

  return (
    <section style={{
      padding: '120px 24px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, transparent, rgba(42,21,53,0.15), transparent)',
      }} />

      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{
          fontSize: '10px',
          letterSpacing: '0.6em',
          color: '#c9956e',
          textTransform: 'uppercase',
          marginBottom: '16px',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.8s ease',
        }}>
          {isPast ? 'The Day Has Arrived' : 'Counting Down To'}
        </div>
        <h2 className="playfair" style={{
          fontSize: 'clamp(32px, 5vw, 52px)',
          color: '#f5e6d3',
          fontStyle: 'italic',
          fontWeight: 400,
          marginBottom: '16px',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.8s ease 0.1s',
        }}>
          {isPast ? "Happy Birthday, Fundi! 🎂" : "Your Special Day"}
        </h2>
        <div className="cormorant" style={{
          fontSize: 'clamp(16px, 2.5vw, 22px)',
          color: 'rgba(201,149,110,0.7)',
          fontStyle: 'italic',
          marginBottom: '64px',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.8s ease 0.2s',
        }}>
          July 11, 2026
        </div>

        {!isPast ? (
          <div style={{
            display: 'flex',
            gap: 'clamp(12px, 3vw, 32px)',
            justifyContent: 'center',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.8s ease 0.3s',
          }}>
            <Digit value={time.days} label="Days" />
            <div className="playfair" style={{
              fontSize: 'clamp(32px, 6vw, 56px)',
              color: 'rgba(201,149,110,0.4)',
              marginTop: 'clamp(20px, 3vw, 36px)',
            }}>:</div>
            <Digit value={time.hours} label="Hours" />
            <div className="playfair" style={{
              fontSize: 'clamp(32px, 6vw, 56px)',
              color: 'rgba(201,149,110,0.4)',
              marginTop: 'clamp(20px, 3vw, 36px)',
            }}>:</div>
            <Digit value={time.minutes} label="Minutes" />
            <div className="playfair" style={{
              fontSize: 'clamp(32px, 6vw, 56px)',
              color: 'rgba(201,149,110,0.4)',
              marginTop: 'clamp(20px, 3vw, 36px)',
            }}>:</div>
            <Digit value={time.seconds} label="Seconds" />
          </div>
        ) : (
          <div style={{
            fontSize: 'clamp(48px, 8vw, 96px)',
            animation: 'float 3s ease-in-out infinite',
          }}>
            🎉🎂✨
          </div>
        )}

        <p style={{
          marginTop: '56px',
          fontSize: '15px',
          color: 'rgba(245,230,211,0.45)',
          fontStyle: 'italic',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.8s ease 0.5s',
        }}>
          Every second is a gift. So are you.
        </p>
      </div>
    </section>
  )
}
