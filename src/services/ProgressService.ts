export type NivelEstado = "BLOQUEADO" | "DESBLOQUEADO" | "COMPLETADO";

export interface Nivel {
  id: number;
  estado: NivelEstado;
}

class ProgressService {
  private static instance: ProgressService;

  private niveles: Nivel[] = [
    { id: 1, estado: "DESBLOQUEADO" },
    { id: 2, estado: "BLOQUEADO" },
    { id: 3, estado: "BLOQUEADO" },
    { id: 4, estado: "BLOQUEADO" },
    { id: 5, estado: "BLOQUEADO" },
  ];

  private constructor() {}

  public static getInstance(): ProgressService {
    if (!ProgressService.instance) {
      ProgressService.instance = new ProgressService();
    }
    return ProgressService.instance;
  }

  getNiveles(): Nivel[] {
    return this.niveles;
  }

  completarNivel(id: number) {
    const nivel = this.niveles.find(n => n.id === id);
    if (!nivel) return;

    nivel.estado = "COMPLETADO";

    // desbloquear siguiente
    const siguiente = this.niveles.find(n => n.id === id + 1);
    if (siguiente && siguiente.estado === "BLOQUEADO") {
      siguiente.estado = "DESBLOQUEADO";
    }
  }

  reset() {
    this.niveles = this.niveles.map((n, index) => ({
      id: n.id,
      estado: index === 0 ? "DESBLOQUEADO" : "BLOQUEADO"
    }));
  }
}

export default ProgressService;