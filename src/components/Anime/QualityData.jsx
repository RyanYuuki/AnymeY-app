import { StyleSheet } from "react-native";
import React from "react";
import { StyledButton } from "../Common/Themed";
import { Link } from "expo-router";
const QualityData = ({ result, episodeID }) => {
  return (
    <Link href={{
      pathname: `/Context/Player/[id]`,
      params: {
        title: result?.title || episodeID,
        id : episodeID,
        quality : result.quality,
        url : result.url
      }}} asChild>
      <StyledButton textStyle={{textTransform: 'uppercase' }} buttonStyle={styles.button}>{result.quality || 'Yoo'}</StyledButton>
    </Link>
  );
};

const styles = StyleSheet.create({
  button: {
    alignSelf: "center",
    width: '100%',
    paddingVertical: 15,
    borderRadius: 20,

  },
});

export default QualityData;
