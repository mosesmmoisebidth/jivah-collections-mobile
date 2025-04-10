import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import tw from "twrnc";
import Toast from "react-native-toast-message";
import { Svg, Path } from "react-native-svg";
import * as ImagePicker from "expo-image-picker";
import ApiService from "@/services/api";

interface AddEditReviewProps {
  productId: string;
  defaultData?: { id: string; comment: string; image: string; rating: number };
  onClose: () => void;
}

const AddEditReview: React.FC<AddEditReviewProps> = ({
  productId,
  defaultData,
  onClose,
}) => {
  const [comment, setComment] = useState(defaultData?.comment || "");
  const [image, setImage] = useState(defaultData?.image || "");
  const [rating, setRating] = useState(defaultData?.rating || 0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (defaultData) {
      setComment(defaultData.comment);
      setImage(defaultData.image);
      setRating(defaultData.rating);
    }
  }, [defaultData]);

  const handleRating = (index: number) => {
    setRating(index + 1);
  };

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!comment || rating === 0) {
      Toast.show({ type: "error", text1: "Comment and rating are required." });
      return;
    }

    setLoading(true);

    try {
      const data = { productId, comment, image, rating };

      if (defaultData) {
        await ApiService.authorized.patch(`/reviews/${defaultData.id}`, data);
        Toast.show({
          type: "success",
          text1: `Review updated with ${rating} stars!`,
        });
      } else {
        await ApiService.authorized.post("/reviews", data);
        Toast.show({
          type: "success",
          text1: `Review created with ${rating} stars!`,
        });
      }

      onClose();
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1:
          err.response?.data?.message ||
          `Failed to ${defaultData ? "update" : "create"} review`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={tw`p-5 bg-neutral-50 rounded-t-2xl`}>
      <Text style={tw`text-xl font-semibold mb-4`}>
        {defaultData ? "Edit Review" : "Add Review"}
      </Text>

      {/* Rating */}
      <Text style={tw`text-sm font-semibold mb-2`}>Rating</Text>
      <View style={tw`flex-row mb-4`}>
        {[...Array(5)].map((_, index) => (
          <TouchableOpacity key={index} onPress={() => handleRating(index)}>
            <Svg
              width={32}
              height={32}
              viewBox="0 0 24 24"
              fill={index < rating ? "#FFD700" : "#D1D5DB"}
            >
              <Path d="M12 17.3l-5.6 3 1.4-6-4.4-4 6.2-.5L12 2l2.4 5.8 6.2.5-4.4 4 1.4 6z" />
            </Svg>
          </TouchableOpacity>
        ))}
      </View>

      {/* Comment */}
      <Text style={tw`text-sm font-semibold mb-2`}>Comment</Text>
      <TextInput
        value={comment}
        onChangeText={setComment}
        placeholder="Enter review comment"
        style={tw`w-full p-3 border rounded-lg mb-4`}
      />

      {/* Image Upload */}
      <Text style={tw`text-sm font-semibold mb-2`}>Image (optional)</Text>
      <TouchableOpacity
        onPress={handleImagePick}
        style={tw`border p-3 rounded-lg mb-4`}
      >
        <Text style={tw`text-center text-blue-500`}>Pick an Image</Text>
      </TouchableOpacity>

      {image ? (
        <Image
          source={{ uri: image }}
          style={tw`w-20 h-20 rounded-lg self-center mb-4`}
        />
      ) : null}

      {/* Buttons */}
      <View style={tw`flex-row justify-between`}>
        <TouchableOpacity
          onPress={onClose}
          style={tw`bg-gray-300 px-4 py-3 rounded-lg flex-1 mr-2`}
        >
          <Text style={tw`text-center text-black`}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSubmit}
          style={tw`bg-green-500 px-4 py-3 rounded-lg flex-1 ml-2`}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={tw`text-center text-white font-semibold`}>
              {defaultData ? "Update Review" : "Add Review"}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddEditReview;
