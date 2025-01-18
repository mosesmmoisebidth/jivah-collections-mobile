import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import {
  OutfitBold,
  OutfitSemibold,
  OutfitText,
} from "@/components/StyledText";
import TextInput from "@/components/app/TextInput";
import Separator from "@/components/app/Separator";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AppImages from "@/utils/constants/images";
import AuthService from "@/services/api/auth";

const SignIn = () => {
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
    const usernameRegex = /^[A-Za-z0-9_]{4,}$/; // Username should be at least 4 chars and alphanumeric

    if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address .";
      isValid = false;
    } else {
      newErrors.email = undefined;
    }

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(formData.password.trim())) {
      ("Password must be at least 8 characters long and include at least one letter and one number.");
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
      router.push("/(tabs)/Home");
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

  return (
    <ScrollView>
      <SafeAreaView>
        <View style={tw`flex-col gap-5 justify-center px-7 py-20 h-full`}>
          <OutfitBold style={tw`text-2xl`}>Login</OutfitBold>

          <View style={tw`flex-col gap-3 py-6`}>
            <TextInput
              label_name="Email"
              placeholder="eg:johndoe@gmail.com"
              value={formData.email}
              onChangeText={(value) => handleInputChange("email", value)}
              type="text"
              label={true}
              prefixIcon={<Ionicons name="mail" size={20} color="gray" />}
              errorMessage={errors.email}
            />
            <TextInput
              label_name="Password"
              placeholder="eg:********"
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
              disabled={isLoading} // Disable button while loading
              style={tw`p-4 font-semibold text-2xl ${
                isLoading ? "bg-gray-400" : "bg-[#c48647]"
              } flex justify-center items-center rounded-full`}
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
                  {!isLoading && "Login"}
                </OutfitText>
              </View>
            </TouchableOpacity>

            <OutfitText style={tw`text-right`}>Forgot Password?</OutfitText>

            <View style={tw`w-full flex-row items-center gap-3`}>
              <View style={styles.line} />
              <OutfitText style={tw`w-[10%] text-center`}>OR</OutfitText>
              <View style={styles.line} />
              <Separator />
            </View>

            <View style={tw`w-full flex-row justify-around gap-4`}>
              <View style={tw`py-4 px-6 rounded-lg border border-gray-300`}>
                <Image
                  source={AppImages.fbIcon}
                  resizeMode="contain"
                  style={tw`w-5 h-5`}
                />
              </View>
              <View style={tw`py-4 px-6 rounded-lg border border-gray-300`}>
                <Image
                  source={AppImages.googleIcon}
                  resizeMode="contain"
                  style={tw`w-5 h-5`}
                />
              </View>
              <View style={tw`py-4 px-6 rounded-lg border border-gray-300`}>
                <Image
                  source={AppImages.appleIcon}
                  resizeMode="contain"
                  style={tw`w-5 h-5`}
                />
              </View>
            </View>

            <OutfitText style={tw`text-center mt-10`}>
              Don't have an account ?{" "}
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
    height: 1, // Thickness of the line
    backgroundColor: "gray", // Line color
    marginVertical: 10, // Spacing around the line
    width: "40%",
  },
});
