import { useEffect, useRef, useState, useCallback } from 'react'

/* ─────────────────────────────────────────────
   Media catalogue – all 19 photos + 2 videos
   ───────────────────────────────────────────── */
type MediaItem = {
  src: string
  type: 'photo' | 'video'
  caption: string
  sub: string
  category: 'sunkissed' | 'glamour' | 'playful' | 'video'
  aspect: '3/4' | '4/5' | '1/1' | '4/3'
}

const BASE = '/imgss/'

const media: MediaItem[] = [
  { src: `${BASE}WhatsApp Image 2026-07-08 at 16.53.48 (1).jpeg`, type: 'photo', caption: 'Golden Hour Glow', sub: 'The sun bows to you', category: 'sunkissed', aspect: '3/4' },
  { src: `${BASE}WhatsApp Image 2026-07-08 at 16.53.48.jpeg`, type: 'photo', caption: 'Radiance Untamed', sub: 'Effortless & luminous', category: 'sunkissed', aspect: '4/5' },
  { src: `${BASE}WhatsApp Image 2026-07-08 at 16.53.49 (1).jpeg`, type: 'photo', caption: 'Pure Joy', sub: 'Your smile heals everything', category: 'playful', aspect: '4/5' },
  { src: `${BASE}WhatsApp Image 2026-07-08 at 16.53.49 (2).jpeg`, type: 'photo', caption: 'Unbothered Queen', sub: 'Born to stand out', category: 'glamour', aspect: '3/4' },
  { src: `${BASE}WhatsApp Image 2026-07-08 at 16.53.49 (3).jpeg`, type: 'photo', caption: 'Free Spirit', sub: 'Wild & wonderfully you', category: 'playful', aspect: '4/5' },
  { src: `${BASE}WhatsApp Image 2026-07-08 at 16.53.49.jpeg`, type: 'photo', caption: 'Soft Power', sub: 'Quiet, unshakeable strength', category: 'glamour', aspect: '4/5' },
  { src: `${BASE}WhatsApp Image 2026-07-08 at 16.53.50 (1).jpeg`, type: 'photo', caption: 'Effortlessly You', sub: 'Natural beauty, unmatched', category: 'sunkissed', aspect: '3/4' },
  { src: `${BASE}WhatsApp Image 2026-07-08 at 16.53.50 (2).jpeg`, type: 'photo', caption: 'Iconic Frame', sub: 'A moment frozen in gold', category: 'glamour', aspect: '4/5' },
  { src: `${BASE}WhatsApp Image 2026-07-08 at 16.53.50 (3).jpeg`, type: 'photo', caption: 'Dream Sequence', sub: 'Every shot, a masterpiece', category: 'sunkissed', aspect: '4/5' },
  { src: `${BASE}WhatsApp Image 2026-07-08 at 16.53.50 (4).jpeg`, type: 'photo', caption: 'Crown Season', sub: 'Always at the top', category: 'glamour', aspect: '3/4' },
  { src: `${BASE}WhatsApp Image 2026-07-08 at 16.53.50.jpeg`, type: 'photo', caption: 'The Vibe', sub: 'Unfiltered & perfect', category: 'playful', aspect: '4/5' },
  { src: `${BASE}WhatsApp Image 2026-07-08 at 16.53.51 (1).jpeg`, type: 'photo', caption: 'Magnetic Energy', sub: 'You pull the room in', category: 'glamour', aspect: '4/5' },
  { src: `${BASE}WhatsApp Image 2026-07-08 at 16.53.51.jpeg`, type: 'photo', caption: 'Birthday Queen', sub: 'Reigning forever', category: 'glamour', aspect: '3/4' },
  { src: `${BASE}WhatsApp Image 2026-07-08 at 17.36.23.jpeg`, type: 'photo', caption: 'Afternoon Magic', sub: 'Time stops for you', category: 'sunkissed', aspect: '4/5' },
  { src: `${BASE}WhatsApp Image 2026-07-08 at 17.36.24 (1).jpeg`, type: 'photo', caption: 'Radiant Bloom', sub: 'In full colour', category: 'playful', aspect: '4/5' },
  { src: `${BASE}WhatsApp Image 2026-07-08 at 17.36.24.jpeg`, type: 'photo', caption: 'Luminous', sub: 'Lit from within', category: 'sunkissed', aspect: '3/4' },
  { src: `${BASE}WhatsApp Image 2026-07-08 at 17.36.25 (1).jpeg`, type: 'photo', caption: 'Unapologetically Her', sub: 'Bold, beautiful, Fundi', category: 'glamour', aspect: '4/5' },
  { src: `${BASE}WhatsApp Image 2026-07-08 at 17.36.25 (2).jpeg`, type: 'photo', caption: 'Golden Afternoon', sub: 'Drenched in warmth', category: 'sunkissed', aspect: '4/5' },
  { src: `${BASE}WhatsApp Image 2026-07-08 at 17.36.25.jpeg`, type: 'photo', caption: 'Vivid & Vital', sub: 'Colourfully alive', category: 'playful', aspect: '4/3' },
  { src: `${BASE}WhatsApp Video 2026-07-08 at 16.53.51.mp4`, type: 'video', caption: 'In Motion', sub: 'Captured, never contained', category: 'video', aspect: '4/5' },
  { src: `${BASE}WhatsApp Video 2026-07-08 at 16.53.51 (1).mp4`, type: 'video', caption: 'The Real You', sub: 'Every second, magical', category: 'video', aspect: '4/5' },
]

