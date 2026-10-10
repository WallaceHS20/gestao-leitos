
import type { useBeds } from '../../hoocks/useBds'
import type { HospitalRoom } from '../../types/bed'
import { ROOM_TYPE_LABELS } from '../../types/bed'

type RoomStats = ReturnType<typeof useBeds>['roomStats'][number]

interface Props {
  room: HospitalRoom | null
  stats: RoomStats | null
}

const money = (value: number) =>
  value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

export default function RoomDetailsPanel({ room, stats }: Props) {
  if (!room || !stats) {
    return (
      <aside className="details-panel">
        <h3>Detalhes do quarto</h3>
        <p>Selecione um quarto para consultar os indicadores.</p>
      </aside>
    )
  }

  return (
    <aside className="details-panel room-details-panel">
      <span className="panel-eyebrow">VISÃO DO AMBIENTE</span>
      <h2>{room.name}</h2>
      <p>{ROOM_TYPE_LABELS[room.type]}</p>

      <div className="room-occupancy">
        <div>
          <span>Ocupação</span>
          <strong>{stats.occupancy}%</strong>
        </div>
        <div className="progress-track">
          <div style={{ width: `${stats.occupancy}%` }} />
        </div>
      </div>

      <div className="room-metrics">
        <div className="room-metric">
          <span>Capacidade</span>
          <strong>{stats.total}</strong>
        </div>
        <div className="room-metric">
          <span>Ocupados</span>
          <strong>{stats.ocupados}</strong>
        </div>
        <div className="room-metric">
          <span>Disponíveis</span>
          <strong>{stats.livres}</strong>
        </div>
        <div className="room-metric">
          <span>Higienização</span>
          <strong>{stats.higienizacao}</strong>
        </div>
        <div className="room-metric">
          <span>Manutenção</span>
          <strong>{stats.manutencao}</strong>
        </div>
        <div className="room-metric">
          <span>Altas previstas</span>
          <strong>{stats.expectedDischarges}</strong>
        </div>
      </div>

      <div className="financial-summary">
        <span>Custo diário estimado</span>
        <strong>{money(stats.dailyCost)}</strong>

        <span>Custo acumulado estimado</span>
        <strong>{money(stats.accumulatedCost)}</strong>
      </div>

      <p className="panel-footnote">
        Valores ilustrativos calculados a partir dos dados fictícios
        das internações cadastradas.
      </p>
    </aside>
  )
}
