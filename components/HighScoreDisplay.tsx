/*

A component for displaying a singular highscore. This component is used in the HighscoreScreen.tsx.
Needs the following properties:
- title: The title of the highscore
- score: The score of the highscore
- iconleft: The icon on the left side of the score
- iconRight: The icon on the right side of the score

*/

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from "react-native";
import { Colors, Fonts } from "../constants/Constants";

// Define a type for the props
type HighScoreDisplayProps = {
  title: string;
  score: number;
  iconleft?: ImageSourcePropType;
  iconRight: ImageSourcePropType;
};

export default function HighScoreDisplay({
  title,
  score,
  iconleft = require("../assets/Trophy.png"),
  iconRight,
}: HighScoreDisplayProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.scoreView}>
        {iconleft && <Image source={iconleft} style={styles.icon} />}
        <Text style={styles.score}>{score}</Text>
        {iconRight && <Image source={iconRight} style={styles.icon} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    minWidth: 250,
    marginVertical: 10,
    flexDirection: "column",
    alignItems: "center",
  },
  scoreView: {
    backgroundColor: Colors.buttonPrimary,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "black",
    width: "100%",
  },
  title: {
    fontSize: Fonts.sizes.large,
    fontFamily: Fonts.family.title,
    color: Colors.lightText,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 5,
  },
  icon: {
    width: 40,
    height: 40,
    margin: 4,
  },
  score: {
    color: Colors.lightText,
    fontSize: Fonts.sizes.large,
    fontFamily: Fonts.family.button,
    fontWeight: "bold",
  },
});
