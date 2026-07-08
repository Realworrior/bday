import { useEffect, useRef, useState, useCallback } from 'react'

/* ─────────────────────────────────────────────
   Media catalogue – all 19 photos + 2 videos + Digital journaling mockup as background or sticker!
   ───────────────────────────────────────────── */
type MediaItem = {
  id: string
  src: string
  type: 'photo' | 'video'
  caption: string
  sub: string
  category: 'sunkissed' | 'glamour' | 'playful' | 'video'
  handnote?: string
  tapeColor?: string
  tapeAngle?: number
}

const BASE = '/imgss/'

const initialMedia: Omit<MediaItem, 'id'>[] = [
  { src: `${BASE}WhatsApp Image 2026-07-08 at 16.53.48 (1).jpeg`, type: 'photo', caption: 'Golden Hour Glow', sub: 'The sun bows to you', category: 'sunkissed', handnote: 'That light! ☀️✨', tapeColor: 'rgba(212,88,138,0.3)', tapeAngle: -10 },
  { src: `${BASE}WhatsApp Image 2026-07-08 at 16.53.48.jpeg`, type: 'photo', caption: 'Radiance Untamed', sub: 'Effortless & luminous', category: 'sunkissed', handnote: 'Serving face 💅', tapeColor: 'rgba(201,149,110,0.3)', tapeAngle: 15 },
  { src: `${BASE}WhatsApp Image 2026-07-08 at 16.53.49 (1).jpeg`, type: 'photo', caption: 'Pure Joy', sub: 'Your smile heals everything', category: 'playful', handnote: 'Literally obsessed with this smile! ❤️', tapeColor: 'rgba(139,58,107,0.35)', tapeAngle: -5 },
  { src: `${BASE}WhatsApp Image 2026-07-08 at 16.53.49 (2).jpeg`, type: 'photo', caption: 'Unbothered Queen', sub: 'Born to stand out', category: 'glamour', handnote: '10/10 vibe 👑', tapeColor: 'rgba(201,149,110,0.3)', tapeAngle: 12 },
  { src: `${BASE}WhatsApp Image 2026-07-08 at 16.53.49 (3).jpeg`, type: 'photo', caption: 'Free Spirit', sub: 'Wild & wonderfully you', category: 'playful', handnote: 'A whole mood!', tapeColor: 'rgba(212,88,138,0.25)', tapeAngle: -18 },
  { src: `${BASE}WhatsApp Image 2026-07-08 at 16.53.49.jpeg`, type: 'photo', caption: 'Soft Power', sub: 'Quiet, unshakeable strength', category: 'glamour', handnote: 'So graceful...', tapeColor: 'rgba(139,58,107,0.3)', tapeAngle: 8 },
  { src: `${BASE}WhatsApp Image 2026-07-08 at 16.53.50 (1).jpeg`, type: 'photo', caption: 'Effortlessly You', sub: 'Natural beauty, unmatched', category: 'sunkissed', handnote: 'No makeup, just magic ✨', tapeColor: 'rgba(201,149,110,0.3)', tapeAngle: -12 },
  { src: `${BASE}WhatsApp Image 2026-07-08 at 16.53.50 (2).jpeg`, type: 'photo', caption: 'Iconic Frame', sub: 'A moment frozen in gold', category: 'glamour', handnote: 'Excuse me? Gorgeous!', tapeColor: 'rgba(212,88,138,0.35)', tapeAngle: 5 },
  { src: `${BASE}WhatsApp Image 2026-07-08 at 16.53.50 (3).jpeg`, type: 'photo', caption: 'Dream Sequence', sub: 'Every shot, a masterpiece', category: 'sunkissed', handnote: 'Pure model energy 📸', tapeColor: 'rgba(139,58,107,0.3)', tapeAngle: -15 },
  { src: `${BASE}WhatsApp Image 2026-07-08 at 16.53.50 (4).jpeg`, type: 'photo', caption: 'Crown Season', sub: 'Always at the top', category: 'glamour', handnote: 'Yes queen! 👑💅', tapeColor: 'rgba(201,149,110,0.35)', tapeAngle: 10 },
  { src: `${BASE}WhatsApp Image 2026-07-08 at 16.53.50.jpeg`, type: 'photo', caption: 'The Vibe', sub: 'Unfiltered & perfect', category: 'playful', handnote: 'This is so Caro ❤️', tapeColor: 'rgba(212,88,138,0.3)', tapeAngle: -8 },
  { src: `${BASE}WhatsApp Image 2026-07-08 at 16.53.51 (1).jpeg`, type: 'photo', caption: 'Magnetic Energy', sub: 'You pull the room in', category: 'glamour', handnote: 'Too hot to handle! 🔥', tapeColor: 'rgba(139,58,107,0.35)', tapeAngle: 14 },
  { src: `${BASE}WhatsApp Image 2026-07-08 at 16.53.51.jpeg`, type: 'photo', caption: 'Birthday Queen', sub: 'Reigning forever', category: 'glamour', handnote: 'July 11th royalty 🥂', tapeColor: 'rgba(201,149,110,0.3)', tapeAngle: -11 },
  { src: `${BASE}WhatsApp Image 2026-07-08 at 17.36.23.jpeg`, type: 'photo', caption: 'Afternoon Magic', sub: 'Time stops for you', category: 'sunkissed', handnote: 'Sun kissed and blessed ☀️', tapeColor: 'rgba(212,88,138,0.25)', tapeAngle: 7 },
  { src: `${BASE}WhatsApp Image 2026-07-08 at 17.36.24 (1).jpeg`, type: 'photo', caption: 'Radiant Bloom', sub: 'In full colour', category: 'playful', handnote: 'Stunning fit!', tapeColor: 'rgba(139,58,107,0.3)', tapeAngle: -13 },
  { src: `${BASE}WhatsApp Image 2026-07-08 at 17.36.24.jpeg`, type: 'photo', caption: 'Luminous', sub: 'Lit from within', category: 'sunkissed', handnote: 'Glow queen ✨', tapeColor: 'rgba(201,149,110,0.35)', tapeAngle: 9 },
  { src: `${BASE}WhatsApp Image 2026-07-08 at 17.36.25 (1).jpeg`, type: 'photo', caption: 'Unapologetically Her', sub: 'Bold, beautiful, Fundi', category: 'glamour', handnote: 'Unmatchable style 💅', tapeColor: 'rgba(212,88,138,0.3)', tapeAngle: -6 },
  { src: `${BASE}WhatsApp Image 2026-07-08 at 17.36.25 (2).jpeg`, type: 'photo', caption: 'Golden Afternoon', sub: 'Drenched in warmth', category: 'sunkissed', handnote: 'Dreamy lighting', tapeColor: 'rgba(139,58,107,0.35)', tapeAngle: 12 },
  { src: `${BASE}WhatsApp Image 2026-07-08 at 17.36.25.jpeg`, type: 'photo', caption: 'Vivid & Vital', sub: 'Colourfully alive', category: 'playful', handnote: 'Simply gorgeous 🌸', tapeColor: 'rgba(201,149,110,0.3)', tapeAngle: -10 },
  { src: `${BASE}WhatsApp Video 2026-07-08 at 16.53.51.mp4`, type: 'video', caption: 'In Motion', sub: 'Captured, never contained', category: 'video', handnote: 'Look at you move! 💃✨', tapeColor: 'rgba(212,88,138,0.35)', tapeAngle: 5 },
  { src: `${BASE}WhatsApp Video 2026-07-08 at 16.53.51 (1).mp4`, type: 'video', caption: 'The Real You', sub: 'Every second, magical', category: 'video', handnote: 'Lively & lovely! 📹❤️', tapeColor: 'rgba(139,58,107,0.3)', tapeAngle: -9 },
]

