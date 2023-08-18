import React from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, Text, FlatList } from 'react-native';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/FontAwesome';

const BrushModal = ({ isVisible, onClose, brushes, selectedBrush, onBrushChange, brushSize, onBrushSizeChange, opacity, onOpacityChange }) => {
  const handleOutsideClick = () => {
    onClose();
  };

  const handleBrushChange = (brush) => {
    onBrushChange(brush);
  };

  const renderItem = ({ item }) => {
    const isSelected = selectedBrush && item.id === selectedBrush.id;

    return (
      <TouchableOpacity
        style={[styles.brushItem, isSelected && styles.selectedBrushItem]}
        onPress={() => handleBrushChange(item)}
      >
        <Text style={[styles.brushItemText, isSelected && styles.selectedBrushItemText]}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Modal animationType="slide" transparent visible={isVisible}>
      <TouchableOpacity style={styles.modalContainer} activeOpacity={1} onPress={handleOutsideClick}>
        <View style={styles.modalContent}>
          <View style={styles.brushSelectorContainer}>
            <Text style={styles.selectorTitle}>Pincéis:</Text>
            <FlatList
              data={brushes}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              extraData={selectedBrush}
              contentContainerStyle={styles.brushList}
            />
          </View>
          <View style={styles.sliderContainer}>
            <View style={styles.iconContainer}>
              <Icon name="paint-brush" size={24} color="white" style={styles.icon} />
            </View>
            <Slider
              style={styles.slider}
              minimumValue={1}
              maximumValue={200}
              value={brushSize}
              onValueChange={onBrushSizeChange}
              step={1}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#FFFFFF"
            />
            <Text style={styles.valueText}>Tamanho: {brushSize}</Text>
          </View>
          <View style={styles.sliderContainer}>
            <View style={styles.iconContainer}>
              <Icon name="eye" size={24} color="white" style={styles.icon} />
            </View>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={1}
              value={opacity}
              onValueChange={onOpacityChange}
              step={0.01}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#FFFFFF"
            />
            <Text style={styles.valueText}>Opacidade: {Math.round(opacity * 100)}%</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#333333',
    borderRadius: 10,
    padding: 16,
    width: '80%',
    opacity: 0.9,
  },
  brushSelectorContainer: {
    marginBottom: 16,
  },
  selectorTitle: {
    color: 'white',
    fontSize: 16,
    marginBottom: 8,
  },
  brushList: {
    flexGrow: 0,
  },
  brushItem: {
    padding: 8,
    borderRadius: 5,
    marginBottom: 8,
    backgroundColor: 'white',
  },
  selectedBrushItem: {
    backgroundColor: '#5F8AFF',
  },
  brushItemText: {
    color: 'black',
    fontSize: 14,
  },
  selectedBrushItemText: {
    color: 'white',
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    backgroundColor: '#777777',
    borderRadius: 12,
    padding: 8,
    marginRight: 8,
  },
  icon: {
    alignSelf: 'center',
  },
  slider: {
    flex: 1,
  },
  valueText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default BrushModal;
