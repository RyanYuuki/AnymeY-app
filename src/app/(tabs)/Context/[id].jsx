import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
  Alert,
  ScrollView,
  Animated,
  Image,
  FlatList,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { useTheme } from "../../../provider/ThemeProvider";
import { Easing } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { StyledButton, StyledText } from "../../../components/Themed";
import { Ionicons } from "@expo/vector-icons";
import ImageBackgroundButton from "../../../components/ImageBackgroundButton";
import CarouselItem from "../../../components/Carousel";
import Character from "../../../components/Characters";

const ItemDetailsPage = () => {
  const [favouritePressed, setFavouritePressed] = useState(false);
  const [sharePressed, setSharePressed] = useState(false);
  const { id } = useLocalSearchParams();
  const [data, setData] = useState([]);
  const [recommendationData, setRecommendationData] = useState([]);
  const [characterData, setCharacterData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const scrollX = useRef(new Animated.Value(0)).current;
  const imagesPaths = [
    require("@/assets/ButtonBackgrounds/img1.jpg"),
    require("@/assets/ButtonBackgrounds/img2.jpg"),
    require("@/assets/ButtonBackgrounds/img3.jpg"),
    require("@/assets/ButtonBackgrounds/img4.jpg"),
    require("@/assets/ButtonBackgrounds/img5.jpg"),
    require("@/assets/ButtonBackgrounds/img6.jpg"),
  ];

  const stripHtml = (html) => {
    return html.replace(/<\/?[^>]+(>|$)/g, "");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://consumet-api-two-nu.vercel.app/meta/anilist/info/${id}?provider=gogoanime`
        );
        const animedata = await response.json();
        setData(animedata);
        setRecommendationData(animedata.recommendations);
        setCharacterData(animedata.characters);
      } catch (error) {
        Alert.warn(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const startAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scrollX, {
            toValue: -300,
            duration: 10000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(scrollX, {
            toValue: 300,
            duration: 10000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };
    startAnimation();
  }, [scrollX]);

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size={30} />
      </SafeAreaView>
    );
  }

  function figureMonth(number) {
    switch (number) {
      case 1:
        return "January";
      case 2:
        return "February";
      case 3:
        return "March";
      case 4:
        return "April";
      case 5:
        return "May";
      case 6:
        return "June";
      case 7:
        return "July";
      case 8:
        return "August";
      case 9:
        return "September";
      case 10:
        return "October";
      case 11:
        return "November";
      case 12:
        return "December";
      default:
        return "";
    }
  }
  const title = data.title
    ? data.title.english != ""
      ? data.title.english
      : data.title.romaji != ""
      ? data.title.romaji
      : data.title.native != ""
      ? data.title.native
      : "Undefined"
    : "Undefined";
  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: theme.background },
      ]}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.carousel}>
        <Animated.Image
          source={{ uri: data?.cover }}
          style={[
            styles.carouselImage,
            { transform: [{ translateX: scrollX }] },
          ]}
          blurRadius={1}
        />
        <LinearGradient
          colors={["transparent", "rgba(0, 0, 0, 0.7)", "black"]}
          style={StyleSheet.absoluteFillObject}
          locations={[0, 0.5, 1]}
        />
        <View style={styles.animeCard}>
          <Image source={{ uri: data?.image }} style={styles.animeCardImage} />
          <View style={styles.info}>
            <StyledText
              NotTruncated={true}
              isBold={true}
              style={styles.carouselText}
            >
              {title}
            </StyledText>
            <StyledText
              isBold={true}
              color={theme.primary}
              style={styles.carouselText}
            >
              {data.currentEpisode < data.totalEpisodes
                ? "Releasing"
                : "Finished"}
            </StyledText>
          </View>
        </View>
        <StyledButton
          customTextStyles={true}
          isTransparent={true}
          buttonStyle={styles.contextButton}
          textStyle={{ color: "#7f91df" }}
        >
          Add To List
        </StyledButton>
      </View>
      <View style={styles.body}>
        <View style={styles.miscSection}>
          <StyledText>
            Total of {data.currentEpisode} / {data.totalEpisodes}
          </StyledText>
          <View style={{ flexDirection: "row", gap: 30 }}>
            <Ionicons
              onPress={() => setFavouritePressed(!favouritePressed)}
              name={favouritePressed ? "heart" : "heart-outline"}
              size={28}
              color={favouritePressed ? theme.tabIconSelected : theme.text}
            />
            <Ionicons
              onPress={() => setSharePressed(!sharePressed)}
              name={sharePressed ? "share" : "share-outline"}
              size={28}
              color={sharePressed ? theme.tabIconSelected : theme.text}
            />
          </View>
        </View>
        <View style={styles.fullAnimeInfo}>
          <View style={styles.infoContainer}>
            <View style={styles.row}>
              <StyledText color={"grey"}>Rating</StyledText>
              <StyledText color={"grey"}>Status</StyledText>
              <StyledText color={"grey"}>Total Episodes</StyledText>
              <StyledText color={"grey"}>Duration</StyledText>
              <StyledText color={"grey"}>Type</StyledText>
              <StyledText color={"grey"}>Studio</StyledText>
              <StyledText color={"grey"}>Start Date</StyledText>
              <StyledText color={"grey"}>End Date</StyledText>
            </View>
            <View style={styles.row}>
              <StyledText isRightAligned={true} isBold={true}>
                <Text style={{ color: theme.primary }}>{data.rating / 10}</Text>{" "}
                / 10
              </StyledText>
              <StyledText isRightAligned={true} isBold={true}>
                {data.status}
              </StyledText>
              <StyledText isRightAligned={true} isBold={true}>
                {data.totalEpisodes}
              </StyledText>
              <StyledText isRightAligned={true} isBold={true}>
                {data.duration || "24"} Min
              </StyledText>
              <StyledText isRightAligned={true} isBold={true}>
                {data.type}
              </StyledText>
              <StyledText
                color={theme.primary}
                style={{ textTransform: "capitalize" }}
                isRightAligned={true}
                isBold={true}
              >
                {data.studios[0] == "" ? "??" : data.studios[0]}
              </StyledText>
              <StyledText isRightAligned={true} isBold={true}>
                {data.startDate.day} {figureMonth(data.startDate.month)}
                {","} {data.startDate.year}
              </StyledText>
              <StyledText isRightAligned={true} isBold={true}>
                {data.endDate.day} {figureMonth(data.endDate.month)}
                {","} {data.endDate.year}
              </StyledText>
            </View>
          </View>
          <StyledText style={styles.synopsis} isBold={true}>
            Synopsis
          </StyledText>
          <StyledText NotTruncated={true} style={styles.synopsis}>
            {stripHtml(data.description)}
          </StyledText>
          <View style={styles.genres}>
            <StyledText isBold={true} style={{ width: "100%" }}>
              Genres
            </StyledText>
            {data.genres.map((genre, i) => (
              <ImageBackgroundButton key={i} source={imagesPaths[i]}>
                {genre}
              </ImageBackgroundButton>
            ))}
          </View>
          <View style={styles.charactersSection}>
            <StyledText isBold={true}>Characters</StyledText>
            {loading && characterData ? (
              <ActivityIndicator></ActivityIndicator>
            ) : (
              <FlatList
                data={characterData}
                renderItem={({ item }) => <Character result={item} />}
                keyExtractor={(item, index) =>
                  item.name?.toString() || index.toString()
                }
                contentContainerStyle={styles.carouselContainer}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            )}
          </View>
          <View style={styles.recommendationSection}>
            <StyledText isBold={true}>Recommended</StyledText>
            {loading && !data.recommendations ? (
              <ActivityIndicator></ActivityIndicator>
            ) : (
              <FlatList
                data={recommendationData}
                renderItem={({ item }) => <CarouselItem result={item} />}
                keyExtractor={(item, index) =>
                  item.name?.toString() || index.toString()
                }
                contentContainerStyle={styles.carouselContainer}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  carousel: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    borderRadius: 20,
  },
  carouselImage: {
    height: 400,
    width: 1000,
    resizeMode: "cover",
  },
  info: {
    height: 200,
    paddingHorizontal: 15,
    paddingBottom: 10,
    justifyContent: "flex-end",
  },
  carouselText: {
    width: 200,
    fontSize: 16,
  },
  animeCard: {
    position: "absolute",
    top: 150,
    width: "85%",
    flexDirection: "row",
    alignItems: "center",
  },
  animeCardImage: {
    height: 170,
    width: 130,
    borderRadius: 20,
    resizeMode: "cover",
  },
  animeInfo: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  genres: {
    paddingVertical: 20,
    width: "100%",
    gap: 10,
    flexWrap: "wrap",
    flexDirection: "row",
  },
  episodeInfo: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.6)",
    fontFamily: "Poppins_500Medium",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  body: {
    flex: 1,
  },
  contextButton: {
    marginHorizontal: "7.5%",
    borderWidth: 1,
    borderColor: "#FFFFFF",
    marginTop: -40,
    marginBottom: 20,
    width: "85%",
    height: 50,
    borderRadius: 16,
  },
  miscSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 40,
    paddingTop: 20,
  },
  fullAnimeInfo: {
    padding: 30,
  },
  infoContainer: {
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  recommendationSection: {
    gap: 10,
  },
  recommendations: {},
  carouselContainer: {
    height: 300,
    gap: 20,
    marginVertical: 10,
  },
});

export default ItemDetailsPage;
