import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  TextInput,
  FlatList,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { OutfitSemibold, OutfitText } from "@/components/StyledText";
import { Feather, AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/app/Header";
import tw from "twrnc";
import { StatusBar } from "expo-status-bar";
import { router, useLocalSearchParams } from "expo-router";
import ProductService from "@/services/api/product";
import { Product } from "@/utils/types/product";

const OurShop = () => {
  const { category, searchQuery } = useLocalSearchParams();
  const [text, setText] = useState(searchQuery || "");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await ProductService.getAllProducts({
        search: text as any,
        category: (category || "") as string,
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

  const ProductCard = ({ item }: { item: Product }) => (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/product/[id]",
          params: { id: item.id },
        })
      }
      style={tw`bg-white rounded-xl shadow-lg mb-6 w-full`}
    >
      <Image
        source={{ uri: item.product_image }}
        style={tw`rounded-t-xl h-48 w-full object-cover`}
      />
      <View style={tw`px-4 py-2 gap-2`}>
        <OutfitSemibold style={tw`text-lg text-gray-800`}>
          {item.product_name}
        </OutfitSemibold>
        <View style={tw`flex-row items-center justify-between`}>
          <View style={tw`flex-row items-center`}>
            <OutfitSemibold style={tw`text-sm text-gray-500 line-through`}>
              ${item.regular_price}
            </OutfitSemibold>
            <OutfitSemibold style={tw`text-xl text-[#c48647] ml-2`}>
              ${item.sale_price}
            </OutfitSemibold>
          </View>
          <TouchableOpacity
            style={tw`bg-gray-100 p-2 rounded-full`}
            onPress={() => console.log(`Liked product with id: ${item.id}`)}
          >
            <AntDesign name="hearto" size={24} color="gray" />
          </TouchableOpacity>
        </View>
        {item.discount_price > 0 && (
          <OutfitText style={tw`text-xs text-red-500`}>
            Discount Price: ${item.discount_price}
          </OutfitText>
        )}
        <OutfitText style={tw`text-sm text-gray-500`}>
          SKU: {item.sku}
        </OutfitText>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Header title={category ? `${category} Products` : "Our Shop"} cart />
      <View style={tw`bg-white px-4 pt-3 flex-1 gap-4`}>
        <View style={tw`flex-row gap-2 items-center bg-gray-200 px-3 rounded-full`}>
          <Feather name="search" size={21} color="black" />
          <TextInput
            style={tw`bg-transparent flex-1`}
            placeholder="Search..."
            value={text as any}
            onFocus={() => setText("")} // Clears input when focused
            onChangeText={(value) => setText(value)}
          />
        </View>
        {loading ? (
          <OutfitText style={tw`text-center text-gray-500 mt-6`}>
            Loading products...
          </OutfitText>
        ) : (
          <FlatList
            data={products}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <ProductCard item={item} />}
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
