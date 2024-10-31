import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Stack } from "expo-router";

export default function NumberMemory() {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Number Memory",
          headerBackTitle: "Home",
          headerBackTitleVisible: true,
        }}
      />
      <Text>Number Memory Page</Text>
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
