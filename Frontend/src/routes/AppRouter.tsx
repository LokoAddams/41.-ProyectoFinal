import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const LandingPage = lazy(() => import('../pages/LandingPage/LandingPage').then(module => ({ default: module.LandingPage })));
const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage').then(module => ({ default: module.LoginPage })));
const DashboardCrud = lazy(() => import('../pages/DashboardCrud/DashboardCrud').then(module => ({ default: module.DashboardCrud })));
const NotFound404 = lazy(() => import('../pages/NotFound404/NotFound404').then(module => ({ default: module.NotFound404 })));

export const AppRouter = () => {
  return (
    <Router>
      <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'Inter, sans-serif' }}>Cargando...</div>}>
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
      </Suspense>
    </Router>
  );
};
