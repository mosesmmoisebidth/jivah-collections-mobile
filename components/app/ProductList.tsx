import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  TextInput,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { OutfitSemibold, OutfitText } from "@/components/StyledText";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/app/Header";
import tw from "twrnc";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import ProductService from "@/services/api/product";
import { Product } from "@/utils/types/product";

const ProductList = ({
  title,
  category,
}: {
  title: string;
  category: string;
}) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isAddingToCart, setIsAddingToCart] = useState<any>();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await ProductService.getAllProducts({
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
  }, [category]);

  const handleAddToCart = async (id: any) => {
    setIsAddingToCart(id);
    await ProductService.addToCart(id, 1);
    setIsAddingToCart(null);
  };

  const ProductItem = ({ item }: { item: Product }) => (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/product/[id]",
          params: { id: item.id },
        })
      }
      key={item.id}
      style={tw`bg-gray-100 rounded-xl shadow-md w-64`}
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
            style={tw`border border-gray-300 bg-neutral-50 rounded-full py-2 px-3`}
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
    <View style={tw`bg-gray-200 rounded-xl shadow-md w-64 animate-pulse`}>
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
    <View style={tw`bg-neutral-50 pt-3 flex-1`}>
      <OutfitSemibold style={tw`text-lg text-gray-800 px-4 mb-3`}>
        {title}
      </OutfitSemibold>
      {loading ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={tw`flex-row items-center gap-4 py-3 px-4`}
        >
          {Array(10)
            .fill(0)
            .map((_, index) => (
              <SkeletonItem key={index} />
            ))}
        </ScrollView>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={tw`flex-row items-center gap-4 py-3 px-4`}
        >
          {products.map((item) => (
            <ProductItem key={item.id} item={item} />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default ProductList;
