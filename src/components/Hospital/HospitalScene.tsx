import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";

import HospitalFloor from "./HospitalFloor";
import HospitalRoom, { ROOM_DIMENSIONS } from "./HospitalRoom";
import HospitalBed from "./HospitalBed";
import HospitalStaff from "./HospitalStaff";

import type { Bed, HospitalRoom as Room } from "../../types/bed";
import HospitalExterior from "./HospitalExterior";

interface Props {
  beds: Bed[];
  rooms: Room[];
  selectedId: number | null;
  onSelect: (id: number | null) => void;
  onSelectRoom: (id: number) => void;
}

interface WorldProps extends Props {}

/**
 * Função utilitária para calcular a posição padrão de cada leito
 * com base na dimensão do quarto e na quantidade de camas.
 */
function getStandardizedBedPosition(
  bedIndexInRoom: number,
  totalBedsInRoom: number,
  room: Room,
): [number, number, number] {
  const [roomX, roomY, roomZ] = room.position;
  const [width, depth] = ROOM_DIMENSIONS[room.type] ?? [5.2, 5.2];

  // Quarto com um único leito.
  if (totalBedsInRoom === 1) {
    return [roomX, roomY + 0.1, roomZ + 0.1];
  }

  // Dois leitos: lado a lado.
  if (totalBedsInRoom === 2) {
    const offsetX = bedIndexInRoom === 0 ? -width * 0.22 : width * 0.22;
    return [roomX + offsetX, roomY + 0.1, roomZ + 0.1];
  }

  // Suporte a 5 leitos (Formato em cruz/grid solicitado)
  if (totalBedsInRoom === 5) {
    switch (bedIndexInRoom) {
      case 0:
        return [roomX - 1.3, roomY + 0.1, roomZ - 1.4];
      case 1:
        return [roomX, roomY + 0.1, roomZ];
      case 2:
        return [roomX + 1.3, roomY + 0.1, roomZ - 1.4];
      case 3:
        return [roomX - 1.3, roomY + 0.1, roomZ + 1.4];
      case 4:
        return [roomX + 1.3, roomY + 0.1, roomZ + 1.4];
      default:
        break;
    }
  }

  // Três ou mais leitos: duas colunas e fileiras centralizadas.
  const columns = 2;
  const rows = Math.ceil(totalBedsInRoom / columns);

  const columnIndex = bedIndexInRoom % columns;
  const rowIndex = Math.floor(bedIndexInRoom / columns);

  const offsetX = columnIndex === 0 ? -width * 0.22 : width * 0.22;

  // Distribui as fileiras ao longo da profundidade do quarto.
  const rowSpacing = Math.min(1.5, (depth - 1.2) / Math.max(rows - 1, 1));
  const startZ = -((rows - 1) * rowSpacing) / 2;
  const offsetZ = startZ + rowIndex * rowSpacing;

  return [roomX + offsetX, roomY + 0.1, roomZ + offsetZ];
}

function HospitalWorld({
  beds,
  rooms,
  selectedId,
  onSelect,
  onSelectRoom,
}: WorldProps) {
  // Prepara a lista de leitos com posições dinâmicas calculadas
  const bedsWithCalculatedPositions = rooms.flatMap((room) => {
    const roomBeds = beds.filter((b) => b.roomId === room.id);

    return roomBeds.map((bed, index) => ({
      ...bed,
      calculatedPosition: getStandardizedBedPosition(
        index,
        roomBeds.length,
        room,
      ),
    }));
  });

  const cleaningBeds = bedsWithCalculatedPositions.filter(
    (bed) => bed.status === "HIGIENIZACAO",
  );

  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight position={[7, 12, 5]} intensity={2} castShadow />
      <Environment preset="city" />
      <HospitalExterior />
      <HospitalFloor />

      {/* --- PAREDES EXTERNAS DO HOSPITAL --- */}
      {/* Parede dos fundos */}
      <mesh position={[0, 0.55, -8.7]} castShadow>
        <boxGeometry args={[17.6, 3.2, 0.2]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.8} />
      </mesh>
      {/* Parede lateral esquerda */}
      <mesh position={[-8.7, 0.55, -0.4]} castShadow>
        <boxGeometry args={[0.2, 3.2, 16.4]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.8} />
      </mesh>
      {/* Parede lateral direita */}
      <mesh position={[8.7, 0.55, -0.4]} castShadow>
        <boxGeometry args={[0.2, 3.2, 16.4]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.8} />
      </mesh>
      {/* Fachada frontal esquerda — entrada central */}
      <mesh position={[-5.1, 0.55, 7.8]} castShadow>
        <boxGeometry args={[7.2, 1.2, 0.2]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.8} />
      </mesh>
      {/* Fachada frontal direita — entrada central */}
      <mesh position={[5.1, 0.55, 7.8]} castShadow>
        <boxGeometry args={[7.2, 1.2, 0.2]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.8} />
      </mesh>

      {/* Quartos */}
      {rooms.map((room) => (
        <HospitalRoom key={room.id} room={room} onSelect={onSelectRoom} />
      ))}
      {/* Leitos clicáveis com posições padronizadas e limpas */}
      {bedsWithCalculatedPositions.map((bed) => (
        <HospitalBed
          key={bed.id}
          bed={{ ...bed, position: bed.calculatedPosition }}
          selected={selectedId === bed.id}
          onSelect={onSelect}
        />
      ))}
      {/* Enfermeira circulando pelo corredor */}
      <HospitalStaff position={[0, 0, 2.0]} role="NURSE" moving />
      {/* Profissionais próximos aos leitos em higienização */}
      {cleaningBeds.map((bed) => (
        <HospitalStaff
          key={`cleaner-${bed.id}`}
          position={[
            bed.calculatedPosition[0] + 0.75,
            0,
            bed.calculatedPosition[2] + 0.45,
          ]}
          role="CLEANING"
        />
      ))}
      <ContactShadows
        position={[0, -0.2, 0]}
        opacity={0.22}
        scale={32}
        blur={2.5}
      />
      <OrbitControls
        makeDefault
        enablePan
        minDistance={8}
        maxDistance={28}
        maxPolarAngle={Math.PI / 2.05}
        target={[0, 0, 0]}
      />
    </>
  );
}

export default function HospitalScene(props: Props) {
  return (
    <Canvas
      shadows
      camera={{
        position: [18, 23, 25],
        fov: 38,
      }}
      onPointerMissed={() => props.onSelect(null)}
    >
      <HospitalWorld {...props} />
    </Canvas>
  );
}
