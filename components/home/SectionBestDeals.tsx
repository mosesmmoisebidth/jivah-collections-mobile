import { View, ScrollView, Dimensions } from "react-native";
import tw from "twrnc";
import useGet from "../../hooks/useGet";
import { ProductType } from "@/utils/types/product";
import { OutfitSemibold } from "../StyledText";
import ProductCard, { ProductCardSkeleton } from "../product/ProductCard";

const SectionBestDeals = () => {
  const screenWidth = Dimensions.get("window").width * 0.9;
  const {
    data: products,
    loading,
    error,
  } = useGet<ProductType[]>("/products/best-deals", { authorized: true });

  return (
    <View style={tw`space-y-3   rounded-2xl`}>
      <View style={tw`flex-row justify-between items-center `}>
        <OutfitSemibold style={tw`text-xl font-medium`}>
          Top Best Deals!
        </OutfitSemibold>
      </View>
      {loading ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={tw`flex-row`}
        >
          {Array(5)
            .fill(null)
            .map((_, index) => (
              <View key={index} style={[tw`pr-2`, { width: screenWidth }]}>
                <ProductCardSkeleton />
              </View>
            ))}
        </ScrollView>
      ) : error ? (
        <OutfitSemibold style={tw`text-red-500 text-center`}>
          Error loading deals
        </OutfitSemibold>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={tw`flex-row`}
        >
          {products?.map((item,index) => (
            <View key={index} style={[tw`pr-2`, { width: screenWidth }]}>
              <ProductCard product={item} />
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default SectionBestDeals;
