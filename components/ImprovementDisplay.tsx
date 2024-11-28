/*



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
type ImprovementDisplayProps = {
  description: string;
  icon: ImageSourcePropType;
};

export default function ImprovementDisplay({
  description,
  icon,
}: ImprovementDisplayProps) {
  return (
    <>
      <View style={styles.spacer}>
        <View style={styles.container}>
          <View style={styles.improvementView}>
            <Text style={styles.description}>{description}</Text>
            <Image source={icon} style={styles.icon} resizeMode="contain" />
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minWidth: 250,
    flexDirection: "column",
    alignItems: "center",
  },
  spacer: {
    marginLeft: "8%",
    marginRight: "8%",
  },
  improvementView: {
    backgroundColor: Colors.buttonPrimary,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "black",
    width: "100%", // Ensure it takes up the full width of its container
    maxWidth: 400, // Prevents stretching beyond a maximum width
    flexWrap: "wrap", // Allow the text to wrap instead of overflowing
  },
  description: {
    color: Colors.lightText,
    fontSize: Fonts.sizes.large,
    fontFamily: Fonts.family.button,
    fontWeight: "bold",
    marginRight: 10, // To give space between the text and icon
    flexShrink: 1, // Allows text to shrink to avoid overflow
    flexBasis: "80%",
  },
  icon: {
    width: 50,
    height: 50,
    alignSelf: "center",
    marginTop: 4,
  },
});
