import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { PinchGestureHandler, PanGestureHandler, State, ScrollView } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  runOnJS,
} from 'react-native-reanimated';

import ColorPalette from '../components/ColorPalette';
import ToolButton from '../components/ToolButton';
import UndoRedoButton from '../components/UndoRedoButton';
import styles from '../components/styles';
import Canvas from '../components/Canvas';
import BrushModal from '../components/BrushModal';
import LayerModal from '../components/LayerModal';

// Configurando os ícones (caso ainda seja necessário)

const DrawingScreen = ({ route }) => {
  const { imageWidth, imageHeight } = route.params;
  const [canvasWidth, setCanvasWidth] = useState(imageWidth);
  const [canvasHeight, setCanvasHeight] = useState(imageHeight);

  const panX = useSharedValue(0);
  const panY = useSharedValue(0);
  const scale = useSharedValue(1);

  const [toolState, setToolState] = useState({
    selectedTool: 'brush', // para escolher a ferramenta atual
    isMoveMode: false, // para o movimento da folha
    isDrawerVisible: false,
    isBrushModalVisible: false,
    isColorPaletteVisible: false,
    isLayerModalVisible: false,
    brushSize: 5,
    opacity: 1,
    selectedColor: '',
  });

  const MIN_SCALE = 0.1; // Valor mínimo de escala (zoom-out)
  const MAX_SCALE = 2.0; // Valor máximo de escala (zoom-in)

  const handleToolChange = (tool) => {
    if (tool === 'brush' && toolState.selectedTool === 'brush') {
      setToolState((prevState) => ({ ...prevState, isBrushModalVisible: !prevState.isBrushModalVisible }));
    } else if (tool === 'palette') {
      setToolState((prevState) => ({ ...prevState, isColorPaletteVisible: !prevState.isColorPaletteVisible }));
    } else if (tool == 'layers') {
      setToolState((prevState) => ({ ...prevState, isLayerModalVisible: !prevState.isLayerModalVisible }));

    } else {
      setToolState((prevState) => ({
        ...prevState,
        isBrushModalVisible: false,
        isColorPaletteVisible: false,
        isLayerModalVisible: false,
        selectedTool: tool,
        isMoveMode: tool === 'move',
      }));
    }
  };

  const panGestureHandler = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.startX = panX.value;
      context.startY = panY.value;
    },
    onActive: (event, context) => {
      if (toolState.isMoveMode) {
        panX.value = context.startX + event.translationX;
        panY.value = context.startY + event.translationY;
        console.log('Posição atual da folha:', panX.value, panY.value);
      }
    },
    onEnd: () => {
      // Adicione qualquer lógica adicional aqui, se necessário
    },
    onCancel: () => {
      // Nada a fazer quando o gesto é cancelado (no caso do pinch)
    },
  });

