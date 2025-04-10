import React, { useState } from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Text,
} from "react-native";
import useGet from "../../hooks/useGet";
import tw from "twrnc";
import { OutfitBold, OutfitSemibold, OutfitText } from "../StyledText";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native-gesture-handler";

interface FiltersProps {
  selectedFilters: {
    category: string | null;
    sizes: string[];
    colors: string[];
    priceRange: [string, string];
  };
  onChange: (newFilters: {
    category: string | null;
    sizes: string[];
    colors: string[];
    priceRange: [string, string];
  }) => void;
}

const ProductFilters: React.FC<FiltersProps> = ({
  selectedFilters,
  onChange,
}) => {
  const {
    data: filters,
    loading,
    error,
    refetch,
  } = useGet<{
    sizes: string[];
    colors: string[];
    categories: string[];
  }>(`/products/filters`, { authorized: true });

  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(
    selectedFilters.category
  );
  const [selectedSize, setSelectedSize] = useState<string[]>(
    selectedFilters.sizes || []
  );
  const [selectedColor, setSelectedColor] = useState<string[]>(
    selectedFilters.colors || []
  );
  const [rangePrices, setRangePrices] = useState<[string, string]>(
    selectedFilters.priceRange
  );

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  const handleSizeChange = (sizes: string) => {
    if (selectedSize.includes(sizes)) {
      setSelectedSize(selectedSize.filter((item) => item !== sizes));
    } else {
      setSelectedSize([...selectedSize, sizes]);
    }
  };

  const handleColorChange = (colors: string) => {
    if (selectedColor.includes(colors)) {
      setSelectedColor(selectedColor.filter((item) => item !== colors));
    } else {
      setSelectedColor([...selectedColor, colors]);
    }
  };

  const handleOpen = () => setIsVisible(true);
  const handleClose = () => setIsVisible(false);

  const handleApply = () => {
    onChange({
      category: activeCategory,
      sizes: selectedSize,
      colors: selectedColor,
      priceRange: rangePrices,
    });
    handleClose();
  };

  const handleReset = () => {
    setSelectedColor([]);
    setSelectedSize([]);
    setRangePrices(["0", "10000000"]);
    onChange({
      category: null,
      sizes: [],
      colors: [],
      priceRange: ["0", "0"],
    });
    handleClose();
  };

  // Handle category, size, and color changes
  const handleChange = (item: string, type: "category" | "size" | "color") => {
    switch (type) {
      case "category":
        setActiveCategory(item);
        break;
      case "size":
        setSelectedSize((prev) =>
          prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
        );
        break;
      case "color":
        setSelectedColor((prev) =>
          prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
        );
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Pressable
        onPress={handleOpen}
        style={tw`p-2 border border-gray-200 rounded-full`}
      >
        <Ionicons name="filter" size={23} color="black" />
      </Pressable>
      <Modal visible={isVisible} animationType="slide" transparent={true}>
        <View
          style={tw`flex-1 justify-center items-center bg-black/50 relative`}
        >
          <View
            style={tw`bg-neutral-50 p-4 rounded-t-2xl w-full max-h-4/5 absolute bottom-0`}
          >
            {loading ? (
              <OutfitText>Loading...</OutfitText>
            ) : error ? (
              <View style={tw`items-center`}>
                <OutfitText style={tw`text-red-500 text-lg`}>
                  Oops, something went wrong
                </OutfitText>
                <TouchableOpacity onPress={refetch}>Try Again</TouchableOpacity>
              </View>
            ) : (
              <ScrollView>
                <View style={tw`mt-3`}>
                  <View style={tw`flex-row justify-between items-center p-2`}>
                    <OutfitSemibold style={tw`text-lg font-semibold`}>
                      Categories
                    </OutfitSemibold>
                    <TouchableOpacity
                      onPress={handleClose}
                      style={tw`rounded-2xl border-[#c48647] border  py-1 px-10 `}
                    >
                      <OutfitText style={tw`text-lg `}>Close</OutfitText>
                    </TouchableOpacity>
                  </View>

                  <View style={tw`flex-wrap flex-row gap-4`}>
                    {filters?.categories.map((category) => (
                      <TouchableOpacity
                        key={category}
                        onPress={() => handleChange(category, "category")}
                        style={[
                          tw`p-2 bg-gray-100 rounded-md`,
                          activeCategory === category &&
                            tw`bg-blue-500 text-white`,
                        ]}
                      >
                        <OutfitText>{category}</OutfitText>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View style={tw`mt-5`}>
                  <OutfitSemibold style={tw`text-lg font-semibold`}>
                    Sizes
                  </OutfitSemibold>
                  <View style={tw`flex-wrap flex-row gap-4`}>
                    {filters?.sizes.map((size) => (
                      <TouchableOpacity
                        key={size}
                        onPress={() => handleChange(size, "size")}
                        style={[
                          tw`p-2 bg-gray-100 rounded-md`,
                          selectedSize.includes(size) &&
                            tw`bg-blue-500 text-white`,
                        ]}
                      >
                        <OutfitText>{size}</OutfitText>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View style={tw`mt-5`}>
                  <OutfitSemibold style={tw`text-lg font-semibold`}>
                    Colors
                  </OutfitSemibold>
                  <View style={tw`flex-wrap flex-row gap-4`}>
                    {filters?.colors.map((color) => (
                      <TouchableOpacity
                        key={color}
                        onPress={() => handleChange(color, "color")}
                        style={[
                          tw`w-10 h-10 rounded-full m-1`,
                          { backgroundColor: color },
                          selectedColor.includes(color) &&
                            tw`border-2 border-blue-500`,
                        ]}
                      />
                    ))}
                  </View>
                </View>

                <View style={tw`mt-5`}>
                  <OutfitSemibold style={tw`text-lg font-semibold`}>
                    Price range
                  </OutfitSemibold>
                  <View style={tw`flex-row justify-between gap-4`}>
                    <View style={tw`w-1/2`}>
                      <OutfitText>Min</OutfitText>
                      <TextInput
                        style={tw`border border-gray-200 rounded-2xl p-2`}
                        keyboardType="numeric"
                        value={rangePrices[0] as any}
                        onChangeText={(text) =>
                          setRangePrices([text, rangePrices[1]])
                        }
                      />
                    </View>
                    <View style={tw`w-1/2`}>
                      <OutfitText>Max</OutfitText>
                      <TextInput
                        style={tw`border border-gray-200 rounded-2xl p-2`}
                        keyboardType="numeric"
                        value={rangePrices[1] as any}
                        onChangeText={(text) =>
                          setRangePrices([rangePrices[0], text])
                        }
                      />
                    </View>
                  </View>
                </View>

                <View style={tw`flex-row justify-between mt-5 gap-5 p-2`}>
                  <TouchableOpacity
                    onPress={handleReset}
                    style={tw`rounded-2xl border-[#c48647] border  py-3 flex-1 `}
                  >
                    <OutfitText style={tw`text-center `}>
                      Reset Filters
                    </OutfitText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleApply}
                    style={tw`rounded-2xl bg-[#c48647]  py-3 flex-1 `}
                  >
                    <OutfitText style={tw`text-white text-center`}>
                      Apply Filters
                    </OutfitText>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ProductFilters;
