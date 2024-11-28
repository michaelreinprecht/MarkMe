/*

Component used for displaying the GameIcon in the GameStart Page.

*/

import React from "react";
import { Image, ImageSourcePropType } from "react-native";

type GameIconProps = {
  icon: ImageSourcePropType; // image source for the icon
};

export default function GameIcon({ icon: icon }: GameIconProps) {
  return (
    <Image
      source={icon}
      style={{ objectFit: "scale-down", width: "100%", height: "100%" }}
    />
  );
}
