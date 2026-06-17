import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // 1. Importamos el hook de navegación
import "./MundoNiveles.css";
import ProgressService, { Nivel } from "../../services/ProgressService";
import fondoMapa from "../../assets/backgrounds/Fondo.jpeg"; 
import omniImg from "../../assets/images/omni.png";

const MundoNiveles: React.FC = () => {
  const service = ProgressService.getInstance();
  const navigate = useNavigate(); // 2. Inicializamos el navegador de rutas
  const [niveles, setNiveles] = useState<Nivel[]>([]);

  useEffect(() => {
    setNiveles([...service.getNiveles()]);
  }, []);

  const handleNivelClick = (nivel: Nivel) => {
    if (nivel.estado === "BLOQUEADO") return;

    // 3. Si el usuario presiona el Nivel 1, lo enviamos a su respectiva página
    if (nivel.id === 1) {
      navigate("/nivel1");
      return; // Usamos return para evitar que se marque como completado antes de resolver el reto
    }

    // Comportamiento por defecto para otros niveles provisionales
    service.completarNivel(nivel.id);
    setNiveles([...service.getNiveles()]);
  };

  const getClass = (estado: string) => {
    if (estado === "COMPLETADO") return "nivel completado";
    if (estado === "DESBLOQUEADO") return "nivel desbloqueado";
    return "nivel bloqueado";
  };

  // Lógica para determinar en qué nivel está el OVNI
  const ultimoProgreso = niveles.filter(n => n.estado === "COMPLETADO").length;
  const nivelActivo = ultimoProgreso < 5 ? (ultimoProgreso === 0 ? 1 : ultimoProgreso + 1) : 5;

  return (
    <div className="mundo-container" style={{ backgroundImage: `url(${fondoMapa})` }}>

      <div className="header">
        <h1>🪐 Mapa del Planeta (Marte)</h1>
        <div className="progress">
          Usuario: AstroDev | Progreso: {ultimoProgreso}/5
        </div>
      </div>

      {/* OVNI con clase dinámica para su posición */}
      <img src={omniImg} alt="OVNI" className={`ovni ovni-pos-${nivelActivo}`} />

      <div className="mapa">
        {niveles.map((nivel) => (
          <div
            key={nivel.id}
            data-id={nivel.id} 
            className={getClass(nivel.estado)}
            onClick={() => handleNivelClick(nivel)}
          >
            <div className="flag">🏁</div>
            <span>Nivel {nivel.id}</span>
            {nivel.estado === "BLOQUEADO" && <div className="lock">🔒</div>}
            {nivel.estado === "COMPLETADO" && <div className="check">✔</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MundoNiveles;