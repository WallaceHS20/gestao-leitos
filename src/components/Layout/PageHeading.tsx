
interface PageHeadingProps {
  unit: string
}

export default function PageHeading({ unit }: PageHeadingProps) {
  return (
    <section className="page-heading">
      <div>
        <span className="eyebrow">CENTRO DE OPERAÇÕES</span>
        <h1>Mapa de leitos</h1>
        <p>
          Visualize e gerencie a ocupação da unidade hospitalar.
        </p>
      </div>

      <span className="unit-badge">{unit}</span>
    </section>
  )
}
