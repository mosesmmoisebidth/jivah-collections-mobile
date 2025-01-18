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
    firstName: "",
    lastName: "",
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
    const nameRegex = /^[a-zA-Z]{2,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    const phoneNumberRegex = /^[+]?[0-9]{10,15}$/;

    if (!nameRegex.test(formData.firstName.trim())) {
      newErrors.firstName = "First name must contain at least two letters.";
      isValid = false;
    }
    if (!nameRegex.test(formData.lastName.trim())) {
      newErrors.lastName = "Last name must contain at least two letters.";
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
        <View style={tw`flex-col gap-6 justify-center px-7  py-20 h-full`}>
          <OutfitBold style={tw`text-2xl`}>Sign Up</OutfitBold>

          <View style={tw`flex-col gap-3 py-6`}>
            <TextInput
              label={true}
              type="text"
              label_name="First Name"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChangeText={(text) => handleInputChange("firstName", text)}
              prefixIcon={<Ionicons name="person" size={20} color="gray" />}
              errorMessage={errors.firstName}
            />
            <TextInput
              label={true}
              type="text"
              label_name="Last Name"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChangeText={(text) => handleInputChange("lastName", text)}
              prefixIcon={<Ionicons name="person" size={20} color="gray" />}
              errorMessage={errors.lastName}
            />
            <TextInput
              label={true}
              type="text"
              label_name="Username"
              placeholder="Enter your username"
              value={formData.username}
              onChangeText={(text) => handleInputChange("username", text)}
              prefixIcon={<Ionicons name="person" size={20} color="gray" />}
              errorMessage={errors.username}
            />

            <TextInput
              label={true}
              type="text"
              label_name="Email"
              placeholder="e.g. johndoe@example.com"
              value={formData.email}
              onChangeText={(text) => handleInputChange("email", text)}
              prefixIcon={<Ionicons name="mail" size={20} color="gray" />}
              errorMessage={errors.email}
            />
            <TextInput
              label={true}
              type="text"
              label_name="Phone Number"
              placeholder="Enter your phone number"
              value={formData.phoneNumber}
              onChangeText={(text) => handleInputChange("phoneNumber", text)}
              prefixIcon={<Ionicons name="call" size={20} color="gray" />}
              errorMessage={errors.phoneNumber}
            />
            <TextInput
              label={true}
              label_name="Password"
              placeholder="e.g. ********"
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

          <View style={tw`flex-col gap-5`}>
            <TouchableOpacity
              onPress={handleRegister}
              disabled={isLoading}
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
                  {!isLoading &&  "Register"}
                </OutfitText>
              </View>
            </TouchableOpacity>

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
    marginVertical: 10,
    width: "40%",
  },
});