// Add unique ids
const mediaItems: MediaItem[] = initialMedia.map((item, index) => ({
  ...item,
  id: `item-${index}`,
}))

type ScrapbookSticker = {
  id: string
  emoji: string
  x: number // percentage 0-100
  y: number // percentage 0-100
  rotation: number
  scale: number
}

const defaultStickers: ScrapbookSticker[] = [
  { id: 'st-1', emoji: '❤️', x: 12, y: 15, rotation: -15, scale: 1.5 },
  { id: 'st-2', emoji: '👑', x: 82, y: 18, rotation: 10, scale: 1.8 },
  { id: 'st-3', emoji: '✨', x: 45, y: 8, rotation: 5, scale: 1.3 },
  { id: 'st-4', emoji: '🌟', x: 28, y: 45, rotation: 20, scale: 1.4 },
  { id: 'st-5', emoji: '🥂', x: 72, y: 65, rotation: -12, scale: 1.6 },
  { id: 'st-6', emoji: '🎂', x: 88, y: 48, rotation: 8, scale: 1.7 },
  { id: 'st-7', emoji: '💖', x: 8, y: 72, rotation: 25, scale: 1.5 },
  { id: 'st-8', emoji: '💅', x: 55, y: 82, rotation: -8, scale: 1.4 },
]

