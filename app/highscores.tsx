/*

This file contains the HighscorePage component which displays the high scores for each game mode. 
The high scores are fetched from the local database and displayed in a FlatList. The FlatList is used to
 display each high score in a HighScoreDisplay component. The HighScoreDisplay component displays the high 
 score for a game mode along with an icon from the GameModes constant.

*/

import { View, StyleSheet, FlatList } from "react-native";
import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { Colors, GameModes } from "../constants/Constants";
import { getAllHighScores, HighScore } from "../localDB/DBHighscore";
import HighScoreDisplay from "../components/HighScoreDisplay";
import PageTitle from "../components/PageTitle";

export default function Highscores() {
  const [highScores, setHighScores] = useState<HighScore[]>([]);

  useEffect(() => {
    const fetchHighScores = async () => {
      const scores = await getAllHighScores();

      // Sort high scores to match GameModes order
      const sortedScores: HighScore[] = Object.keys(GameModes).map((mode) => {
        const scoreForMode = scores.find((score) => score.mode === mode);
        // Provide default values for missing scores
        return (
          scoreForMode || {
            id: 0, // Default ID
            mode,
            score: 0, // Default score
            date: new Date().toISOString(), // Default to current date
            isHighScore: false, // Default value
          }
        );
      });

      setHighScores(sortedScores);
    };

    fetchHighScores();
  }, []);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Highscores" }} />
      <PageTitle text="Highscores" />

      <FlatList
        data={highScores}
        keyExtractor={(item) => item.mode}
        contentContainerStyle={styles.flatListContainer} // Ensure the items are centered
        renderItem={({ item }) => {
          const gameMode = GameModes[item.mode]; // Get corresponding GameMode data
          return (
            <HighScoreDisplay
              title={item.mode}
              score={item.score}
              iconRight={gameMode?.icon} // Use the icon from GameModes
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 16,
    justifyContent: "flex-start", // Aligns content at the top for FlatList
    alignItems: "center", // Centers the content horizontally
  },
  flatListContainer: {
    width: "100%", // Full width for the container
    alignItems: "center", // Center the items horizontally
    paddingBottom: 20, // Optional: Adds space below the list for padding
  },
});
