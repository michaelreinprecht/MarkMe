import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { Colors, Fonts } from "../constants/Constants";

type RetryNavigationButtonProps = {
  text: string;
  backgroundColor?: string;
};

export default function RetryNavigationButton({
  text,
  backgroundColor = Colors.buttonPrimary,
}: RetryNavigationButtonProps) {
  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
  const router = useRouter();

  const dismissAllAndNavigate = () => {
    router.dismiss(1);
  };

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        onPress={dismissAllAndNavigate}
        style={[
          styles.button,
          {
            backgroundColor,
            justifyContent: "center",
            minHeight: screenHeight * 0.09,
          },
        ]}
      >
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: "80%",
  },
  button: {
    flexDirection: "row", // Allows icon and text to be side by side
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: Colors.buttonBorder,
    flexGrow: 1,
  },
  buttonText: {
    color: Colors.lightText,
    fontSize: Fonts.sizes.large,
    fontFamily: Fonts.family.button,
  },
});
