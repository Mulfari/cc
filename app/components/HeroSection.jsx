"use client";

import { useCallback, useState } from "react";
import ThreeHeroScene from "./ThreeHeroScene";
import styles from "./HeroSection.module.css";

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleSceneLoaded = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section id="inicio" className="ref-hero">
      <div className="hero-nebula" aria-hidden="true" />

      <ThreeHeroScene
        className={`ref-hero-three-bg ${styles.threeScene} ${isLoaded ? styles.threeSceneVisible : ""}`}
        onLoaded={handleSceneLoaded}
      />

      <div className="hero-bottom-fade" aria-hidden="true" />

      <div className="ref-hero-content">
        <div className="hero-grid">
          <div>
            <p className="ref-eyebrow">Remesas simples</p>
            <h1 className="ref-hero-title">
              Envíos rápidos.
              <br />
              <span>Cero complicaciones.</span>
            </h1>
            <p className="ref-hero-copy">
              Envía en minutos, con tasa clara y confirmación en tiempo real.
            </p>
            <a className="hero-inline-link" href="#destinos">
              Ver cobertura
              <span className="hero-inline-arrow" aria-hidden="true">→</span>
            </a>
            <div className="hero-metrics" aria-label="Indicadores principales">
              <article>
                <strong>&lt; 60 min</strong>
                <span>Tiempo promedio</span>
              </article>
              <article>
                <strong>24/7</strong>
                <span>Soporte activo</span>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
