import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import NavigationButton from "../components/NavigationButton";
import { Colors, Fonts } from "../constants/Constants";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import PageTitle from "../components/PageTitle";
import { init } from '../localDB/DBHighscore';

SplashScreen.preventAutoHideAsync();

export default function MainMenu() {
  const [loaded, error] = useFonts({
    Jaro: require("../assets/fonts/Jaro.ttf"),
  });

  //Initiziale Db, (Creates it and new table if it doesnt exit)
  useEffect(() => {
    const setupDatabase = async () => {
      await init();
    };

    setupDatabase();
  }, []);

  //Show loading screen until fonts are loaded.
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
      <NavigationButton
        text="Sequence Memory"
        path="/sequence-memory"
        icon={require("../assets/GridMemory.png")}
      />
      <NavigationButton text="Number Memory" path="/number-memory" icon={require("../assets/NumberMemory.png")}/>
      <NavigationButton text="Verbal Memory" path="/verbal-memory" icon={require("../assets/VerbalMemory.png")}/>
      <NavigationButton text="Visual Memory" path="/visual-memory" icon={require("../assets/GridMemory.png")}/>
      <NavigationButton text="Highscores" path="/highscores" icon={require("../assets/HighScore.png")}/>
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
