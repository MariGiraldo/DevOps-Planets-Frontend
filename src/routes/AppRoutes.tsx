import { Routes, Route, Navigate } from 'react-router-dom';
import Bienvenida from '../pages/Bienvenida/Bienvenida';
import Login from '../pages/Login/Login';
import Registro from '../pages/Registro/Registro';

// 1. Importa los componentes de tus niveles aquí
// (Asegúrate de que las rutas de los archivos coincidan con tus carpetas)
import Nivel1 from '../pages/Nivel1/Nivel1';
import Nivel2 from '../pages/Nivel2/Nivel2';
import Nivel3 from '../pages/Nivel3/Nivel3';
import Nivel4 from '../pages/Nivel4/Nivel4';
import Nivel5 from '../pages/Nivel5/Nivel5';
import MundoNiveles from '../pages/MundoNiveles/MundoNiveles';

export default function AppRoutes() {
  return (
    <Routes>

      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />

      {/* Rutas de los Niveles del 1 al 5 */}
      <Route path="/nivel1" element={<Nivel1 />} />
      <Route path="/nivel2" element={<Nivel2 />} />
      <Route path="/nivel3" element={<Nivel3 />} />
      <Route path="/nivel4" element={<Nivel4 />} />
      <Route path="/nivel5" element={<Nivel5 />} />

      <Route path="/mundo-niveles" element={<MundoNiveles />} />

      {/* Redirección por si el usuario escribe cualquier otra ruta en la URL */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}