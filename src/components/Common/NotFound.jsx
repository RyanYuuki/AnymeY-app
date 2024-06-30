import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useTheme } from '../../provider/ThemeProvider'
import { StyledText, StyledButton } from './Themed';
import LottieView from 'lottie-react-native';
import { router } from 'expo-router';
const NotFound = () => {
    const { theme } = useTheme();
  return (
    <View style={[styles.screen, { backgroundColor: theme.background } ]}>
        <LottieView style={styles.error} source={require('@/assets/Animations/404.json')} autoPlay loop />
        <StyledText>Data Not Found</StyledText>
        <StyledText size={16} color={'grey'} NotTruncated={true} isCentered={true} >Please check your internet connection or try again later.</StyledText>
        <StyledButton onPress={() => router.back()  } buttonStyle={styles.button} >Go To Home Page</StyledButton>
    </View>
  )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    error: {
        width: 200,
        height: 200
    },
    button : {
        padding: 20,
        borderRadius : 20,
        marginTop : 20,
    }
})

export default NotFound