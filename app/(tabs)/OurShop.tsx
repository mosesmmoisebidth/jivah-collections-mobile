import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import Header from "@/components/app/Header";
import tw from "twrnc";
import { StatusBar } from "expo-status-bar";
import useGet from "@/hooks/useGet";
import ProductCard, {
  ProductCardSkeleton,
} from "@/components/product/ProductCard";
import { ProductType } from "@/utils/types/product";
import ProductFilters from "@/components/product/Filters";
import { OutfitSemibold, OutfitText } from "@/components/StyledText";
import { useLocalSearchParams } from "expo-router";

const OurShop: React.FC = () => {
  const searchParams = useLocalSearchParams<{
    category: string;
    search: string;
  }>();
  console.log("Here are search params");
  console.log(searchParams);

  const [filters, setFilters] = useState<{
    category: string | null;
    sizes: string[];
    colors: string[];
    priceRange: [string, string];
    search: string;
  }>({
    category: searchParams.category ?? "",
    colors: [],
    sizes: [],
    search: searchParams.search ?? "",
    priceRange: ["0", "10000000"],
  });
  const [pagination, setPagination] = useState({ page: 1, limit: 50 });
  const [sorting, setSorting] = useState<string>("latest");

  const {
    data: productData,
    loading,
    error,
    refetch,
  } = useGet<{
    total: number;
    items: ProductType[];
    page: number;
    limit: number;
  }>(
    `/products/?category=${filters.category}&colors=${filters.colors.join(
      ","
    )}&sizes=${filters.sizes.join(",")}&search=${filters.search}&minPrice=${
      filters.priceRange[0]
    }&maxPrice=${filters.priceRange[1]}&page=${pagination.page}&limit=${
      pagination.limit
    }&sort=${sorting}`,
    { authorized: true }
  );

  useEffect(() => {
    refetch();
  }, [filters]);

  if (error) {
    return (
      <SafeAreaView style={tw`flex-1 items-center justify-center p-6`}>
        <OutfitSemibold style={tw`text-6xl font-bold text-red-500`}>
          Error
        </OutfitSemibold>
        <OutfitText style={tw`text-xl font-semibold mt-4`}>
          Oops, something went wrong
        </OutfitText>
        <OutfitText style={tw`text-gray-500 mt-2 text-center`}>
          {error || "An unexpected error occurred. Please try again later."}
        </OutfitText>
        <TouchableOpacity
          style={tw`mt-6 px-10 py-3 bg-[#c48647] rounded-2xl`}
          onPress={() => refetch()}
        >
          <OutfitText style={tw`text-white text-lg font-semibold`}>
            Try Again
          </OutfitText>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={tw`bg-neutral-50 flex-1`}>
      <Header title="Our Shop" cart />
      <View style={tw`px-4 pt-3 flex-1`}>
        <View
          style={tw`flex-row items-center border-gray-200 mb-3 border p-1.5 rounded-full`}
        >
          <Feather name="search" size={21} color="grey" />
          <TextInput
            style={tw`flex-1 bg-transparent ml-2`}
            placeholder="Search..."
            value={filters.search}
            onChangeText={(value) => setFilters({ ...filters, search: value })}
          />
          <ProductFilters
            selectedFilters={filters}
            onChange={(f) =>
              setFilters((prev) => ({ ...f, search: prev.search }))
            }
          />
        </View>

        {loading ? (
          <FlatList
            data={Array(6).fill(0)}
            keyExtractor={(_item, index) => index.toString()}
            numColumns={2}
            columnWrapperStyle={tw`justify-between`}
            renderItem={() => (
              <View style={tw`w-[48%] mb-4`}>
                <ProductCardSkeleton layout="grid" />
              </View>
            )}
            ListFooterComponent={<View style={tw`h-10 bg-transparent`} />}
          />
        ) : (
          <FlatList
            data={productData?.items}
            keyExtractor={(item, index) =>
              item?.id?.toString() || index.toString()
            }
            numColumns={2}
            columnWrapperStyle={tw`justify-between`}
            renderItem={({ item }) => (
              <View style={tw`w-[48%] mb-4`}>
                <ProductCard layout="grid" product={item} />
              </View>
            )}
            ListEmptyComponent={
              !loading && !productData ? null : (
                <View style={tw`h-full items-center justify-center pt-[30%]`}>
                  <OutfitSemibold style={tw`text-2xl font-bold text-[#c48647]`}>
                    {Object.values(filters).some((value) => value)
                      ? "No Items Matching Your Filters"
                      : "No Products Available"}
                  </OutfitSemibold>
                  <OutfitText
                    style={tw`text-lg text-gray-500 mt-2 text-center`}
                  >
                    {Object.values(filters).some((value) => value)
                      ? "We couldn't find any products that match your filters. Please try adjusting them."
                      : "We couldn't find any products at the moment. Please check back later."}
                  </OutfitText>
                  <View style={tw`flex-row justify-between mt-5 gap-5 p-2`}>
                    {Object.values(filters).some((value) => value) && (
                      <TouchableOpacity
                        onPress={() =>
                          setFilters({
                            category: "",
                            colors: [],
                            sizes: [],
                            search: "",
                            priceRange: ["0", "10000000"],
                          })
                        }
                        style={tw`rounded-2xl border-[#c48647] border px-10 py-3  `}
                      >
                        <OutfitText style={tw`text-center `}>
                          Reset Filters
                        </OutfitText>
                      </TouchableOpacity>
                    )}
                    <TouchableOpacity
                      style={tw`px-10 py-3 bg-[#c48647] rounded-2xl`}
                      onPress={() => refetch()}
                    >
                      <OutfitText style={tw`text-white  font-semibold`}>
                        Refresh
                      </OutfitText>
                    </TouchableOpacity>
                  </View>
                </View>
              )
            }
          />
        )}
      </View>
      <StatusBar backgroundColor="transparent" style="dark" />
    </SafeAreaView>
  );
};

export default OurShop;
