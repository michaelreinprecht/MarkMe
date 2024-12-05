import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native"; 
import { Colors } from "../constants/Constants";
import { Stack } from "expo-router";

type CustomHeaderProps = {
  title: string;
};

function CustomHeader({ title }: CustomHeaderProps) {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        {navigation.canGoBack() && (
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.title}>{title}</Text>
      </View>
    </SafeAreaView>
  );
}

export default function Layout() {
  return (
    <>
      <CustomHeader title="My Home" />
      <Stack
        screenOptions={{
          headerShown: false, // Disable default header
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 70,
    paddingBottom: 20,
    backgroundColor: Colors.background,
  },
  backButton: {
    paddingTop: 70,
    position: "absolute", // Position it to the left
    left: 16,
  },
  backText: {
    color: Colors.headerTint,
    fontSize: 24,
  },
  title: {
    color: Colors.headerTint,
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
});
