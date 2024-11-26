// ImprovementCarousel.tsx
import React from "react";
import { StyleSheet } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import ImprovementDisplay from "./ImprovementDisplay";
import { GameModes } from "../constants/Constants";

// Define PlayerImprovement type for the data
type PlayerImprovement = {
  mode: string;
  description: string;
};

// Mock Highscore Data
const mockHighScores: PlayerImprovement[] = [
  { mode: "Visual Memory", description: "Average increased from 8.3 to 8.7!" },
  {
    mode: "Verbal Memory",
    description: "5 Day Streak reached, keep improving!",
  },
  { mode: "Visual Memory", description: "New Highscore, reached level 9!" },
  {
    mode: "Number Memory",
    description: "Average increased from 25.6 to 26.1!",
  },
  {
    mode: "Sequence Memory",
    description: "3 Day Streak reached, keep improving!",
  },
];

// Create your renderItem function (for the carousel)
const renderItem = ({ item }: { item: PlayerImprovement }) => (
  <ImprovementDisplay
    description={item.description}
    icon={GameModes[item.mode].icon}
  />
);

export default function ImprovementCarousel() {
  return (
    <Carousel
      autoPlayInterval={2000}
      data={mockHighScores}
      height={100}
      loop={true}
      pagingEnabled={true}
      snapEnabled={true}
      width={430}
      style={{
        width: 430,
      }}
      mode="parallax"
      modeConfig={{
        parallaxScrollingScale: 0.9,
        parallaxScrollingOffset: 80,
      }}
      renderItem={renderItem}
    />
  );
}
