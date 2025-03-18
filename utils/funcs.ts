import ApiService from "@/services/api";
import Toast from "react-native-toast-message";

const addToCart = async ({
  inventoryId,
  quantity,
  onSuccess,
}: {
  inventoryId: string;
  quantity: number;
  onSuccess?: () => void;
}) => {
  try {
    await ApiService.authorized.post("/cart/add", {
      inventoryId,
      quantity,
    });
    Toast.show({
      type: "success",
      position: "top",
      text1: "Item added successfully",
    });
    onSuccess && onSuccess();
  } catch (error: any) {
    Toast.show({
      type: "error",
      position: "top",
      text1: error.response?.data?.message || "Failed to add item to cart",
    });
  }
};

export default addToCart;
