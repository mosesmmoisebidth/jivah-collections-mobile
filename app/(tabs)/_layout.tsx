import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Entypo, MaterialIcons } from "@expo/vector-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#c48647", // Active tab color
        headerShown: false, // Hide header
        tabBarButton: HapticTab, // Custom tab button component
        tabBarBackground: TabBarBackground, // Custom background for the tab bar
        tabBarHideOnKeyboard: true, // Hide tab bar when keyboard is visible
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
            paddingVertical: 10,
            paddingHorizontal: 10,
            height: 60, // Height for iOS
          },
          default: {
            paddingVertical: 10,
            paddingHorizontal: 10,
            height: 60, // Height for other platforms (Android)
          },
        }),
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="OurShop"
        options={{
          title: "Our Shop",
          tabBarIcon: ({ color }) => (
            <Entypo name="shop" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Categories"
        options={{
          title: "Category",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="category" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Account"
        options={{
          title: "Account",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="account-circle" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
