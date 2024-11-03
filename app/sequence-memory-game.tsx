import React from "react";
import { View, Text, StyleSheet, Image} from "react-native";
import { Stack } from "expo-router";
import { Colors } from "../constants/Constants";
import MemoryCard from "../components/MemoryCard";
import LevelIndicator from "../components/LevelIndicator";
import PageTitle from "../components/PageTitle";

export default function SequenceMemory() {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: "Sequence Memory" }} />
        <PageTitle text="Sequence Memory"/>
        <LevelIndicator level={0}/>
  
        {/* TODO */}
        <View style={styles.gamePad}>
            <MemoryCard id={1} highlight={false} onClick={(i) => {}}/>
            <MemoryCard id={1} highlight={false} onClick={(i) => {}}/>
            <MemoryCard id={1} highlight={false} onClick={(i) => {}}/>
         </View>
        <View style={styles.gamePad}>
            <MemoryCard id={1} highlight={false} onClick={(i) => {}}/>
            <MemoryCard id={1} highlight={false} onClick={(i) => {}}/>
            <MemoryCard id={1} highlight={false} onClick={(i) => {}}/>
        </View>
        <View style={styles.gamePad}>
            <MemoryCard id={1} highlight={false} onClick={(i) => {}}/>
            <MemoryCard id={1} highlight={false} onClick={(i) => {}}/>
            <MemoryCard id={1} highlight={false} onClick={(i) => {}}/>
        </View>

        <Text>TODO</Text>
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
        flexDirection: 'row',
        marginBottom: 10,
      },
  });
  