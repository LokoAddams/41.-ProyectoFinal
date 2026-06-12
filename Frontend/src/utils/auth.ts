// Verifica si el usuario está autenticado comprobando si existe el token
export function isAuthenticated(): boolean {
  return !!localStorage.getItem("token"); 
}

// Obtiene el rol del usuario guardado
export function getUserRole(): string | null {
  const user = getUser();
  return user ? user.role : null;
}

// Función para cerrar sesión
export const logout = async (): Promise<void> => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      // Importación dinámica para evitar ciclos de dependencia (si api.ts usa auth.ts y auth.ts usa authService.ts que usa api.ts)
      const { authService } = await import('../services/authService');
      await authService.logout();
    }
  } catch (error) {
    console.error("Error al cerrar sesión en el servidor", error);
  } finally {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Opcional: Redirigir al login si es necesario, por ejemplo con window.location.href = '/login'
  }
}

// Función que obtiene el usuario guardado
export function getUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}
