import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import tw from "twrnc";
import ProductService from "@/services/api/product";
import { OutfitSemibold, OutfitText } from "@/components/StyledText";
import { AntDesign } from "@expo/vector-icons";
import { brands } from "@/utils/constants/brands";

interface Product {
  id: string;
  product_name: string;
  product_description: string;
  product_image: string;
  price: number;
  compare_at: number;
  createdAt: string;
}

interface ProductsForYouProps {
  onClickProduct: (id: string) => void;
}

const ProductsForYou: React.FC<ProductsForYouProps> = ({ onClickProduct }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await ProductService.getAllProducts({
        page: 1,
        limit: 20,
      });
      setProducts(response || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const getLatestProducts = (): Product[] => {
    return [...products].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  };

  const getBestForYouProducts = (): Product[] => {
    const randomProducts: Product[] = [];
    while (randomProducts.length < 5 && products.length > 0) {
      const randomIndex = Math.floor(Math.random() * products.length);
      const product = products[randomIndex];
      if (!randomProducts.includes(product)) {
        randomProducts.push(product);
      }
    }
    return randomProducts;
  };

  const ProductCard: React.FC<{ item: Product }> = ({ item }) => (
    <TouchableOpacity
      style={tw`bg-white rounded-xl border border-gray-300 mb-6 w-64 mx-1`}
      onPress={() => onClickProduct(item.id)}
    >
      <Image
        source={{ uri: item.product_image }}
        style={tw`rounded-t-xl h-40 w-full object-cover border-b border-gray-300`}
      />
      <View style={tw`px-4 py-2 gap-1`}>
        <OutfitSemibold style={tw`text-base text-gray-800`}>
          {item.product_name}
        </OutfitSemibold>
        <OutfitText
          numberOfLines={2}
          ellipsizeMode="tail"
          style={tw`text-xs text-gray-500`}
        >
          {item.product_description}
        </OutfitText>
        <View style={tw`flex-row items-center justify-between`}>
          <View style={tw`flex-row items-center`}>
            {item.compare_at > 0 && (
              <OutfitSemibold style={tw`text-sm text-gray-500 line-through`}>
                {item.compare_at} Rwf
              </OutfitSemibold>
            )}
            <OutfitSemibold style={tw`text-xl text-[#c48647] ml-2`}>
              {item.price} Rwf
            </OutfitSemibold>
          </View>
          <View style={tw`bg-gray-100 p-2 rounded-full`}>
            <AntDesign name="shoppingcart" size={24} color="gray" />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderSkeletonLoader = () => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {[...Array(5)].map((_, index) => (
        <View
          key={index}
          style={tw`bg-gray-200 rounded-xl shadow-lg mb-4 w-64 h-60 mx-1`}
        >
          <View style={tw`bg-gray-300 rounded-t-xl h-40 w-full`} />
          <View style={tw`p-2 gap-2`}>
            <View style={tw`h-4 bg-gray-400 w-3/4 rounded`} />
            <View style={tw`h-4 bg-gray-400 w-1/2 rounded`} />
            <View style={tw`h-4 bg-gray-400 w-1/3 rounded`} />
          </View>
        </View>
      ))}
    </ScrollView>
  );

  return (
    <View style={tw`bg-gray-100 flex-1 p-4 gap-3 mb-20`}>
      <View>
        <OutfitSemibold style={tw`text-lg text-gray-800 mb-2`}>
          Latest Products
        </OutfitSemibold>
        {loading ? (
          renderSkeletonLoader()
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {getLatestProducts().map((product) => (
              <ProductCard key={product.id} item={product} />
            ))}
          </ScrollView>
        )}
      </View>
      <View style={tw``}>
        <View style={tw`flex-row justify-between items-center`}>
          <OutfitSemibold style={tw`text-lg`}>Different Brands</OutfitSemibold>
        </View>
        <View style={tw`py-3`}>
          <View style={tw`flex-row flex-wrap justify-between`}>
            {brands.slice(0, 6).map((brand) => (
              <TouchableOpacity
                key={brand.name}
                onPress={() => console.log(brand.name)}
                style={[tw`w-1/3 items-center justify-center mb-4`]}
              >
                <View
                  style={[
                    tw`w-16 h-16 mb-2 flex items-center justify-center rounded-full border-gray-300`,
                    tw`bg-white border`,
                  ]}
                >
                  <Image
                    source={{ uri: brand.image }}
                    style={[
                      tw`w-full h-full rounded-full`,
                      { resizeMode: "cover", backgroundColor: "white" },
                    ]}
                  />
                </View>
                <OutfitText style={[tw`text-xs font-semibold text-center`]}>
                  {brand.name.length > 15
                    ? brand.name.substring(0, 15) + "..."
                    : brand.name}
                </OutfitText>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      <View>
        <OutfitSemibold style={tw`text-lg text-gray-800 mb-2`}>
          Best For You
        </OutfitSemibold>
        {loading ? (
          renderSkeletonLoader()
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {getBestForYouProducts().map((product) => (
              <ProductCard key={product.id} item={product} />
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default ProductsForYou;
