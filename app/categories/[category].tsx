import React, { useEffect, useState } from "react";
import {
    View,
    Image,
    TextInput,
    FlatList,
    Pressable,
    TouchableOpacity,
} from "react-native";
import { OutfitSemibold, OutfitText } from "@/components/StyledText";
import { Feather, AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/app/Header";
import tw from "twrnc";
import { StatusBar } from "expo-status-bar";
import { router, useLocalSearchParams } from "expo-router";
import ProductService from "@/services/api/product";
import { Product } from "@/utils/types/product";
import { useRoute } from "@react-navigation/native";

const CategoryProducts = () => {
    const route = useRoute();
    const { category }: any = route.params;
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [gridKey, setGridKey] = useState("grid");

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await ProductService.getAllProducts({
                search: text as any,
                category: (category || "") as string,
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
    }, [text, category]);

    const resetFilters = () => {
        setText("");
        setGridKey(prevKey => prevKey === "grid" ? "grid-alt" : "grid");
    };

    const ProductCard = ({ item }: { item: Product }) => (
        <Pressable
            onPress={() =>
                router.push({
                    pathname: "/product/[id]",
                    params: { id: item.id },
                })
            }
            style={tw`bg-neutral-50 rounded-xl border border-gray-200 mb-3 w-[49%] relative`}
        >
            <TouchableOpacity
                style={tw`absolute right-[2%] top-[2%] w-fit bg-gray-100 p-2 rounded-full`}
                onPress={() => console.log(`Liked product with id: ${item.id}`)}
            >
                <AntDesign name="hearto" size={24} color="gray" />
            </TouchableOpacity>
            <Image
                source={{ uri: item.product_image }}
                style={tw`rounded-t-xl h-40 w-full object-cover bg-gray-100`}
            />
            <View style={tw`px-2 py-1 gap-2 border-t border-red-50`}>
                <OutfitSemibold style={tw`text-sm text-gray-800 capitalize`}>
                    {item.product_name}
                </OutfitSemibold>
                <View style={tw`flex-row items-center justify-between`}>
                    <View style={tw`flex-row items-center`}>
                        {item.discount_price == item.sale_price ?
                            <>
                                <OutfitSemibold style={tw`text-xl text-[#c48647] ml-2`}>
                                    ${item.discount_price}
                                </OutfitSemibold></> :
                            <>
                                <OutfitSemibold style={tw`text-sm text-gray-500 line-through`}>
                                    ${item.sale_price}
                                </OutfitSemibold>
                                <OutfitSemibold style={tw`text-xl text-[#c48647] ml-2`}>
                                    ${item.discount_price}
                                </OutfitSemibold></>}
                    </View>
                </View>
            </View>
        </Pressable>
    );

    const SkeletonCard = () => (
        <View style={tw`bg-gray-100 rounded-xl shadow-lg mb-4 w-[48%]`}>
            <View style={tw`bg-gray-200 rounded-t-xl h-40 w-full`} />
            <View style={tw`p-2 gap-2`}>
                <View style={tw`h-4 bg-gray-300 w-3/4 rounded`} />
                <View style={tw`h-4 bg-gray-300 w-1/2 rounded`} />
                <View style={tw`h-4 bg-gray-300 w-1/3 rounded`} />
            </View>
        </View>
    );

    return (
        <SafeAreaView style={tw`bg-neutral-50 flex-1`}>
            <Header title={`${category} Products`} back cart />
            <View style={tw`bg-neutral-50 px-2 pt-3 flex-1 gap-4`}>
                <View style={tw`flex-row gap-2 items-center bg-gray-100 border border-gray-300 px-3 py-1 rounded-full`}>
                    <Feather name="search" size={21} color="black" />
                    <TextInput
                        style={tw`bg-transparent flex-1`}
                        placeholder="Search..."
                        value={text as any}
                        onFocus={() => setText("")} // Clears input when focused
                        onChangeText={(value) => setText(value)}
                    />
                </View>
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
                        key={gridKey}
                        data={products}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <ProductCard item={item} />}
                        numColumns={2}
                        columnWrapperStyle={tw`justify-between`}
                        ListEmptyComponent={
                            <View style={tw`mt-10 items-center`}>
                                <OutfitText style={tw`text-center text-gray-500`}>
                                    {text
                                        ? `No products found for "${text}". 😰`
                                        : "No products yet. 😰"}
                                </OutfitText>
                                <TouchableOpacity onPress={() => router.push("/(tabs)/OurShop")}>
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

export default CategoryProducts;
