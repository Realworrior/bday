import { useEffect, useRef, useState } from 'react'

const messages = [
  {
    title: "To the most radiant soul",
    body: "There are people who walk into your life and change the temperature of the room. You're one of them, Fundi. Wherever you go, warmth follows.",
    symbol: "✦",
  },
  {
    title: "A woman like no other",
    body: "You carry yourself with a quiet confidence that speaks louder than words. Your presence is a gift that keeps on giving — to everyone lucky enough to know you.",
    symbol: "◈",
  },
  {
    title: "This is your season",
    body: "Another year older, another layer of magic added to who you already are. You bloom more beautifully every single time the calendar turns.",
    symbol: "❋",
  },
  {
    title: "From the heart",
    body: "On this day, the world became a better place when you arrived in it. And every day since, you've been proving that over and over again.",
    symbol: "✿",
  },
]

export function MessageSection() {
  const [active, setActive] = useState(0)
  const [visible, setVisible] = useState(false)
  const [animating, setAnimating] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const touchStartX = useRef<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimating(true)
      setTimeout(() => {
        setActive(a => (a + 1) % messages.length)
        setAnimating(false)
      }, 400)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const goTo = (i: number) => {
    if (i === active) return
    setAnimating(true)
    setTimeout(() => { setActive(i); setAnimating(false) }, 400)
  }

  // Swipe to change message
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 50) {
      const next = dx < 0
        ? (active + 1) % messages.length
        : (active - 1 + messages.length) % messages.length
      goTo(next)
    }
    touchStartX.current = null
  }

  const msg = messages[active]

  return (
    <section
      ref={ref}
      style={{
        padding: 'var(--section-v) var(--section-h)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background pattern */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          radial-gradient(circle at 20% 50%, rgba(139,58,107,0.08) 0%, transparent 50%),
          radial-gradient(circle at 80% 50%, rgba(201,149,110,0.06) 0%, transparent 50%)
        `,
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '40px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s ease',
        }}>
          <div style={{
            fontSize: '10px',
            letterSpacing: '0.6em',
            color: '#c9956e',
            textTransform: 'uppercase',
            marginBottom: '14px',
          }}>
            Words from the heart
          </div>
          <h2 className="playfair" style={{
            fontSize: 'clamp(26px, 6vw, 48px)',
            color: '#f5e6d3',
            fontStyle: 'italic',
            fontWeight: 400,
          }}>
            For You, Caro
          </h2>
        </div>

        {/* Card with swipe support */}
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{
            position: 'relative',
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.8s ease 0.2s',
          }}
        >
          <div style={{
            background: 'linear-gradient(135deg, rgba(17,10,24,0.9), rgba(26,15,36,0.95))',
            border: '1px solid rgba(201,149,110,0.15)',
            borderRadius: '18px',
            padding: 'clamp(28px, 7vw, 72px)',
            textAlign: 'center',
            backdropFilter: 'blur(20px)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Corner ornaments */}
            <div style={{ position: 'absolute', top: 16, left: 16, color: 'rgba(201,149,110,0.3)', fontSize: '20px' }}>❧</div>
            <div style={{ position: 'absolute', top: 16, right: 16, color: 'rgba(201,149,110,0.3)', fontSize: '20px', transform: 'scaleX(-1)' }}>❧</div>
            <div style={{ position: 'absolute', bottom: 16, left: 16, color: 'rgba(201,149,110,0.3)', fontSize: '20px', transform: 'scaleY(-1)' }}>❧</div>
            <div style={{ position: 'absolute', bottom: 16, right: 16, color: 'rgba(201,149,110,0.3)', fontSize: '20px', transform: 'scale(-1)' }}>❧</div>

            <div style={{
              fontSize: 'clamp(28px, 8vw, 40px)',
              marginBottom: '20px',
              opacity: animating ? 0 : 1,
              transform: animating ? 'scale(0.8)' : 'scale(1)',
              transition: 'all 0.4s ease',
              color: '#c9956e',
            }}>
              {msg.symbol}
            </div>
            <h3 className="playfair" style={{
              fontSize: 'clamp(18px, 5vw, 32px)',
              color: '#f5e6d3',
              fontStyle: 'italic',
              marginBottom: '18px',
              opacity: animating ? 0 : 1,
              transform: animating ? 'translateY(-10px)' : 'translateY(0)',
              transition: 'all 0.4s ease',
            }}>
              {msg.title}
            </h3>
            <p style={{
              fontSize: 'clamp(14px, 4vw, 20px)',
              lineHeight: 1.85,
              color: 'rgba(245,230,211,0.7)',
              fontWeight: 300,
              fontStyle: 'italic',
              opacity: animating ? 0 : 1,
              transform: animating ? 'translateY(10px)' : 'translateY(0)',
              transition: 'all 0.4s ease 0.05s',
            }}>
              "{msg.body}"
            </p>
          </div>

          {/* Dot indicators — larger touch targets */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            marginTop: '28px',
          }}>
            {messages.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                style={{
                  width: i === active ? '28px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: i === active ? '#c9956e' : 'rgba(201,149,110,0.25)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  padding: 0,
                  /* Expanded touch target */
                  position: 'relative',
                  minHeight: 'unset',
                  minWidth: 'unset',
                }}
                aria-label={`Message ${i + 1}`}
              />
            ))}
          </div>

          {/* Swipe hint */}
          <div style={{
            textAlign: 'center',
            marginTop: 12,
            fontSize: '10px',
            letterSpacing: '0.2em',
            color: 'rgba(201,149,110,0.3)',
            textTransform: 'uppercase',
          }}>
            swipe or tap to read more
          </div>
        </div>
      </div>
    </section>
  )
}
