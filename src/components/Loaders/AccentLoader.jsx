import { View, Text } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import useTheme from '@/providers/ThemeProvider';
const LottieLoader = () => {
  const { theme } = useTheme();
  return (
    <View style={{ height: '100%', width: '100%' , backgroundColor: theme.btnBackground, justifyContent: 'center', alignItems: 'center' }}>
    <LottieView
      style={{
        alignSelf: 'center',
        height: 300,
        width: 300,
      }}
      source={require("@/assets/Animations/loading2.json")}
      autoPlay
      loop
    />
  </View>
  )
}

export default LottieLoader