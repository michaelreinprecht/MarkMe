import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "../constants/Constants";
import MemoryCard from "../components/MemoryCard";
import LevelIndicator from "../components/LevelIndicator";
import PageTitle from "../components/PageTitle";

export default function VisualMemory() {
  const [level, setLevel] = useState(0);
  const [pattern, setPattern] = useState<number[]>([]);
  const [clickedCards, setClickedCards] = useState<number[]>([]);
  const [isPatternCorrect, setIsPatternCorrect] = useState<boolean>(true);
  const [highlightedCards, setHighlightedCards] = useState<number[]>([]);
  const [inputEnabled, setInputEnabled] = useState<boolean>(false);
  const highlightDuration = 2000;
  const [gridSize, setGridSize] = useState(3); // Initialize gridSize
  const router = useRouter();
  const title = "Visual Memory";

  const generateNextRandomNumber = (currentPattern: number[]) => {
    let newNumber;
    do {
      newNumber = Math.floor(Math.random() * gridSize ** 2); // Generate a number in range of the grid
    } while (currentPattern.includes(newNumber)); // Ensure we only generate unique numbers for the pattern
    return newNumber;
  };

  const generateRandomPattern = () => {
    let newPattern: number[] = [];
    while (newPattern.length < level + 3) {
      newPattern.push(generateNextRandomNumber(newPattern));
    }
    return newPattern;
  };

  const getGridSize = (level: number) => {
    return Math.floor(level / 3) + 3; // Increase grid size every 3 levels
  };

  useEffect(() => {
    setGridSize(getGridSize(level));
    setPattern(generateRandomPattern());
  }, [level]);

  useEffect(() => {
    // Highlight cards in the current sequence one by one
    const highlightPattern = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setHighlightedCards(pattern); // Highlight current cards
      await new Promise((resolve) => setTimeout(resolve, highlightDuration));
      setHighlightedCards([]); // Stop highlighting cards
      setInputEnabled(true);
    };

    if (pattern.length > 0) {
      highlightPattern();
    }
  }, [pattern]);

  const handleCardClick = (id: number) => {
    if (inputEnabled && !clickedCards.includes(id)) {
      setClickedCards([...clickedCards, id]);
    }
  };

  useEffect(() => {
    if (pattern.length > 0) {
      for (var i = 0; i < clickedCards.length; i++) {
        //Check if the clicked card is in the pattern
        if (!pattern.includes(clickedCards[i])) {
          setIsPatternCorrect(false);
          break;
        }
      }

      //Go to new level ...
      if (isPatternCorrect && clickedCards.length == pattern.length) {
        setInputEnabled(false);
        setLevel(level + 1);
        setClickedCards([]);
      }
    }
  }, [clickedCards]);

  useEffect(() => {
    if (!isPatternCorrect) {
      setInputEnabled(false);
      setIsPatternCorrect(true);
      setHighlightedCards([]);
      setClickedCards([]);
      setPattern([]);
      setLevel(0);
      router.replace(`/gameOver?title=${title}&level=${level}`);
    }
  }, [isPatternCorrect]);

  return (
    <View style={styles.container}>
      <PageTitle text={title} />
      <LevelIndicator level={level} />

      <View style={styles.gamePad}>
        {Array.from({ length: gridSize }, (_, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {Array.from({ length: gridSize }, (_, colIndex) => {
              const cardIndex = rowIndex * gridSize + colIndex; // Calculate unique index for each card
              return (
                <MemoryCard
                  key={cardIndex}
                  id={cardIndex}
                  isClicked={
                    clickedCards.includes(cardIndex) ||
                    highlightedCards.includes(cardIndex)
                  }
                  disable={!inputEnabled}
                  onClick={() => handleCardClick(cardIndex)}
                />
              );
            })}
          </View>
        ))}
      </View>

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