import { Helmet } from 'react-helmet-async';
import styles from './LandingPage.module.scss';
import { Navbar } from '../../components/Navbar/Navbar';
import { Button } from '../../components/Button/Button';

export const LandingPage = () => {
  return (
    <>
      <Helmet>
        <title>Artisan Roasts | El Arte de Tostar</title>
        <meta name="description" content="Descubre granos de especialidad seleccionados a mano y tostados diariamente. Una experiencia sensorial diseñada para los paladares más exigentes." />
      </Helmet>

      <Navbar />

      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroBg}>
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4Fey5AIn8xoA0HQxi9Xkq_oz0gt13ZYGEIjOeSD-ja583aSIbTfjXvJZV5FMz5cIPgeppWWSRVVbhoIEFcYM6tiANU4O0ri9NZjauP-KfZdr4WNd2oXVUZgar-5BJf6n8VpmCs8f9TXEiqPHR8R9lqOecjAJ2gRAbEg45OBuxOuAf5lbqdB3AAcJzxaK7LwaN3Z5KdAPN206Ehx1aZu-eTzQS_unIpqaFyrhGu3mI5vIQU5OqKRBV1lNlxZ3itdNHmIVUdK8LfLHk" 
              alt="" 
              className={styles.heroImg} 
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
                <Button variant="primary">Explorar Granos</Button>
                <Button variant="outline">Saber Más</Button>
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
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCuMXXaFsZJT74yQ2cFOFLlPTGJY-NzPZTuP-dOp6Py1byMV1PlTBZHLhtufBsqY5FqAQGr-bDBaqqMiO5-yNobgt_EF7GLpfotM0GU7Do0vnCYBoYW1ldeN8Ua5Q_k__Ly4mMVds273mUAaYZT_5dSaqeaek-bFT1iMYTr0X8GxS0E6frlH6MP3gKpPo7idUWAzcxJ2NsbXSjaHKfqzUK5kTWWbp3ivMWWn-MbtgzbQCZG6pZZqpV1MzcjIY3nNnP7EnW6x_800CdV" 
                alt="Ethiopean Yirgacheffe" 
                className={styles.bentoImg} 
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
                <div className={styles.shopLink}>
                  Comprar Ahora <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Suscripciones */}
        <section id="subscriptions" className={styles.subsSection}>
          <div className={styles.sectionHeaderCenter}>
            <h2 className={styles.sectionTitle}>Planes de Suscripción</h2>
            <p className={styles.sectionSubtitle}>El café más fresco del mundo, entregado en tu puerta exactamente cuando lo necesitas.</p>
          </div>

          <div className={styles.plansGrid}>
            {/* Plan 1 */}
            <div className={styles.planCard}>
              <div className={styles.planHeader}>
                <span className={styles.planLabel}>PARA EL AFICIONADO</span>
                <div className={styles.planPrice}>$19.99<span>/mes</span></div>
              </div>
              <ul className={styles.planFeatures}>
                <li><span className="material-symbols-outlined" aria-hidden="true">check_circle</span> 250g de café seleccionado</li>
                <li><span className="material-symbols-outlined" aria-hidden="true">check_circle</span> Envío mensual gratuito</li>
                <li><span className="material-symbols-outlined" aria-hidden="true">check_circle</span> Notas de cata incluidas</li>
              </ul>
              <Button variant="outline" fullWidth>Elegir Plan</Button>
            </div>

            {/* Plan 2 */}
            <div className={`${styles.planCard} ${styles.planFeatured}`}>
              <div className={styles.popularBadge}>POPULAR</div>
              <div className={styles.planHeader}>
                <span className={styles.planLabelFeatured}>PARA EL CONOCEDOR</span>
                <div className={styles.planPriceFeatured}>$34.99<span>/mes</span></div>
              </div>
              <ul className={`${styles.planFeatures} ${styles.featuresFeatured}`}>
                <li><span className="material-symbols-outlined" aria-hidden="true" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span> 500g (2 variedades)</li>
                <li><span className="material-symbols-outlined" aria-hidden="true" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span> Acceso a lotes exclusivos</li>
                <li><span className="material-symbols-outlined" aria-hidden="true" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span> 10% de dto. en tienda</li>
                <li><span className="material-symbols-outlined" aria-hidden="true" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span> Taller de brewing virtual</li>
              </ul>
              <Button variant="secondary" fullWidth>Elegir Plan</Button>
            </div>

            {/* Plan 3 */}
            <div className={styles.planCard}>
              <div className={styles.planHeader}>
                <span className={styles.planLabel}>PARA LA OFICINA</span>
                <div className={styles.planPrice}>$64.99<span>/mes</span></div>
              </div>
              <ul className={styles.planFeatures}>
                <li><span className="material-symbols-outlined" aria-hidden="true">check_circle</span> 1.5kg de Blend Superior</li>
                <li><span className="material-symbols-outlined" aria-hidden="true">check_circle</span> Envío quincenal</li>
                <li><span className="material-symbols-outlined" aria-hidden="true">check_circle</span> Soporte prioritario</li>
              </ul>
              <Button variant="outline" fullWidth>Elegir Plan</Button>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className={styles.testimonialsSection}>
          <div className={styles.testimonialsContent}>
            <div className={styles.testimonialsHeader}>
              <h2 className={styles.sectionTitle}>Lo que dicen nuestros expertos</h2>
              <p className={styles.testimonialsText}>Nuestra comunidad valora la trazabilidad, la frescura y la pasión que ponemos en cada tueste.</p>
              <div className={styles.testimonialsNav}>
                <button className={styles.testNavBtn} aria-label="Testimonio anterior"><span className="material-symbols-outlined" aria-hidden="true">chevron_left</span></button>
                <button className={styles.testNavBtn} aria-label="Siguiente testimonio"><span className="material-symbols-outlined" aria-hidden="true">chevron_right</span></button>
              </div>
            </div>
            
            <div className={styles.testimonialsGrid}>
              <div className={styles.testCard}>
                <div className={styles.stars}>
                  <span className="material-symbols-outlined" aria-hidden="true" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                  <span className="material-symbols-outlined" aria-hidden="true" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                  <span className="material-symbols-outlined" aria-hidden="true" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                  <span className="material-symbols-outlined" aria-hidden="true" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                  <span className="material-symbols-outlined" aria-hidden="true" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                </div>
                <p className={styles.testQuote}>"El tueste es impecable. Se nota la diferencia desde el primer aroma al abrir la bolsa. Mi ritual de la mañana ha cambiado por completo."</p>
                <div className={styles.testUser}>
                  <div className={styles.testAvatar}>
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMi6WFVbGJ_Dg7TnZRcgc3nMQ7Ef-Rfv0ztK0nsl0y_YA9NCgE-0lsWZNCkSJnaQiO--mvSUUON2JRAdQjk2_mvmNBzFUQoeg0-qU-qaCePJLzX8MhwWGqtJapMhRsAGJhS1OL1p4F4265nuuHCXf_uynoLqDWB_IJd_2wFQk8A6gn1lE10oPsVLXg0Rzz1ykh2lfCJSUzCPGGbaOCiDJ0wTfROfnR2tMUjuv7Joer93oOAVyOFSldDoQg4CgQu2bOus6VB95EuaKd" alt="User" />
                  </div>
                  <div>
                    <div className={styles.testName}>Andrés Moreno</div>
                    <div className={styles.testRole}>Home Barista</div>
                  </div>
                </div>
              </div>

              <div className={styles.testCard}>
                <div className={styles.stars}>
                  <span className="material-symbols-outlined" aria-hidden="true" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                  <span className="material-symbols-outlined" aria-hidden="true" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                  <span className="material-symbols-outlined" aria-hidden="true" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                  <span className="material-symbols-outlined" aria-hidden="true" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                  <span className="material-symbols-outlined" aria-hidden="true" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                </div>
                <p className={styles.testQuote}>"Increíble variedad y servicio. Las notas de cata son precisas y me han ayudado a educar mi paladar sobre los diferentes procesos del grano."</p>
                <div className={styles.testUser}>
                  <div className={styles.testAvatar}>
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpr-IvGX3_wA9jTodk9EvnKPHFxIv4nyKdvN58DuB3yWeC1dq12Vr9zAJHP7iZdF09U27iGe2CmKZuS75wTxCTvTrTLLBgvq0dUTmZcs-OQwo29VvwBa8m33gU9-5yZXILiSnLQaeLyq3AyPcHAVxoW3JEhDoZi3ke6aaSf1Am3Pb4WR_N2_snfFNBye-rw_Gv7uCG5DgH4wUDzKvsipQUbMEv7D4yhWJzF2ZgtDGkf_Nfs4j-YDIjQfxirbg-u_kJzqAgff7TErwz" alt="User" />
                  </div>
                  <div>
                    <div className={styles.testName}>Elena Castillo</div>
                    <div className={styles.testRole}>Sommelier de Café</div>
                  </div>
                </div>
              </div>
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
              <span>Shop</span>
              <a href="#">Menu</a>
              <a href="#">Beans</a>
            </div>
            <div className={styles.linkCol}>
              <span>Support</span>
              <a href="#">Contact</a>
              <a href="#">Shipping</a>
            </div>
            <div className={styles.linkCol}>
              <span>Legal</span>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms</a>
            </div>
            <div className={styles.linkCol}>
              <span>Social</span>
              <div className={styles.socialIcons}>
                <span className="material-symbols-outlined" aria-hidden="true">public</span>
                <span className="material-symbols-outlined" aria-hidden="true">share</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <span>© 2024 Artisan Roasts. Crafted with Tactile Sophistication.</span>
          <div className={styles.paymentIcons}>
            <span className="material-symbols-outlined" aria-hidden="true">payments</span>
            <span className="material-symbols-outlined" aria-hidden="true">credit_card</span>
          </div>
        </div>
      </footer>
    </>
  );
};
