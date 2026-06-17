import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MundoNiveles.css";
import { api } from "../../services/api"; // Asegúrate de que la ruta sea correcta
import { ProgresoDTO } from "../../models/ProgresoDTO";
import fondoMapa from "../../assets/backgrounds/Fondo.jpeg"; 
import omniImg from "../../assets/images/omni.png";

const MundoNiveles: React.FC = () => {
  const navigate = useNavigate();
  const [niveles, setNiveles] = useState<ProgresoDTO[]>([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchProgress = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        console.error("No se encontró token de sesión.");
        setLoading(false);
        return;
      }

      try {
        const data = await api.getprogress(token);
        
        // Opcional: Ordenar los niveles por numeroNivel para asegurar el orden visual
        const nivelesOrdenados = data.sort((a, b) => a.numeroNivel - b.numeroNivel);
        setNiveles(nivelesOrdenados);
      } catch (error) {
        console.error("Error al cargar el progreso del mapa:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, []);

  const handleNivelClick = (nivel: ProgresoDTO) => {
    // Si está bloqueado, ignoramos el clic por completo
    if (nivel.estado === "BLOQUEADO") return;

    // Navegación dinámica: te lleva a /nivel1, /nivel2, etc., según el número
    navigate(`/nivel${nivel.numeroNivel}`);
  };

  const getClass = (estado: string) => {
    // Esto mantiene tu diseño CSS exactamente igual
    if (estado === "COMPLETADO") return "nivel completado";
    if (estado === "DESBLOQUEADO") return "nivel desbloqueado";
    return "nivel bloqueado";
  };

  // Lógica de posición del OVNI intacta
  const ultimoProgreso = niveles.filter(n => n.estado === "COMPLETADO").length;
  const nivelActivo = ultimoProgreso < 5 ? (ultimoProgreso === 0 ? 1 : ultimoProgreso + 1) : 5;

  if (loading) {
    return <div className="mundo-container">Cargando mapa estelar...</div>; // Opcional: Un pequeño estado de carga
  }

  return (
    <div className="mundo-container" style={{ backgroundImage: `url(${fondoMapa})` }}>

      <div className="header">
        <h1>🪐 Mapa del Planeta (Marte)</h1>
        <div className="progress">
          Usuario: AstroDev | Progreso: {ultimoProgreso}/{niveles.length || 5}
        </div>
      </div>

      {/* OVNI con clase dinámica para su posición */}
      <img src={omniImg} alt="OVNI" className={`ovni ovni-pos-${nivelActivo}`} />

      <div className="mapa">
        {niveles.map((nivel) => (
          <div
            key={nivel.numeroNivel} // Usamos numeroNivel en lugar de id
            data-id={nivel.numeroNivel} 
            className={getClass(nivel.estado)}
            onClick={() => handleNivelClick(nivel)}
          >
            <div className="flag">🏁</div>
            <span>Nivel {nivel.numeroNivel}</span>
            {nivel.estado === "BLOQUEADO" && <div className="lock">🔒</div>}
            {nivel.estado === "COMPLETADO" && <div className="check">✔</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MundoNiveles;