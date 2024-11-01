import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";
import { Link } from "expo-router";
import { Colors, Fonts } from "../constants/Constants";

// Define a type for the props
type NavigationButtonProps = {
  text: string; // Required text string for the button
  path: string; // Required URL string for navigation
  replace?: boolean; // Optional boolean to set replace mode
  icon?: ImageSourcePropType; // Optional image source for the icon
};

export default function NavigationButton({
  text,
  path,
  replace,
  icon,
}: NavigationButtonProps) {
  return (
    <View style={styles.buttonContainer}>
      <Link href={path} asChild replace={replace}>
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
    marginVertical: 10,
  },
  button: {
    flexDirection: "row", // Allows icon and text to be side by side
    justifyContent: "space-between", // Adds space between icon and text
    alignItems: "center",
    backgroundColor: Colors.buttonSecondary,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: Colors.buttonBorder,
    minHeight: 50,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 8, // Adds space between icon and text
  },
  buttonText: {
    color: Colors.lightText,
    fontSize: Fonts.sizes.large,
    fontFamily: Fonts.family.regular,
    fontWeight: "bold",
  },
});
