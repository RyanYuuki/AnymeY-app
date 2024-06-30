import { View, Text } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
const CarouselLoader = () => {
  return (
    <View style={{ flex: 1 , justifyContent: 'center', alignItems: 'center' }} >
      <LottieView style={{ width: 100, height: 100}} source={require('@/assets/Animations/loading3.json')} autoPlay loop />
    </View>
  )
}

export default CarouselLoader