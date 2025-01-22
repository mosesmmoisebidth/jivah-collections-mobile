import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ToastAndroid,
  Platform,
  TouchableWithoutFeedback,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import Header from "@/components/app/Header";
import tw from "twrnc";
import ProductService from "@/services/api/product";
import { OutfitSemibold, OutfitText } from "@/components/StyledText";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import Separator from "@/components/app/Separator";

// Product DTO definition
interface ProductDTO {
  id: string;
  createdAt: string;
  updatedAt: string;
  product_name: string;
  short_description: string[];
  product_description: string[];
  regular_price: number;
  sale_price: number;
  discount_price: number;
  category: string;
  from_date: string;
  to_date: string;
  product_image: string;
  product_gallery: string[];
  tags: string[];
  in_stock: boolean;
  sku: string;
  isbn: string;
  track_stock: boolean;
  quantity: number;
  store_threshold: number;
}

const ProductDetail: React.FC = () => {
  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const route = useRoute();
  //@ts-ignore
  const { id } = route.params;
  const productId = String(id);
  const [product, setProduct] = useState<ProductDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [addToCartLoading, setAddToCardLoading] = useState(false);
  const [mainImage, setMainImage] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("info"); // State for switching between "Info" and "Reviews"
  const [reviewText, setReviewText] = useState("");

  const sheetRef = React.useRef<BottomSheet>(null);
  const snapPoints = ["60%", "90%"];

  const addToCart = async () => {
    setAddToCardLoading(true);
    await ProductService.addToCart(productId, quantity);
    setAddToCardLoading(false);
  };

  const fetchProduct = async () => {
    try {
      const productData = await ProductService.getProductById(productId);
      setProduct(productData);
      setMainImage(productData.product_image);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      ToastAndroid.show("Failed to fetch product details", ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const handleIncreaseQuantity = () => {
    if (quantity < (product?.quantity || 0)) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleTabChange = (tab: "info" | "reviews") => {
    setSelectedTab(tab);
  };

  const handleReviewSubmit = () => {
    if (reviewText.trim()) {
      // Submit review logic here
      setReviewText("");
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <View style={tw`flex-row p-4 gap-4`}>
          <View style={tw`w-32 h-32 bg-gray-300 rounded-xl`} />
          <View style={tw`flex-1`}>
            <View style={tw`w-3/4 h-5 bg-gray-300 mb-2`} />
            <View style={tw`w-1/2 h-5 bg-gray-300`} />
          </View>
        </View>
        <View style={tw`p-4`}>
          <View style={tw`w-2/3 h-8 bg-gray-300 mb-2`} />
          <View style={tw`w-1/3 h-8 bg-gray-300`} />
        </View>
        <View style={tw`p-4`}>
          <View style={tw`w-3/4 h-10 bg-gray-300 mb-3`} />
          <View style={tw`w-1/4 h-10 bg-gray-300`} />
        </View>
      </SafeAreaView>
    );
  }

  if (!product) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <OutfitText style={{ fontSize: 20 }}>Product not found 😔</OutfitText>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Header title={product.product_name} back cart />
      <ScrollView style={{ backgroundColor: "white" }}>
        <View style={{ marginBottom: 120 }}>
          {/* Main Image */}
          <View
            style={{
              padding: 16,
              backgroundColor: "#f4f4f4",
              borderBottomWidth: 1,
              borderBottomColor: "#dcdcdc",
            }}
          >
            <Image
              source={{ uri: mainImage }}
              style={{
                width: "100%",
                height: 250,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: "#dcdcdc",
              }}
            />
            <View style={tw`flex px-5 items-center justify-center`}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ flexDirection: "row", gap: 10, marginTop: 10 }}
              >
                {[...product.product_gallery, product.product_image]?.map(
                  (image, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => setMainImage(image)}
                    >
                      <Image
                        source={{ uri: image }}
                        style={{
                          width: 80,
                          height: 80,
                          borderRadius: 12,
                          borderWidth: 1,
                          borderColor: "#e1e1e1",
                        }}
                      />
                    </TouchableOpacity>
                  )
                )}
              </ScrollView>
            </View>
          </View>

          {/* Gallery Images */}

          {/* Product Details Tabs */}
          <View style={{ marginTop: 20, marginHorizontal: 16 }}>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => handleTabChange("info")}
                style={{
                  flex: 1,
                  padding: 12,
                  backgroundColor:
                    selectedTab === "info" ? "#c48647" : "#f4f4f4",
                  alignItems: "center",
                  borderTopLeftRadius: 12,
                  borderBottomLeftRadius: 12,
                }}
              >
                <OutfitText
                  style={{ color: selectedTab === "info" ? "white" : "black" }}
                >
                  Info
                </OutfitText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleTabChange("reviews")}
                style={{
                  flex: 1,
                  padding: 12,
                  backgroundColor:
                    selectedTab === "reviews" ? "#c48647" : "#f4f4f4",
                  alignItems: "center",
                  borderTopRightRadius: 12,
                  borderBottomRightRadius: 12,
                }}
              >
                <OutfitText
                  style={{
                    color: selectedTab === "reviews" ? "white" : "black",
                  }}
                >
                  Reviews
                </OutfitText>
              </TouchableOpacity>
            </View>

            {/* Info Tab Content */}
            {selectedTab === "info" && (
              <View style={{ paddingTop: 20 }}>
                {product.product_description?.map((desc, idx) => (
                  <OutfitText key={idx}>{desc}</OutfitText>
                ))}
                <Separator />
                <OutfitText>Tags: {product.tags?.join(", ")}</OutfitText>
                <OutfitText>SKU: {product.sku}</OutfitText>
                <OutfitText>ISBN: {product.isbn}</OutfitText>
                <OutfitText>
                  Remaining Stock: {product.quantity} items
                </OutfitText>
              </View>
            )}

            {/* Reviews Tab Content */}
            {selectedTab === "reviews" && (
              <View style={{ paddingTop: 20 }}>
                {/* Static Reviews */}
                <View style={tw`flex-row items-center p-4 `}>
                  <Image
                    source={{ uri: "https://via.placeholder.com/40" }} // Add user avatar URL
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      marginRight: 12,
                    }}
                  />
                  <View style={{ flex: 1 }}>
                    <OutfitSemibold style={{ fontSize: 14 }}>
                      John Doe
                    </OutfitSemibold>
                    <OutfitText style={{ fontSize: 12, color: "#555" }}>
                      This product is awesome!
                    </OutfitText>
                  </View>
                </View>

                {/* Review 2 */}
                <View style={tw`flex-row items-center p-4 `}>
                  <Image
                    source={{ uri: "https://via.placeholder.com/40" }} // Add user avatar URL
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      marginRight: 12,
                    }}
                  />
                  <View style={{ flex: 1 }}>
                    <OutfitSemibold style={{ fontSize: 14 }}>
                      Jane Smith
                    </OutfitSemibold>
                    <OutfitText style={{ fontSize: 12, color: "#555" }}>
                      Great quality and price.
                    </OutfitText>
                  </View>
                </View>

                {/* Review 3 */}
                <View style={tw`flex-row items-center p-4 `}>
                  <Image
                    source={{ uri: "https://via.placeholder.com/40" }} // Add user avatar URL
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      marginRight: 12,
                    }}
                  />
                  <View style={{ flex: 1 }}>
                    <OutfitSemibold style={{ fontSize: 14 }}>
                      Michael Lee
                    </OutfitSemibold>
                    <OutfitText style={{ fontSize: 12, color: "#555" }}>
                      Worth every penny.
                    </OutfitText>
                  </View>
                </View>
                <Separator />

                {/* Review Input */}
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: "#dcdcdc",
                    padding: 10,
                    borderRadius: 100,
                    marginBottom: 16,
                  }}
                  placeholder="Write a review..."
                  value={reviewText}
                  onChangeText={setReviewText}
                />
                <TouchableOpacity
                  onPress={handleReviewSubmit}
                  style={{
                    backgroundColor: "#c48647",
                    paddingVertical: 12,
                    borderRadius: 100,
                    alignItems: "center",
                  }}
                >
                  <OutfitText style={{ color: "white", fontSize: 16 }}>
                    Submit Review
                  </OutfitText>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Add to Cart Section */}
      {product.quantity > 0 && (
        <View
          style={tw`absolute bottom-0 left-0 right-0 p-4 bg-white shadow-lg`}
        >
          <View style={tw`flex-row items-center justify-between gap-4`}>
            <View style={tw`flex-row items-center`}>
              <TouchableOpacity
                onPress={handleDecreaseQuantity}
                style={tw`w-7 h-7 flex items-center justify-center  bg-gray-200 rounded-full`}
              >
                <OutfitText>-</OutfitText>
              </TouchableOpacity>
              <Text style={tw`p-4`}>{quantity}</Text>
              <TouchableOpacity
                onPress={handleIncreaseQuantity}
                style={tw`w-7 h-7 flex items-center justify-center  bg-gray-200 rounded-full`}
              >
                <OutfitText>+</OutfitText>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={addToCart}
              disabled={addToCartLoading}
              style={tw`p-4 font-semibold text-2xl flex-grow ${
                addToCartLoading ? "bg-gray-400" : "bg-[#c48647]"
              } flex justify-center items-center rounded-full`}
            >
              <View style={tw`flex-row items-center`}>
                {addToCartLoading && (
                  <ActivityIndicator
                    size="small"
                    color="white"
                    style={tw`mr-2`}
                  />
                )}
                <OutfitText style={tw`text-white`}>
                  {addToCartLoading ? "Loading..." : "Add to cart"}
                </OutfitText>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ProductDetail;