type Category = 'all' | 'sunkissed' | 'glamour' | 'playful' | 'video'
const FILTERS: { key: Category; label: string; icon: string }[] = [
  { key: 'all', label: 'All', icon: '✦' },
  { key: 'sunkissed', label: 'Sunkissed', icon: '☀' },
  { key: 'glamour', label: 'Glamour', icon: '◈' },
  { key: 'playful', label: 'Playful', icon: '❋' },
  { key: 'video', label: 'Videos', icon: '▶' },
]

/* ─────────────────────────────────────────────
   Lightbox — with touch swipe support
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

  // Lock body scroll (class-based, handled in CSS)
  useEffect(() => {
    document.body.classList.add('lightbox-open')
    return () => document.body.classList.remove('lightbox-open')
  }, [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose, onPrev, onNext])

  // Reset video on slide change
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }, [index])

  // Touch swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 50) {
      dx < 0 ? onNext() : onPrev()
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
        background: 'rgba(6,3,10,0.97)',
        backdropFilter: 'blur(20px)',
        animation: 'fadeInScale 0.3s cubic-bezier(0.23,1,0.32,1)',
        padding: '60px 12px 20px',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {/* Top bar */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        padding: '14px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 10,
        background: 'linear-gradient(to bottom, rgba(6,3,10,0.95) 0%, transparent 100%)',
      }}>
        <div style={{
          fontSize: '11px',
          letterSpacing: '0.3em',
          color: 'rgba(201,149,110,0.55)',
          textTransform: 'uppercase',
        }}>
          {index + 1} / {items.length}
        </div>
        <button
          onClick={e => { e.stopPropagation(); onClose() }}
          style={{
            background: 'rgba(201,149,110,0.12)',
            border: '1px solid rgba(201,149,110,0.3)',
            color: '#c9956e',
            fontSize: '22px',
            width: 44, height: 44,
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s ease',
            flexShrink: 0,
          }}
          aria-label="Close"
        >
          ×
        </button>
      </div>

      {/* Media + caption */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
          width: '100%',
          maxWidth: 680,
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
              width: '100%',
              maxHeight: '60dvh',
              borderRadius: '14px',
              boxShadow: '0 24px 80px rgba(0,0,0,0.8)',
              outline: 'none',
              display: 'block',
            }}
          />
        ) : (
          <img
            src={item.src}
            alt={item.caption}
            style={{
              width: '100%',
              maxHeight: '65dvh',
              borderRadius: '14px',
              objectFit: 'contain',
              boxShadow: '0 24px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(201,149,110,0.12)',
              display: 'block',
            }}
          />
        )}

        {/* Caption */}
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontSize: '10px',
            letterSpacing: '0.35em',
            color: '#c9956e',
            textTransform: 'uppercase',
            marginBottom: 6,
          }}>
            {item.sub}
          </div>
          <div className="playfair" style={{
            fontSize: 'clamp(16px, 5vw, 22px)',
            color: '#f5e6d3',
            fontStyle: 'italic',
          }}>
            {item.caption}
          </div>
        </div>

        {/* Dot strip */}
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', justifyContent: 'center', padding: '0 8px' }}>
          {items.map((_, i) => (
            <div key={i} style={{
              width: i === index ? 20 : 5,
              height: 5,
              borderRadius: 3,
              background: i === index ? '#c9956e' : 'rgba(201,149,110,0.2)',
              transition: 'all 0.3s ease',
            }} />
          ))}
        </div>

        {/* Swipe hint (mobile only) */}
        <div style={{
          fontSize: '11px',
          letterSpacing: '0.2em',
          color: 'rgba(201,149,110,0.35)',
          textTransform: 'uppercase',
          animation: 'swipe-hint 2s ease-in-out 3',
        }}>
          ← swipe to navigate →
        </div>

        {/* Desktop prev/next buttons */}
        <div style={{ display: 'flex', gap: 16, marginTop: 4 }}>
          <button
            onClick={e => { e.stopPropagation(); onPrev() }}
            style={{
              background: 'rgba(201,149,110,0.1)',
              border: '1px solid rgba(201,149,110,0.25)',
              color: '#c9956e',
              fontSize: '20px',
              width: 48, height: 48,
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s ease',
            }}
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            onClick={e => { e.stopPropagation(); onNext() }}
            style={{
              background: 'rgba(201,149,110,0.1)',
              border: '1px solid rgba(201,149,110,0.25)',
              color: '#c9956e',
              fontSize: '20px',
              width: 48, height: 48,
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s ease',
            }}
            aria-label="Next"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Media Card — tilt disabled on touch devices
   ───────────────────────────────────────────── */
