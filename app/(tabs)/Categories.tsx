//@ts-nocheck
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
import { OutfitSemibold, OutfitText } from '@/components/StyledText';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import {
  MaterialIcons,
  FontAwesome,
  Ionicons,
  Entypo,
} from '@expo/vector-icons';

type CategoryTypes = {
  item: {
    name: string;
    iconLibrary: 'MaterialIcons' | 'FontAwesome' | 'Ionicons' | 'Entypo';
    icon: string;
    upcomingAmount: number;
  };
};

// Define random colors for icons
const iconColors = ['#d2a56d', '#ce8b54', '#bd7e4a', '#83502e'];
const lighterIconColors = ['#fcf1e6', '#fcf1e6', '#fcf1e6', '#fcedde'];

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * iconColors.length);
  return iconColors[randomIndex];
};

// Function to return the appropriate icon component
const getIconComponent = (
  library: 'MaterialIcons' | 'FontAwesome' | 'Ionicons' | 'Entypo',
  icon: string
) => {
  const iconColor = getRandomColor(); // Get a random color for the icon
  switch (library) {
    case 'MaterialIcons':
      return <MaterialIcons name={icon} size={24} color={iconColor} />;
    case 'FontAwesome':
      return <FontAwesome name={icon} size={24} color={iconColor} />;
    case 'Ionicons':
      return <Ionicons name={icon} size={24} color={iconColor} />;
    case 'Entypo':
      return <Entypo name={icon} size={24} color={iconColor} />;
    default:
      return null;
  }
};

// Component for each category
const Category = ({ item }: CategoryTypes) => {
  return (
    <Pressable
      onPress={() => {
        router.push({
          pathname: '/(tabs)/OurShop',
          params: { category: item.name },
        });
      }}
    >
      {/* Apply Linear Gradient as background */}
      <LinearGradient
        colors={lighterIconColors}
        start={[0, 1]}
        end={[0, 0]}
        style={tw`p-4 mb-3 rounded-lg shadow-lg h-[9.5rem] w-[9.8rem] flex-col justify-between`}
      >
        <View style={tw`mb-2`}>
          {getIconComponent(item.iconLibrary, item.icon)}
        </View>

        <View style={tw`flex-col gap-1`}>
          <OutfitSemibold style={tw`text-slate-600`}>
            {item.name}
          </OutfitSemibold>
          <OutfitText style={tw`text-slate-400 text-xs`}>
            {item.upcomingAmount} upcoming
          </OutfitText>
        </View>
      </LinearGradient>
    </Pressable>
  );
};

// Main Categories component
const Categories = () => {
  return (
    <SafeAreaView style={tw`bg-white flex-1 pt-6`}>
      <Header title="Categories" />

      <FlatList
        data={categories}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => <Category item={item} />}
        numColumns={2} // Set the number of columns
        columnWrapperStyle={tw`justify-between`}
        contentContainerStyle={tw`px-4 pb-4 pt-3`}
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
