import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'

// ==========================
// Types
// ==========================
export type DocNode = {
  id: string
  label: string
  cluster: number
  pos: [number, number, number]
  size: number
  color: [number, number, number]
}

export type DocEdge = {
  a: number
  b: number
  w: number
}

export type GraphData = {
  nodes: DocNode[]
  edges: DocEdge[]
  lattice: THREE.BufferGeometry
}

// ==========================
// Helpers
// ==========================
function seededRandom(seed = 1) {
  let s = seed >>> 0
  return () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296
}

function buildLatticeGeometry({ cells = 6, scale = 1.0 }: { cells?: number; scale?: number }) {
  const segments: number[] = []
  const pushLine = (ax: [number, number, number], bx: [number, number, number]) => {
    segments.push(ax[0], ax[1], ax[2], bx[0], bx[1], bx[2])
  }
  for (let y = 0; y <= cells; y++) {
    for (let z = 0; z <= cells; z++) {
      pushLine([0, y, z] as any, [cells, y, z] as any)
    }
  }
  for (let x = 0; x <= cells; x++) {
    for (let z = 0; z <= cells; z++) {
      pushLine([x, 0, z] as any, [x, cells, z] as any)
    }
  }
  for (let x = 0; x <= cells; x++) {
    for (let y = 0; y <= cells; y++) {
      pushLine([x, y, 0] as any, [x, y, cells] as any)
    }
  }
  const norm = (v: number) => ((v / cells) * 2 - 1) * scale
  for (let i = 0; i < segments.length; i++) segments[i] = norm(segments[i])

  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(segments), 3))
  return g
}

function generateEdgeSlots({ cells = 6 }: { cells?: number }): [number, number, number][] {
  const slots: [number, number, number][] = []
  for (let y = 0; y <= cells; y++) {
    for (let z = 0; z <= cells; z++) {
      for (let x = 0; x < cells; x++) slots.push([x + 0.5, y, z] as any)
    }
  }
  for (let x = 0; x <= cells; x++) {
    for (let z = 0; z <= cells; z++) {
      for (let y = 0; y < cells; y++) slots.push([x, y + 0.5, z] as any)
    }
  }
  for (let x = 0; x <= cells; x++) {
    for (let y = 0; y <= cells; y++) {
      for (let z = 0; z < cells; z++) slots.push([x, y, z + 0.5] as any)
    }
  }
  return slots.map(([x, y, z]) => [x, y, z].map((v) => (v / cells) * 2 - 1) as [number, number, number])
}

