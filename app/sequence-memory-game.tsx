import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet} from "react-native";
import { useRouter } from "expo-router";
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
  const [inputEnabled, setInputEnabled] = useState<boolean>(false);
  const highlightDuration = 500;
  const router = useRouter();
  const title = "Sequence Memory";

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

      if (isSequenceCorrect && clickedCards.length == sequence.length && clickedCards[0] == sequence[0]){
        setInputEnabled(false);
        setLevel(level + 1);
        setClickedCards([]);
      }
  }
  }, [clickedCards])

  useEffect(() => {
    if (!isSequenceCorrect){
      setInputEnabled(false);
      setIsSequenceCorrect(true);
      setHighlightedCards([]);
      setClickedCards([]);
      setSequence([]);
      setLevel(0);
      router.replace(`/gameOver?title=${title}&level=${level}`);
    }
  }, [isSequenceCorrect]);

  return (
      <View style={styles.container}>
        <PageTitle text={title}/>
        <LevelIndicator level={level}/>

        <View style={styles.gamePad}> 
          <MemoryCard
            key={0}
            id={0}
            highlight={highlightedCards.includes(0)}
            highlightDuration={highlightDuration}
            disable={!inputEnabled}
            onClick={() => handleCardClick(0)}
          />
          <MemoryCard
            key={1}
            id={1}
            highlight={highlightedCards.includes(1)}
            highlightDuration={highlightDuration}
            disable={!inputEnabled}
            onClick={() => handleCardClick(1)}
          />
          <MemoryCard
            key={2}
            id={2}
            highlight={highlightedCards.includes(2)}
            highlightDuration={highlightDuration}
            disable={!inputEnabled}
            onClick={() => handleCardClick(2)}
          />
        </View>
        <View style={styles.gamePad}> 
          <MemoryCard
            key={3}
            id={3}
            highlight={highlightedCards.includes(3)}
            highlightDuration={highlightDuration}
            disable={!inputEnabled}
            onClick={() => handleCardClick(3)}
          />
          <MemoryCard
            key={4}
            id={4}
            highlight={highlightedCards.includes(4)}
            highlightDuration={highlightDuration}
            disable={!inputEnabled}
            onClick={() => handleCardClick(4)}
          />
          <MemoryCard
            key={5}
            id={5}
            highlight={highlightedCards.includes(5)}
            highlightDuration={highlightDuration}
            disable={!inputEnabled}
            onClick={() => handleCardClick(5)}
          />
        </View>
        <View style={styles.gamePad}> 
          <MemoryCard
            key={6}
            id={6}
            highlight={highlightedCards.includes(6)}
            highlightDuration={highlightDuration}
            disable={!inputEnabled}
            onClick={() => handleCardClick(6)}
          />
          <MemoryCard
            key={7}
            id={7}
            highlight={highlightedCards.includes(7)}
            highlightDuration={highlightDuration}
            disable={!inputEnabled}
            onClick={() => handleCardClick(7)}
          />
          <MemoryCard
            key={8}
            id={8}
            highlight={highlightedCards.includes(8)}
            highlightDuration={highlightDuration}
            disable={!inputEnabled}
            onClick={() => handleCardClick(8)}
          />
        </View>

        {!inputEnabled && <Text>Please wait for the sequence to finish</Text>}
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
  