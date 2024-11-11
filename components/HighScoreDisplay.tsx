import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";
import { Colors, Fonts } from "../constants/Constants";

// Define a type for the props
type HighScoreDisplayProps = {
    title: string;
    score: number;
    iconleft: ImageSourcePropType;
    iconRight: ImageSourcePropType;
};

export default function NavigationButton({
    title,
    score,
    iconleft,
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
  )
}

const styles = StyleSheet.create({
  container: {
    width: "80%",
    marginVertical: 10,
    display: "flex",
    flexDirection: "column",
  },
  scoreView: {
    backgroundColor: Colors.buttonPrimary,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
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
