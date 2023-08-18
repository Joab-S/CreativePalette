import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

FontAwesome.loadFont();

const UndoRedoButton = () => {
  return (
    <View style={styles.undoRedoContainer}>
      <TouchableOpacity style={styles.undoRedoButton}>
        <FontAwesome name="undo" size={14} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.undoRedoButton}>
        <FontAwesome name="repeat" size={14} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default UndoRedoButton;
