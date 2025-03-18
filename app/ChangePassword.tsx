import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import tw from "twrnc";
import { OutfitSemibold, OutfitText } from "@/components/StyledText";
import { Ionicons } from "@expo/vector-icons";
import AppTextInput from "@/components/app/TextInput";
import Header from "@/components/app/Header";
import AuthService from "@/services/api/auth";
import { router } from "expo-router";

const mainColor = "#c48647";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const validatePassword = (password: string): string => {
    if (password.length < 8) {
      return "Password must be at least 8 characters long.";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must include an uppercase letter.";
    }
    if (!/[a-z]/.test(password)) {
      return "Password must include a lowercase letter.";
    }
    if (!/[0-9]/.test(password)) {
      return "Password must include a number.";
    }
    if (!/[@$!%*?&]/.test(password)) {
      return "Password must include a special character.";
    }
    return "";
  };

  const validateForm = (): boolean => {
    const newErrors = {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    };

    if (!formData.currentPassword) {
      newErrors.currentPassword = "Current password is required.";
    } else {
      newErrors.currentPassword = validatePassword(formData.currentPassword);
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required.";
    } else {
      newErrors.newPassword = validatePassword(formData.newPassword);
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setIsLoading(true);
    await AuthService.changePassword({ oldPassword: formData.currentPassword, newPassword: formData.newPassword }, () => {
      router.back();
    });
    setIsLoading(false);
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white pt-6`}>
      <Header title="Change Password" back />
      <ScrollView contentContainerStyle={tw`px-4 pb-4`}>
        <View style={tw`py-6 gap-y-3`}>

          <AppTextInput
            label
            label_name="Current Password"
            placeholder="Enter your current password please"
            value={formData.currentPassword}
            onChangeText={(text) => handleInputChange("currentPassword", text)}
            type="password"
            errorMessage={errors.currentPassword}
          />

          <AppTextInput
            label
            label_name="New Password"
            placeholder="Enter a new password"
            value={formData.newPassword}
            onChangeText={(text) => handleInputChange("newPassword", text)}
            type="password"
            errorMessage={errors.newPassword}
          />

          <AppTextInput
            label
            label_name="Confirm Password"
            placeholder="Confirm your new password"
            value={formData.confirmPassword}
            onChangeText={(text) => handleInputChange("confirmPassword", text)}
            type="password"
            errorMessage={errors.confirmPassword}
          />

          <TouchableOpacity
            onPress={handleSubmit}
            disabled={isLoading}
            style={tw`p-4 font-semibold text-2xl mt-5 ${isLoading ? "bg-gray-400" : "bg-[#c48647]"
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
                {isLoading ? "Changing Password..." : "Change Password"}
              </OutfitText>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChangePassword;
