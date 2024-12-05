/*

A component for displaying an improvement with an icon. Used in the main page screen to show the improvements the user has made 
inside of a carousel view. Should keep the user motivated to keep playing and improving.

*/

import React from "react";
import { View, Text, StyleSheet, Image, ImageSourcePropType } from "react-native";
import { Colors, Fonts } from "../constants/Constants";

type ImprovementDisplayProps = {
  description: string;
  icon: ImageSourcePropType;
};

export default function ImprovementDisplay({
  description,
  icon,
}: ImprovementDisplayProps) {
  return (
    <View style={styles.spacer}>
      <View style={styles.improvementView}>
        <Text style={styles.description}>{description}</Text>
        <Image source={icon} style={styles.icon} resizeMode="contain" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  spacer: {
    marginLeft: "8%",
    marginRight: "8%",
  },
  improvementView: {
    backgroundColor: Colors.buttonPrimary,
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "black",
    width: "100%",
    maxWidth: 400,
    minWidth: 250,
  },
  description: {
    flex: 1,
    color: Colors.lightText,
    fontSize: Fonts.sizes.large,
    fontFamily: Fonts.family.button,
    fontWeight: "bold",
    marginRight: 10,
    flexWrap: "wrap",
  },
  icon: {
    width: 40,
    height: 40,
    marginLeft: 5,
    flexShrink: 0,
  },
});
