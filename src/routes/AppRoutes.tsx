import { Routes, Route, Navigate } from 'react-router-dom'
import Bienvenida from '../pages/Bienvenida/Bienvenida'
import MundoNiveles from '../pages/MundoNiveles/MundoNiveles'
import Nivel1 from '../pages/Nivel1/Nivel1'
import Login from '../pages/Login/Login'
import Registro from '../pages/Registro/Registro'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Bienvenida />} />
      <Route path="/mundo" element={<MundoNiveles />} />
      <Route path="/nivel1" element={<Nivel1 />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
