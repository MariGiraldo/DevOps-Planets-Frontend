import axios from 'axios';

// Tomamos la URL que ya configuraron (Localhost o la de producción en Vite)
const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  'http://localhost:8080/api';

// Creamos y exportamos la instancia de Axios usando esa URL base
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;