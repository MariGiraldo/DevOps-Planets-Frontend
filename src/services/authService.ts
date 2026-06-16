import api from './api';

interface AuthResponse {
  token: string;
  type: string;
  nombreUsuario: string;
}

export const login = async (
  nombreUsuario: string,
  password: string
): Promise<AuthResponse> => {
  try {
    // api ya sabe que la URL base termina en /api
    const response = await api.post<AuthResponse>('/auth/login', {
      nombreUsuario,
      password,
    });
    return response.data; // Axios guarda la respuesta del servidor en .data
  } catch (error) {
    throw new Error('Usuario o contraseña incorrectos');
  }
};

export const register = async (
  nombreUsuario: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>('/auth/signup', {
      nombreUsuario,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error('No fue posible registrar el usuario');
  }
};