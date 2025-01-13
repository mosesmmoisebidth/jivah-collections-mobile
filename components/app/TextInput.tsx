import React from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { OutfitText } from '../StyledText';
import tw from 'twrnc';

interface TextInputWithLabelProps {
  label_name?: string; // Label text for the input
  placeholder?: string; // Placeholder text for the input
  value: string; // Value of the input
  onChangeText: (text: string) => void; // Function to handle input change
  type: 'text' | 'textarea' | 'countrySelector'; // Type of input
  label?: boolean;
}

const TextInputWithLabel: React.FC<TextInputWithLabelProps> = ({
  label_name,
  placeholder,
  value,
  onChangeText,
  type,
  label,
}) => {
  // List of countries (for demonstration)
  const countries = [
    'United States',
    'Canada',
    'United Kingdom',
    'India',
    'Australia',
  ];

  return (
    <View style={tw`flex-col gap-2 w-full`}>
      {/* Label */}
      {label && (
        <OutfitText style={tw`text-base text-gray-500`}>
          {label_name}{' '}
          <OutfitText style={tw`text-lg text-red-600`}>*</OutfitText>
        </OutfitText>
      )}

      {/* Conditional Rendering Based on Type */}
      {type === 'text' && (
        <TextInput
          style={tw`w-full px-2 py-3 rounded-lg text-gray-500 bg-slate-200`}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
        />
      )}

      {type === 'textarea' && (
        <TextInput
          style={tw`w-full px-2 py-3 rounded-lg text-gray-500 bg-slate-200 min-h-[40px] text-top`}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          multiline={true}
          textAlignVertical="top"
        />
      )}

      {type === 'countrySelector' && (
        <TouchableOpacity
          style={tw`w-full px-2 py-3 rounded-lg bg-slate-200`}
          onPress={() => console.log('Open country selector')}
        >
          <Text style={tw`text-gray-500`}>{value || 'Select a country'}</Text>
        </TouchableOpacity>
      )}

      {/* Country Selector Modal */}
      {type === 'countrySelector' && (
        <FlatList
          data={countries}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={tw`p-3 border-b border-slate-300 text-gray-500`}
              onPress={() => onChangeText(item)}
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
          style={tw`bg-white border rounded-lg max-h-[200px]`}
        />
      )}
    </View>
  );
};

export default TextInputWithLabel;
