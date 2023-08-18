import React from 'react';
import { View, StyleSheet } from 'react-native';

const BrushSelector = ({ brushes, selectedBrush, onBrushChange }) => {
  return (
    <View style={styles.brushSelectorContainer}>
      {brushes.map((brush) => (
        <TouchableOpacity
          key={brush.id}
          style={[styles.brushItem, selectedBrush && brush.id === selectedBrush.id && styles.selectedBrushItem]}
          onPress={() => onBrushChange(brush)}
        >
          <Text style={[styles.brushItemText, selectedBrush && brush.id === selectedBrush.id && styles.selectedBrushItemText]}>
            {brush.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  brushSelectorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  brushItem: {
    padding: 8,
    borderRadius: 5,
    backgroundColor: '#5F8AFF',
  },
  selectedBrushItem: {
    backgroundColor: '#2D4AFF',
  },
  brushItemText: {
    color: 'white',
  },
  selectedBrushItemText: {
    fontWeight: 'bold',
  },
});

export default BrushSelector;
