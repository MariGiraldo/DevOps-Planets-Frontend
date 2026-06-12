import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import './MundoNiveles.css';
function MundoNiveles() {
    const navigate = useNavigate();
    const niveles = [
        { id: 1, nombre: 'Nivel 1', path: '/nivel1' },
        { id: 2, nombre: 'Nivel 2', path: '/nivel2' },
        { id: 3, nombre: 'Nivel 3', path: '/nivel3' },
        { id: 4, nombre: 'Nivel 4', path: '/nivel4' },
        { id: 5, nombre: 'Nivel 5', path: '/nivel5' },
    ];
    return (_jsxs("div", { className: "mundo-niveles", children: [_jsx("h1", { children: "Mundo de Niveles" }), _jsx("div", { className: "niveles-grid", children: niveles.map(nivel => (_jsx("button", { className: "nivel-card", onClick: () => navigate(nivel.path), children: nivel.nombre }, nivel.id))) })] }));
}
export default MundoNiveles;
