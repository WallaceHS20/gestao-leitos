import type { HospitalRoom as Room } from "../types/bed";

export function getStandardizedBedPosition(
  bedIndexInRoom: number,
  totalBedsInRoom: number,
  room: Room,
): [number, number, number] {
  const [roomX, roomY, roomZ] = room.position;

  // 1 Leito (Privativo / Isolamento): Centralizado perfeitamente
  if (totalBedsInRoom === 1) {
    return [roomX, roomY + 0.1, roomZ];
  }

  // 2 Leitos (Duplo): Lado a lado de forma simétrica no eixo X
  if (totalBedsInRoom === 2) {
    const spacing = 1.3; // Espaçamento entre as camas
    const xOffset = (bedIndexInRoom === 0 ? -1 : 1) * spacing;
    return [roomX + xOffset, roomY + 0.1, roomZ];
  }

  // 4 ou mais leitos (Enfermaria / UTI): Grid reto perfeito (2 colunas x N linhas)
  const cols = 2;
  const colIndex = bedIndexInRoom % cols;
  const rowIndex = Math.floor(bedIndexInRoom / cols);

  // Distância simétrica a partir do centro do quarto
  const xSpacing = 1.3;
  const zSpacing = 1.6;

  // Centraliza o grid dependendo de quantas linhas ele vai ter
  const totalRows = Math.ceil(totalBedsInRoom / cols);
  const startZ = -((totalRows - 1) * zSpacing) / 2;

  const xOffset = (colIndex === 0 ? -1 : 1) * xSpacing;
  const zOffset = startZ + rowIndex * zSpacing;

  return [roomX + xOffset, roomY + 0.1, roomZ + zOffset];
}
