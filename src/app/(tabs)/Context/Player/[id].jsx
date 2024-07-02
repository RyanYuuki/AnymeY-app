import { Video } from "expo-av";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Dimensions
} from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import { Ionicons } from "@expo/vector-icons";
import { StyledText } from "@/components/Common/Themed";
import Slider from "@react-native-community/slider";
import { useTheme } from "@/provider/ThemeProvider";
import { useLocalSearchParams } from "expo-router";
import { router } from "expo-router";
import * as NavigationBar from "expo-navigation-bar";
import LottieView from "lottie-react-native";
import { StatusBar } from "expo-status-bar"; // Importing StatusBar from expo-status-bar

export default function VideoPlayer() {
  // Important
  const { id, quality, url, title } = useLocalSearchParams();
  const { theme } = useTheme();
  const video = useRef(null);
  // END

  // VIDEO PLAYER STATES
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMenuToggled, setMenuToggle] = useState(false);
  const [videoDuration, setVideoDuration] = useState(null);
  const [seekBar, setSeekBar] = useState(0);
  const [currentTime, setCurrentTime] = useState("00:00");
  const [endTime, setEndTime] = useState("00:00");
  const resizeModes = ["contain", "cover", "stretch"];
  const [resizeMode, setResizeMode] = useState(resizeModes[0]);
  const animation = useRef(null);
  //END

  useEffect(() => {
    // Lock screen orientation and hide the system status bar to allow video to occupy the notch area
    NavigationBar.setVisibilityAsync("hidden"), 2000;
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  const handlePlayback = async () => {
    try {
      if (isPlaying) {
        await video.current.playAsync();
        animation.current.play(30, 59);
      } else {
        await video.current.pauseAsync();
        animation.current.play(0, 29);
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error("Playback error:", error);
    }
  };

  const toggleResizeMode = () => {
    setResizeMode(
      resizeModes[(resizeModes.indexOf(resizeMode) + 1) % resizeModes.length]
    );
  };

  const handleSeek = async (value) => {
    try {
      const newPositionMillis = value * videoDuration;
      await video.current.setPositionAsync(newPositionMillis);
      setSeekBar(value);
    } catch (error) {
      console.error("Error seeking video:", error);
    }
  };

  const handleButton = async (value) => {
    const newPositionMillis = seekBar * videoDuration + value;
    await video.current.setPositionAsync(newPositionMillis);
    setSeekBar(newPositionMillis / videoDuration);
  };

  const handleMenu = () => {
    setMenuToggle((toggle) => !toggle);
  };

  if (!url && !videoDuration) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <LottieView
          style={{ width: 100, height: 100 }}
          source={require("@/assets/Animations/loading.json")}
          autoPlay
          loop
        />
      </View>
    );
  }

  return (
    <Pressable onPress={handleMenu} style={styles.container}>
      <StatusBar hidden />

      <View
        style={[
          styles.overlay,
          {
            backgroundColor: isMenuToggled
              ? "rgba(0, 0, 0, 0.8)"
              : "transparent",
          },
        ]}
      ></View>
      <View
        style={[styles.fullMenu, { display: isMenuToggled ? "flex" : "none" }]}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={30} color="white" />
          </TouchableOpacity>
          <StyledText
            NotTruncated={true}
            style={{ textTransform: "capitalize" }}
            isBold={true}
          >
            {title || id}
          </StyledText>
        </View>
        <View style={styles.controls}>
          <TouchableOpacity
            onPress={() => handleButton(-10000)}
            style={styles.playPauseButton}
          >
            <Ionicons name={"play-back"} size={30} color={"white"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.playPauseButton}
            onPress={handlePlayback}
          >
            <LottieView
              ref={animation}
              style={{ height: 120, width: 120 }}
              progress={0.5}
              source={require("@/assets/Animations/playpause.json")}
              loop={false}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleButton(10000)}
            style={styles.playPauseButton}
          >
            <Ionicons name={"play-forward"} size={30} color={"white"} />
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <View style={styles.progress}>
            <StyledText style={styles.seekBarText}>{currentTime} /</StyledText>
            <StyledText color={"grey"} style={styles.seekBarText}>
              {endTime}
            </StyledText>
          </View>
          <Slider
            style={[styles.seekBar, { opacity: isMenuToggled ? 1 : 0 }]}
            thumbTintColor={theme.primary}
            minimumTrackTintColor={theme.primary}
            maximumTrackTintColor={"white"}
            minimumValue={0}
            maximumValue={1}
            value={seekBar}
            onValueChange={handleSeek}
          />
          <View style={styles.extraFeatures}>
            <TouchableOpacity
              style={styles.resizeModeButton}
              onPress={toggleResizeMode}
            >
              <Ionicons color={"white"} name="expand-outline" size={28}></Ionicons>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Video
        ref={video}
        source={{ uri: url }}
        shouldPlay={isPlaying}
        resizeMode={resizeMode}
        onPlaybackStatusUpdate={(status) => {
          if (!status.isLoaded) {
            setCurrentTime("00:00");
            setEndTime("00:00");
            setVideoDuration(null);
            setSeekBar(0);
            return;
          }
          console.log(status);
          const durationMillis = status.durationMillis;
          const positionMillis = status.positionMillis;
          const durationSeconds = Math.floor(durationMillis / 1000);
          const positionSeconds = Math.floor(positionMillis / 1000);
          const durationMinutes = Math.floor(durationSeconds / 60);
          const positionMinutes = Math.floor(positionSeconds / 60);
          setCurrentTime(
            `${positionMinutes.toString().padStart(2, "0")}:${(
              positionSeconds % 60
            )
              .toString()
              .padStart(2, "0")}`
          );
          setEndTime(
            `${durationMinutes.toString().padStart(2, "0")}:${(
              durationSeconds % 60
            )
              .toString()
              .padStart(2, "0")}`
          );
          setVideoDuration(status.durationMillis);
          setSeekBar(status.positionMillis / status.durationMillis);
        }}
        useNativeControls={true}
        style={styles.video}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: '100%',
    height: '100%',
    backgroundColor: "#000",
    zIndex: 2,
    marginLeft: 10,
  },
  overlay: {
    position: "absolute",
    height: "100%",
    width: "100%",
    zIndex: 3,
  },
  fullMenu: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    height: "100%",
    width: "100%",
    paddingHorizontal: 20,
    zIndex: 4,
  },
  header: {
    width: "100%",
    height: '20%',
    alignItems: "center",
    backgroundColor: "transparent",
    flexDirection: "row",
    gap: 20,
    zIndex: 2,
  },
  controls: {
    // Body
    height: "60%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 50,
    zIndex: 2,
    marginLeft: 10,
  },
  footer: {
    height: '20%',
    width: "100%",
  },
  playPauseButton: {},
  seekBar: {
    width: "95%",
    alignSelf: "center",
  },
  progress: {
    width: "100%",
    flexDirection: "row",
    marginLeft: 40,
    gap: 5,
  },
  extraFeatures: {
    width: "95%",
    alignItems: "flex-end",
  },
  resizeModeButton: {},
  closeButton: {},
  playPauseButtonText: {},
});
