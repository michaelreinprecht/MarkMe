import React from "react";
import { StyleSheet, Image, ImageSourcePropType,} from 'react-native';

// Define a type for the props
type GameIconProps = {
    path: ImageSourcePropType; // image source for the icon
  };

  export default function GameIcon({
    path
  }: GameIconProps) {

    return (
        <Image source={path} style={styles.image}/>
    )
  }

  const styles = StyleSheet.create({
    image: {
        width: 250,
        height: 250,
    }
  });
  