import React, { useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import useGet from "@/hooks/useGet";
import SectionProductHeader, {
  SectionProductHeaderSkeleton,
} from "@/components/product/SectionProductHeader";
import { ProductType } from "@/utils/types/product";
import { useNavigation } from "expo-router";
import tw from "twrnc";
import SectionProductInfo, {
  SectionProductInfoSkeleton,
} from "@/components/product/SectionProductInfo";
import SectionRelatedProducts from "@/components/product/SectionRelatedProducts";
import SectionMoreProducts from "@/components/product/SectionMoreProducts";
import { StatusBar } from "expo-status-bar";
import BackButton from "@/components/shared/BackButton";
import { OutfitText } from "@/components/StyledText";
import { router } from "expo-router";

const SingleProduct = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const route = useRoute();
  //@ts-ignore
  const { id } = route.params;
  const {
    data: product,
    loading,
    error,
    refetch,
  } = useGet<ProductType>(`/products/${id}/id`, { authorized: false });

  if (loading) {
    return (
      <View style={styles.container}>
        <BackButton style={styles.backButton} />
        <ScrollView>
          {/* <SectionNavigation /> */}
          <View style={styles.section}>
            <SectionProductHeaderSkeleton />
          </View>
          <View style={styles.section}>
            <SectionProductInfoSkeleton />
          </View>
        </ScrollView>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.centeredContainer}>
        <OutfitText style={styles.errorText}>404</OutfitText>
        <OutfitText style={styles.title}>Product Not Found</OutfitText>
        <OutfitText style={styles.message}>
          The page you are looking for doesn’t exist or has been moved.
        </OutfitText>
        <View style={tw`flex-row justify-between mt-5 gap-5 p-2`}>
          <TouchableOpacity
            onPress={refetch}
            style={tw`rounded-2xl border-[#c48647] border  py-3 flex-1 `}
          >
            <OutfitText style={tw`text-center `}>Try Again</OutfitText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={router.back}
            style={tw`rounded-2xl bg-[#c48647]  py-3 flex-1 `}
          >
            <OutfitText style={tw`text-white text-center`}>Go Back</OutfitText>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centeredContainer}>
        <OutfitText style={styles.errorText}>Error</OutfitText>
        <OutfitText style={styles.title}>Oops, something went wrong</OutfitText>
        <OutfitText style={styles.message}>
          {error || "An unexpected error occurred. Please try again later."}
        </OutfitText>
        <View style={tw`flex-row justify-between mt-5 gap-5 p-2`}>
          <TouchableOpacity
            onPress={refetch}
            style={tw`rounded-2xl border-[#c48647] border  py-3 flex-1 `}
          >
            <OutfitText style={tw`text-center `}>Try Again</OutfitText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={router.back}
            style={tw`rounded-2xl bg-[#c48647]  py-3 flex-1 `}
          >
            <OutfitText style={tw`text-white text-center`}>Go Back</OutfitText>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BackButton style={styles.backButton} />
      <ScrollView>
        <View style={styles.section}>
          <SectionProductHeader product={product} />
        </View>
        <View style={styles.section}>
          <SectionProductInfo product={product} />
        </View>
        <View style={styles.section}>
          <SectionRelatedProducts id={product?.id as any} />
        </View>
        <View style={styles.section}>
          <SectionMoreProducts />
        </View>
        <StatusBar backgroundColor="transparent" />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 40,
    position: "relative",
  },
  backButton: {
    position: "absolute",
    left: 15,
    top: 25,
    zIndex: 10,
  },
  section: {
    marginBottom: 20,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 80,
    fontWeight: "bold",
    color: "#c48647",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  message: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
  },
});

export default SingleProduct;
