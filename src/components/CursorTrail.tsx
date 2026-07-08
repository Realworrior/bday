import { useEffect, useRef } from 'react'

interface TrailDot {
  x: number
  y: number
  age: number
  color: string
}

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dotsRef = useRef<TrailDot[]>([])
  const mouseRef = useRef({ x: -999, y: -999 })
  const frameRef = useRef(0)

  const COLORS = ['#ff007f', '#00ffff', '#c9956e', '#d4588a', '#e8c4a0', '#8b3a6b']
  const MAX_DOTS = 40

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Size canvas to full viewport
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }

      const color = COLORS[Math.floor(Math.random() * COLORS.length)]
      dotsRef.current.push({ x: e.clientX, y: e.clientY, age: 0, color })

      // Keep trail capped
      if (dotsRef.current.length > MAX_DOTS) {
        dotsRef.current.shift()
      }
    }

    window.addEventListener('mousemove', onMouseMove)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Age all dots, remove faded ones
      dotsRef.current = dotsRef.current.filter(d => d.age < 1)
      dotsRef.current.forEach((dot, i) => {
        dot.age += 0.03 + i * 0.001

        const alpha = 1 - dot.age
        const radius = (1 - dot.age) * 6 + 1

        ctx.beginPath()
        ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2)

        // Glow effect
        const grd = ctx.createRadialGradient(dot.x, dot.y, 0, dot.x, dot.y, radius * 3)
        grd.addColorStop(0, dot.color.replace(')', `,${alpha})`).replace('rgb', 'rgba').replace('#', 'rgba(') + `,${alpha})`)
        grd.addColorStop(1, 'transparent')

        // Simple fill without complex gradient parsing
        ctx.fillStyle = dot.color
        ctx.globalAlpha = alpha * 0.85
        ctx.shadowColor = dot.color
        ctx.shadowBlur = 12
        ctx.fill()
      })

      ctx.globalAlpha = 1
      ctx.shadowBlur = 0

      frameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(frameRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 99999,
        mixBlendMode: 'screen',
      }}
    />
  )
}
