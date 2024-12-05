/*

A gameover Page which can be used for every game in the App. Only need the title and the level which has been reached in the
game as parameters. The page will display the title, the reached level, the current highscore and two buttons to either 
try again or go back to the home page.

*/

import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Colors, Fonts, GameModes } from "../constants/Constants";
import PageTitle from "../components/PageTitle";
import ReachedLevelIndicator from "../components/ReachedLevelIndicator";
import HighScoreDisplay from "../components/HighScoreDisplay";
import NavigationButton from "../components/NavigationButton";
import { getHighScore, saveHighScore } from "../localDB/DBHighscore";

export default function GameOver() {
  const { title, level } = useLocalSearchParams<{
    title: string;
    level: string;
  }>();
  const [currentHighScore, setCurrentHighScore] = useState<number>(0);

  useEffect(() => {
    const interactWithDatabase = async () => {
      await saveHighScore(title, parseInt(level));

      const highScore = await getHighScore(title);

      if (highScore !== null) {
        setCurrentHighScore(highScore.score);
      }
    };

    interactWithDatabase();
  }, []);

  // Retrieve game mode data using the title
  const gameMode = GameModes[title];

  return (
    <View style={styles.container}>
      <PageTitle text={title} />
      <Text style={styles.description}>
        Oh no, it seems you've made a mistake. No matter! Try again and keep on
        improving!
      </Text>
      <ReachedLevelIndicator level={parseInt(level)} />

      <HighScoreDisplay
        title="Current HighScore"
        score={currentHighScore}
        iconRight={gameMode.icon}
      />

      <NavigationButton
        text="Try again"
        replace={true}
        path={gameMode.gamePath}
        backgroundColor={Colors.buttonSecondary}
      />
      <NavigationButton
        text="Home Page"
        replace={true}
        path="/"
        backgroundColor={Colors.buttonSecondary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    flexGrow: 1,
  },
  description: {
    fontSize: Fonts.sizes.medium,
    color: Colors.lightText,
    fontWeight: "bold",
    textAlign: "center",
    margin: 20,
  },
});
