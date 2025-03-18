import { FC, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import tw from "twrnc";

import { ProductType } from "@/utils/types/product";
import { OutfitBold, OutfitText } from "../StyledText";

interface ProductInfoTabProps {
  product: ProductType;
}

const ProductInfoTab: FC<ProductInfoTabProps> = ({ product }) => {
  const tabs = ["Overview", "Reviews"];
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <View>
      <OutfitBold style={tw`text-lg  mb-2`}>Product Info</OutfitBold>

      {/* Tab Buttons */}
      <View style={tw`flex-row mb-5`}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={tw`px-4 py-2 ${
              activeTab === tab ? "border-b-2 border-blue-500" : "text-gray-500"
            }`}
          >
            <OutfitText
              style={tw`${
                activeTab === tab ? "text-blue-500" : "text-gray-500"
              } text-base`}
            >
              {tab}
            </OutfitText>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab Content */}
      {activeTab === "Overview" ? (
        <OutfitText style={tw`text-gray-700 text-sm`}>
          {product.description}
        </OutfitText>
      ) : (
        <View style={tw`gap-4`}>
          {product.reviews.map((review) => (
            <View
              key={review.id}
              style={tw`p-3 border rounded-lg border-gray-200`}
            >
              <OutfitText style={tw`text-gray-600 text-xs`}>
                Rating: {review.rating}
              </OutfitText>
              <OutfitText style={tw`text-black`}>{review.comment}</OutfitText>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export const ProductInfoTabSkeleton = () => {
  return (
    <View >
      <OutfitText style={tw`text-lg font-bold mb-2`}>Product Info</OutfitText>

      <View style={tw`flex-row mb-5`}>
        <View style={tw`w-20 h-6 bg-gray-300 rounded-md`} />
        <View style={tw`w-20 h-6 bg-gray-300 rounded-md ml-2`} />
      </View>

      <View style={tw`mb-5`}>
        <View style={tw`h-4 w-1/2 bg-gray-300 rounded-md mb-3`} />
        <View style={tw`h-4 w-3/4 bg-gray-300 rounded-md mb-3`} />
        <View style={tw`h-4 w-2/3 bg-gray-300 rounded-md mb-3`} />
      </View>

      <View style={tw`gap-4`}>
        {Array(2)
          .fill(null)
          .map((_, index) => (
            <View key={index} style={tw`flex-row items-center gap-3`}>
              <View style={tw`w-12 h-12 bg-gray-300 rounded-full`} />
              <View>
                <View style={tw`h-4 w-20 bg-gray-300 rounded-md mb-1`} />
                <View style={tw`h-3 w-32 bg-gray-300 rounded-md`} />
              </View>
            </View>
          ))}
      </View>
    </View>
  );
};

export default ProductInfoTab;
