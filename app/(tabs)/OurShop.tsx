import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  TextInput,
  FlatList,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { OutfitSemibold, OutfitText } from "@/components/StyledText";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/app/Header";
import tw from "twrnc";
import { StatusBar } from "expo-status-bar";
import { router, useLocalSearchParams } from "expo-router";
import ProductService from "@/services/api/product";
import { Product } from "@/utils/types/product";

const OurShop = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isAddingToCart, setIsAddingToCart] = useState<any>();
  const { category } = useLocalSearchParams();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await ProductService.getAllProducts({
        search: text,
        category: (category || "") as any,
        page: 1,
        limit: 10,
      });
      setProducts(response || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [text, category]);

  const resetFilters = () => {
    setText("");
    router.replace("/Shop");
  };

  const handleAddToCart = async (id: any) => {
    setIsAddingToCart(id);
    await ProductService.addToCart(id, 1);
    setIsAddingToCart("");
  };

  const CartItem = ({ item }: { item: Product }) => (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/product/[id]",
          params: { id: item.id },
        })
      }
      key={item.id}
      style={tw`bg-gray-100 rounded-xl shadow-md `}
    >
      <Image
        source={{ uri: item.product_image }}
        style={tw`rounded-t-xl h-64 w-full`}
      />
      <View style={tw`p-4`}>
        <OutfitSemibold style={tw`text-lg text-gray-800`}>
          {item.product_name}
        </OutfitSemibold>
        <OutfitText style={tw`text-sm text-gray-600 mt-1`}>
          {item.short_description.join(", ")}
        </OutfitText>
        <View style={tw`flex-row items-center justify-between mt-3`}>
          <OutfitSemibold style={tw`text-xl text-[#c48647]`}>
            ${item.sale_price}
          </OutfitSemibold>
          <TouchableOpacity
            style={tw`border border-gray-300 bg-white rounded-full py-2 px-3`}
            onPress={() => handleAddToCart(item.id as any)}
            disabled={isAddingToCart}
          >
            {isAddingToCart == item.id ? (
              <ActivityIndicator size="small" color="#c48647" />
            ) : (
              <FontAwesome name="plus" color="black" size={20} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Pressable>
  );

  const SkeletonItem = () => (
    <View style={tw`bg-gray-200 rounded-xl shadow-md  animate-pulse`}>
      <View style={tw`bg-gray-300 rounded-xl h-64 w-full`} />
      <View style={tw`p-4`}>
        <View style={tw`h-6 bg-gray-300 rounded w-2/3`} />
        <View style={tw`h-4 bg-gray-300 rounded w-1/2 mt-2`} />
        <View style={tw`flex-row items-center justify-between mt-3`}>
          <View style={tw`h-6 bg-gray-300 rounded w-16`} />
          <View style={tw`h-10 w-10 bg-gray-300 rounded-full`} />
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Header title={category ? `${category} Products` : "Our Shop"} cart />
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
        {loading ? (
          <FlatList
            data={Array(10).fill(0)}
            keyExtractor={(_, index) => index.toString()}
            renderItem={() => <SkeletonItem />}
            contentContainerStyle={tw`px-4 flex-col gap-5 pb-5`}
          />
        ) : (
          <FlatList
            data={products}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <CartItem item={item} />}
            contentContainerStyle={tw`px-4 flex-col gap-5 pb-5`}
            ListEmptyComponent={
              <View style={tw`mt-10 items-center`}>
                <OutfitText style={tw`text-center text-gray-500`}>
                  {category
                    ? `No products found for "${category}". 😰`
                    : "No products found. 😰"}
                </OutfitText>
                <TouchableOpacity onPress={resetFilters}>
                  <OutfitText style={tw`text-[#c48647] mt-4 underline`}>
                    See all products
                  </OutfitText>
                </TouchableOpacity>
              </View>
            }
          />
        )}
      </View>
      <StatusBar backgroundColor="transparent" style="dark" />
    </SafeAreaView>
  );
};

export default OurShop;
