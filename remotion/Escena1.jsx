import React from "react";
import { useCurrentFrame, spring, useVideoConfig } from "remotion";

const ChatBubble = ({
  text,
  isBot,
  startFrame,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 12 },
  });

  if (frame < startFrame) return null;

  return (
    <div
      style={{
        transform: `scale(${scale})`,
        backgroundColor: isBot ? "#ffffff" : "#dcf8c6",
        alignSelf: isBot ? "flex-start" : "flex-end",
        padding: "12px 16px",
        borderRadius: "12px",
        margin: "10px 0",
        maxWidth: "75%",
        fontFamily: "Arial, sans-serif",
        fontSize: "24px",
        boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
      }}
    >
      {text}
    </div>
  );
};

export const Escena1 = () => {
  return (
    <div
      style={{
        flex: 1,
        backgroundColor: "#ece5dd",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          backgroundColor: "#075e54",
          color: "white",
          padding: "20px",
          fontSize: "28px",
          fontWeight: "bold",
          fontFamily: "Arial, sans-serif",
        }}
      >
        Bot de Envíos
        <div style={{ fontSize: "16px", fontWeight: "normal" }}>En línea</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", padding: "20px" }}>
        <ChatBubble
          text="Hola, quiero hacer un envío"
          isBot={false}
          startFrame={15}
        />
        <ChatBubble
          text="¡Hola! Para proteger tu seguridad, envíame una foto de tu documento de identidad."
          isBot={true}
          startFrame={60}
        />
      </div>
    </div>
  );
};
