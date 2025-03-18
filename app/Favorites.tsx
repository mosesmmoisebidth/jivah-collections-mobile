import React, { useEffect, useState } from "react";
import { View, TextInput, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import Header from "@/components/app/Header";
import tw from "twrnc";
import { StatusBar } from "expo-status-bar";
import useGet from "@/hooks/useGet";
import ProductCard, {
  ProductCardSkeleton,
} from "@/components/product/ProductCard";
import { ProductType } from "@/utils/types/product";
import { OutfitText } from "@/components/StyledText";
import { router } from "expo-router";

const Favorites: React.FC = () => {
  const {
    data: productData,
    loading,
    error,
    refetch,
  } = useGet<{
    total: number;
    items: ProductType[];
    page: number;
    limit: number;
  }>(`/products/favorites/?page=${1}&limit=${100}`, {
    authorized: true,
  });

  if ((error || !productData) && !loading) {
    return (
      <SafeAreaView style={tw`flex-1 items-center justify-center p-6`}>
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
          onPress={() => window.location.reload()}
        >
          <OutfitText style={tw`text-white text-lg font-semibold`}>
            Try Again
          </OutfitText>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Header title="Your favoites" back />
      <View style={tw`px-4 pt-3 flex-1`}>
        <FlatList
          data={productData?.items}
          keyExtractor={(item, index) =>
            item?.id?.toString() || index.toString()
          }
          numColumns={2}
          columnWrapperStyle={tw`justify-between`}
          renderItem={({ item }) => (
            <View style={tw`w-[48%] mb-4`}>
              <ProductCard layout="grid" product={item} />
            </View>
          )}
          ListEmptyComponent={
            <View style={tw`h-full items-center justify-center pt-[30%]`}>
              <OutfitText style={tw`text-3xl font-bold text-[#c48647]`}>
                No Favorites Yet!
              </OutfitText>
              <OutfitText style={tw`text-lg text-gray-500 mt-2 text-center`}>
                You haven't added any products to your favorites yet. Explore
                and add some now!
              </OutfitText>
              <TouchableOpacity
                style={tw`mt-6 px-10 py-3 bg-[#c48647] rounded-2xl`}
                onPress={() => router.push("/OurShop")}
              >
                <OutfitText style={tw`text-white text-lg font-semibold`}>
                  Start Exploring
                </OutfitText>
              </TouchableOpacity>
            </View>
          }
        />

        {/* Show loading skeletons when fetching new products */}
        {loading && (
          <FlatList
            data={Array(6).fill(0)} // Display skeleton loader
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            columnWrapperStyle={tw`justify-between`}
            renderItem={() => (
              <View style={tw`w-[48%] mb-4`}>
                <ProductCardSkeleton layout="grid" />
              </View>
            )}
            ListFooterComponent={<View style={tw`h-10 bg-transparent`} />}
          />
        )}
      </View>
      <StatusBar backgroundColor="transparent" style="dark" />
    </SafeAreaView>
  );
};

export default Favorites;
