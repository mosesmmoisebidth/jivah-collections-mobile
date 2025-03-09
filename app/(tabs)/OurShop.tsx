import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  TextInput,
  FlatList,
  Pressable,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import { OutfitSemibold, OutfitText } from "@/components/StyledText";
import { Feather, AntDesign, FontAwesome, Entypo } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/app/Header";
import tw from "twrnc";
import { StatusBar } from "expo-status-bar";
import { router, useLocalSearchParams } from "expo-router";
import ProductService from "@/services/api/product";
import { Product } from "@/utils/types/product";
import { categories } from "@/utils/constants/categories";
import { brands } from "@/utils/constants/brands"; // Assuming brands are imported similarly

type PriceRange = [number, number];

const OurShop: React.FC = () => {
  const { category, searchQuery } = useLocalSearchParams<{
    category: string;
    searchQuery: string;
  }>();
  const [text, setText] = useState<string>(searchQuery || "");
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [gridKey, setGridKey] = useState<string>("grid");
  const [filtersVisible, setFiltersVisible] = useState<boolean>(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<PriceRange>([0, 100]);
  const [selectedRating, setSelectedRating] = useState<number[]>([]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await ProductService.getAllProducts({
        search: text as any,
        category: selectedCategories,
        price_range: priceRange,
        rating: selectedRating,
        page: 1,
        limit: 10,
      });
      setProducts(response || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [text, selectedCategories, priceRange, selectedRating]);

  const resetFilters = () => {
    setText("");
    setSelectedCategories([]);
    setPriceRange([0, 100]);
    setSelectedRating([]);
    setFiltersVisible(false);
  };

  const ProductCard = ({ item }: { item: Product }) => (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/product/[id]",
          params: { id: item.id },
        })
      }
      style={tw`bg-white rounded-xl border border-gray-200 mb-4 w-full relative`}
    >
      <TouchableOpacity
        style={tw`absolute right-[2%] top-[2%] w-fit bg-gray-100 p-2 rounded-full`}
        onPress={() => console.log(`Liked product with id: ${item.id}`)}
      >
        <AntDesign name="hearto" size={24} color="gray" />
      </TouchableOpacity>
      <Image
        source={{ uri: item.product_image }}
        style={tw`rounded-t-xl h-64 w-full object-cover bg-gray-100`}
      />
      <View style={tw`px-3 py-2`}>
        <OutfitSemibold style={tw`text-lg text-gray-800`}>
          {item.product_name}
        </OutfitSemibold>
        <OutfitText
          numberOfLines={2}
          ellipsizeMode="tail"
          style={tw`text-sm text-gray-500`}
        >
          {item.product_description}
        </OutfitText>
        <View style={tw`flex-row items-center justify-between mt-2`}>
          <View style={tw`flex-row items-center`}>
            {item.compare_at > 0 && (
              <OutfitSemibold style={tw`text-base text-gray-500 line-through`}>
                {item.compare_at} Rwf
              </OutfitSemibold>
            )}
            <OutfitSemibold style={tw`text-xl text-[#c48647] ml-2`}>
              {item.price} Rwf
            </OutfitSemibold>
          </View>
          <View style={tw`flex-row items-center`}>
            <AntDesign name="star" size={14} color="#f1c40f" />
            <OutfitText style={tw`ml-1 text-base text-gray-600`}>
              {item.reviews}
            </OutfitText>
          </View>
        </View>
      </View>
    </Pressable>
  );

  const SkeletonCard = () => (
    <View style={tw`bg-gray-100 rounded-xl shadow-lg mb-4 w-full`}>
      <View style={tw`bg-gray-200 rounded-t-xl h-64 w-full`} />
      <View style={tw`p-2 gap-2`}>
        <View style={tw`h-4 bg-gray-300 w-3/4 rounded`} />
        <View style={tw`h-4 bg-gray-300 w-1/2 rounded`} />
        <View style={tw`h-4 bg-gray-300 w-1/3 rounded`} />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Header title={category ? `${category} Products` : "Our Shop"} cart />
      <View style={tw`bg-white px-2 pt-3 flex-1 gap-4`}>
        <View
          style={tw`flex-row gap-2 items-center bg-gray-100 border border-gray-300 px-3 py-1 rounded-full`}
        >
          <Feather name="search" size={21} color="black" />
          <TextInput
            style={tw`bg-transparent flex-1`}
            placeholder="Search..."
            value={text as any}
            onFocus={() => setText("")} // Clears input when focused
            onChangeText={(value) => setText(value)}
          />
          <TouchableOpacity onPress={() => setFiltersVisible(true)}>
            <Feather name="filter" size={21} color="black" />
          </TouchableOpacity>
        </View>

        <Modal
          visible={filtersVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setFiltersVisible(false)}
        >
          <View style={tw` justify-end bg-black bg-opacity-50`}>
            <View style={tw`bg-white p-4 rounded-t-xl `}>
              <View style={tw`flex-row justify-between items-center mb-4`}>
                <OutfitSemibold style={tw`text-lg`}>Filters</OutfitSemibold>
                <TouchableOpacity onPress={() => setFiltersVisible(false)}>
                  <FontAwesome name="times" size={22} color={"black"} />
                </TouchableOpacity>
              </View>

              <View style={tw``}>
                <OutfitSemibold style={tw`text-sm mb-2`}>
                  Categories
                </OutfitSemibold>
                <ScrollView
                  horizontal
                  contentContainerStyle={tw`flex-row items-center gap-4 py-3`}
                  showsHorizontalScrollIndicator={false}
                >
                  {categories.slice(0, 5).map((category) => (
                    <TouchableOpacity
                      key={category.name}
                      onPress={() =>
                        setSelectedCategories((prev) => [
                          ...prev,
                          category.name,
                        ])
                      }
                      style={[tw`flex items-center justify-center`]}
                    >
                      <View
                        style={[
                          tw`w-16 h-16 mb-2 flex items-center justify-center rounded-full border-gray-300`,
                          tw`bg-white border`,
                          selectedCategories.find((ct) => ct == category.name)
                            ? tw`bg-[#c48647]`
                            : tw`bg-white`,
                        ]}
                      >
                        {category.icon}
                      </View>
                      <OutfitText style={[tw`text-xs font-semibold`]}>
                        {category.name.length > 15
                          ? category.name.substring(0, 15) + "..."
                          : category.name}
                      </OutfitText>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              <View style={tw`mt-4`}>
                <OutfitSemibold style={tw`text-sm mb-2`}>Brands</OutfitSemibold>
                <View style={tw``}>
                  <ScrollView
                    horizontal
                    contentContainerStyle={tw`flex-row items-center gap-4 py-3`}
                    showsHorizontalScrollIndicator={false}
                  >
                    {brands.map((brand) => (
                      <TouchableOpacity
                        key={brand.name}
                        onPress={() =>
                          setSelectedBrands((prev) => [...prev, brand.name])
                        }
                        style={[
                          tw` items-center justify-center mb-4`,
                          selectedBrands.find((ct) => ct == brand.name)
                            ? tw`bg-[#c48647]`
                            : tw`bg-white`,
                        ]}
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
                        <OutfitText
                          style={[tw`text-xs font-semibold text-center`]}
                        >
                          {brand.name.length > 15
                            ? brand.name.substring(0, 15) + "..."
                            : brand.name}
                        </OutfitText>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </View>

              <View style={tw`mt-4`}>
                <OutfitSemibold style={tw`text-sm mb-2`}>
                  Price Range
                </OutfitSemibold>
                <View style={tw`flex-row justify-between gap-5`}>
                  <View style={tw`flex-col w-[48%]`}>
                    <OutfitText>Min:</OutfitText>
                    <TextInput
                      style={tw`border border-gray-300 p-2 rounded-2xl`}
                      keyboardType="numeric"
                      value={String(priceRange[0])}
                      onChangeText={(text) =>
                        setPriceRange([parseFloat(text) || 0, priceRange[1]])
                      }
                    />
                  </View>
                  <View style={tw`flex-col w-[48%]`}>
                    <OutfitText>Max:</OutfitText>
                    <TextInput
                      style={tw`border border-gray-300 p-2 rounded-2xl`}
                      keyboardType="numeric"
                      value={String(priceRange[1])}
                      onChangeText={(text) =>
                        setPriceRange([priceRange[0], parseFloat(text) || 0])
                      }
                    />
                  </View>
                </View>
              </View>

              <View style={tw`mt-4`}>
                <OutfitSemibold style={tw`text-sm mb-2`}>Rating</OutfitSemibold>
                <ScrollView
                  horizontal
                  contentContainerStyle={tw`flex-row items-center gap-4 py-3`}
                  showsHorizontalScrollIndicator={false}
                >
                  {[5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1, 0].map((rating) => (
                    <TouchableOpacity
                      key={rating}
                      onPress={() => {
                        if (selectedRating.includes(rating)) {
                          setSelectedRating(
                            selectedRating.filter((r) => r !== rating)
                          );
                        } else {
                          setSelectedRating([...selectedRating, rating]);
                        }
                      }}
                      style={[
                        tw`p-2 border border-gray-200 rounded-xl `,
                        selectedRating.includes(rating)
                          ? tw`bg-[#c48647]`
                          : tw`bg-white`,
                      ]}
                    >
                      <View
                        style={tw`flex flex-row items-center justify-center gap-2`}
                      >
                        <OutfitText style={tw``}>{rating}</OutfitText>
                        <FontAwesome
                          name="star"
                          size={16}
                          color={
                            selectedRating.includes(rating)
                              ? "white"
                              : "#f1c40f"
                          }
                        />
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              <View style={tw`mt-4`}>
                <TouchableOpacity
                  onPress={() => {
                    setFiltersVisible(false);
                    fetchProducts();
                  }}
                  style={tw`bg-[#c48647] p-3 rounded-full`}
                >
                  <OutfitText style={tw`text-white text-center`}>
                    Apply Filters
                  </OutfitText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {loading ? (
          <FlatList
            data={Array(6).fill(0)}
            keyExtractor={(_, index) => index.toString()}
            renderItem={() => <SkeletonCard />}
            numColumns={2}
            columnWrapperStyle={tw`justify-between`}
          />
        ) : (
          <FlatList
            key={gridKey} // Force re-render when changing layout
            data={products}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <ProductCard item={item} />}
            numColumns={2}
            columnWrapperStyle={tw`justify-between`}
            ListEmptyComponent={
              <View style={tw`mt-10 items-center`}>
                <OutfitText style={tw`text-center text-gray-500`}>
                  {category
                    ? `No products found for "${category}". 😰`
                    : "No products found. 😰"}
                </OutfitText>
                <TouchableOpacity onPress={resetFilters}>
                  <OutfitText style={tw`text-[#c48647] mt-4 underline`}>
                    See all products
                  </OutfitText>
                </TouchableOpacity>
              </View>
            }
          />
        )}
      </View>
      <StatusBar backgroundColor="transparent" style="dark" />
    </SafeAreaView>
  );
};

export default OurShop;
