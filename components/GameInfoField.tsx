/*

Component used for displaying the GameInfoField in the GameStart Page.

*/

import React from "react";
import { StyleSheet, Text } from "react-native";
import { Colors, Fonts } from "../constants/Constants";

// Define a type for the props
type GameInfoFieldProps = {
  text: string; //Display which level the user is on right now
};

export default function GameInfoField({ text }: GameInfoFieldProps) {
  return <Text style={styles.description}>{text}</Text>;
}

const styles = StyleSheet.create({
  description: {
    fontSize: Fonts.sizes.medium,
    color: Colors.lightText,
    fontWeight: "bold",
    margin: 20,
  },
});