const handleZoomEnd = (newScale) => {
  // Calcular as proporções originais da imagem
  const originalAspectRatio = imageWidth / imageHeight;
  
  // Calcular a largura e a altura da folha após o zoom
  const newWidth = imageWidth * newScale;
  const newHeight = newWidth / originalAspectRatio;

  // Atualizar a largura e altura da folha mantendo a proporção original
  setCanvasWidth(newWidth);
  setCanvasHeight(newHeight);

  scale.value = newScale;
};

  const pinchGestureHandler = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.startScale = scale.value;
    },
    onActive: (event, context) => {
      const newScale = Math.min(Math.max(context.startScale * event.scale, MIN_SCALE), MAX_SCALE);
      scale.value = newScale;
      console.log("escala:", scale.value, ", largura x altura:", canvasWidth, canvasHeight);
    },
    onEnd: () => {
      // Chamar handleZoomEnd usando runOnJS para garantir que seja executado no thread do JavaScript
      //runOnJS(handleZoomEnd)(scale.value);
    },
  });

  const panAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: panX.value },
        { translateY: panY.value },
      ],
    };
  });

  const pinchAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const toggleDrawer = () => {
    setToolState((prevState) => ({ ...prevState, isDrawerVisible: !prevState.isDrawerVisible }));
  };

  const handleBrushSizeChange = (value) => {
    setToolState((prevState) => ({ ...prevState, brushSize: value }));
  };

  const handleOpacityChange = (value) => {
    setToolState((prevState) => ({ ...prevState, opacity: value }));
  };

  const handleColorChange = (color) => {
    setToolState((prevState) => ({ ...prevState, selectedColor: color }));
  };

  const closeBrushModal = () => {
    setToolState((prevState) => ({ ...prevState, isBrushModalVisible: false }));
  };

  const closeLayerModal = () => {
    setToolState((prevState) => ({ ...prevState, isBrushLayerVisible: false }));
  };

  const closeColorPalette = () => {
    setToolState((prevState) => ({ ...prevState, isColorPaletteVisible: false }));
  };

  return (
    <View style={styles.container}>
      <PinchGestureHandler
        onGestureEvent={pinchGestureHandler}
        onHandlerStateChange={({ nativeEvent }) => {
          if (nativeEvent.state === State.ACTIVE) {
            setToolState((prevState) => ({ ...prevState, isMoveMode: false }));
          }
        }}
      >
        <Animated.View style={[styles.canvasContainer, pinchAnimatedStyle]}>
          <PanGestureHandler
            onGestureEvent={panGestureHandler}
            onHandlerStateChange={({ nativeEvent }) => {
              if (nativeEvent.numberOfPointers === 2) {
                setToolState((prevState) => ({ ...prevState, isMoveMode: true }));
              } else {
                setToolState((prevState) => ({ ...prevState, isMoveMode: false }));
              }
            }}
          >
            <Animated.View
              style={[
                styles.canvasContainer,
                panAnimatedStyle,
                {
                  width: canvasWidth,
                  height: canvasHeight,
                  backgroundColor: 'white',
                },
              ]}
            >
              <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ width: canvasWidth, height: canvasHeight }}
                maximumZoomScale={MAX_SCALE}
                minimumZoomScale={MIN_SCALE}
                pinchGestureEnabled={false} // Disable ScrollView's default pinch gesture to avoid conflicts
              >
                {/* Content of the Canvas (Drawing area) */}
                <Canvas />
              </ScrollView>
            </Animated.View>
          </PanGestureHandler>
        </Animated.View>
      </PinchGestureHandler>

      <TouchableOpacity style={styles.drawerButton} onPress={toggleDrawer}>
        <Feather name={toolState.isDrawerVisible ? 'chevron-left' : 'chevron-right'} size={24} color="black" />
      </TouchableOpacity>

      <BrushModal
        isVisible={toolState.isBrushModalVisible}
        onClose={closeBrushModal}
        brushSize={toolState.brushSize}
        onBrushSizeChange={handleBrushSizeChange}
        opacity={toolState.opacity}
        onOpacityChange={handleOpacityChange}
      />

      <ColorPalette
        isVisible={toolState.isColorPaletteVisible}
        selectedColor={toolState.selectedColor}
        onSelectColor={handleColorChange}
        onClose={closeColorPalette}
      />

      <LayerModal
        isVisible={toolState.isLayerModalVisible}
        onClose={closeLayerModal}
      />

      {toolState.isDrawerVisible && (
        <View style={styles.toolContainer}>
          <ToolButton
            tool="brush"
            selectedTool={toolState.selectedTool}
            onPress={() => handleToolChange('brush')}
            tooltip="Use o pincel"
          />
          <ToolButton
            tool="eraser"
            selectedTool={toolState.selectedTool}
            onPress={() => handleToolChange('eraser')}
            tooltip="Use a borracha"
          />
          <ToolButton
            tool="palette"
            selectedTool={toolState.selectedTool}
            onPress={() => handleToolChange('palette')}
            tooltip="Selecione a cor"
          />
          <ToolButton
            tool="layers"
            selectedTool={toolState.selectedTool}
            onPress={() => handleToolChange('layers')}
            tooltip="Gerencie as camadas"
          />
          <ToolButton
            tool="move"
            selectedTool={toolState.selectedTool}
            onPress={() => handleToolChange('move')}
            tooltip="Mover e centralizar"
          />

          <View style={styles.undoRedoContainer}>
            <UndoRedoButton />
          </View>
        </View>
      )}
    </View>
  );
};

export default DrawingScreen;
