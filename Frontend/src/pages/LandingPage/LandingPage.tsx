import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import styles from './LandingPage.module.scss';
import { Navbar } from '../../components/Navbar/Navbar';
import { Button } from '../../components/Button/Button';

export const LandingPage = () => {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  const testimonialsData = [
    { name: "Andrés Moreno", role: "Home Barista", text: "\"El tueste es impecable. Se nota la diferencia desde el primer aroma al abrir la bolsa. Mi ritual de la mañana ha cambiado por completo.\"", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAMi6WFVbGJ_Dg7TnZRcgc3nMQ7Ef-Rfv0ztK0nsl0y_YA9NCgE-0lsWZNCkSJnaQiO--mvSUUON2JRAdQjk2_mvmNBzFUQoeg0-qU-qaCePJLzX8MhwWGqtJapMhRsAGJhS1OL1p4F4265nuuHCXf_uynoLqDWB_IJd_2wFQk8A6gn1lE10oPsVLXg0Rzz1ykh2lfCJSUzCPGGbaOCiDJ0wTfROfnR2tMUjuv7Joer93oOAVyOFSldDoQg4CgQu2bOus6VB95EuaKd?w=64&q=80" },
    { name: "Elena Castillo", role: "Sommelier de Café", text: "\"Increíble variedad y servicio. Las notas de cata son precisas y me han ayudado a educar mi paladar sobre los diferentes procesos del grano.\"", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpr-IvGX3_wA9jTodk9EvnKPHFxIv4nyKdvN58DuB3yWeC1dq12Vr9zAJHP7iZdF09U27iGe2CmKZuS75wTxCTvTrTLLBgvq0dUTmZcs-OQwo29VvwBa8m33gU9-5yZXILiSnLQaeLyq3AyPcHAVxoW3JEhDoZi3ke6aaSf1Am3Pb4WR_N2_snfFNBye-rw_Gv7uCG5DgH4wUDzKvsipQUbMEv7D4yhWJzF2ZgtDGkf_Nfs4j-YDIjQfxirbg-u_kJzqAgff7TErwz?w=64&q=80" },
    { name: "Martín Rivas", role: "Dueño de Cafetería", text: "\"Los granos de Artisan Roasts elevaron la calidad de mi cafetería. Mis clientes notaron el cambio inmediatamente y nuestras ventas aumentaron.\"", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAMi6WFVbGJ_Dg7TnZRcgc3nMQ7Ef-Rfv0ztK0nsl0y_YA9NCgE-0lsWZNCkSJnaQiO--mvSUUON2JRAdQjk2_mvmNBzFUQoeg0-qU-qaCePJLzX8MhwWGqtJapMhRsAGJhS1OL1p4F4265nuuHCXf_uynoLqDWB_IJd_2wFQk8A6gn1lE10oPsVLXg0Rzz1ykh2lfCJSUzCPGGbaOCiDJ0wTfROfnR2tMUjuv7Joer93oOAVyOFSldDoQg4CgQu2bOus6VB95EuaKd?w=64&q=80" },
    { name: "Sofía Vargas", role: "Aficionada", text: "\"Me encanta probar algo nuevo cada mes. El blend de la casa es perfecto para mi espresso matutino y nunca decepciona en frescura.\"", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpr-IvGX3_wA9jTodk9EvnKPHFxIv4nyKdvN58DuB3yWeC1dq12Vr9zAJHP7iZdF09U27iGe2CmKZuS75wTxCTvTrTLLBgvq0dUTmZcs-OQwo29VvwBa8m33gU9-5yZXILiSnLQaeLyq3AyPcHAVxoW3JEhDoZi3ke6aaSf1Am3Pb4WR_N2_snfFNBye-rw_Gv7uCG5DgH4wUDzKvsipQUbMEv7D4yhWJzF2ZgtDGkf_Nfs4j-YDIjQfxirbg-u_kJzqAgff7TErwz?w=64&q=80" }
  ];

  const nextTestimonial = () => setCurrentTestimonialIndex((prev) => (prev + 1) % testimonialsData.length);
  const prevTestimonial = () => setCurrentTestimonialIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);

  const visibleTestimonials = [
    testimonialsData[currentTestimonialIndex],
    testimonialsData[(currentTestimonialIndex + 1) % testimonialsData.length]
  ];

  return (
    <>
      <Helmet>
        <title>Artisan Roasts | El Arte de Tostar</title>
        <meta name="description" content="Descubre granos de especialidad seleccionados a mano y tostados diariamente. Una experiencia sensorial diseñada para los paladares más exigentes." />
      </Helmet>

      <Navbar />

      <main className={styles.main}>
        {/* Hero Section */}
        <section id="inicio" className={styles.hero}>
          <div className={styles.heroBg}>
            <img 
              src="https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="" 
              className={styles.heroImg} 
              width="1200" height="800" fetchpriority="high"
            />
            <div className={styles.heroOverlay}></div>
          </div>
          
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <h1 className={styles.heroTitle}>
                El Arte de Tostar, el Placer de Beber
              </h1>
              <p className={styles.heroSubtitle}>
                Descubre granos de especialidad seleccionados a mano y tostados diariamente. Una experiencia sensorial diseñada para los paladares más exigentes.
              </p>
              <div className={styles.heroButtons}>
                <Button variant="primary" onClick={() => document.getElementById('grains')?.scrollIntoView({behavior: 'smooth'})}>Explorar Granos</Button>
                <Button variant="outline" aria-label="Saber más sobre el proceso de tueste" onClick={() => document.getElementById('testimonials')?.scrollIntoView({behavior: 'smooth'})}>Saber Más</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Nuestros Granos (Bento Grid) */}
        <section id="grains" className={styles.grainsSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Nuestros Granos</h2>
            <div className={styles.titleUnderline}></div>
          </div>

          <div className={styles.bentoGrid}>
            <div className={`${styles.bentoItem} ${styles.mainProduct}`}>
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCuMXXaFsZJT74yQ2cFOFLlPTGJY-NzPZTuP-dOp6Py1byMV1PlTBZHLhtufBsqY5FqAQGr-bDBaqqMiO5-yNobgt_EF7GLpfotM0GU7Do0vnCYBoYW1ldeN8Ua5Q_k__Ly4mMVds273mUAaYZT_5dSaqeaek-bFT1iMYTr0X8GxS0E6frlH6MP3gKpPo7idUWAzcxJ2NsbXSjaHKfqzUK5kTWWbp3ivMWWn-MbtgzbQCZG6pZZqpV1MzcjIY3nNnP7EnW6x_800CdV?w=800&q=80" 
                alt="Ethiopean Yirgacheffe" 
                className={styles.bentoImg} 
                width="800" height="600" loading="lazy"
              />
              <div className={styles.bentoOverlay}></div>
              <div className={styles.bentoContent}>
                <span className={styles.badge}>Edición Limitada</span>
                <h3 className={styles.productTitle}>Etiopía Yirgacheffe</h3>
                <p className={styles.productDesc}>Notas florales de jazmín y un toque cítrico brillante de bergamota.</p>
              </div>
            </div>

            <div className={styles.secondaryProducts}>
              <div className={`${styles.bentoItem} ${styles.glassCard}`}>
                <span className={`material-symbols-outlined ${styles.productIcon}`} aria-hidden="true">energy_savings_leaf</span>
                <h3 className={styles.productTitleDark}>Colombia Huila</h3>
                <p className={styles.productDescDark}>Cuerpo balanceado con dulzor de caramelo y chocolate rojo.</p>
              </div>
              <div className={`${styles.bentoItem} ${styles.primaryCard}`}>
                <h3 className={styles.productTitleLight}>Blend de la Casa</h3>
                <p className={styles.productDescLight}>Nuestra selección secreta para un espresso perfecto cada mañana.</p>
                <div className={styles.shopLink} aria-label="Comprar Ahora Blend de la Casa" role="button" tabIndex={0}>
                  Comprar Ahora <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className={styles.testimonialsSection}>
          <div className={styles.testimonialsContent}>
            <div className={styles.testimonialsHeader}>
              <h2 className={styles.sectionTitle}>Lo que dicen nuestros expertos</h2>
              <p className={styles.testimonialsText}>Nuestra comunidad valora la trazabilidad, la frescura y la pasión que ponemos en cada tueste.</p>
              <div className={styles.testimonialsNav}>
                <button className={styles.testNavBtn} onClick={prevTestimonial} aria-label="Testimonio anterior"><span className="material-symbols-outlined" aria-hidden="true">chevron_left</span></button>
                <button className={styles.testNavBtn} onClick={nextTestimonial} aria-label="Siguiente testimonio"><span className="material-symbols-outlined" aria-hidden="true">chevron_right</span></button>
              </div>
            </div>
            
            <div className={styles.testimonialsGrid} key={currentTestimonialIndex}>
              {visibleTestimonials.map((testimonial, idx) => (
                <div key={idx} className={styles.testCard}>
                  <div className={styles.stars}>
                    <span className="material-symbols-outlined" aria-hidden="true" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                    <span className="material-symbols-outlined" aria-hidden="true" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                    <span className="material-symbols-outlined" aria-hidden="true" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                    <span className="material-symbols-outlined" aria-hidden="true" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                    <span className="material-symbols-outlined" aria-hidden="true" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                  </div>
                  <p className={styles.testQuote}>{testimonial.text}</p>
                  <div className={styles.testUser}>
                    <div className={styles.testAvatar}>
                      <img src={testimonial.avatar} alt="User" width="64" height="64" loading="lazy" />
                    </div>
                    <div>
                      <div className={styles.testName}>{testimonial.name}</div>
                      <div className={styles.testRole}>{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.brandInfo}>
            <div className={styles.footerLogo}>Artisan Roasts</div>
            <p>Tostando historias, grano a grano. Elevando la cultura del café de especialidad.</p>
          </div>
          <div className={styles.footerLinksGrid}>
            <div className={styles.linkCol}>
              <span>Tienda</span>
              <a href="#inicio">Inicio</a>
              <a href="#grains">Granos</a>
            </div>
            <div className={styles.linkCol}>
              <span>Soporte</span>
              <a href="#">Contacto</a>
              <a href="#">Envíos</a>
            </div>
            <div className={styles.linkCol}>
              <span>Legal</span>
              <a href="#">Política de Privacidad</a>
              <a href="#">Términos</a>
            </div>
            <div className={styles.linkCol}>
              <span>Redes Sociales</span>
              <div className={styles.socialIcons}>
                <span className="material-symbols-outlined" aria-hidden="true">public</span>
                <span className="material-symbols-outlined" aria-hidden="true">share</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <span>© 2024 Artisan Roasts. Elaborado con Sofisticación Táctil.</span>
          <div className={styles.paymentIcons}>
            <span className="material-symbols-outlined" aria-hidden="true">payments</span>
            <span className="material-symbols-outlined" aria-hidden="true">credit_card</span>
          </div>
        </div>
      </footer>
    </>
  );
};
