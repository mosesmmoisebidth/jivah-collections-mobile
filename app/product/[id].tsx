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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import Header from "@/components/app/Header";
import tw from "twrnc";
import ProductList from "@/components/app/ProductList";
import Separator from "@/components/app/Separator";
import { OutfitSemibold, OutfitText } from "@/components/StyledText";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import { Product } from "@/utils/types/product";
import ProductService from "@/services/api/product";

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
  const [product, setProduct] = useState<Product | null>(null); // Define state to store product details
  const [loading, setLoading] = useState(true);
  const [addToCartLoading, setAddToCardLoading] = useState(false);
  const [mainImage, setMainImage] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const sheetRef = React.useRef<BottomSheet>(null);
  const snapPoints = ["60%", "90%"];

  const addToCart = async () => {
    setAddToCardLoading(true);
    await ProductService.addToCart(productId, 1);
    setAddToCardLoading(false);
  };

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
    setIsBottomSheetOpen(true);
    sheetRef.current?.snapToIndex(0);
  };

  const handleClose = () => {
    setIsBottomSheetOpen(false);
    setSelectedProduct(null);
  };

  const fetchProduct = async () => {
    try {
      const productData = await ProductService.getProductById(productId); // Use ProductsService
      setProduct(productData);
      setMainImage(productData.product_image); // Set initial image
      setLoading(false);
    } catch (error) {
      setLoading(false);
      ToastAndroid.show("Failed to fetch product details", ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

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
      <Header title={product.product_name} />
      <ScrollView style={{ backgroundColor: "white" }}>
        <View style={{ marginBottom: 80, paddingVertical: 16 }}>
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
          </View>
          <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
            <OutfitSemibold style={{ fontSize: 18 }}>
              {product.product_name}
            </OutfitSemibold>
            <View
              style={{
                flexDirection: "row",
                gap: 20,
                alignItems: "center",
                marginVertical: 10,
              }}
            >
              <OutfitText style={{ color: "#777" }}>
                ${product.regular_price}
              </OutfitText>
              <OutfitText style={{ fontSize: 16, color: "#777" }}>
                Category: {product.category}
              </OutfitText>
            </View>
            <OutfitText>{product.product_description?.join(" ")}</OutfitText>

            <Separator />
            <OutfitSemibold>Other Images:</OutfitSemibold>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ flexDirection: "row", gap: 10 }}
            >
              {product.product_gallery?.map((image, index) => (
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
              ))}
            </ScrollView>

            <Separator />
            {/* <TouchableOpacity
              onPress={addToCart}
              style={{
                backgroundColor: "#c48647",
                paddingVertical: 16,
                borderRadius: 8,
                alignItems: "center",
              }}
              disabled={addToCartLoading}
            >
              <OutfitText style={{ color: "white", fontSize: 18 }}>
                Add to Cart
              </OutfitText>
            </TouchableOpacity> */}

            <TouchableOpacity
              onPress={addToCart}
              disabled={addToCartLoading}
              style={tw`p-4 font-semibold text-2xl ${
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
        {/* <ProductList
          title="Latest Products"
          tag="bestselling"
          onProductClick={() => console.log("hello")}
        /> */}
      </ScrollView>

      {isBottomSheetOpen && (
        <TouchableWithoutFeedback onPress={handleClose}>
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          />
        </TouchableWithoutFeedback>
      )}

      {selectedProduct && (
        <BottomSheet
          ref={sheetRef}
          snapPoints={snapPoints}
          enablePanDownToClose
          onClose={handleClose}
          backgroundStyle={{ backgroundColor: "white" }}
        >
          <BottomSheetView style={{ padding: 16 }}>
            <OutfitSemibold style={{ fontSize: 18 }}>
              {selectedProduct.product_name}
            </OutfitSemibold>
            <Image
              source={{ uri: selectedProduct.product_image }}
              style={{ width: "100%", height: 200, borderRadius: 12 }}
            />
            <OutfitText>
              {selectedProduct.product_description?.join(" ")}
            </OutfitText>
            <TouchableOpacity
              onPress={() => router.push("/Cart")}
              style={{
                backgroundColor: "#c48647",
                paddingVertical: 16,
                borderRadius: 8,
                alignItems: "center",
                marginTop: 16,
              }}
            >
              <OutfitText style={{ color: "white", fontSize: 18 }}>
                View Cart
              </OutfitText>
            </TouchableOpacity>
          </BottomSheetView>
        </BottomSheet>
      )}
    </SafeAreaView>
  );
};

export default ProductDetail;
