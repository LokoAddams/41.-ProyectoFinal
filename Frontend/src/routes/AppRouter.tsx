import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

import { LandingPage } from '../pages/LandingPage/LandingPage';
import { LoginPage } from '../pages/LoginPage/LoginPage';
import { DashboardCrud } from '../pages/DashboardCrud/DashboardCrud';
import { NotFound404 } from '../pages/NotFound404/NotFound404';

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        } />

        {/* Rutas Protegidas (Requieren Token) */}
        <Route path="/dashboard" element={
          <PrivateRoute>
            <DashboardCrud />
          </PrivateRoute>
        } />

        {/* Ruta para manejar el 404 */}
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </Router>
  );
};