function generateLatticeGraph({
  cells = 6,
  docs = 1200,
  seed = 123,
}: {
  cells?: number
  docs?: number
  seed?: number
}): GraphData {
  const rand = seededRandom(seed)

  const slots = generateEdgeSlots({ cells })
  const chosenIdx = new Set<number>()
  while (chosenIdx.size < Math.min(docs, slots.length)) {
    chosenIdx.add(Math.floor(rand() * slots.length))
  }
  const chosen = Array.from(chosenIdx)

  const nodes: DocNode[] = chosen.map((sIdx, i) => {
    const [x, y, z] = slots[sIdx]

    const sizeRoll = rand()
    let size: number
    if (sizeRoll < 0.7) size = 0.05
    else if (sizeRoll < 0.95) size = 0.1
    else size = 0.15

    const starPalette: [number, number, number][] = [
      [0.61, 0.70, 1.0],
      [0.76, 0.82, 1.0],
      [0.95, 0.97, 1.0],
      [1.0, 1.0, 0.94],
      [1.0, 0.98, 0.82],
      [1.0, 0.91, 0.67],
      [1.0, 0.76, 0.47],
      [1.0, 0.65, 0.38],
      [1.0, 0.55, 0.35],
    ]
    const base = starPalette[Math.floor(rand() * starPalette.length)]
    const jitter = rand() * 0.05
    const r = Math.min(1, Math.max(0, base[0] + (rand() - 0.5) * jitter))
    const g = Math.min(1, Math.max(0, base[1] + (rand() - 0.5) * jitter))
    const b = Math.min(1, Math.max(0, base[2] + (rand() - 0.5) * jitter))

    return {
      id: `DOC-${i}`,
      label: `Paper ${i}`,
      cluster: 0,
      pos: [x, y, z],
      size,
      color: [r, g, b],
    }
  })

  const edgeSet = new Set<string>()
  const edges: DocEdge[] = []
  const bin = (v: number) => Math.floor(((v + 1) / 2) * cells)
  const buckets = new Map<string, number[]>()
  nodes.forEach((n, i) => {
    const key = `${bin(n.pos[0])}_${bin(n.pos[1])}_${bin(n.pos[2])}`
    const arr = buckets.get(key) || []
    arr.push(i)
    buckets.set(key, arr)
  })
  const neighborIdx = (i: number) => {
    const n = nodes[i]
    const bx = bin(n.pos[0]), by = bin(n.pos[1]), bz = bin(n.pos[2])
    const cand: number[] = []
    for (let dx = -1; dx <= 1; dx++)
      for (let dy = -1; dy <= 1; dy++)
        for (let dz = -1; dz <= 1; dz++) {
          const key = `${bx + dx}_${by + dy}_${bz + dz}`
          const arr = buckets.get(key)
          if (arr) cand.push(...arr)
        }
    return cand
  }
  for (let i = 0; i < nodes.length; i++) {
    const cand = neighborIdx(i)
    const maxTry = 12
    const connections = 1 + Math.floor(rand() * 3)
    let made = 0, tries = 0
    while (made < connections && tries < maxTry) {
      tries++
      const j = cand[Math.floor(rand() * cand.length)]
      if (j === i) continue
      const a = Math.min(i, j), b = Math.max(i, j)
      const key = `${a}-${b}`
      if (edgeSet.has(key)) continue
      const d = new THREE.Vector3(...nodes[i].pos).distanceTo(new THREE.Vector3(...nodes[j].pos))
      const w = Math.max(0, 1 - d / 1.2) * (0.5 + rand() * 0.5)
      edgeSet.add(key)
      edges.push({ a, b, w })
      made++
    }
  }

  const lattice = buildLatticeGeometry({ cells, scale: 1.05 })
  return { nodes, edges, lattice }
}