/* ─────────────────────────────────────────────
   CONFETTI PARTICLE SYSTEM
   ───────────────────────────────────────────── */
type ConfettiBurst = {
  id: number
  x: number
  y: number
  emoji: string
}

/* ─────────────────────────────────────────────
   SCRAPBOOK CANVAS SECTION
   ───────────────────────────────────────────── */
export function GallerySection() {
  const canvasRef = useRef<HTMLDivElement>(null)
  
  // Track positions, rotations, and z-index for each photo
  const [positions, setPositions] = useState<Record<string, { x: number; y: number; rot: number; z: number }>>({})
  const [stickers, setStickers] = useState<ScrapbookSticker[]>(defaultStickers)
  const [maxZ, setMaxZ] = useState(10)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [isTidied, setIsTidied] = useState(false)
  const [bursts, setBursts] = useState<ConfettiBurst[]>([])
  const [burstId, setBurstId] = useState(0)

  // Dragging states
  const dragInfo = useRef<{ id: string; startX: number; startY: number; startPosX: number; startPosY: number; isSticker: boolean } | null>(null)

  // Initialize scattered positions
  const scatterAll = useCallback(() => {
    const isMobile = window.innerWidth < 600
    const newPositions: typeof positions = {}
    
    mediaItems.forEach((item, index) => {
      // Calculate scattered layout
      let x = 0
      let y = 0
      
      if (isMobile) {
        // Mobile: layout stacked centrally with small offsets so they don't go off-screen
        x = 5 + (index % 3) * 28 + Math.random() * 8
        y = 5 + Math.floor(index / 3) * 60 + Math.random() * 10
      } else {
        // Desktop: fully scattered across a larger canvas
        x = 4 + (index % 5) * 19 + Math.random() * 6
        y = 4 + Math.floor(index / 5) * 23 + Math.random() * 8
      }

      newPositions[item.id] = {
        x,
        y,
        rot: -18 + Math.random() * 36, // rotation between -18 and 18 deg
        z: index + 1,
      }
    });

    setPositions(newPositions)
    setMaxZ(mediaItems.length + 5)
    setIsTidied(false)
  }, [positions])

  useEffect(() => {
    scatterAll()
    // Re-scatter on window resize for better responsive coordinates
    const handleResize = () => {
      // Only re-scatter if not already tidied
      if (!isTidied) scatterAll()
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Tidy up into a neat scrapbook layout
  const tidyUp = () => {
    const newPositions: typeof positions = {}
    mediaItems.forEach((item, index) => {
      // Align into neat visual grid columns, but keep slight rotation for scrapbook charm
      const cols = window.innerWidth < 600 ? 2 : 4
      const x = 5 + (index % cols) * (90 / cols)
      const y = 3 + Math.floor(index / cols) * 38
      newPositions[item.id] = {
        x,
        y,
        rot: -2 + Math.random() * 4, // tiny rotations
        z: index + 1,
      }
    })
    setPositions(newPositions)
    setIsTidied(true)
  }

  // Long press timeout ref
  const touchTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isTouchDraggingRef = useRef(false)

  // Handle Drag Start (from Mouse)
  const handleMouseDown = (e: React.MouseEvent, id: string, isSticker: boolean) => {
    // Bring dragged element to top
    const newZ = maxZ + 1
    setMaxZ(newZ)
    if (isSticker) {
      setStickers(prev => prev.map(s => s.id === id ? { ...s, z: newZ } : s))
    } else {
      setPositions(prev => ({
        ...prev,
        [id]: { ...prev[id], z: newZ },
      }))
    }

    const currentPos = isSticker ? stickers.find(s => s.id === id) : positions[id]
    if (!currentPos) return

    dragInfo.current = {
      id,
      startX: e.clientX,
      startY: e.clientY,
      startPosX: currentPos.x,
      startPosY: currentPos.y,
      isSticker,
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  // Handle touch start (with long press logic to prevent interrupting scroll)
  const handleTouchStart = (e: React.TouchEvent, id: string, isSticker: boolean) => {
    const touch = e.touches[0]
    const startX = touch.clientX
    const startY = touch.clientY

    isTouchDraggingRef.current = false

    if (touchTimeoutRef.current) clearTimeout(touchTimeoutRef.current)

    // Set 200ms long press to enable dragging
    touchTimeoutRef.current = setTimeout(() => {
      isTouchDraggingRef.current = true
      
      const newZ = maxZ + 1
      setMaxZ(newZ)
      if (isSticker) {
        setStickers(prev => prev.map(s => s.id === id ? { ...s, z: newZ } : s))
      } else {
        setPositions(prev => ({
          ...prev,
          [id]: { ...prev[id], z: newZ },
        }))
      }

      const currentPos = isSticker ? stickers.find(s => s.id === id) : positions[id]
      if (!currentPos) return

      dragInfo.current = {
        id,
        startX,
        startY,
        startPosX: currentPos.x,
        startPosY: currentPos.y,
        isSticker,
      }

      // Add touch listeners
      document.addEventListener('touchmove', onTouchMove, { passive: false })
      document.addEventListener('touchend', onTouchEnd)
    }, 200)

    // If they touch move quickly, we clear timeout so natural scrolling is not blocked
    const clearTouchTimer = (moveEvent: TouchEvent) => {
      const moveTouch = moveEvent.touches[0]
      const dx = Math.abs(moveTouch.clientX - startX)
      const dy = Math.abs(moveTouch.clientY - startY)
      // If moved more than 6px before 200ms, assume they are scrolling
      if (dx > 6 || dy > 6) {
        if (touchTimeoutRef.current) {
          clearTimeout(touchTimeoutRef.current)
          touchTimeoutRef.current = null
        }
        e.currentTarget.removeEventListener('touchmove', clearTouchTimer as any)
      }
    }

    e.currentTarget.addEventListener('touchmove', clearTouchTimer as any)
  }

  // Handle Dragging (Mouse)
  const onMouseMove = (e: MouseEvent) => {
    if (!dragInfo.current || !canvasRef.current) return
    const dx = e.clientX - dragInfo.current.startX
    const dy = e.clientY - dragInfo.current.startY
    updateDraggedPosition(dx, dy)
  }

  // Handle Drag End (Mouse)
  const onMouseUp = () => {
    dragInfo.current = null
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
  }

  // Handle Dragging (Touch)
  const onTouchMove = (e: TouchEvent) => {
    if (!dragInfo.current || !canvasRef.current) return
    // Prevent screen scrolling only if actively dragging
    if (isTouchDraggingRef.current) {
      e.preventDefault()
      const touch = e.touches[0]
      const dx = touch.clientX - dragInfo.current.startX
      const dy = touch.clientY - dragInfo.current.startY
      updateDraggedPosition(dx, dy)
    }
  }

  // Handle Drag End (Touch)
  const onTouchEnd = () => {
    if (touchTimeoutRef.current) {
      clearTimeout(touchTimeoutRef.current)
      touchTimeoutRef.current = null
    }
    dragInfo.current = null
    isTouchDraggingRef.current = false
    document.removeEventListener('touchmove', onTouchMove)
    document.removeEventListener('touchend', onTouchEnd)
  }

  const updateDraggedPosition = (dx: number, dy: number) => {
    if (!dragInfo.current || !canvasRef.current) return
    const rect = canvasRef.current.getBoundingClientRect()
    const pctX = (dx / rect.width) * 100
    const pctY = (dy / rect.height) * 100

    const { id, startPosX, startPosY, isSticker } = dragInfo.current
    const newX = Math.max(0, Math.min(95, startPosX + pctX))
    const newY = Math.max(0, Math.min(98, startPosY + pctY))

    if (isSticker) {
      setStickers(prev => prev.map(s => s.id === id ? { ...s, x: newX, y: newY } : s))
    } else {
      setPositions(prev => ({
        ...prev,
        [id]: { ...prev[id], x: newX, y: newY },
      }))
    }
  }

  // Add a new random sticker
  const addNewSticker = (emoji: string) => {
    const isMobile = window.innerWidth < 600
    const id = `st-${Date.now()}`
    const newSticker: ScrapbookSticker = {
      id,
      emoji,
      x: 10 + Math.random() * 70,
      y: isMobile ? 10 + Math.random() * 40 : 10 + Math.random() * 70,
      rotation: -30 + Math.random() * 60,
      scale: 1.3 + Math.random() * 0.5,
    }
    setStickers(prev => [...prev, newSticker])
    
    // Play sweet click feedback confetti
    triggerClickFeedback(window.innerWidth / 2, window.innerHeight / 2, emoji)
  }

  // Confetti/Emoji burst feedback on tap
  const triggerClickFeedback = (clientX: number, clientY: number, emoji: string) => {
    if (!canvasRef.current) return
    const rect = canvasRef.current.getBoundingClientRect()
    const x = ((clientX - rect.left) / rect.width) * 100
    const y = ((clientY - rect.top) / rect.height) * 100

    const newBurst: ConfettiBurst = {
      id: burstId,
      x,
      y,
      emoji,
    }
    
    setBursts(prev => [...prev, newBurst])
    setBurstId(id => id + 1)

    // Remove burst after animation
    setTimeout(() => {
      setBursts(prev => prev.filter(b => b.id !== newBurst.id))
    }, 1200)
  }

  // Lightbox navigation
  const prevItem = useCallback(() => {
    setLightboxIndex(i => i !== null ? (i - 1 + mediaItems.length) % mediaItems.length : null)
  }, [])

  const nextItem = useCallback(() => {
    setLightboxIndex(i => i !== null ? (i + 1) % mediaItems.length : null)
  }, [])

  return (
    <section style={{
      padding: '80px 12px 120px',
      position: 'relative',
      overflow: 'hidden',
      background: '#0a0512',
    }}>
      {/* Decorative Scrapbook background elements */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          radial-gradient(circle at 10% 20%, rgba(201,149,110,0.06) 0%, transparent 40%),
          radial-gradient(circle at 90% 80%, rgba(139,58,107,0.06) 0%, transparent 40%)
        `,
        pointerEvents: 'none',
      }} />

      {/* Grid notebook paper lines in background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.15,
        backgroundImage: 'linear-gradient(rgba(201,149,110,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(201,149,110,0.15) 1px, transparent 1px)',
        backgroundSize: '30px 30px',
        pointerEvents: 'none',
      }} />

      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '32px', position: 'relative', zIndex: 5 }}>
        <span className="handwritten" style={{
          fontSize: 'clamp(20px, 5vw, 28px)',
          color: '#c9956e',
          display: 'block',
          marginBottom: '8px',
          transform: 'rotate(-2deg)',
        }}>
          ✨ our unhinged memory lane ✨
        </span>
        <h2 className="playfair" style={{
          fontSize: 'clamp(32px, 8vw, 56px)',
          fontStyle: 'italic',
          color: '#f5e6d3',
          fontWeight: 400,
          lineHeight: 1.1,
        }}>
          Caro's Digital{' '}
          <span className="gochi" style={{
            color: '#d4588a',
            textDecoration: 'underline',
            textDecorationColor: '#c9956e',
          }}>
            Scrapbook
          </span>
        </h2>
        <p className="handwritten" style={{
          fontSize: '18px',
          color: 'rgba(245,230,211,0.5)',
          marginTop: '10px',
        }}>
          💡 tip: hold down any photo or sticker on mobile to drag it!
        </p>
      </div>

      {/* Control Panel */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '12px',
        flexWrap: 'wrap',
        marginBottom: '40px',
        position: 'relative',
        zIndex: 10,
      }}>
        {/* Scatter & Tidy Controls */}
        <button
          onClick={scatterAll}
          style={{
            padding: '8px 18px',
            background: !isTidied ? 'rgba(201,149,110,0.2)' : 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(201,149,110,0.3)',
            borderRadius: '20px',
            color: '#f5e6d3',
            fontSize: '12px',
            cursor: 'pointer',
            fontFamily: "'DM Sans', sans-serif",
            transition: 'all 0.3s ease',
            minHeight: 'unset',
            minWidth: 'unset',
          }}
        >
          🌪️ Scatter Desk
        </button>
        <button
          onClick={tidyUp}
          style={{
            padding: '8px 18px',
            background: isTidied ? 'rgba(201,149,110,0.2)' : 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(201,149,110,0.3)',
            borderRadius: '20px',
            color: '#f5e6d3',
            fontSize: '12px',
            cursor: 'pointer',
            fontFamily: "'DM Sans', sans-serif",
            transition: 'all 0.3s ease',
            minHeight: 'unset',
            minWidth: 'unset',
          }}
        >
          ✨ Tidy Grid
        </button>

        {/* Sticker Droppers */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(26,15,36,0.6)',
          backdropFilter: 'blur(10px)',
          padding: '4px 12px',
          borderRadius: '30px',
          border: '1px solid rgba(201,149,110,0.15)',
        }}>
          <span className="handwritten" style={{ fontSize: '13px', color: '#c9956e', marginRight: '6px' }}>Stickers:</span>
          {['❤️', '✨', '👑', '🎉', '💅', '🔥', '🥂'].map(emoji => (
            <button
              key={emoji}
              onClick={() => addNewSticker(emoji)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '18px',
                cursor: 'pointer',
                padding: '4px',
                transition: 'transform 0.2s ease',
                minHeight: 'unset',
                minWidth: 'unset',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.3)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>

      {/* Main Scattered Scrapbook Canvas */}
      <div
        ref={canvasRef}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1200px',
          // Dynamic height depending on screen size to hold absolute elements nicely
          height: window.innerWidth < 600 ? '1450px' : '1100px',
          margin: '0 auto',
          background: 'rgba(17,10,24,0.3)',
          borderRadius: '24px',
          border: '2px dashed rgba(201,149,110,0.12)',
          touchAction: 'pan-y', // Allow browser vertical scroll triggers on swipe
          boxShadow: 'inset 0 10px 40px rgba(0,0,0,0.3)',
        }}
      >
        {/* Confetti / Burst animations */}
        {bursts.map(b => (
          <div
            key={b.id}
            style={{
              position: 'absolute',
              left: `${b.x}%`,
              top: `${b.y}%`,
              transform: 'translate(-50%, -50%)',
              fontSize: '44px',
              pointerEvents: 'none',
              zIndex: 9999,
              animation: 'fadeInScale 0.6s ease-out forwards',
            }}
          >
            {b.emoji}
          </div>
        ))}

        {/* Scattered Stickers */}
        {stickers.map(st => {
          const isDragging = dragInfo.current?.id === st.id;
          return (
            <div
              key={st.id}
              onMouseDown={e => handleMouseDown(e, st.id, true)}
              onTouchStart={e => handleTouchStart(e, st.id, true)}
              style={{
                position: 'absolute',
                left: `${st.x}%`,
                top: `${st.y}%`,
                transform: `translate(-50%, -50%) rotate(${st.rotation}deg) scale(${isDragging ? st.scale * 1.2 : st.scale})`,
                fontSize: '24px',
                cursor: 'grab',
                userSelect: 'none',
                zIndex: (st as any).z || 5,
                transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              }}
              className="sticker-shake"
            >
              {st.emoji}
            </div>
          );
        })}

        {/* Scattered Photos/Videos */}
        {mediaItems.map((item, index) => {
          const pos = positions[item.id] || { x: 10, y: 10, rot: 0, z: index + 1 }
          const isDragging = dragInfo.current?.id === item.id

          return (
            <div
              key={item.id}
              onMouseDown={e => handleMouseDown(e, item.id, false)}
              onTouchStart={e => handleTouchStart(e, item.id, false)}
              onClick={e => {
                // Spawn minor click confetti
                triggerClickFeedback(e.clientX, e.clientY, '✨')
              }}
              style={{
                position: 'absolute',
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                width: window.innerWidth < 600 ? '145px' : '200px',
                transform: `rotate(${pos.rot}deg) scale(${isDragging ? 1.08 : 1})`,
                zIndex: pos.z,
                cursor: isDragging ? 'grabbing' : 'grab',
                // smooth transition back when not actively dragging
                transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), left 0.4s ease, top 0.4s ease',
                userSelect: 'none',
                boxShadow: isDragging ? '0 30px 60px rgba(0,0,0,0.6)' : undefined,
              }}
              className="polaroid-frame"
            >
              {/* Wash Tape overlay */}
              {item.tapeColor && (
                <div
                  className="journal-tape"
                  style={{
                    top: '-15px',
                    left: '50%',
                    transform: `translateX(-50%) rotate(${item.tapeAngle || 0}deg)`,
                    width: '60px',
                    height: '18px',
                    background: item.tapeColor,
                  }}
                />
              )}

              {/* Photo Content */}
              <div style={{
                padding: '10px 10px 0',
                position: 'relative',
              }}>
                {item.type === 'video' ? (
                  <div style={{ position: 'relative', aspectRatio: '4/5', background: '#000', overflow: 'hidden' }}>
                    <video
                      src={item.src}
                      muted
                      loop
                      playsInline
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                      onMouseEnter={e => e.currentTarget.play()}
                      onMouseLeave={e => { e.currentTarget.pause(); e.currentTarget.currentTime = 0 }}
                    />
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'rgba(0,0,0,0.3)',
                      color: '#f5e6d3',
                      fontSize: '24px',
                    }}>
                      ▶
                    </div>
                  </div>
                ) : (
                  <img
                    src={item.src}
                    alt={item.caption}
                    draggable={false}
                    style={{
                      width: '100%',
                      aspectRatio: '4/5',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                )}
              </div>

              {/* Polaroid bottom border + Hand note label */}
              <div style={{
                padding: '10px 8px 12px',
                textAlign: 'center',
              }}>
                <div className="handwritten" style={{
                  fontSize: 'clamp(13px, 3.5vw, 15px)',
                  lineHeight: 1.1,
                  color: '#2a1a0c',
                  minHeight: '22px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {item.handnote || item.caption}
                </div>

                {/* Info zoom icon */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setLightboxIndex(index)
                  }}
                  style={{
                    marginTop: '4px',
                    background: 'rgba(201,149,110,0.1)',
                    border: '1px solid rgba(201,149,110,0.25)',
                    borderRadius: '50%',
                    color: '#c9956e',
                    fontSize: '11px',
                    width: '24px',
                    height: '24px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: 'unset',
                    minHeight: 'unset',
                    padding: 0,
                  }}
                >
                  🔍
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Lightbox Trigger */}
      {lightboxIndex !== null && (
        <Lightbox
          items={mediaItems}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={prevItem}
          onNext={nextItem}
        />
      )}
    </section>
  )
}

/* ─────────────────────────────────────────────
   LightBox Component
   ───────────────────────────────────────────── */
function Lightbox({
  items,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  items: MediaItem[]
  index: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  const item = items[index]
  const videoRef = useRef<HTMLVideoElement>(null)
  const touchStartX = useRef<number | null>(null)

  // Block body scroll
  useEffect(() => {
    document.body.classList.add('lightbox-open')
    return () => document.body.classList.remove('lightbox-open')
  }, [])

  // Touch Swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 50) {
      if (dx < 0) onNext()
      else onPrev()
    }
    touchStartX.current = null
  }

  return (
    <div
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(6,3,10,0.96)',
        backdropFilter: 'blur(20px)',
        animation: 'fadeInScale 0.3s cubic-bezier(0.23,1,0.32,1)',
        padding: '60px 16px 20px',
      }}
    >
      {/* Top Header */}
      <div style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        padding: '16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'linear-gradient(to bottom, rgba(6,3,10,0.95), transparent)',
      }}>
        <div className="handwritten" style={{ color: '#c9956e', fontSize: '18px' }}>
          {index + 1} / {items.length}
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'rgba(201,149,110,0.1)',
            border: '1px solid rgba(201,149,110,0.3)',
            borderRadius: '50%',
            color: '#c9956e',
            width: '40px', height: '40px',
            fontSize: '20px',
            cursor: 'pointer',
            minHeight: 'unset',
            minWidth: 'unset',
          }}
        >
          ✕
        </button>
      </div>

      {/* Media Box */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          maxWidth: '100%',
        }}
      >
        {item.type === 'video' ? (
          <video
            ref={videoRef}
            src={item.src}
            controls
            autoPlay
            playsInline
            style={{
              maxWidth: '85vw',
              maxHeight: '60dvh',
              borderRadius: '12px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.7)',
            }}
          />
        ) : (
          <img
            src={item.src}
            alt={item.caption}
            style={{
              maxWidth: '85vw',
              maxHeight: '60dvh',
              objectFit: 'contain',
              borderRadius: '12px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.7)',
            }}
          />
        )}

        <div style={{ textAlign: 'center' }}>
          <h3 className="playfair" style={{ fontSize: '20px', color: '#f5e6d3', fontStyle: 'italic' }}>
            {item.caption}
          </h3>
          <p className="handwritten" style={{ fontSize: '18px', color: '#c9956e', marginTop: '4px' }}>
            {item.handnote || item.sub}
          </p>
        </div>

        {/* Carousel buttons */}
        <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
          <button
            onClick={onPrev}
            style={{
              background: 'rgba(201,149,110,0.1)',
              border: '1px solid rgba(201,149,110,0.3)',
              borderRadius: '50%',
              color: '#c9956e',
              width: '44px', height: '44px',
              fontSize: '20px',
              cursor: 'pointer',
              minHeight: 'unset',
              minWidth: 'unset',
            }}
          >
            ‹
          </button>
          <button
            onClick={onNext}
            style={{
              background: 'rgba(201,149,110,0.1)',
              border: '1px solid rgba(201,149,110,0.3)',
              borderRadius: '50%',
              color: '#c9956e',
              width: '44px', height: '44px',
              fontSize: '20px',
              cursor: 'pointer',
              minHeight: 'unset',
              minWidth: 'unset',
            }}
          >
            ›
          </button>
        </div>
      </div>
    </div>
  )
}
