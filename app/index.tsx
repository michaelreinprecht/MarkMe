import React from "react";
import { View, Text, StyleSheet } from "react-native";
import NavigationButton from "../components/NavigationButton";
import { Colors } from "../constants/Constants";

export default function MainMenu() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MarkMe</Text>
      <NavigationButton
        text="Sequence Memory"
        path="/sequence-memory"
        icon={require("../assets/icon.png")}
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
    fontSize: 32,
    marginBottom: 20,
    fontWeight: "bold",
  },
});
