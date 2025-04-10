import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  Animated,
  Dimensions,
  Easing,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Header from "@/components/app/Header";
import { StatusBar } from "expo-status-bar";
import tw from "twrnc";
import { OutfitSemibold, OutfitText } from "@/components/StyledText";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";


const About = () => {
  const items = [
    "Fashion Collections",
    "Customization",
    "Delivery Services",
    "E-Commerce",
  ];
  const items_main = [
    {
      id: 1,
      icon: <FontAwesome5 name="lightbulb" size={24} color="#c48647" />,
      desc: "Innovative Fashion Solutions",
    },
    {
      id: 2,
      icon: <Entypo name="shopping-cart" size={24} color="#c48647" />,
      desc: "Convenience",
    },
    {
      id: 3,
      icon: <FontAwesome name="check-circle" size={24} color="#c48647" />,
      desc: "Quality Assurance",
    },
    {
      id: 4,
      icon: (
        <MaterialCommunityIcons name="certificate" size={24} color="#c48647" />
      ),
      desc: "Customer-Centric Approach",
    },
    {
      id: 5,
      icon: <FontAwesome name="line-chart" size={24} color="#c48647" />,
      desc: "Reputation",
    },
  ];
  const scrollX = useRef(new Animated.Value(0)).current;
  const screenWidth = Dimensions.get("window").width;
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const startAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scrollX, {
            toValue: -screenWidth,
            duration: 8000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(scrollX, {
            toValue: 0,
            duration: 8000,
            easing: Easing.linear,
            useNativeDriver: true,
          })
        ])
      ).start();
    };

    startAnimation();
  }, [screenWidth]);
  const partners = [
    require("../assets/images/adidaslogo.jpg"),
    require("../assets/images/chanellogo.jpg"),
    require("../assets/images/filalogo.jpg"),
    require("../assets/images/guccilogo.jpg"),
    require("../assets/images/nikelogo.jpg"),
  ];
  return (
    <SafeAreaView style={tw`bg-neutral-50 pt-6`}>
      {/* Header */}
      <Header title="About Us" back />

      {/* Main Content */}
      <ScrollView style={tw`bg-neutral-50 pt-3`}>
        <View style={tw`mb-[4rem] gap-5`}>
          <OutfitText style={tw`text-[#c48647] text-base px-6`}>
            Delivering Fashion Solutions to Elevate Your Style and Convenience.
          </OutfitText>
          <OutfitSemibold style={tw`text-2xl px-6`}>
            Let's Talk about us
          </OutfitSemibold>
          <OutfitText style={tw`text-gray-500 text-base px-6`}>
            At JIVAH COLLECTION LTD, we believe in offering innovative fashion
            solutions that enhance both individual style and convenience in
            today’s fast-paced world. Our offerings are designed to make
            shopping easier, more accessible, and more enjoyable, whether
            in-store or online, while delivering efficiency and quality to our
            customers.
          </OutfitText>
          <OutfitText style={tw`text-[#c48647] text-2xl px-6`}>
            Our Services
          </OutfitText>
          <View style={tw`gap-1 px-6`}>
            {items.map((item, index) => (
              <View key={index} style={tw`flex-row gap-2`}>
                <AntDesign name="caretright" size={15} color="#c48647" />
                <OutfitText style={tw`text-gray-500 text-base`}>
                  {item}
                </OutfitText>
              </View>
            ))}
          </View>
          <View style={tw`bg-[#faf5f5] py-3`}>
            <OutfitSemibold style={tw`text-2xl w-full px-6 flex pb-2`}>
              Who We Are
            </OutfitSemibold>
            <OutfitText style={tw`text-gray-500 text-base px-6`}>
              At JIVAH COLLECTION LTD, we are dedicated to delivering top-tier
              fashion solutions that meet and exceed our customers'
              expectations. With a diverse collection of clothing, shoes and
              accessories, we serve clients across Rwanda with the highest level
              of customer service and quality. Our mission is to make fashion
              accessible, efficient, and tailored to your lifestyle. Whether
              you're shopping for casual wear, special occasions, or statement
              accessories, our platform ensures a seamless and personalized
              shopping experience, backed by prompt delivery services and a
              commitment to excellence.
            </OutfitText>
          </View>
          <OutfitSemibold style={tw`text-2xl px-6`}>Contact Us</OutfitSemibold>
          <View style={tw`mb-5`}>
            <OutfitText style={tw`text-gray-500 text-base px-6`}>
              GIKONDO, KK 565 ST.
            </OutfitText>
            <OutfitText style={tw`text-gray-500 text-base px-6`}>
              info@jivahcollections.com
            </OutfitText>
            <OutfitText style={tw`text-gray-500 text-base px-6`}>
              +250789853823
            </OutfitText>
          </View>
          <OutfitSemibold style={tw`text-2xl px-6 text-center pb-2`}>
            Why Choose Us
          </OutfitSemibold>
          <View style={tw`flex-row flex-wrap gap-5 px-6`}>
            {items_main.map((item) => (
              <View
                key={item.id}
                style={tw`flex-col items-center justify-center gap-2 w-[9rem]`}
              >
                {item.icon}
                <OutfitText style={tw`text-gray-500`}>{item.desc}</OutfitText>
              </View>
            ))}
          </View>
          <View style={tw`overflow-hidden w-full bg-[#f4f5e6] py-3 mt-4`}>
            <Animated.View
              style={{
                flexDirection: "row",
                transform: [{ translateX: scrollX }],
              }}>
              {[...partners, ...partners].map((image, index) => (
                <View key={index} style={{ width: 200, padding: 10 }}>
                  <Image source={image} style={{ width: "100%", height: 80, resizeMode: "contain" }} />
                </View>
              ))}
            </Animated.View>
          </View>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="transparent" style="dark" />
    </SafeAreaView>
  );
};

export default About;
