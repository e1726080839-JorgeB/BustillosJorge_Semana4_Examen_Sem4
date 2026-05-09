import { useCallback, useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import type { Gadget } from '../types/Gadget';
import type { DetailScreenProps } from '../navigation/types';
import GadgetService from '../services/gadgetService';
import { appStyles, getCategoryBadgeStyle, getDetailIconStyle } from '../styles/appStyles';

export default function DetailScreen({ navigation, route }: DetailScreenProps) {
  const [gadget, setGadget] = useState<Gadget | null>(null);
  const [loading, setLoading] = useState(false);
  const { id } = route.params;

  const loadGadget = useCallback(async () => {
    try {
      setLoading(true);
      const data = await GadgetService.getGadgetById(id);
      setGadget(data);
    } catch {
      Alert.alert('Error', 'No se pudo cargar el detalle');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      loadGadget();
    }, [loadGadget])
  );

  const confirmDelete = () => {
    Alert.alert('Eliminar gadget', '¿Deseas eliminar este producto?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', style: 'destructive', onPress: deleteGadget },
    ]);
  };

  const deleteGadget = async () => {
    try {
      setLoading(true);
      await GadgetService.deleteGadget(id);
      navigation.navigate('List');
    } catch {
      Alert.alert('Error', 'No se pudo eliminar el gadget');
    } finally {
      setLoading(false);
    }
  };

  if (loading && gadget === null) {
    return (
      <SafeAreaView style={appStyles.safe}>
        <View style={appStyles.loadingScreen}>
          <Text style={appStyles.loadingText}>Cargando detalle...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (gadget === null) {
    return (
      <SafeAreaView style={appStyles.safe}>
        <View style={appStyles.header}>
          <TouchableOpacity style={appStyles.backButton} onPress={() => navigation.goBack()}>
            <Text style={appStyles.backText}>‹</Text>
          </TouchableOpacity>
        </View>
        <View style={appStyles.loadingScreen}>
          <Text style={appStyles.loadingText}>Gadget no encontrado</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={appStyles.safe}>
      <View style={appStyles.screen}>
        <View style={appStyles.header}>
          <View style={appStyles.headerRow}>
            <TouchableOpacity style={appStyles.backButton} onPress={() => navigation.goBack()}>
              <Text style={appStyles.backText}>‹</Text>
            </TouchableOpacity>
            <Text style={appStyles.gadgetName}>Detalle del gadget</Text>
          </View>
        </View>

        <View style={appStyles.detailHero}>
          <View style={getDetailIconStyle(gadget.category)}>
            <Text style={appStyles.detailIconText}>{gadget.category.slice(0, 1).toUpperCase()}</Text>
          </View>
          <View style={[appStyles.categoryBadge, getCategoryBadgeStyle(gadget.category)]}>
            <Text style={appStyles.categoryText}>{gadget.category}</Text>
          </View>
        </View>

        <View style={appStyles.infoGrid}>
          <View style={appStyles.infoCard}>
            <Text style={appStyles.infoLabel}>Nombre</Text>
            <Text style={appStyles.infoValue}>{gadget.name}</Text>
          </View>

          <View style={appStyles.twoColumns}>
            <View style={[appStyles.infoCard, appStyles.columnCard]}>
              <Text style={appStyles.infoLabel}>Marca</Text>
              <Text style={appStyles.infoValue}>{gadget.brand}</Text>
            </View>
            <View style={[appStyles.infoCard, appStyles.columnCard]}>
              <Text style={appStyles.infoLabel}>Año</Text>
              <Text style={appStyles.infoValue}>{gadget.purchaseYear}</Text>
            </View>
          </View>

          <View style={[appStyles.infoCard, appStyles.priceCard]}>
            <Text style={appStyles.infoLabel}>Precio</Text>
            <Text style={appStyles.priceValue}>${gadget.price.toFixed(2)}</Text>
          </View>
        </View>

        <View style={appStyles.actionRow}>
          <TouchableOpacity
            style={[appStyles.button, appStyles.primaryButton]}
            onPress={() => navigation.navigate('Form', { id })}
          >
            <Text style={appStyles.buttonText}>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[appStyles.button, appStyles.dangerButton]} onPress={confirmDelete}>
            <Text style={appStyles.dangerText}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
