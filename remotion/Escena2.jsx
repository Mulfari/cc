import React from "react";
import { useCurrentFrame, spring, useVideoConfig } from "remotion";

export const Escena2 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const imageScale = spring({ frame: frame - 15, fps, config: { damping: 12 } });
  const botReplyScale = spring({ frame: frame - 100, fps, config: { damping: 12 } });

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
        {frame >= 15 && (
          <div
            style={{
              transform: `scale(${imageScale})`,
              alignSelf: "flex-end",
              backgroundColor: "#dcf8c6",
              padding: "8px",
              borderRadius: "12px",
              margin: "10px 0",
              boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
            }}
          >
            <div
              style={{
                width: "200px",
                height: "120px",
                backgroundColor: "#ccc",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#666",
                fontFamily: "sans-serif",
              }}
            >
              [Foto ID]
            </div>
          </div>
        )}

        {frame >= 45 && frame < 95 && (
          <div
            style={{
              alignSelf: "flex-start",
              margin: "10px 0",
              color: "#888",
              fontStyle: "italic",
              fontFamily: "sans-serif",
            }}
          >
            Escaneando documento...
          </div>
        )}

        {frame >= 100 && (
          <div
            style={{
              transform: `scale(${botReplyScale})`,
              backgroundColor: "#ffffff",
              alignSelf: "flex-start",
              padding: "12px 16px",
              borderRadius: "12px",
              margin: "10px 0",
              maxWidth: "75%",
              fontFamily: "Arial, sans-serif",
              fontSize: "24px",
              boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
            }}
          >
            Documento verificado ✓. Indica el monto y destino del envío.
          </div>
        )}
      </div>
    </div>
  );
};
