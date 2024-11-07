import React from "react";
import { StyleSheet, Text} from 'react-native';
import { Fonts } from "../constants/Constants";

// Define a type for the props
type PageTitleProps = {
    text: string; //Display which page the user is on right now
  };

  export default function PageTitle({
    text
  }: PageTitleProps) {

    return (
        <Text style={styles.title}>{text}</Text>
    )
  }

  const styles = StyleSheet.create({
    title: {
        fontSize: Fonts.sizes.large,
        marginBottom: 20,
        marginTop: 20,
        fontWeight: "bold",
      },
  });
  