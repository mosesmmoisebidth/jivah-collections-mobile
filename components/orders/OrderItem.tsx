import React, { FC } from "react";
import tw from "twrnc";
import { useState } from "react";
import { View, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { Order } from "@/utils/types/order";
import BottomDialog from "../app/BottomDialog";
import AddEditReview from "../reviews/AddEditReview";
import { Ionicons } from "@expo/vector-icons";
import { OutfitSemibold, OutfitText } from "../StyledText";
import ApiService from "@/services/api";
import CancelOrder from "./CancelOrder";
import Toast from "react-native-toast-message";

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
    <View style={tw`p-3 border border-gray-200 rounded-lg shadow-sm `}>
      <View
        style={tw`flex  flex-row justify-between items-center pb-2 mb-2 w-full border-b border-b-neutral-300`}
      >
        <OutfitText style={tw`text-sm text-gray-500`}>
          Order Date: {orderDate}
        </OutfitText>
        <View style={tw`flex flex-row items-center gap-2`}>
          <Ionicons
            name={"ellipse"}
            size={24}
            style={tw`text-xs ${
              order.status === "COMPLETED"
                ? "text-green-500"
                : order.status === "PENDING"
                ? "text-yellow-500"
                : order.status === "PAYMENT_PENDING"
                ? "text-purple-500"
                : order.status === "DELIVERING"
                ? "text-blue-500"
                : order.status === "CANCELLED"
                ? "text-red-500"
                : order.status === "REFUNDED"
                ? "text-gray-500"
                : "text-gray-400"
            }`}
          />
          <OutfitText
            style={tw`text-sm font-medium ${
              order.status === "COMPLETED"
                ? "text-green-600"
                : order.status === "PENDING"
                ? "text-yellow-600"
                : order.status === "PAYMENT_PENDING"
                ? "text-purple-600"
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
          </OutfitText>
        </View>
      </View>

      <View style={tw`w-full flex flex-row flex-wrap justify-between gap-y-4`}>
        {order.items.map((item) => (
          <View key={item.id} style={tw`w-[48%]`}>
            <View
              style={tw`flex flex-col items-center gap-2 border p-2 rounded-2xl border-neutral-300`}
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
                  style={tw`h-20 w-20 bg-gray-200 rounded-md`}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <View style={tw`text-center`}>
                <OutfitSemibold style={tw`text-base`}>
                  {item.inventory.variant.product.name}
                </OutfitSemibold>
                <View style={tw`flex flex-row items-center gap-2`}>
                  <OutfitText
                    style={tw`my-1 text-sm text-neutral-500 py-1 px-2 border border-neutral-500 text-center rounded-xl`}
                  >
                    {`${item.inventory.variant.size}`}
                  </OutfitText>
                  <View
                    style={[
                      tw`w-8 h-8 rounded-full`,
                      { backgroundColor: item.inventory.variant.color },
                    ]}
                  />
                </View>
                <OutfitText style={tw`text-sm text-gray-900`}>
                  {item.amount}Rwf x {item.quantity}
                </OutfitText>
              </View>
              {item.inventory.variant.product.reviews?.length === 0 &&
                order.status && (
                  <TouchableOpacity
                    onPress={() => {
                      setActiveItemToReview(item.inventory.variant.productId);
                      setModal({ isOpen: true, type: "review" });
                    }}
                    style={tw`bg-[#c48647] px-5 py-2 rounded-2xl`}
                  >
                    <OutfitText style={tw`text-white`}>Add Review</OutfitText>
                  </TouchableOpacity>
                )}
            </View>
          </View>
        ))}
      </View>

      <View style={tw` gap-y-2 mt-4`}>
        <OutfitText style={tw`text-lg font-semibold`}>
          Total: {totalAmount} Rwf
        </OutfitText>
        {order.status === "PAYMENT_PENDING" && (
          <>
            <TouchableOpacity
              onPress={async () => {
                setLoading(true);
                try {
                  await ApiService.authorized.post(
                    `/payments/initiate/${order.id}`
                  );
                  Toast.show({
                    type: "success",
                    text1: "Payment Finished successfully",
                  });
                  if (refetch) refetch();
                } catch (err: any) {
                  Toast.show({
                    type: "error",
                    text1:
                      err.response?.data?.message ||
                      "Failed to retry payment. Please try again.",
                  });
                } finally {
                  setLoading(false);
                }
              }}
              disabled={loading}
              style={tw`px-10 py-4 bg-[#c48647]  rounded-2xl  flex flex-row justify-center items-center`}
            >
              {loading && <ActivityIndicator color="white" style={tw`mr-2`} />}
              <OutfitSemibold style={tw`text-white`}>
                Retry Payment
              </OutfitSemibold>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModal({ isOpen: true, type: "cancel" });
              }}
              disabled={loading}
              style={tw`px-10 py-4 border-[#c48647]  border  rounded-2xl  flex flex-row justify-center items-center`}
            >
              <OutfitSemibold style={tw`text-[#c48647]`}>
                Cancel Order
              </OutfitSemibold>
            </TouchableOpacity>
          </>
        )}
      </View>

      <BottomDialog
        height={45}
        isVisible={modal.isOpen && modal.type == "review"}
        onClose={() => setModal({ isOpen: false, type: null })}
      >
        <AddEditReview
          productId={activeItemToReview}
          onClose={refetch as any}
          onCancel={() => setModal({ isOpen: false, type: null })}
        />
      </BottomDialog>
      <BottomDialog
        height={30}
        isVisible={modal.isOpen && modal.type == "cancel"}
        onClose={() => setModal({ isOpen: false, type: null })}
      >
        <CancelOrder
          orderId={order.id}
          onSuccess={refetch as any}
          onClose={() => setModal({ isOpen: false, type: null })}
        />
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
