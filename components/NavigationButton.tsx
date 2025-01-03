/*

A component which utilizes the Expo Link in Combination with a TouchableOpacity to create a simple to use button for
navigation. The button can be customized with a text, icon, background color and path.

*/

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  Dimensions,
} from "react-native";
import { Link } from "expo-router";
import { Colors, Fonts } from "../constants/Constants";

// Define a type for the props
type NavigationButtonProps = {
  text: string; // Required text string for the button
  path: string; // Required URL string for navigation
  replace?: boolean; // Optional boolean to set replace mode
  icon?: ImageSourcePropType; // Optional image source for the icon
  backgroundColor?: string; // Optional color to override the default background color of the button
};

export default function NavigationButton({
  text,
  path,
  replace,
  icon,
  backgroundColor = Colors.buttonPrimary,
}: NavigationButtonProps) {
  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

  return (
    <View style={styles.buttonContainer}>
      {/* Link overrides style from Touchableopacity */}
      <Link
        href={path}
        asChild
        replace={replace}
        style={{
          backgroundColor: backgroundColor,
          justifyContent: icon ? "space-between" : "center",
          minHeight: screenHeight * 0.09,
        }}
      >
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>{text}</Text>
          {icon && <Image source={icon} style={styles.icon} />}
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: "80%",
  },
  button: {
    flexDirection: "row", // Allows icon and text to be side by side
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: Colors.buttonBorder,
    flexGrow: 1,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 8, // Adds space between icon and text
  },
  buttonText: {
    color: Colors.lightText,
    fontSize: Fonts.sizes.large,
    fontFamily: Fonts.family.button,
  },
});
