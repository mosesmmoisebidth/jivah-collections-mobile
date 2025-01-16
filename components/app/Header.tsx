import React, { useEffect, useState } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import tw from "twrnc";
import { OutfitSemibold, OutfitText } from "../StyledText";
import { useNavigation, useRoute } from "@react-navigation/native";
import { router } from "expo-router";
import StorageService from "@/services/storage";

interface HeaderProps {
  title?: string; // Title is optional
  cart?: boolean; // Cart is optional, defaults to false
}

const Header: React.FC<HeaderProps> = ({ title, cart = false }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const [cartData, setCartData] = useState<any>();

  useEffect(() => {
    const getCart = async () => {
      const cart = await StorageService.getData("cart");
      setCartData(cart);
    };
    getCart();
  }, []);

  // Function to determine if the current route matches the target
  const isActive = (target: string) => route.name === target;

  return (
    <View
      style={tw`flex-row justify-between items-center py-3 pb-2 px-5 border-b border-slate-100`}
    >
      {/* Logo or Back Button + Title */}
      {!title ? (
        <Image
          source={require("../../assets/images/logo.png")}
          style={{ width: 40, height: 40 }}
        />
      ) : (
        <View style={tw`flex-row gap-2 items-center`}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={tw`p-2 rounded-full bg-gray-200`}
          >
            <Ionicons name="chevron-back" size={21} color="black" />
          </TouchableOpacity>
          <OutfitSemibold style={tw`text-[#c48647] text-lg`}>
            {title}
          </OutfitSemibold>
        </View>
      )}

      {/* Cart Icon */}
      {cart && (
        <View style={tw`flex-row items-center gap-10 px-4`}>
          <View style={tw`relative`}>
            <TouchableOpacity onPress={() => router.push("/Cart")}>
              <Entypo
                name="shopping-cart"
                size={22}
                color={isActive("Cart") ? "#c48647" : "black"}
              />
            </TouchableOpacity>
            {cartData?.product_count > 0 && (
              <OutfitText
                style={tw`p-[2px] px-[7px] text-xs text-center rounded-full text-white absolute -top-3 -right-5 ${
                  isActive("Cart") ? "bg-[#c48647]" : "bg-black"
                }`}
              >
                {cartData?.product_count}
              </OutfitText>
            )}
          </View>
        </View>
      )}
    </View>
  );
};

export default Header;