// ==========================
// Components 3D
// ==========================
function InstancedNodes({
  nodes,
  onHoverIndex,
  onSelectIndex
}: {
  nodes: DocNode[]
  onHoverIndex: (i: number | null) => void
  onSelectIndex: (i: number | null) => void
}) {
  const coreRef = useRef<THREE.InstancedMesh>(null!)
  const haloRef = useRef<THREE.InstancedMesh>(null!)
  const dummy = useMemo(() => new THREE.Object3D(), [])

  // Datos por estrella para parpadeo irregular (multi-frecuencia + destello)
  const twinkleData = useMemo(
    () =>
      nodes.map(() => ({
        p1: Math.random() * Math.PI * 2,
        p2: Math.random() * Math.PI * 2,
        p3: Math.random() * Math.PI * 2,
        f1: 0.35 + Math.random() * 0.50,
        f2: 1.00 + Math.random() * 0.80,
        f3: 3.50 + Math.random() * 1.80,
        glintFreq: 0.05 + Math.random() * 0.15,
        glintPhase: Math.random() * Math.PI * 2,
        base: 0.55 + Math.random() * 0.25,
        amp: 0.35 + Math.random() * 0.25,
        scaleAmp: 0.06 + Math.random() * 0.06
      })),
    [nodes]
  )

  useEffect(() => {
    if (!coreRef.current || !haloRef.current) return

    const color = new THREE.Color()

    // Núcleo
    nodes.forEach((n, i) => {
      dummy.position.set(n.pos[0], n.pos[1], n.pos[2])
      dummy.scale.setScalar(0.014 * n.size)
      dummy.updateMatrix()
      coreRef.current.setMatrixAt(i, dummy.matrix)
      color.setRGB(n.color[0], n.color[1], n.color[2])
      coreRef.current.setColorAt(i, color)
    })
    coreRef.current.instanceMatrix.needsUpdate = true
    if (coreRef.current.instanceColor) coreRef.current.instanceColor.needsUpdate = true

    // Halo
    nodes.forEach((n, i) => {
      dummy.position.set(n.pos[0], n.pos[1], n.pos[2])
      dummy.scale.setScalar(0.028 * n.size)
      dummy.updateMatrix()
      haloRef.current.setMatrixAt(i, dummy.matrix)
      const c = new THREE.Color(n.color[0], n.color[1], n.color[2])
      haloRef.current.setColorAt(i, c)
    })
    haloRef.current.instanceMatrix.needsUpdate = true
    if (haloRef.current.instanceColor) haloRef.current.instanceColor.needsUpdate = true
  }, [nodes, dummy])

  useFrame((state) => {
    if (!haloRef.current) return

    const time = state.clock.elapsedTime
    const color = new THREE.Color()

    // Twinkle en el halo
    nodes.forEach((n, i) => {
      const td = (twinkleData as any)[i]
      const s1 = Math.sin(time * td.f1 + td.p1)
      const s2 = Math.sin(time * td.f2 + td.p2)
      const s3 = Math.sin(time * td.f3 + td.p3)
      let tw = 0.50 * s1 + 0.30 * s2 + 0.20 * s3 + 0.10 * Math.sin((s1 + s2 * s3) * 2.5 + td.p2)
      tw = (tw + 1) * 0.5
      const gl = Math.max(0, Math.sin(time * (6 + 4 * tw) * td.glintFreq + td.glintPhase))
      const glint = Math.pow(gl, 6) * 0.85

      const brightness = THREE.MathUtils.clamp(td.base + td.amp * (tw - 0.5) * 2 + glint, 0.15, 1.35)
      const scaleJitter = 1.0 + td.scaleAmp * ((tw - 0.5) * 2) + glint * 0.1

      color.setRGB(n.color[0] * brightness, n.color[1] * brightness, n.color[2] * brightness)
      haloRef.current.setColorAt(i, color)

      const m = new THREE.Matrix4()
      const q = new THREE.Quaternion()
      const pos = new THREE.Vector3(n.pos[0], n.pos[1], n.pos[2])
      const scl = 0.028 * n.size * scaleJitter
      q.identity()
      m.compose(pos, q, new THREE.Vector3(scl, scl, scl))
      haloRef.current.setMatrixAt(i, m)
    })

    if (haloRef.current.instanceColor) haloRef.current.instanceColor.needsUpdate = true
    haloRef.current.instanceMatrix.needsUpdate = true
  })

  const handlePointerMove = useCallback(
    (e: any) => {
      e.stopPropagation()
      const instId: number | undefined = e.instanceId
      onHoverIndex(instId ?? null)
    },
    [onHoverIndex]
  )

  const handleClick = useCallback(
    (e: any) => {
      e.stopPropagation()
      const instId: number | undefined = e.instanceId
      if (instId === undefined) return
      onSelectIndex(instId)
    },
    [onSelectIndex]
  )

  return (
    <group>
      {/* Núcleo */}
      <instancedMesh
        ref={coreRef}
        args={[undefined, undefined, nodes.length]}
        onPointerMove={handlePointerMove}
        onPointerOut={() => onHoverIndex(null)}
        onClick={handleClick}
      >
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial transparent opacity={0.9} depthWrite={false} toneMapped={false} />
      </instancedMesh>

      {/* Halo */}
      <instancedMesh ref={haloRef} args={[undefined, undefined, nodes.length]} frustumCulled={false}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial
          transparent
          opacity={0.45}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </instancedMesh>
    </group>
  )
}

