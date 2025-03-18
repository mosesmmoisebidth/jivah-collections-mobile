import { Tabs, Redirect } from "expo-router";
import React, { useEffect, useState } from "react";
import { Platform, View } from "react-native";
import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import StorageService from "@/services/storage";
import { WaveIndicator } from "react-native-indicators";

export default function TabLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState<any>(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const accessToken = await StorageService.getData("accessToken");
        setIsAuthenticated(!!accessToken);
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    };

    checkAuthStatus();
  }, []);

  if (isAuthenticated === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <WaveIndicator color="#c48647" size={60} />
      </View>
    );
  }

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#c48647",
        headerShown: false,
        tabBarBackground: TabBarBackground,
        tabBarHideOnKeyboard: true,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
            paddingVertical: 10,
            paddingHorizontal: 10,
            height: 60,
          },
          default: {
            paddingVertical: 10,
            paddingHorizontal: 10,
            height: 60,
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
        name="Orders"
        options={{
          title: "Orders",
          tabBarIcon: ({ color }) => (
            <Ionicons name="clipboard" size={28} color={color} />
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
