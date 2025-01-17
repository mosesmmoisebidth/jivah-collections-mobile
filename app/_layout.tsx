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
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    OutfitMain: require("../assets/fonts/Outfit-Regular.ttf"),
    OutfitSemibold: require("../assets/fonts/Outfit-SemiBold.ttf"),
    OutfitBold: require("../assets/fonts/Outfit-Bold.ttf"),
    PoppinsMain: require("../assets/fonts/Outfit-Regular.ttf"),
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
      const accessToken = await StorageService.getData("accessToken");
      setIsAuthenticated(!!accessToken);
      setIsLoading(false); // Set loading to false after checking authentication
      if (loaded) SplashScreen.hideAsync();
    };

    checkAuthentication();
  }, [loaded]);

  // Show Splash Screen while fonts are loading or authentication is being checked
  if (!loaded || isLoading) return null;

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/(tabs)/Home");
    } else {
      router.replace("/(auth)/sign-in");
    }
  }, [isAuthenticated]);

  return (
    <GestureHandlerRootView>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
      <Toast />
    </GestureHandlerRootView>
  );
}
