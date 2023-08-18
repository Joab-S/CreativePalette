import React, { useState } from 'react';
import { View, StyleSheet, Modal, TouchableWithoutFeedback } from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker';
import Svg, { Circle } from 'react-native-svg';

const ColorPalette = ({ isVisible, selectedColor, onSelectColor, onClose }) => {
  const handleColorChange = (color) => {
    onSelectColor(color);
  };

  const renderColorIcon = () => {
    return (
      <Svg width={24} height={24}>
        <Circle cx={12} cy={12} r={10} fill={selectedColor} stroke="white" strokeWidth={2} />
      </Svg>
    );
  };

  return (
    <Modal animationType="fade" transparent visible={isVisible}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>
      <View style={styles.colorPaletteContainer}>
        <View style={styles.colorPickerContainer}>
          <ColorPicker
            color={selectedColor}
            onColorChange={handleColorChange}
            thumbSize={30}
            sliderSize={30}
            noSnap={false}
            row={false}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  colorPaletteContainer: {
    position: 'absolute',
    top: 60,
    right: 10,
    width: 180,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 8,
    padding: 10,
    elevation: 2,
  },
  colorPickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorIconContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
});

export default ColorPalette;