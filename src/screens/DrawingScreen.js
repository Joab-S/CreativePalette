import React, { useRef, useState } from 'react';
import { View, StyleSheet, PanResponder, Animated, ScrollView, TouchableOpacity } from 'react-native';
//import { MaterialCommunityIcons, Entypo, FontAwesome, Feather } from 'react-native-vector-icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import { useFonts } from 'expo-font';

// Configurando os ícones
MaterialCommunityIcons.loadFont();
Entypo.loadFont();
FontAwesome.loadFont();
Feather.loadFont();

const DrawingScreen = ({ route }) => {
  const { imageWidth, imageHeight } = route.params;

  const canvasRef = useRef(null);
  const [canvasTranslateX] = useState(new Animated.Value(0));
  const [canvasTranslateY] = useState(new Animated.Value(0));
  const [canvasScale] = useState(new Animated.Value(1));
  const [isMoveMode, setIsMoveMode] = useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const [selectedTool, setSelectedTool] = useState('pen');
  const handleToolChange = (tool) => {
    setSelectedTool(tool);
    if (tool === 'move') {
      setIsMoveMode(true);
    } else {
      setIsMoveMode(false);
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        if (!isMoveMode) {
          canvasTranslateX.setOffset(canvasTranslateX._value);
          canvasTranslateY.setOffset(canvasTranslateY._value);
          canvasTranslateX.setValue(0);
          canvasTranslateY.setValue(0);
        }
      },
      onPanResponderMove: Animated.event(
        [
          null,
          {
            dx: canvasTranslateX,
            dy: canvasTranslateY,
          },
        ],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: () => {
        if (!isMoveMode) {
          canvasTranslateX.flattenOffset();
          canvasTranslateY.flattenOffset();
        }
      },
      onPanResponderTerminate: () => {
        if (!isMoveMode) {
          canvasTranslateX.flattenOffset();
          canvasTranslateY.flattenOffset();
        }
      },
    })
  ).current;

  const handleZoom = (event) => {
    const { touches } = event.nativeEvent;
    if (touches.length >= 2) {
      const [touch1, touch2] = touches;
      const distance = Math.sqrt(
        Math.pow(touch2.pageX - touch1.pageX, 2) + Math.pow(touch2.pageY - touch1.pageY, 2)
      );
      const scale = distance / initialDistance.current;
      canvasScale.setValue(scale);
    }
  };

  const initialDistance = useRef(0);

  const toggleDrawer = () => {
    setIsDrawerVisible(!isDrawerVisible);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} maximumZoomScale={4} minimumZoomScale={0.5}>
        <Animated.View
          style={[
            styles.canvasContainer,
            {
              width: imageWidth,
              height: imageHeight,
              backgroundColor: 'white',
              transform: [
                { translateX: canvasTranslateX },
                { translateY: canvasTranslateY },
                { scale: canvasScale },
              ],
            },
          ]}
          {...(isMoveMode ? panResponder.panHandlers : {})}
          ref={canvasRef}
        >
          {/* Conteúdo adicional da tela de desenho */}
        </Animated.View>
      </ScrollView>

      <TouchableOpacity style={styles.drawerButton} onPress={toggleDrawer}>
        <Feather name={isDrawerVisible ? 'chevron-left' : 'chevron-right'} size={24} color="black" />
      </TouchableOpacity>

      {isDrawerVisible && (
        <View style={styles.toolContainer}>
          <TouchableOpacity
            style={[styles.toolButton, selectedTool === 'pen' && styles.selectedToolButton]}
            onPress={() => handleToolChange('pen')}
          >
            <FontAwesome name="pencil" size={24} color={selectedTool === 'pen' ? 'white' : 'black'} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.toolButton, selectedTool === 'brush' && styles.selectedToolButton]}
            onPress={() => handleToolChange('brush')}
          >
            <Entypo name="brush" size={24} color={selectedTool === 'brush' ? 'white' : 'black'} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.toolButton, selectedTool === 'palette' && styles.selectedToolButton]}
            onPress={() => handleToolChange('palette')}
          >
            <MaterialCommunityIcons name="palette" size={24} color={selectedTool === 'palette' ? 'white' : 'black'} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.toolButton, selectedTool === 'layers' && styles.selectedToolButton]}
            onPress={() => handleToolChange('layers')}
          >
            <Feather name="layers" size={24} color={selectedTool === 'layers' ? 'white' : 'black'} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.toolButton, selectedTool === 'move' && styles.selectedToolButton]}
            onPress={() => handleToolChange('move')}
          >
            <MaterialCommunityIcons name="cursor-move" size={24} color={selectedTool === 'move' ? 'white' : 'black'} />
          </TouchableOpacity>

          <View style={styles.undoRedoContainer}>
            <TouchableOpacity style={styles.undoRedoButton}>
              <FontAwesome name="undo" size={14} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.undoRedoButton}>
              <FontAwesome name="redo" size={14} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  canvasContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    paddingHorizontal: 10,
    elevation: 2,
  },
  toolButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  selectedToolButton: {
    backgroundColor: '#FF5F6D',
  },
  drawerButton: {
    position: 'absolute',
    top: '96%',
    left: 0,
    paddingHorizontal: 0,
    paddingVertical: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    elevation: 2,
    transform: [{ translateY: -25 }],
  },
  undoRedoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  undoRedoButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
  },
});

export default DrawingScreen;
