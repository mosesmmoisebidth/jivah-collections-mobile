import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Image,
  Platform,
} from "react-native";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";
import { OutfitText } from "@/components/StyledText";
import AppTextInput from "@/components/app/TextInput";
import Header from "@/components/app/Header";
import AuthService from "@/services/api/auth";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { UpdateProfile } from "@/utils/types/auth";

const mainColor = "#c48647";

const Profile = () => {
  const [userData, setUserData] = useState<UpdateProfile>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phoneNumber: "",
    profileImage: null,
  });
  const [editable, setEditable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phoneNumber: "",
  });

  const fetchUserProfile = async () => {
    const response = await AuthService.getProfile();
    setUserData(response);
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: Record<string, string> = {};
    const nameRegex = /^[a-zA-Z]{2,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneNumberRegex = /^[+]?[0-9]{10,15}$/;

    if (!nameRegex.test(userData.firstName.trim())) {
      newErrors.firstName = "First name must contain at least two letters.";
      isValid = false;
    }
    if (!nameRegex.test(userData.lastName.trim())) {
      newErrors.lastName = "Last name must contain at least two letters.";
      isValid = false;
    }
    if (userData.username.trim().length < 4) {
      newErrors.username = "Username must be at least 4 characters long.";
      isValid = false;
    }
    if (!emailRegex.test(userData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    }
    if (!phoneNumberRegex.test(userData.phoneNumber.trim())) {
      newErrors.phoneNumber =
        "Please enter a valid phone number (10-15 digits).";
      isValid = false;
    }
    setErrors(newErrors as any);
    return isValid;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      await AuthService.updateProfile(userData as any, () => {
        setEditable(false);
        router.back();
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof typeof userData, value: string) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleAvatarPress = async () => {
    if (!editable) return;
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setUserData(
        (prev) =>
          ({
            ...prev,
            profileImage: result.assets[0],
          } as any)
      );
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white pt-6`}>
      <Header title="Profile" back />
      <ScrollView contentContainerStyle={tw`px-4 pb-4`}>
        <View style={tw`mb-6`}>
          <View style={tw`items-center mb-6`}>
            <TouchableOpacity onPress={handleAvatarPress}>
              {userData?.profileImage ? (
                <Image
                  source={{ uri: userData?.profileImage.uri }}
                  style={tw`w-24 h-24 rounded-full`}
                />
              ) : (
                <Ionicons
                  name="person-circle"
                  size={96}
                  color={mainColor}
                  style={tw`mb-4`}
                />
              )}
            </TouchableOpacity>
          </View>
          <View style={tw`space-y-3`}>
            <AppTextInput
              type="text"
              label
              label_name="First Name"
              placeholder="Enter your first name"
              value={userData.firstName}
              onChangeText={(text) => handleInputChange("firstName", text)}
              editable={editable}
              errorMessage={errors.firstName}
            />
            <AppTextInput
              type="text"
              label
              label_name="Last Name"
              placeholder="Enter your last name"
              value={userData.lastName}
              onChangeText={(text) => handleInputChange("lastName", text)}
              editable={editable}
              errorMessage={errors.lastName}
            />

            <AppTextInput
              type="text"
              label
              label_name="Username"
              placeholder="Enter your username"
              value={userData.username}
              onChangeText={(text) => handleInputChange("username", text)}
              editable={editable}
              errorMessage={errors.username}
            />

            <AppTextInput
              type="text"
              label
              label_name="Email"
              placeholder="Enter your email"
              value={userData.email}
              onChangeText={(text) => handleInputChange("email", text)}
              editable={editable}
              errorMessage={errors.email}
            />

            <AppTextInput
              type="text"
              label
              label_name="Phone Number"
              placeholder="Enter your phone number"
              value={userData.phoneNumber}
              onChangeText={(text) => handleInputChange("phoneNumber", text)}
              editable={editable}
              errorMessage={errors.phoneNumber}
            />
          </View>

          <TouchableOpacity
            onPress={() => {
              if (editable) handleSave();
              else setEditable(true);
            }}
            disabled={isLoading}
            style={tw`p-4 font-semibold text-2xl mt-5 ${
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
                {editable ? (isLoading ? "Saving..." : "Save Changes") : "Edit"}
              </OutfitText>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
