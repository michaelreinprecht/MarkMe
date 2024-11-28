/*

This page includes the actual implementation for the number memory game (including the game logic).

*/

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import LevelIndicator from "../components/LevelIndicator";
import PageTitle from "../components/PageTitle";
import { Colors } from "../constants/Constants";

export default function NumberMemory() {
  const [level, setLevel] = useState(1);
  const [sequence, setSequence] = useState<string>("");
  const [userInput, setUserInput] = useState<string>("");
  const [isInputEnabled, setIsInputEnabled] = useState(false);
  const [displayNumber, setDisplayNumber] = useState(true);
  const router = useRouter();
  const title = "Number Memory";

  // Duration per digit 1000ms per digit
  const durationPerDigit = 1000;

  // Generate a random number sequence based on the level
  const generateRandomSequence = (length: number) => {
    let newSequence = "";
    for (let i = 0; i < length; i++) {
      newSequence += Math.floor(Math.random() * 10); // Random digit between 0-9
    }
    return newSequence;
  };

  // Update the sequence whenever the level changes
  useEffect(() => {
    const newSequence = generateRandomSequence(level);
    setSequence(newSequence);
    setDisplayNumber(true); // Show the number initially
    setIsInputEnabled(false);

    // Calculate display time based on sequence length
    const displayTime = newSequence.length * durationPerDigit;

    // Hide the number after the calculated display time
    const timer = setTimeout(() => {
      setDisplayNumber(false);
      setIsInputEnabled(true); // Enable input after the number disappears
    }, displayTime);

    return () => clearTimeout(timer);
  }, [level]);

  const handleSubmit = () => {
    if (userInput === sequence) {
      // Correct input: proceed to the next level
      setUserInput("");
      setLevel(level + 1);
    } else {
      // Incorrect input: navigate to the Game Over screen
      router.replace(`/gameOver?title=${title}&level=${level}`);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <PageTitle text={title} />
      <LevelIndicator level={level} />

      <View style={styles.gameArea}>
        {displayNumber ? (
          <Text style={styles.numberDisplay}>{sequence}</Text>
        ) : (
          <Text style={styles.infoText}>Enter the number</Text>
        )}

        <TextInput
          style={styles.input}
          value={userInput}
          onChangeText={setUserInput}
          keyboardType="numeric"
          placeholder="Enter number"
          placeholderTextColor="gray"
          editable={isInputEnabled}
        />

        <Button
          title="Submit"
          onPress={handleSubmit}
          disabled={!isInputEnabled || userInput.length === 0}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
    alignItems: "center",
  },
  gameArea: {
    alignItems: "center",
    marginTop: 20,
  },
  numberDisplay: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white", // Changed to white
    marginBottom: 20,
  },
  infoText: {
    color: Colors.lightText, // Changed to white
    marginBottom: 20,
  },
  input: {
    borderColor: "white", // Changed to white
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    width: "80%",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    color: "white", // Changed to white
  },
});
