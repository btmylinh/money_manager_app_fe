import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";

export const LightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#22C55E",
    secondary: "#10B981",
    error: "#EF4444",
    background: "#F8FAFC",
    surface: "#FFFFFF",
  },
  roundness: 12,
};

export const DarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#22C55E",
    secondary: "#10B981",
    error: "#EF4444",
    background: "#0B1020",
    surface: "#111827",
  },
  roundness: 12,
};
