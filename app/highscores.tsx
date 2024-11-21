import { View, Text, StyleSheet, FlatList } from "react-native";
import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { Colors } from "../constants/Constants";
import { getAllHighScores, HighScore } from "../localDB/DBHighscore";
import HighScoreDisplay from "../components/HighScoreDisplay";

export default function HighscorePage() {
  const [highScores, setHighScores] = useState<HighScore[]>([]);

  useEffect(() => {
    const fetchHighScores = async () => {
      const scores = await getAllHighScores();
      setHighScores(scores);
    };

    fetchHighScores();
  }, []);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Highscores" }} />
      <Text>Highscores</Text>
      <HighScoreDisplay
        title={highScores[0].mode}
        score={highScores[0]?.score}
        iconleft={require("../assets/Trophy.png")}
        iconRight={require("../assets/GridMemory.png")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
