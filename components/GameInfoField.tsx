import React from "react";
import { StyleSheet, Text} from 'react-native';

// Define a type for the props
type GameInfoFieldProps = {
    text: string; //Display which level the user is on right now
  };

  export default function GameInfoField({
    text
  }: GameInfoFieldProps) {

    return (
        <Text style={styles.description}>{text}</Text>
    )
  }

  const styles = StyleSheet.create({
    description: {
        fontSize: 16,
        marginBottom: 20,
        fontWeight: "bold",
        margin: 20
      }
  });
  