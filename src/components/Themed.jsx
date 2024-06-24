import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { useFonts, Poppins_500Medium, Poppins_700Bold } from "@expo-google-fonts/poppins";

export const StyledText = ({ style, children, theme }) => {
  const [fontsLoaded] = useFonts({
    Poppins_500Medium,
  });

  if (!fontsLoaded) {
    return null;
  }

  let truncatedChildren = children;
  if (children.length > 25) {
    truncatedChildren = children.substring(0, 25) + "...";
  }

  return <Text style={[styles.text, style, { color: theme?.text }]}>{truncatedChildren}</Text>;
};

export const StyledButton = ({ buttonStyle, textStyle, children, theme, onPress }) => {
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null; 
  }

  // Logic to truncate text if length exceeds 14 characters


  return (
    <TouchableOpacity
      style={[ buttonStyle, { backgroundColor: theme?.btnBackground }]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, textStyle, { color: theme?.text }]}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
  },
  buttonText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 18,
  },
});
