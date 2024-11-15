import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Colors } from "../constants/Constants";

type MemoryCardProps = {
  id: number;
  color?: string;
  isPressedColor?: string;
  disable?: boolean;
  isClicked?: boolean;
  onClick: (id: number) => void;
};

export default function MemoryCard({
  id,
  color = Colors.buttonPrimary,
  isPressedColor = Colors.buttonLight,
  disable = false,
  isClicked = false,
  onClick,
}: MemoryCardProps) {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    if (!disable) {
      setIsPressed(true);
      onClick(id);
    }
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: isPressed || isClicked ? isPressedColor : color,
          },
        ]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      />
    </View>
  );
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
    minWidth: 75,
  },
});
