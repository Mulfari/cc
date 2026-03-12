"use client";
import { useState } from "react";

const DESTINATIONS = [
  { id: "ve", flag: "🇻🇪", name: "Venezuela", currency: "Bs.D", rate: 56.4,  method: "Pago Móvil" },
  { id: "co", flag: "🇨🇴", name: "Colombia",  currency: "COP",  rate: 4180,  method: "Nequi · Bancolombia" },
  { id: "eu", flag: "🇪🇺", name: "Europa",    currency: "EUR",  rate: 0.92,  method: "SEPA · Bizum" },
];

const WA_MSGS = [
  { from: "user", text: "Quiero enviar **$100** a Venezuela 🇻🇪", time: "10:41" },
  { from: "bot",  text: "Tasa hoy: **56.4 Bs.D** / USD.", time: "10:41" },
  { from: "bot",  type: "receipt", amount: "$100 USD", receives: "5,640 Bs.D", dest: "Venezuela 🇻🇪", method: "Pago Móvil", time: "10:41" },
  { from: "bot",  text: "Sin comisión 🎉 ¿Confirmamos?", time: "10:42" },
  { from: "user", text: "Sí, confirmar.", time: "10:42" },
  { from: "bot",  text: "✅ ¡Listo! Llega en **< 60 min**. 🚀", time: "10:42" },
];

const Bold = ({ children }) => <strong>{children}</strong>;
const parseText = (t) =>
  t.split(/(\*\*[^*]+\*\*)/g).map((c, i) =>
    c.startsWith("**") ? <Bold key={i}>{c.slice(2, -2)}</Bold> : c
  );

const fmt = (n) => Number(n).toLocaleString("es-VE", { maximumFractionDigits: 0 });

const WaIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.52 3.48A11.82 11.82 0 0 0 12.1 0C5.56 0 .22 5.33.22 11.88c0 2.1.55 4.15 1.6 5.96L0 24l6.34-1.66a11.82 11.82 0 0 0 5.75 1.47h.01c6.54 0 11.88-5.33 11.88-11.88 0-3.17-1.24-6.15-3.46-8.45ZM12.1 21.79h-.01a9.86 9.86 0 0 1-5.03-1.38l-.36-.21-3.76.99 1-3.67-.24-.38a9.86 9.86 0 0 1-1.51-5.25c0-5.45 4.44-9.9 9.91-9.9 2.64 0 5.12 1.03 6.98 2.9a9.82 9.82 0 0 1 2.9 7c0 5.45-4.44 9.9-9.9 9.9Zm5.43-7.41c-.3-.15-1.76-.86-2.03-.96-.27-.1-.46-.15-.66.15-.2.3-.76.96-.93 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.74-1.64-2.04-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.53.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.59-.9-2.17-.24-.57-.49-.5-.66-.5h-.56c-.2 0-.52.07-.79.37-.27.3-1.03 1-1.03 2.45 0 1.44 1.05 2.83 1.2 3.03.15.2 2.06 3.14 4.98 4.4.7.3 1.25.48 1.67.62.7.22 1.34.19 1.84.11.56-.08 1.76-.72 2-1.42.25-.7.25-1.3.17-1.42-.08-.12-.27-.2-.56-.35Z" />
  </svg>
);

