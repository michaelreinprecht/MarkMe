import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Colors } from "../constants/Constants";
import PageTitle from "../components/PageTitle";
import ReachedLevelIndicator from "../components/ReachedLevelIndicator";
import HighScoreDisplay from "../components/HighScoreDisplay";
import NavigationButton from "../components/NavigationButton";
import { getHighScore, saveHighScore } from "../localDB/DBHighscore";

export default function GameOver() {
  const { title, level, tryAgainPath } = useLocalSearchParams<{
    title: string;
    level: string;
    tryAgainPath: string;
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

  return (
    <View style={styles.container}>
      <PageTitle text={title} />
      <ReachedLevelIndicator level={parseInt(level)} />

      <HighScoreDisplay
        title="Current HighScore"
        score={currentHighScore}
        iconRight={require("../assets/GridMemory.png")}
      />

      <NavigationButton
        text="Try again"
        replace={true}
        path={tryAgainPath}
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
  },
});
