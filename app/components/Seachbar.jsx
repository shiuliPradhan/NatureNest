import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

export default function Searchbar({ searchQuery, setSearchQuery }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search plants..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  input: {
    height: 40,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
});