function Edges({
  nodes,
  edges,
  minWeight = 0.35,
  opacity = 0.1
}: {
  nodes: DocNode[]
  edges: DocEdge[]
  minWeight?: number
  opacity?: number
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null!)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const up = useMemo(() => new THREE.Vector3(0, 1, 0), [])

  const filtered = useMemo(() => edges.filter((e) => e.w >= minWeight), [edges, minWeight])

  useEffect(() => {
    if (!meshRef.current) return
    const A = new THREE.Vector3()
    const B = new THREE.Vector3()
    const dir = new THREE.Vector3()
    const mid = new THREE.Vector3()

    filtered.forEach((e, i) => {
      A.set(nodes[e.a].pos[0], nodes[e.a].pos[1], nodes[e.a].pos[2])
      B.set(nodes[e.b].pos[0], nodes[e.b].pos[1], nodes[e.b].pos[2])
      dir.copy(B).sub(A)
      const len = dir.length()
      mid.copy(A).add(B).multiplyScalar(0.5)

      const radius = THREE.MathUtils.lerp(0.0002, 0.0004, THREE.MathUtils.clamp(e.w, 0, 1))

      dummy.position.copy(mid)
      dummy.scale.set(radius, len, radius)
      dummy.quaternion.setFromUnitVectors(up, dir.normalize())
      dummy.updateMatrix()

      meshRef.current.setMatrixAt(i, dummy.matrix)
    })
    meshRef.current.count = filtered.length
    meshRef.current.instanceMatrix.needsUpdate = true
  }, [filtered, nodes, up, dummy])

  const capacity = Math.max(1, edges.length)

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, capacity]} frustumCulled={false}>
      <cylinderGeometry args={[1, 1, 1, 8, 1, true]} />
      <meshBasicMaterial color={'#ffffff'} transparent opacity={opacity} depthWrite={false} />
    </instancedMesh>
  )
}

function Lattice({ geometry, opacity = 0.18 }: { geometry: THREE.BufferGeometry; opacity?: number }) {
  return (
    <lineSegments>
      <primitive object={geometry} attach="geometry" />
      <lineBasicMaterial color="#8ba3b5" transparent opacity={opacity} />
    </lineSegments>
  )
}

function Tooltip3D({ activeIndex, nodes }: { activeIndex: number | null; nodes: DocNode[] }) {
  const ref = useRef<HTMLDivElement>(null)
  useFrame(() => {
    if (ref.current && activeIndex != null) {
      ref.current.style.opacity = '1'
    } else if (ref.current) {
      ref.current.style.opacity = '0'
    }
  })
  const pos = useMemo(
    () => (activeIndex != null ? nodes[activeIndex].pos : ([0, 0, 0] as [number, number, number])),
    [activeIndex, nodes]
  )
  if (activeIndex == null) return null
  const item = nodes[activeIndex]
  return (
    <Html position={pos} transform occlude distanceFactor={6}>
      <div className="pointer-events-none bg-neutral-900/85 backdrop-blur border border-neutral-700 rounded-lg px-3 py-2 text-xs text-neutral-200 shadow-lg transition-opacity duration-200">
        <div className="font-medium">{item.label}</div>
        <div className="text-[11px] text-neutral-400">id {item.id}</div>
      </div>
    </Html>
  )
}

function Scene({
  data,
  hovered,
  selected,
  setHovered,
  setSelected,
  edgeThreshold,
  showEdges,
  showLattice
}: {
  data: GraphData
  hovered: number | null
  selected: number | null
  setHovered: (v: number | null) => void
  setSelected: (v: number | null) => void
  edgeThreshold: number
  showEdges: boolean
  showLattice: boolean
}) {
  return (
    <>
      <color attach="background" args={['#07090c']} />
      <fog attach="fog" args={['#07090c', 10, 24]} />
      <ambientLight intensity={0.7} />
      <pointLight position={[6, 6, 6]} intensity={0.7} />

      {showLattice && <Lattice geometry={data.lattice} />}
      {showEdges && <Edges nodes={data.nodes} edges={data.edges} minWeight={edgeThreshold} />}

      <InstancedNodes nodes={data.nodes} onHoverIndex={setHovered} onSelectIndex={setSelected} />

      <OrbitControls enableDamping dampingFactor={0.08} rotateSpeed={0.6} zoomSpeed={0.8} panSpeed={0.6} />
      <Tooltip3D activeIndex={hovered ?? selected} nodes={data.nodes} />
    </>
  )
}

