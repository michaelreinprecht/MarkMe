import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Colors, GameModes } from "../constants/Constants";
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
});
