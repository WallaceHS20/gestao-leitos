import StatsGrid from "./components/Dasboard/StatsGrid";
import BedDetailsPanel from "./components/Hospital/BedDetailsPanel";
import HospitalScene from "./components/Hospital/HospitalScene";
import RoomDetailsPanel from "./components/Hospital/RoomDetailsPanel";
import Header from "./components/Layout/Header";
import PageHeading from "./components/Layout/PageHeading";
import hospitalData from "./data/data.json";
import { useBeds } from "./hoocks/useBds";

export default function App() {
  const {
    beds,
    selectedId,
    selectedBed,
    stats,
    occupancy,
    selectBed,
    releaseBed,
    completeCleaning,
    completeMaintenance,
    admitPatient,
    changeStatus,
    selectedRoomStats,
    selectedRoom,
    rooms,
    selectRoom,
  } = useBeds();

  return (
    <main className="app-shell">
      <Header hospitalName={hospitalData.hospital.name} />

      <PageHeading unit={hospitalData.hospital.unit} />

      <StatsGrid stats={stats} />

      <section className="workspace">
        {/* ESQUERDA — DETALHES DO LEITO */}
        <aside className="workspace-side bed-side">
          <div className="side-panel">
            <BedDetailsPanel
              bed={selectedBed}
              onRelease={releaseBed}
              onCompleteCleaning={completeCleaning}
              onCompleteMaintenance={completeMaintenance}
              onAdmit={admitPatient}
              onMaintenance={() => {
                if (selectedBed) {
                  changeStatus(selectedBed.id, "MANUTENCAO");
                }
              }}
            />
          </div>
        </aside>

        {/* CENTRO — PLANTA INTERATIVA EM DESTAQUE */}
        <main className="workspace-center">
          <div className="scene-panel">
            <div className="scene-toolbar">
              <div>
                <strong>Planta interativa</strong>
                <span>Arraste para girar · Scroll para zoom</span>
              </div>

              <span className="scene-tag">
                <i />
                3D LIVE
              </span>
            </div>

            <div className="scene-canvas">
              <HospitalScene
                beds={beds}
                rooms={rooms}
                selectedId={selectedId}
                onSelect={selectBed}
                onSelectRoom={selectRoom}
              />
            </div>

            <div className="legend">
              <span>
                <i style={{ background: "#22c55e" }} />
                Livre
              </span>

              <span>
                <i style={{ background: "#3b82f6" }} />
                Ocupado
              </span>

              <span>
                <i style={{ background: "#f59e0b" }} />
                Em higienização
              </span>

              <span>
                <i style={{ background: "#ef4444" }} />
                Em manutenção
              </span>
            </div>

            <div className="occupancy">
              <div>
                <span>Taxa de ocupação</span>
                <strong>{occupancy}%</strong>
              </div>

              <div className="progress-track">
                <div style={{ width: `${occupancy}%` }} />
              </div>
            </div>
          </div>
        </main>

        {/* DIREITA — DETALHES DO AMBIENTE */}
        <aside className="workspace-side room-side">
          <div className="side-panel">
            <RoomDetailsPanel room={selectedRoom} stats={selectedRoomStats} />
          </div>
        </aside>
      </section>
    </main>
  );
}
