import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import LayerCanvas from './LayerCanvas';
import LayerModal from './LayerModal';

const LayerManager = () => {
  const [layers, setLayers] = useState([{ id: 1, brushSize: 5, opacity: 1, isCurrentLayer: true }]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleAddLayer = () => {
    const newLayer = {
      id: layers.length + 1,
      brushSize: 5,
      opacity: 1,
      isCurrentLayer: false,
    };
    setLayers([...layers, newLayer]);
  };

  const handleDeleteLayer = (layerId) => {
    const updatedLayers = layers.filter((layer) => layer.id !== layerId);
    setLayers(updatedLayers);
  };

  return (
    <View style={styles.layerManager}>
      <LayerModal
        visible={isModalVisible}
        layers={layers}
        onClose={() => setIsModalVisible(false)}
        onAddLayer={handleAddLayer}
        onDeleteLayer={handleDeleteLayer}
      />
      {layers.map((layer) => (
        <View key={layer.id}>
          {/* Conteúdo de cada camada */}
          <LayerCanvas
            brushSize={layer.brushSize}
            opacity={layer.opacity}
            isCurrentLayer={layer.isCurrentLayer}
          />
          {/* Restante do código... */}
        </View>
      ))}
      <TouchableOpacity onPress={() => setIsModalVisible(true)}>
        <Text style={styles.layersButton}>Camadas</Text>
      </TouchableOpacity>
      {/* Restante do código... */}
    </View>
  );
};

const styles = StyleSheet.create({
  // ...
  layersButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4287f5',
    marginBottom: 10,
  },
});

export default LayerManager;
