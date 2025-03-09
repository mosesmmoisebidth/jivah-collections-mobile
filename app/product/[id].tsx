import React, { useEffect, useMemo, useRef, useState } from "react";
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
  FlatList,
  Animated,
  Dimensions,
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
import { StatusBar } from "expo-status-bar";
import { AntDesign, Ionicons } from "@expo/vector-icons";

// Product DTO definition
interface IProduct {
  brand: string;
  category: string;
  compare_at: number;
  discount: number;
  from_date: string;
  in_cart: number;
  in_stock: boolean;
  is_scheduled: boolean;
  price: number;
  product_description: string;
  product_gallery: string[];
  product_image: string;
  product_name: string;
  reviews: number;
  selling_type: string;
  sold: number;
  tax_added: boolean;
  tax_amount: number;
  to_date: string;
  variants: {
    id: string;
    color: string;
    size: string;
    price: number;
    quantity: number;
  }[];
}

const { height } = Dimensions.get("window");

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
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);

  const [mainImage, setMainImage] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [dialogType, setDialogType] = useState("cart");
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<
    IProduct["variants"][0] | null
  >(null);

  const fetchProduct = async () => {
    try {
      const productData = await ProductService.getProductById(productId);
      console.log(productData);
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

  const translateY = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: isDialogVisible ? 0 : height,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isDialogVisible]);

  const openDialog = (type: "cart" | "buy") => {
    setDialogType(type);
    setIsDialogVisible(true);
  };

  const getRandomLightColor = () => {
    const colors = [
      "#FFDDC1",
      "#D4E157",
      "#81D4FA",
      "#FFAB91",
      "#B39DDB",
      "#80CBC4",
      "#F48FB1",
      "#AED581",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
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
    <SafeAreaView style={tw`flex-1 bg-white relative`}>
      <View
        style={tw`absolute top-[5%] left-0  p-2 rounded-full  z-10 w-full flex-row justify-between`}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tw` bg-white p-2 rounded-full shadow-lg `}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView style={tw`bg-white`}>
        {/* Product Image Section */}
        <View style={tw`p-2 bg-gray-100 border-b border-gray-300 relative`}>
          <Image
            source={{ uri: mainImage }}
            style={tw`w-full h-80 rounded-xl border border-gray-300 `}
          />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={tw`flex-row justify-center mt-4`}
          >
            {[...product.product_gallery, product.product_image].map(
              (image, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setMainImage(image)}
                >
                  <Image
                    source={{ uri: image }}
                    style={tw`w-20 h-20 mx-1 rounded-lg border border-gray-300`}
                  />
                </TouchableOpacity>
              )
            )}
          </ScrollView>
        </View>

        {/* Product Info */}
        <View style={tw`p-5`}>
          <View>
            <OutfitSemibold style={tw`text-xl`}>
              {product.product_name}
            </OutfitSemibold>
          </View>
          <View style={tw`flex-row items-center justify-between mt-2`}>
            <View style={tw`flex-row items-center gap-2`}>
              <Text style={tw`text-xl font-bold text-[#c48647]`}>
                ${product.price}
              </Text>
              {product.compare_at > 0 && (
                <Text style={tw`text-gray-500 line-through text-lg`}>
                  ${product.compare_at}
                </Text>
              )}
              {product.tax_added && (
                <Text style={tw`text-gray-500 text-xs`}>
                  + tax (${product.tax_amount})
                </Text>
              )}
            </View>

            <View style={tw`flex-row items-center`}>
              <AntDesign name="star" size={14} color="#f1c40f" />
              <OutfitText style={tw`ml-1 text-base text-gray-600`}>
                {product.reviews}
              </OutfitText>
            </View>
          </View>
          <OutfitText style={tw`text-gray-500 text-sm leading-6 mt-2`}>
            {product.product_description}
          </OutfitText>
          <View style={tw`flex-row flex-wrap gap-2 mt-2`}>
            {[...product.category.split(","), product.brand].map(
              (cat, index) => (
                <View
                  key={index}
                  style={[
                    tw`px-3 py-1 rounded-full`,
                    { backgroundColor: `hsl(${(index * 40) % 360}, 70%, 80%)` },
                  ]}
                >
                  <Text
                    style={tw`text-gray-800 text-sm font-semibold capitalize`}
                  >
                    {cat.replaceAll("_", " ").trim()}
                  </Text>
                </View>
              )
            )}
          </View>

          {/* Variants */}
          <Text style={tw`text-base font-semibold mt-3 mb-1`}>Variants</Text>
          <FlatList
            data={product.variants}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => setSelectedVariant(item)}
                style={[
                  tw`px-4 py-2 mx-1 rounded-lg border-2`,
                  selectedVariant?.id === item.id
                    ? tw`border-black bg-gray-200`
                    : tw`border-gray-300`,
                ]}
              >
                <Text style={tw`text-sm`}>{item.size}</Text>
              </TouchableOpacity>
            )}
          />

          {/* Colors */}
          <Text style={tw`text-base font-semibold mt-3 mb-1`}>Color</Text>
          <FlatList
            data={product.variants}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={tw`flex-row items-center`}>
                <View
                  style={[
                    tw`w-10 h-10 mx-1 rounded-full border-2`,
                    { backgroundColor: item.color },
                  ]}
                />
              </View>
            )}
          />
        </View>

        {/* Buttons */}
        {product.in_stock && (
          <View
            style={tw`flex-row items-center justify-between gap-2 px-3 pb-3`}
          >
            <TouchableOpacity
              onPress={() => openDialog("buy")}
              style={tw`flex-1 p-4 bg-black rounded-full shadow-md`}
            >
              <OutfitSemibold style={tw`text-white text-center `}>
                Buy Now
              </OutfitSemibold>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => openDialog("cart")}
              style={tw`flex-1 p-4 bg-[#c48647] rounded-full shadow-md`}
            >
              <OutfitSemibold style={tw`text-white text-center `}>
                Add to Cart
              </OutfitSemibold>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
      {isDialogVisible && (
        <TouchableWithoutFeedback onPress={() => setIsDialogVisible(false)}>
          <View className="absolute left-0 top-0 w-full h-full inset-0 bg-black opacity-50" />
        </TouchableWithoutFeedback>
      )}
      <View
        style={[
          tw`p-5 absolute transition-all duration-200  left-0 w-full bg-white shadow-lg rounded-t-2xl`,
          isDialogVisible ? tw`bottom-0` : tw`top-[1000%]`,
        ]}
      >
        <ProductDialog
          id={id}
          onClose={() => setIsDialogVisible(false)}
          product={product}
          type={dialogType as any}
          onConfirm={(data) => console.log("Confirmed", data)}
        />
      </View>
      <StatusBar backgroundColor="transparent" style="dark" />
    </SafeAreaView>
  );
};

