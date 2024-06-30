import { View, StyleSheet, Image, Pressable } from "react-native";
import { StyledText } from "../Common/Themed";
import { useTheme } from "@/provider/ThemeProvider";

const EpisodeData = ({ result, onPress }) => {
  const { id, name, image } = result;
  const { theme } = useTheme();
  return (
      <Pressable
        onPress={onPress}
        style={[styles.container]}
      >
        <View style={[styles.row, { backgroundColor: theme.btnBackground }]}>
          <Image source={{ uri: image }} style={styles.carouselImage} />
          <View style={styles.textContainer}>
            <StyledText
              isBold={true}
              NotTruncated={true}
              style={styles.carouselText}
            >
              {name || id}
            </StyledText>
          </View>
        </View>
      </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 170,
    borderRadius: 20,
    marginBottom: 10,
    padding: 5,
  },
  row: {
    height: 150,
    flexDirection: "row",
    padding: 15,
    borderRadius: 20,
  },
  carouselImage: {
    width: 170,
    height: "100%",
    resizeMode: "cover",
    borderRadius: 20,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  carouselText: {
    fontSize: 16,
    color: "#FFFFFF",
    marginTop: 5,
    textTransform: "capitalize",
  },
});

export default EpisodeData;
