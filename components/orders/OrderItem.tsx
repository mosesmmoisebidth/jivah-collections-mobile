import React, { FC } from "react";
import tw from "twrnc";
import { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Order } from "@/utils/types/order";
import BottomDialog from "../app/BottomDialog";
import AddEditReview from "../reviews/AddEditReview";
import { Ionicons } from "@expo/vector-icons";

interface OrderItemProps {
  order: Order;
  className?: string;
  refetch?: () => void;
}
const OrderItem: FC<OrderItemProps> = ({ order, className, refetch }) => {
  const [modal, setModal] = useState<{
    isOpen: boolean;
    type: "cancel" | "review" | null;
  }>({ isOpen: false, type: null });
  const [activeItemToReview, setActiveItemToReview] = useState<any>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const totalAmount = order.items.reduce(
    (total, item) => total + item.amount * item.quantity,
    0
  );
  const orderDate = new Date(order.createdAt).toLocaleDateString();

  return (
    <View
      className={`p-6 border border-gray-200 rounded-lg shadow-sm ${className}`}
    >
      <View className="flex justify-between items-center mb-4 border-b">
        <View className="flex items-center gap-x-4">
          <Text className="text-sm text-gray-500">Order Date: {orderDate}</Text>
          <View className="flex items-center gap-x-2">
            <Ionicons
              name={"ellipse"}
              size={24}
              className={`text-xs ${
                order.status === "COMPLETED"
                  ? "text-green-500"
                  : order.status === "PENDING"
                  ? "text-yellow-500"
                  : order.status === "DELIVERING"
                  ? "text-blue-500"
                  : order.status === "CANCELLED"
                  ? "text-red-500"
                  : order.status === "REFUNDED"
                  ? "text-gray-500"
                  : "text-gray-400"
              }`}
            />
            <Text
              className={`text-sm font-medium ${
                order.status === "COMPLETED"
                  ? "text-green-600"
                  : order.status === "PENDING"
                  ? "text-yellow-600"
                  : order.status === "DELIVERING"
                  ? "text-blue-600"
                  : order.status === "CANCELLED"
                  ? "text-red-600"
                  : order.status === "REFUNDED"
                  ? "text-gray-600"
                  : "text-gray-400"
              }`}
            >
              {order.status}
            </Text>
          </View>
        </View>
      </View>

      <View className="w-full flex gap-3 flex-wrap">
        {order.items.map((item) => (
          <View
            key={item.id}
            className="flex flex-col items-center gap-x-2 border p-2 rounded-2xl border-neutral-300"
          >
            <TouchableOpacity
              onPress={() =>
                router.push(
                  `/product/${encodeURIComponent(
                    item.inventory.variant.product.id
                  )}`
                )
              }
            >
              <Image
                source={{ uri: item.image }}
                alt={`${item.inventory.variant.product.name} cover`}
                className="h-20 w-20 object-contain bg-gray-200 rounded-md"
              />
            </TouchableOpacity>
            <View className="text-center">
              <Text className="font-semibold">
                {item.inventory.variant.product.name}
              </Text>
              <View className="flex items-center gap-2">
                <Text className="my-1 text-sm text-neutral-500 py-1 px-2 border border-neutral-500 text-center rounded-xl">
                  {`${item.inventory.variant.size}`}
                </Text>
                <View
                  className="w-8 h-8 rounded-full"
                  style={{ backgroundColor: item.inventory.variant.color }}
                />
              </View>
              <Text className="text-sm text-gray-900">
                {item.amount} x {item.quantity} Rwf
              </Text>
            </View>
            {item.inventory.variant.product.reviews?.length === 0 && (
              <TouchableOpacity
                onPress={() => {
                  setActiveItemToReview(item.inventory.variant.productId);
                  setModal({ isOpen: true, type: "review" });
                }}
              >
                <Text className="text-blue-500 font-semibold">Add Review</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>

      <View className="flex justify-between items-center gap-2 mt-4">
        <Text className="text-lg font-semibold">Total: {totalAmount} Rwf</Text>
        <View className="flex items-center gap-4"></View>
      </View>

      <BottomDialog
        isVisible={modal.isOpen}
        onClose={() => setModal({ isOpen: false, type: null })}
      >
        <AddEditReview
          productId={activeItemToReview}
          onClose={refetch as any}
        />{" "}
      </BottomDialog>
    </View>
  );
};

export const OrderItemSkeleton = () => {
  return (
    <View
      style={tw`animate-pulse p-3 border border-gray-200 rounded-lg shadow-sm bg-neutral-50 `}
    >
      <View>
        {/* Order Status and Order Date skeleton */}
        <View style={tw`flex-row justify-between items-center mb-4 w-full`}>
          <View style={tw`h-4 w-24 bg-neutral-200 rounded-md`} />
          <View style={tw`h-4 w-24 bg-neutral-200 rounded-md`} />
        </View>

        {/* Left side: Sale items skeleton */}
        <View style={tw`flex-row gap-x-4`}>
          {Array.from({ length: Math.floor(Math.random() * 3) + 1 }).map(
            (_, index) => (
              <View key={index} style={tw`flex flex-col items-center gap-x-2`}>
                <View style={tw`h-20 w-20 bg-gray-300 rounded-md`} />
                <View style={tw`gap-y-2 mt-2`}>
                  <View style={tw`h-4 w-24 bg-neutral-200 rounded-md`} />
                  <View style={tw`h-4 w-16 bg-neutral-200 rounded-md`} />
                  <View style={tw`h-4 w-24 bg-neutral-200 rounded-md`} />
                  <View style={tw`h-4 w-16 bg-neutral-200 rounded-md`} />
                </View>
              </View>
            )
          )}
        </View>

        {/* Right side: Total amount and Action buttons skeleton */}
        <View style={tw`flex flex-row items-center mt-4 md:mt-0`}>
          <View style={tw`h-4 w-32 bg-neutral-200 rounded-md ml-2`} />
          <View style={tw`h-6 w-24 bg-neutral-200 rounded-md ml-2`} />
          <View style={tw`h-6 w-24 bg-neutral-200 rounded-md ml-2`} />
        </View>
      </View>
    </View>
  );
};

export default OrderItem;
