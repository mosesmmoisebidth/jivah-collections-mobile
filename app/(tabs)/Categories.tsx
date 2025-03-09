import React, { useState } from "react";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  TextInput,
  View,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Header from "@/components/app/Header";
import tw from "twrnc";
import { categories } from "@/utils/constants/categories";
import { OutfitText } from "@/components/StyledText";
import { router } from "expo-router"; // Import router for navigation
import { Feather, FontAwesome } from "@expo/vector-icons";

const Category = ({ category }: any) => {
  return (
    <Pressable
      onPress={() => {
        router.push({
          pathname: "/categories/[category]",
          params: { category: category.name },
        });
      }}
      style={[tw`py-3 px-4  flex items-center justify-center w-[48%]`]}
    >
      <View style={tw` rounded-full border border-gray-300`}>
        {/* Replace icon with image */}
        <Image
          source={{ uri: category.image }}
          style={tw`w-30 h-30 rounded-full`} // Adjust the size as needed
          resizeMode="cover"
        />
      </View>
      <OutfitText style={tw`text-sm font-semibold text-black mt-3`}>
        {category.name}
      </OutfitText>
    </Pressable>
  );
};

const Categories = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={tw`bg-white flex-1 pt-6`}>
      <Header title="Categories" cart />
      <View style={tw`flex-row gap-2 items-center bg-gray-100 border border-gray-300 px-3 py-1 rounded-full mx-2`}>
        <Feather name="search" size={21} color="black" />
        <TextInput
          style={tw`bg-transparent flex-1`}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <FlatList
        data={filteredCategories}
        numColumns={2}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => <Category category={item} />}
        ListEmptyComponent={
          <View style={tw`flex-1 items-center justify-center`}>
            <FontAwesome name="search" size={50} color="gray" />
            <OutfitText style={tw`text-center text-gray-500 mt-4`}>
              No categories found for "{searchQuery}"
            </OutfitText>
          </View>
        }
      />
      <StatusBar backgroundColor="transparent" style="dark" />
    </SafeAreaView>
  );
};

export default Categories;
