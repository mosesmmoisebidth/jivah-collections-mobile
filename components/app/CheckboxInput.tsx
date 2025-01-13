import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

interface CheckboxInputProps {
  label: string;
  isChecked?: boolean; // Optional initial state
  onChange?: (checked: boolean) => void; // Callback for state change
}

const CheckboxInput: React.FC<CheckboxInputProps> = ({
  label,
  isChecked = false,
  onChange,
}) => {
  const [checked, setChecked] = useState(isChecked);

  const toggleCheckbox = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    if (onChange) {
      onChange(newChecked);
    }
  };

  return (
    <TouchableOpacity
      onPress={toggleCheckbox}
      style={tw`flex-row items-center gap-3 py-2`}
    >
      {/* Checkbox */}
      <View
        style={tw`w-6 h-6 rounded-md border ${
          checked ? 'bg-blue-500 border-blue-500' : 'bg-white border-gray-300'
        } flex items-center justify-center`}
      >
        {checked && <Text style={tw`text-white text-lg`}>✓</Text>}
      </View>
      {/* Label */}
      <Text style={tw`text-gray-700 text-base`}>{label}</Text>
    </TouchableOpacity>
  );
};

export default CheckboxInput;
