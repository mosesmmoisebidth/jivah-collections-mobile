import { FC, useState } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import tw from "twrnc";

import { ProductType } from "@/utils/types/product";
import { OutfitBold, OutfitSemibold, OutfitText } from "../StyledText";
import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";

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
        <View style={tw`space-y-4`}>
          {product.reviews.map((review) => (
            <View key={review.id} style={tw`border p-4 rounded-lg shadow-sm`}>
              <View style={tw`flex-row items-start gap-3`}>
                <View
                  style={tw`w-10 h-10 bg-gray-300 items-center justify-center rounded-full`}
                >
                  <OutfitBold style={tw`text-white font-semibold`}>
                    {review.user?.name.charAt(0).toUpperCase()}
                  </OutfitBold>
                </View>
                <View style={tw`flex-1`}>
                  <View style={tw`flex-row justify-between items-center`}>
                    <OutfitSemibold style={tw`font-semibold`}>
                      {review.user?.name}
                    </OutfitSemibold>
                    <OutfitText style={tw`text-sm text-gray-500`}>
                      {format(new Date(review.createdAt), "PP")}
                    </OutfitText>
                  </View>

                  <View style={tw`flex-row mt-1`}>
                    {[...Array(5)].map((_, index) => (
                      <Ionicons
                        key={index}
                        name={index < review.rating ? "star" : "star-outline"}
                        size={16}
                        color={index < review.rating ? "#c48647" : "gray"}
                      />
                    ))}
                  </View>

                  {review.comment && (
                    <OutfitText style={tw`mt-2`}>{review.comment}</OutfitText>
                  )}

                  {review.image && (
                    <Image
                      source={{ uri: review.image }}
                      style={tw`mt-3 rounded-md w-full h-60`}
                      resizeMode="cover"
                    />
                  )}

                  {review.replies?.length > 0 && (
                    <View style={tw`mt-4 space-y-3`}>
                      <OutfitText
                        style={tw`text-sm font-semibold text-gray-600`}
                      >
                        Replies
                      </OutfitText>
                      {review.replies.map((reply) => (
                        <View
                          key={reply.id}
                          style={tw`flex-row items-start gap-3 border-l-4 border-gray-200 pl-3`}
                        >
                          <View
                            style={tw`w-8 h-8 bg-gray-400 items-center justify-center rounded-full`}
                          >
                            <OutfitBold style={tw`text-white font-semibold`}>
                              JC
                            </OutfitBold>
                          </View>
                          <View style={tw`flex-1`}>
                            <View
                              style={tw`flex-row justify-between items-center`}
                            >
                              <OutfitSemibold style={tw`text-sm font-semibold`}>
                                Jivah Collections Team
                              </OutfitSemibold>
                              <OutfitText style={tw`text-xs text-gray-500`}>
                                {format(new Date(reply.createdAt), "PP")}
                              </OutfitText>
                            </View>
                            <OutfitText style={tw`text-sm mt-1`}>
                              {reply.comment}
                            </OutfitText>
                          </View>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export const ProductInfoTabSkeleton = () => {
  return (
    <View>
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
