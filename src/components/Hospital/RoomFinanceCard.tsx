import type { useBeds } from "../../hoocks/useBds"


type RoomStats = ReturnType<typeof useBeds>['roomStats'][number]

interface Props {
  stats: RoomStats
}

const money = (value: number) =>
  value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

export default function RoomFinanceCard({ stats }: Props) {
  return (
    <section className="details-card room-finance-card">
      <div className="card-header">
        <h3>Resumo Financeiro</h3>
      </div>

      <div className="financial-summary-grid">
        <div className="financial-item">
          <span>Custo diário estimado</span>
          <strong>{money(stats.dailyCost)}</strong>
        </div>

        <div className="financial-item">
          <span>Custo acumulado estimado</span>
          <strong>{money(stats.accumulatedCost)}</strong>
        </div>
      </div>

      <p className="panel-footnote">
        Valores ilustrativos calculados a partir dos dados fictícios das
        internações cadastradas.
      </p>
    </section>
  )
}