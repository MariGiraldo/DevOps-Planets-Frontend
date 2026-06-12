import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import './Bienvenida.css';
function Bienvenida() {
    const navigate = useNavigate();
    return (_jsx("div", { className: "bienvenida", children: _jsxs("div", { className: "bienvenida-content", children: [_jsx("div", { className: "bienvenida-badge", children: "Nivel 1: Variables" }), _jsx("h1", { children: "Bienvenido a DevOps Planet" }), _jsx("p", { children: "Explora Marte, desbloquea banderas y aprende programaci\u00F3n con ejercicios pr\u00E1cticos." }), _jsxs("div", { className: "bienvenida-buttons", children: [_jsx(Button, { onClick: () => navigate('/mundo'), children: "Comenzar" }), _jsx(Button, { variant: "secondary", onClick: () => navigate('/login'), children: "Iniciar Sesi\u00F3n" })] })] }) }));
}
export default Bienvenida;
