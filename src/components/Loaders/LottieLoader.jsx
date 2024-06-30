import { View, Text } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
const LottieLoader = () => {
  return (
    <View style={{ flex : 1, backgroundColor: 'transprent' }}>
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