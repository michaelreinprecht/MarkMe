import { Stack } from "expo-router";
import { Colors } from "../constants/Constants";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        title: "My home",
        headerStyle: { backgroundColor: Colors.headerBackground },
        headerTintColor: Colors.headerTint,
        headerTitleStyle: { fontWeight: "bold" },
      }}
    />
  );
}
