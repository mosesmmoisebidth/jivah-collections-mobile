import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Modal from "react-native-modal";
import { Feather } from "@expo/vector-icons";

interface BottomDialogProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  height?: number;
}

const BottomDialog: React.FC<BottomDialogProps> = ({
  isVisible,
  onClose,
  children,
  height = 40,
}) => {
  const screenHeight = Dimensions.get("window").height;
  const modalHeight = (height / 100) * screenHeight;

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={styles.modal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      avoidKeyboard={true}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <View style={[styles.dialogContainer, { height: modalHeight }]}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Feather name="x" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.content}>{children}</View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  dialogContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 15,
    right: 15,
    zIndex: 10,
  },
  content: {
    width: "100%",
    marginTop: 20,
  },
});

export default BottomDialog;
