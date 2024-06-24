import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useTheme } from "../../../provider/ThemeProvider";
import { StyledButton, StyledText } from "@/components/Themed";
import CarouselItem from "../../../components/Carousel";
import { router } from "expo-router";

const Home = () => {
  const [mangaData, setMangaData] = useState([]);
  const [carouselData, setCarouselData] = useState([]);
  const { theme, toggleTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://consumet-api-two-nu.vercel.app/meta/anilist/trending"
        );
        const animeResult = await response.json();
        if (animeResult && animeResult.results) {
          setCarouselData(animeResult.results);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    const fetchManagData = async () => {
      for (let i = 20; i <= 30; i++) {
        const response2 = await fetch(
          `https://consumet-api-two-nu.vercel.app/meta/anilist-manga/info/${i}?provider=mangadex`
        );
        const result2 = await response2.json();
        if (result2) {
          if (mangaData.length < 10) {
            setMangaData((prevMangaData) => [...prevMangaData, result2]);
          }
          else {
            break;
          }
        }
      }
    }
    fetchData();
    fetchManagData();
  }, []);

  return (
    <ScrollView style={{ ...styles.screen, backgroundColor: theme.background }}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <StyledText
            theme={theme}
            style={{ ...styles.userInfoContent, fontSize: 16, marginTop: 19 }}
          >
            Ryan Yuuki
          </StyledText>
          <StyledText theme={theme} style={styles.userInfoContent}>
            Episode Watched: {"69"}
          </StyledText>
          <StyledText theme={theme} style={styles.userInfoContent}>
            Chapter Read: {"6900"}
          </StyledText>
        </View>

        <View style={styles.userIcon}>
          <Image
            source={require("@/assets/userIcon.png")}
            style={{ width: 70, height: 70, borderRadius: 50 }}
          />
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.contentList}>
          <StyledButton
            onPress={() => router.push("/menu/Animelist")}
            theme={theme}
            textStyle={styles.listButtonText}
            buttonStyle={styles.listButton}
          >
            ANIME LIST
          </StyledButton>
          <StyledButton
            onPress={() => router.push("/menu/mangalist")}
            theme={theme}
            textStyle={styles.listButtonText}
            buttonStyle={styles.listButton}
          >
            MANGA LIST
          </StyledButton>
        </View>

        <StyledText theme={theme} style={styles.carouselHeading}>
          Continue Watching
        </StyledText>
        {isLoading ? (
          <ActivityIndicator size="large" color={theme.text} />
        ) : (
          <FlatList
            data={carouselData}
            renderItem={({ item }) => <CarouselItem isManga={false} result={item} />}
            keyExtractor={(item, index) => item.name?.toString() || index.toString() }
            contentContainerStyle={styles.carouselContainer}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        )}

        <StyledText theme={theme} style={styles.carouselHeading}>
          Continue Reading
        </StyledText>
        {isLoading ? (
          <ActivityIndicator size="large" color={theme.text} />
        ) : (
          <FlatList
            data={mangaData}
            renderItem={({ item }) => <CarouselItem isManga={true} result={item} />}
            keyExtractor={(item, index) => item.name?.toString() || index.toString() }
            contentContainerStyle={styles.carouselContainer}
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
  listButton: {
    paddingHorizontal: 30,
    paddingVertical: 25,
    borderRadius: 20,
    backgroundColor: "#eee",
  },
  listButtonText: {
    fontSize: 16,
    color: "black",
    borderBottomWidth: 2,
    borderBottomColor: "red",
  },
  carouselHeading: {
    fontSize: 20,
    marginVertical: 20,
    marginLeft: 10,
  },
  carouselContainer: {
    height: 300,
  },
});

export default Home;
