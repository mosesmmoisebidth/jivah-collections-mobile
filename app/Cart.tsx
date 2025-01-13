import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { OutfitText } from '@/components/StyledText';
import Header from '@/components/app/Header';
import tw from 'twrnc';
import CartProduct from '@/components/app/CartProduct';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Product, products } from '@/constants/Products';
import SeparatorDotted from '@/components/app/SeparatorDotted';
import { router } from 'expo-router';
import { useNavigation } from '@react-navigation/native';

const Cart = () => {
  const navigation = useNavigation();
  
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false, // Disable header here
    });
  }, [navigation]);
  const [cartItems, setCartItems] = useState<
    (Product & { quantity: number })[]
  >([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch cart items from AsyncStorage
  const fetchCartItems = async () => {
    const itemArray = await AsyncStorage.getItem('cartItems');
    const itemIds = JSON.parse(itemArray || '[]');
    const items = products
      .filter((product) => itemIds.includes(product.id))
      .map((item) => ({ ...item, quantity: 1 })); // Add default quantity

    setCartItems(items);
    calculateTotal(items);
    setLoading(false); // Set loading to false after data is fetched
  };

  // Save cart items to AsyncStorage
  const saveCartItems = async (items: (Product & { quantity: number })[]) => {
    const itemIds = items.map((item) => item.id);
    await AsyncStorage.setItem('cartItems', JSON.stringify(itemIds));
  };

  // Calculate total price
  const calculateTotal = (items: (Product & { quantity: number })[]) => {
    const totalAmount = items.reduce(
      (sum, item) => sum + item.price * item.quantity, // Multiply directly with price
      0
    );
    setTotal(totalAmount);
  };

  // Handle quantity increase
  const increaseQuantity = (id: number) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedItems);
    calculateTotal(updatedItems);
    saveCartItems(updatedItems); // Save updated cart to AsyncStorage
  };

  // Handle quantity decrease
  const decreaseQuantity = (id: number) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedItems);
    calculateTotal(updatedItems);
    saveCartItems(updatedItems); // Save updated cart to AsyncStorage
  };

  // Remove item from cart
  const removeItem = async (id: number) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);
    calculateTotal(updatedItems);
    saveCartItems(updatedItems); // Save updated cart to AsyncStorage
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Header title="Cart" />

      {/* Show loader if cart is loading */}
      {loading ? (
        <View style={tw`flex-1 justify-center items-center`}>
          <ActivityIndicator size="large" color="#c48647" />
        </View>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CartProduct
              item={item}
              onRemove={() => removeItem(item.id)}
              onIncreaseQuantity={() => increaseQuantity(item.id)}
              onDecreaseQuantity={() => decreaseQuantity(item.id)}
            />
          )}
          contentContainerStyle={tw`px-4 gap-5 py-5 pt-2`}
          ListFooterComponent={() =>
            cartItems.length > 0 && (
              <View style={tw`flex-col gap-4 mx-2 mt-4`}>
                <View style={tw`flex-row justify-between items-center`}>
                  <OutfitText style={tw`text-lg text-gray-500`}>
                    Sub Total
                  </OutfitText>
                  <OutfitText style={tw`text-2xl`}>
                    ${total.toFixed(2)}
                  </OutfitText>
                </View>
                <View style={tw`flex-row justify-between items-center`}>
                  <OutfitText style={tw`text-lg text-gray-500`}>
                    Shipping
                  </OutfitText>
                  <OutfitText style={tw`text-2xl`}>$20.00</OutfitText>
                </View>
                <SeparatorDotted />
                <View style={tw`flex-row justify-between items-center`}>
                  <OutfitText style={tw`text-lg text-gray-500`}>
                    Total
                  </OutfitText>
                  <OutfitText style={tw`text-2xl`}>
                    ${(total + 20).toFixed(2)}
                  </OutfitText>
                </View>
                <TouchableOpacity
                  onPress={() => router.push('/Checkout')}
                  style={tw`p-4 bg-[#c48647] flex justify-center items-center rounded-lg`}
                >
                  <OutfitText style={tw`text-white`}>CHECKOUT</OutfitText>
                </TouchableOpacity>
              </View>
            )
          }
        />
      )}

      {/* Display message if no products are in cart */}
      {cartItems.length === 0 && !loading && (
        <View style={tw`w-full h-full -pb-20 justify-center items-center`}>
          <OutfitText style={tw`text-xl text-gray-500`}>
            No products in cart 😓
          </OutfitText>
        </View>
      )}

      <StatusBar backgroundColor="transparent" style="dark" />
    </SafeAreaView>
  );
};

export default Cart;
