import {
  Image,
  SafeAreaView,
  ScrollView,
  View,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import {
  OutfitBold,
  OutfitSemibold,
  OutfitText,
} from "@/components/StyledText";
import TextInput from "@/components/app/TextInput";
import { Redirect, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AppImages from "@/utils/constants/images";
import AuthService from "@/services/api/auth";
import { WaveIndicator } from "react-native-indicators";
import StorageService from "@/services/storage";
import GoogleAuth from "@/components/auth/GoogleAuth";

const SignIn = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<any>(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const accessToken = await StorageService.getData("accessToken");
        setIsAuthenticated(accessToken != null);
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    };

    checkAuthStatus();
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: undefined,
    password: undefined,
  });

  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: any = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    } else {
      newErrors.email = undefined;
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
      isValid = false;
    } else if (!passwordRegex.test(formData.password.trim())) {
      newErrors.password =
        "Password must be at least 8 characters long and include a letter, number, and special character.";
      isValid = false;
    } else {
      newErrors.password = undefined;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    setIsLoading(true);

    await AuthService.login(formData, () => {
      router.replace("/(tabs)/Home");
    });

    setIsLoading(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    setErrors((prevErrors: any) => {
      const { [field]: _, ...rest } = prevErrors;
      return rest;
    });
  };

  if (isAuthenticated === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <WaveIndicator color="#c48647" size={60} />
      </View>
    );
  }

  if (isAuthenticated) {
    return <Redirect href="/(tabs)/Home" />;
  }

  return (
    <ScrollView>
      <SafeAreaView>
        <View
          style={tw`flex-col gap-5 justify-center items-center px-4 py-20 h-full`}
        >
          <Image
            source={require("../../assets/images/logo.png")}
            style={{ width: 100, height: 100 }}
          />
          <OutfitBold style={tw`text-3xl text-center`}>Login</OutfitBold>
          <OutfitSemibold style={tw`text-gray-500 text-center px-4`}>
            Enter your credentials to access your account securely.
          </OutfitSemibold>

          <View style={tw`flex-col gap-3 py-6`}>
            <TextInput
              label_name="Email Address"
              placeholder="Enter your email"
              value={formData.email}
              onChangeText={(value) => handleInputChange("email", value)}
              type="text"
              label={true}
              keyboardType="email-address"
              prefixIcon={<Ionicons name="mail" size={20} color="gray" />}
              errorMessage={errors.email}
            />
            <TextInput
              label_name="Password"
              placeholder="Enter your password"
              value={formData.password}
              onChangeText={(value) => handleInputChange("password", value)}
              type="password"
              label={true}
              prefixIcon={
                <Ionicons name="lock-closed" size={20} color="gray" />
              }
              errorMessage={errors.password}
            />
          </View>

          <View style={tw`flex-col gap-5`}>
            <TouchableOpacity
              onPress={handleLogin}
              disabled={isLoading}
              style={tw`p-4 font-semibold text-2xl ${
                isLoading ? "bg-[#c48647]/50" : "bg-[#c48647]"
              } flex justify-center items-center rounded-2xl`}
            >
              <View style={tw`flex-row items-center`}>
                {isLoading && (
                  <ActivityIndicator
                    size="small"
                    color="white"
                    style={tw`mr-2`}
                  />
                )}
                <OutfitText style={tw`text-white`}>
                  {isLoading ? "Logging in, please wait..." : "Login"}
                </OutfitText>
              </View>
            </TouchableOpacity>

            <OutfitText
              style={tw`text-right text-blue-500`}
              onPress={() => router.push("/(auth)/forgot-password")}
            >
              Forgot Password?
            </OutfitText>

            <View style={tw`w-full flex-row items-center gap-3`}>
              <View style={styles.line} />
              <OutfitText style={tw`w-[10%] text-center`}>OR</OutfitText>
              <View style={styles.line} />
            </View>

            <GoogleAuth />

            <OutfitText style={tw`text-center mt-10`}>
              Don't have an account?{" "}
              <OutfitSemibold
                style={tw`text-[#c48647]`}
                onPress={() => router.push("/(auth)/sign-up")}
              >
                Create One
              </OutfitSemibold>
            </OutfitText>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  line: {
    height: 1,
    backgroundColor: "gray",
    marginVertical: 10,
    width: "40%",
  },
});
