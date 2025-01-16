import React, { useCallback, useRef, useState } from 'react';
import {
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import { StatusBar } from 'expo-status-bar';
import { OutfitSemibold, OutfitText } from '@/components/StyledText';
import { categories } from '@/constants/Categories';
import ProductList from '@/components/app/ProductList';
import Header from '@/components/app/Header';
import { router } from 'expo-router';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Entypo } from '@expo/vector-icons';

export default function Home() {
  const [text, setText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    categories[0]?.name || null
  );
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [activeAdIndex, setActiveAdIndex] = useState(0); // Track active ad index

  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = ['60%', '80%'];

  const { width: screenWidth } = Dimensions.get('window');

  const handleProductClick = useCallback((product: any) => {
    setSelectedProduct(product);
    setIsBottomSheetOpen(true); // Open the BottomSheet and show overlay
    sheetRef.current?.snapToIndex(0); // Open the BottomSheet
  }, []);

  const handleClose = () => {
    setIsBottomSheetOpen(false); // Close the BottomSheet and remove overlay
    setSelectedProduct(null);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const adContent = [
    {
      id: 1,
      name: 'Women Collection',
      image: require('../../assets/images/hero.jpg'),
    },
    // {
    //   id: 2,
    //   name: 'Men Collection',
    //   image: require('../../assets/images/men.jpg'),
    // },
    // {
    //   id: 3,
    //   name: 'Children Collection',
    //   image: require('../../assets/images/kids.jpg'),
    // },
  ];

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const width = event.nativeEvent.layoutMeasurement.width;
    const currentIndex = Math.floor(contentOffsetX / width);
    setActiveAdIndex(currentIndex);
  };

  return (
    <SafeAreaView style={tw`bg-white`}>
      {/* Header */}
      <Header cart />

      {/* Main Content */}
      <ScrollView style={tw`bg-white`}>
        <View style={tw`mb-[5rem]`}>
          <OutfitText style={tw`text-2xl py-4 pt-3 mx-6`}>
            Find Clothes
          </OutfitText>

          {/* ad content */}
          <View>
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={handleScroll}
              scrollEventThrottle={16}
              contentContainerStyle={[
                tw`flex-row justify-between`, // Layout styles go here
              ]}
              style={[
                tw`bg-gray-200 rounded-2xl`,
                { width: screenWidth - 40, marginHorizontal: 20 }, // Overall container styles
              ]}
            >
              {adContent.map((ad) => (
                <View
                  key={ad.id}
                  style={tw`mx-5 flex-row justify-between bg-gray-200 rounded-2xl w-[20rem]`}
                >
                  <View
                    style={tw`w-[50%] bg-gray-200 rounded-2xl p-4 flex-col gap-2`}
                  >
                    <OutfitSemibold style={tw`text-xl`}>
                      {ad.name}
                    </OutfitSemibold>
                    <OutfitText>A Whole New Look</OutfitText>
                    <TouchableOpacity
                      onPress={() => router.push('/OurShop')}
                      style={tw`p-4 font-semibold text-2xl bg-[#c48647] py-2 px-4 flex justify-center items-center rounded-lg`}
                    >
                      <OutfitText
                        onPress={() => router.push('/OurShop')}
                        style={tw`text-white`}
                      >
                        SHOP NOW
                      </OutfitText>
                    </TouchableOpacity>
                  </View>
                  <Image
                    source={ad.image}
                    style={{
                      width: '50%',
                      height: '100%',
                    }}
                  />
                </View>
              ))}
            </ScrollView>

            {/* Dots indicator */}
            <View style={tw`flex-row justify-center items-center mt-2`}>
              {adContent.map((_, index) => (
                <View
                  key={index}
                  style={[
                    tw`w-2 h-2 rounded-full mx-1`,
                    activeAdIndex === index
                      ? tw`bg-[#c48647]`
                      : tw`bg-gray-300`,
                  ]}
                />
              ))}
            </View>
          </View>

          {/* Categories Section */}
          <View style={tw`pt-5 mx-6`}>
            <View style={tw`flex-row justify-between items-center`}>
              <OutfitSemibold style={tw`text-lg`}>Categories</OutfitSemibold>
              <OutfitText
                onPress={() => router.push('/Categories')}
                style={tw`text-lg`}
              >
                See All
              </OutfitText>
            </View>
            <ScrollView
              horizontal
              contentContainerStyle={tw`flex-row items-center gap-2 py-3`}
              showsHorizontalScrollIndicator={false}
            >
              {categories.slice(0, 5).map((category) => (
                <TouchableOpacity
                  key={category.name}
                  onPress={() => handleCategoryClick(category.name)}
                  style={[
                    tw`py-2 px-2 rounded-full border-gray-300`,
                    selectedCategory === category.name
                      ? tw`bg-[#c48647]`
                      : tw`bg-white border`,
                  ]}
                >
                  <OutfitText
                    style={[
                      tw`text-sm font-semibold`,
                      selectedCategory === category.name
                        ? tw`text-white`
                        : tw`text-black`,
                    ]}
                  >
                    {category.name}
                  </OutfitText>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Product Lists */}
          {/* <ProductList
            title="Best Selling"
            category="bestselling"
            
          /> */}
          <ProductList
            title="Latest Products"
            category="latest"
            
          />
        </View>
      </ScrollView>

      {/* Overlay background */}
      {isBottomSheetOpen && (
        <TouchableWithoutFeedback onPress={handleClose}>
          <View style={tw`absolute inset-0 bg-gray-600 opacity-50`} />
        </TouchableWithoutFeedback>
      )}

      {/* BottomSheet */}
      {selectedProduct && (
        <BottomSheet
          ref={sheetRef}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          onClose={handleClose}
          backgroundStyle={tw`bg-white`} // Ensure BottomSheet has white background
        >
          <BottomSheetView style={tw`p-4 px-6 flex-col gap-5`}>
            <View style={tw`flex-row items-center justify-between`}>
              <OutfitSemibold style={tw`text-lg`}>
                {selectedProduct.name}
              </OutfitSemibold>
              <TouchableOpacity
                onPress={() => router.push('/Cart')}
                style={tw`p-2 rounded-full shadow-sm bg-[#c48647]`}
              >
                <Entypo name="shopping-cart" size={20} color="white" />
              </TouchableOpacity>
            </View>
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
          </BottomSheetView>
        </BottomSheet>
      )}
      <StatusBar backgroundColor="transparent" style="dark" />
    </SafeAreaView>
  );
}
