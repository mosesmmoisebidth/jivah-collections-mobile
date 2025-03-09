import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  Pressable,
  View,
  ActivityIndicator,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import tw from "twrnc";
import { StatusBar } from "expo-status-bar";
import { OutfitText, OutfitSemibold } from "@/components/StyledText";
import { router } from "expo-router";
import AuthService from "@/services/api/auth";
import { WaveIndicator } from "react-native-indicators";

const mainColor = "#c48647";

const Account = () => {
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const accountSections = [
    {
      title: "User Options",
      items: [
        {
          name: "Profile",
          icon: "person-circle",
          onClick: () => {
            router.push("/Profile");
          },
        },
        {
          name: "Cart",
          icon: "cart",
          onClick: () => {
            router.push("/Cart");
          },
        },
        {
          name: "Change Password",
          icon: "lock-closed",
          onClick: () => {
            router.push("/ChangePassword");
          },
        },
        {
          name: "Logout",
          icon: "exit",
          onClick: async () => {
            setIsLoggingOut(true);
            await AuthService.logout(() => {
              router.replace("/(auth)/sign-in");
            });
            setIsLoggingOut(false);
          },
        },
      ],
    },
    {
      title: "Jivah Collections",
      items: [
        {
          name: "About Us",
          icon: "information-circle",
          onClick: () => {
            router.push("/About");
          },
        },
      ],
    },
  ];

  const fetchUserProfile = async () => {
    try {
      const response = await AuthService.getProfile();
      setUserData(response);
    } catch (error) {
      console.log("Error fetching profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <WaveIndicator color="#c48647" size={60} />
      </View>
    );
  }

  return (
    <SafeAreaView style={tw`flex-1 bg-white pt-6`}>
      <View style={tw`items-center mb-6`}>
        <View style={tw`flex flex-col items-center`}>
          {userData?.profileImage ? (
            <Image
              source={{ uri: userData.profileImage }}
              style={tw`w-24 h-24 rounded-full mb-4`}
            />
          ) : (
            <Ionicons
              name="person-circle"
              size={96}
              color={mainColor}
              style={tw`mb-4`}
            />
          )}
          <OutfitSemibold style={tw`text-xl text-[${mainColor}]`}>
            {userData?.username || userData?.email || userData?.firstName}
          </OutfitSemibold>
          <OutfitText style={tw`text-sm`}>{userData?.email}</OutfitText>
        </View>
      </View>

      <ScrollView contentContainerStyle={tw`px-4 pb-4`}>
        {accountSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={tw`mb-6`}>
            <OutfitSemibold style={tw`text-lg text-[${mainColor}] mb-4`}>
              {section.title}
            </OutfitSemibold>
            {section.items.map((item, index) => (
              <Pressable
                key={index}
                onPress={item.onClick}
                disabled={item.name === "Logout" && isLoggingOut}
                style={tw`flex-row items-center py-3 px-4 mb-2 bg-gray-50 rounded-lg`}
              >
                <Ionicons
                  name={item.icon as any}
                  size={24}
                  color={mainColor}
                  style={tw`mr-4`}
                />
                <OutfitText style={tw`text-base text-gray-700 flex-1`}>
                  {item.name}
                </OutfitText>
                {item.name === "Logout" && isLoggingOut ? (
                  <ActivityIndicator size="small" color={mainColor} />
                ) : (
                  item.name !== "Logout" && (
                    <Ionicons name="chevron-forward" size={20} color="gray" />
                  )
                )}
              </Pressable>
            ))}
          </View>
        ))}
      </ScrollView>

      <StatusBar backgroundColor="transparent" style="dark" />
    </SafeAreaView>
  );
};

export default Account;