const HeroSection = () => {
  const [amount, setAmount] = useState("100");
  const [destId, setDestId] = useState("ve");

  const dest   = DESTINATIONS.find((d) => d.id === destId);
  const numAmt = parseFloat(amount.replace(/[^0-9.]/g, "")) || 0;
  const result = numAmt * dest.rate;

  return (
    <section id="inicio" className="ref-hero">
      <div className="hero-3d-elements" aria-hidden="true">
        <div className="hero-3d-shape hero-3d-shape--1" />
        <div className="hero-3d-shape hero-3d-shape--2" />
        <div className="hero-3d-shape hero-3d-shape--3" />
        <div className="hero-3d-line hero-3d-line--1" />
        <div className="hero-3d-line hero-3d-line--2" />
      </div>

      <div className="ref-hero-content">
        <div className="hero-stage">

          {/* ── TÍTULO ─────────────────────── */}
          <div className="hero-stage-head">
            <div className="hero-live-badge">
              <span className="hero-live-dot" aria-hidden="true" />
              Servicio activo ahora
            </div>
            <h1 className="ref-hero-title">
              Envía dinero <span>desde WhatsApp.</span>
            </h1>
          </div>

          {/* ── FILA PRINCIPAL: Teléfono + Calculadora ── */}
          <div className="hero-stage-row">

            {/* ── IZQUIERDA: texto + teléfono ── */}
            <div className="hero-stage-left">
              <p className="hero-stage-desc">
                Envía a Venezuela, Colombia y Europa en minutos. Sin apps, sin filas. Solo escríbenos por WhatsApp y listo.
              </p>
              <ul className="hero-stage-perks" aria-label="Ventajas">
                <li>
                  <span className="hero-perk-icon" aria-hidden="true">⚡</span>
                  Entrega en menos de <strong>60 minutos</strong>
                </li>
                <li>
                  <span className="hero-perk-icon" aria-hidden="true">🎁</span>
                  <strong>$0 comisión</strong> en tu primer envío
                </li>
                <li>
                  <span className="hero-perk-icon" aria-hidden="true">🛡️</span>
                  Transacciones <strong>100% seguras</strong>
                </li>
              </ul>

              {/* ── TELÉFONO VISUAL ─────────────── */}
              <div className="hero-phone-stage" aria-hidden="true">
            <div className="phone-wrap">
              <div className="phone-frame">

                <div className="phone-statusbar">
                  <span className="phone-statusbar-time">10:42</span>
                  <div className="phone-statusbar-icons">
                    <svg width="12" height="9" viewBox="0 0 12 9" fill="currentColor">
                      <rect x="0" y="5" width="2" height="4" rx="0.5" opacity="0.4"/>
                      <rect x="2.5" y="3.5" width="2" height="5.5" rx="0.5" opacity="0.6"/>
                      <rect x="5" y="1.5" width="2" height="7.5" rx="0.5" opacity="0.8"/>
                      <rect x="7.5" y="0" width="2" height="9" rx="0.5"/>
                    </svg>
                    <svg width="16" height="8" viewBox="0 0 16 8" fill="currentColor">
                      <rect x="0" y="1" width="13" height="6" rx="1.5" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.9"/>
                      <rect x="13.5" y="3" width="1.5" height="2" rx="0.5" opacity="0.6"/>
                      <rect x="1" y="2" width="9" height="4" rx="0.8"/>
                    </svg>
                  </div>
                </div>

                <div className="phone-notch" />

                <div className="phone-wa-header">
                  <div className="phone-wa-back">
                    <svg width="10" height="16" viewBox="0 0 10 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M8 1L2 8l6 7"/>
                    </svg>
                  </div>
                  <div className="phone-wa-avatar">EM</div>
                  <div className="phone-wa-info">
                    <strong>Envios Manda</strong>
                    <span className="phone-wa-online">
                      <span className="phone-wa-online-dot" />
                      En línea
                    </span>
                  </div>
                  <div className="phone-wa-actions">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/>
                    </svg>
                  </div>
                </div>

                <div className="phone-chat">
                  <div className="phone-chat-date">Hoy · 10:41</div>
                  {WA_MSGS.map((msg, i) =>
                    msg.type === "receipt" ? (
                      <div key={i} className="phone-msg phone-msg--bot phone-msg--receipt-wrap" style={{ "--i": i }}>
                        <div className="phone-receipt">
                          <p className="phone-receipt-title">💸 Resumen del envío</p>
                          <div className="phone-receipt-row"><span>Envías</span><strong>{msg.amount}</strong></div>
                          <div className="phone-receipt-row phone-receipt-row--highlight"><span>Reciben</span><strong>{msg.receives}</strong></div>
                          <div className="phone-receipt-row"><span>Destino</span><span>{msg.dest}</span></div>
                          <div className="phone-receipt-row phone-receipt-row--free"><span>Comisión</span><strong>$0 gratis</strong></div>
                        </div>
                        <span className="phone-msg-meta">{msg.time}</span>
                      </div>
                    ) : (
                      <div key={i} className={`phone-msg phone-msg--${msg.from}`} style={{ "--i": i }}>
                        <span className="phone-msg-text">{parseText(msg.text)}</span>
                        <span className="phone-msg-meta">
                          {msg.time}
                          {msg.from === "user" && (
                            <svg width="14" height="9" viewBox="0 0 16 11" fill="none">
                              <path d="M1 5.5L5 9.5L15 1.5" stroke="#53bdeb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M5 5.5L9 9.5L15 1.5" stroke="#53bdeb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </span>
                      </div>
                    )
                  )}
                  <div className="phone-typing"><span /><span /><span /></div>
                </div>

                <div className="phone-input-bar">
                  <div className="phone-input-emoji">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><path d="M8 13s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>
                    </svg>
                  </div>
                  <div className="phone-input-field">Escribe un mensaje</div>
                  <div className="phone-input-send">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/>
                    </svg>
                  </div>
                </div>

                <div className="phone-home-bar" />
              </div>
            </div>
          </div>
          {/* ── / teléfono ── */}

            </div>
            {/* ── / izquierda ── */}

            {/* ── DERECHA: calculadora ── */}
            <div className="hero-stage-right">

              <div className="hcalc">

                <div className="hcalc-tabs" role="group" aria-label="Destino">
                  {DESTINATIONS.map((d) => (
                    <button
                      key={d.id}
                      type="button"
                      className={`hcalc-tab${destId === d.id ? " hcalc-tab--on" : ""}`}
                      onClick={() => setDestId(d.id)}
                      aria-pressed={destId === d.id}
                    >
                      <span className="hcalc-tab-flag">{d.flag}</span>
                      <span className="hcalc-tab-name">{d.name}</span>
                    </button>
                  ))}
                </div>

                <div className="hcalc-body">
                  <div className="hcalc-row">
                    <div className="hcalc-field">
                      <span className="hcalc-label">Tú envías</span>
                      <div className="hcalc-input-box">
                        <span className="hcalc-sym">$</span>
                        <input
                          className="hcalc-input"
                          type="text"
                          inputMode="decimal"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
                          placeholder="100"
                          aria-label="Monto en USD"
                        />
                        <span className="hcalc-unit">USD</span>
                      </div>
                    </div>

                    <div className="hcalc-arrow" aria-hidden="true">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                      </svg>
                      <span className="hcalc-rate">1 USD = {dest.rate} {dest.currency}</span>
                    </div>

                    <div className="hcalc-field hcalc-field--out">
                      <span className="hcalc-label">Tu familia recibe</span>
                      <div className="hcalc-output-box">
                        <span className="hcalc-result">{numAmt > 0 ? fmt(result) : "—"}</span>
                        <span className="hcalc-result-cur">{dest.currency}</span>
                      </div>
                    </div>
                  </div>

                  <span className="hcalc-method">{dest.flag} {dest.name} · {dest.method}</span>
                </div>

                <div className="hcalc-footer">
                  <a
                    href="https://wa.me/726567607"
                    target="_blank"
                    rel="noreferrer"
                    className="hcalc-cta"
                    aria-label="Enviar por WhatsApp"
                  >
                    <WaIcon size={17} />
                    Enviar por WhatsApp
                  </a>
                  <p className="hcalc-disclaimer">✓ Sin comisión en tu primer envío</p>
                </div>

              </div>

            </div>
            {/* ── / derecha ── */}

          </div>
          {/* ── / fila principal ── */}

          {/* ── STATS ──────────────────────── */}
          <div className="hero-stage-stats" aria-label="Indicadores">
            <div className="hero-split-stat"><strong>&lt; 60 min</strong><span>Entrega</span></div>
            <div className="hero-split-stat-sep" aria-hidden="true" />
            <div className="hero-split-stat"><strong>$0</strong><span>1er envío</span></div>
            <div className="hero-split-stat-sep" aria-hidden="true" />
            <div className="hero-split-stat"><strong>24 / 7</strong><span>Soporte</span></div>
            <div className="hero-split-stat-sep" aria-hidden="true" />
            <div className="hero-split-stat"><strong>3 países</strong><span>Cobertura</span></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