function MediaCard({
  item,
  index,
  onClick,
}: {
  item: MediaItem
  index: number
  onClick: () => void
}) {
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 })
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const rx = hovering ? (mouse.y - 0.5) * -14 : 0
  const ry = hovering ? (mouse.x - 0.5) * 14 : 0

  return (
    <div
      ref={ref}
      onClick={onClick}
      onMouseMove={e => {
        const r = e.currentTarget.getBoundingClientRect()
        setMouse({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height })
      }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => { setHovering(false); setMouse({ x: 0.5, y: 0.5 }) }}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? `rotateX(${rx}deg) rotateY(${ry}deg) scale(${hovering ? 1.03 : 1})`
          : `translateY(50px)`,
        transition: visible
          ? `transform 0.15s ease, box-shadow 0.3s ease, opacity 0.6s ease ${Math.min(index * 0.06, 0.5)}s`
          : `opacity 0.6s ease ${Math.min(index * 0.06, 0.5)}s`,
        transformStyle: 'preserve-3d',
        cursor: 'zoom-in',
        position: 'relative',
        borderRadius: '14px',
        overflow: 'hidden',
        background: '#110a18',
        boxShadow: hovering
          ? '0 28px 60px rgba(0,0,0,0.65), 0 0 30px rgba(201,149,110,0.15)'
          : '0 12px 36px rgba(0,0,0,0.45)',
        aspectRatio: item.aspect,
        /* Ensure cards fill column width */
        width: '100%',
        display: 'block',
      }}
    >
      {/* Media */}
      {item.type === 'video' ? (
        <video
          src={item.src}
          muted
          loop
          playsInline
          onMouseEnter={e => (e.currentTarget as HTMLVideoElement).play()}
          onMouseLeave={e => { (e.currentTarget as HTMLVideoElement).pause(); (e.currentTarget as HTMLVideoElement).currentTime = 0 }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transform: hovering ? 'scale(1.07)' : 'scale(1)',
            transition: 'transform 0.6s ease',
            filter: hovering ? 'brightness(1.1)' : 'brightness(0.75)',
          }}
        />
      ) : (
        <img
          src={item.src}
          alt={item.caption}
          loading="lazy"
          decoding="async"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transform: hovering ? 'scale(1.07)' : 'scale(1)',
            transition: 'transform 0.6s ease',
            filter: hovering ? 'brightness(1.1) saturate(1.15)' : 'brightness(0.82) saturate(0.95)',
          }}
        />
      )}

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, rgba(6,3,10,0.92) 0%, rgba(6,3,10,0.1) 50%, transparent 100%)',
      }} />

      {/* Category badge */}
      <div style={{
        position: 'absolute',
        top: 12, left: 12,
        background: 'rgba(6,3,10,0.65)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(201,149,110,0.2)',
        borderRadius: '20px',
        padding: '3px 10px',
        fontSize: '9px',
        letterSpacing: '0.2em',
        color: '#c9956e',
        textTransform: 'uppercase',
      }}>
        {item.type === 'video' ? '▶ Video' : FILTERS.find(f => f.key === item.category)?.label ?? ''}
      </div>

      {/* Video play overlay */}
      {item.type === 'video' && (
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: `translate(-50%, -50%) scale(${hovering ? 1.15 : 1})`,
          transition: 'transform 0.3s ease, opacity 0.3s ease',
          opacity: hovering ? 0.95 : 0.7,
          width: 52, height: 52,
          background: 'rgba(201,149,110,0.18)',
          backdropFilter: 'blur(12px)',
          border: '2px solid rgba(201,149,110,0.5)',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#e8c4a0',
          fontSize: '18px',
          paddingLeft: '3px',
        }}>
          ▶
        </div>
      )}

      {/* Caption */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        padding: '16px',
        transform: hovering ? 'translateY(0)' : 'translateY(4px)',
        transition: 'transform 0.3s ease',
      }}>
        <div style={{
          fontSize: '9px',
          letterSpacing: '0.25em',
          color: '#c9956e',
          textTransform: 'uppercase',
          marginBottom: 4,
        }}>
          {item.sub}
        </div>
        <div className="playfair" style={{
          fontSize: 'clamp(14px, 4vw, 18px)',
          color: '#f5e6d3',
          fontStyle: 'italic',
          lineHeight: 1.2,
        }}>
          {item.caption}
        </div>
      </div>

      {/* Top shimmer on hover */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '2px',
        background: 'linear-gradient(to right, transparent, #c9956e, transparent)',
        opacity: hovering ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }} />
    </div>
  )
}

