import React from "react";
import { Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import {
  useFonts,
  Poppins_500Medium,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_500Medium_Italic,
} from "@expo-google-fonts/poppins";
import { useTheme } from "../../provider/ThemeProvider";
export const StyledText = ({
  isCentered,
  NotTruncated,
  style,
  children,
  isBold,
  isRightAligned,
  color,
  size,
  isItalic,
}) => {
  const { theme } = useTheme();
  const [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_700Bold,
    Poppins_500Medium_Italic,
    Poppins_700Bold_Italic,
  });
  if (!fontsLoaded) {
    return null;
  }

  let truncatedChildren = children;
  if (children.length > 18) {
    truncatedChildren = children.substring(0, 25) + "...";
  }

  return (
    <Text
      style={[
        style,
        {
          fontSize: size ? size : 16,
          color: color ? color : theme.text,
          textAlign: isRightAligned ? "right" : isCentered ? "center" : "",
          fontFamily: isBold
            ? isItalic
              ? "Poppins_700Bold_Italic"
              : "Poppins_700Bold"
            : isItalic
            ? "Poppins_500Medium_Italic"
            : "Poppins_500Medium",
        },
      ]}
    >
      {NotTruncated ? children : truncatedChildren}
    </Text>
  );
};

export const StyledButton = ({
  isDark,
  customTextStyles,
  isTransparent,
  buttonStyle,
  textStyle,
  children,
  onPress,
  color
}) => {
  const { theme } = useTheme();
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TouchableOpacity
      style={[
        buttonStyle,
        {
          backgroundColor: isTransparent
            ? theme.transparentBtn 
            : theme.btnBackground,
          justifyContent: "center",
          alignItems: "center",
        },
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.buttonText,
          textStyle,
          { color: color ? color : theme.text },
        ]}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export const StyledInput = ({ value, onChangeValue, style, onFocus }) => {
  const { theme } = useTheme();
  return (
    <TextInput
      onFocus={onFocus}
      value={value}
      onBlur={onFocus}
      onChangeText={onChangeValue}
      style={{
        ...style,
        ...styles.input,
        color: theme.text,
        backgroundColor: theme.Background,
      }}
    />
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
  buttonText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 18,
  },
  input: {
    fontFamily: "Poppins_700Bold",
    fontSize: 18,
  },
});
