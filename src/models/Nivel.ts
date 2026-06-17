
import { CasoPrueba } from "./CasoPrueba";

export interface Nivel{
  id: number;                     // Maps to Long id
  numeroNivel: number;            // Maps to Integer numeroNivel
  titulo: string;                 // Maps to String titulo
  teoria: string;                 // Maps to String teoria
  descripcionReto: string;        // Maps to String descripcionReto
  casosPrueba: CasoPrueba[];      // Maps to List<CasoPrueba>
  codigoSolucion: string;         // Maps to String codigoSolucion
  pistas: string[];               // Maps to List<String>
  orden: number;                  // Maps to Integer orden
  creadoEn: string;               // Maps to Instant creadoEn


}