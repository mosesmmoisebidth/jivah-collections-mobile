import React from "react";
import { TouchableOpacity, ActivityIndicator, Text } from "react-native";
import tw from "twrnc";

export interface ButtonProps {
  className?: string;
  translate?: string;
  sizeClass?: string;
  fontSize?: string;
  loading?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  className = "text-neutral-200 disabled:cursor-not-allowed",
  translate = "",
  sizeClass = "py-3 px-4 sm:py-3.5 sm:px-6",
  fontSize = "text-sm sm:text-base font-medium",
  disabled = false,
  onPress = () => {},
  children,
  loading,
}) => {
  const buttonStyle = tw`relative h-auto inline-flex items-center justify-center rounded-full transition-colors ${fontSize} ${sizeClass} ${translate} ${className}`;

  const renderLoading = () => {
    return <ActivityIndicator size="small" color="white" />;
  };

  return (
    <TouchableOpacity
      disabled={disabled || loading}
      style={buttonStyle}
      onPress={onPress}
    >
      {loading && renderLoading()}
      {!loading && (
        <Text style={tw`text-white`}>{children || "This is Button"}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
