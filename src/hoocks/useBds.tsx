import { useMemo, useState } from "react";
import hospitalData from "../data/data.json";

import type { Bed, BedStatus, HospitalRoom } from "../types/bed";

const initialBeds = hospitalData.beds as unknown as Bed[];
const initialRooms = hospitalData.rooms as unknown as HospitalRoom[];

export function useBeds() {
  const [beds, setBeds] = useState<Bed[]>(() =>
    initialBeds.map((bed) => ({
      ...bed,
      position: [...bed.position] as Bed["position"],
      patient: bed.patient ? { ...bed.patient } : null,
    })),
  );

  const [rooms] = useState<HospitalRoom[]>(initialRooms);
  const [selectedId, setSelectedId] = useState<number | null>(1);
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(101);

  const selectedBed = beds.find((bed) => bed.id === selectedId) ?? null;

  const selectedRoom = rooms.find((room) => room.id === selectedRoomId) ?? null;

  const stats = useMemo(() => {
    const total = beds.length;
    const ocupados = beds.filter((bed) => bed.status === "OCUPADO").length;
    const livres = beds.filter((bed) => bed.status === "LIVRE").length;
    const higienizacao = beds.filter(
      (bed) => bed.status === "HIGIENIZACAO",
    ).length;
    const manutencao = beds.filter((bed) => bed.status === "MANUTENCAO").length;

    const dailyCost = beds
      .filter((bed) => bed.status === "OCUPADO")
      .reduce((totalCost, bed) => totalCost + bed.dailyCost, 0);

    return {
      total,
      ocupados,
      livres,
      higienizacao,
      manutencao,
      dailyCost,
    };
  }, [beds]);

  const occupancy =
    stats.total > 0 ? Math.round((stats.ocupados / stats.total) * 100) : 0;

  const roomStats = useMemo(() => {
    return rooms.map((room) => {
      const roomBeds = beds.filter((bed) => bed.roomId === room.id);

      const occupiedBeds = roomBeds.filter((bed) => bed.status === "OCUPADO");

      const dailyCost = occupiedBeds.reduce(
        (sum, bed) => sum + bed.dailyCost,
        0,
      );

      const accumulatedCost = occupiedBeds.reduce((sum, bed) => {
        if (!bed.patient) return sum;

        const admission = new Date(`${bed.patient.admissionDate}T00:00:00`);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const elapsedDays = Math.max(
          1,
          Math.floor(
            (today.getTime() - admission.getTime()) / (1000 * 60 * 60 * 24),
          ) + 1,
        );

        return sum + elapsedDays * bed.dailyCost;
      }, 0);

      return {
        roomId: room.id,
        name: room.name,
        type: room.type,
        total: roomBeds.length,
        ocupados: occupiedBeds.length,
        livres: roomBeds.filter((bed) => bed.status === "LIVRE").length,
        higienizacao: roomBeds.filter((bed) => bed.status === "HIGIENIZACAO")
          .length,
        manutencao: roomBeds.filter((bed) => bed.status === "MANUTENCAO")
          .length,
        occupancy: roomBeds.length
          ? Math.round((occupiedBeds.length / roomBeds.length) * 100)
          : 0,
        dailyCost,
        accumulatedCost,
        expectedDischarges: occupiedBeds.filter(
          (bed) =>
            bed.patient?.expectedDischargeDate !== null &&
            bed.patient?.expectedDischargeDate !== undefined,
        ).length,
      };
    });
  }, [beds, rooms]);

  const selectedRoomStats =
    roomStats.find((room) => room.roomId === selectedRoomId) ?? null;

  function selectBed(id: number | null) {
    setSelectedId(id);

    if (id !== null) {
      const bed = beds.find((item) => item.id === id);

      if (bed) {
        setSelectedRoomId(bed.roomId);
      }
    }
  }

  function selectRoom(id: number | null) {
    setSelectedRoomId(id);
    setSelectedId(null);
  }

  function changeStatus(id: number, status: BedStatus) {
    setBeds((currentBeds) =>
      currentBeds.map((bed) =>
        bed.id === id
          ? {
              ...bed,
              status,
              patient: status === "OCUPADO" ? bed.patient : null,
            }
          : bed,
      ),
    );
  }

  function releaseBed() {
    if (selectedBed?.status !== "OCUPADO") return;

    setBeds((currentBeds) =>
      currentBeds.map((bed) =>
        bed.id === selectedBed.id ? { ...bed, status: "HIGIENIZACAO" } : bed,
      ),
    );
  }

  function completeCleaning() {
    if (selectedBed?.status !== "HIGIENIZACAO") return;
    changeStatus(selectedBed.id, "LIVRE");
  }

  function completeMaintenance() {
    if (selectedBed?.status !== "MANUTENCAO") return;
    changeStatus(selectedBed.id, "LIVRE");
  }

  function admitPatient() {
    if (selectedBed?.status !== "LIVRE") return;

    const today = new Date();
    const admissionDate = [
      today.getFullYear(),
      String(today.getMonth() + 1).padStart(2, "0"),
      String(today.getDate()).padStart(2, "0"),
    ].join("-");

    setBeds((currentBeds) =>
      currentBeds.map((bed) =>
        bed.id === selectedBed.id
          ? {
              ...bed,
              status: "OCUPADO",
              patient: {
                id:
                  Math.max(
                    0,
                    ...currentBeds.map((item) => item.patient?.id ?? 0),
                  ) + 1,
                name: "Paciente de demonstração",
                admissionDate,
                reason: "Internação de demonstração",
                expectedDischargeDate: null,
                healthPlan: null,
              },
            }
          : bed,
      ),
    );
  }

  return {
    beds,
    rooms,
    selectedId,
    selectedBed,
    selectedRoom,
    selectedRoomId,
    selectedRoomStats,
    roomStats,
    stats,
    occupancy,
    selectBed,
    selectRoom,
    changeStatus,
    releaseBed,
    completeCleaning,
    completeMaintenance,
    admitPatient,
  };
}
