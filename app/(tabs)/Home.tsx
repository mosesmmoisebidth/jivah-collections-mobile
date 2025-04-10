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
import SectionHeader from "@/components/home/SectionHeader";
import SectionCategories from "@/components/home/SectionCategories";
import SectionBestDeals from "@/components/home/SectionBestDeals";
import SectionTrending from "@/components/home/SectionTrending";
import SectionMoreProducts from "@/components/product/SectionMoreProducts";

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

  const { width } = Dimensions.get("screen");

  return (
    <SafeAreaView style={tw`bg-neutral-50`}>
      {/* Header */}
      <Header cart />

      {/* Main Content */}
      <ScrollView style={tw`bg-neutral-50 gap-3  `} nestedScrollEnabled>
        <View style={tw` px-3 gap-4 mb-3`}>
          <SectionHeader />
        </View>
        <View style={tw` px-3 gap-2`}>
          <OutfitText style={tw`text-xl `}>Find Clothes</OutfitText>
          <View
            style={tw`flex-row items-center bg-gray-100 border border-gray-200 px-2 py-1 rounded-full w-full`}
          >
            <TextInput
              style={tw`flex-1 text-base text-black`}
              placeholder="Search..."
              placeholderTextColor="gray"
              value={text}
              onChangeText={setText}
            />
            <Pressable
              style={tw`border border-gray-400 rounded-full  p-2`}
              onPress={() => {
                if (text.trim()) {
                  router.push({
                    pathname: "/(tabs)/OurShop",
                    params: { search: text },
                  });
                }
              }}
            >
              <Feather name="search" size={21} color="black" />
            </Pressable>
          </View>
        </View>
        <View style={tw`bg-gray-100 mt-3 p-4`}>
          <SectionBestDeals />
        </View>
        <View style={tw` p-4`}>
          <SectionCategories />
        </View>
        <View style={tw`bg-gray-100 p-4 `}>
          <SectionTrending />
        </View>
        <View style={tw`p-4 mb-20`}>
          <SectionMoreProducts title="More Products" limit={10} />
        </View>
      </ScrollView>

      <StatusBar backgroundColor="transparent" style="dark" />
    </SafeAreaView>
  );
}
