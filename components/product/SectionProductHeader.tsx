import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import tw from "twrnc";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import ImageShowCase from "./ImageShowCase";
import { DiscountType, ProductType } from "@/utils/types/product";
import { router } from "expo-router";
import addToCart from "@/utils/funcs";
import InputNumber from "../shared/InputNumber";
import { OutfitBold, OutfitSemibold, OutfitText } from "../StyledText";

const SectionProductHeader = ({ product }: { product: ProductType }) => {
  const { name, images, variants, category } = product;
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(
    product.variants[0].size
  );
  const [selectedColor, setSelectedColor] = useState<string | null>(
    product.variants[0].color
  );
  const [loading, setLoading] = useState<string | null>(null);
  const filteredVariants = variants.filter((variant) => {
    const isSizeMatch = selectedSize ? variant.size === selectedSize : true;
    const isColorMatch = selectedColor ? variant.color === selectedColor : true;
    return isSizeMatch && isColorMatch;
  });
  const selectedVariant = filteredVariants.find((variant) => {
    const inventory = variant.Inventory.find((inv) => inv.quantity > 0);
    return inventory !== undefined;
  });
  const price = selectedVariant?.Inventory[0]?.price || 0;

  const discounts =
    selectedVariant?.Inventory[0]?.discounts?.filter((d: DiscountType) => {
      const now = new Date();
      return new Date(d.startDate) <= now && new Date(d.endDate) >= now;
    }) || [];
  const finalDiscountPercentage =
    discounts.reduce((acc, d) => {
      const percentage = d.percentage / 100;
      return acc + (1 - acc) * percentage;
    }, 0) * 100;
  const currentPrice = discounts.length
    ? price * (1 - finalDiscountPercentage / 100)
    : price;

  const rating =
    product.reviews.reduce((sum, review) => sum + review.rating, 0) /
      product.reviews.length || 0;
  const reviews = product.reviews.length;
  const pieces_sold = product.soldQuantity || 0;

  const handleSelect = (type: string, value: string) => {
    if (type === "size") {
      setSelectedSize(value);
      setSelectedColor(
        product.variants.find((variant) => variant.size == value)?.color || null
      );
    } else {
      setSelectedColor(value);
      setSelectedSize(
        product.variants.find((variant) => variant.color == value)?.size || null
      );
    }
  };

  const isVariantAvailable =
    selectedVariant &&
    selectedVariant.Inventory.some((item) => item.quantity > 0);

  return (
    <ScrollView contentContainerStyle={tw``}>
      {/* Image Section */}
      <ImageShowCase
        shots={images.map((image) => image.url)}
        productId={product.id as any}
      />

      {/* Product Info */}
      <OutfitText style={tw`text-lg font-bold mt-4 text-[#eba046]`}>
        {typeof category === "string" ? category : category.name}
      </OutfitText>
      <OutfitText style={tw`text-2xl font-bold`}>{name}</OutfitText>

      {/* Rating & Sales Info */}
      <View style={tw`flex-row items-center mt-2`}>
        <MaterialIcons name="star" size={20} color="gold" />
        <OutfitText style={tw`text-sm ml-1`}>
          {rating} ({reviews} Reviews)
        </OutfitText>
        <OutfitText style={tw`mx-2 OutfitText-gray-500`}>|</OutfitText>
        <OutfitText style={tw`text-sm OutfitText-gray-500`}>
          {pieces_sold} items sold
        </OutfitText>
      </View>

      {/* Price */}
      <View style={tw`mt-4`}>
        {price != currentPrice && (
          <OutfitText style={tw` text-neutral-500 line-through`}>
            {price.toFixed(0)} Rwf
          </OutfitText>
        )}
        {currentPrice !== 0 && (
          <OutfitSemibold style={tw`text-3xl `}>
            {currentPrice.toFixed(0)} Rwf
          </OutfitSemibold>
        )}
      </View>

      {/* Available Sizes */}
      <View style={tw`mt-6`}>
        <OutfitText style={tw`text-xl`}>Available Sizes</OutfitText>
        <View style={tw`flex-row flex-wrap mt-2`}>
          {Array.from(new Set(variants.map((variant) => variant.size))).map(
            (size) => (
              <TouchableOpacity
                key={size}
                style={tw`border px-4 py-2 m-1 rounded-lg ${
                  selectedSize === size ? "bg-[#c48647] text-white" : ""
                }`}
                onPress={() => handleSelect("size", size)}
              >
                <OutfitText
                  style={tw`text-center ${
                    selectedSize === size ? " text-white" : "text-black"
                  }`}
                >
                  {size}
                </OutfitText>
              </TouchableOpacity>
            )
          )}
        </View>
      </View>

      {/* Available Colors */}
      <View style={tw`mt-6`}>
        <OutfitText style={tw`text-xl`}>Available Colors</OutfitText>
        <View style={tw`flex-row flex-wrap mt-2`}>
          {Array.from(new Set(variants.map((variant) => variant.color))).map(
            (color) => (
              <TouchableOpacity
                key={color}
                onPress={() => handleSelect("color", color)}
                style={tw`m-1`}
              >
                <View
                  style={[
                    tw`h-10 w-10 rounded-full`,
                    {
                      backgroundColor: color,
                      borderWidth: selectedColor === color ? 2 : 0,
                    },
                  ]}
                />
              </TouchableOpacity>
            )
          )}
        </View>
      </View>

      {/* Quantity & Actions */}
      {isVariantAvailable && (
        <View style={tw`mt-6 flex-row items-center`}>
          <InputNumber
            defaultValue={1}
            max={selectedVariant?.Inventory.reduce(
              (acc, item) => acc + (item.quantity || 0),
              0
            )}
            onChange={setQuantity}
          />
          <TouchableOpacity
            style={tw`ml-4 flex-1 py-3 bg-[#c48647] rounded-lg flex-row items-center justify-center`}
            onPress={async () => {
              if (!isVariantAvailable) return;
              setLoading("buy");
              try {
                await addToCart({
                  inventoryId: selectedVariant?.Inventory[0]?.id,
                  quantity,
                });
                router.push("/Checkout");
              } catch (error) {
              } finally {
                setLoading(null);
              }
            }}
            disabled={loading !== null}
          >
            {loading === "buy" ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Feather name="shopping-cart" size={20} color="white" />
                <OutfitText style={tw`text-white OutfitText-center ml-2`}>
                  Buy Now
                </OutfitText>
              </>
            )}
          </TouchableOpacity>
        </View>
      )}

      {isVariantAvailable ? (
        <TouchableOpacity
          style={tw`mt-4 py-3 border border-[#c48647] rounded-lg flex-row items-center justify-center`}
          onPress={async () => {
            setLoading("cart");
            try {
              await addToCart({
                inventoryId: selectedVariant?.Inventory[0]?.id,
                quantity,
              });
            } catch (error) {
            } finally {
              setLoading(null);
            }
          }}
          disabled={loading !== null}
        >
          {loading === "cart" ? (
            <ActivityIndicator color="#c48647" />
          ) : (
            <>
              <Feather name="plus-circle" size={20} color="#c48647" />
              <OutfitText style={tw`text-[#c48647] OutfitText-center ml-2`}>
                Add to Cart
              </OutfitText>
            </>
          )}
        </TouchableOpacity>
      ) : (
        <OutfitText style={tw`text-red-500 OutfitText-center mt-4`}>
          Sorry, this variant is currently out of stock. Please check other
          variants.
        </OutfitText>
      )}
    </ScrollView>
  );
};