/* ─────────────────────────────────────────────
   Gallery Section
   ───────────────────────────────────────────── */
export function GallerySection() {
  const [activeFilter, setActiveFilter] = useState<Category>('all')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const filterScrollRef = useRef<HTMLDivElement>(null)

  const filtered = activeFilter === 'all'
    ? media
    : media.filter(m => m.category === activeFilter)

  const openLightbox = useCallback((idx: number) => setLightboxIndex(idx), [])
  const closeLightbox = useCallback(() => setLightboxIndex(null), [])
  const prevItem = useCallback(() =>
    setLightboxIndex(i => i !== null ? (i - 1 + filtered.length) % filtered.length : null),
    [filtered.length])
  const nextItem = useCallback(() =>
    setLightboxIndex(i => i !== null ? (i + 1) % filtered.length : null),
    [filtered.length])

  return (
    <section style={{
      padding: 'var(--section-v) var(--section-h)',
      position: 'relative',
    }}>
      {/* Section header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div style={{
          fontSize: '10px',
          letterSpacing: '0.6em',
          color: '#c9956e',
          textTransform: 'uppercase',
          marginBottom: '14px',
        }}>
          A Year in Frames
        </div>
        <h2 className="playfair" style={{
          fontSize: 'clamp(28px, 7vw, 56px)',
          fontStyle: 'italic',
          color: '#f5e6d3',
          fontWeight: 400,
        }}>
          Moments of{' '}
          <span style={{
            background: 'linear-gradient(135deg, #c9956e, #e8c4a0)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            You
          </span>
        </h2>
        <div style={{
          width: '50px', height: '1px',
          background: 'linear-gradient(to right, transparent, #c9956e, transparent)',
          margin: '18px auto 0',
        }} />
      </div>

      {/* Filter bar — horizontally scrollable on mobile */}
      <div
        ref={filterScrollRef}
        style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          padding: '4px 0 16px',
          marginBottom: '32px',
          /* Center on desktop, scroll on mobile */
          justifyContent: 'flex-start',
        }}
      >
        <style>{`.filter-bar::-webkit-scrollbar { display: none; }`}</style>
        <div className="filter-bar" style={{ display: 'flex', gap: '8px', margin: '0 auto' }}>
          {FILTERS.map(f => (
            <button
              key={f.key}
              onClick={() => { setActiveFilter(f.key); setLightboxIndex(null) }}
              style={{
                padding: '10px 18px',
                border: activeFilter === f.key
                  ? '1px solid rgba(201,149,110,0.8)'
                  : '1px solid rgba(201,149,110,0.18)',
                background: activeFilter === f.key
                  ? 'rgba(201,149,110,0.14)'
                  : 'rgba(6,3,10,0.6)',
                backdropFilter: 'blur(10px)',
                borderRadius: '30px',
                color: activeFilter === f.key ? '#e8c4a0' : 'rgba(245,230,211,0.45)',
                fontSize: '11px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                fontFamily: "'DM Sans', sans-serif",
                transition: 'all 0.25s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                /* Ensure 44px tap target height */
                minHeight: '44px',
              }}
            >
              <span style={{ fontSize: '12px' }}>{f.icon}</span>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry grid — CSS columns, responsive via CSS variable */}
      <div style={{
        columns: 'var(--gallery-cols)',
        columnGap: '14px',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {filtered.map((item, i) => (
          <div key={item.src} style={{ breakInside: 'avoid', marginBottom: '14px' }}>
            <MediaCard item={item} index={i} onClick={() => openLightbox(i)} />
          </div>
        ))}
      </div>

      {/* Footer note */}
      <div style={{
        textAlign: 'center',
        marginTop: '48px',
        color: 'rgba(245,230,211,0.3)',
        fontSize: '12px',
        letterSpacing: '0.15em',
        fontStyle: 'italic',
      }}>
        ✦ &nbsp; {filtered.length} precious {filtered.length === 1 ? 'moment' : 'moments'} captured &nbsp; ✦
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          items={filtered}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevItem}
          onNext={nextItem}
        />
      )}
    </section>
  )
}
