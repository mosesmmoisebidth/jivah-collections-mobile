import { FC } from "react";
import { View } from "react-native";
import tw from "twrnc";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { ReviewType } from "@/utils/types/product";
import { OutfitBold, OutfitText } from "../StyledText";

interface RatingsProps {
  reviews: ReviewType[];
}

const Ratings: FC<RatingsProps> = ({ reviews }) => {
  const ratingDetails = [5, 4, 3, 2, 1].map((title) => {
    const ratingCount =
      reviews.filter((review) => review.rating === title)?.length || 0;
    return { title, value: ratingCount };
  });

  const totalReviews = reviews.length;
  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews || 0;

  return (
    <View>
      <OutfitBold style={tw`text-lg font-bold mb-2`}>Ratings</OutfitBold>

      <View style={tw`flex-row items-center gap-5 `}>
        <View style={tw`text-center  h-fit pt-5`}>
          <OutfitText style={tw`text-5xl`}>
            {averageRating.toFixed(1) || 0}
            <OutfitText style={tw`text-gray-500`}>/5</OutfitText>
          </OutfitText>
          <OutfitText
            style={tw`text-gray-500 text-sm`}
          >{`(${totalReviews} Reviews)`}</OutfitText>
        </View>

        <View style={tw`flex-1`}>
          {ratingDetails.map((ratingItem) => (
            <View
              key={ratingItem.title}
              style={tw`flex-row items-center gap-2 mb-2`}
            >
              <View style={tw`flex-row items-center gap-1`}>
                <MaterialCommunityIcons name="star" size={18} color="gold" />
                <OutfitText style={tw`font-medium text-black`}>
                  {ratingItem.title}
                </OutfitText>
              </View>
              <View
                style={tw`flex-1 h-2 bg-gray-200 rounded-full overflow-hidden`}
              >
                <View
                  style={[
                    tw`h-2 bg-yellow-400 rounded-full`,
                    { width: `${(ratingItem.value / totalReviews) * 100}%` },
                  ]}
                />
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export const RatingsSkeleton = () => {
  return (
    <View >
      <OutfitText style={tw`text-lg font-bold mb-2`}>Ratings</OutfitText>

      <View style={tw`flex-row items-center gap-5`}>
        <View style={tw`items-center`}>
          <View
            style={tw`w-20 h-[50px] bg-gray-300 animate-pulse rounded-md`}
          />
          <View
            style={tw`w-24 h-5 bg-gray-300 animate-pulse rounded-md mt-2`}
          />
        </View>

        <View style={tw`flex-1`}>
          {Array(5)
            .fill(null)
            .map((_, index) => (
              <View key={index} style={tw`flex-row items-center gap-2 mb-2`}>
                <View
                  style={tw`w-5 h-5 bg-gray-300 animate-pulse rounded-full`}
                />
                <View
                  style={tw`w-8 h-3 bg-gray-300 animate-pulse rounded-md`}
                />
                <View
                  style={tw`flex-1 h-3 bg-gray-300 animate-pulse rounded-md`}
                />
              </View>
            ))}
        </View>
      </View>
    </View>
  );
};

export default Ratings;
