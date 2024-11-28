/*

A reusable Start-Game-Page for different games in the App.
Needs the following properties:
- gametitle: The title of the game
- icon: The icon of the game
- gameInfoText: The information text of the game
- gamePath: The path to the page with the actual game

*/

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
  gametitle: string;
  icon: ImageSourcePropType;
  gameInfoText: string;
  gamePath: string;
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
      <View style={styles.content}>
        <View style={{ flex: 2.5 }}>
          <PageTitle text={gametitle} />
        </View>

        <View style={{ flex: 5, width: "80%", alignItems: "center" }}>
          <GameIcon icon={icon} />
        </View>

        <View style={{ flex: 2.5 }}>
          <GameInfoField text={gameInfoText} />
        </View>

        <View
          style={{
            flex: 2,
            width: "100%",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <NavigationButton
            text="Start"
            replace={true}
            path={gamePath}
            backgroundColor={Colors.buttonSecondary}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});
