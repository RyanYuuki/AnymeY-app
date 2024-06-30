import React, { useState, useEffect, ViewToken } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import { useTheme } from "@/provider/ThemeProvider";
import { StyledText } from "@/components/Common/Themed";
import CarouselItem from "@/components/Common/CarouselItem";
import { router } from "expo-router";
import ImageBackgroundButton from "@/components/Common/ImageBackgroundButton";
import CarouselLoader from "@/components/Loaders/CarouselLoader";
import { MotiView, ModiText } from "moti";
const Home = () => {
  const [mangaData, setMangaData] = useState([]);
  const [carouselData, setCarouselData] = useState([]);
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingM, setIsLoadingM] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://consumet-api-two-nu.vercel.app/meta/anilist/trending"
        );
        const animeResult = await response.json();
        if (animeResult && animeResult.results.length > 0) {
          setCarouselData(animeResult.results);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    const fetchMangaData = async () => {
      try {
        for (let i = 20; i <= 30; i++) {
          const response2 = await fetch(
            `https://consumet-api-two-nu.vercel.app/meta/anilist-manga/info/${i}?provider=mangadex`
          );
          const result2 = await response2.json();
          if (result2) {
            if (mangaData.length < 10) {
              setMangaData((prevMangaData) => [...prevMangaData, result2]);
            } else {
              break;
            }
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoadingM(false);
      }
    };
    fetchData();
    fetchMangaData();
  }, []);

  return (
    <ScrollView style={{ ...styles.screen, backgroundColor: theme.background }}>
      <MotiView
        from={{ translateX: -200, opacity: 0 }}
        animate={{ translateX: 0, opacity: 1 }}
        transition={{ type: "timing", duration: 700 }}
        style={styles.header}
      >
        <View style={styles.userInfo}>
          <StyledText
            style={{ ...styles.userInfoContent, fontSize: 16, marginTop: 19 }}
          >
            Ryan Yuuki
          </StyledText>
          <StyledText style={styles.userInfoContent}>
            Episode Watched:<Text style={{ color: theme.primary }}> 69</Text>
          </StyledText>
          <StyledText style={styles.userInfoContent}>
            Chapter Read:<Text style={{ color: theme.primary }}> 6900</Text>
          </StyledText>
        </View>

        <View style={styles.userIcon}>
          <Image
            source={require("@/assets/userIcon.png")}
            style={{ width: 70, height: 70, borderRadius: 50 }}
          />
        </View>
      </MotiView>

      <MotiView 
      from={{ translateX: -200, opacity: 0 }}
      animate={{ translateX: 0, opacity: 1 }}
      transition={{ type: "timing", duration: 700 }}
      style={styles.body}>
        <View style={styles.contentList}>
          <ImageBackgroundButton
            source={{
              uri: carouselData[1]?.cover || carouselData[2]?.cover,
            }}
            onPress={() => router.push("/menu/mangalist")}
          >
            ANIME LIST
          </ImageBackgroundButton>
          <ImageBackgroundButton
            source={{
              uri: carouselData[8]?.cover || carouselData[5]?.cover,
            }}
            onPress={() => router.push("/menu/mangalist")}
          >
            MANGA LIST
          </ImageBackgroundButton>
        </View>

        <StyledText isBold={true} style={styles.carouselHeading}>
          Continue Watching
        </StyledText>
        {isLoading ? (
          <FlatList
            data={Array(10)}
            renderItem={() => <CarouselLoader />}
            contentContainerStyle={styles.carouselContainer}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        ) : (
          <FlatList
            data={carouselData}
            renderItem={({ item }) => (
              <CarouselItem fontSize={14} result={item} />
            )}
            contentContainerStyle={styles.carouselContainer}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        )}

        <StyledText isBold={true} style={styles.carouselHeading}>
          Continue Reading
        </StyledText>
        {isLoadingM ? (
          <FlatList
            data={Array(10)}
            renderItem={() => <CarouselLoader />}
            contentContainerStyle={styles.carouselContainer}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        ) : (
          <FlatList
            data={mangaData}
            renderItem={({ item }) => (
              <CarouselItem fontSize={14} result={item} />
            )}
            contentContainerStyle={styles.carouselContainer}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        )}
      </MotiView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 20,
    paddingTop: 20,
    paddingBottom: 10,
    width: "100%",
  },
  userInfo: {
    flexDirection: "column",
  },
  userIcon: {
    justifyContent: "center",
    alignItems: "center",
  },
  userInfoContent: {
    fontSize: 14,
    color: "#333",
  },
  body: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100,
  },
  contentList: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 20,
  },
  carouselHeading: {
    fontSize: 20,
    marginVertical: 20,
    marginLeft: 10,
  },
  carouselContainer: {
    height: 290,
  },
});

export default Home;
