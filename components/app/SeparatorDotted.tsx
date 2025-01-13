import React from 'react';
import { View, StyleSheet } from 'react-native';

const SeparatorDotted = () => {
  return <View style={styles.separator} />;
};

const styles = StyleSheet.create({
  separator: {
    borderBottomWidth: 3, // Thickness of the dotted line
    borderColor: '#ccc', // Color of the dotted line
    borderStyle: 'dotted', // Makes the line dotted
    marginVertical: 10, // Space above and below the separator
  },
});

export default SeparatorDotted;
