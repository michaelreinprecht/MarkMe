import React from "react";
import { StyleSheet, Text } from "react-native";
import { Colors, Fonts } from "../constants/Constants";

// Define a type for the props
type PageTitleProps = {
  text: string; //Display which page the user is on right now
  fontSize?: number; //Optional font size for the title
};

export default function PageTitle({ text, fontSize }: PageTitleProps) {
  return (
    <Text
      style={[
        styles.title,
        fontSize ? { fontSize: fontSize } : { fontSize: 50 },
      ]}
    >
      {text}
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: Fonts.sizes.large,
    marginBottom: 20,
    fontFamily: Fonts.family.title,
    color: Colors.lightText
  },
});
