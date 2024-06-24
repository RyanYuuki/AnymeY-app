import { useColorScheme } from "react-native";

export const themes = {
  light: {
    text: '#333',
    background: '#eee',
    tabIconDefault: 'black',
    tabBackground: '#eee',
    tabIconSelected: 'red',
    btnBackground: '#fff',
    inputBackground: 'rgba(255, 255, 255, 0.5)',
  },
  dark: {
    text: '#eee',
    background: 'black',
    tabBackground: '#333',
    tabIconDefault: '#ccc',
    tabIconSelected: 'red',
    btnBackground: '#1A1A1A',
    inputBackground: 'rgba(0, 0, 0, 0.5)',
  },
};

export default themes;

export function useCurrentTheme() {
  const systemColorScheme = useColorScheme();
  return systemColorScheme === 'dark' ? themes.dark : themes.light;
}
