import React from 'react';
import { ScrollView, View } from 'react-native';
import { OutfitSemibold, OutfitText } from '../StyledText';
import tw from 'twrnc';
import Product from './Product';
import { products } from '@/constants/Products';
import { router } from 'expo-router';

interface ProductListProps {
  title: string;
  tag: string;
  onProductClick: (product: any) => void; // Added this to the interface
}

const ProductList: React.FC<ProductListProps> = ({ title, tag, onProductClick }) => {
  const filteredProducts = products.filter((product) => product.tag === tag);

  return (
    <View style={tw`pt-4`}>
      <View style={tw`flex-row justify-between items-center px-6`}>
        {/* title */}
        <OutfitSemibold style={tw`text-lg`}>{title}</OutfitSemibold>
        <OutfitText onPress={() => router.push('/OurShop')} style={tw`text-lg`}>
          See All
        </OutfitText>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={tw`flex-row items-center gap-4 py-3 px-4`}
      >
        {filteredProducts.map((product) => (
          // Pass the product to the Product component
          <Product key={product.id} product={product} onProductClick={onProductClick} />
        ))}
      </ScrollView>
    </View>
  );
};

export default ProductList;
