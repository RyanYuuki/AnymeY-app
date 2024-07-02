import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Pressable,
} from "react-native";
import { useTheme } from "@/provider/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";
import Carousel from "@/components/Common/BigCarouselItem";
import CarouselItem from "@/components/Common/CarouselItem";
import { StyledButton, StyledText } from "@/components/Common/Themed";
import ImageBackgroundButton from "@/components/Common/ImageBackgroundButton";
import {router } from "expo-router";
import SearchItem from "@/components/Common/SearchItem";
import LottieView from "lottie-react-native";
const Anime = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useTheme();
  const seasonsData = ["This Season", "Next Season", "Previous Season"];
  const [popularAnimeData, setPopularAnimeData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://consumet-api-two-nu.vercel.app/meta/anilist/trending"
        );
        const response2 = await fetch(
          "https://consumet-api-two-nu.vercel.app/meta/anilist/popular"
        );
        const animeResult = await response.json();
        const result2 = await response2.json();
        if (animeResult && animeResult.results && animeResult.results.length > 0) {
          setData(animeResult.results);
        }
        if (result2 && result2.results && result2.results.length > 0) {
          setPopularAnimeData(result2.results);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{
        ...styles.screen,
        backgroundColor: theme.background,
      }}
    >
      <View style={styles.header}>
        <View style={styles.inputBox}>
          <View
            style={[styles.input, { backgroundColor: theme.transparentBtn }]}
          >
            <Pressable onPress={() => router.push("/AnimeSearch")}>
              <StyledText isBold={true}>ANIME</StyledText>
            </Pressable>
          </View>
          <TouchableOpacity>
            <Ionicons
              name="search"
              size={20}
              style={styles.searchIcon}
              color={theme.text}
            />
          </TouchableOpacity>
          <Image
            source={require("@/assets/userIcon.png")}
            style={styles.userIcon}
          />
        </View>
        {isLoading ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <LottieView
              style={{ width: 100, height: 100 }}
              source={require("@/assets/Animations/loading3.json")}
              autoPlay
              loop
            />
          </View>
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => <Carousel isManga={false} result={item} />}
            contentContainerStyle={styles.carousel}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToAlignment="center"
            decelerationRate="fast"
            pagingEnabled
          />
        )}
      </View>
      <View style={styles.body}>
        <FlatList
          data={seasonsData}
          renderItem={({ item }) => (
            <StyledButton
              onPress={() => router.push(`/pages/${item}`)}
              buttonStyle={styles.seasonButton}
              textStyle={{ fontSize: 15 }}
            >
              {item}
            </StyledButton>
          )}
          contentContainerStyle={styles.seasonsContainer}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        <View style={styles.contentList}>
          <ImageBackgroundButton
            source={require("@/assets/ButtonBackgrounds/img1.jpg")}
            onPress={() => router.push("/menu/mangalist")}
          >
            GENRES
          </ImageBackgroundButton>
          <ImageBackgroundButton
            source={require("@/assets/ButtonBackgrounds/img2.jpg")}
            onPress={() => router.push("/menu/mangalist")}
          >
            CALENDAR
          </ImageBackgroundButton>
        </View>
        <StyledText isBold={true} style={styles.titles}>
          Recently Updated
        </StyledText>
        {isLoading ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <LottieView
              style={{ width: 100, height: 100 }}
              source={require("@/assets/Animations/loading3.json")}
              autoPlay
              loop
            />
          </View>
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <CarouselItem isManga={false} result={item} />
            )}
            contentContainerStyle={styles.carouselItem}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>
      <StyledText style={styles.titles} isBold={true}>
        Popular Anime
      </StyledText>
      <View style={styles.popularSection}>
        {isLoading && !popularAnimeData ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <LottieView
              style={{ width: 100, height: 100 }}
              source={require("@/assets/Animations/loading3.json")}
              autoPlay
              loop
            />
          </View>
        ) : (
          popularAnimeData.map((item) => <SearchItem result={item} />)
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
  },
  inputBox: {
    position: "absolute",
    top: 60,
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "transparent",
    zIndex: 100,
    paddingHorizontal: 20,
  },
  input: {
    width: "70%",
    height: 50,
    paddingLeft: 20,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "white",
    justifyContent: "center",
  },
  searchIcon: {
    marginLeft: -30,
    bottom: 2,
  },
  userIcon: {
    height: 50,
    width: 50,
    marginLeft: 10,
    resizeMode: "cover",
    borderRadius: 50,
  },
  header: {
    height: 400,
  },
  body: {
    flex: 1,
  },
  carousel: {
    position: "absolute",
    height: 400,
  },
  seasonsContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    gap: 20,
  },
  seasonButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 140,
    height: 40,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "white",
  },
  contentList: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 20,
  },
  titles: {
    fontSize: 20,
    marginLeft: 20,
  },
  carouselItem: {
    height: 300,
    marginVertical: 20,
    paddingRight: 20,
  },
  popularSection: {
    flex: 1,
    gap: 20,
    marginVertical: 20,
    width: "90%",
    alignSelf: "center",
  },
});

export default Anime;
