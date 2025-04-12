import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import tw from "twrnc";
import Toast from "react-native-toast-message";
import ApiService from "@/services/api";
import { OutfitBold, OutfitText } from "../StyledText";

interface CancelOrderProps {
  onSuccess?: () => void;
  onClose: () => void;
  orderId: string;
}

const CancelOrder: React.FC<CancelOrderProps> = ({
  onSuccess,
  orderId,
  onClose,
}) => {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!description) {
      Toast.show({
        type: "error",
        text1: "Please provide a reason to cancel the order.",
      });
      return;
    }

    setLoading(true);
    try {
      await ApiService.authorized.post(`/sales/${orderId}/cancel`, {
        reason: description,
      });
      Toast.show({ type: "success", text1: "Order cancelled successfully!" });
      if (onSuccess) onSuccess();
      onClose();
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: err.response?.data?.message || "Failed to cancel order",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View >
      <OutfitBold style={tw`text-xl font-semibold mb-4`}>Cancel Order</OutfitBold>

      {/* Reason Input */}
      <OutfitText style={tw`text-sm font-semibold mb-2`}>Reason</OutfitText>
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Enter reason for cancellation"
        multiline
        style={tw`w-full p-3 border border-neutral-300 rounded-lg mb-4`}
      />

      {/* Buttons */}
      <View style={tw`flex-row justify-between`}>
        <TouchableOpacity
          onPress={onClose}
          style={tw`bg-gray-300 px-4 py-3 rounded-lg flex-1 mr-2`}
          disabled={loading}
        >
          <OutfitText style={tw`text-center text-black`}>Cancel</OutfitText>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSubmit}
          style={tw`bg-red-500 px-4 py-3 rounded-lg flex-1 ml-2`}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <OutfitText style={tw`text-center text-white font-semibold`}>
              Cancel Order
            </OutfitText>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CancelOrder;
