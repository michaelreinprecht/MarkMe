/*

This is the main menu of the app. It displays the app title, a carousel of improvement notifications, and buttons to navigate
 to the different game modes and highscores. The main menu is the first screen the user sees when they open the app.

*/

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
      <View style={{ flex: 2 }}>
        <PageTitle text="MarkMe" fontSize={70} />
      </View>

      {/* Use the ImprovementCarousel component */}
      <View style={{ flex: 2 }}>
        <ImprovementCarousel />
      </View>

      {/* Dynamically render buttons using GameModes */}
      <View style={styles.gameButtons}>
        {Object.entries(GameModes).map(([title, { startPath, icon }]) => (
          <NavigationButton
            key={title} // Unique key for each button
            text={title}
            path={startPath}
            icon={icon}
          />
        ))}
      </View>

      {/* Add Highscores button */}
      <View
        style={{
          flex: 2.5,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
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
    gap: 10,
  },
  gameButtons: {
    flex: 8,
    gap: 10,
    width: "100%",
    alignItems: "center", // Keep buttons centered horizontally
    justifyContent: "space-evenly", // Keep buttons centered vertically
  },
});
