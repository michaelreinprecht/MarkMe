/*

Defines the Parameters needed for the GameStartPage of SequenceMemory.

*/

import React from "react";
import GameStartPage from "../components/GameStartPage";

export default function SequenceMemory() {
  return (
    <>
      <GameStartPage
        gametitle="Sequence Memory"
        icon={require("../assets/GridMemory.png")}
        gameInfoText="Memorize the order in which the buttons light up, then press them sequentially.
                            The length of the pattern increases with each completion.
                            The test is over if you make a mistake."
        gamePath="/sequence-memory-game"
      />
    </>
  );
}
