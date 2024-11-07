import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import NavigationButton from "../components/NavigationButton";
import { Colors, Fonts } from "../constants/Constants";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import PageTitle from "../components/PageTitle";

SplashScreen.preventAutoHideAsync();

export default function MainMenu() {
  const [loaded, error] = useFonts({
    Jaro: require("../assets/fonts/Jaro.ttf"),
  });

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
        icon={require("../assets/SequenceMemory.png")}
      />
      <NavigationButton text="Number Memory" path="/number-memory" />
      <NavigationButton text="Verbal Memory" path="/verbal-memory" />
      <NavigationButton text="Visual Memory" path="/visual-memory" />
      <NavigationButton text="Highscores" path="/highscores" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 60,
    marginBottom: 20,
    fontFamily: Fonts.family.title,
  },
});
