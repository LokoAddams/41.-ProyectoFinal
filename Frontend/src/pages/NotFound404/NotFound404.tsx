import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import styles from './NotFound404.module.scss';
import { Button } from '../../components/Button/Button';
import { Navbar } from '../../components/Navbar/Navbar';

export const NotFound404 = () => {
  return (
    <>
      <Helmet>
        <title>Página no encontrada - Artisan Roasts</title>
        <meta name="description" content="La página que buscas no existe." />
      </Helmet>
      
      <Navbar />

      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.content}>
            <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: '120px', color: 'var(--color-primary)', opacity: 0.2 }}>
              local_cafe
            </span>
            <h1 className={styles.title}>404</h1>
            <h2 className={styles.subtitle}>Parece que hemos derramado el café.</h2>
            <p className={styles.text}>
              La página que estás buscando no existe, ha sido movida o está temporalmente inaccesible.
            </p>
            <Link to="/">
              <Button icon="home" iconPosition="left">Volver al Inicio</Button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};
