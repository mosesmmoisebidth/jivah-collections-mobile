import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export interface BackButtonProps {
  style?: any;
}

const BackButton: React.FC<BackButtonProps> = ({ style = {} }) => {
  const handleBack = () => {
    router.back(); // Go back to the previous screen
  };

  return (
    <TouchableOpacity onPress={handleBack} style={[styles.button, style]}>
      <Ionicons name="arrow-back" size={24} color="black" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 18,
    elevation: 2,
  },
});

export default BackButton;
