import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { StyledText } from "../Common/Themed";
import EpisodeData from "../Anime/EpisodeData";
import { useQuery } from "@/provider/QueryProvider";
import LottieLoader from "../Loaders/LottieLoader";
import QualityData from "../Anime/QualityData";
import { FontAwesome6 } from "@expo/vector-icons";
import { MotiView } from "moti";

const StreamingPage = ({ data }) => {
  const [id, setId] = useState(null);
  const [videoQualityData, setVideoQualityData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isQualityMenuEnvoked, setQualityMenuEnvoked } = useQuery();

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const response = await fetch(
            `https://consumet-api-two-nu.vercel.app/meta/anilist/watch/${id}`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }

          const episodeData = await response.json();
          setVideoQualityData(episodeData.sources);
        } catch (error) {
          console.error("Error fetching video:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
    return () => setQualityMenuEnvoked(false);
  }, [id, setQualityMenuEnvoked]);

  const handleEpisode = (id) => () => {
    setId(id);
    setQualityMenuEnvoked(true);
  };

  return (
    <>
      {!isQualityMenuEnvoked ? (
        <MotiView
          from={{ translateX: 100 }}
          animate={{ translateX: 0 }}
          transition={{ type: "timing", duration: 500 }}
          style={styles.container}
        >
          <StyledText isBold={true} size={20} style={styles.headerText}>
            Episodes
          </StyledText>
          <View style={styles.episodeList}>
            {data.map((item) => (
              <EpisodeData
                onPress={handleEpisode(item.id)}
                key={item.id}
                result={item}
              />
            ))}
          </View>
        </MotiView>
      ) : (
        <View style={styles.qualitySection}>
          <TouchableOpacity
            onPress={() => setQualityMenuEnvoked(false)}
            style={styles.back}
          >
            <FontAwesome6 name="xmark" color={"white"} size={20} />
          </TouchableOpacity>
          <StyledText size={20} isCentered={true} isBold={true}>
            Select Quality
          </StyledText>
          <ScrollView style={{ flex: 1, marginTop: 30 }}>
            <MotiView
              from={{ translateY: 100, opacity: 0 }}
              animate={{ translateY: 0, opacity: 1 }}
              transition={{ type: "timing", duration: 1000 }}
              style={styles.qualityMenu}
            >
              {isLoading ? (
                <LottieLoader />
              ) : (
                videoQualityData.map((item) => (
                  <QualityData key={item.url} result={item} episodeID={id} />
                ))
              )}
            </MotiView>
          </ScrollView>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  back: {
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: "#1a1a1a",
    padding: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
    justifyContent: "center",
    zIndex: 1000,
  },
  headerText: {
    marginLeft: 10,
  },
  episodeList: {
    flex: 1,
    marginTop: 10,
    gap: 20,
    paddingBottom: 100,
  },
  qualitySection: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderRadius: 20,
    height: 400,
    padding: 30,
    backgroundColor: "black",
    zIndex: 9999,
  },
  qualityMenu: {
    marginVertical: 20,
    gap: 20,
  },
});

export default StreamingPage;
