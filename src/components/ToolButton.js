import React, { useState } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import styles from './styles';

const ToolButton = ({ tool, selectedTool, onPress, tooltip }) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const showTooltip = () => {
    setIsTooltipVisible(true);
  };

  const hideTooltip = () => {
    setIsTooltipVisible(false);
  };

  return (
    <TouchableOpacity
      style={[styles.toolButton, selectedTool === tool && styles.selectedToolButton]}
      onPress={onPress}
      onPressIn={showTooltip}
      onPressOut={hideTooltip}
    >
      {isTooltipVisible && (
        <View style={styles.tooltipContainer}>
          <Text style={styles.tooltipText}>{tooltip}</Text>
        </View>
      )}
      {tool === 'brush' && <Entypo name="brush" size={24} color={selectedTool === 'brush' ? 'white' : 'black'} />}
      {tool === 'eraser' && <FontAwesome name="eraser" size={24} color={selectedTool === 'eraser' ? 'white' : 'black'} />}
      {tool === 'palette' && <Entypo name="palette" size={24} color={selectedTool === 'palette' ? 'white' : 'black'} />}
      {tool === 'layers' && <Feather name="layers" size={24} color={selectedTool === 'layers' ? 'white' : 'black'} />}
      {tool === 'move' && <Entypo name="hand" size={24} color={selectedTool === 'move' ? 'white' : 'black'} />}
    </TouchableOpacity>
  );
};

export default ToolButton;
