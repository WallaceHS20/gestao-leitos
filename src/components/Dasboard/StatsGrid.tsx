

import type { useBeds } from '../../hoocks/useBds'
import StatCard from './StatCard'

type BedStats = ReturnType<typeof useBeds>['stats']

interface StatsGridProps {
  stats: BedStats
}

export default function StatsGrid({ stats }: StatsGridProps) {
  return (
    <section className="stats-grid">
      <StatCard
        label="Total de leitos"
        value={stats.total}
        color="#64748b"
      />

      <StatCard
        label="Disponíveis"
        value={stats.livres}
        color="#22c55e"
      />

      <StatCard
        label="Ocupados"
        value={stats.ocupados}
        color="#3b82f6"
      />

      <StatCard
        label="Higienização"
        value={stats.higienizacao}
        color="#f59e0b"
      />

      <StatCard
        label="Manutenção"
        value={stats.manutencao}
        color="#ef4444"
      />
    </section>
  )
}
