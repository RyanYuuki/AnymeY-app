import { FlatList, ScrollView, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useTheme } from "@/provider/ThemeProvider";
import { StyledInput, StyledText } from "@/components/Common/Themed";
import { Ionicons } from "@expo/vector-icons";
import SearchItem from "@/components/Common/SearchItem";
import LottieView from "lottie-react-native";
const Search = () => {
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState(null);
  const [isSearchPressed, setIsSearchPressed] = useState(false);
  const [searchedData, setSearchedData] = useState(null);
  useEffect(() => {
    const searchQueries = async () => {
      if(searchValue) {
      const response = await fetch(
        `https://consumet-api-two-nu.vercel.app/meta/anilist/${searchValue}`
      );
      const result = await response.json();
      if (result && result.results && result.results.length > 0) {
        setSearchedData(result.results);
        setIsLoading(false);
      }
    }
    };
    searchQueries();
  }, [searchValue]);

  return (
    <ScrollView
      contentContainerStyle={{ padding: 30 }}
      style={[styles.screen, { backgroundColor: theme.background }]}
    >
      <View style={styles.inputBox}>
        <StyledInput
          onFocus={() => setIsSearchPressed(!isSearchPressed)}
          value={searchValue}
          onChangeValue={(text) => setSearchValue(text)}
          style={{
            ...styles.input,
            borderColor: isSearchPressed
              ? theme.primary
              : searchValue
              ? theme.primary
              : "grey",
          }}
        />
        <StyledText
          color={
            isSearchPressed
              ? theme.primary
              : searchValue
              ? theme.primary
              : "white"
          }
          style={[
            styles.label,
            { top: isSearchPressed ? "25%" : searchValue ? "25%" : "55%" },
          ]}
        >
          ANIME
        </StyledText>
        <Ionicons
          name="search"
          color={isSearchPressed ? theme.primary : theme.text}
          style={{ position: "absolute", right: 30, top: 47 }}
          size={28}
        />
      </View>
      <View style={styles.body}>
        <StyledText isBold={true} style={{ marginVertical: 30 }} size={20}>
          Search Results
        </StyledText>
        {isLoading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <LottieView
              style={{ width: 200, height: 200 }}
              source={require("@/assets/Animations/loading.json")}
              autoPlay
              loop
            />
          </View>
        ) : (
          <View style={{ flexGrow: 1, gap: 20 }}>
            {searchedData.map((data) => (
              <SearchItem result={data} />
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = {
  screen: {
    flexGrow: 1,
  },
  inputBox: {
    width: "100%",
  },
  input: {
    width: "95%",
    height: 60,
    borderRadius: 30,
    marginTop: "10%",
    paddingLeft: 20,
    borderWidth: 2,
  },
  label: {
    left: "10%",
    position: "absolute",
    backgroundColor: "black",
    zIndex: 100,
    paddingHorizontal: 5,
  },
};

export default Search;
