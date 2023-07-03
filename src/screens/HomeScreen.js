import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, Button } from 'react-native';
import Slider from '@react-native-community/slider';
import DropDownPicker from 'react-native-dropdown-picker';

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [fileName, setFileName] = useState('');
  const [imageSize, setImageSize] = useState('');
  const [resolution, setResolution] = useState('');
  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);

  const handleNewArt = () => {
    setModalVisible(true);
  };

  const handleCreateArt = () => {
    // Implemente aqui a lógica para criar um novo arquivo de arte com as configurações desejadas
    console.log(`Criar novo arquivo:
      Nome: ${fileName}
      Tamanho da Imagem: ${imageSize}
      Resolução: ${resolution}
      Largura: ${imageWidth}
      Altura: ${imageHeight}
    `);

    // Feche o modal após criar a arte
    setModalVisible(false);
    setFileName('');
    setImageSize('');
    setResolution('');
    setImageWidth(0);
    setImageHeight(0);
  };

  const handleImageWidthChange = (value) => {
    const width = parseInt(value) || 0;
    setImageWidth(width > 5000 ? 5000 : width);
  };

  const handleImageHeightChange = (value) => {
    const height = parseInt(value) || 0;
    setImageHeight(height > 5000 ? 5000 : height);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CreativePalette</Text>
      <Text style={styles.subtitle}>Aplicativo de Desenho</Text>
      <TouchableOpacity style={styles.button} onPress={handleNewArt}>
        <Text style={styles.buttonText}>Iniciar uma nova arte</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nova Arte</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Nome do Arquivo</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite o nome do arquivo"
                value={fileName}
                onChangeText={text => setFileName(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Tamanho da Imagem</Text>
              <View style={styles.dimensionContainer}>
                <TextInput
                  style={styles.dimensionInput}
                  placeholder="Altura"
                  value={imageHeight.toString()}
                  onChangeText={handleImageHeightChange}
                  keyboardType="numeric"
                />
                <Text style={styles.dimensionSeparator}>x</Text>
                <TextInput
                  style={styles.dimensionInput}
                  placeholder="Largura"
                  value={imageWidth.toString()}
                  onChangeText={handleImageWidthChange}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.sliderContainer}>
                <Text>Altura: {imageHeight}</Text>
                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={5000}
                  value={imageHeight}
                  onValueChange={handleImageHeightChange}
                  minimumTrackTintColor="#FF5F6D"
                  maximumTrackTintColor="gray"
                />
              </View>
              <View style={styles.sliderContainer}>
                <Text>Largura: {imageWidth}</Text>
                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={5000}
                  value={imageWidth}
                  onValueChange={handleImageWidthChange}
                  minimumTrackTintColor="#FF5F6D"
                  maximumTrackTintColor="gray"
                />
              </View>
            </View>
            {/* Restante do conteúdo do modal */}
            <Button title="Criar Arte" onPress={handleCreateArt} />
            <Button title="Cancelar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: 'gray',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#FF5F6D',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  dimensionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dimensionInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  dimensionSeparator: {
    fontSize: 20,
    marginHorizontal: 5,
  },
  sliderContainer: {
    marginBottom: 10,
  },
  slider: {
    width: '100%',
  },
});

export default HomeScreen;
