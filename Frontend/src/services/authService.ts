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
  }
};
