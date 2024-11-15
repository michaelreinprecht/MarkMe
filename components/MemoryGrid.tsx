/* MemoryGrid.tsx
Purpose: Component that renders a grid with a variable size of MemoryCard components, 
wether they are clicked or highlighted is determined by clickedCards and/or highlightedCards. 
The user can click on the cards if inputEnabled is true.
*/

import React from "react";
import { View, StyleSheet } from "react-native";
import MemoryCard from "./MemoryCard";

interface MemoryGridProps {
  clickedCards?: number[]; // Cards that are currently clicked
  highlightedCards: number[]; //Cards that are currently highlighted
  gridSize: number; // Number of cards in each row/column
  onCardClick: (id: number) => void;
  inputEnabled: boolean; // Whether the user can click on cards
}

export default function MemoryGrid({
  clickedCards,
  highlightedCards,
  gridSize,
  onCardClick,
  inputEnabled,
}: MemoryGridProps) {
  return (
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
                  clickedCards?.includes(cardIndex) ||
                  highlightedCards.includes(cardIndex)
                }
                disable={!inputEnabled}
                onClick={() => onCardClick(cardIndex)}
              />
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
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
});
