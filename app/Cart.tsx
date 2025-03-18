import React from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import tw from "twrnc";
import { CartItemType } from "@/utils/types/product";
import useGet from "@/hooks/useGet";
import CartItem, { CartItemSkeleton } from "@/components/cart/CartItem";
import Header from "@/components/app/Header";
import { StatusBar } from "expo-status-bar";
import { OutfitText } from "@/components/StyledText";

export interface CartProps {}

const Cart: React.FC<CartProps> = () => {
  const {
    data: cart,
    loading,
    error,
    refetch,
  } = useGet<{ items: CartItemType[]; subTotal: number; discount: number }>(
    "/cart",
    { authorized: true, refetchTime: 60000 }
  );

  const renderProduct = (item: CartItemType) => {
    return <CartItem key={item.product.id} item={item} />;
  };

  return (
    <View style={tw`flex-1 bg-white mt-5`}>
      <Header title="Your Cart" back />
      {loading ? (
        <View style={tw`flex-1 justify-center items-center p-4`}>
          {Array.from({ length: 4 }).map((_, index) => (
            <CartItemSkeleton key={index} />
          ))}
        </View>
      ) : error ? (
        <View style={tw`flex-1 items-center justify-center p-6`}>
          <OutfitText style={tw`text-6xl font-bold text-red-500`}>
            Error
          </OutfitText>
          <OutfitText style={tw`text-xl font-semibold mt-4`}>
            Oops, something went wrong
          </OutfitText>
          <OutfitText style={tw`text-gray-500 mt-2 text-center`}>
            {error || "An unexpected error occurred. Please try again later."}
          </OutfitText>
          <TouchableOpacity
            style={tw`mt-6 px-10 py-3 bg-[#c48647] rounded-2xl`}
            onPress={refetch}
          >
            <OutfitText style={tw`text-white text-lg font-semibold`}>
              Try Again
            </OutfitText>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView style={tw`flex-1 p-4`}>
          {cart?.items?.length ? (
            cart.items.map(renderProduct)
          ) : (
            <View style={tw`flex-1 justify-center items-center`}>
              <OutfitText style={tw`text-lg text-neutral-500`}>
                Your cart is empty
              </OutfitText>
            </View>
          )}
        </ScrollView>
      )}

      {/* Totals Section */}
      {!loading && cart && !error && (
        <View style={tw`mt-6 p-4 bg-neutral-50 rounded-lg`}>
          <View style={tw`flex-row justify-between mb-3`}>
            <OutfitText style={tw`text-lg font-medium`}>Subtotal</OutfitText>
            <OutfitText style={tw`text-lg font-medium`}>
              {Math.floor(cart.subTotal)} Rwf 
            </OutfitText>
          </View>
          <View style={tw`flex-row justify-between mb-3`}>
            <OutfitText style={tw`text-lg font-medium`}>Discount</OutfitText>
            <OutfitText style={tw`text-lg font-medium`}>
              -{Math.floor(cart.discount)} Rwf
            </OutfitText>
          </View>

          {/* Checkout Button */}
          <TouchableOpacity
            onPress={() => {}}
            style={tw`mt-4 w-full bg-[#c48647] py-3 rounded-2xl`}
          >
            <OutfitText
              style={tw`text-white text-center text-lg font-semibold`}
            >
              Checkout
            </OutfitText>
          </TouchableOpacity>
        </View>
      )}
      <StatusBar backgroundColor="white" />
    </View>
  );
};

export default Cart;
