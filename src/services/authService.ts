import API_BASE_URL from './api';

interface AuthResponse {
  token: string;
  type: string;
  nombreUsuario: string;
}

export const login = async (
  nombreUsuario: string,
  password: string
): Promise<AuthResponse> => {

  const response = await fetch(
    `${API_BASE_URL}/auth/login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nombreUsuario,
        password
      })
    }
  );

  if (!response.ok) {
    throw new Error(
      'Usuario o contraseña incorrectos'
    );
  }

  return response.json();
};

export const register = async (
  nombreUsuario: string,
  password: string
): Promise<AuthResponse> => {

  const response = await fetch(
    `${API_BASE_URL}/auth/signup`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nombreUsuario,
        password
      })
    }
  );

  if (!response.ok) {
    throw new Error(
      'No fue posible registrar el usuario'
    );
  }

  return response.json();
};