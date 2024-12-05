import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { useNavigation, NavigationContainerRef } from "@react-navigation/native";
import { Colors } from "../constants/Constants";
import { Stack } from "expo-router";

type CustomHeaderProps = {
  title: string;
};

function CustomHeader({ title }: CustomHeaderProps) {
  const navigation = useNavigation();

  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    const checkCanGoBack = () => {
      if (navigation.canGoBack()) {
        setShowArrow(true);
      } else {
        setShowArrow(false);
      }
    };

    checkCanGoBack();

    const unsubscribe = navigation.addListener("state", checkCanGoBack);

    return unsubscribe; 
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        {/* Back Button */}
        {showArrow && (
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
        )}
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
          headerShown: false,
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: Colors.background,
    paddingTop: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    backgroundColor: Colors.background,
    position: "relative", 
  },
  backButton: {
    position: "absolute", 
    left: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  backText: {
    color: Colors.headerTint,
    fontSize: 24,
    fontWeight: "bold",
  }
});
