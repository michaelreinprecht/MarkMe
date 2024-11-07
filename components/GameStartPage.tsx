import React from "react";
import { View, StyleSheet, ImageSourcePropType } from "react-native";
import { Stack } from "expo-router";
import NavigationButton from "../components/NavigationButton";
import { Colors } from "../constants/Constants";
import PageTitle from "../components/PageTitle";
import GameIcon from "../components/GameIcon";
import GameInfoField from "../components/GameInfoField";

// Define a type for the props
type GameStartPageProps = {
  gametitle: string; // Required text string for the button
  icon: ImageSourcePropType; // Required URL string for navigation
  gameInfoText: string; // Required text string for the button
  gamePath: string; // Required URL string for navigation
};

export default function GameStartPage({
  gametitle,
  icon,
  gameInfoText,
  gamePath,
}: GameStartPageProps) {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Home" }} />

      {/* Wrapping all elements in a centered view */}
      <View style={styles.content}>
        <PageTitle text={gametitle} />
        <GameIcon icon={icon} />
        <GameInfoField text={gameInfoText} />

        <NavigationButton
          text="Start"
          replace={true}
          path={gamePath}
          backgroundColor={Colors.buttonStart}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center", // Center horizontally
    justifyContent: "center", // Center vertically
  },
  content: {
    alignItems: "center", // Center content horizontally
    justifyContent: "space-evenly", // Spread out the elements vertically
    gap: 20, // Gap between elements (available in React Native 0.71+)
    paddingVertical: 40, // Additional padding around content
  },
});
