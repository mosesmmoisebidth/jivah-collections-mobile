import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
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
import AppImages from "@/utils/constants/images";
import { Ionicons } from "@expo/vector-icons";
import { Register } from "../../utils/types/auth";
import AuthService from "@/services/api/auth";

const SignUp = () => {
  const [formData, setFormData] = useState<Register>({
    username: "",
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: Record<string, string> = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    const phoneNumberRegex = /^[+]?[0-9]{10,15}$/;
    const nameRegex = /^[a-zA-Z\s]+$/;

    if (!nameRegex.test(formData.name) || formData.name.length < 5) {
      newErrors.name =
        "Full name must be at least 5 characters long and contain only letters and spaces.";
      isValid = false;
    }

    if (formData.username.trim().length < 4) {
      newErrors.username = "Username must be at least 4 characters long.";
      isValid = false;
    }
    if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    }
    if (!phoneNumberRegex.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber =
        "Please enter a valid phone number (10-15 digits).";
      isValid = false;
    }
    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters, with letters, numbers, and symbols.";
      isValid = false;
    }
    if (formData.password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (field: keyof Register, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prevErrors: any) => {
      const { [field]: _, ...rest } = prevErrors;
      return rest;
    });
  };

  const handleRegister = async () => {
    if (!validateForm()) return;
    setIsLoading(true);
    await AuthService.register(formData, () => {
      router.push("/(tabs)/Home");
    });
    setIsLoading(false);
  };

  return (
    <ScrollView>
      <SafeAreaView>
        <View style={tw`flex-col gap-6 justify-center px-4 py-12 h-full`}>
          <View style={tw`gap-3 flex flex-col items-center`}>
            <Image
              source={require("../../assets/images/logo.png")}
              style={{ width: 100, height: 100 }}
            />
            <OutfitBold style={tw`text-3xl text-center `}>Register</OutfitBold>
            <OutfitSemibold style={tw`text-gray-500 text-center px-4`}>
              Join us today and start your journey!
            </OutfitSemibold>
          </View>

          <View style={tw`flex-col gap-4 py-6`}>
            <TextInput
              label={true}
              type="text"
              label_name="Full Names"
              placeholder="Enter your full name"
              value={formData.name}
              onChangeText={(text) => handleInputChange("name", text)}
              prefixIcon={<Ionicons name="person" size={20} color="gray" />}
              errorMessage={errors.name}
            />
            <TextInput
              label={true}
              type="text"
              label_name="Username"
              placeholder="Enter your username"
              value={formData.username}
              onChangeText={(text) => handleInputChange("username", text)}
              prefixIcon={
                <Ionicons name="person-circle" size={20} color="gray" />
              }
              errorMessage={errors.username}
            />
            <TextInput
              label={true}
              type="text"
              label_name="Email"
              placeholder="e.g. johndoe@example.com"
              value={formData.email}
              keyboardType="email-address"
              onChangeText={(text) => handleInputChange("email", text)}
              prefixIcon={<Ionicons name="mail" size={20} color="gray" />}
              errorMessage={errors.email}
            />
            <TextInput
              label={true}
              type="text"
              label_name="Phone Number"
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
              value={formData.phoneNumber}
              onChangeText={(text) => handleInputChange("phoneNumber", text)}
              prefixIcon={<Ionicons name="call" size={20} color="gray" />}
              errorMessage={errors.phoneNumber}
            />
            <TextInput
              label={true}
              label_name="Password"
              placeholder="Enter your password"
              value={formData.password}
              onChangeText={(text) => handleInputChange("password", text)}
              prefixIcon={
                <Ionicons name="lock-closed" size={20} color="gray" />
              }
              type="password"
              errorMessage={errors.password}
            />
            <TextInput
              label={true}
              label_name="Confirm Password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              prefixIcon={
                <Ionicons name="lock-closed" size={20} color="gray" />
              }
              type="password"
              errorMessage={errors.confirmPassword}
            />
          </View>

          <View style={tw`flex-col gap-6`}>
            <TouchableOpacity
              onPress={handleRegister}
              disabled={isLoading}
              style={tw`p-4 font-semibold text-xl ${
                isLoading ? "bg-[#c48647]/50" : "bg-[#c48647]"
              } flex justify-center items-center rounded-2xl shadow-lg`}
            >
              <View style={tw`flex-row items-center`}>
                {isLoading && (
                  <ActivityIndicator
                    size="small"
                    color="white"
                    style={tw`mr-2`}
                  />
                )}
                <OutfitText style={tw`text-white `}>
                  {isLoading ? "Registering..." : "Register"}
                </OutfitText>
              </View>
            </TouchableOpacity>

            <View style={tw`flex-row items-center gap-3`}>
              <View style={styles.line} />
              <OutfitText style={tw`w-[10%] text-center`}>OR</OutfitText>
              <View style={styles.line} />
              <Separator />
            </View>

            <TouchableOpacity
              style={tw`py-4 px-6 rounded-2xl border border-gray-300 flex flex-row items-center justify-center gap-3`}
            >
              <Image
                source={AppImages.googleIcon}
                resizeMode="contain"
                style={tw`w-5 h-5`}
              />
              <OutfitText>Continue with Google</OutfitText>
            </TouchableOpacity>

            <OutfitText style={tw`text-center mt-6`}>
              Already have an account?{" "}
              <OutfitSemibold
                style={tw`text-[#c48647]`}
                onPress={() => router.push("/(auth)/sign-in")}
              >
                Log In
              </OutfitSemibold>
            </OutfitText>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  line: {
    height: 1,
    backgroundColor: "gray",
    width: "40%",
  },
});
