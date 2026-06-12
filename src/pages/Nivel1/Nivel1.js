import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import './Nivel1.css';
const INITIAL_CODE = `String planeta = "Marte";`;
const SOLUTION_CODE = `public class Main {
    public static void main(String[] args) {
        String planeta = "Marte";
        System.out.println("Planeta: " + planeta);
    }
}`;
function Nivel1() {
    const navigate = useNavigate();
    const [code, setCode] = useState(INITIAL_CODE);
    const [output, setOutput] = useState('Aquí se mostrará el resultado de la ejecución.');
    const [isCorrect, setIsCorrect] = useState(false);
    const [timer, setTimer] = useState(180);
    const [revealEnabled, setRevealEnabled] = useState(false);
    const [responseUsed, setResponseUsed] = useState(false);
    useEffect(() => {
        const interval = window.setInterval(() => {
            setTimer((current) => {
                if (current <= 1) {
                    setRevealEnabled(true);
                    clearInterval(interval);
                    return 0;
                }
                return current - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    const formattedTimer = useMemo(() => {
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }, [timer]);
    const handleExecute = () => {
        const normalized = code.replace(/\s+/g, '').toLowerCase();
        const valid = normalized.includes('stringplaneta="marte"') || normalized.includes('stringplaneta=\"marte\"');
        if (valid) {
            setOutput('✅ ¡Correcto! El código declara la variable y la imprime correctamente.');
            setIsCorrect(true);
        }
        else {
            setOutput('❌ Revisa la sintaxis: declara una variable String llamada planeta y guárdale "Marte".');
            setIsCorrect(false);
        }
    };
    const handleReveal = () => {
        if (!revealEnabled || responseUsed)
            return;
        setCode(SOLUTION_CODE);
        setResponseUsed(true);
        setRevealEnabled(false);
        setOutput('💡 Solución insertada en el editor. Ajusta y ejecuta para continuar.');
    };
    const handleFinish = () => {
        if (!isCorrect)
            return;
        navigate('/mundo');
    };
    return (_jsxs("div", { className: "nivel nivel1-page", children: [_jsxs("div", { className: "nivel-header", children: [_jsxs("div", { children: [_jsx("button", { className: "back-button", onClick: () => navigate('/mundo'), children: "\u2190 Volver al mapa" }), _jsx("h1", { children: "Nivel 1: Guardar informaci\u00F3n" }), _jsx("p", { children: "Aprende a declarar una variable String y guardar el valor \"Marte\"." })] }), _jsxs("div", { className: "timer-card", children: [_jsx("span", { children: "Respuesta disponible en" }), _jsx("strong", { children: formattedTimer })] })] }), _jsxs("div", { className: "nivel-grid", children: [_jsxs("section", { className: "panel theory-panel", children: [_jsx("h2", { children: "Teor\u00EDa" }), _jsx("p", { children: "Una variable es un espacio en memoria donde se guarda informaci\u00F3n para usarla luego." }), _jsx("p", { children: "En Java, primero defines el tipo, despu\u00E9s el nombre y finalmente el valor." }), _jsx("pre", { children: _jsx("code", { children: "String planeta = \"Marte\";" }) }), _jsxs("div", { className: "challenge-box", children: [_jsx("h3", { children: "Ejercicio" }), _jsxs("p", { children: ["Declara una variable String llamada ", _jsx("strong", { children: "planeta" }), " y guarda en ella el texto ", _jsx("strong", { children: "\"Marte\"" }), ". Luego ejecuta el c\u00F3digo."] })] }), _jsxs("div", { className: "actions-row", children: [_jsx(Button, { onClick: () => setOutput('📌 Pista: Usa <strong>String</strong> seguido del nombre de la variable y el valor entre comillas.'), children: "Pista" }), _jsx(Button, { variant: "secondary", onClick: handleReveal, disabled: !revealEnabled || responseUsed, children: responseUsed ? 'Respuesta usada' : 'Mostrar respuesta' })] })] }), _jsxs("section", { className: "panel editor-panel", children: [_jsx("h2", { children: "Editor" }), _jsx("textarea", { value: code, onChange: (e) => setCode(e.target.value), className: "code-editor", spellCheck: false }), _jsxs("div", { className: "editor-buttons", children: [_jsx(Button, { onClick: handleExecute, children: "Ejecutar" }), _jsx(Button, { variant: "secondary", onClick: () => setCode(INITIAL_CODE), children: "Limpiar" })] })] })] }), _jsxs("div", { className: "resultado-grid", children: [_jsxs("section", { className: "panel result-panel", children: [_jsx("h2", { children: "Resultado" }), _jsx("div", { className: `result-box ${isCorrect ? 'success' : 'error'}`, children: output }), _jsx(Button, { onClick: handleFinish, disabled: !isCorrect, className: "finish-button", children: "Terminar nivel" })] }), _jsxs("section", { className: "panel animation-panel", children: [_jsx("h2", { children: "Animaci\u00F3n" }), _jsxs("div", { className: "animation-placeholder", children: [_jsx("div", { className: "alien-icon", children: "\uD83D\uDC7E" }), _jsx("p", { children: "Aqu\u00ED ir\u00E1 la animaci\u00F3n del tema en niveles futuros." })] })] })] })] }));
}
export default Nivel1;
