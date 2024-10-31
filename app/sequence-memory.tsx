import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Stack } from "expo-router";

export default function SequenceMemory() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Sequence Memory" }} />
      <Text>Sequence Memory Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
