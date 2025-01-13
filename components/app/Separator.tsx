import React from 'react';
import { View, StyleSheet } from 'react-native';

const Separator = () => {
  return <View style={styles.separator} />;
};

const styles = StyleSheet.create({
  separator: {
    height: 1, // Thickness of the separator
    backgroundColor: '#ccc', // Color of the line
    marginVertical: 10, // Space above and below the separator
  },
});

export default Separator;
