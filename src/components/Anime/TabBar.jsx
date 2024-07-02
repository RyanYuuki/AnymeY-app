import React from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { useTheme } from "../../provider/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "../../provider/QueryProvider";
import { StyledText } from "../Common/Themed";

const TabBar = ({ isManga }) => {
  const { theme } = useTheme();
  const { isSearchSelected, setSearchSelected } = useQuery();

  return (
    <View style={[styles.tabBar, { backgroundColor: theme.background }]}>
      <Pressable
        onPress={() => setSearchSelected(false)}
        style={styles.tabBarItem}
      >
        <Ionicons
          name={"information-circle"}
          style={{
            ...styles.icons,
            backgroundColor: isSearchSelected ? "transparent" : theme.primary,
          }}
          size={30}
          color={isSearchSelected ? "grey" : theme.text}
        />
        <StyledText
          color={isSearchSelected ? "grey" : theme.text}
          size={13}
          isBold={true}
          style={{
            marginTop: 5,
          }}
        >
          INFO
        </StyledText>
      </Pressable>
      <Pressable
        onPress={() => setSearchSelected(true)}
        style={styles.tabBarItem}
      >
        <Ionicons
          name={"film"}
          style={{
            ...styles.icons,
            backgroundColor: isSearchSelected ? theme.primary : "transparent",
          }}
          size={30}
          color={isSearchSelected ? theme.text : "grey"}
        />
        <StyledText
          isBold={true}
          size={13}
          color={isSearchSelected ? theme.text : "grey"}
          style={{
            marginTop: 5,
          }}
        >
          WATCH
        </StyledText>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "60%",
    bottom: 20,
    padding: 10,
    zIndex: 1,
    alignSelf: 'center',
    borderRadius: 50
  },
  icons: {
    borderRadius: 50,
    overflow: "hidden",
    padding: 5,
    paddingHorizontal: 20,
  },
  tabBarItem: {
    flex: 1,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TabBar;
