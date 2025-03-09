import { View, TextInput } from 'react-native';
import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import tw from 'twrnc';

const SearchInput = () => {
  const [text, setText] = useState('');
  return (
    <View
      style={tw`mx-6 flex-row gap-2 items-center bg-gray-200 px-3 py-3 rounded-full`}
    >
      <Feather name="search" size={21} color="black" />
      <TextInput
        style={tw`bg-transparent`}
        placeholder="Search..."
        value={text}
        onChangeText={(value) => setText(value)} // Update state on text change
      />
    </View>
  );
};

export default SearchInput;
