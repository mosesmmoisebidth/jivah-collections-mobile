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
  Modal,
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
import { WaveIndicator } from "react-native-indicators";
import ApiService from "@/services/api";
import Toast from "react-native-toast-message";

const mainColor = "#c48647";

const Profile = () => {
  const [userData, setUserData] = useState<UpdateProfile & { email: string }>({
    name: "",
    username: "",
    phone: "",
    email: "",
  });
  const [editable, setEditable] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    username: "",
    phone: "",
  });

  const fetchUserProfile = async () => {
    const response = await AuthService.getProfile();
    console.log(response);
    setUserData(response);
    setLoading(false);
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: Record<string, string> = {};
    const nameRegex = /^[a-zA-Z]{2,}$/;
    const phoneRegex = /^[+]?[0-9]{10,15}$/;

    if (!userData.name || userData.name.length < 4) {
      newErrors.firstName = "Please provide your full name .";
      isValid = false;
    }
    if (userData.username.trim().length < 4) {
      newErrors.username = "Username must be at least 4 characters long.";
      isValid = false;
    }
    if (!phoneRegex.test(userData.phone.trim())) {
      newErrors.phone = "Please enter a valid phone number (10-15 digits).";
      isValid = false;
    }
    console.log(errors);
    setErrors(newErrors as any);
    return isValid;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const data = {
        name: userData.name,
        phone: userData.phone,
        username: userData.username,
      };
      await ApiService.authorized.patch("/users/profile", data);
      await fetchUserProfile();
      setEditable(false);
      Toast.show({
        type: "success",
        position: "top",
        text1: "Profile Updated Successfully.",
        text2: "Your account has been created!",
      });
    } catch (err: any) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Profile Update Failed",
        text2:
          err.response?.data?.message ||
          "There was an error updating your profile.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeleteLoading(true);
    try {
      await ApiService.authorized.delete("/users/account");
      await AuthService.logout(() => {
        router.replace("/(auth)");
      });
      Toast.show({
        type: "success",
        position: "top",
        text1: "Account Deleted Successfully.",
        text2: "Your account has been deleted and all data is removed.",
      });
    } catch (err: any) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Account Deletion Failed",
        text2:
          err.response?.data?.message ||
          "There was an error deleting your account. Please try again later.",
      });
    } finally {
      setModalVisible(false);
      setIsDeleteLoading(false);
    }
  };

  const handleInputChange = (field: keyof typeof userData, value: string) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <WaveIndicator color="#c48647" size={60} />
      </View>
    );
  }

  return (
    <SafeAreaView style={tw`flex-1 bg-white pt-6`}>
      <Header title="Profile" back />
      <ScrollView contentContainerStyle={tw`px-4 pb-4`}>
        <View style={tw`mb-6`}>
          <View style={tw`items-center mb-6`}>
            <Ionicons
              name="person-circle"
              size={96}
              color={mainColor}
              style={tw`mb-4`}
            />
          </View>
          <View style={tw`space-y-3`}>
            <AppTextInput
              type="text"
              label
              label_name="Full Name"
              placeholder="Enter your full name"
              value={userData.name}
              onChangeText={(text) => handleInputChange("name", text)}
              editable={editable}
              errorMessage={errors.name}
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

            {!editable && (
              <AppTextInput
                type="text"
                label
                label_name="Email"
                placeholder="Enter your email"
                value={userData.email}
                onChangeText={(text) => handleInputChange("email", text)}
                editable={editable}
              />
            )}

            <AppTextInput
              type="text"
              label
              label_name="Phone Number"
              placeholder="Enter your phone number"
              value={userData.phone}
              onChangeText={(text) => handleInputChange("phone", text)}
              editable={editable}
              errorMessage={errors.phone}
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

          <View style={tw`border-t border-gray-300 mt-6 pt-6`}></View>
          <View style={tw`mt-4 px-2`}>
            <OutfitText style={tw`text-xl font-semibold text-red-500`}>
              Delete Account
            </OutfitText>
            <OutfitText style={tw`text-sm text-gray-500 mt-2`}>
              Deleting your account is permanent and cannot be undone. All your
              data will be erased.
            </OutfitText>
          </View>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={tw`p-4 mt-4 bg-red-500 flex justify-center items-center rounded-full`}
          >
            <OutfitText style={tw`text-white font-semibold text-lg`}>
              Delete Account
            </OutfitText>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={tw`flex-1 justify-end bg-black/50`}>
          <View style={tw`bg-white p-3 rounded-t-3xl`}>
            <OutfitText style={tw`text-lg font-semibold text-center`}>
              Are you sure you want to delete your account?
            </OutfitText>
            <View style={tw`flex-row justify-around mt-4 gap-4`}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={tw`p-3 bg-gray-300 rounded-full w-[48%] items-center`}
              >
                <OutfitText style={tw`text-black font-semibold`}>
                  Cancel
                </OutfitText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleDeleteAccount}
                disabled={isDeleteLoading}
                style={tw`p-3 font-semibold text-2xl w-[48%]  ${
                  isDeleteLoading ? "bg-red-400" : "bg-red-500"
                } flex justify-center items-center rounded-full`}
              >
                <View style={tw`flex-row items-center`}>
                  {isDeleteLoading && (
                    <ActivityIndicator
                      size="small"
                      color="white"
                      style={tw`mr-2`}
                    />
                  )}
                  <OutfitText style={tw`text-white`}>Delete</OutfitText>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Profile;
