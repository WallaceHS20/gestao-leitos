import type { useBeds } from "../../hoocks/useBds"


type RoomStats = ReturnType<typeof useBeds>['roomStats'][number]

interface Props {
  stats: RoomStats
}

export default function RoomStatusCard({ stats }: Props) {
  return (
    <section className="details-card room-status-card">
      <div className="card-header">
        3. <h3>Capacidade e Ocupação</h3>
      </div>

      <div className="room-occupancy">
        <div className="occupancy-info">
          <span>Taxa de Ocupação</span>
          <strong>{stats.occupancy}%</strong>
        </div>
        <div className="progress-track">
          <div
            className="progress-bar"
            style={{ width: `${stats.occupancy}%` }}
          />
        </div>
      </div>

      <div className="room-metrics-grid">
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
    </section>
  )
}