// ==========================
// Sidebar
// ==========================
function Sidebar({
  data,
  hovered,
  selected,
  edgeThreshold,
  setEdgeThreshold,
  showEdges,
  setShowEdges,
  showLattice,
  setShowLattice,
}: {
  data: GraphData
  hovered: number | null
  selected: number | null
  edgeThreshold: number
  setEdgeThreshold: (v: number) => void
  showEdges: boolean
  setShowEdges: (v: boolean) => void
  showLattice: boolean
  setShowLattice: (v: boolean) => void
}) {
  const activeIndex = hovered ?? selected
  const active = activeIndex != null ? data.nodes[activeIndex] : undefined

  const visibleEdges = useMemo(
    () => data.edges.filter((e) => e.w >= edgeThreshold),
    [data.edges, edgeThreshold]
  )
  const avgWeight = useMemo(
    () => (visibleEdges.length ? visibleEdges.reduce((s, e) => s + e.w, 0) / visibleEdges.length : 0),
    [visibleEdges]
  )

  const neighbors = useMemo(() => {
    if (activeIndex == null) return []
    const list = data.edges
      .filter((e) => e.a === activeIndex || e.b === activeIndex)
      .map((e) => ({ other: e.a === activeIndex ? e.b : e.a, w: e.w }))
      .sort((a, b) => b.w - a.w)
      .slice(0, 8)
    return list
  }, [activeIndex, data.edges])

  return (
    <aside className="fixed right-0 top-0 h-screen w-[340px] z-50 bg-neutral-950/85 backdrop-blur border-l border-neutral-800 text-neutral-200 p-4 overflow-y-auto select-none">
      <div className="mb-3">
        <div className="text-lg font-semibold">Panel de documentos</div>
        <div className="text-xs text-neutral-400">Interacciones · Estadísticas · Parámetros · Controles</div>
      </div>

      {/* CONTROLES */}
      <section className="mb-4">
        <h3 className="text-sm font-semibold mb-2">Controles</h3>
        <div className="flex items-center gap-2 mb-2">
          <input id="edges" type="checkbox" checked={showEdges} onChange={(e) => setShowEdges(e.target.checked)} />
          <label htmlFor="edges" className="text-sm">Mostrar conexiones</label>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <label className="text-xs w-20 text-neutral-400">Umbral</label>
          <input
            className="w-full"
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={edgeThreshold}
            onChange={(e) => setEdgeThreshold(parseFloat(e.target.value))}
          />
          <span className="text-xs w-10 text-right">{edgeThreshold.toFixed(2)}</span>
        </div>

        <div className="flex items-center gap-2">
          <input id="lattice" type="checkbox" checked={showLattice} onChange={(e) => setShowLattice(e.target.checked)} />
          <label htmlFor="lattice" className="text-sm">Mostrar lattice</label>
        </div>
      </section>

      {/* ESTADÍSTICAS */}
      <section className="mb-4">
        <h3 className="text-sm font-semibold mb-2">Estadísticas</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-neutral-900/60 border border-neutral-800 rounded-lg p-2">
            <div className="text-neutral-400">Documentos</div>
            <div className="text-base font-semibold">{data.nodes.length.toLocaleString()}</div>
          </div>
          <div className="bg-neutral-900/60 border border-neutral-800 rounded-lg p-2">
            <div className="text-neutral-400">Conexiones (vis.)</div>
            <div className="text-base font-semibold">{visibleEdges.length.toLocaleString()}</div>
          </div>
          <div className="bg-neutral-900/60 border border-neutral-800 rounded-lg p-2">
            <div className="text-neutral-400">Peso medio</div>
            <div className="text-base font-semibold">{avgWeight.toFixed(2)}</div>
          </div>
          <div className="bg-neutral-900/60 border border-neutral-800 rounded-lg p-2">
            <div className="text-neutral-400">Umbral</div>
            <div className="text-base font-semibold">{edgeThreshold.toFixed(2)}</div>
          </div>
        </div>
      </section>

      {/* PARÁMETROS */}
      <section className="mb-4">
        <h3 className="text-sm font-semibold mb-2">Parámetros</h3>
        <ul className="text-xs text-neutral-300 space-y-1">
          <li>Algoritmo de enlace: <span className="text-neutral-400">Vecindad 3×3×3</span></li>
          <li>Escala de cubo: <span className="text-neutral-400">1.05</span></li>
          <li>Distribución de tamaños: <span className="text-neutral-400">70%/25%/5%</span></li>
          <li>Semilla: <span className="text-neutral-400">137</span></li>
        </ul>
      </section>

      {/* INTERACCIONES */}
      <section className="mb-4">
        <h3 className="text-sm font-semibold mb-2">Interacciones</h3>
        {active ? (
          <div className="bg-neutral-900/60 border border-neutral-800 rounded-lg p-2">
            <div className="text-xs text-neutral-400 mb-1">Nodo activo</div>
            <div className="text-sm font-medium">{active.label}</div>
            <div className="text-[11px] text-neutral-400 mb-2">id {active.id}</div>
            {neighbors.length ? (
              <div>
                <div className="text-xs text-neutral-400 mb-1">Top conexiones</div>
                <ul className="space-y-1">
                  {neighbors.map((n, idx) => (
                    <li key={idx} className="text-xs flex justify-between">
                      <span>{data.nodes[n.other].label}</span>
                      <span className="text-neutral-400">{n.w.toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="text-xs text-neutral-500">Sin conexiones registradas.</div>
            )}
          </div>
        ) : (
          <div className="text-xs text-neutral-400">Pasa el ratón o haz click en un punto.</div>
        )}
      </section>

      {/* ACCIONES */}
      <section className="mb-10">
        <h3 className="text-sm font-semibold mb-2">Acciones</h3>
        <div className="grid grid-cols-2 gap-2">
          <button className="pointer-events-auto text-xs bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg px-3 py-2">
            Exportar CSV
          </button>
          <button className="pointer-events-auto text-xs bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg px-3 py-2">
            Recalcular
          </button>
        </div>
      </section>

      <footer className="text-[11px] text-neutral-500">
        Cubo rendija — Demo
      </footer>
    </aside>
  )
}

export default function GraphView() {
  const [data] = useState<GraphData>(() => generateLatticeGraph({ cells: 6, docs: 900, seed: 137 }))
  const [hovered, setHovered] = useState<number | null>(null)
  const [selected, setSelected] = useState<number | null>(null)
  const [edgeThreshold, setEdgeThreshold] = useState(0.35)
  const [showEdges, setShowEdges] = useState(true)
  const [showLattice, setShowLattice] = useState(false)

  return (
    <div className="h-screen w-screen overflow-hidden font-sans relative">
      <Sidebar
        data={data}
        hovered={hovered}
        selected={selected}
        edgeThreshold={edgeThreshold}
        setEdgeThreshold={setEdgeThreshold}
        showEdges={showEdges}
        setShowEdges={setShowEdges}
        showLattice={showLattice}
        setShowLattice={setShowLattice}
      />

      <div className="h-full w-full pr-[340px]">
        <Canvas camera={{ position: [0, 0, 7], fov: 60 }} dpr={[1, 2]}>
          <Scene
            data={data}
            hovered={hovered}
            selected={selected}
            setHovered={setHovered}
            setSelected={setSelected}
            edgeThreshold={edgeThreshold}
            showEdges={showEdges}
            showLattice={showLattice}
          />
        </Canvas>
      </div>
    </div>
  )
}
