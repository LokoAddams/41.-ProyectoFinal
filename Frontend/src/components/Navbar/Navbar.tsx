import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.scss';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../Button/Button';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.pageYOffset > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleAuthAction = () => {
    if (isAuthenticated) {
      logout();
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>Artisan Roasts</Link>
        
        {/* Desktop Nav */}
        <div className={styles.desktopLinks}>
          <a href="#inicio" className={styles.link}>Inicio</a>
          <a href="#grains" className={styles.link}>Nuestros Granos</a>
          <a href="#testimonials" className={styles.link}>Lo que dicen nuestros expertos</a>
        </div>

        <div className={styles.actions}>
          {/* Theme Toggle */}
          <button onClick={toggleTheme} className={styles.iconBtn} aria-label="Alternar modo oscuro">
            <span className="material-symbols-outlined" aria-hidden="true">
              {isDarkMode ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
          
          <div className={styles.authBtn}>
            <Button variant="secondary" onClick={handleAuthAction}>
              {isAuthenticated ? 'Cerrar Sesión' : 'Iniciar Sesión'}
            </Button>
          </div>

          {/* User Icons */}
          <div className={styles.userIcons}>
              {/* Removed shopping bag */}
            {isAuthenticated ? (
               <Link to="/dashboard" className={styles.iconBtnLink} aria-label="Ir al dashboard">
                  <span className="material-symbols-outlined" aria-hidden="true">person</span>
               </Link>
            ) : (
               <Link to="/login" className={styles.iconBtnLink} aria-label="Iniciar sesión">
                  <span className="material-symbols-outlined" aria-hidden="true">person</span>
               </Link>
            )}
          </div>

          {/* Hamburger Menu (Mobile) */}
          <button 
            className={styles.hamburger} 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menú de navegación"
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              {isMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <a href="#inicio" className={styles.mobileLink} onClick={() => setIsMenuOpen(false)}>Inicio</a>
          <a href="#grains" className={styles.mobileLink} onClick={() => setIsMenuOpen(false)}>Nuestros Granos</a>
          <a href="#testimonials" className={styles.mobileLink} onClick={() => setIsMenuOpen(false)}>Lo que dicen nuestros expertos</a>
          <div className={styles.mobileAuth}>
            <Button variant="primary" fullWidth onClick={() => { handleAuthAction(); setIsMenuOpen(false); }}>
              {isAuthenticated ? 'Cerrar Sesión' : 'Iniciar Sesión'}
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};