export default SectionProductHeader;

export const SectionProductHeaderSkeleton = () => {
  return (
    <View style={tw`flex flex-col gap-y-6 `}>
      {/* Image Placeholder */}
      <View style={tw`h-72 w-full bg-gray-300 rounded-lg`} />

      {/* OutfitText Placeholder */}
      <View style={tw`h-8 w-1/2 bg-gray-300 rounded-md`} />

      {/* Rating & Meta Placeholder */}
      <View style={tw`flex flex-row items-center gap-x-3`}>
        <View style={tw`w-11 h-11 bg-gray-300 rounded-full`} />
        <View style={tw`h-4 w-20 bg-gray-300 rounded-md`} />
        <View style={tw`w-5 h-5 bg-blue-600 rounded-full`} />
      </View>

      <View style={tw`flex flex-row items-center gap-x-3`}>
        <View style={tw`w-6 h-6 bg-yellow-400 rounded-full`} />
        <View style={tw`w-16 h-4 bg-gray-300`} />
      </View>

      <View style={tw`w-32 h-4 bg-gray-300`} />

      {/* Price Placeholder */}
      <View style={tw`gap-y-2`}>
        <View style={tw`h-6 w-20 bg-gray-300 rounded-md`} />
        <View style={tw`h-10 w-32 bg-gray-300 rounded-md`} />
      </View>

      {/* Pricing Details */}
      <View style={tw`flex flex-row justify-between items-end`}>
        <View style={tw`h-6 w-32 bg-gray-300 rounded-md`} />
        <View style={tw`h-4 w-24 bg-gray-300 rounded-md`} />
      </View>

      {/* Small Square Icons */}
      <View style={tw`flex flex-row gap-x-3`}>
        {Array(3)
          .fill(null)
          .map((_, index) => (
            <View key={index} style={tw`h-12 w-12 bg-gray-300 rounded-md`} />
          ))}
      </View>

      {/* Action Buttons */}
      <View style={tw`flex flex-row gap-x-5`}>
        <View style={tw`flex-1 h-12 bg-gray-300 rounded-md`} />
        <View style={tw`flex-1 h-12 bg-gray-300 rounded-md`} />
      </View>
    </View>
  );
};
