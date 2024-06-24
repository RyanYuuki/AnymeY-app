import React from "react";
import { View, StyleSheet, Image, Text, Pressable } from "react-native";
import { useTheme } from "../provider/ThemeProvider";
import {
  useFonts,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { Link } from "expo-router";
const Carousel = ({ result }) => {
  const id = result.id;
  const { theme } = useTheme();
  const [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_700Bold,
  });
  return (
    <Link href={`/${id}`} asChild>
    <Pressable style={styles.carousel}>
      <Image
        source={{ uri: result?.cover }}
        style={styles.carouselImage}
        blurRadius={2}
      />
      <View style={styles.animeCard}>
        <Image source={{ uri: result?.image }} style={styles.animeCardImage} />
        <View style={styles.info}>
          <Text style={[styles.carouselText, { color: theme.text }]}>
            {result?.title.english || result?.title.romaji}
          </Text>
          <Text style={[styles.carouselText, { color: 'red' }]}>
            {result?.episodeNumber < 12
              ? "Releasing"
              : result?.episodeNumber == 12
              ? "Finished"
              : result?.episodeNumber == 24
              ? "Finished"
              : "Releasing"}
          </Text>
        </View>
        <View style={styles.animeInfo}>
              <Text style={styles.episodeInfo}>{result.episodeNumber} / {result.episodeNumber < 12 ? "12" : ( result.episodeNumber == 12 ? '12' : '24')}  Episodes</Text>
              <View style={styles.genres}>
              {result.genres.map(( data, i) => ( i < 3 ? <Text style={styles.genre}>{data} {i == 2 ? '' : '•' }</Text> : <Text/>))}
              </View>
        </View>
      </View>
    </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  carousel: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 400,
    height: "100%",
    borderRadius: 20,
  },
  carouselImage: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
  },
  info: {
    height: 200,
    paddingHorizontal: 10,
    overflow: "hidden",
    justifyContent: 'flex-end',
  },
  carouselText: {
    width: 200,
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
  },
  animeCard: {
    position: "absolute",
    top: 123,
    height: "66%",
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  animeCardImage : {
    height: 190,
    width: 130,
    borderRadius: 20,
    resizeMode: 'cover',
  },
  animeInfo: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genres: {
    flexDirection: 'row',
    marginLeft: 30,
    gap: 10,
  },
  genre: {
    fontFamily: 'Poppins_500Medium',
    color: 'rgba(255, 255, 255, 0.6)',
  },
  episodeInfo: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.6)',
    fontFamily: 'Poppins_500Medium',
  }
});

export default Carousel;
