import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  Pressable,
  Animated,
} from "react-native";
import { Easing } from "react-native-reanimated";
import { useTheme } from "../../provider/ThemeProvider";
import {
  useFonts,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { StyledText } from "./Themed";
import LottieView from "lottie-react-native";
const Carousel = ({ result, isManga }) => {
  const id = result.id;    
  const title = result?.title?.english || result?.title?.romaji ||  result?.title?.native || result?.title?.userPreffered || "Untitled";
  const { theme } = useTheme();
  const [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_700Bold,
  });
  const scrollX = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const startAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scrollX, {
            toValue: -600,
            duration: 10000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(scrollX, {
            toValue: 20,
            duration: 10000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };
    startAnimation();
  }, [scrollX]);

  return (
    <Link href={{
      pathname: `/Context/[id]`,
      params: {
        id: id,
        title: title,
        status : result.status || 'Releasing',
        rating: result.rating / 10 || 6.9,
        image: result?.image || result?.cover ,
        cover: result?.cover || result?.image,
      },
    }} asChild>
      <Pressable style={styles.carousel}>
        <View style={styles.imageContainer}>
          <Animated.Image
            source={{ uri: result?.cover }}
            style={[
              styles.carouselImage,
              { transform: [{ translateX: scrollX }] },
            ]}
            blurRadius={2}
          />
          <LinearGradient
            colors={["transparent", "rgba(0, 0, 0, 0.2)", "black"]}
            style={StyleSheet.absoluteFillObject}
            locations={[0, 0.5, 1.5]}
          />
        </View>
        <View style={styles.animeCard}>
          <Image
            source={{ uri: result?.image }}
            style={styles.animeCardImage}
          />
          <View style={styles.info}>
            <StyledText
              NotTruncated={true}
              isBold={true}
              color={"white"}
              style={[styles.carouselText]}
            >
              {title}
            </StyledText>
            <Text style={[styles.carouselText, { color: "#df5198" }]}>
              {result.status}
            </Text>
          </View>
          <View style={styles.animeInfo}>
            <Text style={styles.episodeInfo}>
              {" "}
              12 /{" "}
              {result.episodeNumber < 12
                ? "12"
                : result.episodeNumber === 12
                ? "12"
                : "24"}{" "}
              Episodes
            </Text>
            <View style={styles.genres}>
              { result.genres ? result.genres.map((data, i) =>
                i < 3 ? (
                  <Text style={styles.genre} key={i}>
                    {data} {i === 2 ? "" : "•"}
                  </Text>
                ) : null
              )  : <StyledText>??</StyledText> }
            </View>
          </View>
        </View>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  carousel: {
    justifyContent: "center",
    alignItems: "center",
    width: 400,
    height: "100%",
    borderRadius: 20,
    overflow: "hidden",
  },
  imageContainer: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 20,
  },
  carouselImage: {
    height: "100%",
    width: 1000,
    resizeMode: "cover",
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  info: {
    height: 200,
    width: 240,
    paddingHorizontal: 25,
    overflow: "hidden",
    justifyContent: "flex-end",
    paddingVertical: 10,
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
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
  },
  animeCardImage: {
    height: 190,
    width: 130,
    borderRadius: 20,
    resizeMode: "cover",
  },
  animeInfo: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    marginRight: 6,
  },
  genres: {
    flexDirection: "row",
    marginLeft: 30,
    gap: 10,
  },
  genre: {
    fontFamily: "Poppins_500Medium",
    color: "rgba(255, 255, 255, 0.6)",
  },
  episodeInfo: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.6)",
    fontFamily: "Poppins_500Medium",
  },
});

export default Carousel;
