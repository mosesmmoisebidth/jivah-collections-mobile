import ApiService from ".";
import Toast from "react-native-toast-message";
import StorageService from "../storage";

class ProductService {
  static async getAllProducts(params?: {
    category?: string[];
    search?: string;
    orderBy?: string;
    price_range?: [number, number];
    orderDirection?: string;
    rating?: number[];
    page?: number;
    limit?: number;
  }): Promise<any> {
    try {
      const response = await ApiService.unauthorized.get("/products/all", {
        params: {
          category: params?.category,
          search: params?.search,
          orderBy: params?.orderBy,
          orderDirection: params?.orderDirection,
          price_range: params?.price_range,
          rating: params?.rating,
          page: params?.page ?? 1,
          limit: params?.limit ?? 10,
        },
      });
      return response.data.payload.items;
    } catch (error) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Error",
        text2: "Failed to fetch all products.",
      });
    }
  }

  static async getProductById(id: string): Promise<any> {
    try {
      const response = await ApiService.unauthorized.get(
        `/products/product/${id}`
      );
      return response.data.payload;
    } catch (error) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Error",
        text2: "Failed to fetch the product details.",
      });
    }
  }

  static async addProduct(productData: any): Promise<any> {
    try {
      const response = await ApiService.authorized.post(
        "/products/product/add",
        productData
      );
      console.log(response);
      Toast.show({
        type: "success",
        position: "top",
        text1: "Product Added Successfully",
        text2: "The product has been successfully added to the catalog.",
      });
      return response.data;
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        position: "top",
        text1: "Product Addition Failed",
        text2: "There was an error while adding the product. Please try again.",
      });
    }
  }

  static async updateInventory(id: string, inventoryData: any): Promise<any> {
    try {
      const response = await ApiService.authorized.patch(
        `/products/product/inventory/${id}`,
        inventoryData
      );
      return response.data;
    } catch (error) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Error",
        text2: "Failed to update product inventory.",
      });
    }
  }

  static async updateGeneralDetails(
    id: string,
    generalData: any
  ): Promise<any> {
    try {
      const response = await ApiService.authorized.patch(
        `/products/product/general/${id}`,
        generalData
      );
      return response.data;
    } catch (error) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Error",
        text2: "Failed to update product details.",
      });
    }
  }

  static async updatePairQuantity(id: string, pairQuantity: any): Promise<any> {
    try {
      const response = await ApiService.authorized.patch(
        `/products/product/pair-quantity/${id}`,
        pairQuantity
      );
      return response.data;
    } catch (error) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Error",
        text2: "Failed to update pair quantity.",
      });
    }
  }

  static async addToCart(
    id: string,
    { quantity, size, color }: { quantity: number; size: string; color: string }
  ): Promise<any> {
    try {
      const response = await ApiService.authorized.patch(
        `/products/product/add-cart/${id}`,
        { quantity, size, color }
      );
      const cart = await this.viewCart();
      await StorageService.updateData("cart", cart);
      Toast.show({
        type: "success",
        position: "top",
        text1: "Item added to cart successfully",
        text2: "The item was added to the cart successfully!",
      });
      return response.data;
    } catch (error: any) {
      console.error(error.response.data.message);
      Toast.show({
        type: "error",
        position: "top",
        text1: "Error",
        text2: error.response.data.message || "Failed to add the product to the cart.",
      });
    }
  }

  static async removeFromCart(id: string): Promise<any> {
    try {
      const response = await ApiService.authorized.patch(
        `/products/product/remove-cart/${id}`
      );
      const cart = await this.viewCart();
      await StorageService.updateData("cart", cart);
      return response.data;
    } catch (error) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Error",
        text2: "Failed to remove the product from the cart.",
      });
    }
  }

  static async increaseCartQuantity(id: string): Promise<any> {
    try {
      const response = await ApiService.authorized.patch(
        `/products/product/update-cart-quantity/increase/${id}`
      );
      const cart = await this.viewCart();
      await StorageService.updateData("cart", cart);
      return response.data;
    } catch (error) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Error",
        text2: "Failed to increase cart quantity.",
      });
    }
  }

  static async decreaseCartQuantity(id: string): Promise<any> {
    try {
      const response = await ApiService.authorized.patch(
        `/products/product/update-cart-quantity/decrease/${id}`
      );
      const cart = await this.viewCart();
      await StorageService.updateData("cart", cart);
      return response.data;
    } catch (error) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Error",
        text2: "Failed to decrease cart quantity.",
      });
    }
  }

  static async viewCart(): Promise<any> {
    try {
      const response = await ApiService.authorized.get(
        "/products/product/cart/view"
      );
      return response.data.payload?.cart || [];
    } catch (error: any) {
      console.log(error.response.data);
      Toast.show({
        type: "error",
        position: "top",
        text1: "Error",
        text2: "Failed to fetch the cart.",
      });
    }
  }
}

export default ProductService;
