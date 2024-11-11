import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity} from 'react-native';
import { Colors } from "../constants/Constants";

// Define a type for the props
type MemoryCardProps = {
    id: number; // Unique identifier for the button
    highlight: boolean; // If set to true the button is beeing highlited for a set duration of time (highlightDuration). Use this to tell the user which button should be clicked ect...
    highlightDuration?: number; // Optional number to set how long it should be highlighted when (hightlight) is set to true from outside => uses the isPressedColor.
    color?: string; // Optional color to override the default background color of the button
    isPressedColor?: string; // Optional color to override the default color when button is beeing clicked
    disable?: boolean; //The users clicks wont be registered but the button can still be highlighted with (highlight)
    maintainClicked?: boolean; //Optional if this button is clicked, it will stay as clicked and cant be changed
    resetClicked?: boolean; // If true, programmatically resets the clicked state. Only use this if maintainClicked is true.
    onClick: (id: number) => void; // Callback function that returns `id` when clicked. Use this to check if the button click was valid.
  };

export default function MemoryCard({
  id,
  highlight,
  highlightDuration = 200,
  color = Colors.buttonPrimary,
  isPressedColor = Colors.buttonLight,
  disable = false,
  maintainClicked = false,
  resetClicked = false,
  onClick
}: MemoryCardProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handlePressIn = () => {
    if (!disable){
      setIsPressed(true); 

      if (!isClicked){
        onClick(id);
        setIsClicked(true);
      }
  }
  };

  const handlePressOut = () => {
      setIsPressed(false);
      if (!maintainClicked) {
        setTimeout(() => setIsClicked(false), 200);
      }
  };

  // Programmatically highlight when highlightExternally changes to true
  useEffect(() => {
    if (highlight) {
      setIsPressed(true);
      const timer = setTimeout(() => setIsPressed(false), highlightDuration);
      return () => clearTimeout(timer);
    }
  }, [highlight, highlightDuration]);

   // Reset clicked state if resetClicked is true
  useEffect(() => {
    if (resetClicked && maintainClicked) {
      setIsClicked(false);
    }
  }, [resetClicked, maintainClicked]);

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={[styles.button, { backgroundColor: isPressed ? isPressedColor : isClicked ? isPressedColor : color }]}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              activeOpacity={1}>
      </TouchableOpacity>
    </View>
    )
}

const styles = StyleSheet.create({
  buttonContainer: {
    margin: 5,
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: Colors.buttonBorder,
    minHeight: 75,
    minWidth: 75
  },
});
