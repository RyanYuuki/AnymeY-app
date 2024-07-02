import React from 'react'
import { Stack } from 'expo-router'
import { ThemeProvider } from '@/provider/ThemeProvider'
const _layout = () => {
  return (
    <ThemeProvider>
    <Stack>
      <Stack.Screen name="Pages" options={{ headerShown: false, animation: 'slide_from_bottom' }} />
      <Stack.Screen name="Search/AnimeSearch" options={{ headerShown: false, animation: 'slide_from_bottom' }} />
      <Stack.Screen name="Search/MangaSearch" options={{ headerShown: false, animation: 'slide_from_bottom' }} />
      <Stack.Screen name="Context/[id]" options={{ headerShown: false, animation: 'slide_from_bottom' }} />
      <Stack.Screen name="Context/Player/[id]" options={{ headerShown: false, animation: 'slide_from_bottom' }} />
    </Stack>
  </ThemeProvider>
  )
}

export default _layout