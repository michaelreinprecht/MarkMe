/*

A component for indicating the current level of the game. Can be reused in different games.

*/

import React from "react";
import { StyleSheet, Text } from "react-native";
import { Colors, Fonts } from "../constants/Constants";

type LevelIndicatorProps = {
  level: number;
};

export default function LevelIndicator({ level }: LevelIndicatorProps) {
  return <Text style={styles.levelDisplay}>Level {level}</Text>;
}

const styles = StyleSheet.create({
  levelDisplay: {
    fontSize: Fonts.sizes.medium,
    color: Colors.lightText,
    marginBottom: 20,
    fontWeight: "bold",
  },
});
