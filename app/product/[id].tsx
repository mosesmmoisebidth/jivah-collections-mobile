import React, { useCallback, useRef, useState } from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ToastAndroid,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import Header from '@/components/app/Header';
import ProductList from '@/components/app/ProductList';
import Separator from '@/components/app/Separator';
import { OutfitSemibold, OutfitText } from '@/components/StyledText';
import { products } from '@/constants/Products';
import tw from 'twrnc';
import { useCart } from '@/Providers/CartContext';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { router } from 'expo-router';

const ProductDetail: React.FC = () => {
  const navigation = useNavigation();
  
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false, // Disable header here
    });
  }, [navigation]);
  const route = useRoute();
  //@ts-ignore
  const { id } = route.params || {};

  const productId = Number(id);

  if (!productId) {
    return <Text>Loading...</Text>;
  }

  const product = products?.find((item) => item.id === productId);

  if (!product) {
    console.log('Product not found for id:', id);
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <OutfitText style={tw`text-xl`}>Product not found 😔</OutfitText>
      </View>
    );
  }

  const { cartItems, setCartItems } = useCart(); // Access global cart state
  const [mainImage, setMainImage] = React.useState(product.image);

  const addToCart = () => {
    if (!cartItems.includes(productId)) {
      const updatedCart = [...cartItems, productId];
      setCartItems(updatedCart); // Update context state

      const message = `${product.name} added to cart!`;
      if (Platform.OS === 'android') {
        ToastAndroid.show(message, ToastAndroid.SHORT);
      }
    } else {
      const message = `${product.name} is already in the cart!`;
      if (Platform.OS === 'android') {
        ToastAndroid.show(message, ToastAndroid.SHORT);
      }
    }
  };

  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = ['60%', '90%'];

  const handleProductClick = useCallback((product: any) => {
    setSelectedProduct(product);
    setIsBottomSheetOpen(true); // Open the BottomSheet and show overlay
    sheetRef.current?.snapToIndex(0); // Open the BottomSheet
  }, []);

  const handleClose = () => {
    setIsBottomSheetOpen(false); // Close the BottomSheet and remove overlay
    setSelectedProduct(null);
  };

  return (
    <SafeAreaView style={tw`bg-white`}>
      {/* Header */}
      <Header title={product.name} />

      {/* Main Content */}
      <ScrollView style={tw`bg-white`}>
        <View style={tw`mb-[5rem] flex-col gap-5`}>
          <View style={tw`p-4 bg-slate-200 border-b border-slate-400`}>
            {/* Display main image */}
            {mainImage ? (
              <Image
                source={mainImage}
                style={tw`rounded-xl w-full border border-slate-400`}
              />
            ) : (
              <Image
                source={product.image}
                style={tw`rounded-xl w-full border border-slate-400`}
              />
            )}
          </View>
          <View style={tw`px-4`}>
            <OutfitSemibold style={tw`text-lg`}>{product.name}</OutfitSemibold>
            <View style={tw`flex-row gap-5 items-center`}>
              <View style={tw`flex items-center gap-1`}>
                <OutfitText style={tw`text-gray-500`}>$</OutfitText>
                <OutfitText style={tw`text-lg ext-gray-500`}>
                  {product.price}
                </OutfitText>
              </View>
              <View style={tw`flex items-center gap-1`}>
                <OutfitText style={tw`text-gray-500`}>Category:</OutfitText>
                <OutfitText style={tw`text-lg text-gray-500`}>
                  {product.category}
                </OutfitText>
              </View>
            </View>
            <View style={tw`flex-col gap-2 pt-2`}>
              <OutfitText>Other Colors:</OutfitText>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={tw`flex flex-row gap-4`}
              >
                {/* Loop through other colors and display images */}
                {product.otherColors?.map((colorImage, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setMainImage(colorImage)}
                  >
                    <Image
                      source={colorImage}
                      style={tw`w-[9rem] h-[9rem] border border-gray-300 rounded-lg mx-2`}
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <Separator />
              <View style={tw`flex-col gap-4`}>
                <OutfitSemibold>Description</OutfitSemibold>
                <OutfitText>{product.description}</OutfitText>
                <TouchableOpacity
                  onPress={() => {
                    addToCart(); // Call addToCart
                    handleProductClick(product); // Call handleProductClick with the product
                  }}
                  style={tw`p-4 font-semibold text-2xl bg-[#c48647] flex justify-center items-center rounded-lg`}
                >
                  <OutfitText style={tw`text-white`}>ADD TO CART</OutfitText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <ProductList
            title="Latest Products"
            tag="bestselling"
            onProductClick={() => console.log('hello')}
          />
        </View>
      </ScrollView>
      {isBottomSheetOpen && (
        <TouchableWithoutFeedback onPress={handleClose}>
          <View style={tw`absolute inset-0 bg-gray-600 opacity-50`} />
        </TouchableWithoutFeedback>
      )}
      {selectedProduct && (
        <BottomSheet
          ref={sheetRef}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          onClose={handleClose}
          backgroundStyle={tw`bg-white`} // Ensure BottomSheet has white background
        >
          <BottomSheetView style={tw`p-4 px-6 flex-col gap-5`}>
            <OutfitSemibold style={tw`text-lg`}>
              {selectedProduct.name}
            </OutfitSemibold>
            <View style={tw`p-2 rounded-lg bg-gray-300`}>
              <Image
                source={selectedProduct.image}
                style={tw`w-full rounded-lg`}
              />
            </View>
            <View style={tw`flex-col gap-2`}>
              <OutfitSemibold>Description</OutfitSemibold>
              <OutfitText>{selectedProduct.description}</OutfitText>
            </View>
            <TouchableOpacity
              onPress={() => router.push('/Cart')} // Attach addToCart function
              style={tw`p-4 font-semibold text-2xl bg-[#c48647] flex justify-center items-center rounded-lg`}
            >
              <OutfitText style={tw`text-white`}>View Cart</OutfitText>
            </TouchableOpacity>
          </BottomSheetView>
        </BottomSheet>
      )}
    </SafeAreaView>
  );
};

export default ProductDetail;
