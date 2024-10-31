import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Stack } from "expo-router";

export default function VerbalMemory() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Verbal Memory" }} />
      <Text>Verbal Memory Page</Text>
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
