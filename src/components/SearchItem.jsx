import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Pressable,
  ImageBackground,
} from "react-native";
import { StyledText } from "./Themed";
import { Link } from "expo-router";
const SearchItem = ({ result }) => {
  const id = result.id;
  const title = result.title
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
          <ImageBackground
            source={{ uri: result?.cover }}
            resizeMode="cover"
            style={styles.bodyCover}
            blurRadius={10}
          >
            <View style={styles.row} >
            <Image
              source={{ uri: result?.image }}
              style={styles.carouselImage}
            />
            <View style={styles.textContainer}>
              <StyledText NotTruncated={true} style={styles.carouselText}>{title}</StyledText>
            </View>
            </View>
          </ImageBackground>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  carousel: {
    width: "100%",
    height: 180,
    borderRadius: 20,
    overflow: "hidden",
  },
  bodyCover: {
    width: '100%',
    height: '100%',
  },
  carouselContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  row: {
    height: '100%',
    width: '100%',
    padding: 15,
    flexDirection: "row",
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  carouselImage: {
    height: 150,
    width: 100,
    resizeMode: "cover",
    borderRadius: 20,
  },
  textContainer: {
    width: '60%',
    marginHorizontal: 20,
    paddingVertical: 5,
    justifyContent: 'flex-end',
  },
  carouselText: {
    fontSize: 14,
    marginTop: 5,
  },
});

export default SearchItem;
