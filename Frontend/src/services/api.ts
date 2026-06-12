import axios from 'axios';

// ==========================================
// CONFIGURACIÓN DE LA API PROPIA
// ==========================================
// Sustituye esta URL por el endpoint real de tu backend.
// Ejemplo: 'http://localhost:3000/api' o 'https://tu-dominio.com/api'
const API_BASE_URL = 'http://localhost:8080/api'; 

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para inyectar el JWT en cada petición automáticamente
api.interceptors.request.use(
  (config) => {
    // Obtenemos el token desde LocalStorage
    const token = localStorage.getItem('token');
    
    if (token && config.headers) {
      // Inyectamos el token en las cabeceras de autorización
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      import('../utils/auth').then(({ logout }) => {
        logout();
        window.location.href = '/login';
      });
    }
    return Promise.reject(error);
  }
);
