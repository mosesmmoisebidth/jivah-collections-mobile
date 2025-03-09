import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  FlatList,
  Pressable,
  TouchableOpacity,
  Text,
  Alert,
  ActivityIndicator,
} from "react-native";
import { OutfitSemibold, OutfitText } from "@/components/StyledText";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/app/Header";
import tw from "twrnc";
import { StatusBar } from "expo-status-bar";
import ProductService from "@/services/api/product";
import { Product } from "@/utils/types/product";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import AppImages from "@/utils/constants/images";

const Cart = () => {
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState<any[]>([]);
  const [totals, setTotals] = useState({
    subtotal: 0,
    discount: 0,
    tax: 0,
    total: 0,
  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await ProductService.viewCart();
      setCart(response?.products || []);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotals = () => {
    let subtotal = 0;
    let discount = 0;
    let tax = 0;

    cart.forEach((item) => {
      subtotal +=
        item.sale_price * item.quantity + item.discount * item.quantity;
      discount += item.discount * item.quantity;
      if (item.tax) {
        tax += item.tax_amount * item.quantity; // Add tax amount
      }
    });

    setTotals({
      subtotal,
      discount,
      tax,
      total: subtotal - discount + tax, // Add tax to the total
    });
  };

  const updateCart = async (
    productId: string,
    action: "increase" | "decrease" | "remove"
  ) => {
    if (action === "remove") {
      setCart((prev) => prev.filter((item) => item.id !== productId));
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity: Math.max(
                  1,
                  item.quantity + (action === "increase" ? 1 : -1)
                ),
              }
            : item
        )
      );
    }
  };

  const emptyCart = async () => {
    Alert.alert("Confirm", "Are you sure you want to empty the cart?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes",
        onPress: () => setCart([]),
      },
    ]);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    calculateTotals();
  }, [cart]);

  const CartItem = ({ item }: { item: any }) => {
    const [isLoading, setIsLoading] = useState<any>();

    const handleIncreaseQuantity = async (productId: string) => {
      try {
        setLoading(true);
        await ProductService.increaseCartQuantity(productId);
        updateCart(productId, "increase");
      } catch (error) {
        Toast.show({
          type: "error",
          position: "top",
          text1: "Error",
          text2: "Failed to increase cart quantity.",
        });
      } finally {
        setLoading(false);
      }
    };

    const handleDecreaseQuantity = async (productId: string) => {
      try {
        setLoading(true);
        await ProductService.decreaseCartQuantity(productId);
        updateCart(productId, "decrease");
      } catch (error) {
        Toast.show({
          type: "error",
          position: "top",
          text1: "Error",
          text2: "Failed to decrease cart quantity.",
        });
      } finally {
        setLoading(false);
      }
    };

    const removeItem = async (productId: string) => {
      try {
        setLoading(true);
        await ProductService.removeFromCart(productId);
        updateCart(productId, "remove");
      } catch (error) {
        Toast.show({
          type: "error",
          position: "top",
          text1: "Error",
          text2: "Failed to remove product from cart.",
        });
      } finally {
        setLoading(false);
      }
    };

    return (
      <View
        style={tw`bg-gray-100 rounded-lg shadow-md flex-row items-center p-4 mb-4`}
      >
        <Image
          source={{ uri: item.product_image }}
          style={tw`h-16 w-16 rounded-lg mr-4`}
        />
        <View style={{ flex: 1 }}>
          <OutfitSemibold style={tw`text-sm text-gray-800`}>
            {item.product_name}
          </OutfitSemibold>
          <OutfitText style={tw`text-xs text-gray-600 mt-1`}>
            {item.sale_price} Rwf x {item.quantity}
          </OutfitText>
          <View style={tw`flex-row items-center mt-2`}>
            <View
              style={tw`h-6 w-6 rounded-full bg-${item.color.toLowerCase()}-500 mr-2`}
            />
            <OutfitText style={tw`text-xs text-gray-600`}>
              {item.size}
            </OutfitText>
          </View>
          <View style={tw`flex-row items-center mt-2`}>
            <TouchableOpacity
              style={tw`bg-gray-200 p-2 rounded-full`}
              onPress={() => handleDecreaseQuantity(item.id)}
              disabled={isLoading}
            >
              {isLoading == "increase" ? (
                <ActivityIndicator size={12} color="black" />
              ) : (
                <FontAwesome name="minus" size={12} color="black" />
              )}
            </TouchableOpacity>
            <OutfitText style={tw`mx-3`}>{item.quantity}</OutfitText>
            <TouchableOpacity
              style={tw`bg-gray-200 p-2 rounded-full`}
              onPress={() => handleIncreaseQuantity(item.id)}
              disabled={isLoading}
            >
              {isLoading == "decrease" ? (
                <ActivityIndicator size={12} color="black" />
              ) : (
                <FontAwesome name="plus" size={12} color="black" />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`ml-auto bg-red-100 p-2 rounded-full`}
              onPress={() => removeItem(item.id)}
              disabled={isLoading}
            >
              {isLoading == "remove" ? (
                <ActivityIndicator size={12} color="black" />
              ) : (
                <Feather name="trash-2" size={16} color="#e3342f" />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const SkeletonItem = () => (
    <View
      style={tw`bg-gray-200 rounded-lg shadow-md flex-row items-center p-4`}
    >
      <View style={tw`h-16 w-16 bg-gray-300 rounded-lg mr-4`} />
      <View style={{ flex: 1 }}>
        <View style={tw`h-4 bg-gray-300 rounded w-2/3`} />
        <View style={tw`h-3 bg-gray-300 rounded w-1/2 mt-2`} />
        <View style={tw`flex-row items-center mt-2`}>
          <View style={tw`h-4 bg-gray-300 rounded w-12`} />
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Header title="Cart" back />
      <View style={tw`flex-1 bg-white pt-3`}>
        {loading ? (
          <FlatList
            data={Array(10).fill(0)}
            keyExtractor={(_, index) => index.toString()}
            renderItem={() => <SkeletonItem />}
            contentContainerStyle={tw`px-4 pb-20 gap-3`}
          />
        ) : (
          <>
            <FlatList
              data={cart}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <CartItem item={item} />}
              contentContainerStyle={tw`px-4 pb-20`}
              ListEmptyComponent={
                <View style={tw`mt-10 items-center gap-y-4`}>
                  <Image
                    source={AppImages.cart}
                    resizeMode="contain"
                    style={tw`w-30 h-30`}
                  />
                  <OutfitText style={tw`text-center text-lg text-gray-500`}>
                    No products found in cart. 😰
                  </OutfitText>
                </View>
              }
            />
          </>
        )}
      </View>
      {cart.length > 0 && (
        <View
          style={tw`absolute bottom-0 w-full bg-white border-t border-gray-200 p-4`}
        >
          <View style={tw`mb-3`}>
            <View style={tw`flex-row justify-between mb-1`}>
              <OutfitText style={tw`text-sm text-gray-500`}>
                Subtotal
              </OutfitText>
              <OutfitSemibold style={tw`text-sm text-gray-700`}>
                {totals.subtotal} Rwf
              </OutfitSemibold>
            </View>
            <View style={tw`flex-row justify-between mb-1`}>
              <OutfitText style={tw`text-sm text-gray-500`}>
                Discount
              </OutfitText>
              <OutfitSemibold style={tw`text-sm text-gray-700`}>
                -{totals.discount} Rwf
              </OutfitSemibold>
            </View>
            <View style={tw`flex-row justify-between mb-1`}>
              <OutfitText style={tw`text-sm text-gray-500`}>Tax</OutfitText>
              <OutfitSemibold style={tw`text-sm text-gray-700`}>
                {totals.tax} Rwf
              </OutfitSemibold>
            </View>
            <View style={tw`flex-row justify-between`}>
              <OutfitSemibold style={tw`text-base text-gray-800`}>
                Total
              </OutfitSemibold>
              <OutfitSemibold style={tw`text-base text-gray-800`}>
                {totals.total} Rwf
              </OutfitSemibold>
            </View>
          </View>
          <TouchableOpacity
            style={tw`bg-[#c48647] p-4 rounded-full`}
            onPress={() => router.push("/Checkout")}
          >
            <OutfitSemibold style={tw`text-center text-white text-lg`}>
              Proceed to Checkout
            </OutfitSemibold>
          </TouchableOpacity>
        </View>
      )}
      <StatusBar backgroundColor="transparent" style="dark" />
    </SafeAreaView>
  );
};

export default Cart;
