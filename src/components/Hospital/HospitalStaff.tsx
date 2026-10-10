import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";

interface Props {
  position: [number, number, number];
  role: "NURSE" | "CLEANING";
  moving?: boolean;
}

export default function HospitalStaff({
  position,
  role,
  moving = false,
}: Props) {
  const group = useRef<Group>(null);
  const isCleaner = role === "CLEANING";

  useFrame(({ clock }) => {
    if (!group.current) return;

    const time = clock.getElapsedTime();

    // Suave flutuação/caminhada vertical
    group.current.position.y =
      position[1] + (moving ? Math.abs(Math.sin(time * 4)) * 0.035 : 0);

    if (moving) {
      group.current.position.x = position[0] + Math.sin(time * 0.45) * 0.65;

      group.current.rotation.y = Math.cos(time * 0.45) > 0 ? 0 : Math.PI;
    }
  });

  return (
    <group ref={group} position={position} scale={0.75}>
      {/* --- PERNAS --- */}
      <mesh position={[-0.12, 0.28, 0]} castShadow>
        <capsuleGeometry args={[0.07, 0.35, 4, 8]} />
        <meshStandardMaterial
          color={isCleaner ? "#0f766e" : "#334155"}
          roughness={0.7}
        />
      </mesh>

      <mesh position={[0.12, 0.28, 0]} castShadow>
        <capsuleGeometry args={[0.07, 0.35, 4, 8]} />
        <meshStandardMaterial
          color={isCleaner ? "#0f766e" : "#334155"}
          roughness={0.7}
        />
      </mesh>

      {/* --- TRONCO / UNIFORME --- */}
      <mesh position={[0, 0.76, 0]} castShadow>
        <capsuleGeometry args={[0.22, 0.43, 4, 12]} />
        <meshStandardMaterial
          color={isCleaner ? "#14b8a6" : "#f8fafc"} // Jaleco branco clássico para enfermeira
          roughness={0.6}
        />
      </mesh>

      {/* Detalhe: Botões / Detalhe frontal do jaleco */}
      {!isCleaner && (
        <group position={[0, 0.75, 0.22]}>
          <mesh position={[0, 0.1, 0]}>
            <sphereGeometry args={[0.015, 8, 8]} />
            <meshStandardMaterial color="#cbd5e1" />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.015, 8, 8]} />
            <meshStandardMaterial color="#cbd5e1" />
          </mesh>
          <mesh position={[0, -0.1, 0]}>
            <sphereGeometry args={[0.015, 8, 8]} />
            <meshStandardMaterial color="#cbd5e1" />
          </mesh>
        </group>
      )}

      {/* --- CABEÇA --- */}
      <mesh position={[0, 1.25, 0]} castShadow>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color="#d9a17b" roughness={0.9} />
      </mesh>

      {/* --- CABELO / TOUCA --- */}
      {isCleaner ? (
        <mesh position={[0, 1.37, -0.015]} castShadow>
          <sphereGeometry args={[0.185, 16, 12]} />
          <meshStandardMaterial color="#49352c" roughness={1} />
        </mesh>
      ) : (
        /* Touca de Enfermeira Clássica com Cruz Vermelha */
        <group position={[0, 1.33, 0]}>
          {/* Touca branca */}
          <mesh position={[0, 0.05, 0]} castShadow>
            <sphereGeometry args={[0.19, 16, 12]}  />
            <meshStandardMaterial color="#ffffff" roughness={0.5} />
          </mesh>
          {/* Detalhe da cruz da touca */}
          <group position={[0, 0.15, 0.14]} rotation={[0.2, 0, 0]}>
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[0.06, 0.02, 0.01]} />
              <meshStandardMaterial color="#ef4444" />
            </mesh>
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[0.02, 0.06, 0.01]} />
              <meshStandardMaterial color="#ef4444" />
            </mesh>
          </group>
        </group>
      )}

      {/* --- BRAÇOS --- */}
      <mesh position={[-0.27, 0.77, 0]} rotation={[0, 0, 0.18]} castShadow>
        <capsuleGeometry args={[0.055, 0.3, 4, 8]} />
        <meshStandardMaterial
          color={isCleaner ? "#d9a17b" : "#f8fafc"}
          roughness={0.6}
        />
      </mesh>

      <mesh position={[0.27, 0.77, 0]} rotation={[0, 0, -0.18]} castShadow>
        <capsuleGeometry args={[0.055, 0.3, 4, 8]} />
        <meshStandardMaterial
          color={isCleaner ? "#d9a17b" : "#f8fafc"}
          roughness={0.6}
        />
      </mesh>

      {/* --- CRACHÁ / IDENTIFICAÇÃO COM CRUZ VERMELHA --- */}
      {isCleaner ? (
        <mesh position={[0, 0.77, 0.205]}>
          <boxGeometry args={[0.12, 0.12, 0.025]} />
          <meshStandardMaterial color="#fef3c7" />
        </mesh>
      ) : (
        <group position={[0.1, 0.78, 0.22]}>
          {/* Crachá */}
          <mesh>
            <boxGeometry args={[0.07, 0.09, 0.02]} />
            <meshStandardMaterial color="#ffffff" roughness={0.3} />
          </mesh>
          {/* Mini símbolo da cruz no crachá */}
          <mesh position={[0, 0.01, 0.012]}>
            <boxGeometry args={[0.03, 0.01, 0.005]} />
            <meshStandardMaterial color="#ef4444" />
          </mesh>
          <mesh position={[0, 0.01, 0.012]}>
            <boxGeometry args={[0.01, 0.03, 0.005]} />
            <meshStandardMaterial color="#ef4444" />
          </mesh>
        </group>
      )}
    </group>
  );
}
