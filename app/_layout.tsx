import StorageService from "@/services/storage";
import NotificationsService from "@/services/api/notifications";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useCallback } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
// import "react-native-reanimated";
import Toast from "react-native-toast-message";
import * as Notifications from "expo-notifications";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    OutfitMain: require("../assets/fonts/Outfit-Regular.ttf"),
    OutfitSemibold: require("../assets/fonts/Outfit-SemiBold.ttf"),
    OutfitBold: require("../assets/fonts/Outfit-Bold.ttf"),
    PoppinsMain: require("../assets/fonts/Poppins-Regular.ttf"),
  });

  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
        setAppReady(true);
      }
    };

    initializeApp();
  }, [fontsLoaded]);

  useEffect(() => {
    NotificationsService.registerForPushNotifications();

    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("Notification received:", notification);
      }
    );

    return () => subscription.remove();
  }, []);

  if (!appReady) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={DefaultTheme}>
        <Stack initialRouteName="(tabs)">
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
          <Stack.Screen name="(auth)/index" options={{ headerShown: false }} />
          <Stack.Screen
            name="categories/[category]"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(auth)/sign-in"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(auth)/forgot-password"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(auth)/reset-password"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(auth)/sign-up"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="About" options={{ headerShown: false }} />
          <Stack.Screen
            name="ChangePassword"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Profile" options={{ headerShown: false }} />
          <Stack.Screen name="Cart" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
        <Toast />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
