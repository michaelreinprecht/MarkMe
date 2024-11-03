import React from "react";
import { View, Text, StyleSheet, Image} from "react-native";
import { Stack } from "expo-router";
import NavigationButton from "../components/NavigationButton";
import { Colors } from "../constants/Constants";
import LevelIndicator from "../components/LevelIndicator";
import PageTitle from "../components/PageTitle";
import GameIcon from "../components/GameIcon";
import GameInfoField from "../components/GameInfoField";

export default function SequenceMemory() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Sequence Memory" }} />
      <PageTitle text="Sequence Memory"/>
      <LevelIndicator level={0}/>

      <GameIcon path={require("../assets/SequenceMemory.png")}/>

      <GameInfoField text="Memorize the order in which the buttons light up, then press them sequentially.
                           The length of the pattern increases with each completion.
                           The test is over if you make a mistake."/>
      
      <NavigationButton text="Start" replace={true} path="/sequence-memory-game"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
    alignItems: "center",
  }
});
