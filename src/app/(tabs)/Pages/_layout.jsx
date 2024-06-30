import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useTheme } from "@/provider/ThemeProvider";
import { FontAwesome } from "@expo/vector-icons";
import { View } from "react-native";
export default function TabLayout() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.tabIconSelected,
        tabBarStyle: {
          marginHorizontal: '20%',
          position: 'absolute',
          width: "60%",
          bottom: 10,
          borderRadius: 30,
          height: 70,
          justifyContent: "center",
          backgroundColor: theme.btnBackground,
          borderTopColor: 'transparent',
          overflow: 'hidden',
        },
        tabBarItemStyle: {
          paddingVertical: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
      initialRouteName="Home"
      backBehavior="initialRoute"
    >
      <Tabs.Screen
        name="Manga"
        options={{
          title: "Manga",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "book" : "book-outline"}
              size={23}
              color={focused ? theme.tabIconSelected : theme.tabIconDefault}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Home"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name={'home'}
              size={23}
              color={focused ? theme.tabIconSelected : theme.tabIconDefault}
              solid={true}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Anime"
        options={{
          title: "Anime",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "film" : "film-outline"}
              size={23}
              color={focused ? theme.tabIconSelected : theme.tabIconDefault}
            />
          ),
        }}
      />
    </Tabs>
  );
}
