import type { AuthResponse, User } from '../interfaces';
import { api } from './api';

export const authService = {
  /**
   * Realiza la petición de inicio de sesión al backend.
   * @param email Correo electrónico
   * @param password Contraseña
   * @returns AuthResponse con el token y los datos del usuario.
   */
  login: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>('/auth/login', { email, password });
      return response.data;

    } catch (error) {
      throw error;
    }
  },

  /**
   * Verifica la sesión actual del usuario mediante el token JWT.
   * @returns Datos del usuario validado.
   */
  verifySession: async (): Promise<User> => {
    try {
      const response = await api.get<User>('/auth/verify');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Cierra la sesión del usuario en el sistema.
   */
  logout: async (): Promise<void> => {
    try {
      // Ajusta la ruta a la que corresponda en tu backend
      const response = await api.post('/auth/logout');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
