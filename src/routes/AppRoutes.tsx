import { Routes, Route, Navigate } from 'react-router-dom'
import Bienvenida from '../pages/Bienvenida/Bienvenida'
import MundoNiveles from '../pages/MundoNiveles/MundoNiveles'
import Nivel1 from '../pages/Nivel1/Nivel1'
import Login from '../pages/Login/Login'
import Registro from '../pages/Registro/Registro'
import Victoria from '../pages/Victoria/Victoria'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Bienvenida />} />
      
      {/* Ajustado a '/mundo' para que funcione con Bienvenida, MundoNiveles y Nivel1 */}
      <Route path="/mundo" element={<MundoNiveles />} />
      
      {/* Ajustado a '/nivel1' para que coincida con la grilla de niveles */}
      <Route path="/nivel1" element={<Nivel1 />} />
      
      <Route path="/final" element={<Victoria />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}