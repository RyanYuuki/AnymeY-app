import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Pressable
} from "react-native";
import React, { useState, useEffect } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { useTheme } from "@/provider/ThemeProvider";
import { LinearGradient } from "expo-linear-gradient";
import { StyledButton, StyledText } from "@/components/Common/Themed";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@/provider/QueryProvider";
import AnimeDetailsBody from "@/components/Pages/AnimeDetailsBody";
import StreamingPage from "@/components/Pages/StreamingPage";
import TabBar from "@/components/Anime/TabBar";
import LottieView from "lottie-react-native";
import NotFound from "@/components/Common/NotFound";
import ErrorBoundary from "@/components/Utils/ErrorBoundary";
import { MotiView, MotiImage } from "moti";

const ItemDetailsPage = () => {
  const [favouritePressed, setFavouritePressed] = useState(false);
  const [sharePressed, setSharePressed] = useState(false);
  const { id, title, image, cover, status } = useLocalSearchParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const { theme } = useTheme();
  const { isSearchSelected, setSearchSelected, isQualityMenuEnvoked } = useQuery();

  useEffect(() => {
    setSearchSelected(false);
    const fetchData = async () => {
      try {
        const response = await fetch(`https://consumet-api-two-nu.vercel.app/meta/anilist/info/${id}?provider=gogoanime`);
        const animedata = await response.json();
        setData(animedata);
      } catch {
        setIsValid(false);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  return (
    <ErrorBoundary>
      {loading ? (
        <View style={[styles.center, styles.fullScreen, { backgroundColor: theme.background }]}>
          <LottieView
            style={styles.loadingAnimation}
            source={require("@/assets/Animations/loading2.json")}
            autoPlay
            loop
          />
        </View>
      ) : isValid ? (
        <>
          <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.background }]}>
            <Stack.Screen options={{ headerShown: false }} />
            <Pressable style={styles.carousel}>
              <MotiImage
                from={{ translateX: -300 }}
                animate={{ translateX: 300 }}
                transition={{ loop: true, type: "timing", duration: 20000 }}
                source={{ uri: cover }}
                style={styles.carouselImage}
                blurRadius={1}
              />
              <LinearGradient
                colors={["transparent", "rgba(0, 0, 0, 0.7)", "black"]}
                style={StyleSheet.absoluteFillObject}
                locations={[0, 0.5, 1]}
              />
              <MotiView
                from={{ opacity: 0, translateX: -100 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ type: "timing", duration: 2000 }}
                style={styles.animeCard}
              >
                <Image source={{ uri: image }} style={styles.animeCardImage} />
                <View style={styles.info}>
                  <StyledText NotTruncated={true} isBold={true} style={styles.carouselText} color={"white"}>
                    {title || "??"}
                  </StyledText>
                  <StyledText isBold={true} color={theme.primary} style={styles.carouselText}>
                    {status || "??"}
                  </StyledText>
                </View>
              </MotiView>
              <StyledButton customTextStyles={true} isTransparent={true} buttonStyle={styles.contextButton} color={"#7f91df"}>
                Add To List
              </StyledButton>
            </Pressable>
            <MotiView
              from={{ opacity: 0, translateX: -200 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ type: "timing", duration: 2000 }}
              style={styles.miscSection}
            >
              <StyledText color={"grey"}>
                Total of{" "}
                <StyledText isBold={true}>
                  {data.totalEpisodes || "??"}
                </StyledText>
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
            </MotiView>
            {isSearchSelected ? (
              <StreamingPage data={data.episodes} />
            ) : (
              <AnimeDetailsBody
                data={data}
                characterData={data.characters}
                recommendationData={data.recommendations}
              />
            )}
          </ScrollView>
          <View style={{ display: isQualityMenuEnvoked ? "none" : "flex" }}>
            <TabBar />
          </View>
        </>
      ) : (
        <NotFound />
      )}
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  fullScreen: {
    width: "100%",
    height: "100%",
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
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  loadingAnimation: {
    height: 300,
    width: 300,
  },
});

export default ItemDetailsPage;
