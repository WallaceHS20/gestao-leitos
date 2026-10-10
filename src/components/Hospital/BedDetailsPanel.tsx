import type { Bed } from "../../types/bed";
import {
  BED_STATUS_COLORS,
  BED_STATUS_LABELS,
  BED_TYPE_LABELS,
} from "../../types/bed";

interface Props {
  bed: Bed | null;
  onRelease: () => void;
  onCompleteCleaning: () => void;
  onCompleteMaintenance: () => void;
  onAdmit: () => void;
  onMaintenance: () => void;
}

const date = (value: string | null) => {
  if (!value) return "Não informada";

  return new Date(`${value}T12:00:00`).toLocaleDateString("pt-BR");
};

const money = (value: number) =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

export default function BedDetailsPanel({
  bed,
  onRelease,
  onCompleteCleaning,
  onCompleteMaintenance,
  onAdmit,
  onMaintenance,
}: Props) {
  if (!bed) {
    return (
      <aside className="details-panel">
        <h3>Detalhes do leito</h3>
        <p>Selecione uma cama na planta 3D.</p>
      </aside>
    );
  }

  const patient = bed.patient;

  return (
    <aside className="details-panel">
      <span className="panel-eyebrow">LEITO {bed.id}</span>
      <h2>{bed.room}</h2>

      <div className="status-pill">
        <span
          className="status-dot"
          style={{ background: BED_STATUS_COLORS[bed.status] }}
        />
        {BED_STATUS_LABELS[bed.status]}
      </div>

      <div className="patient-section">
        <h3>Informações do leito</h3>

        <div className="detail-row">
          <span>Categoria</span>
          <strong>{BED_TYPE_LABELS[bed.type]}</strong>
        </div>

        <div className="detail-row">
          <span>Custo diário estimado</span>
          <strong>{money(bed.dailyCost)}</strong>
        </div>
      </div>

      {patient ? (
        <div className="patient-section">
          <h3>Dados da internação</h3>

          <div className="detail-row">
            <span>Paciente</span>
            <strong>{patient.name}</strong>
          </div>

          <div className="detail-row">
            <span>Data de entrada</span>
            <strong>{date(patient.admissionDate)}</strong>
          </div>

          <div className="detail-row">
            <span>Motivo</span>
            <strong>{patient.reason}</strong>
          </div>

          <div className="detail-row">
            <span>Previsão de alta</span>
            <strong>{date(patient.expectedDischargeDate)}</strong>
          </div>

          <div className="detail-row">
            <span>Plano de saúde</span>
            <strong>{patient.healthPlan?.name ?? "Não informado"}</strong>
          </div>

          <div className="detail-row">
            <span>Tipo de plano</span>
            <strong>{patient.healthPlan?.type ?? "Não informado"}</strong>
          </div>

          <div className="detail-row">
            <span>Titular do plano</span>
            <strong>
              {patient.healthPlan?.isHolder == null
                ? "Não informado"
                : patient.healthPlan.isHolder
                  ? "Sim"
                  : "Não"}
            </strong>
          </div>
        </div>
      ) : (
        <p className="empty-patient">Nenhum paciente vinculado a este leito.</p>
      )}

      <div className="bed-actions">
        {bed.status === "LIVRE" && (
          <button className="primary-button" onClick={onAdmit}>
            Admitir paciente de demonstração
          </button>
        )}

        {bed.status === "OCUPADO" && (
          <button className="primary-button" onClick={onRelease}>
            Encaminhar para higienização
          </button>
        )}

        {bed.status === "HIGIENIZACAO" && (
          <button className="primary-button" onClick={onCompleteCleaning}>
            Concluir higienização
          </button>
        )}

        {bed.status === "MANUTENCAO" && (
          <button className="primary-button" onClick={onCompleteMaintenance}>
            Concluir manutenção
          </button>
        )}

        {bed.status !== "MANUTENCAO" && (
          <button className="secondary-button" onClick={onMaintenance}>
            Encaminhar para manutenção
          </button>
        )}
      </div>
    </aside>
  );
}
