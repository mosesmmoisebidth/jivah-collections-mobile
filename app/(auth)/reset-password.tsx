import {
  Image,
  SafeAreaView,
  ScrollView,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { OutfitBold, OutfitSemibold, OutfitText } from "@/components/StyledText";
import TextInput from "@/components/app/TextInput";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AuthService from "@/services/api/auth";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    password: undefined,
    confirmPassword: undefined,
  });

  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: any = {};
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

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

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password.";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
      isValid = false;
    } else {
      newErrors.confirmPassword = undefined;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleResetPassword = async () => {
    if (!validateForm()) return;
    setIsLoading(true);

    await AuthService.resetPassword("fasd", formData.password, () => {
      router.push("/(auth)/sign-in");
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
        <View style={tw`flex-col gap-5 justify-center px-4 py-20 h-full`}>
          <OutfitBold style={tw`text-3xl text-center`}>Reset Password</OutfitBold>
          <OutfitSemibold style={tw`text-gray-500 text-center px-4`}>
            Enter a new password to secure your account.
          </OutfitSemibold>

          <View style={tw`flex-col gap-3 py-6`}>
            <TextInput
              label_name="New Password"
              placeholder="Enter your new password"
              value={formData.password}
              onChangeText={(value) => handleInputChange("password", value)}
              type="password"
              label={true}
              prefixIcon={<Ionicons name="lock-closed" size={20} color="gray" />}
              errorMessage={errors.password}
            />
            <TextInput
              label_name="Confirm Password"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChangeText={(value) => handleInputChange("confirmPassword", value)}
              type="password"
              label={true}
              prefixIcon={<Ionicons name="lock-closed" size={20} color="gray" />}
              errorMessage={errors.confirmPassword}
            />
          </View>

          <View style={tw`flex-col gap-5`}>
            <TouchableOpacity
              onPress={handleResetPassword}
              disabled={isLoading}
              style={tw`p-4 font-semibold text-2xl ${isLoading ? "bg-gray-400" : "bg-[#c48647]"} flex justify-center items-center rounded-full`}
            >
              <View style={tw`flex-row items-center`}>
                {isLoading && <ActivityIndicator size="small" color="white" style={tw`mr-2`} />}
                <OutfitText style={tw`text-white`}>
                  {isLoading ? "Updating..." : "Change Password"}
                </OutfitText>
              </View>
            </TouchableOpacity>

            <OutfitText
              style={tw`text-center text-blue-500 mt-4`}
              onPress={() => router.push("/(auth)/sign-in")}
            >
              Back to Login
            </OutfitText>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default ResetPassword;
