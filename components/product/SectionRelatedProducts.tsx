import React from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";
import useGet from "../../hooks/useGet";
import tw from "twrnc";
import { ProductType } from "@/utils/types/product";
import ProductCard, { ProductCardSkeleton } from "./ProductCard";
import { OutfitSemibold } from "../StyledText";

// Get the screen width
const { width } = Dimensions.get("window");

const SectionRelatedProducts = ({ id }: { id: string }) => {
  const {
    data: products,
    loading,
    error,
  } = useGet<ProductType[]>(`/products/${id}/related`, {
    authorized: true,
  });

  if (loading) {
    return (
      <View >
        <OutfitSemibold style={tw`text-2xl font-medium`}>
          Related Products
        </OutfitSemibold>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={tw`pt-2`}
        >
          {/* Skeleton Cards take up 90% of the screen width */}
          <View style={[styles.cardContainer, { width: width * 0.9 }]}>
            <ProductCardSkeleton />
          </View>
          <View style={[styles.cardContainer, { width: width * 0.9 }]}>
            <ProductCardSkeleton />
          </View>
          <View style={[styles.cardContainer, { width: width * 0.9 }]}>
            <ProductCardSkeleton />
          </View>
        </ScrollView>
      </View>
    );
  }

  if (error || products?.length == 0) {
    return null;
  }

  return (
    <View >
      <OutfitSemibold style={tw`text-2xl font-medium`}>
        Related Products!
      </OutfitSemibold>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={tw`pt-2`}
      >
        {products?.map((product) => (
          <View
            key={product.id}
            style={[styles.cardContainer, { width: width * 0.9 }]}
          >
            <ProductCard product={product} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginRight: 10,
  },
});

export default SectionRelatedProducts;
