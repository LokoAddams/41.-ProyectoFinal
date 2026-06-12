import { useState, useEffect } from 'react';
import styles from './ScrollToTop.module.scss';

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <button 
          className={styles.scrollToTopBtn} 
          onClick={scrollToTop} 
          aria-label="Volver arriba"
        >
          <span className="material-symbols-outlined" aria-hidden="true">arrow_upward</span>
        </button>
      )}
    </>
  );
};
