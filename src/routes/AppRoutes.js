import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route, Navigate } from 'react-router-dom';
import Bienvenida from '../pages/Bienvenida/Bienvenida';
import MundoNiveles from '../pages/MundoNiveles/MundoNiveles';
import Nivel1 from '../pages/Nivel1/Nivel1';
import Login from '../pages/Login/Login';
import Registro from '../pages/Registro/Registro';
export default function AppRoutes() {
    return (_jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Bienvenida, {}) }), _jsx(Route, { path: "/mundo", element: _jsx(MundoNiveles, {}) }), _jsx(Route, { path: "/nivel1", element: _jsx(Nivel1, {}) }), _jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/registro", element: _jsx(Registro, {}) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/", replace: true }) })] }));
}
