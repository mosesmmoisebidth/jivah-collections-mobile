import React, { useState } from "react";
import { TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { auth } from "@/utils/firebase";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { router } from "expo-router";
import tw from "twrnc";
import Toast from "react-native-toast-message";
import { OutfitText } from "../StyledText";
import ApiService from "@/services/api";
import StorageService from "@/services/storage";
import AppImages from "@/utils/constants/images";
import * as Google from "expo-google-app-auth";

const GoogleAuth = () => {
  const [loggingInGoogle, setLoggingInGoogle] = useState(false);

  const handleGoogleLogin = async () => {
    setLoggingInGoogle(true);
    try {
      // Google sign-in via Firebase (does not require manual client IDs)
      const { type } = await Google.logInAsync({
        scopes: ["profile", "email"], // Default Google scopes
      });
      const idToken = "Afdfasdfas";

      if (type === "success") {
        const credential = GoogleAuthProvider.credential(idToken);
        const result = await signInWithCredential(auth, credential);
        const token = await result.user.getIdToken();

        const res = await ApiService.unauthorized.post("/auth/social/login", {
          token,
        });

        await StorageService.saveData("accessToken", res.data.data.accessToken);
        await StorageService.saveData(
          "refreshToken",
          res.data.data.refreshToken
        );

        Toast.show({
          type: "success",
          text1: "Login Successful",
          text2: "You have logged in successfully!",
        });

        router.push("/(tabs)/Home");
      } else {
        // Handle cancelled login
        Toast.show({
          type: "info",
          text1: "Login Cancelled",
          text2: "You cancelled the Google login.",
        });
      }
    } catch (error: any) {
      console.error("Google Sign-In error:", error);
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: error?.message ?? "There was an error during login.",
      });
    } finally {
      setLoggingInGoogle(false);
    }
  };

  return (
    <TouchableOpacity
      onPress={handleGoogleLogin}
      disabled={loggingInGoogle}
      style={tw`py-4 px-6 rounded-2xl border border-gray-300 flex flex-row items-center justify-center gap-3`}
    >
      {loggingInGoogle && (
        <ActivityIndicator size="small" color="white" style={tw`mr-2`} />
      )}
      <Image
        source={AppImages.googleIcon}
        resizeMode="contain"
        style={tw`w-5 h-5`}
      />
      <OutfitText>Continue with Google</OutfitText>
    </TouchableOpacity>
  );
};

export default GoogleAuth;
