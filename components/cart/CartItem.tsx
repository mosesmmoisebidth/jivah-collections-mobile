import React, { useState } from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons"; // Icon library for React Native
import tw from "twrnc"; // Tailwind utility
import { CartItemType } from "@/utils/types/product";
import InputNumber from "../shared/InputNumber";
import { OutfitSemibold, OutfitText } from "../StyledText";
import ApiService from "@/services/api";
import Toast from "react-native-toast-message";

interface ProductCardProps {
  item: CartItemType;
  handleCloseMenu?: () => void;
  refetch?: () => void;
}

const CartItem: React.FC<ProductCardProps> = ({
  item,
  handleCloseMenu,
  refetch,
}) => {
  const { product, quantity, price } = item;
  const { name, image, color, size, id: productId } = product;

  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatedQuantity, setUpdatedQuantity] = useState(quantity);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await ApiService.authorized.delete(`/cart/remove/${item.id}`);
      Toast.show({
        type: "success",
        text1: "Removed from Cart",
        text2: "Item successfully removed.",
      });
      if (refetch) refetch();
    } catch (error) {
      console.error("Error deleting cart item:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to remove item. Please try again.",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdate = async () => {
    if (updatedQuantity === quantity) return;
    setIsUpdating(true);
    try {
      await ApiService.authorized.patch(`/cart/update/${item.id}`, {
        quantity: updatedQuantity,
      });
      Toast.show({
        type: "success",
        text1: "Cart Updated",
        text2: `Quantity updated to ${updatedQuantity}.`,
      });
      if (refetch) refetch();
    } catch (error) {
      console.error("Error updating cart item:", error);
      Toast.show({
        type: "error",
        text1: "Update Failed",
        text2: "Could not update quantity. Try again.",
      });
    } finally {
      setIsUpdating(false);
    }
  };

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
                <View
                  style={[
                    tw`w-5 h-5 rounded-full border border-neutral-500`,
                    { backgroundColor: color },
                  ]}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={tw`flex-row items-center justify-between text-sm `}>
          <TouchableOpacity onPress={handleDelete} disabled={isDeleting}>
            {isDeleting ? (
              <Ionicons
                name="reload"
                size={24}
                color="black"
                style={{ transform: [{ rotate: "360deg" }] }}
              />
            ) : (
              <Ionicons name="trash" size={24} color="black" />
            )}
          </TouchableOpacity>
          <View style={tw`flex flex-row items-center gap-2 `}>
            <InputNumber
              defaultValue={quantity}
              min={1}
              onChange={(val) => setUpdatedQuantity(val)}
            />
            {updatedQuantity !== quantity &&
              (isUpdating ? (
                <Ionicons
                  name="reload"
                  size={24}
                  color="green"
                  style={{ transform: [{ rotate: "360deg" }] }}
                />
              ) : (
                <Ionicons
                  name="checkmark"
                  size={24}
                  color="green"
                  onPress={handleUpdate}
                  style={{ cursor: "pointer" }}
                />
              ))}
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
