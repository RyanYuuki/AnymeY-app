import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useTheme } from "../../../provider/ThemeProvider";
import {
  useFonts,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { Ionicons } from "@expo/vector-icons";
import Carousel from "../../../components/AnimePageCarousel";
import CarouselItem from "../../../components/Carousel";
import { StyledButton, StyledText } from "../../../components/Themed";
import { router } from "expo-router";

const Anime = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const { theme } = useTheme();
  const seasonsData = ["This Season", "Next Season", "Previous Season"];
  const [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_700Bold,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://consumet-api-two-nu.vercel.app/meta/anilist/trending"
        );
        const result = await response.json();
        if (result && result.results && result.results.length > 0) {
          setData(result.results);
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
          <TextInput
            value={inputValue}
            onChangeText={setInputValue}
            style={[
              styles.input,
              { color: theme.text, backgroundColor: theme.inputBackground },
            ]}
            placeholder="ANIME"
            placeholderTextColor={"white"}
          />
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
          <ActivityIndicator
            size="large"
            color={theme.text}
            style={styles.loader}
          />
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => <Carousel result={item} />}
            keyExtractor={(item, index) => item.id?.toString() || index.toString()}
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
              theme={theme}
              buttonStyle={styles.seasonButton}
              textStyle={{ fontSize: 15 }}
            >
              {item}
            </StyledButton>
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.seasonsContainer}
          horizontal
        />
        <View style={styles.contentList}>
          <StyledButton
            onPress={() => router.push("/menu/mangalist")}
            theme={theme}
            textStyle={styles.listButtonText}
            buttonStyle={styles.listButton}
          >
            GENRES
          </StyledButton>
          <StyledButton
            onPress={() => router.push("/menu/mangalist")}
            theme={theme}
            textStyle={styles.listButtonText}
            buttonStyle={styles.listButton}
          >
            CALENDAR
          </StyledButton>
        </View>
        <StyledText theme={theme} style={styles.titles}>
          Recently Updated
        </StyledText>
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color={theme.text}
            style={styles.loader}
          />
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <CarouselItem isManga={false} result={item} />
            )}
            keyExtractor={(item, index) => item.id?.toString() || index.toString()} // Ensure unique keys
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
  titles: {
    fontSize: 20,
    marginLeft: 20,
  },
  carouselItem: {
    height: 500,
    marginVertical: 20,
    paddingRight: 20,
    paddingBottom: 100
  },
  loader: {
    marginTop: 20,
  },
});

export default Anime;
