import type { HospitalRoom as Room } from "../../types/bed";

interface Props {
  room: Room;
  onSelect?: (id: number) => void;
}

export const ROOM_DIMENSIONS = {
  PRIVATIVO: [5.2, 5.2] as [number, number],
  DUPLO: [5.2, 5.2] as [number, number],
  ENFERMARIA: [5.2, 5.2] as [number, number],
  UTI: [5.2, 5.2] as [number, number],
  ISOLAMENTO: [5.2, 5.2] as [number, number],
};

export default function HospitalRoom({ room, onSelect }: Props) {
  const [width, depth] = ROOM_DIMENSIONS[room.type];
  const [x, y, z] = room.position;
  const wallHeight = 1.1;
  const wallThickness = 0.1;

  const isUTI = room.type === "UTI";

  return (
    <group position={[x, y, z]}>
      {/* Piso do quarto */}
      <mesh
        position={[0, -0.18, 0]}
        receiveShadow
        onClick={(event) => {
          event.stopPropagation();
          onSelect?.(room.id);
        }}
      >
        <boxGeometry args={[width, 0.2, depth]} />
        <meshStandardMaterial
          color={isUTI ? "#e2e8f0" : "#f1f5f9"}
          roughness={0.8}
        />
      </mesh>

      {/* Parede traseira (fundo do quarto) */}
      <mesh position={[0, wallHeight / 2 - 0.08, -depth / 2 + wallThickness / 2]} castShadow>
        <boxGeometry args={[width, wallHeight, wallThickness]} />
        <meshStandardMaterial
          color={isUTI ? "#cbd5e1" : "#e2e8f0"}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Parede lateral esquerda */}
      <mesh position={[-width / 2 + wallThickness / 2, wallHeight / 2 - 0.08, 0]} castShadow>
        <boxGeometry args={[wallThickness, wallHeight, depth]} />
        <meshStandardMaterial color="#e2e8f0" transparent opacity={0.7} />
      </mesh>

      {/* Parede lateral direita */}
      <mesh position={[width / 2 - wallThickness / 2, wallHeight / 2 - 0.08, 0]} castShadow>
        <boxGeometry args={[wallThickness, wallHeight, depth]} />
        <meshStandardMaterial color="#e2e8f0" transparent opacity={0.7} />
      </mesh>

      {/* Parede frontal dividida (com abertura central para o corredor) */}
      <mesh position={[-width / 4 - 0.4, wallHeight / 2 - 0.08, depth / 2 - wallThickness / 2]} castShadow>
        <boxGeometry args={[width / 2 - 0.8, wallHeight, wallThickness]} />
        <meshStandardMaterial color="#e2e8f0" transparent opacity={0.7} />
      </mesh>

      <mesh position={[width / 4 + 0.4, wallHeight / 2 - 0.08, depth / 2 - wallThickness / 2]} castShadow>
        <boxGeometry args={[width / 2 - 0.8, wallHeight, wallThickness]} />
        <meshStandardMaterial color="#e2e8f0" transparent opacity={0.7} />
      </mesh>

      {/* --- ELEMENTOS DECORATIVOS INTERNOS --- */}

      {/* Quadro na parede interna esquerda */}
      <group position={[-width / 2 + 0.25, 0.45, -depth / 4]} rotation={[0, Math.PI / 2, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.7, 0.5, 0.02]} />
          <meshStandardMaterial color="#2b6cb0" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0, 0.012]}>
          <planeGeometry args={[0.6, 0.4]} />
          <meshStandardMaterial color="#f0f7ff" />
        </mesh>
      </group>

      {/* Armário lateral interno */}
      <mesh position={[width / 2 - 0.5, 0.15, -depth / 2 + 0.5]} castShadow receiveShadow>
        <boxGeometry args={[0.5, 0.6, 0.6]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.5} />
      </mesh>

      {/* Placa de identificação do quarto */}
      <group position={[0, 0.65, -depth / 2 + 0.12]}>
        <mesh castShadow>
          <boxGeometry args={[Math.min(width - 0.8, 2.0), 0.22, 0.04]} />
          <meshStandardMaterial color={isUTI ? "#1e40af" : "#0284c7"} />
        </mesh>
      </group>
    </group>
  );
}