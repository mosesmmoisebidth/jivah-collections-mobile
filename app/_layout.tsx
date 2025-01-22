import React, { useState, useEffect } from "react";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import "react-native-gesture-handler";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Stack, useRouter } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import StorageService from "@/services/storage";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    OutfitMain: require("../assets/fonts/Outfit-Regular.ttf"),
    OutfitSemibold: require("../assets/fonts/Outfit-SemiBold.ttf"),
    OutfitBold: require("../assets/fonts/Outfit-Bold.ttf"),
    PoppinsMain: require("../assets/fonts/Outfit-Regular.ttf"),
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAppReady, setIsAppReady] = useState(false); // New state to track when the app is fully ready
  const router = useRouter();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const accessToken = await StorageService.getData("accessToken");
        setIsAuthenticated(!!accessToken);
      } catch (error) {
        console.error("Error checking authentication:", error);
      } finally {
        setIsAppReady(true); // Indicate that the app is ready to render
        if (fontsLoaded) await SplashScreen.hideAsync(); // Hide splash screen after app is ready
      }
    };

    if (fontsLoaded) {
      initializeApp();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    if (isAppReady) {
      if (isAuthenticated) {
        router.replace("/(tabs)/Home");
      } else {
        router.replace("/(auth)/sign-in");
      }
    }
  }, [isAuthenticated, isAppReady]);

  if (!fontsLoaded || !isAppReady) return null; // Wait until fonts are loaded and app is ready

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack initialRouteName={isAuthenticated ? "(tabs)" : "(auth)"}>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="About" options={{ headerShown: false }} />
          <Stack.Screen name="ChangePassword" options={{ headerShown: false }} />
          <Stack.Screen name="Profile" options={{ headerShown: false }} />
          <Stack.Screen name="Cart" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
      <Toast />
    </GestureHandlerRootView>
  );
}
