/*

Component used for displaying hints/instructions for the player while playing a game.

*/

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors, Fonts } from "../constants/Constants";

type InstructionReminderProps = {
    displayFirstText: boolean;
    firstText: string;
    secondText: string;
  };

export default function InstructionReminder({displayFirstText, firstText, secondText}: InstructionReminderProps){
    return (
        <Text style={styles.info}>
            {displayFirstText
            ? firstText
            : secondText}
        </Text>
    )
}

const styles = StyleSheet.create({
    info: {
        color: Colors.lightText,
        fontSize: Fonts.sizes.medium,
        minHeight: 20,
        textAlign: "center",
      },
  });
