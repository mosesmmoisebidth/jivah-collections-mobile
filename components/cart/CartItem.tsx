import React from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons"; // Icon library for React Native
import tw from "twrnc"; // Tailwind utility
import { CartItemType } from "@/utils/types/product";
import InputNumber from "../shared/InputNumber";
import { OutfitSemibold, OutfitText } from "../StyledText";

interface ProductCardProps {
  item: CartItemType;
  handleCloseMenu?: () => void;
}

const CartItem: React.FC<ProductCardProps> = ({ item, handleCloseMenu }) => {
  const { product, quantity, price } = item;
  const { name, image, color, size, id: productId } = product;

  return (
    <View style={tw`flex-row py-3`}>
      <View style={tw`relative h-24 w-24 overflow-hidden rounded-xl`}>
        <Image
          source={{ uri: image }}
          style={tw`h-full w-full object-contain bg-gray-50`}
        />
        <TouchableOpacity
          onPress={handleCloseMenu}
          style={StyleSheet.absoluteFillObject}
        />
      </View>

      <View style={tw`ml-4 flex-1 flex-col justify-between`}>
        <View>
          <View>
            <View>
              <View style={tw`flex-row justify-between items-center`}>
                <OutfitSemibold
                  style={tw`text-lg max-w-[70%] overflow-hidden text-ellipsis `}
                >
                  {name}
                </OutfitSemibold>
                <OutfitSemibold style={tw`font-medium text-[#eba046]`}>
                  {Math.floor(price)} Rwf
                </OutfitSemibold>
              </View>

              <View style={tw`flex-row items-center gap-2`}>
                <OutfitText
                  style={tw`my-1 text-xs text-neutral-500 py-1 px-2 border border-neutral-500 text-center rounded-xl`}
                >
                  {`${size}`}
                </OutfitText>
                <OutfitText
                  style={tw`my-1 text-xs text-neutral-500 py-1 px-2 border border-neutral-500 text-center rounded-xl`}
                >
                  {`${color}`}
                </OutfitText>
              </View>
            </View>
          </View>
        </View>
        <View style={tw`flex-row items-center justify-between text-sm `}>
          <TouchableOpacity style={tw`flex items-center gap-3`}>
            <Feather name="trash-2" size={24} color="gray" />
          </TouchableOpacity>
          <View>
            <InputNumber defaultValue={quantity} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartItem;

export const CartItemSkeleton: React.FC = () => {
  return (
    <View style={tw`flex-row py-5 animate-pulse`}>
      <View
        style={tw`relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-gray-200`}
      />
      <View style={tw`ml-4 flex-1 flex-col justify-between space-y-3`}>
        <View style={tw`h-4 bg-gray-200 rounded w-3/4`} />
        <View style={tw`flex-row justify-between items-center`}>
          <View style={tw`h-3 bg-gray-200 rounded w-1/2`} />
          <View style={tw`h-4 bg-gray-200 rounded w-12`} />
        </View>
        <View style={tw`flex-row items-end justify-between text-sm`}>
          <View style={tw`h-6 w-6 bg-gray-200 rounded-full`} />
          <View style={tw`h-6 w-16 bg-gray-200 rounded`} />
        </View>
      </View>
    </View>
  );
};
