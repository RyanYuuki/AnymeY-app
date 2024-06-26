// ImageBackgroundButton.js
import React from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { StyledButton } from "./Themed";

const ImageBackgroundButton = ({
  source,
  onPress,
  buttonStyle,
  textStyle,
  children,
}) => {
  return (
    <ImageBackground
      source={source}
      style={[styles.imageBackground]}
      imageStyle={styles.imageBackgroundImage}
    >
      <StyledButton
        textStyle={styles.listButtonText}
        buttonStyle={styles.listButton}
        isTransparent={true}
      >
        {children}
      </StyledButton>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  listButton: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  listButtonText: {
    fontSize: 16,
    color: "white",
    borderBottomWidth: 2,
    borderColor: "#d34d90",
  },
  imageBackground: {
    width: 160,
    height: 75,
    justifyContent: "center",
    alignItems: "center",
  },
  imageBackgroundImage: {
    resizeMode: "cover",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "grey",
  },
});

export default ImageBackgroundButton;
