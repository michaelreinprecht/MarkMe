/*

This page includes the actual implementation for the number memory game (including the game logic).
(This page flickers on the IOS device of one teammember for some reason, we're not sure why yet)

*/

import React, { useState, useEffect } from "react";
import {View,Text,StyleSheet,TextInput,Button,KeyboardAvoidingView,Platform, TouchableOpacity} from "react-native";
import { useRouter } from "expo-router";
import LevelIndicator from "../components/LevelIndicator";
import PageTitle from "../components/PageTitle";
import { Colors, Fonts } from "../constants/Constants";

export default function NumberMemory() {
  const [level, setLevel] = useState(0);
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
        <Text style={styles.info}>{displayNumber ? sequence : "Enter the number"}</Text>
        
        <TextInput
          style={styles.input}
          value={userInput}
          onChangeText={setUserInput}
          keyboardType="numeric"
          placeholder="Enter number"
          placeholderTextColor="gray"
          editable={isInputEnabled}
        />

        <TouchableOpacity style={styles.button} onPressOut={handleSubmit}  disabled={!isInputEnabled || userInput.length === 0}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
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
    gameArea: {
        alignItems: "center",
        marginTop: 20,
        width: "100%"
    },
    info: {
      color: Colors.lightText,
      fontSize: Fonts.sizes.medium,
      minHeight: 20,
      marginBottom: 10,
      textAlign: "center",
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
    button: {
      backgroundColor: Colors.buttonTertiary,
      paddingVertical: 14,
      paddingHorizontal: 24,
      borderRadius: 10,
      marginBottom: 16,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.15,
      shadowRadius: 5,
      elevation: 4,
      width: "80%"
    },
    buttonText: {
      color: Colors.lightText,
      fontSize: 18,
      fontWeight: "600",
      textTransform: "uppercase",
      letterSpacing: 1,
    },
});