import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import NavigationButton from "../components/NavigationButton";
import { Colors, GameModes } from "../constants/Constants";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import PageTitle from "../components/PageTitle";
import { init } from "../localDB/DBHighscore";

SplashScreen.preventAutoHideAsync();

export default function MainMenu() {
  const [loaded, error] = useFonts({
    // Load fonts
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

      {/* Dynamically render buttons using GameModes */}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
  },
});
