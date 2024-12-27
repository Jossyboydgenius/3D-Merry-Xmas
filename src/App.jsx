import { Canvas } from '@react-three/fiber'
import { Loader, PositionalAudio } from '@react-three/drei'
import { useState, Suspense, useRef, useEffect } from 'react'
import PostProcessingEffects from './PostProcessingEffects'
import SnowGlobeModel from './SnowGlobeModel'
import Overlay from './Overlay'
import SceneSetup from './Scene'

export default function App() {
  const audioRef = useRef()
  const [inside, setInside] = useState(false)
  const isMobile = window.innerWidth < 768
  const canvasConfig = { antialias: false, depth: false, stencil: false, alpha: false }
  const [ready, setReady] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (!event.target.closest('.mute-button')) {
        setReady(true)
      }
    }

    document.addEventListener('click', handleDocumentClick)

    return () => {
      document.removeEventListener('click', handleDocumentClick)
    }
  }, [])

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (audioRef.current) {
      audioRef.current.setVolume(isMuted ? 1 : 0)
    }
  }

  return (
    <>
      <button
        onClick={toggleMute}
        className="mute-button"
        style={{ position: 'absolute', top: 5, left: 15, zIndex: 1000, padding: '12px 12px', fontSize: '20px', width: '50px' }}
      >
        {isMuted ? (
          <span role="img" aria-label="Unmute">🔊</span>
        ) : (
          <span role="img" aria-label="Mute">🔇</span>
        )}
      </button>
      <Canvas
        gl={canvasConfig}
        camera={{ position: [0, 0, 5], fov: 35, far: 20000 }}
        dpr={1}
      >
        <Suspense fallback={null}>
          <SceneSetup isMobile={isMobile} />
          <SnowGlobeModel
            isMobile={isMobile}
            position={[0, -1.1, 0]}
            scale={0.09}
            inside={inside}
          />

          <PositionalAudio
            ref={audioRef}
            loop
            url='/christmas-soundtrack.mp3'
            distance={0.05}
            autoplay={ready}
            key={ready}
          />

          <PostProcessingEffects />
        </Suspense>
      </Canvas>
      <Overlay
        inside={inside}
        setInside={setInside}
      />
      <Loader />
    </>
  )
}
