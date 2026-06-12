import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.scss';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { authService } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';

export const LoginPage = () => {
  const [email, setEmail] = useState('cliente@cafe.com'); // Valor por defecto para pruebas
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { loginState } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    try {
      setIsLoading(true);
      const res = await authService.login(email, password);
      loginState(res.user, res.token);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Entrar - Artisan Roasts</title>
        <meta name="description" content="Inicia sesión en tu cuenta de Artisan Roasts para gestionar tus pedidos y preferencias." />
        <meta property="og:title" content="Entrar - Artisan Roasts" />
      </Helmet>
      
      <main className={styles.main}>
        {/* Background elements */}
        <div className={styles.bgElements}>
          <div className={styles.glowTop}></div>
          <div className={styles.glowBottom}></div>
          <div className={styles.textureLayer}></div>
        </div>

        <div className={styles.contentWrapper}>
          <div className={styles.card}>
            <div className={styles.header}>
              <h1 className={styles.title}>Artisan Roasts</h1>
              <p className={styles.subtitle}>Bienvenido a la experiencia del café perfecto.</p>
            </div>

            <div className={styles.formContainer}>
              <div className={styles.glassAccent}></div>
              
              <form onSubmit={handleSubmit} className={styles.form}>
                {error && <div className={styles.globalError}>{error}</div>}
                
                <Input 
                  label="Correo Electrónico"
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ejemplo@artisan.com"
                  icon="mail"
                  required
                />
                
                <Input 
                  label="Contraseña"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  icon="lock"
                  iconFilled
                  required
                />
                
                <Button 
                  type="submit" 
                  fullWidth 
                  icon="arrow_forward" 
                  isLoading={isLoading}
                  className={styles.submitBtn}
                >
                  Entrar
                </Button>
              </form>


            </div>

            <div className={styles.legalLinks}>
              <a href="#">Términos de Servicio</a>
              <a href="#">Política de Privacidad</a>
            </div>
          </div>
        </div>

        {/* Floating beans */}
        <div className={`${styles.floatingBean} ${styles.beanTop}`}>
          <span className="material-symbols-outlined" aria-hidden="true">coffee</span>
        </div>
        <div className={`${styles.floatingBean} ${styles.beanBottom}`}>
          <span className="material-symbols-outlined" aria-hidden="true">coffee</span>
        </div>
      </main>
    </>
  );
};
