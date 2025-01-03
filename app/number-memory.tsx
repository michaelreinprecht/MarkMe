/*

Defines the Parameters needed for the GameStartPage of NumberMemory.

*/

import React from "react";
import GameStartPage from "../components/GameStartPage";

export default function NumberMemory() {
  return (
    <GameStartPage
      gametitle="Number Memory"
      icon={require("../assets/NumberMemory.png")}
      gameInfoText="Remember a sequence of numbers in the given time. When the time is finished, write them down in the same order."
      gamePath="/number-memory-game"
    />
  );
}
