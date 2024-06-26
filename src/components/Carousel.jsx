import React from "react";
import { View, StyleSheet, Image, Pressable } from "react-native";
import { StyledText } from "./Themed";
import { Link } from "expo-router";
const CarouselItem = ({ result, fontSize }) => {
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
          <StyledText size={fontSize} style={styles.carouselText}>{title}</StyledText>
          <StyledText color={'grey'} size={14} isRightAligned={false} isCentered={true} isBold={true} isItalic={true}>~ | {result.totalEpisodes || '24'}</StyledText>
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
    paddingVertical: 5,
  },
  carouselText: {
    textAlign: 'left',
    fontSize: 14,
    marginTop: 5,
  },
});

export default CarouselItem;
