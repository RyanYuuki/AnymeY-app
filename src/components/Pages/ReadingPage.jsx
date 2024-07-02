import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
} from "react-native";
import { StyledText } from "../Common/Themed";
import EpisodeData from "../Anime/EpisodeData";
const ReadingPage = ({ data }) => {
  const [id, setId] = useState(null);

  const handleChapter = (id) => () => {
    setId(id);
  };

  return (
        <ScrollView style={styles.container}>
          <StyledText isBold={true} size={20} style={styles.headerText}>
            Chapters
          </StyledText>
          <View style={styles.episodeList}>
            {data.map((item) => (
              <EpisodeData
                onPress={handleChapter(item.id)}
                key={item.id}
                result={item}
              />
            ))}
          </View>
        </ScrollView>
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

export default ReadingPage;
