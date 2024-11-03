import React from "react";
import { StyleSheet, Text} from 'react-native';

// Define a type for the props
type LevelIndicatorProps = {
    level: number; //Display which level the user is on right now
  };

  export default function LevelIndicator({
    level
  }: LevelIndicatorProps) {

    return (
        <Text style={styles.levelDisplay}>Level {level}</Text>
    )
  }

  const styles = StyleSheet.create({
    levelDisplay: {
      fontSize: 16,
      marginBottom: 20,
      fontWeight: "bold"
    }
  });
  