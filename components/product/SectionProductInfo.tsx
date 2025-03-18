import React, { FC } from "react";
import { View } from "react-native";
import ProductInfoTab, { ProductInfoTabSkeleton } from "./ProductInfoTab";
import Ratings, { RatingsSkeleton } from "./Ratings";
import tw from "twrnc";
import { ProductType } from "@/utils/types/product";

interface SectionProductInfoProps {
  product: ProductType;
}

const SectionProductInfo: FC<SectionProductInfoProps> = ({ product }) => {
  console.log(product);
  return (
    <View >
      <ProductInfoTab product={product} />
      <Ratings reviews={product.reviews} />
    </View>
  );
};

export default SectionProductInfo;

export const SectionProductInfoSkeleton = () => {
  return (
    <View >
      <ProductInfoTabSkeleton />
      <RatingsSkeleton />
    </View>
  );
};
