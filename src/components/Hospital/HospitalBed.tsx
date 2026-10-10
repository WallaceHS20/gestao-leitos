import { BED_STATUS_COLORS, type Bed } from "../../types/bed"

interface HospitalBedProps {
  bed: Bed
  selected: boolean
  onSelect: (id: number) => void
}

export default function HospitalBed({
  bed,
  selected,
  onSelect,
}: HospitalBedProps) {
  const statusColor = BED_STATUS_COLORS[bed.status]

  function handleSelect(event: { stopPropagation: () => void }) {
    event.stopPropagation()
    onSelect(bed.id)
  }

  return (
    <group position={bed.position} onClick={handleSelect}>
      {/* Rodinhas da cama (4 cantos) */}
      {[-0.38, 0.38].map((x) =>
        [-0.72, 0.72].map((z) => (
          <mesh key={`wheel-${x}-${z}`} position={[x, 0.05, z]} castShadow>
            <cylinderGeometry args={[0.05, 0.05, 0.08, 12]} />
            <meshStandardMaterial color="#1e293b" roughness={0.9} />
          </mesh>
        )),
      )}

      {/* Base / Estrutura inferior da cama */}
      <mesh position={[0, 0.14, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.82, 0.12, 1.6]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Colchão hospitalar */}
      <mesh position={[0, 0.26, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.76, 0.14, 1.48]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.7} />
      </mesh>

      {/* Manta / Lençol decorativo na metade inferior */}
      <mesh position={[0, 0.33, 0.35]}>
        <boxGeometry args={[0.77, 0.02, 0.75]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.9} />
      </mesh>

      {/* Travesseiro com textura suave */}
      <mesh position={[0, 0.36, -0.52]} castShadow>
        <boxGeometry args={[0.52, 0.08, 0.32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.9} />
      </mesh>

      {/* Cabeceira (Headboard) */}
      <mesh position={[0, 0.42, -0.82]} castShadow>
        <boxGeometry args={[0.88, 0.58, 0.06]} />
        <meshStandardMaterial color="#475569" metalness={0.5} roughness={0.4} />
      </mesh>

      {/* Peseira (Footboard) */}
      <mesh position={[0, 0.38, 0.82]} castShadow>
        <boxGeometry args={[0.88, 0.48, 0.06]} />
        <meshStandardMaterial color="#475569" metalness={0.5} roughness={0.4} />
      </mesh>

      {/* Grades laterais retráteis (Direita e Esquerda) */}
      {[-0.42, 0.42].map((x, i) => (
        <group key={`rail-${i}`} position={[x, 0.38, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.04, 0.22, 1.1]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      ))}

      {/* Painel indicador de status na cabeceira */}
      <group position={[0, 0.62, -0.81]}>
        <mesh>
          <boxGeometry args={[0.25, 0.12, 0.04]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        <mesh position={[0, 0, 0.025]}>
          <planeGeometry args={[0.2, 0.08]} />
          <meshStandardMaterial
            color={statusColor}
            emissive={statusColor}
            emissiveIntensity={0.6}
          />
        </mesh>
      </group>

      {/* Destaque / Efeito de seleção refinado (glow no chão) */}
      {selected && (
        <group position={[0, 0.01, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.95, 1.1, 32]} />
            <meshBasicMaterial color="#3b82f6" transparent opacity={0.8} />
          </mesh>
          <mesh position={[0, 0.02, 0]}>
            <boxGeometry args={[1.04, 0.02, 1.84]} />
            <meshStandardMaterial
              color="#3b82f6"
              emissive="#3b82f6"
              emissiveIntensity={0.4}
              transparent
              opacity={0.3}
            />
          </mesh>
        </group>
      )}

      {/* Superfície de interação invisível (para facilitar o clique) */}
      <mesh position={[0, 0.75, 0]} onClick={handleSelect}>
        <boxGeometry args={[1.3, 1.6, 2.1]} />
        <meshBasicMaterial
          transparent
          opacity={0}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}