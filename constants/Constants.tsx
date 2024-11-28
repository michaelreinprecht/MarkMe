/* 

This file holds constants for colors or fonts that are used throughout the app.
Furthermore there are constants for paths for the possible game modes and their respective icons.
By reusing those constants, we can ensure that the app has a consistent look and feel.

*/

import SequenceMemoryIcon from "../assets/GridMemory.png";
import NumberMemoryIcon from "../assets/NumberMemory.png";
import VerbalMemoryIcon from "../assets/VerbalMemory.png";
import VisualMemoryIcon from "../assets/GridMemory.png";

const Colors = {
  headerTint: "#f4511e",
  buttonPrimary: "#00000080",
  buttonSecondary: "#1F5B0C",
  buttonTertiary: "#02128D",
  buttonLight: "#FFFFFF",
  buttonBorder: "#B0BEC5",
  background: "#0A1A43",
  darkText: "#37474F",
  lightText: "#FFFFFF",
};

const Fonts = {
  family: {
    title: "Jaro",
    button: "Jaro",
  },
  sizes: {
    small: 14,
    medium: 18,
    large: 22,
    title: 60,
  },
};

const GameModes: Record<
  string,
  { startPath: string; gamePath: string; icon: any }
> = {
  "Sequence Memory": {
    startPath: "/sequence-memory",
    gamePath: "/sequence-memory-game",
    icon: SequenceMemoryIcon,
  },
  "Number Memory": {
    startPath: "/number-memory",
    gamePath: "/number-memory-game",
    icon: NumberMemoryIcon,
  },
  "Verbal Memory": {
    startPath: "/verbal-memory",
    gamePath: "/verbal-memory-game",
    icon: VerbalMemoryIcon,
  },
  "Visual Memory": {
    startPath: "/visual-memory",
    gamePath: "/visual-memory-game",
    icon: VisualMemoryIcon,
  },
};

export { Colors, Fonts, GameModes };
