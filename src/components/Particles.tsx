import { useMemo } from 'react'

export function Particles() {
  const particles = useMemo(() => {
    return [...Array(30)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: 4 + Math.random() * 8,
      duration: 8 + Math.random() * 16,
      delay: Math.random() * 10,
      shape: i % 4,
    }))
  }, [])

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      {particles.map(p => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            bottom: '-20px',
            ...(p.shape === 0 ? {
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(201,149,110,0.8), transparent)',
            } : p.shape === 1 ? {
              borderRadius: '50% 0 50% 0',
              background: 'rgba(212,88,138,0.6)',
              transform: 'rotate(45deg)',
            } : p.shape === 2 ? {
              borderRadius: '50%',
              background: 'rgba(139,58,107,0.5)',
              boxShadow: '0 0 6px rgba(139,58,107,0.8)',
            } : {
              width: 1,
              height: p.size * 3,
              background: 'linear-gradient(to top, rgba(201,149,110,0.6), transparent)',
            }),
          }}
        />
      ))}
    </div>
  )
}
