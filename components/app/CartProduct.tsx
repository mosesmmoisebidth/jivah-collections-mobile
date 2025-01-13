//@ts-nocheck
import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Product } from '@/constants/Products';
import { OutfitSemibold, OutfitText } from '@/components/StyledText';
import Ionicons from '@expo/vector-icons/Ionicons';
import tw from 'twrnc';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

type ProductItemProps = {
  item: Product & { quantity: number }; // Add quantity type
  onRemove: () => void;
  onIncreaseQuantity: () => void;
  onDecreaseQuantity: () => void;
};

const CartProduct = ({
  item,
  onRemove,
  onIncreaseQuantity,
  onDecreaseQuantity,
}: ProductItemProps) => {
  return (
    <View style={tw`flex-row items-center gap-4 w-full h-[9rem] rounded-xl`}>
      <View style={tw`bg-slate-200 p-2 rounded-xl`}>
        <Image source={item.image} style={tw`h-[8rem] w-[8rem] rounded-xl`} />
      </View>
      <View style={tw`w-[50%] flex-col justify-between h-full py-4`}>
        <View style={tw`flex-col`}>
          <OutfitSemibold style={tw`text-lg`}>{item.name}</OutfitSemibold>
          <OutfitText style={tw`text-lg`}>
            {/* */}
            ${(item.price * item.quantity).toFixed(2)} {/* Subtotal for item */}
          </OutfitText>
        </View>
        <View style={tw`flex-row justify-between items-center`}>
          <View style={tw`flex-row gap-3 items-center`}>
            <TouchableOpacity onPress={onIncreaseQuantity} style={tw`p-2 px-[9px] rounded-full border border-slate-300`}>
              <FontAwesome5 name="plus" size={17} color="black" />
            </TouchableOpacity>
            <OutfitText style={tw`text-lg`}>{item.quantity}</OutfitText>
            <TouchableOpacity onPress={onDecreaseQuantity} style={tw`p-2 px-[9px] rounded-full border border-slate-300`}>
              <FontAwesome5 name="minus" size={17} color="black" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={onRemove}
            style={tw`p-2 px-[9px] rounded-full border border-slate-300`}
          >
            <Ionicons name="close" size={17} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CartProduct;
