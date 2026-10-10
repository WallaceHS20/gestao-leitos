
interface StatCardProps {
  label: string
  value: number
  color: string
}

export default function StatCard({
  label,
  value,
  color,
}: StatCardProps) {
  return (
    <div className="stat-card">
      <span
        className="stat-dot"
        style={{ background: color }}
      />

      <div>
        <p>{label}</p>
        <strong>{value}</strong>
      </div>
    </div>
  )
}
