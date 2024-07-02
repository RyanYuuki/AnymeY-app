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
import {
  useFonts,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { Ionicons } from "@expo/vector-icons";
import Carousel from "@/components/Common/BigCarouselItem";
import CarouselItem from "@/components/Common/CarouselItem";
import { StyledButton, StyledText } from "@/components/Common/Themed";
import ImageBackgroundButton from "@/components/Common/ImageBackgroundButton";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
const Manga = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useTheme();
  const [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_700Bold,
  });

  useEffect(() => {
    const fetchMangaData = async () => {
      for (let i = 20; i <= 30; i++) {
        const response2 = await fetch(
          `https://consumet-api-two-nu.vercel.app/meta/anilist-manga/info/${i}?provider=mangadex`
        );
        const result2 = await response2.json();
        if (result2) {
          if (data.length < 10) {
            setData((prevData) => [...prevData, result2]);
            setIsLoading(false);
          } else {
            break;
          }
        }
      }
    };
    fetchMangaData();
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
            style={[
              styles.input,
              { color: theme.text, backgroundColor: "rgba(0,0,0,0.5)" },
            ]}
          >
            <Pressable onPress={() => router.push("/MangaSearch")}>
              <StyledText isBold={true}>MANGA</StyledText>
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
            renderItem={({ item }) => <Carousel isManga={true} result={item} />}
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
            TOP SCORE
          </ImageBackgroundButton>
        </View>
        <StyledText style={styles.titles}>Trending Novels</StyledText>
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
              <CarouselItem isManga={true} result={item} />
            )}
            contentContainerStyle={styles.carouselItem}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
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
    fontFamily: "Poppins_500Medium",
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
    paddingHorizontal: 10,
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
    borderColor: "red",
  },
  imageBackground: {
    width: 160,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  imageBackgroundImage: {
    resizeMode: "cover",
    borderRadius: 20,
    opacity: 0.8,
    borderWidth: 2,
    borderColor: "grey",
  },
  titles: {
    fontSize: 20,
    marginLeft: 20,
  },
  carouselItem: {
    height: 500,
    marginVertical: 20,
    paddingRight: 20,
    paddingBottom: 100,
  },
  loader: {
    marginTop: 20,
  },
});

export default Manga;
