import { jsx as _jsx } from "react/jsx-runtime";
import './Button.css';
function Button({ variant = 'primary', children, className = '', ...props }) {
    return (_jsx("button", { className: `custom-button ${variant} ${className}`, ...props, children: children }));
}
export default Button;
