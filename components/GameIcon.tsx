import React from "react";
import {
  StyleSheet,
  Image,
  ImageSourcePropType,
  Dimensions,
} from "react-native";

// Define a type for the props
type GameIconProps = {
  icon: ImageSourcePropType; // image source for the icon
};

export default function GameIcon({ icon: icon }: GameIconProps) {
  //const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

  return (
    <Image
      source={icon}
      style={{ objectFit: "scale-down", width: "100%", height: "100%" }}
    />
  );
}
