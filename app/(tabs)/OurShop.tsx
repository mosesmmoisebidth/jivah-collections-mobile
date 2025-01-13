import React, { useState } from 'react';
import {
  View,
  Image,
  TextInput,
  FlatList,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import { OutfitSemibold, OutfitText } from '@/components/StyledText';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '@/components/app/Header';
import tw from 'twrnc';
import { StatusBar } from 'expo-status-bar';
import { Product, products } from '@/constants/Products';
import { router, useLocalSearchParams } from 'expo-router';

const OurShop = () => {
  const [text, setText] = useState('');
  const { category } = useLocalSearchParams(); // Retrieve category from the URL params

  // Parse category into an array
  const categories = Array.isArray(category)
    ? category
    : category
    ? [category]
    : [];

  // Filter products based on search input and category
  const filteredProducts = products.filter((product) => {
    const productCategory = product.category?.toLowerCase(); // Safely access category
    const searchMatch = product.name.toLowerCase().includes(text.toLowerCase());
    const categoryMatch =
      categories.length === 0 || // No category selected, match all
      categories.some(
        (cat) => productCategory && cat?.toLowerCase() === productCategory
      );

    return searchMatch && categoryMatch;
  });

  // Handler to reset filters and show all products
  const resetFilters = () => {
    setText('');
    router.replace('/Shop'); // Navigate to the shop without category filters
  };

  const CartItem = ({ item }: { item: Product }) => (
    <Pressable
      onPress={() =>
        router.push({
          pathname: '/product/[id]',
          params: { id: item.id },
        })
      }
      key={item.id}
      style={tw`bg-gray-200 rounded-xl p-4`}
    >
      <Image source={item.image} style={tw`rounded-xl`} />
      <View style={tw`flex-row items-center justify-between pt-3`}>
        <View style={tw`flex-col gap-1`}>
          <OutfitSemibold style={tw`text-xl`}>${item.price}</OutfitSemibold>
          <OutfitText style={tw`text-sm`}>{item.name}</OutfitText>
        </View>
        <TouchableOpacity
          style={tw`border border-gray-300 bg-slate-100 rounded-full py-2 px-[10px] flex items-center justify-center`}
        >
          <FontAwesome name="plus" color="black" size={20} />
        </TouchableOpacity>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      {/* Header */}
      <Header title={category ? `${category} Products` : 'Our Shop'} />
      {/* Main Content */}
      <View style={tw`bg-white pt-3 flex-1`}>
        <View
          style={tw`mx-6 mb-4 flex-row gap-2 items-center bg-gray-200 px-3 rounded-full`}
        >
          <Feather name="search" size={21} color="black" />
          <TextInput
            style={tw`bg-transparent flex-1`}
            placeholder="Search..."
            value={text}
            onChangeText={(value) => setText(value)}
          />
        </View>
        {/* Product List */}
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <CartItem item={item} />}
          contentContainerStyle={tw`px-4 flex-col gap-5 pb-5`}
          ListEmptyComponent={
            <View style={tw`mt-10 items-center`}>
              <OutfitText style={tw`text-center text-gray-500`}>
                {category
                  ? `No products found for "${category}". 😰`
                  : 'No products found. 😰'}
              </OutfitText>
              <TouchableOpacity onPress={resetFilters}>
                <OutfitText style={tw`text-[#c48647] mt-4 underline`}>
                  See all products
                </OutfitText>
              </TouchableOpacity>
            </View>
          }
        />
      </View>
      <StatusBar backgroundColor="transparent" style="dark" />
    </SafeAreaView>
  );
};

export default OurShop;
