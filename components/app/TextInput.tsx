import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList,
  KeyboardTypeOptions,
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
  editable?: boolean;
  keyboardType?: KeyboardTypeOptions; // New prop to specify keyboard type
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
  keyboardType = "default", // Default keyboard type
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
          style={[
            {
              paddingHorizontal: 16,
              paddingVertical: 8,
              gap: 8,
            },
            tw`flex-row items-center w-full px-4 py-2 gap-2 rounded-2xl bg-gray-100 border border-gray-300`,
          ]}
        >
          {prefixIcon && <View>{prefixIcon}</View>}

          <TextInput
            style={tw`flex-1 text-gray-500 py-2 p`}
            placeholder={placeholder}
            placeholderTextColor="gray"
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={type === "password" && !isPasswordVisible}
            multiline={type === "textarea"}
            textAlignVertical={type === "textarea" ? "top" : "center"}
            editable={editable}
            keyboardType={keyboardType} // Allow specifying keyboard type
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
            style={tw`bg-neutral-50 border rounded-lg max-h-[200px]`}
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