const ProductDialog: React.FC<{
  id: string;
  onClose: () => void;
  product: IProduct;
  type: "cart" | "buy";
  onConfirm: (data: {
    product: IProduct;
    selectedVariant: { color: string; size: string; id: string };
    quantity: number;
  }) => void;
}> = ({ id, onClose, product, type, onConfirm }) => {
  const [selectedVariant, setSelectedVariant] = useState<{
    color: string;
    size: string;
    id: string;
    quantity: number; // Add quantity to selectedVariant state
  }>({
    color: product.variants[0]?.color || "",
    size: product.variants[0]?.size || "",
    id: product.variants[0]?.id || "",
    quantity: product.variants[0]?.quantity || 0,
  });
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [addToCartLoading, setAddToCartLoading] = useState(false);

  const addToCart = async () => {
    setAddToCartLoading(true);
    try {
      await ProductService.addToCart(id, {
        quantity,
        size: selectedVariant.size,
        color: selectedVariant.color,
      });
      type == "buy" && router.push("/Checkout");
      onClose();
    } finally {
      setAddToCartLoading(false);
    }
  };

  const handleConfirm = async () => {
    setLoading(true);
    await onConfirm({ product, selectedVariant, quantity });
    setLoading(false);
    onClose();
  };

  const handleVariantSelection = (variant: {
    color: string;
    size: string;
    id: string;
    quantity: number;
  }) => {
    setSelectedVariant(variant);
    setQuantity(1); // Reset quantity to 1 when a new variant is selected
  };

  const increaseQuantity = () => {
    if (quantity < selectedVariant.quantity) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <View>
      <View style={tw`flex-row items-center justify-between`}>
        <Text style={tw`text-lg font-semibold capitalize`}>
          {product.product_name}
        </Text>

        <TouchableOpacity onPress={onClose} style={tw`p-2`}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={tw`flex-row items-center gap-2`}>
        <Text style={tw`text-xl font-bold text-[#c48647]`}>
          ${product.price}
        </Text>
        {product.compare_at > 0 && (
          <Text style={tw`text-gray-500 line-through text-lg`}>
            ${product.compare_at}
          </Text>
        )}
        {product.tax_added && product.tax_amount > 0 && (
          <Text style={tw`text-gray-500 text-xs`}>
            + tax (${product.tax_amount})
          </Text>
        )}
      </View>

      <View style={tw`mt-4`}>
        <Text style={tw`text-sm font-semibold`}>Select Variant</Text>
        <FlatList
          data={product.variants}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleVariantSelection(item)}
              style={tw`bg-gray-100 p-3 mb-2 rounded-lg flex-row justify-between items-center`}
            >
              <Text style={tw`text-sm font-semibold`}>{item.size}</Text>
              {selectedVariant.id === item.id && (
                <Ionicons name="checkmark" size={24} color="green" />
              )}
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={tw`flex-row items-center gap-4 mt-4`}>
        <View
          style={tw`flex-row items-center justify-between bg-gray-100 p-2 rounded-lg`}
        >
          <TouchableOpacity
            onPress={decreaseQuantity}
            style={tw`w-8 h-8 flex items-center justify-center bg-gray-300 rounded-full`}
            disabled={quantity <= 1}
          >
            <Text>-</Text>
          </TouchableOpacity>
          <Text style={tw`text-lg px-3`}>{quantity}</Text>
          <TouchableOpacity
            onPress={increaseQuantity}
            style={tw`w-8 h-8 flex items-center justify-center bg-gray-300 rounded-full`}
            disabled={quantity >= selectedVariant.quantity}
          >
            <Text>+</Text>
          </TouchableOpacity>
        </View>

        {type === "buy" && (
          <TouchableOpacity
            onPress={addToCart}
            disabled={addToCartLoading}
            style={tw`flex-grow mt-4 p-4 text-lg font-semibold ${
              addToCartLoading ? "bg-gray-400" : "bg-[#c48647]"
            } flex justify-center items-center rounded-full`}
          >
            {addToCartLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={tw`text-white`}>Buy Now</Text>
            )}
          </TouchableOpacity>
        )}

        {type === "cart" && (
          <TouchableOpacity
            onPress={addToCart}
            disabled={addToCartLoading}
            style={tw`flex-grow mt-4 p-4 text-lg font-semibold ${
              addToCartLoading ? "bg-gray-400" : "bg-[#c48647]"
            } flex justify-center items-center rounded-full`}
          >
            {addToCartLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={tw`text-white`}>Add to Cart</Text>
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ProductDetail;
