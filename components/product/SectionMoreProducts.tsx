import React from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import useGet from "../../hooks/useGet";
import ProductCard, { ProductCardSkeleton } from "./ProductCard";
import tw from "twrnc";
import { ProductType } from "@/utils/types/product";
import { OutfitBold, OutfitSemibold, OutfitText } from "../StyledText";

const SectionMoreProducts = ({
  title,
  limit,
}: {
  title?: string;
  limit?: number;
}) => {
  const {
    data: productData,
    loading,
    error,
  } = useGet<{
    total: number;
    items: ProductType[];
    page: number;
    limit: number;
  }>(`/products?limit=${limit || 8}`, {
    authorized: false,
  });

  if (productData?.items?.length === 0 || error) {
    return null;
  }

  return (
    <View>
      <OutfitSemibold style={tw`text-xl font-medium mb-2`}>
        {title || "Explore more products"}
      </OutfitSemibold>
      <FlatList
        data={loading ? Array(6).fill(0) : productData?.items || []}
        keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
        numColumns={2}
        columnWrapperStyle={tw`justify-between`}
        scrollEnabled={false} 
        renderItem={({ item }) =>
          loading ? (
            <View style={tw`w-[48%] mb-4`}>
              <ProductCardSkeleton layout="grid" />
            </View>
          ) : (
            <View style={tw`w-[48%] mb-4`}>
              <ProductCard layout="grid" product={item} />
            </View>
          )
        }
        ListEmptyComponent={
          <View style={tw`h-full items-center justify-center pt-[30%]`}>
            <OutfitText style={tw`text-3xl font-bold text-[#c48647]`}>
              No Products Available
            </OutfitText>
            <OutfitText style={tw`text-lg text-gray-500 mt-2 text-center`}>
              We couldn't find any products at the moment. Please check back
              later.
            </OutfitText>
            <TouchableOpacity
              style={tw`mt-6 px-5 py-3 bg-blue-500 rounded-full`}
              onPress={() => window.location.reload()}
            >
              <OutfitText style={tw`text-white text-lg font-semibold`}>
                Refresh
              </OutfitText>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
};

export default SectionMoreProducts;
