import React from "react";
import { View, StyleSheet, Image, Pressable } from "react-native";
import { StyledText } from "./Themed";
import { Link } from "expo-router";
const CarouselItem = ({ result }) => {
  const id = result.id;
  const title =
    result.title
      ? result.title.english
        ? result.title.english
        : result.title.romaji
        ? result.title.romaji
        : result.title.native
        ? result.title.native
        : "Undefined"
      : "Untitled";
  return (
    <Link href={`/Context/${id}`} asChild>
      <Pressable style={styles.carousel}>
        <Image source={{ uri: result?.image }} style={styles.carouselImage} />
        <View style={styles.textContainer}>
          <StyledText style={styles.carouselText}>{title}</StyledText>
        </View>
      </Pressable>
    </Link>
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
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: "center",
  },
  carouselText: {
    textAlign: "center",
    fontSize: 14,
    marginTop: 5,
  },
});

export default CarouselItem;
