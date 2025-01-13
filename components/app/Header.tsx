import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Entypo, FontAwesome6 } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import tw from 'twrnc';
import { OutfitSemibold, OutfitText } from '../StyledText';
import {
  useNavigation,
  DrawerActions,
  useRoute,
} from '@react-navigation/native';
import { useCart } from '@/Providers/CartContext';
import { router } from 'expo-router';

const Header = ({ title }: { title?: string }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const { cartItems } = useCart(); // Get cart items from context

  const isActive = (target: string) => route.name === target;

  return (
    <View
      style={tw`flex-row justify-between items-center py-3 pb-2 px-5 border-b border-slate-100`}
    >
      {!title && (
        <Image
          source={require('../../assets/images/logo.png')}
          style={{ width: 40, height: 40 }}
        />
      )}

      {title && (
        <View style={tw`flex-row gap-2 items-center`}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={tw`p-2 rounded-full bg-gray-200`}
          >
            <Ionicons name="chevron-back" size={21} color="black" />
          </TouchableOpacity>
          <OutfitSemibold style={tw`text-[#c48647] text-lg`}>
            {title}
          </OutfitSemibold>
        </View>
        
      )}

      <View style={tw`flex-row items-center gap-10 px-4`}>
        <View style={tw`relative`}>
          <TouchableOpacity onPress={() => router.push('/Cart')}>
            <Entypo
              name="shopping-cart"
              size={22}
              color={isActive('Cart') ? '#c48647' : 'black'}
            />
          </TouchableOpacity>
          <OutfitText
            style={tw`p-[2px] px-[7px] text-xs text-center rounded-full text-white absolute -top-3 -right-5 ${isActive('Cart') ? 'bg-[#c48647]' : 'bg-black'}`}
          >
            {cartItems.length}
          </OutfitText>
        </View>
        {/* <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <FontAwesome6
            name="bars"
            size={22}
            color={isActive('Drawer') ? '#c48647' : 'black'}
          />
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default Header;