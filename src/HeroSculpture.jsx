import { Component, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import { Color, MathUtils } from 'three'

class SculptureBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { failed: false }
  }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    if (this.state.failed) return this.props.fallback
    return this.props.children
  }
}

function Sculpture({ pointer, reducedMotion }) {
  const group = useRef()
  const light = useRef()
  const targetColor = useMemo(() => new Color('#b6b1ff'), [])

  useFrame((state, delta) => {
    if (!group.current || reducedMotion) return
    const time = state.clock.getElapsedTime()
    const x = pointer.current.x
    const y = pointer.current.y
    group.current.rotation.y = MathUtils.damp(group.current.rotation.y, time * 0.14 + x * 0.34, 2.2, delta)
    group.current.rotation.x = MathUtils.damp(group.current.rotation.x, y * 0.18, 2.2, delta)
    group.current.rotation.z = MathUtils.damp(group.current.rotation.z, -x * 0.11, 2.2, delta)
    light.current.position.x = MathUtils.damp(light.current.position.x, 2.8 + x * 2.1, 2, delta)
    light.current.position.y = MathUtils.damp(light.current.position.y, 1.8 + y * 1.4, 2, delta)
    light.current.color.lerp(targetColor, Math.min(delta * 1.6, 1))
  })

  return <group ref={group}>
    <pointLight ref={light} position={[2.8, 1.8, 3]} intensity={18} distance={9} color="#b6b1ff" />
    <pointLight position={[-3, -2, 1]} intensity={10} distance={8} color="#72b7ff" />
    <Float speed={reducedMotion ? 0 : 1.05} rotationIntensity={0} floatIntensity={reducedMotion ? 0 : 0.42}>
      <mesh scale={1.16}>
        <icosahedronGeometry args={[1, 3]} />
        <MeshDistortMaterial color="#7e8fe8" metalness={0.77} roughness={0.18} distort={0.18} speed={1.05} transparent opacity={0.94} />
      </mesh>
      <mesh scale={1.33} rotation={[0.55, 0.2, -0.2]}>
        <torusKnotGeometry args={[0.66, 0.045, 76, 10, 2, 3]} />
        <meshStandardMaterial color="#c0b4ff" metalness={0.9} roughness={0.16} emissive="#242252" emissiveIntensity={0.28} />
      </mesh>
    </Float>
  </group>
}

function HeroSculpture() {
  const [reducedMotion, setReducedMotion] = useState(false)
  const [canvasReady, setCanvasReady] = useState(false)
  const pointer = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const move = (event) => {
      pointer.current.x = (event.clientX / window.innerWidth - 0.5) * 2
      pointer.current.y = -((event.clientY / window.innerHeight - 0.5) * 2)
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [])

  const fallback = <div className="sculpture-fallback" aria-hidden="true"><span /><i /><b /></div>

  return <div className={`hero-sculpture ${canvasReady ? 'canvas-ready' : ''}`} aria-label="Interactive abstract studio sculpture">
    {fallback}
    <SculptureBoundary fallback={fallback}>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 4.6], fov: 36 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        frameloop={reducedMotion ? 'demand' : 'always'}
        fallback={fallback}
        onCreated={() => setCanvasReady(true)}
      >
        <ambientLight intensity={1.3} color="#adb8ff" />
        <Sculpture pointer={pointer} reducedMotion={reducedMotion} />
      </Canvas>
    </SculptureBoundary>
  </div>
}

export default HeroSculpture
