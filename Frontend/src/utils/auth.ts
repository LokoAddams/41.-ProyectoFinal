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
export function logout(): void {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  // Redirigir al login si es necesario
}

// Función que obtiene el usuario guardado
export function getUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}
