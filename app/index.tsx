// MainMenu.tsx
import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import NavigationButton from "../components/NavigationButton";
import { Colors, GameModes } from "../constants/Constants";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import PageTitle from "../components/PageTitle";
import { init } from "../localDB/DBHighscore";
import ImprovementCarousel from "../components/ImprovementCarousel"; // Import the new carousel component

SplashScreen.preventAutoHideAsync();

export default function MainMenu() {
  const [loaded, error] = useFonts({
    Jaro: require("../assets/fonts/Jaro.ttf"),
  });

  // Initialize DB (creates it and new table if it doesn't exist)
  useEffect(() => {
    const setupDatabase = async () => {
      await init();
    };

    setupDatabase();
  }, []);

  // Show loading screen until fonts are loaded
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <View style={styles.container}>
      <PageTitle text="MarkMe" fontSize={70} />

      {/* Use the ImprovementCarousel component */}
      <ImprovementCarousel />

      {/* Dynamically render buttons using GameModes */}
      <View style={styles.buttonContainer}>
        {Object.entries(GameModes).map(([title, { startPath, icon }]) => (
          <NavigationButton
            key={title} // Unique key for each button
            text={title}
            path={startPath}
            icon={icon}
          />
        ))}

        {/* Add Highscores button */}
        <NavigationButton
          text="Highscores"
          path="/highscores"
          icon={require("../assets/HighScore.png")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "flex-start", // This ensures the content is aligned at the top
    alignItems: "center",
    paddingTop: 10, // Add a small amount of padding to the top if needed
  },
  buttonContainer: {
    marginTop: 20,
    flexGrow: 1, // Ensures the buttons take up remaining space
    justifyContent: "space-evenly", // Aligns buttons at the top of the remaining space
    width: "100%",
    alignItems: "center", // Keep buttons centered horizontally
  },
});
