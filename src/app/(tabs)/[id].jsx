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
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { useTheme } from "../../provider/ThemeProvider";
import { Easing } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { StyledButton } from "../../components/Themed";

const ItemDetailsPage = () => {
  const { id } = useLocalSearchParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://consumet-api-two-nu.vercel.app/meta/anilist/info/${id}?provider=gogoanime`
        );
        const animedata = await response.json();
        setData(animedata);
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

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.background }]}>
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
          colors={['transparent', 'rgba(0, 0, 0, 0.7)', 'black']}
          style={StyleSheet.absoluteFillObject}
          locations={[0, 0.5, 1]}
        />
        <View style={styles.animeCard}>
          <Image
            source={{ uri: data?.image }}
            style={styles.animeCardImage}
          />
          <View style={styles.info}>
            <Text style={[styles.carouselText, { color: theme.text }]}>
              {data?.title.english || data?.title.romaji}
            </Text>
            <Text style={[styles.carouselText, { color: "red" }]}>
              { data.episodes.length < data.totalEpisodes
                ? "Releasing" : 'Finished'
              }
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.body}>
        <StyledButton theme={theme} buttonStyle={styles.contextButton} >Add To List</StyledButton>
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
    width: '100%', // Adjust width to 100%
    borderRadius: 20,
    overflow: 'hidden', // Ensure gradient doesn't overflow
  },
  carouselImage: {
    height: 500,
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
    fontFamily: "Poppins_700Bold",
  },
  animeCard: {
    position: "absolute",
    top: 150,
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
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
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
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contextButton: {
    width: 200,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
});

export default ItemDetailsPage;
