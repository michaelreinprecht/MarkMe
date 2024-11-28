/*

This page includes the actual implementation for the number memory game (including the game logic).
(This page flickers on the IOS device of one teammember for some reason, we're not sure why yet)

*/

import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "../constants/Constants";

// Import the JSON file
import wordsJson from "../assets/words.json";

const VerbalMemoryGame: React.FC = () => {
  const [words, setWords] = useState<string[]>([]);
  const [currentWord, setCurrentWord] = useState<string>("");
  const [seenWords, setSeenWords] = useState<Set<string>>(new Set());
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const router = useRouter();
  const title = "Verbal Memory";

  useEffect(() => {
    // Access the array from the JSON and set it in state
    const loadedWords = wordsJson.words; // Assuming JSON structure: { "words": ["word1", "word2", ...] }
    setWords(loadedWords);
    setCurrentWord(loadedWords[Math.floor(Math.random() * loadedWords.length)]);
  }, []);

  const handleSeen = () => {
    if (seenWords.has(currentWord)) {
      setScore(score + 1);
    } else {
      endGame();
    }
    nextWord();
  };

  const handleNew = () => {
    if (!seenWords.has(currentWord)) {
      setScore(score + 1);
      setSeenWords((prev) => new Set([...prev, currentWord]));
    } else {
      endGame();
    }
    nextWord();
  };

  const nextWord = () => {
    const next = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(next);
  };

  const endGame = () => {
    if (score > highScore) {
      setHighScore(score);
    }
    router.replace(`/gameOver?title=${title}&level=${score}`);
    resetGame();
  };

  const resetGame = () => {
    setScore(0);
    setSeenWords(new Set());
    setCurrentWord(words[Math.floor(Math.random() * words.length)]);
  };

  return (
    <View style={styles.container}>
      {/* Centered Header */}
      <Text style={styles.header}>{title}</Text>

      {/* Score Display */}
      <Text style={styles.level}>Level {score}</Text>

      {/* Word Display */}
      <Text style={styles.word}>{currentWord}</Text>

      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPressOut={handleSeen}>
          <Text style={styles.buttonText}>Seen</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPressOut={handleNew}>
          <Text style={styles.buttonText}>New</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
    position: "absolute",
    top: 40,
    width: "100%",
  },
  level: {
    fontSize: 18,
    color: "#dcdde1",
    position: "absolute",
    top: 80,
    width: "100%",
    textAlign: "center",
  },
  word: {
    fontSize: 36,
    color: "#ffffff",
    fontWeight: "bold",
    marginVertical: 20,
    textAlign: "center",
    justifyContent: "center",
  },
  buttonsContainer: {
    width: "80%",
  },
  button: {
    backgroundColor: "#02128D",
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
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});

export default VerbalMemoryGame;
