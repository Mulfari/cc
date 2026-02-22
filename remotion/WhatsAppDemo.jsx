import React from "react";
import { useCurrentFrame, spring, useVideoConfig } from "remotion";

const ChatBubble = ({ text, isBot, startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = spring({ frame: frame - startFrame, fps, config: { damping: 12 } });

  if (frame < startFrame) return null;

  return (
    <div
      style={{
        transform: `scale(${scale})`,
        backgroundColor: isBot ? "#ffffff" : "#dcf8c6",
        alignSelf: isBot ? "flex-start" : "flex-end",
        padding: "24px 32px",
        borderRadius: "20px",
        margin: "15px 0",
        maxWidth: "80%",
        fontFamily: "Arial, sans-serif",
        fontSize: "36px",
        color: "#303030",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      {text}
    </div>
  );
};

const ImageBubble = ({ label, isBot, startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = spring({ frame: frame - startFrame, fps, config: { damping: 12 } });

  if (frame < startFrame) return null;

  return (
    <div
      style={{
        transform: `scale(${scale})`,
        alignSelf: isBot ? "flex-start" : "flex-end",
        backgroundColor: isBot ? "#ffffff" : "#dcf8c6",
        padding: "12px",
        borderRadius: "20px",
        margin: "15px 0",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          width: "350px",
          height: "200px",
          backgroundColor: "#cfd8dc",
          borderRadius: "12px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#546e7a",
          fontFamily: "sans-serif",
          fontSize: "30px",
          fontWeight: "bold",
        }}
      >
        {label}
      </div>
    </div>
  );
};

export const WhatsAppDemo = () => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        flex: 1,
        backgroundColor: "#efeae2",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          backgroundColor: "#075e54",
          color: "white",
          padding: "40px",
          display: "flex",
          alignItems: "center",
          gap: "20px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
        }}
      >
        <div
          style={{
            width: "80px",
            height: "80px",
            backgroundColor: "#ccc",
            borderRadius: "50%",
          }}
        />
        <div>
          <div style={{ fontSize: "45px", fontWeight: "bold", fontFamily: "Arial, sans-serif" }}>
            Bot de Envíos
          </div>
          <div style={{ fontSize: "28px", opacity: 0.8, fontFamily: "Arial, sans-serif" }}>
            en línea
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "40px",
          flex: 1,
          justifyContent: "flex-end",
        }}
      >
        <ChatBubble text="Hola, quiero hacer un envío" isBot={false} startFrame={15} />
        <ChatBubble
          text="¡Hola! Para proteger tu seguridad, envíame una foto de tu documento de identidad. 🪪"
          isBot={true}
          startFrame={60}
        />

        <ImageBubble label="[Foto ID]" isBot={false} startFrame={130} />

        {frame >= 160 && frame < 220 && (
          <div
            style={{
              alignSelf: "flex-start",
              margin: "15px 0",
              color: "#888",
              fontSize: "28px",
              fontFamily: "sans-serif",
              fontStyle: "italic",
            }}
          >
            Escaneando documento con IA...
          </div>
        )}

        <ChatBubble
          text="✅ Identidad verificada. ¿Cuánto deseas enviar y a quién?"
          isBot={true}
          startFrame={220}
        />

        <ChatBubble text="Envíale 100 a la cuenta de mi mamá" isBot={false} startFrame={310} />
        <ChatBubble
          text="Perfecto. Envío de 100 registrado. Por favor, adjunta tu comprobante de pago."
          isBot={true}
          startFrame={380}
        />

        <ImageBubble label="[Comprobante]" isBot={false} startFrame={470} />
        <ChatBubble
          text="🎉 ¡Envío Procesado con Éxito! Tu dinero ya está en camino. 💸"
          isBot={true}
          startFrame={540}
        />
      </div>
    </div>
  );
};
