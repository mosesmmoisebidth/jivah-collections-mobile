import { ProductType } from "@/utils/types/product";
import { router } from "expo-router";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import { OutfitSemibold, OutfitText } from "../StyledText";

interface ProductCardProps {
  product: ProductType;
  layout?: "grid" | "list";
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  layout = "list",
}) => {
  const isGrid = layout === "grid";

  return (
    <View
      style={tw`transitionEffect relative rounded-2xl p-1.5 border border-gray-200 my-2 `}
    >
      <View
        style={tw`${
          isGrid ? "h-40" : "h-64"
        } w-full overflow-hidden rounded-2xl`}
      >
        <TouchableOpacity
          style={tw`h-full w-full`}
          onPress={() =>
            router.push({
              pathname: "/product/[id]",
              params: { id: product.productId || "" },
            })
          }
        >
          <Image
            source={{ uri: product.image }}
            alt={`${product.name} cover photo`}
            style={tw`h-full w-full object-contain bg-gray-50`}
          />
        </TouchableOpacity>
      </View>
      <View style={tw`mt-3`}>
        <OutfitSemibold
          style={tw`${isGrid ? "text-base" : "text-xl"} font-semibold`}
        >
          {product.name}
        </OutfitSemibold>
        <View style={tw`flex-row items-center justify-between`}>
          {!isGrid && (
            <OutfitText style={tw`text-sm text-neutral-500`}>
              {typeof product.category == "string"
                ? product.category
                : product.category.name}
            </OutfitText>
          )}
          <OutfitSemibold
            style={tw`${
              isGrid ? "text-sm" : "text-lg"
            } font-medium text-[#eba046]`}
          >
            {Math.floor(product.price)} Rwf
          </OutfitSemibold>
        </View>
      </View>
    </View>
  );
};

export default ProductCard;

export const ProductCardSkeleton: React.FC<{ layout?: "grid" | "list" }> = ({
  layout = "list",
}) => {
  const isGrid = layout === "grid";

  return (
    <View style={tw`animate-pulse rounded-2xl p-3 shadow-md bg-gray-100 my-2 `}>
      <View
        style={tw`relative ${
          isGrid ? "h-40" : "h-64"
        } w-full overflow-hidden rounded-2xl bg-gray-300`}
      />
      <View style={tw`mt-3 gap-y-2`}>
        <View
          style={tw`${
            isGrid ? "h-3 w-3/5" : "h-4 w-3/4"
          } rounded-md bg-gray-300`}
        />
        <View style={tw`flex-row items-center justify-between`}>
          <View
            style={tw`${
              isGrid ? "h-3 w-1/4" : "h-4 w-1/3"
            } rounded-md bg-gray-300`}
          />
          <View
            style={tw`${
              isGrid ? "h-3 w-1/5" : "h-4 w-1/4"
            } rounded-md bg-gray-300`}
          />
        </View>
      </View>
    </View>
  );
};
