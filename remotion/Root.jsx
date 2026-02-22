import React from "react";
import { Composition } from "remotion";
import { Escena1 } from "./Escena1";
import { Escena2 } from "./Escena2";
import { WhatsAppDemo } from "./WhatsAppDemo";

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="Escena1"
        component={Escena1}
        durationInFrames={120}
        fps={30}
        width={720}
        height={1280}
      />
      <Composition
        id="Escena2"
        component={Escena2}
        durationInFrames={150}
        fps={30}
        width={720}
        height={1280}
      />
      <Composition
        id="WhatsAppDemo"
        component={WhatsAppDemo}
        durationInFrames={650}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
