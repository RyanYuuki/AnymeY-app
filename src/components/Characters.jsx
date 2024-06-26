import React from "react";
import { View, StyleSheet, Image, Pressable } from "react-native";
import { StyledText } from "./Themed";
const Character = ({ result }) => {
  const id = result.id;
  return (
      <Pressable style={styles.carousel}>
        <Image source={{ uri: result?.image }} style={styles.carouselImage} />
        <View style={styles.textContainer}>
          <StyledText style={styles.carouselText}>{result.name.full}</StyledText>
          <StyledText size={12} isRightAligned={true} isItalic={true} color={'grey'}>~ {result.role}</StyledText>
        </View>
      </Pressable>
  );
};

const styles = StyleSheet.create({
  carousel: {
    width: 130,
    height: 200,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  carouselImage: {
    height: 200,
    width: "100%",
    resizeMode: "cover",
    borderRadius: 20,
  },
  textContainer: {
    width: '100%',
    paddingVertical: 5,
  },
  carouselText: {
    textAlign: "left",
    fontSize: 14,
    marginTop: 5,
  },
});

export default Character;
