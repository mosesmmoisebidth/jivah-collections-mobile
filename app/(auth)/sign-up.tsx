import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import tw from 'twrnc';
import {
  OutfitBold,
  OutfitSemibold,
  OutfitText,
} from '@/components/StyledText';
import TextInputWithLabel from '@/components/app/TextInput';
import Separator from '@/components/app/Separator';
import { router } from 'expo-router';

const SignUp = () => {
  const images = [
    {
      id: 1,
      img: require('../../assets/images/fb.png'),
    },
    {
      id: 2,
      img: require('../../assets/images/google.png'),
    },
    {
      id: 3,
      img: require('../../assets/images/apple.png'),
    },
  ];
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  return (
    <SafeAreaView>
      <View style={tw`flex-col gap-6 justify-center px-7 h-full`}>
        <OutfitBold style={tw`text-2xl`}>Sign Up</OutfitBold>
        <View style={tw`flex-col gap-3 py-6`}>
          <TextInputWithLabel
            type="text"
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInputWithLabel
            type="text"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInputWithLabel
            type="text"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
          />
          <TextInputWithLabel
            type="text"
            placeholder="Confirm password"
            value={confirm}
            onChangeText={setPassword}
          />
        </View>
        <View style={tw`flex-col gap-5`}>
          <TouchableOpacity
            onPress={() => router.push('/(tabs)/Home')}
            style={tw`p-4 font-semibold text-2xl bg-[#c48647] flex justify-center items-center rounded-full`}
          >
            <OutfitText style={tw`text-white`}>Register</OutfitText>
          </TouchableOpacity>
          <View style={tw`w-full flex-row items-center gap-3`}>
            <View style={styles.line} />
            <OutfitText style={tw`w-[10%] text-center`}>OR</OutfitText>
            <View style={styles.line} />
            <Separator />
          </View>
          <View style={tw`w-full flex-row justify-between`}>
            {images.map((img) => (
              <View
                key={img.id}
                style={tw`py-4 px-6 rounded-lg border border-gray-300`}
              >
                <Image
                  source={img.img}
                  resizeMode="contain"
                  style={tw`w-5 h-5`}
                />
              </View>
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  line: {
    height: 1, // Thickness of the line
    backgroundColor: 'gray', // Line color
    marginVertical: 10, // Spacing around the line
    width: '40%',
  },
});
