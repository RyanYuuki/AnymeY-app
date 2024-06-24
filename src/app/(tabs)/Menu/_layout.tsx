import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import themes from "@/constants/Colors";
import { useTheme } from "../../../provider/ThemeProvider";

export default function TabLayout() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: theme.background,
        },
        headerTitleAlign: 'center',
        headerTitleStyle: { 
          color: theme.text,
        },
        tabBarActiveTintColor: theme.tabIconSelected,
        tabBarStyle: {
          marginHorizontal: '20%',
          position: 'absolute',
          width: "60%",
          bottom: 10,
          borderRadius: 30,
          height: 70,
          justifyContent: "center",
          backgroundColor: theme.tabBackground,
          borderTopColor: 'transparent',
        },
        tabBarItemStyle: {
          paddingVertical: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        headerRight: () => (
          <Ionicons
            name={theme === themes.light ? "moon" : "sunny"}
            size={23}
            color={theme.text}
            onPress={toggleTheme}
            style={{
              marginRight: 20,
              borderRadius: 50,
              borderColor: theme === themes.light ? '#eee' : '#1A1A1A',
              borderWidth: 1,
              elevation: 100,
              padding: 10,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: theme.background,
            }}
          />
        ),
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
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={23}
              color={focused ? theme.tabIconSelected : theme.tabIconDefault}
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
