import React from "react";
import {
  Image,
  View,
  TouchableOpacity,
  Pressable,
  ToastAndroid,
  Platform,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { OutfitSemibold, OutfitText } from "../StyledText";
import tw from "twrnc";
import { router } from "expo-router";
interface ProductProps {
  product: any;
  onProductClick: (product: any) => void;
}

const Product: React.FC<ProductProps> = ({ product, onProductClick }) => {
  const addToCart = (id: number) => {
    console.log("fasdfa");
  };

  return (
    <Pressable
      onPress={() => router.push(`/product/${product.id}`)}
      key={product.id}
      style={tw`bg-gray-200 rounded-xl p-4`}
    >
      <Image source={product.image} style={tw`rounded-xl w-[17rem]`} />
      <View style={tw`flex-row items-center justify-between pt-3`}>
        <View style={tw`flex-col gap-1`}>
          <OutfitSemibold style={tw`text-xl`}>{product.price}</OutfitSemibold>
          <OutfitText style={tw`text-sm`}>{product.name}</OutfitText>
        </View>
        <TouchableOpacity
          onPress={() => {
            addToCart(product.id), onProductClick(product);
          }}
          style={tw`border border-gray-300 bg-slate-100 rounded-full py-2 px-[10px] flex items-center justify-center`}
        >
          <FontAwesome name="plus" color="black" size={20} />
        </TouchableOpacity>
      </View>
    </Pressable>
  );
};

export default Product;
