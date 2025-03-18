import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useMemo, useRef } from "react";
import tw from "twrnc";
import useGet from "@/hooks/useGet";
import { ProductType } from "@/utils/types/product";
import ButtonPrimary from "../shared/buttons/ButtonPrimary";
import { OutfitBold, OutfitText } from "../StyledText";
import { router } from "expo-router";

const SORT_OPTIONS = ["trending", "latest", "popular", "least-popular"];

const SectionHeader = () => {
  const screenWidth = Dimensions.get("window").width * 0.94;

  // Memoize the random sort option so it does not change on re-renders
  const randomSort = useRef(
    SORT_OPTIONS[Math.floor(Math.random() * SORT_OPTIONS.length)]
  ).current;

  const {
    data: products,
    loading,
    error,
  } = useGet<{ items: ProductType[] }>(
    `/products?sort=${randomSort}&page=1&limit=10`,
    { authorized: true }
  );

  if (error) return null;

  return (
    <View style={tw`space-y-4 rounded-2xl`}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
      >
        {loading
          ? Array(5)
              .fill(null)
              .map((_, index) => (
                <View key={index} style={[tw`pr-3`, { width: screenWidth }]}>
                  <View
                    style={tw`w-full flex-row animate-pulse bg-gray-100 p-3 rounded-2xl`}
                  >
                    <View style={tw`basis-[55%]`}>
                      <View style={tw`h-6 w-1/4 bg-gray-300 rounded-xl my-2`} />
                      <View
                        style={tw`h-10 w-3/4 bg-gray-300 rounded-xl my-2`}
                      />
                      <View style={tw`h-4 w-2/3 bg-gray-300 rounded-xl my-2`} />
                      <View style={tw`h-10 w-32 bg-gray-400 rounded-xl my-2`} />
                    </View>
                    <View style={tw`basis-[45%]`}>
                      <View style={tw`h-40 w-full bg-gray-300 rounded-xl`} />
                    </View>
                  </View>
                </View>
              ))
          : products?.items.map((item) => (
              <View key={item.id} style={[tw`pr-3`, { width: screenWidth }]}>
                <View
                  style={tw`rounded-2xl bg-gray-100 p-3 flex-row items-center overflow-hidden`}
                >
                  <View style={tw`basis-[55%] gap-4`}>
                    <OutfitText style={tw`text-sm font-medium text-[#c48647]`}>
                      {typeof item.category === "string"
                        ? item.category
                        : item.category?.name || "Category"}
                    </OutfitText>
                    <OutfitBold
                      style={tw`text-2xl font-medium tracking-tight leading-none`}
                    >
                      {item.name}
                    </OutfitBold>
                    <OutfitText style={tw`text-neutral-500 text-sm w-[80%]`}>
                      {item.description || "Product description goes here..."}
                    </OutfitText>
                    <TouchableOpacity
                      onPress={() => {
                        router.push({
                          pathname: "/product/[id]",
                          params: { id: item.productId },
                        });
                      }}
                      style={tw`px-3 w-[70%] py-3 text-white bg-[#c48647] rounded-2xl `}
                    >
                      <OutfitText style={tw` text-white `}>
                        View Product
                      </OutfitText>
                    </TouchableOpacity>
                  </View>
                  <View style={tw`basis-[45%]`}>
                    <Image
                      source={{
                        uri: item.image || "https://via.placeholder.com/150",
                      }}
                      style={tw`w-full rounded-lg h-40`}
                    />
                  </View>
                </View>
              </View>
            ))}
      </ScrollView>
    </View>
  );
};

export default SectionHeader;
