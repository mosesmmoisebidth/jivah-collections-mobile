import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import {
  OutfitBold,
  OutfitSemibold,
  OutfitText,
} from "@/components/StyledText";
import { TextInput } from "react-native-gesture-handler";
import CartItem, { CartItemSkeleton } from "@/components/cart/CartItem";
import ShippingAddress from "@/components/checkout/ShippingAddress";
import { CartItemType } from "@/utils/types/product";
import ApiService from "@/services/api";
import { useEffect, useState } from "react";
import useGet from "@/hooks/useGet";
import AuthService from "@/services/api/auth";
import Toast from "react-native-toast-message";
import { WaveIndicator } from "react-native-indicators";
import Header from "@/components/app/Header";
import tw from "twrnc";
import { router } from "expo-router";
import PaymentInfo from "@/components/checkout/PaymentInfo";

const Checkout = () => {
  const {
    data: cart,
    loading: loadingCart,
    error,
    refetch,
  } = useGet<{ items: CartItemType[]; subTotal: number; discount: number }>(
    `/cart`,
    { authorized: true }
  );
  const [userData, setUserData] = useState<any>({
    name: "",
    username: "",
    phone: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async () => {
    const response = await AuthService.getProfile();
    console.log(response);
    setUserData(response);
    setClientData({
      name: response.name,
      email: response.email,
      phone: response.phone,
      address: clientData.address,
      city: clientData.city,
      country: clientData.country,
      addressType: clientData.addressType,
    });
    setLoading(false);
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);
  const [makingOrder, setMakingOrder] = useState(false);
  const [clientData, setClientData] = useState({
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    address: "",
    city: "",
    country: "",
    addressType: "",
  });
  const [paymentInfo, setPaymentInfo] = useState({
    accountNumber: "",
    provider: "AIRTEL",
  });
  const [tabActive, setTabActive] = useState<"ShippingAddress" | "ContactInfo">(
    "ShippingAddress"
  );
  const handleMakeOrder = async ({
    client,
    items,
    setMakingOrder,
    paymentInfo,
  }: {
    client: {
      name: string;
      email: string;
      phone?: string;
      address: string;
      city: string;
      country: string;
    };
    paymentInfo: {
      provider: "AIRTEL" | "MTN";
      accountNumber: string;
    };
    items: {
      inventoryId: string;
      quantity: number;
      amount: number;
    }[];
    setMakingOrder: (value: boolean) => void;
  }) => {
    console.log(client, paymentInfo);
    if (
      !client.name ||
      !client.email ||
      !client.address ||
      !client.city ||
      !client.country ||
      !paymentInfo.accountNumber ||
      !paymentInfo.provider ||
      items.length === 0 ||
      items.some((item) => !item.inventoryId || !item.quantity || !item.amount)
    ) {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Please fill in all required fields.",
      });
      return;
    }
    setMakingOrder(true);
    try {
      await ApiService.authorized.post("/sales/order", {
        client,
        items,
        paymentInfo,
      });
      Toast.show({
        type: "success",
        position: "bottom",
        text1: "Order made successfully",
      });
      router.push("/Orders");
    } catch (err: any) {
      Toast.show({
        type: "error",
        position: "bottom",
        text1:
          err.response?.data?.message ||
          "An error occurred while making order. Please try again.",
      });
    } finally {
      setMakingOrder(false);
    }
  };
  const renderProduct = (item: CartItemType) => {
    return <CartItem key={item.product.id} item={item} />;
  };

  const renderLeft = () => {
    return (
      <View>
        <View id="ShippingAddress">
          <ShippingAddress
            data={clientData}
            onChange={(field, value) =>
              setClientData((prev) => ({ ...prev, [field]: value }))
            }
          />
        </View>
        <View id="PaymentInfo" style={tw`mt-5`}>
          <PaymentInfo
            data={paymentInfo}
            onChange={(field, value) =>
              setPaymentInfo((prev) => ({ ...prev, [field]: value }))
            }
          />
        </View>
      </View>
    );
  };

  if ((!cart || cart.items.length === 0) && !loadingCart && !error) {
    return (
      <SafeAreaView style={tw`nc-CheckoutPage`}>
        <Header title="Checkout" back />
        <View
          style={tw`mx-auto flex flex-col  items-center justify-center gap-5 px-3 py-24`}
        >
          <OutfitBold style={tw`text-[100px] font-extrabold text-[#c48647]`}>
            Empty
          </OutfitBold>
          <OutfitSemibold style={tw`text-4xl font-semibold`}>
            Your Cart is Empty
          </OutfitSemibold>
          <OutfitText style={tw`text-neutral-500`}>
            It looks like you don&apos;t have any items in your cart right now.
            Add some items and come back to checkout later!
          </OutfitText>
          <View style={tw`flex items-center justify-center gap-5`}>
            <TouchableOpacity
              style={tw`bg-[#c48647] px-10 py-3 rounded-2xl`}
              onPress={() => {
                router.push("/OurShop");
              }}
            >
              <OutfitText style={tw`text-white`}>Start Shopping</OutfitText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                router.push("/Home");
              }}
              style={tw`border-2 border-[#c48647] text-[#c48647] px-10 py-3 rounded-2xl`}
            >
              <OutfitText>Go Home</OutfitText>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    const errorMessage =
      error || "An unexpected error occurred. Please try again later.";

    return (
      <SafeAreaView style={tw`nc-CheckoutPage`}>
        <Header title="Checkout" back />
        <View
          style={tw`mx-auto flex max-w-2xl flex-col items-center justify-center gap-5 px-3 py-24`}
        >
          <OutfitBold style={tw`text-[100px] font-extrabold text-[#c48647]`}>
            Error
          </OutfitBold>
          <OutfitSemibold style={tw`text-4xl font-semibold`}>
            Oops, something went wrong
          </OutfitSemibold>
          <OutfitText style={tw`text-neutral-500`}>{errorMessage}</OutfitText>
          <View style={tw`flex items-center justify-center gap-5`}>
            <TouchableOpacity
              style={tw`bg-[#c48647] px-10 py-3 rounded-2xl`}
              onPress={() => refetch()}
            >
              <OutfitText>Try Again</OutfitText>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`border-2 border-[#c48647] text-[#c48647] px-10 py-3 rounded-2xl`}
            >
              <OutfitText>Go Home</OutfitText>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <WaveIndicator color="#c48647" size={60} />
      </View>
    );
  }

  return (
    <SafeAreaView style={tw`nc-CheckoutPage`}>
      <Header title="Checkout" back />
      <ScrollView>
        <View style={tw`flex flex-col p-3  pb-20`}>
          <View>{renderLeft()}</View>

          <View
            style={tw` my-3  shrink-0 border-t border-neutral-300 lg:mx-10 lg:my-0 lg:border-l lg:border-t-0 xl:lg:mx-14 2xl:mx-16`}
          />

          <View style={tw`w-full `}>
            <OutfitSemibold style={tw`text-xl `}>Order summary</OutfitSemibold>
            <View style={tw`divide-y divide-neutral-300`}>
              {loadingCart ? (
                Array.from({ length: 4 }).map((_, index) => (
                  <CartItemSkeleton key={index} />
                ))
              ) : error ? (
                <View style={tw`text-red-500`}>Failed to load cart items.</View>
              ) : (
                cart?.items?.map(renderProduct)
              )}
            </View>

            <View style={tw` border-t border-neutral-300 pt-2 text-sm`}>
              {/* <View style={tw` border-b border-neutral-300 pb-3 mb-2 text-sm`}>
                <OutfitText style={tw`text-sm`}>Discount code</OutfitText>
                <View style={tw`mt-1.5 flex flex-row`}>
                  <TextInput
                    style={tw`flex-1 border-neutral-200 bg-transparent placeholder:text-neutral-500  border rounded-2xl `}
                  />
                  <TouchableOpacity
                    style={tw`ml-3 flex w-24 items-center justify-center rounded-2xl border border-neutral-200 bg-gray px-4 py-3 text-sm font-medium transition-colors hover:bg-neutral-100`}
                  >
                    <OutfitText>Apply</OutfitText>
                  </TouchableOpacity>
                </View>
              </View> */}

              <View style={tw`flex flex-row justify-between`}>
                <View>
                  <OutfitText style={tw`font-medium`}>Subtotal</OutfitText>
                  <OutfitText style={tw`block text-sm text-neutral-500`}>
                    Shipping and taxes calculated at checkout.
                  </OutfitText>
                </View>
                <OutfitText style={tw`text-xl font-medium`}>
                  {Math.floor(cart?.subTotal || 0)} Rwf
                </OutfitText>
              </View>

              <View style={tw`flex flex-row justify-between`}>
                <View>
                  <OutfitText style={tw`font-medium`}>Discount</OutfitText>
                </View>
                <OutfitText style={tw`text-xl font-medium`}>
                  -{Math.floor(cart?.discount || 9)} Rwf
                </OutfitText>
              </View>

              <View style={tw`flex flex-row justify-between`}>
                <View>
                  <OutfitText style={tw`font-medium`}>Total</OutfitText>
                </View>
                <OutfitText style={tw`text-xl font-medium`}>
                  {Math.floor((cart?.subTotal || 0) - (cart?.discount || 0))}{" "}
                  Rwf
                </OutfitText>
              </View>
            </View>
            <TouchableOpacity
              onPress={() =>
                handleMakeOrder({
                  client: clientData,
                  items:
                    cart?.items.map((it) => ({
                      inventoryId: it.inventoryId,
                      quantity: it.quantity,
                      amount: it.price,
                    })) || [],
                  paymentInfo: paymentInfo as any,
                  setMakingOrder: setMakingOrder,
                })
              }
              disabled={makingOrder}
              style={tw`mt-8 w-full bg-[#c48647]  flex flex-row items-center justify-center gap-4 py-4 rounded-2xl`}
            >
              {makingOrder && (
                <ActivityIndicator
                  size="small"
                  color="white"
                  style={tw`mr-2`}
                />
              )}
              <OutfitSemibold style={tw`text-white text-center text-base`}>
                Confirm order
              </OutfitSemibold>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Checkout;
