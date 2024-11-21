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
    <View style={styles.container}>
      <View style={styles.improvementView}>
        <Text style={styles.description}>{description}</Text>
        <Image source={icon} style={styles.icon} resizeMode="contain" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%", // Use a percentage to make sure the width adapts to the parent
    minWidth: 250, // Optional: Ensures a minimum width
    flexDirection: "column",
    alignItems: "center", // This centers the content inside the container
  },
  improvementView: {
    backgroundColor: Colors.buttonPrimary,
    flexDirection: "row",
    justifyContent: "flex-start", // Align items starting from the left
    alignItems: "flex-start", // Align the items to the start
    padding: 20,
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
    flexBasis: "80%", // Ensures the text takes up more space before the icon
  },
  icon: {
    width: 50, // Fixed size for icon
    height: 50, // Fixed size for icon
    alignSelf: "center", // Keeps the icon aligned with the start of the text
    marginTop: 4, // Optional: Adds a little space between the icon and text
  },
});
