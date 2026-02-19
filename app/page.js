import WorldMap from "./components/WorldMap";

export default function HomePage() {
  return (
    <>
      <header className="ref-nav">
        <div className="ref-nav-shell">
          <a className="ref-brand-wrap" href="#inicio" aria-label="Ir al inicio">
            <span className="ref-brand-top">CERO</span>
            <span className="ref-brand-bottom">COMPLICADO</span>
          </a>
          <a className="ref-chat-link" href="https://wa.me/726567607" target="_blank" rel="noreferrer">
            <span className="ref-chat-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" focusable="false">
                <path d="M20.52 3.48A11.82 11.82 0 0 0 12.1 0C5.56 0 .22 5.33.22 11.88c0 2.1.55 4.15 1.6 5.96L0 24l6.34-1.66a11.82 11.82 0 0 0 5.75 1.47h.01c6.54 0 11.88-5.33 11.88-11.88 0-3.17-1.24-6.15-3.46-8.45ZM12.1 21.79h-.01a9.86 9.86 0 0 1-5.03-1.38l-.36-.21-3.76.99 1-3.67-.24-.38a9.86 9.86 0 0 1-1.51-5.25c0-5.45 4.44-9.9 9.91-9.9 2.64 0 5.12 1.03 6.98 2.9a9.82 9.82 0 0 1 2.9 7c0 5.45-4.44 9.9-9.9 9.9Zm5.43-7.41c-.3-.15-1.76-.86-2.03-.96-.27-.1-.46-.15-.66.15-.2.3-.76.96-.93 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.74-1.64-2.04-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.53.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.59-.9-2.17-.24-.57-.49-.5-.66-.5h-.56c-.2 0-.52.07-.79.37-.27.3-1.03 1-1.03 2.45 0 1.44 1.05 2.83 1.2 3.03.15.2 2.06 3.14 4.98 4.4.7.3 1.25.48 1.67.62.7.22 1.34.19 1.84.11.56-.08 1.76-.72 2-1.42.25-.7.25-1.3.17-1.42-.08-.12-.27-.2-.56-.35Z" />
              </svg>
            </span>
            <span className="ref-chat-text">Soporte</span>
          </a>
        </div>
      </header>

      <a className="ref-island-dock" href="https://wa.me/726567607" target="_blank" rel="noreferrer">
        <div className="ref-island-head">
          <span className="ref-island-label">Iniciar Envío</span>
          <span className="ref-island-dot" />
        </div>
        <div className="ref-island-content">
          <div className="ref-island-row">
            <span>Estado</span>
            <span className="ref-green">Operativo</span>
          </div>
          <div className="ref-island-row">
            <span>Tiempo</span>
            <span>&lt; 60 Minutos</span>
          </div>
          <p className="ref-island-whatsapp">Continuar en WhatsApp →</p>
        </div>
      </a>

      <main>
        <section id="inicio" className="ref-hero">
          <WorldMap />
          <div className="ref-hero-content">
            <div className="hero-grid">
              <div>
                <p className="ref-eyebrow">Plataforma de remesas empresarial</p>
                <h1 className="ref-hero-title">
                  Envios rapidos.
                  <br />
                  <span>Control total.</span>
                </h1>
                <p className="ref-hero-copy">
                  CERO COMPLICADO centraliza tus remesas con ejecucion inteligente,
                  confirmaciones en tiempo real y soporte experto en cada operacion.
                </p>
                <div className="hero-actions">
                  <a className="hero-primary" href="https://wa.me/726567607" target="_blank" rel="noreferrer">
                    Iniciar envio
                  </a>
                  <a className="hero-secondary" href="#destinos">
                    Ver cobertura
                  </a>
                </div>
                <div className="hero-metrics" aria-label="Indicadores principales">
                  <article>
                    <strong>&lt; 60 min</strong>
                    <span>Tiempo promedio</span>
                  </article>
                  <article>
                    <strong>99.9%</strong>
                    <span>Trazabilidad</span>
                  </article>
                  <article>
                    <strong>24/7</strong>
                    <span>Soporte activo</span>
                  </article>
                </div>
              </div>
              <aside className="hero-quote" aria-label="Panel de cotizacion">
                <p className="quote-label">Panel en vivo</p>
                <h3>Cotizacion inteligente</h3>
                <p className="quote-copy">
                  Obten una tasa clara, validacion automatica y confirmacion de
                  entrega con visibilidad punta a punta.
                </p>
                <ul className="quote-list">
                  <li>Estado operativo en tiempo real</li>
                  <li>Notificaciones por cada etapa</li>
                  <li>Ejecucion priorizada por IA</li>
                </ul>
              </aside>
            </div>
          </div>
        </section>

        <section id="destinos" className="ref-routes">
          <h2>Nodos Activos.</h2>
          <div className="ref-routes-grid">
            <article className="ref-route-card">
              <div className="ref-route-head">
                <span className="ref-flag">🇻🇪</span>
                <span className="ref-node">Node_01</span>
              </div>
              <h3>Venezuela</h3>
              <p>
                Liquidación inmediata vía Pago Móvil y transferencias directas a
                todos los bancos.
              </p>
            </article>

            <article className="ref-route-card">
              <div className="ref-route-head">
                <span className="ref-flag">🇨🇴</span>
                <span className="ref-node">Node_02</span>
              </div>
              <h3>Colombia</h3>
              <p>
                Conexión directa con Bancolombia, Nequi y Daviplata. Tasa real
                garantizada.
              </p>
            </article>
          </div>
        </section>

        <footer className="ref-footer">
          <div>© 2026 CERO COMPLICADO.</div>
          <div className="ref-footer-right">
            <span className="ref-systems">Sovereign Systems</span>
            <span>Node: Madrid</span>
          </div>
        </footer>
      </main>
    </>
  );
}
