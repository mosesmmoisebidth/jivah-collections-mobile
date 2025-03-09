import React, { useCallback, useRef, useState } from "react";
import {
  Animated,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Dimensions,
  Pressable,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { StatusBar } from "expo-status-bar";
import { OutfitSemibold, OutfitText } from "@/components/StyledText";
import { categories } from "@/utils/constants/categories";
import ProductList from "@/components/app/ProductList";
import Header from "@/components/app/Header";
import { router } from "expo-router";
import { Entypo, Feather } from "@expo/vector-icons";
import ProductsForYou from "@/components/ProductsForYou";
import Slideshow from "@/components/SlideShow";
import { FlatList } from "react-native-gesture-handler";

export default function Home() {
  const [text, setText] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [activeAdIndex, setActiveAdIndex] = useState(0);
  const snapPoints = ["60%", "80%"];

  const { width: screenWidth } = Dimensions.get("window");


  const handleClose = () => {
    setIsBottomSheetOpen(false);
    setSelectedProduct(null);
  };

  const handleCategoryClick = (category: string) => {
    router.push({
      pathname: "/(tabs)/OurShop",
      params: { category: category },
    });
  };

  const adContent = [
    {
      id: 1,
      name: "Women Collection",
      image: require("../../assets/images/hero.jpg"),
    },
    {
      id: 2,
      name: "Men Collection",
      image: require("../../assets/images/men.jpg"),
    },
    {
      id: 3,
      name: "Children Collection",
      image: require("../../assets/images/kids.jpg"),
    },
  ];

  const renderAdItem = (item: any) => (
    <View style={tw`relative w-full h-60 bg-gray-300 rounded-xl`}>
      <Image
        source={item.image}
        style={[tw`w-full h-full rounded-xl`, { resizeMode: 'cover' }]}
      />
      <View style={tw`absolute bottom-4 left-4`}>
        <Text style={tw`text-white text-xl font-semibold`}>{item.name}</Text>
        <TouchableOpacity
          onPress={() => console.log(`Navigating to ${item.name} collection`)}
          style={tw`mt-2 p-3 bg-[#c48647] rounded-lg`}
        >
          <Text>Explore Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );


  const renderItem = (item: any) => (
    <View
      key={item.id}
      style={tw`flex-row justify-between bg-gray-200 rounded-2xl  h-64 `}
    >
      <View
        style={tw`w-[50%] bg-gray-200 rounded-2xl p-4 flex-col gap-2`}
      >
        <OutfitSemibold style={tw`text-xl`}>
          {item.name}
        </OutfitSemibold>
        <OutfitText>A Whole New Look</OutfitText>
        <TouchableOpacity
          onPress={() => router.push("/OurShop")}
          style={tw`p-4 font-semibold text-2xl bg-[#c48647] py-2 px-4 flex justify-center items-center rounded-lg`}
        >
          <OutfitText style={tw`text-white`}>SHOP NOW</OutfitText>
        </TouchableOpacity>
      </View>
      <Image
        source={item.image}
        style={{
          width: "50%",
          height: "100%",
          borderRadius: 10,
        }}
        resizeMode="cover"
      />
    </View>
  );

  const { width } = Dimensions.get("screen")


  return (
    <SafeAreaView style={tw`bg-white`}>
      {/* Header */}
      <Header cart />

      {/* Main Content */}
      <ScrollView style={tw`bg-white gap-3 `} nestedScrollEnabled>
        <FlatList data={adContent} renderItem={({ item }: { item: any }) => {
          return <View
            key={item.id}
            style={[tw` px-4  py-3  `, { width: width }]}
          >
            <View style={[tw`flex-row justify-between bg-gray-200  gap-4 rounded-2xl p-4   `]} >
              <View
                style={tw`w-[50%]  p-4 flex-col gap-2`}
              >
                <OutfitSemibold style={tw`text-xl`}>
                  {item.name}
                </OutfitSemibold>
                <OutfitText>A Whole New Look</OutfitText>
                <TouchableOpacity
                  onPress={() => router.push("/OurShop")}
                  style={tw`p-4 font-semibold text-2xl bg-[#c48647] py-2 px-4 flex justify-center items-center rounded-lg`}
                >
                  <OutfitText style={tw`text-white`}>SHOP NOW</OutfitText>
                </TouchableOpacity>
              </View>
              <Image
                source={item.image}
                style={{
                  width: "50%",
                  height: "100%",
                  borderRadius: 10,
                }}
                resizeMode="cover"
              />
            </View>
          </View>
        }} horizontal showsHorizontalScrollIndicator={false} pagingEnabled />
        <View style={tw` px-3 gap-4`}>
          <OutfitText style={tw`text-2xl `}>Find Clothes</OutfitText>



          {/* Search Input */}
          <Pressable
            onPress={() => {
              router.push({
                pathname: "/(tabs)/OurShop",
                params: { searchQuery: text },
              });
            }}
          >
            <View
              style={tw`flex-row gap-2 items-center bg-gray-200 px-3 py-2.5 rounded-full`}
            >
              <Feather name="search" size={21} color="black" />
              <OutfitText>Search...</OutfitText>
            </View>
          </Pressable>

          {/* Categories Section */}
          <View style={tw``}>
            <View style={tw`flex-row justify-between items-center`}>
              <OutfitSemibold style={tw`text-lg`}>Categories</OutfitSemibold>
              <OutfitText
                onPress={() => router.push("/Categories")}
                style={tw`text-lg`}
              >
                See All
              </OutfitText>
            </View>
            <ScrollView
              horizontal
              contentContainerStyle={tw`flex-row items-center gap-4 py-3`}
              showsHorizontalScrollIndicator={false}
            >
              {categories.slice(0, 5).map((category) => (
                <TouchableOpacity
                  key={category.name}
                  onPress={() => handleCategoryClick(category.name)}
                  style={[tw` flex items-center justify-center`]}
                >
                  <View
                    style={[
                      tw`w-16 h-16 mb-2 flex items-center justify-center rounded-full border-gray-300`, tw`bg-white border`,
                    ]}
                  >
                    {category.icon}
                  </View>
                  <OutfitText style={[tw`text-xs font-semibold`]}>
                    {category.name.length > 15 ? category.name.substring(0, 15) + "..." : category.name}
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

        </View>
        <ProductsForYou onClickProduct={(id) => {
          router.push({
            pathname: "/product/[id]",
            params: { id: id },
          })
        }} />
      </ScrollView>

      <StatusBar backgroundColor="transparent" style="dark" />
    </SafeAreaView>
  );
}
