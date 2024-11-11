import React from "react";
import GameStartPage from "../components/GameStartPage";

export default function VisualMemory() {
  return (
    <GameStartPage
      gametitle="Visual Memory"
      icon={require("../assets/GridMemory.png")}
      gameInfoText="Remember which boxes light up and select them again afterwards."
      gamePath="/visual-memory-game"
    />
  );
}
