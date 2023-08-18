import React, { useState, useCallback } from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, Text, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Slider from '@react-native-community/slider';

const LayersModal = ({ isVisible, onClose, layers, addLayer, deleteLayer, updateOpacity, updateVisibility }) => {
  const [selectedLayer, setSelectedLayer] = useState(null);

  const handleOutsideClick = () => {
    onClose();
  };

  const handleAddLayer = () => {
    addLayer();
  };

  const handleDeleteLayer = (layerId) => {
    deleteLayer(layerId);
    setSelectedLayer(null);
  };

  const handleOpacityChange = (layerId, opacity) => {
    updateOpacity(layerId, opacity);
  };

  const handleVisibilityChange = (layerId, isVisible) => {
    updateVisibility(layerId, isVisible);
  };

  const handleMoveLayerUp = () => {
    if (selectedLayer === null || selectedLayer === 0) return;

    const updatedLayers = [...layers];
    const temp = updatedLayers[selectedLayer];
    updatedLayers[selectedLayer] = updatedLayers[selectedLayer - 1];
    updatedLayers[selectedLayer - 1] = temp;

    setSelectedLayer(selectedLayer - 1);
  };

  const handleMoveLayerDown = () => {
    if (selectedLayer === null || selectedLayer === layers.length - 1) return;

    const updatedLayers = [...layers];
    const temp = updatedLayers[selectedLayer];
    updatedLayers[selectedLayer] = updatedLayers[selectedLayer + 1];
    updatedLayers[selectedLayer + 1] = temp;

    setSelectedLayer(selectedLayer + 1);
  };

  const handleLayerPress = (layerIndex) => {
    setSelectedLayer(layerIndex);
  };

  const renderItem = ({ item, index }) => {
    const isSelected = selectedLayer !== null && item.id === layers[selectedLayer].id;

    return (
      <TouchableOpacity
        style={[styles.layerItem, isSelected && styles.selectedLayerItem]}
        onPress={() => handleLayerPress(index)}
      >
        <TouchableOpacity
          style={styles.visibilityIcon}
          onPress={() => handleVisibilityChange(item.id, !item.isVisible)}
        >
          <Icon
            name={item.isVisible ? 'eye' : 'eye-slash'}
            size={20}
            color={item.isVisible ? '#000' : '#555'}
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={styles.layerName}>{item.name}</Text>
        <TouchableOpacity style={styles.lockIcon}>
          <Icon name={item.isLocked ? 'lock' : 'unlock-alt'} size={20} color={item.isLocked ? '#000' : '#555'} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <Modal animationType="slide" transparent visible={isVisible}>
      <TouchableOpacity style={styles.modalContainer} activeOpacity={1} onPress={handleOutsideClick}>
        <View style={styles.modalContent}>
          <View style={styles.layersContainer}>
            <FlatList
              data={layers}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.layersList}
            />
          </View>
          <View style={styles.opacitySliderContainer}>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={100}
              value={selectedLayer !== null ? layers[selectedLayer].opacity * 100 : 0}
              onValueChange={(value) => handleOpacityChange(selectedLayer !== null ? layers[selectedLayer].id : null, value / 100)}
              step={1}
              minimumTrackTintColor="#007BFF"
              maximumTrackTintColor="#999"
            />
            <Text style={styles.opacityValue}>
              Opacidade: {selectedLayer !== null ? Math.round(layers[selectedLayer].opacity * 100) : '0'}%
            </Text>
          </View>
          <View style={styles.footerButtons}>
            <TouchableOpacity style={styles.addButton} onPress={handleAddLayer}>
              <Icon name="plus" size={20} color="#FFFFFF" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.moveButton}
              onPress={handleMoveLayerUp}
              disabled={selectedLayer === null || selectedLayer === 0}
            >
              <Icon name="arrow-up" size={20} color={selectedLayer !== null && selectedLayer !== 0 ? '#000' : '#555'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.moveButton}
              onPress={handleMoveLayerDown}
              disabled={selectedLayer === null || selectedLayer === layers.length - 1}
            >
              <Icon
                name="arrow-down"
                size={20}
                color={selectedLayer !== null && selectedLayer !== layers.length - 1 ? '#000' : '#555'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteLayer(selectedLayer !== null ? layers[selectedLayer].id : null)}
              disabled={selectedLayer === null}
            >
              <Icon name="trash" size={20} color={selectedLayer !== null ? '#000' : '#555'} />
            </TouchableOpacity>
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
  layersContainer: {
    flexGrow: 0,
    marginBottom: 16,
  },
  layersList: {
    flexGrow: 1,
  },
  layerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    padding: 8,
  },
  selectedLayerItem: {
    backgroundColor: '#5F8AFF',
  },
  visibilityIcon: {
    width: 30,
    alignItems: 'center',
  },
  layerName: {
    flex: 1,
    fontSize: 16,
    color: 'white',
  },
  lockIcon: {
    width: 30,
    alignItems: 'center',
  },
  opacitySliderContainer: {
    marginBottom: 8,
  },
  slider: {
    width: '100%',
  },
  opacityValue: {
    color: '#FFF',
    fontSize: 16,
    alignSelf: 'center',
    marginTop: 4,
  },
  footerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addButton: {
    backgroundColor: '#007BFF',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moveButton: {
    backgroundColor: '#999',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: 'transparent',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    alignSelf: 'center',
  },
});

export default LayersModal;
