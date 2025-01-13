import {
  FlatList,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import Header from '@/components/app/Header';
import tw from 'twrnc';
import { categories } from '@/constants/Categories';
import { OutfitText } from '@/components/StyledText';
import { useNavigation } from '@react-navigation/native';

type CategoryTypes = {
  item: string;
};

const Category = ({ item }: CategoryTypes) => {
  return (
    <Pressable
      onPress={() => {
        console.log(`Category selected: ${item}`);
        // router.push(`/product/${item}`);
      }}
      style={tw`bg-gray-200 p-4 mb-3 rounded-lg shadow-sm`}
    >
      <Text style={tw`text-lg text-black font-semibold`}>{item}</Text>
    </Pressable>
  );
};

const Categories = () => {
  const navigation = useNavigation();
  
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false, // Disable header here
    });
  }, [navigation]);
  return (
      <SafeAreaView style={tw`bg-white flex-1 pt-6`}>
      {/* Header */}
      <Header title="Categories" />

      {/* Main Content */}
      <FlatList
        data={categories}
        keyExtractor={(index) => index.toString()} // Use index if no unique IDs
        renderItem={({ item }) => <Category item={item} />} // Pass `item` to Category component
        contentContainerStyle={tw`px-4 flex-col gap-3 pb-4 pt-3`}
        ListEmptyComponent={
          <OutfitText style={tw`text-center text-gray-500 mt-10`}>
            No Category found. 😰
          </OutfitText>
        }
      />
      <StatusBar backgroundColor="transparent" style="dark" />
    </SafeAreaView>
  );
};

export default Categories;
