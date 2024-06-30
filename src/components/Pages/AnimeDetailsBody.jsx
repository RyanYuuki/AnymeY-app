import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useState } from "react";
import ImageBackgroundButton from "../Common/ImageBackgroundButton";
import CarouselItem from "../Common/CarouselItem";
import Character from "../Anime/Characters";
import { useTheme } from "@/provider/ThemeProvider";
import { StyledText } from "../Common/Themed";
import { MotiView } from "moti";
const AnimeDetailsBody = ({
  data,
  characterData,
  recommendationData,
  loading,
}) => {
  const [isValid, setIsValid] = useState(true);
  const { theme } = useTheme();
  const imagesPaths = [
    require("@/assets/ButtonBackgrounds/img1.jpg"),
    require("@/assets/ButtonBackgrounds/img2.jpg"),
    require("@/assets/ButtonBackgrounds/img3.jpg"),
    require("@/assets/ButtonBackgrounds/img4.jpg"),
    require("@/assets/ButtonBackgrounds/img5.jpg"),
    require("@/assets/ButtonBackgrounds/img6.jpg"),
  ];
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
  const stripHtml = (html) => {
    return html.replace(/<\/?[^>]+(>|$)/g, "");
  };
  return (
    <MotiView
      from={{ opacity: 0, translateX: -200 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ type: "timing", duration: 1000 }}
      style={styles.body}
    >
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
              <Text style={{ color: theme.primary }}>
                {data.rating / 10 || "6.9"}
              </Text>{" "}
              / 10
            </StyledText>
            <StyledText isRightAligned={true} isBold={true}>
              {data.status || "??"}
            </StyledText>
            <StyledText isRightAligned={true} isBold={true}>
              {data.totalEpisodes || "??"}
            </StyledText>
            <StyledText isRightAligned={true} isBold={true}>
              {data.duration || "24"} Min
            </StyledText>
            <StyledText isRightAligned={true} isBold={true}>
              {data.type || "??"}
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
              {data.startDate.day || "??"}{" "}
              {figureMonth(data.startDate.month) || "??"}
              {","} {data.startDate.year || "??"}
            </StyledText>
            <StyledText isRightAligned={true} isBold={true}>
              {data.endDate.day || "??"}{" "}
              {figureMonth(data.endDate.month) || "??"}
              {","} {data.endDate.year}
            </StyledText>
          </View>
        </View>
        <StyledText style={styles.synopsis} isBold={true}>
          Synopsis
        </StyledText>
        <StyledText NotTruncated={true} style={styles.synopsis}>
          {stripHtml(data.description) || "??"}
        </StyledText>
        <View style={styles.genres}>
          <StyledText isBold={true} style={{ width: "100%" }}>
            Genres
          </StyledText>
          {data.genres.map((genre, i) => (
            <ImageBackgroundButton key={i} source={imagesPaths[i]}>
              {genre || "??"}
            </ImageBackgroundButton>
          ))}
        </View>
        <View style={styles.charactersSection}>
          <StyledText isBold={true}>Characters</StyledText>
          {loading && characterData ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
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
              data={characterData}
              renderItem={({ item }) => <Character result={item} />}
              contentContainerStyle={styles.carouselContainer}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          )}
        </View>
        <View style={styles.recommendationSection}>
          <StyledText isBold={true}>Recommended</StyledText>
          {loading && !data.recommendations ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
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
              data={recommendationData}
              renderItem={({ item }) => <CarouselItem result={item} />}
              contentContainerStyle={styles.carouselContainer}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          )}
        </View>
      </View>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  fullAnimeInfo: {
    padding: 30,
  },
  genres: {
    paddingVertical: 20,
    width: "100%",
    gap: 10,
    flexWrap: "wrap",
    flexDirection: "row",
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

export default AnimeDetailsBody;
