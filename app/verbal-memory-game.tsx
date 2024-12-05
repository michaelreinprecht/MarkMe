/*

This page includes the actual implementation for the verbal memory game (including the game logic).
(This page flickers on the IOS device of one teammember for some reason, we're not sure why yet)

*/

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { Colors, Fonts } from "../constants/Constants";

// Import the JSON file
import wordsJson from "../assets/words.json";
import PageTitle from "../components/PageTitle";
import LevelIndicator from "../components/LevelIndicator";

const VerbalMemoryGame: React.FC = () => {
  const [words, setWords] = useState<string[]>([]);
  const [currentWord, setCurrentWord] = useState<string>("");
  const [seenWords, setSeenWords] = useState<Set<string>>(new Set());
  const [level, setLevel] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const router = useRouter();
  const title = "Verbal Memory";

  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

  useEffect(() => {
    // Access the array from the JSON and set it in state
    const loadedWords = wordsJson.words; // Assuming JSON structure: { "words": ["word1", "word2", ...] }
    setWords(loadedWords);
    setCurrentWord(loadedWords[Math.floor(Math.random() * loadedWords.length)]);
  }, []);

  const handleSeen = () => {
    if (seenWords.has(currentWord)) {
      setLevel(level + 1);
    } else {
      endGame();
    }
    nextWord();
  };

  const handleNew = () => {
    if (!seenWords.has(currentWord)) {
      setLevel(level + 1);
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
    if (level > highScore) {
      setHighScore(level);
    }
    router.replace(`/gameOver?title=${title}&level=${level}`);
    resetGame();
  };

  const resetGame = () => {
    setLevel(0);
    setSeenWords(new Set());
    setCurrentWord(words[Math.floor(Math.random() * words.length)]);
  };

  return (
    <View style={styles.container}>
      <PageTitle text={title} />
      <LevelIndicator level={level} />

      <Text style={styles.word}>{currentWord}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { minHeight: screenHeight * 0.09 }]}
          onPressOut={handleSeen}
        >
          <Text style={styles.buttonText}>Seen</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { minHeight: screenHeight * 0.09 }]}
          onPressOut={handleNew}
        >
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
    gap: 10,
  },
  word: {
    fontSize: 36,
    color: Colors.lightText,
    fontWeight: "bold",
    marginVertical: 20,
    textAlign: "center",
    justifyContent: "center",
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

export default VerbalMemoryGame;
