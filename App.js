import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Image } from 'react-native';

import HomeScreen from './src/screens/HomeScreen';
import DrawingScreen from './src/screens/DrawingScreen';

enableScreens(); // Melhora o desempenho de navegação

const Stack = createStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerShown: false,
              headerBackground: () => (
                <Image
                  source={require('./src/assets/images/logo.png')}
                  style={{ flex: 1, resizeMode: 'cover' }}
                />
              ),
            }}
          />
          <Stack.Screen
            name="Drawing"
            component={DrawingScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
