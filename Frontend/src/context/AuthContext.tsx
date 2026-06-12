import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../interfaces';
import { authService } from '../services/authService';

interface AuthContextType {
  user: User | null;
  token: string | null;
  loginState: (user: User, token: string) => void;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const clearAuthData = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  // Inicializar estado desde LocalStorage y verificar sesión en el backend
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('token');

      if (storedToken) {
        setToken(storedToken); // Seteamos el token inicial para que la app sepa que estamos intentando autenticar
        try {
          // Usamos el verifySession que acabamos de crear en authService
          const verifiedUser = await authService.verifySession();
          setUser(verifiedUser);
          localStorage.setItem('user', JSON.stringify(verifiedUser));
        } catch (error) {
          console.error("Error al verificar la sesión:", error);
          clearAuthData();
        }
      }
    };

    initializeAuth();
  }, []);

  const loginState = (userData: User, jwtToken: string) => {
    setUser(userData);
    setToken(jwtToken);
    localStorage.setItem('token', jwtToken);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = async () => {
    try {
      if (token) {
        await authService.logout();
      }
    } catch (error) {
      console.error("Error en logout del backend:", error);
    } finally {
      clearAuthData();
    }
  };

  const isAuthenticated = !!token;
  const isAdmin = user?.role === 'Admin';

  return (
    <AuthContext.Provider value={{ user, token, loginState, logout, isAuthenticated, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
