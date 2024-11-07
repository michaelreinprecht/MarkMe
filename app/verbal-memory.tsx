import React from "react";
import GameStartPage from "../components/GameStartPage";

export default function VerbalMemory() {
  return (
    <GameStartPage
      gametitle="Verbal Memory"
      icon={require("../assets/SequenceMemory.png")}
      gameInfoText="You will be shown words one at a time. 
        If you've seen a word during the test click SEEN, 
        if it's a new word click NEW."
      gamePath="/verbal-memory-game"
    />
  );
}
