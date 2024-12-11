/*

This page includes the actual implementation for the number memory game (including the game logic).
(This page flickers on the IOS device of one teammember for some reason, we're not sure why yet)

*/

import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Dimensions,
  Animated,
} from "react-native";
import { useRouter } from "expo-router";
import LevelIndicator from "../components/LevelIndicator";
import PageTitle from "../components/PageTitle";
import { Colors, Fonts } from "../constants/Constants";
import InstructionReminder from "../components/InstructionReminder";

export default function NumberMemoryGame() {
  const [level, setLevel] = useState(0);
  const [sequence, setSequence] = useState<string>("");
  const [userInput, setUserInput] = useState<string>("");
  const [isInputEnabled, setIsInputEnabled] = useState(false);
  const [displayNumber, setDisplayNumber] = useState(true);
  const inputRef = useRef<TextInput>(null);
  const progress = useRef(new Animated.Value(1)).current;
  const router = useRouter();
  const title = "Number Memory";

  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

  // Duration per digit 1000ms per digit
  const durationPerDigit = 1000;

  // Generate a random number sequence based on the level
  const generateRandomSequence = (length: number) => {
    let newSequence = "";
    for (let i = 0; i < length + 1; i++) {
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

    progress.setValue(1);
    Animated.timing(progress, {
      toValue: 0,
      duration: newSequence.length * durationPerDigit,
      useNativeDriver: false, 
    }).start();

    // Calculate display time based on sequence length
    const displayTime = newSequence.length * durationPerDigit;

    // Hide the number after the calculated display time
    const timer = setTimeout(() => {
      setDisplayNumber(false);
      setIsInputEnabled(true); // Enable input after the number disappears
    }, displayTime);

    return () => clearTimeout(timer);
  }, [level]);

  useEffect(() => {
    if (isInputEnabled) {
      inputRef.current?.focus(); // Programmatically focus the input field
    }
  }, [isInputEnabled]);

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

      <InstructionReminder 
        firstText="Enter the number"
        secondText={"Memorize the number: \n<b>"+ sequence}
        displayFirstText={!displayNumber}
        sequenceFontSize={50}
      />

    <View style={styles.progressBarContainer}>
        <Animated.View
          style={[
            styles.progressBar,
            {
              width: progress.interpolate({
                inputRange: [0, 1],
                outputRange: ["0%", "100%"],
              }),
            },
          ]}
        />
      </View>

      <View style={styles.gameArea}>     
        <TextInput
          ref={inputRef}
          style={styles.input}
          value={userInput}
          onChangeText={setUserInput}
          keyboardType="numeric"
          placeholder="Enter number"
          placeholderTextColor="gray"
          editable={isInputEnabled}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, { minHeight: screenHeight * 0.09 }]}
            onPressOut={handleSubmit}
            disabled={!isInputEnabled || userInput.length === 0}
          >
            <Text style={styles.buttonText}>Check</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  progressBarContainer: {
    height: 10,
    width: "80%",
    backgroundColor: Colors.lightText,
    borderRadius: 5,
    marginTop: 10,
    overflow: "hidden", 
  },
  progressBar: {
    height: "100%",
    backgroundColor: Colors.buttonSecondary,
  },
  gameArea: {
    alignItems: "center",
    marginTop: 20,
    width: "100%",
  },
  input: {
    borderColor: Colors.lightText,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    width: "80%",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    color: Colors.lightText,
  },
  buttonText: {
    color: Colors.lightText,
    fontSize: Fonts.sizes.large,
    fontFamily: Fonts.family.button,
  },
  buttonContainer: {
    gap: 10,
    width: "80%",
  },
  button: {
    backgroundColor: Colors.buttonSecondary,
    justifyContent: "center",
    flexDirection: "row", // Allows icon and text to be side by side
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: Colors.buttonBorder,
    flexGrow: 1,
  },
});
