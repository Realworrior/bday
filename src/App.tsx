import { useEffect, useState } from 'react'
import { Curtain } from './components/Curtain'
import { Particles } from './components/Particles'
import { HeroSection } from './components/HeroSection'
import { GallerySection } from './components/GallerySection'
import { MessageSection } from './components/MessageSection'
import { CountdownSection } from './components/CountdownSection'
import { ClosingSection } from './components/ClosingSection'

export default function App() {
  const [revealed, setRevealed] = useState(false)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    if (revealed) {
      setTimeout(() => setShowContent(true), 600)
    }
  }, [revealed])

  return (
    <div style={{ background: 'var(--background)', minHeight: '100vh', position: 'relative' }}>
      <Particles />
      {!showContent && <Curtain onReveal={() => setRevealed(true)} />}
      {showContent && (
        <main>
          <HeroSection />
          <GallerySection />
          <MessageSection />
          <CountdownSection />
          <ClosingSection />
        </main>
      )}
    </div>
  )
}
