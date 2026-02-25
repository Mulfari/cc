"use client";

import { useEffect, useState } from "react";
import ThreeHeroScene from "../ThreeHeroScene";
import styles from "./HeroSection.module.css";

const HeroSection = () => {
  const [isSceneReady, setIsSceneReady] = useState(false);

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      setIsSceneReady(true);
    }, 900);

    return () => {
      window.clearTimeout(timerId);
    };
  }, []);

  return (
    <section className={styles.heroSection}>
      <div className={styles.sceneLayer}>
        <ThreeHeroScene className={styles.sceneCanvas} />
      </div>

      <div className={`${styles.contentPanel} ${isSceneReady ? styles.contentPanelVisible : ""}`}>
        <p className={styles.eyebrow}>Remesas inteligentes</p>
        <h1 className={styles.title}>
          Envia dinero <br />
          al instante, <br />
          a cualquier parte.
        </h1>
        <p className={styles.description}>
          Transferencias rapidas, seguras y transparentes.
          <br />
          Tu mundo financiero en tus manos.
        </p>

        <div className={styles.actionRow}>
          <button type="button" className={styles.primaryButton}>
            Comenzar ahora
          </button>
          <a href="/" className={styles.secondaryButton} aria-label="Ir a la pagina principal">
            Saber mas
          </a>
        </div>
      </div>

      {!isSceneReady && (
        <div className={styles.loadingMask}>
          <h2 className={styles.loadingText}>Cargando experiencia...</h2>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
