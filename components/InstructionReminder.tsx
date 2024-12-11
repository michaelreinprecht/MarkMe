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
    sequenceFontSize?: number;
  };

export default function InstructionReminder({displayFirstText, firstText, secondText, sequenceFontSize}: InstructionReminderProps){
    if (displayFirstText) {
      return <Text style={styles.info}>{firstText}</Text>;
    }
  
    const [textBeforeSequence, sequence] = secondText.split("<b>");
  
    return (
      <Text style={styles.info}>
        {textBeforeSequence + " "}
        <Text style={[styles.sequence, { fontSize: sequenceFontSize }]}>
          {sequence}
        </Text>
      </Text>
    );
  }

const styles = StyleSheet.create({
    info: {
        color: Colors.lightText,
        fontSize: Fonts.sizes.medium,
        minHeight: 20,
        textAlign: "center",
    },
    sequence: {
        fontWeight: "bold",
        color: Colors.lightText,
    },
  });
