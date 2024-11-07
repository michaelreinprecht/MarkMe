import React from "react";
import { View, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import NavigationButton from "../components/NavigationButton";
import { Colors } from "../constants/Constants";
import PageTitle from "../components/PageTitle";
import GameIcon from "../components/GameIcon";
import GameInfoField from "../components/GameInfoField";
import GameStartPage from "../components/GameStartPage";

export default function SequenceMemory() {
  return (
    <>
      <GameStartPage
        gametitle="Sequence Memory"
        icon={require("../assets/SequenceMemory.png")}
        gameInfoText="Memorize the order in which the buttons light up, then press them sequentially.
                            The length of the pattern increases with each completion.
                            The test is over if you make a mistake."
        gamePath="/sequence-memory-game"
      />
      {/* <View style={styles.container}>
        <Stack.Screen options={{ title: "Sequence Memory" }} />
        <PageTitle text="Sequence Memory" />
        <GameIcon icon={require("../assets/SequenceMemory.png")} />
        <GameInfoField
          text="Memorize the order in which the buttons light up, then press them sequentially.
                            The length of the pattern increases with each completion.
                            The test is over if you make a mistake."
        />

        <NavigationButton
          text="Start"
          replace={true}
          path="/sequence-memory-game"
          backgroundColor={Colors.buttonStart}
        />
      </View> */}
    </>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: Colors.background,
//     flex: 1,
//     alignItems: "center",
//   },
// });
