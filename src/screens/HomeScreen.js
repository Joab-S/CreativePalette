import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, Button } from 'react-native';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [fileName, setFileName] = useState('NovaArte');
  const [imageSize, setImageSize] = useState('');
  const [resolution, setResolution] = useState('');
  const [imageWidth, setImageWidth] = useState(600);
  const [imageHeight, setImageHeight] = useState(600);

  const handleNewArt = () => {
    setModalVisible(true);
  };

  const handleCreateArt = () => {
    // Implemente aqui a lógica para criar um novo arquivo de arte com as configurações desejadas

    if (imageWidth === 0 || imageHeight === 0) {
      // Exibe um alerta ou mensagem informando que as dimensões não podem ser zero
      return;
    }

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

    // Navegue para a tela de desenho com as dimensões especificadas
    navigation.navigate('Drawing', { imageWidth, imageHeight });
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

      <TouchableOpacity style={styles.newArtButton} onPress={handleNewArt}>
        <Icon name="paint-brush" size={30} color="white" />
        <Text style={styles.newArtButtonText}>Iniciar uma nova arte</Text>
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
                onChangeText={(text) => setFileName(text)}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Dimensões da Imagem</Text>
              <View style={styles.dimensionContainer}>
                <TextInput
                  style={styles.dimensionInput}
                  placeholder="Altura"
                  value={imageHeight.toString()}
                  onChangeText={handleImageHeightChange}
                  keyboardType="numeric"
                  placeholderTextColor="#999"
                />
                <Text style={styles.dimensionSeparator}>x</Text>
                <TextInput
                  style={styles.dimensionInput}
                  placeholder="Largura"
                  value={imageWidth.toString()}
                  onChangeText={handleImageWidthChange}
                  keyboardType="numeric"
                  placeholderTextColor="#999"
                />
              </View>
            </View>

            <View style={styles.sliderContainer}>
              <Text style={styles.sliderLabel}>Altura: {imageHeight}</Text>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={5000}
                value={imageHeight}
                onValueChange={handleImageHeightChange}
                minimumTrackTintColor="#FF5F6D"
                maximumTrackTintColor="gray"
                thumbTintColor="#FF5F6D"
              />
            </View>

            <View style={styles.sliderContainer}>
              <Text style={styles.sliderLabel}>Largura: {imageWidth}</Text>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={5000}
                value={imageWidth}
                onValueChange={handleImageWidthChange}
                minimumTrackTintColor="#FF5F6D"
                maximumTrackTintColor="gray"
                thumbTintColor="#FF5F6D"
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button title="Criar Arte" onPress={handleCreateArt} />
              <Button title="Cancelar" onPress={() => setModalVisible(false)} />
            </View>
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
    backgroundColor: '#222',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#999',
    marginBottom: 20,
    textAlign: 'center',
  },
  newArtButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF5F6D',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  newArtButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
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
    color: '#222',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: '#222',
  },
  input: {
    height: 40,
    borderColor: '#999',
    borderWidth: 1,
    paddingHorizontal: 10,
    color: '#222',
  },
  dimensionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  dimensionInput: {
    flex: 1,
    height: 40,
    borderColor: '#999',
    borderWidth: 1,
    paddingHorizontal: 10,
    color: '#222',
  },
  dimensionSeparator: {
    fontSize: 20,
    marginHorizontal: 5,
    color: '#999',
  },
  sliderContainer: {
    marginBottom: 20,
  },
  sliderLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: '#222',
  },
  slider: {
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default HomeScreen;
