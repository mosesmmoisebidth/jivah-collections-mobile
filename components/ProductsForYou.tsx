import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ScrollView, Image, TouchableOpacity } from "react-native";
import tw from "twrnc";
import ProductService from "@/services/api/product";
import { Product } from "@/utils/types/product";
import { OutfitSemibold, OutfitText } from "@/components/StyledText";
import { AntDesign } from "@expo/vector-icons";

const ProductsForYou = ({ onClickProduct }: { onClickProduct: (id: string) => void }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

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

    const getLatestProducts = () => {
        // Assuming the latest products are the ones added most recently, you can sort based on a 'created_at' or similar field
        //@ts-ignore
        return products.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    };

    const getBestForYouProducts = () => {
        // Pick random 5 products for this section
        const randomProducts: any[] = [];
        while (randomProducts.length < 5) {
            const randomIndex = Math.floor(Math.random() * products.length);
            const product = products[randomIndex];
            if (!randomProducts.includes(product)) {
                randomProducts.push(product);
            }
        }
        return randomProducts;
    };

    const ProductCard = ({ item }: { item: Product }) => (
        <TouchableOpacity
            style={tw`bg-white rounded-xl shadow-lg mb-6 w-[64] mx-2`}
            onPress={() => onClickProduct(item.id)}
        >
            <Image
                source={{ uri: item.product_image }}
                style={tw`rounded-t-xl h-40 w-full object-cover`}
            />
            <View style={tw`px-4 py-2 gap-2`}>
                <OutfitSemibold style={tw`text-lg text-gray-800`}>
                    {item.product_name}
                </OutfitSemibold>
                <View style={tw`flex-row items-center justify-between`}>
                    <View style={tw`flex-row items-center`}>
                        <OutfitSemibold style={tw`text-sm text-gray-500 line-through`}>
                            ${item.regular_price}
                        </OutfitSemibold>
                        <OutfitSemibold style={tw`text-xl text-[#c48647] ml-2`}>
                            ${item.sale_price}
                        </OutfitSemibold>
                    </View>
                    <TouchableOpacity
                        style={tw`bg-gray-100 p-2 rounded-full`}
                        onPress={() => console.log(`Liked product with id: ${item.id}`)}
                    >
                        <AntDesign name="hearto" size={24} color="gray" />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );


    return (
        <View style={tw`bg-gray-100 flex-1 p-4 gap-3 mb-20`}>
            {/* Latest Products Section */}
            <View >
                <OutfitSemibold style={tw`text-lg text-gray-800 mb-2`}>
                    Latest Products
                </OutfitSemibold>
                {loading ? (
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {[...Array(5)].map((_, index) => (
                            <View
                                key={index}
                                style={tw`bg-gray-300 rounded-xl w-64 h-60 mx-3`}
                            />
                        ))}
                    </ScrollView>
                ) : (
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {getLatestProducts().map((product) => (
                            <ProductCard key={product.id} item={product} />
                        ))}
                    </ScrollView>
                )}

            </View>

            {/* Best For You Section */}
            <View>
                <OutfitSemibold style={tw`text-lg text-gray-800 mb-2`}>
                    Best For You
                </OutfitSemibold>
                {loading ? (
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {[...Array(5)].map((_, index) => (
                            <View
                                key={index}
                                style={tw`bg-gray-300 rounded-xl w-64 mx-3 h-60`}
                            />
                        ))}
                    </ScrollView>
                ) : (
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {getBestForYouProducts().map((product) => (
                            <ProductCard key={product.id} item={product} />
                        ))}
                    </ScrollView>
                )
                }
            </View>
        </View>
    );
};

export default ProductsForYou;
