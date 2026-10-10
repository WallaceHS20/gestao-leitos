import type { ReactNode } from "react";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Tree({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Tronco */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.12, 0.18, 0.9, 8]} />
        <meshStandardMaterial color="#6e4f3a" roughness={0.9} />
      </mesh>

      {/* Folhagem principal */}
      <mesh position={[0, 1.25, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.65, 12, 10]} />
        <meshStandardMaterial color="#3b7a57" roughness={0.8} />
      </mesh>

      {/* Folhagem secundária para volume */}
      <mesh position={[0.25, 1.45, 0.1]} castShadow receiveShadow>
        <sphereGeometry args={[0.4, 10, 8]} />
        <meshStandardMaterial color="#4c9a6a" roughness={0.8} />
      </mesh>
    </group>
  );
}

function Building({
  position,
  size,
  color,
}: {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
}) {
  const [width, height, depth] = size;
  const windows: ReactNode[] = [];

  for (let floor = 0; floor < Math.floor(height / 1.2); floor++) {
    for (let col = 0; col < Math.floor(width / 1.2); col++) {
      windows.push(
        <mesh
          key={`${floor}-${col}`}
          position={[
            -width / 2 + 0.65 + col * 1.2,
            0.7 + floor * 1.2,
            depth / 2 + 0.015,
          ]}
        >
          <boxGeometry args={[0.38, 0.48, 0.035]} />
          <meshStandardMaterial
            color="#d0efff"
            roughness={0.1}
            metalness={0.8}
            emissive="#70bfff"
            emissiveIntensity={0.15}
          />
        </mesh>,
      );
    }
  }

  return (
    <group position={position}>
      {/* Corpo do Prédio */}
      <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial color={color} roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Detalhe da Cobertura (Roof trim) */}
      <mesh position={[0, height + 0.1, 0]} castShadow>
        <boxGeometry args={[width + 0.2, 0.2, depth + 0.2]} />
        <meshStandardMaterial color="#4a5568" roughness={0.5} />
      </mesh>

      {windows}
    </group>
  );
}

function Vehicle({
  position,
  color,
  ambulance = false,
}: {
  position: [number, number, number];
  color: string;
  ambulance?: boolean;
}) {
  return (
    <group position={position}>
      {/* Carroceria */}
      <mesh position={[0, 0.42, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.7, 0.48, 0.85]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.3} />
      </mesh>

      {/* Cabine */}
      <mesh position={[-0.08, 0.78, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.88, 0.36, 0.72]} />
        <meshStandardMaterial color="#1a202c" roughness={0.1} metalness={0.9} />
      </mesh>

      {/* Rodas */}
      {[-1, 1].map((side) =>
        [-1, 1].map((end) => (
          <mesh
            key={`${side}-${end}`}
            position={[end * 0.52, 0.2, side * 0.43]}
            rotation={[Math.PI / 2, 0, 0]}
            castShadow
          >
            <cylinderGeometry args={[0.18, 0.18, 0.12, 12]} />
            <meshStandardMaterial color="#111827" roughness={0.9} />
          </mesh>
        )),
      )}

      {ambulance && (
        <>
          {/* Faixa vermelha */}
          <mesh position={[0, 0.47, 0.432]}>
            <boxGeometry args={[1.25, 0.12, 0.02]} />
            <meshStandardMaterial color="#ef4444" roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.47, -0.432]}>
            <boxGeometry args={[1.25, 0.12, 0.02]} />
            <meshStandardMaterial color="#ef4444" roughness={0.3} />
          </mesh>

          {/* Giroflex com brilho */}
          <mesh position={[0, 1.0, 0]}>
            <boxGeometry args={[0.38, 0.08, 0.2]} />
            <meshStandardMaterial
              color="#3b82f6"
              emissive="#3b82f6"
              emissiveIntensity={0.8}
            />
          </mesh>
        </>
      )}
    </group>
  );
}

// Componente para carros em movimento na via
function MovingVehicle({
  initialX,
  z,
  color,
  speed,
  direction,
}: {
  initialX: number;
  z: number;
  color: string;
  speed: number;
  direction: number; // 1 ou -1
}) {
  const ref = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.position.x += speed * direction * delta;
      // Loop infinito na pista
      if (direction === 1 && ref.current.position.x > 18) {
        ref.current.position.x = -18;
      } else if (direction === -1 && ref.current.position.x < -18) {
        ref.current.position.x = 18;
      }
    }
  });

  return (
    <group
      ref={ref}
      position={[initialX, -0.15, z]}
      rotation={[0, direction === 1 ? 0 : Math.PI, 0]}
    >
      <Vehicle position={[0, 0, 0]} color={color} />
    </group>
  );
}

export default function HospitalExterior() {
  return (
    <group>
      {/* Gramado com margem confortável */}
      <mesh position={[0, -0.31, 0]} receiveShadow>
        <boxGeometry args={[42, 0.12, 34]} />
        <meshStandardMaterial color="#a3d99d" roughness={0.9} />
      </mesh>

      {/* Rua um pouco mais afastada */}
      <mesh position={[0, -0.23, 12]} receiveShadow>
        <boxGeometry args={[42, 0.06, 4.5]} />
        <meshStandardMaterial color="#2d3748" roughness={0.9} />
      </mesh>

      {/* Faixa divisória */}
      <mesh position={[0, -0.19, 12]} receiveShadow>
        <boxGeometry args={[40, 0.01, 0.12]} />
        <meshStandardMaterial color="#ecc94b" />
      </mesh>

      {/* Vagas de estacionamento */}
      {[-9, -6, -3, 0, 3, 6, 9].map((x) => (
        <group key={x} position={[x, -0.19, 9]}>
          <mesh>
            <boxGeometry args={[0.05, 0.015, 2.5]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
        </group>
      ))}

      {/* Veículos estacionados */}
      <Vehicle position={[-6, -0.15, 8.8]} color="#edf2f7" />
      <Vehicle position={[-2, -0.15, 8.8]} color="#d69e2e" />
      <Vehicle position={[2, -0.15, 8.8]} color="#3182ce" />
      <Vehicle position={[6, -0.15, 8.8]} color="#ffffff" ambulance />

      {/* Tráfego */}
      <MovingVehicle
        initialX={-16}
        z={11}
        color="#e53e3e"
        speed={4}
        direction={1}
      />
      <MovingVehicle
        initialX={8}
        z={13}
        color="#4a5568"
        speed={3}
        direction={-1}
      />

      {/* Prédios vizinhos com distância moderada */}
      <Building
        position={[-14, -0.25, -2]}
        size={[3.5, 4.5, 3.5]}
        color="#e2e8f0"
      />

      <Building
        position={[14, -0.25, -2]}
        size={[3.5, 5.5, 3.5]}
        color="#cbd5e0"
      />

      {/* Árvores ao redor do terreno */}
      <Tree position={[-11, -0.15, 1]} />
      <Tree position={[-12, -0.15, 5]} />
      <Tree position={[11, -0.15, 1]} />
      <Tree position={[12, -0.15, 5]} />

      <Tree position={[-10, -0.15, -9]} />
      <Tree position={[10, -0.15, -9]} />
    </group>
  );
}
