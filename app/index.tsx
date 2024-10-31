import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function MainMenu() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MarkMe</Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Sequence Memory"
          onPress={() => router.push("/sequence-memory")}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Number Memory"
          onPress={() => router.push("/number-memory")}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Verbal Memory"
          onPress={() => router.push("/verbal-memory")}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Visual Memory"
          onPress={() => router.push("/visual-memory")}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Highscores" onPress={() => router.push("/highscores")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A9D6E5", // Light blue background
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
    fontWeight: "bold",
  },
  buttonContainer: {
    width: "80%",
    marginVertical: 10,
  },
});
