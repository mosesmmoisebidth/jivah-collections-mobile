import React, { useEffect, useState } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import tw from "twrnc";
import { OutfitSemibold, OutfitText } from "../StyledText";
import { useNavigation, useRoute } from "@react-navigation/native";
import { router } from "expo-router";
import { NotificationItem as INotification } from "@/utils/types";
import useGet from "@/hooks/useGet";
import { CartItemType } from "@/utils/types/product";
import { StatusBar } from "expo-status-bar";

interface HeaderProps {
  title?: string;
  cart?: boolean;
  back?: boolean;
}

const MAX_TITLE_LENGTH = 15; // Set the max title length before truncation

const Header: React.FC<HeaderProps> = ({
  title,
  cart = false,
  back = false,
}) => {
  const navigation = useNavigation();
  const route = useRoute();

  const {
    data: cartData,
    loading,
    error,
  } = useGet<{ items: CartItemType[]; subTotal: number; discount: number }>(
    "/cart",
    { authorized: true, refetchTime: 5000 }
  );

  const {
    data: notificationsData,
    loading: notLoading,
    refetch,
  } = useGet<INotification[]>("/notifications", {
    authorized: true,
    refetchTime: 5000,
  });

  const isActive = (target: string) => route.name === target;

  // Truncate title if it exceeds the max length
  const truncateTitle = (text: string) =>
    text.length > MAX_TITLE_LENGTH
      ? text.substring(0, MAX_TITLE_LENGTH) + "..."
      : text;

  return (
    <View
      style={tw`flex-row justify-between items-center py-3 pb-2 px-2 border-b border-slate-100`}
    >
      {!title ? (
        <Image
          source={require("../../assets/images/logo.png")}
          style={{ width: 40, height: 40 }}
        />
      ) : (
        <View style={tw`flex-row gap-2 items-center `}>
          {back && (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={tw`p-2 rounded-full bg-gray-200`}
            >
              <Ionicons name="chevron-back" size={21} color="black" />
            </TouchableOpacity>
          )}
          <OutfitSemibold style={tw`text-[#c48647] text-xl`}>
            {truncateTitle(title)}
          </OutfitSemibold>
        </View>
      )}

      {cart && (
        <View style={tw`flex-row items-center gap-5 px-4`}>
          <View style={tw`relative`}>
            <TouchableOpacity onPress={() => router.push("/Notifications")}>
              <Entypo
                name="bell"
                size={22}
                color={isActive("Cart") ? "#c48647" : "black"}
              />
            </TouchableOpacity>
            {notificationsData?.length && notificationsData?.length > 0 && (
              <OutfitText
                style={tw`p-[2px] px-[7px] text-xs text-center rounded-full text-white absolute -top-3 -right-5 ${
                  isActive("Cart") ? "bg-[#c48647]" : "bg-black"
                }`}
              >
                {notificationsData?.length}
              </OutfitText>
            )}
          </View>
          <View style={tw`relative`}>
            <TouchableOpacity onPress={() => router.push("/Cart")}>
              <Entypo
                name="shopping-cart"
                size={22}
                color={isActive("Cart") ? "#c48647" : "black"}
              />
            </TouchableOpacity>
            {cartData?.items.length && cartData?.items.length > 0 && (
              <OutfitText
                style={tw`p-[2px] px-[7px] text-xs text-center rounded-full text-white absolute -top-3 -right-5 ${
                  isActive("Cart") ? "bg-[#c48647]" : "bg-black"
                }`}
              >
                {cartData?.items.length}
              </OutfitText>
            )}
          </View>
        </View>
      )}
    </View>
  );
};

export default Header;
