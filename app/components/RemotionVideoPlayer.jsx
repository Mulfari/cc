"use client";

import { Player } from "@remotion/player";
import { WhatsAppDemo } from "../../remotion/WhatsAppDemo";

export default function RemotionVideoPlayer() {
  return (
    <div
      className="ref-video-wrapper"
      style={{
        width: "100%",
        maxWidth: 360,
        margin: "0 auto",
      }}
    >
      <Player
        component={WhatsAppDemo}
        durationInFrames={650}
        compositionWidth={1080}
        compositionHeight={1920}
        fps={30}
        acknowledgeRemotionLicense
        style={{
          width: "100%",
          aspectRatio: "9/16",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
        }}
        controls
      />
    </div>
  );
}
