import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Stack } from "expo-router";

export default function VisualMemory() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Visual Memory" }} />
      <Text>Visual Memory Page</Text>
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
