import React, { useEffect, useRef, useState } from "react";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { View, TextInput, TouchableOpacity, ScrollView } from "react-native";
import tw from "twrnc";
import useGet from "@/hooks/useGet";
import { Order } from "@/utils/types/order";
import OrderItem, { OrderItemSkeleton } from "@/components/orders/OrderItem";
import Header from "@/components/app/Header";
import { OutfitBold, OutfitText } from "@/components/StyledText";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const Orders = () => {
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 100,
  });
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    startDate: new Date(2020, 0, 1).toISOString().split("T")[0],
    endDate: new Date(new Date().getFullYear(), 0, 11)
      .toISOString()
      .split("T")[0],
  });

  const {
    data: ordersData,
    loading,
    error,
    refetch,
  } = useGet<{
    total: number;
    items: Order[];
    page: number;
    limit: number;
  }>(
    `/sales/mine/?type=ORDER&page=${pagination.page}&limit=${
      pagination.limit
    }&search=${encodeURIComponent(filters.search)}&status=${encodeURIComponent(
      filters.status
    )}&startDate=${encodeURIComponent(
      filters.startDate
    )}&endDate=${encodeURIComponent(filters.endDate)}`,
    {
      authorized: true,
    }
  );

  useEffect(() => {
    refetch();
  }, [pagination, filters]);

  const isFiltersApplied =
    filters.search.trim() !== "" ||
    filters.status !== "" ||
    filters.startDate !== new Date(2020, 0, 1).toISOString().split("T")[0] ||
    filters.endDate !==
      new Date(new Date().getFullYear(), 0, 11).toISOString().split("T")[0];

  return (
    <SafeAreaView style={tw`flex-1`}>
      <Header title="Your Orders" cart />
      <View style={tw`flex flex-row items-center gap-4 px-4 py-3`}>
        <View
          style={tw`flex-row items-center border-gray-200 mb-3 border p-2 rounded-2xl`}
        >
          <Feather name="search" size={21} color="grey" />
          <TextInput
            style={tw`flex-1 bg-transparent ml-2 py-2`}
            placeholder="Search..."
            value={filters.search}
            onChangeText={(value) => setFilters({ ...filters, search: value })}
          />
          {/* <TouchableOpacity
            style={tw``}
            onPress={() => {
              // Handle filter action
              console.log("Filter icon pressed");
            }}
          >
            <Ionicons name="filter" size={24} color="gray" />
          </TouchableOpacity> */}
        </View>
      </View>
      <ScrollView style={tw`p-2`}>
        {loading && (
          <View style={tw`gap-y-4`}>
            {Array(8)
              .fill(null)
              .map((_, index) => (
                <OrderItemSkeleton key={index} />
              ))}
          </View>
        )}
        {error && !loading && (
          <View
            style={tw`flex flex-col items-center justify-center gap-3 py-24`}
          >
            <OutfitBold style={tw`text-3xl font-extrabold text-[#c48647]`}>
              Oops!
            </OutfitBold>
            <OutfitText style={tw`text-xl font-semibold`}>
              Something Went Wrong
            </OutfitText>
            <OutfitText style={tw`text-neutral-500`}>
              We couldn't load your orders at the moment. Please try again
              later.
            </OutfitText>
            <View style={tw`flex flex-row items-center justify-center gap-5`}>
              <TouchableOpacity
                style={tw`p-4  border border-[#c48647] flex justify-center items-center rounded-2xl`}
                onPress={refetch}
              >
                <OutfitText>Retry</OutfitText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  router.push("/Home");
                }}
                style={tw`p-4  border border-[#c48647] flex justify-center items-center rounded-2xl`}
              >
                <OutfitText>Go Home</OutfitText>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {!loading && !error && (
          <View style={tw`space-y-4`}>
            {ordersData?.items.length === 0 ? (
              <View
                style={tw`w-full flex flex-col items-center justify-center gap-3 py-24`}
              >
                <OutfitBold style={tw`text-2xl text-[#c48647]`}>
                  {isFiltersApplied
                    ? "No Orders Match Your Filters!"
                    : "No Orders Made Yet!"}
                </OutfitBold>
                <OutfitText>
                  {isFiltersApplied
                    ? "Try adjusting your filters to find relevant orders."
                    : "Start placing your first order today!"}
                </OutfitText>
                <View
                  style={tw`flex flex-row items-center justify-center gap-5`}
                >
                  {isFiltersApplied && (
                    <TouchableOpacity
                      onPress={() => {
                        setFilters({
                          search: "",
                          status: "",
                          startDate: new Date(2020, 0, 1)
                            .toISOString()
                            .split("T")[0],
                          endDate: new Date(new Date().getFullYear(), 0, 11)
                            .toISOString()
                            .split("T")[0],
                        });
                      }}
                      style={tw`p-4 border border-[#c48647] flex justify-center items-center rounded-2xl`}
                    >
                      <OutfitText>Reset Filters</OutfitText>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    style={tw`p-4 border border-[#c48647] flex justify-center items-center rounded-2xl`}
                    onPress={
                      isFiltersApplied ? refetch : () => router.push("/OurShop")
                    }
                  >
                    <OutfitText>
                      {isFiltersApplied ? "Retry" : "Place an Order"}
                    </OutfitText>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <>
                <View style={tw`space-y-4`}>
                  {" "}
                  {ordersData?.items.map((order) => (
                    <OrderItem key={order.id} order={order} />
                  ))}
                </View>
              </>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Orders;
