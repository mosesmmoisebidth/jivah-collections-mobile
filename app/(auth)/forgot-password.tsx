import {
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

const ForgotPassword = () => {
  const [formData, setFormData] = useState({ email: "" });
  const [errors, setErrors] = useState({ email: undefined });
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: any = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
      isValid = false;
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    } else {
      newErrors.email = undefined;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleResetPassword = async () => {
    if (!validateForm()) return;
    setIsLoading(true);

    await AuthService.requestResetPassword(formData.email, () => {
      router.push({
        pathname: "/(auth)/verify-otp",
        params: { email: formData.email },
      });
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
          <OutfitBold style={tw`text-3xl text-center`}>Forgot Password?</OutfitBold>
          <OutfitSemibold style={tw`text-gray-500 text-center px-4`}>
            Enter your registered email below, and we'll send you an OTP to reset your password.
          </OutfitSemibold>

          <View style={tw`flex-col gap-3 py-6`}>
            <TextInput
              label_name="Email Address"
              placeholder="Enter your email"
              value={formData.email}
              onChangeText={(value) => handleInputChange("email", value)}
              type="text"
              label={true}
              prefixIcon={<Ionicons name="mail" size={20} color="gray" />}
              errorMessage={errors.email}
            />
          </View>

          <View style={tw`flex-col gap-5`}>
            <TouchableOpacity
              onPress={handleResetPassword}
              disabled={isLoading}
              style={tw`p-4 font-semibold text-2xl ${isLoading ? "bg-[#c48647]/50" : "bg-[#c48647]"} flex justify-center items-center rounded-2xl`}
            >
              <View style={tw`flex-row items-center`}>
                {isLoading && <ActivityIndicator size="small" color="white" style={tw`mr-2`} />}
                <OutfitText style={tw`text-white`}>
                  {isLoading ? "Processing..." : "Send OTP"}
                </OutfitText>
              </View>
            </TouchableOpacity>

            <OutfitText style={tw`text-gray-500 text-center`}>
              Make sure to check your spam folder if you don't see the OTP email within a few minutes.
            </OutfitText>

            <OutfitText style={tw`text-center text-blue-500`} onPress={() => router.push("/(auth)/sign-in")}>
              Back to Login
            </OutfitText>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default ForgotPassword;
