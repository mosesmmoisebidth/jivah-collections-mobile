import React, { FC } from "react";
import { View, TouchableOpacity, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import tw from "twrnc";
import { OutfitSemibold, OutfitText } from "../StyledText";

interface Props {
  data: {
    provider: string;
    accountNumber: string;
  };
  onChange: (field: string, value: string) => void;
}

const PaymentInfo: FC<Props> = ({ data, onChange }) => {
  return (
    <View style={tw``}>
      <View style={tw`flex-row items-start pb-3`}>
        <View style={tw`hidden sm:block`}>
          {/* Expo Vector Icon for Delivery Truck */}
          <Ionicons name="car" size={24} color="#4F8EF7" />
        </View>

        <View style={tw`flex-1 flex-row justify-between`}>
          <View style={tw`sm:ml-8`}>
            <OutfitSemibold style={tw`uppercase `}>Payment</OutfitSemibold>
            <OutfitText style={tw`mt-1 text-sm font-semibold`}>
              {data.provider}, {data.accountNumber}
            </OutfitText>
          </View>
        </View>
      </View>

      <View style={tw`gap-y-4 border-t border-neutral-300 py-4`}>
        <View style={tw``}>
          <OutfitText style={tw`text-sm font-semibold`}>
            Address Type
          </OutfitText>
          <View style={tw`flex flex-row gap-2 `}>
            {/* Radio Buttons */}
            <TouchableOpacity
              style={tw`w-[48%] text-center px-5 py-4 border border-neutral-300 rounded-lg ${
                data.provider === "MTN" ? "bg-[#c48647] text-white" : ""
              }`}
              onPress={() => onChange("provider", "MTN")}
            >
              <OutfitText style={tw`text-sm `}>MTN</OutfitText>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`w-[48%] text-center px-5 py-4 border border-neutral-300 rounded-lg ${
                data.provider === "AIRTEL" ? "bg-[#c48647] text-white" : ""
              }`}
              onPress={() => onChange("provider", "AIRTEL")}
            >
              <OutfitText style={tw`text-sm `}>AIRTEL </OutfitText>
            </TouchableOpacity>
          </View>
        </View>
        <View style={tw`gap-y-4 sm:flex sm:space-x-3 sm:space-y-0`}>
          <View style={tw`flex-1`}>
            <OutfitText style={tw`text-sm font-semibold`}>
              Account Number
            </OutfitText>
            <TextInput
              style={tw`h-12 px-4 py-3 border border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-[#c48647] rounded-lg`}
              value={data.accountNumber}
              onChangeText={(text) => onChange("accountNumber", text)}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default PaymentInfo;
