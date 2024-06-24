import React from 'react'
import { Stack } from 'expo-router'
import { ThemeProvider } from '@/provider/ThemeProvider'
const _layout = () => {
  return (
    <ThemeProvider>
    <Stack>
      <Stack.Screen name="Menu" options={{ headerShown: false }} />
      <Stack.Screen name="[id]" options={{ headerShown: false }} />
    </Stack>
  </ThemeProvider>
  )
}

export default _layout