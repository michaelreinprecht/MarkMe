import React, { useEffect, useState } from "react";
import { View, StyleSheet} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Colors } from "../constants/Constants";
import PageTitle from "../components/PageTitle";
import ReachedLevelIndicator from "../components/ReachedLevelIndicator";
import HighScoreDisplay from "../components/HighScoreDisplay";
import NavigationButton from "../components/NavigationButton";
import { getHighScore, saveHighScore } from "../localDB/DBHighscore";

export default function GameOver() {
    const { title, level } = useLocalSearchParams<{title: string; level: string}>();
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
    }, [])

    return (
        <View style={styles.container}>
          <PageTitle text={title}/>
          <ReachedLevelIndicator level={parseInt(level)}/>
  
          <HighScoreDisplay title="Current HighScore" score={currentHighScore} iconleft={require("../assets/Trophy.png")} iconRight={require("../assets/SequenceMemory.png")}/>
          
          <NavigationButton text="Try again" replace={true} path="/sequence-memory-game" backgroundColor={Colors.buttonStart}/>
          <NavigationButton text="Home Page" replace={true} path="/" backgroundColor={Colors.buttonStart}/>
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
  