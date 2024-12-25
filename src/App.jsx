import { Canvas } from '@react-three/fiber'
import { Loader } from '@react-three/drei'
import { useState, useEffect, Suspense } from 'react'
import PostProcessingEffects from './PostProcessingEffects'
import SnowGlobeModel from './SnowGlobeModel'
import Overlay from './Overlay'
import SceneSetup from './Scene'

export default function App() {
  const [inside, setInside] = useState(false)
  const [audio, setAudio] = useState(null)
  const [isMuted, setIsMuted] = useState(true)
  const isMobile = window.innerWidth < 768
  const canvasConfig = { antialias: false, depth: false, stencil: false, alpha: false }

  useEffect(() => {
    const audio = new Audio('/christmas.mp3')
    audio.loop = true
    audio.preload = 'auto'
    audio.muted = true;
    setAudio(audio);
  }, [])

  const toggleMute = () => {
    if (audio) {
      if (isMuted) {
        audio.muted = false;
        audio.play().catch(error => {
          console.error('Failed to play audio:', error);
        });
      } else {
        audio.pause();
      }
      setIsMuted(!isMuted);
    }
  }

  return (
    <>
      <button onClick={toggleMute} style={{ position: 'absolute', top: 5, left: 15, zIndex: 1000, padding: '12px 12px', fontSize: '20px', width: '50px' }}>
        {isMuted ? (
          <span role="img" aria-label="Unmute">🔊</span>
        ) : (
          <span role="img" aria-label="Mute">🔇</span>
        )}
      </button>
      <Canvas gl={canvasConfig} camera={{ position: [0, 0, 5], fov: 35, far: 20000 }} dpr={1}>
        <Suspense fallback={null}>
          <SceneSetup isMobile={isMobile} />
          <SnowGlobeModel isMobile={isMobile} position={[0, -1.1, 0]} scale={0.09} inside={inside} />
          <PostProcessingEffects />
        </Suspense>
      </Canvas>
      <Overlay inside={inside} setInside={setInside} />
      <Loader />
    </>
  )
}
