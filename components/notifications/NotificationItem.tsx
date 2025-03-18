import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Feather, AntDesign, MaterialIcons } from "@expo/vector-icons";
import tw from "twrnc";
import { OutfitSemibold, OutfitText } from "../StyledText";
import { NotificationItem as INotification } from "@/utils/types";

interface NotificationItemProps {
  item: INotification;
  onPress?: () => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  item,
  onPress,
}) => {
  const { title, message, type, createdAt, read } = item;

  const getIcon = () => {
    switch (type) {
      case "INFO":
        return <Feather name="info" size={24} color="#3b82f6" />;
      case "WARNING":
        return <AntDesign name="warning" size={24} color="#f59e0b" />;
      case "SUCCESS":
        return <Feather name="check-circle" size={24} color="#10b981" />;
      case "ERROR":
        return <MaterialIcons name="error-outline" size={24} color="#ef4444" />;
      default:
        return <Feather name="bell" size={24} color="#6b7280" />;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={tw`flex-row items-center p-4 rounded-xl ${
        read ? "bg-gray-100" : "bg-white"
      } shadow-md`}
    >
      <View style={tw`mr-4`}>{getIcon()}</View>
      <View style={tw`flex-1`}>
        <OutfitSemibold style={tw`text-lg text-gray-900`}>
          {title}
        </OutfitSemibold>
        <OutfitText style={tw`text-sm text-gray-600`}>{message}</OutfitText>
        <OutfitText style={tw`text-xs text-gray-400 mt-1`}>
          {new Date(createdAt).toLocaleString()}
        </OutfitText>
      </View>
    </TouchableOpacity>
  );
};

export default NotificationItem;

export const NotificationItemSkeleton: React.FC = () => {
  return (
    <View
      style={tw`flex-row items-center p-4 rounded-xl bg-gray-100 animate-pulse`}
    >
      <View style={tw`mr-4 w-6 h-6 bg-gray-200 rounded-full`} />
      <View style={tw`flex-1 gap-y-2`}>
        <View style={tw`h-4 bg-gray-200 rounded w-3/4`} />
        <View style={tw`h-3 bg-gray-200 rounded w-5/6`} />
        <View style={tw`h-2 bg-gray-200 rounded w-1/2`} />
      </View>
    </View>
  );
};
