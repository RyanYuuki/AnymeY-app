import React from 'react'
import { Stack } from 'expo-router'
import { ThemeProvider } from '@/provider/ThemeProvider'
const _layout = () => {
  return (
    <ThemeProvider>
    <Stack>
      <Stack.Screen name="Pages" options={{ headerShown: false }} />
      <Stack.Screen name="Search/AnimeSearch" options={{ headerShown: false }} />
      <Stack.Screen name="Search/MangaSearch" options={{ headerShown: false }} />
      <Stack.Screen name="Context/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="Context/Player/[id]" options={{ headerShown: false }} />
    </Stack>
  </ThemeProvider>
  )
}

export default _layout