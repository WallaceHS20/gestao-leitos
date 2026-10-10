
export type BedStatus =
  | 'LIVRE'
  | 'OCUPADO'
  | 'HIGIENIZACAO'
  | 'MANUTENCAO'

export type RoomType =
  | 'PRIVATIVO'
  | 'DUPLO'
  | 'ENFERMARIA'
  | 'UTI'
  | 'ISOLAMENTO'

export type BedType =
  | 'CLINICO'
  | 'CIRURGICO'
  | 'INTENSIVO'
  | 'PEDIATRICO'
  | 'MATERNIDADE'

export interface HealthPlan {
  name: string
  type: 'INDIVIDUAL' | 'EMPRESARIAL' | 'FAMILIAR' | 'PARTICULAR'
  isHolder: boolean | null
}

export interface Patient {
  id: number
  name: string
  admissionDate: string
  reason: string
  expectedDischargeDate: string | null
  healthPlan: HealthPlan | null
}

export interface HospitalRoom {
  id: number
  name: string
  type: RoomType
  floor: number
  position: [number, number, number]
  bedIds: number[]
}

export interface Bed {
  id: number
  roomId: number
  room: string
  type: BedType
  position: [number, number, number]
  status: BedStatus
  dailyCost: number
  patient: Patient | null
}

export const BED_STATUS_LABELS: Record<BedStatus, string> = {
  LIVRE: 'Livre',
  OCUPADO: 'Ocupado',
  HIGIENIZACAO: 'Em higienização',
  MANUTENCAO: 'Em manutenção',
}

export const BED_STATUS_COLORS: Record<BedStatus, string> = {
  LIVRE: '#22c55e',
  OCUPADO: '#3b82f6',
  HIGIENIZACAO: '#f59e0b',
  MANUTENCAO: '#ef4444',
}

export const ROOM_TYPE_LABELS: Record<RoomType, string> = {
  PRIVATIVO: 'Quarto privativo',
  DUPLO: 'Quarto duplo',
  ENFERMARIA: 'Enfermaria',
  UTI: 'UTI',
  ISOLAMENTO: 'Isolamento',
}

export const BED_TYPE_LABELS: Record<BedType, string> = {
  CLINICO: 'Internação clínica',
  CIRURGICO: 'Internação cirúrgica',
  INTENSIVO: 'Terapia intensiva',
  PEDIATRICO: 'Pediátrico',
  MATERNIDADE: 'Maternidade',
}
