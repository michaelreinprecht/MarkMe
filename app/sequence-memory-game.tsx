import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "../constants/Constants";
import MemoryCard from "../components/MemoryCard";
import LevelIndicator from "../components/LevelIndicator";
import PageTitle from "../components/PageTitle";
import MemoryGrid from "../components/MemoryGrid";

export default function SequenceMemory() {
  const [level, setLevel] = useState(0);
  const [sequence, setSequence] = useState<number[]>([]);
  const [clickedCards, setClickedCards] = useState<number[]>([]);
  const [isSequenceCorrect, setIsSequenceCorrect] = useState<boolean>(true);
  const [highlightedCards, setHighlightedCards] = useState<number[]>([]);
  const [inputEnabled, setInputEnabled] = useState<boolean>(false);
  const highlightDuration = 500;
  const gridSize = 3;
  const router = useRouter();
  const title = "Sequence Memory";

  const generateNextRandomNumber = (lastNumber: number | undefined) => {
    let newNumber;
    do {
      newNumber = Math.floor(Math.random() * gridSize ** 2); // Generate a number between 0 and 8
    } while (newNumber === lastNumber); // Ensure it's not the same as the last number
    return newNumber;
  };

  useEffect(() => {
    setSequence((prevSequence) => {
      const lastNumber = prevSequence[prevSequence.length - 1];
      const newNumber = generateNextRandomNumber(lastNumber);
      return [...prevSequence, newNumber];
    });
  }, [level]);

  useEffect(() => {
    // Highlight cards in the current sequence one by one
    const highlightSequence = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      for (let i = 0; i < sequence.length; i++) {
        setHighlightedCards([sequence[i]]);
        await new Promise((resolve) =>
          setTimeout(resolve, highlightDuration + 50)
        );
        setHighlightedCards([]);
        await new Promise((resolve) => setTimeout(resolve, 50));
      }
      setInputEnabled(true);
    };

    if (sequence.length > 0) {
      highlightSequence();
    }
  }, [sequence]);

  const handleCardClick = (id: number) => {
    if (inputEnabled) {
      setClickedCards([...clickedCards, id]);
    }
  };

  const checkSequence = () => {
    for (var i = 0; i < clickedCards.length; i++) {
      if (clickedCards[i] != sequence[i]) {
        setIsSequenceCorrect(false);
        break;
      }
    }
  };

  const checkForLevelComplete = () => {
    if (
      isSequenceCorrect &&
      clickedCards.length == sequence.length &&
      clickedCards[0] == sequence[0]
    ) {
      setInputEnabled(false);
      setLevel(level + 1);
      setClickedCards([]);
    }
  };

  const checkGameOver = () => {
    if (!isSequenceCorrect) {
      setInputEnabled(false);
      setIsSequenceCorrect(true);
      setHighlightedCards([]);
      setClickedCards([]);
      setSequence([]);
      setLevel(0);
      router.replace(
        `/gameOver?title=${title}&level=${level}&tryAgainPath=/sequence-memory-game`
      );
    }
  };

  useEffect(() => {
    if (sequence.length > 0) {
      checkSequence();
      checkForLevelComplete();
    }
  }, [clickedCards]);

  useEffect(() => {
    checkGameOver();
  }, [isSequenceCorrect]);

  return (
    <View style={styles.container}>
      <PageTitle text={title} />
      <LevelIndicator level={level} />

      <MemoryGrid
        highlightedCards={highlightedCards}
        gridSize={gridSize}
        onCardClick={handleCardClick}
        inputEnabled={inputEnabled}
      />

      {!inputEnabled && (
        <Text style={styles.info}>Please wait for the sequence to finish</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
    alignItems: "center",
    justifyContent: "center", // Center the gamePad in the view
  },
  gamePad: {
    width: "90%", // Adjust width to fit the grid
    aspectRatio: 1, // Ensures a square grid (width = height)
    alignItems: "center", // Center grid content horizontally
    justifyContent: "center", // Center grid content vertically
  },
  row: {
    flexDirection: "row", // Ensure cards in a row are arranged horizontally
    justifyContent: "center", // Center cards within each row
  },
  info: {
    color: Colors.lightText,
  },
});
