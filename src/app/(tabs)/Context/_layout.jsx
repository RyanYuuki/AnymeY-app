import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useTheme } from "../../../provider/ThemeProvider";
import { Text } from "react-native";
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
      }}
      initialRouteName="Home"
      backBehavior="initialRoute"
    >
      <Tabs.Screen
        name="[id]"
        options={{
          title: "INFO",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "information-circle" : "information-circle-outline"}
              size={23}
              color={focused ? theme.tabIconSelected : theme.tabIconDefault}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Watch"
        options={{
          title: "WATCH",
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
