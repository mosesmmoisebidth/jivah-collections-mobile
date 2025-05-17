import React, { useState } from "react";
import { TouchableOpacity, Image, ActivityIndicator } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { makeRedirectUri } from "expo-auth-session";
import {
  signInWithCredential,
  GoogleAuthProvider,
  getAuth,
} from "firebase/auth";
import { useRouter } from "expo-router";
import tw from "twrnc";
import Toast from "react-native-toast-message";
import { OutfitText } from "../StyledText";
import ApiService from "@/services/api";
import StorageService from "@/services/storage";
import AppImages from "@/utils/constants/images";
import { initializeApp } from "firebase/app";
import Constants from "expo-constants";

const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.firebaseApiKey || "",
  authDomain: Constants.expoConfig?.extra?.firebaseAuthDomain || "",
  projectId: Constants.expoConfig?.extra?.firebaseProjectId || "",
  storageBucket: Constants.expoConfig?.extra?.firebaseStorageBucket || "",
  messagingSenderId:
    Constants.expoConfig?.extra?.firebaseMessagingSenderId || "",
  appId: Constants.expoConfig?.extra?.firebaseAppId || "",
  measurementId: Constants.expoConfig?.extra?.firebaseMeasurementId || "",
};

const app = initializeApp(firebaseConfig);
const authP = getAuth(app);
WebBrowser.maybeCompleteAuthSession();

const GoogleAuth = () => {
  const [loggingInGoogle, setLoggingInGoogle] = useState(false);
  const router = useRouter();

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      "328033865017-94m272euooc3irf8d9n8t8vd7uj75tvb.apps.googleusercontent.com",
    redirectUri: makeRedirectUri(),
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(authP, credential)
        .then(async (result) => {
          const token = await result.user.getIdToken();

          const res = await ApiService.unauthorized.post("/auth/social/login", {
            token,
          });

          await StorageService.saveData(
            "accessToken",
            res.data.data.accessToken
          );
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
        })
        .catch((error) => {
          console.error("Google Sign-In error:", error);
          Toast.show({
            type: "error",
            text1: "Login Failed",
            text2: error?.message ?? "There was an error during login.",
          });
        })
        .finally(() => {
          setLoggingInGoogle(false);
        });
    } else if (response?.type === "error") {
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: "There was an error during login.",
      });
      setLoggingInGoogle(false);
    }
  }, [response]);

  const handleGoogleLogin = async () => {
    setLoggingInGoogle(true);
    await promptAsync();
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
