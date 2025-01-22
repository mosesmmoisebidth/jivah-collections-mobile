import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput as  DefaultTextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import Header from '@/components/app/Header';
import { StatusBar } from 'expo-status-bar';
import tw from 'twrnc';
import { OutfitBold, OutfitText } from '@/components/StyledText';
import TextInput  from '@/components/app/TextInput';
import CheckboxInput from '@/components/app/CheckboxInput';
import { useNavigation } from 'expo-router';

const Checkout = () => {
  const payment_company = [
    { id: 1, name: 'MTN', img: require('../assets/images/mtn.png') },
    { id: 2, name: 'AIRTEL', img: require('../assets/images/airtel.png') },
    { id: 3, name: 'VISA', img: require('../assets/images/visa.png') },
  ];
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [firstName, setFirstName] = useState('');
  const [firstNames, setFirstNames] = useState('');
  const [lastName, setLastName] = useState('');
  const [lastNames, setLastNames] = useState('');
  const [phone, setPhone] = useState('');
  const [phones, setPhones] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [description, setDescription] = useState('');
  const [descriptions, setDescriptions] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false, // Disable header here
    });
  }, [navigation]);

  return (
    <SafeAreaView style={tw`bg-white flex-1 pt-6`}>
      <Header title="Checkout"  back/>

      <ScrollView style={tw`bg-white pt-3`}>
        <View style={tw`mb-[2rem] px-5 flex-col gap-10`}>
          <View
            style={tw`border border-gray-400 rounded-lg px-3 py-4 flex-col gap-3`}
          >
            <OutfitBold style={tw`text-base`}>Billing details</OutfitBold>
            <TextInput
              label={true}
              type="text"
              label_name="First Name"
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
            />
            <TextInput
              type="text"
              label_name="Last Name"
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
            />
            {/* <TextInput
              label_name="Country"
              value={selectedCountry}
              onChangeText={setSelectedCountry}
              type="countrySelector"
            /> */}
            <TextInput
              label_name="Description"
              placeholder="Enter a detailed description"
              value={description}
              onChangeText={setDescription}
              type="textarea"
            />
            <TextInput
              type="text"
              label_name="Phone"
              placeholder="Phone"
              value={phone}
              onChangeText={setPhone}
            />
            <CheckboxInput
              label="I agree to the terms and conditions"
              isChecked={isChecked}
              onChange={(checked) => setIsChecked(checked)}
            />
            {isChecked && (
              <View style={tw`p-4 rounded-md flex-col gap-2`}>
                <TextInput
                  type="text"
                  label_name="First Name"
                  placeholder="First Name"
                  value={firstNames}
                  onChangeText={setFirstNames}
                />
                <TextInput
                  type="text"
                  label_name="Last Name"
                  placeholder="Last Name"
                  value={lastNames}
                  onChangeText={setLastNames}
                />
                {/* <TextInput
                    label_name="Country"
                    value={selectedCountry}
                    onChangeText={setSelectedCountry}
                    type="countrySelector"
                    /> */}
                <TextInput
                  label_name="Description"
                  placeholder="Enter a detailed description"
                  value={descriptions}
                  onChangeText={setDescriptions}
                  type="textarea"
                />
              </View>
            )}
            <TextInput
              label_name="Order notes (optional)"
              placeholder="Notes about your order, e.g. special notes for delivery."
              value={description}
              onChangeText={setDescription}
              type="textarea"
            />
          </View>
          {/* replace the info from cart */}
          <View
            style={tw`border border-gray-400 rounded-lg px-3 py-4 flex-col gap-5`}
          >
            <OutfitBold style={tw`text-base`}>Your Order</OutfitBold>
            {/* where to add a productname , quantity and price */}
            <View style={tw`flex-row justify-between items-center`}>
              <OutfitText style={tw`text-gray-500`}>Product</OutfitText>
              <OutfitText style={tw`text-gray-500`}>Subtotal</OutfitText>
            </View>
            <View style={tw`flex-row justify-between items-center`}>
              <OutfitText>Vest O × 1</OutfitText>
              <OutfitText>Fr 25.000</OutfitText>
            </View>
            <View style={tw`flex-row justify-between items-center`}>
              <OutfitText>complete × 1</OutfitText>
              <OutfitText>Fr 35.000</OutfitText>
            </View>
            <View style={tw`flex-row justify-between items-center`}>
              <OutfitText style={tw`text-gray-500`}>Product</OutfitText>
              <OutfitText style={tw`text-gray-500`}>Subtotal</OutfitText>
            </View>
            <View style={tw`flex-row justify-between items-center`}>
              <OutfitText style={tw`text-gray-500`}>Shipping</OutfitText>
              <OutfitText
                style={tw`text-gray-500 flex justify-end items-end self-end text-end max-w-[10rem]`}
              >
                There are no shipping options available. Please ensure that your
                address has been entered correctly, or contact us if you need
                any help.
              </OutfitText>
            </View>
            <View style={tw`flex-row justify-between items-center`}>
              <OutfitText style={tw`text-gray-500`}>Total</OutfitText>
              <OutfitText style={tw`text-gray-500`}>Fr 60.000</OutfitText>
            </View>
          </View>
          {/* replace the info from cart */}
          <View
            style={tw`border border-gray-400 rounded-lg px-3 py-4 flex-col gap-5`}
          >
            <OutfitText>
              Have a coupon?{' '}
              <TouchableOpacity
                onPress={() => setShowCouponInput(!showCouponInput)}
              >
                <OutfitText style={tw`text-blue-400 text-base`}>
                  Click here to enter your coupon code
                </OutfitText>
              </TouchableOpacity>
            </OutfitText>

            {/* View to display */}
            {showCouponInput && (
              <View>
                <TextInput
                  label_name="If you have a coupon code, please apply it below."
                  type="text"
                  placeholder="Coupon code"
                  onChangeText={setCouponCode}
                  value={couponCode}
                />
                <TouchableOpacity
                  style={tw`p-4 border-2 tracking-light border-blue-400 w-[5rem] mt-4`}
                >
                  <OutfitText>APPLY</OutfitText>
                </TouchableOpacity>
              </View>
            )}
            {/* View to display */}
          </View>
          <View style={tw`border border-gray-400 rounded-lg px-3 py-4`}>
            <Image source={require('../assets/images/urubuto.png')} />
            <View style={tw`px-3 py-4 flex-col gap-3`}>
              <OutfitText>Choose A Payment Mode</OutfitText>
              <View>
                <Text style={tw`text-lg font-bold`}>
                  Select a Payment Company
                </Text>
                <View style={tw`flex-row gap-4 items-center flex-wrap py-3`}>
                  {payment_company.map((company) => (
                    <TouchableOpacity
                      key={company.id}
                      style={[
                        tw`flex-row items-center gap-2 rounded-md`,
                        selectedId === company.id
                          ? tw`border-blue-500 bg-blue-100`
                          : tw`border-gray-300 bg-gray-100`,
                      ]}
                      onPress={() => setSelectedId(company.id)}
                    >
                      <View
                        style={tw`w-5 h-5 border-2 rounded-full ${
                          selectedId === company.id
                            ? 'bg-blue-500'
                            : 'bg-gray-200'
                        }`}
                      />
                      <Image source={company.img} style={tw``} />
                    </TouchableOpacity>
                  ))}
                </View>

                {selectedId && (
                  <Text style={tw`mt-4 text-green-500`}>
                    Selected:{' '}
                    {payment_company.find((c) => c.id === selectedId)?.name}
                  </Text>
                )}
              </View>
              <TextInput
                type="text"
                label_name="Phone"
                placeholder="Enter Phone Number (MTN or AIRTEL)"
                value={firstName}
                onChangeText={setFirstName}
              />
            </View>

            <OutfitText style={tw`py-3`}>
              Your personal data will be used to process your order, support
              your experience throughout this website, and for other purposes
              described in our
              <OutfitText style={tw`text-blue-400 text-base`}>
                privacy policy.
              </OutfitText>
            </OutfitText>
            <TouchableOpacity
              style={tw`py-4 rounded-lg w-full bg-[#c48647] flex justify-center items-center`}
            >
              <OutfitText style={tw`text-white`}>PLACE ORDER</OutfitText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <StatusBar backgroundColor="transparent" style="dark" />
    </SafeAreaView>
  );
};

export default Checkout;
