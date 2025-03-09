import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { OutfitText } from "../StyledText";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";

interface AppTextInputProps {
  label_name?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  type: "text" | "textarea" | "countrySelector" | "password";
  label?: boolean;
  prefixIcon?: JSX.Element;
  suffixIcon?: JSX.Element;
  errorMessage?: string;
  editable?: boolean; // Added editable prop
}

const AppTextInput: React.FC<AppTextInputProps> = ({
  label_name,
  placeholder,
  value,
  onChangeText,

  label,
  prefixIcon,
  suffixIcon,
  errorMessage,
  editable = true,
  type = "text",
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const countries = [
    "United States",
    "Canada",
    "United Kingdom",
    "India",
    "Australia",
  ];

  return (
    <View style={tw`flex-col gap-2 w-full`}>
      {label && (
        <OutfitText style={tw`text-base text-gray-500`}>
          {label_name}{" "}
          <OutfitText style={tw`text-lg text-red-600`}>*</OutfitText>
        </OutfitText>
      )}

      {["text", "textarea", "password"].includes(type) && (
        <View
          style={tw`flex-row items-center w-full px-4 py-2 gap-2 rounded-full bg-gray-100 border border-gray-300`}
        >
          {prefixIcon && <View>{prefixIcon}</View>}

          <TextInput
            style={tw`flex-1 text-gray-500`}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={type === "password" && !isPasswordVisible}
            multiline={type === "textarea"}
            textAlignVertical={type === "textarea" ? "top" : "center"}
            editable={editable} // Control editability
          />

          {type === "password" ? (
            <TouchableOpacity
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              <Ionicons
                name={isPasswordVisible ? "eye-off" : "eye"}
                size={20}
                color="gray"
              />
            </TouchableOpacity>
          ) : (
            suffixIcon && <View>{suffixIcon}</View>
          )}
        </View>
      )}

      {type === "countrySelector" && (
        <>
          <TouchableOpacity
            style={tw`w-full px-2 py-3 rounded-lg bg-slate-200`}
            onPress={() => console.log("Open country selector")}
          >
            <Text style={tw`text-gray-500`}>{value || "Select a country"}</Text>
          </TouchableOpacity>

          <FlatList
            data={countries}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={tw`p-3 border-b border-slate-300 text-gray-500`}
                onPress={() => onChangeText(item)}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
            style={tw`bg-white border rounded-lg max-h-[200px]`}
          />
        </>
      )}

      {errorMessage && (
        <Text style={tw`text-center text-red-600 text-sm mt-1`}>
          {errorMessage}
        </Text>
      )}
    </View>
  );
};

export default AppTextInput;
