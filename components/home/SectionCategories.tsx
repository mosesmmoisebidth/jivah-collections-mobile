import { useState } from "react";
import { View, Image, ScrollView, TouchableOpacity } from "react-native";
import tw from "twrnc";
import useGet from "../../hooks/useGet";
import { CategoryType } from "@/utils/types/product";
import { OutfitSemibold, OutfitText } from "../StyledText";
import { router } from "expo-router";

const SectionCategories = () => {
  const {
    data: categories,
    loading: categoryLoading,
    error: categoryError,
  } = useGet<CategoryType[]>("/products/categories", { authorized: true });

  return (
    <View style={tw`space-y-4 `}>
      <OutfitSemibold style={tw`font-semibold text-xl`}>
        We have different Categories
      </OutfitSemibold>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={tw`flex-row`}
      >
        {categoryLoading && !categoryError ? (
          Array(5)
            .fill(null)
            .map((_, index) => (
              <View key={index} style={tw`items-center gap-4 p-4 w-30`}>
                <View style={tw`w-16 h-16 bg-gray-300 rounded-lg`} />
                <View style={tw`w-2/3 h-6 bg-gray-300 rounded-md`} />
              </View>
            ))
        ) : categoryError ? (
          <OutfitText style={tw`text-red-500`}>
            Error loading categories
          </OutfitText>
        ) : (
          categories?.map((item) => (
            <View key={item.id} style={tw`items-center space-y-4 p-4 w-30`}>
              <TouchableOpacity
                onPress={() => {
                  router.push({
                    pathname: "/(tabs)/OurShop",
                    params: { category: item.name },
                  });
                }}
                style={tw`w-16 h-16 bg-gray-200 rounded-2xl overflow-hidden`}
              >
                <Image source={{ uri: item.image }} style={tw`w-full h-full`} />
              </TouchableOpacity>
              <OutfitText style={tw`text-sm font-semibold text-center`}>
                {item.name}
              </OutfitText>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default SectionCategories;
