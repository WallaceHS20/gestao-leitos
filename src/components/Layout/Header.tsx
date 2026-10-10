
interface HeaderProps {
  hospitalName: string
}

export default function Header({ hospitalName }: HeaderProps) {
  return (
    <header className="topbar">
      <div className="brand">
        <div className="brand-icon">B+</div>

        <div>
          <strong>
            {hospitalName} <span>3D</span>
          </strong>
          <small>Gestão inteligente de leitos</small>
        </div>
      </div>

      <div className="topbar-right">
        <span className="live-dot" />
        Ambiente de demonstração

        <div className="avatar">WH</div>
      </div>
    </header>
  )
}
