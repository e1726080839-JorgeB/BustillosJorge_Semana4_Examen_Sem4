import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Database from './database/database';
import type { RootStackParamList } from './navigation/types';
import DetailScreen from './screens/DetailScreen';
import FormScreen from './screens/FormScreen';
import ListScreen from './screens/ListScreen';
import { appStyles } from './styles/appStyles';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const startApp = async () => {
      try {
        await Database.init();
      } catch {
        setError('No se pudo iniciar la base de datos');
      } finally {
        setReady(true);
      }
    };

    startApp();
  }, []);

  if (!ready) {
    return (
      <View style={appStyles.loadingScreen}>
        <Text style={appStyles.loadingText}>Preparando inventario...</Text>
        <StatusBar style="dark" />
      </View>
    );
  }

  if (error.length > 0) {
    return (
      <View style={appStyles.loadingScreen}>
        <Text style={appStyles.loadingText}>{error}</Text>
        <StatusBar style="dark" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="List" component={ListScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
        <Stack.Screen name="Form" component={FormScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
