import React from "react";
import { StyleSheet, View, Image, Dimensions } from "react-native";
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

const { width: screenWidth } = Dimensions.get("window");

// Create your renderItem function (for the carousel)
const renderItem = ({ item }: { item: PlayerImprovement }) => (
  <ImprovementDisplay
    description={item.description}
    icon={GameModes[item.mode].icon}
  />
);

export default function ImprovementCarousel() {
  return (
    <View style={styles.container}>
      {/* Left vignette image */}
      <Image
        source={require("../assets/PullEffectLeft.png")}
        style={styles.leftImage}
      />

      {/* Right vignette image */}
      <Image
        source={require("../assets/PullEffectRight.png")}
        style={styles.rightImage}
      />

      {/* Carousel in the background */}
      <Carousel
        autoPlayInterval={2000}
        data={mockHighScores}
        height={100}
        loop={true}
        pagingEnabled={true}
        snapEnabled={true}
        width={screenWidth}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 90, // Slightly larger than carousel height to allow room for images
    position: "relative", // Enable absolute positioning within this container
    justifyContent: "center",
    alignItems: "center",
  },
  leftImage: {
    position: "absolute",
    left: 0, // Align to the left edge
    top: 0, // Align to the top edge of the container
    height: 90,
    opacity: 0.5, // Set a lower opacity for the vignette effect
    width: 20, // Set a fixed width for the vignette effect
    resizeMode: "stretch", // Ensure it scales correctly
  },
  rightImage: {
    position: "absolute",
    right: 0, // Align to the right edge
    top: 0, // Align to the top edge of the container
    height: 90,
    opacity: 0.5, // Set a lower opacity for the vignette effect
    width: 20, // Set a fixed width for the vignette effect
    resizeMode: "stretch", // Ensure it scales correctly
  },
});
