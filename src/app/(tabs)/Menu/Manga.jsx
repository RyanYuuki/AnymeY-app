import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useTheme } from "../../../provider/ThemeProvider";
const Manga = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <View style={{ ...styles.container, backgroundColor: theme.background }} >
      <Text>Manga</Text>
    </View>
  )
}

const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})

export default Manga