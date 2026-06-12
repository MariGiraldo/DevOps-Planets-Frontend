import { jsx as _jsx } from "react/jsx-runtime";
import './App.css';
import AppRoutes from './routes/AppRoutes';
function App() {
    return (_jsx("div", { className: "App", children: _jsx(AppRoutes, {}) }));
}
export default App;
