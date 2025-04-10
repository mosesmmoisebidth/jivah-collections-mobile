import React, { FC } from "react";
import { View, TouchableOpacity, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import tw from "twrnc";
import { OutfitSemibold, OutfitText } from "../StyledText";

interface Props {
  data: {
    address: string;
    city: string;
    country: string;
    phone: string;
    addressType: string;
  };
  onChange: (field: string, value: string) => void;
}

const ShippingAddress: FC<Props> = ({ data, onChange }) => {
  return (
    <View style={tw``}>
      <View style={tw`flex-row items-start pb-3`}>
        <View style={tw`hidden sm:block`}>
          {/* Expo Vector Icon for Delivery Truck */}
          <Ionicons name="car" size={24} color="#4F8EF7" />
        </View>

        <View style={tw`flex-1 flex-row justify-between`}>
          <View style={tw`sm:ml-8`}>
            <OutfitSemibold style={tw`uppercase `}>
              SHIPPING ADDRESS
            </OutfitSemibold>
            <OutfitText style={tw`mt-1 text-sm font-semibold`}>
              {data.address}, {data.city}, {data.phone}
            </OutfitText>
          </View>
        </View>
      </View>

      <View style={tw`gap-y-4 border-t border-neutral-300 py-4`}>
        <View style={tw`gap-y-4 sm:flex sm:space-x-3 sm:space-y-0`}>
          <View style={tw`flex-1`}>
            <OutfitText style={tw`text-sm font-semibold`}>Address</OutfitText>
            <TextInput
              style={tw`h-12 px-4 py-3 border border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-[#c48647] rounded-lg`}
              value={data.address}
              onChangeText={(text) => onChange("address", text)}
            />
          </View>
        </View>

        <View style={tw`grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-3`}>
          <View>
            <OutfitText style={tw`text-sm font-semibold`}>City</OutfitText>
            <TextInput
              style={tw`h-12 px-4 py-3 border border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-[#c48647] rounded-lg`}
              value={data.city}
              onChangeText={(text) => onChange("city", text)}
            />
          </View>
          <View>
            <OutfitText style={tw`text-sm font-semibold`}>Country</OutfitText>
            <TextInput
              style={tw`h-12 px-4 py-3 border border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-[#c48647] rounded-lg`}
              value={data.country}
              onChangeText={(text) => onChange("country", text)}
            />
          </View>
        </View>

        <View style={tw`grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-3`}>
          <View>
            <OutfitText style={tw`text-sm font-semibold`}>Phone</OutfitText>
            <TextInput
              style={tw`h-12 px-4 py-3 border border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-[#c48647] rounded-lg`}
              value={data.phone}
              onChangeText={(text) => onChange("phone", text)}
            />
          </View>
        </View>
      </View>
      <View style={tw``}>
        <OutfitText style={tw`text-sm font-semibold`}>Address Type</OutfitText>
        <View style={tw`flex flex-row gap-2 `}>
          {/* Radio Buttons */}
          <TouchableOpacity
            style={tw`w-[48%] text-center px-5 py-4 border border-neutral-300 rounded-lg ${
              data.addressType === "Home" ? "bg-[#c48647] text-white" : ""
            }`}
            onPress={() => onChange("addressType", "Home")}
          >
            <OutfitText style={tw`text-sm `}>Home</OutfitText>
            <OutfitText style={tw`text-sm `}>(All Day Delivery)</OutfitText>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`w-[48%] text-center px-5 py-4 border border-neutral-300 rounded-lg ${
              data.addressType === "Office" ? "bg-[#c48647] text-white" : ""
            }`}
            onPress={() => onChange("addressType", "Office")}
          >
            <OutfitText style={tw`text-sm `}>Office </OutfitText>
            <OutfitText style={tw`text-sm `}>(Delivery 9 AM - 5 PM)</OutfitText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ShippingAddress;
