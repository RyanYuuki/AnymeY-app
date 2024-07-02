import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";

const MangaReader = () => {
  const { id, title, Manga, chaptersInfo } = useLocalSearchParams();
  return (
    <ScrollView>
      <Text>ID: {id}</Text>
      <Text>Title: {title}</Text>
      <Text>Manga: {Manga}</Text>
    </ScrollView>
  );
};

export default MangaReader;
