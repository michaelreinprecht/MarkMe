import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet} from "react-native";
import { Stack } from "expo-router";
import { Colors } from "../constants/Constants";
import MemoryCard from "../components/MemoryCard";
import LevelIndicator from "../components/LevelIndicator";
import PageTitle from "../components/PageTitle";

export default function SequenceMemory() {
  const [level, setLevel] = useState(0);
  const [sequence, setSequence] = useState<number[]>([]);
  const [clickedCards, setClickedCards] = useState<number[]>([]);
  const [isSequenceCorrect, setIsSequenceCorrect] = useState<boolean>(true);
  const [highlightedCards, setHighlightedCards] = useState<number[]>([]);
  const highlightDuration = 500;
  const [inputEnabled, setInputEnabled] = useState<boolean>(false);

  const generateNextRandomNumber = (lastNumber: number | undefined) => {
    let newNumber;
    do {
      newNumber = Math.floor(Math.random() * 9); // Generate a number between 0 and 8
    } while (newNumber === lastNumber); // Ensure it's not the same as the last number
    return newNumber;
  };

  useEffect(() => {
    setSequence((prevSequence) => {
      const lastNumber = prevSequence[prevSequence.length - 1];
      const newNumber = generateNextRandomNumber(lastNumber);
      return [...prevSequence, newNumber];
    });
  }, [level]);

  useEffect(() => {
    // Highlight cards in the current sequence one by one
    const highlightSequence = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      for (let i = 0; i < sequence.length; i++) {
        setHighlightedCards([sequence[i]]); // Highlight current card
        await new Promise(resolve => setTimeout(resolve, highlightDuration));
      }
      setHighlightedCards([]);
      setInputEnabled(true);
    };

    if (sequence.length > 0) {
      highlightSequence();
    }
  }, [sequence]);

  const handleCardClick = (id: number) => {
    if (inputEnabled)
    {
      setClickedCards([... clickedCards, id]);
    }
  };

  useEffect(() => {
    if (sequence.length > 0){    
      for (var i = 0; i < clickedCards.length; i++) {
        if (clickedCards[i] != sequence[i]){
          setIsSequenceCorrect(false);
          break;
        }
      }

      if (isSequenceCorrect && clickedCards.length == sequence.length){
        setInputEnabled(false);
        setLevel(level + 1); // Move to the next level
        setClickedCards([]); // Reset clicked cards for the next round
      }
  }
  }, [clickedCards])

  useEffect(() => {
    if (!isSequenceCorrect){
      setIsSequenceCorrect(true);
      setHighlightedCards([]);
      setClickedCards([]);
      setSequence([]);
      setInputEnabled(false);
      setLevel(0);
      alert("Game Over");
    }
  }, [isSequenceCorrect]);

  return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: "Sequence Memory" }} />
        <PageTitle text="Sequence Memory"/>
        <LevelIndicator level={level}/>

        <View style={styles.gamePad}>
          {Array.from({ length: 9 }, (_, i) => (
            <MemoryCard
              key={i}
              id={i}
              highlight={highlightedCards.includes(i)}
              highlightDuration={highlightDuration}
              disable={!inputEnabled}
              onClick={() => handleCardClick(i)}
            />
          ))}
        </View>

        {!inputEnabled && <Text>Please wait</Text>}
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      backgroundColor: Colors.background,
      flex: 1,
      alignItems: "center",
    },
    gamePad: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center", 
        marginBottom: 10,
        width: '90%'
      },
  });
  