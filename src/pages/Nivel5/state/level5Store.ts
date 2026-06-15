import { create } from 'zustand';

interface Position { x: number; y: number; }

interface Level5State {
  colonoPos: Position;
  puntosEnergia: number;
  gemasRecolectadas: number[]; // IDs de las celdas recolectadas
  isExecuting: boolean;
  addConsoleMessage: (msg: string) => void;
  consoleMessages: string[];
  setPos: (x: number, y: number) => void;
  sumarPuntos: (puntos: number, idGema: number) => void;
  resetLevel: () => void;
  
  // NUEVOS ESTADOS PARA CONTROLAR LOS CUADRANTES DE LA IZQUIERDA
  revealSolution: boolean;
  setRevealSolution: (reveal: boolean) => void;
  isLevelCompleted: boolean;
  setIsLevelCompleted: (completed: boolean) => void;
}

export const useLevel5Store = create<Level5State>((set) => ({
  colonoPos: { x: 0, y: 4 },
  puntosEnergia: 0,
  gemasRecolectadas: [],
  isExecuting: false,
  consoleMessages: ['> Sistema de recolección listo.'],
  
  // Inicialización de los nuevos estados
  revealSolution: false,
  isLevelCompleted: false,

  setPos: (x, y) => set({ colonoPos: { x, y }, isExecuting: true }),
  
  sumarPuntos: (puntos, idGema) => set((state) => ({
    puntosEnergia: state.puntosEnergia + puntos,
    gemasRecolectadas: [...state.gemasRecolectadas, idGema]
  })),

  addConsoleMessage: (msg) => set((state) => ({ 
    consoleMessages: [...state.consoleMessages, msg] 
  })),

  // Funciones modificadoras para los nuevos flujos
  setRevealSolution: (reveal) => set({ revealSolution: reveal }),
  
  setIsLevelCompleted: (completed) => set({ isLevelCompleted: completed }),

  resetLevel: () => set({
    colonoPos: { x: 0, y: 4 },
    puntosEnergia: 0,
    gemasRecolectadas: [],
    isExecuting: false,
    consoleMessages: ['> Memoria limpia. Esperando Java Bytecode...'],
    
    // Al reiniciar el nivel, volvemos a bloquear las pistas, soluciones y botones finales
    revealSolution: false,
    isLevelCompleted: false
  })
}));