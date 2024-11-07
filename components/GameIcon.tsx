import React from "react";
import { StyleSheet, Image, ImageSourcePropType } from "react-native";

// Define a type for the props
type GameIconProps = {
  icon: ImageSourcePropType; // image source for the icon
};

export default function GameIcon({ icon: icon }: GameIconProps) {
  return <Image source={icon} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: 250,
    height: 250,
  },
});
