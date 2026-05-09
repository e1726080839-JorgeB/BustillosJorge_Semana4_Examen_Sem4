import { useCallback, useState } from 'react';
import { Alert, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import type { ListRenderItem } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import type { Gadget } from '../types/Gadget';
import type { ListScreenProps } from '../navigation/types';
import GadgetService from '../services/gadgetService';
import { appStyles, colors, getCategoryBadgeStyle, getCategoryIconStyle } from '../styles/appStyles';

export default function ListScreen({ navigation }: ListScreenProps) {
  const [gadgets, setGadgets] = useState<Gadget[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const loadGadgets = useCallback(async () => {
    try {
      setLoading(true);
      const data = await GadgetService.getAllGadgets();
      setGadgets(data);
    } catch {
      Alert.alert('Error', 'No se pudo cargar el inventario');
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadGadgets();
    }, [loadGadgets])
  );

  const searchValue = search.trim().toLowerCase();
  const filteredGadgets =
    searchValue.length === 0
      ? gadgets
      : gadgets.filter(
          (item) =>
            item.name.toLowerCase().includes(searchValue) ||
            item.brand.toLowerCase().includes(searchValue)
        );

  const renderItem: ListRenderItem<Gadget> = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.85}
      style={appStyles.card}
      onPress={() => navigation.navigate('Detail', { id: item.id })}
    >
      <View style={getCategoryIconStyle(item.category)}>
        <Text style={appStyles.iconText}>{item.category.slice(0, 1).toUpperCase()}</Text>
      </View>

      <View style={appStyles.cardInfo}>
        <Text style={appStyles.gadgetName}>{item.name}</Text>
        <Text style={appStyles.gadgetBrand}>{item.brand}</Text>
        <View style={[appStyles.categoryBadge, getCategoryBadgeStyle(item.category)]}>
          <Text style={appStyles.categoryText}>{item.category}</Text>
        </View>
      </View>

      <View style={appStyles.cardSide}>
        <Text style={appStyles.price}>${item.price.toFixed(2)}</Text>
        <Text style={appStyles.year}>{item.purchaseYear}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={appStyles.safe}>
      <View style={appStyles.screen}>
        <View style={appStyles.header}>
          <View style={appStyles.headerRow}>
            <View>
              <Text style={appStyles.overline}>Inventario</Text>
              <Text style={appStyles.title}>Mis Gadgets</Text>
              <Text style={appStyles.subtitle}>Control de productos tecnologicos</Text>
            </View>

            <View style={appStyles.countBadge}>
              <Text style={appStyles.countNumber}>{gadgets.length}</Text>
              <Text style={appStyles.countLabel}>Items</Text>
            </View>
          </View>
        </View>

        <View style={appStyles.listArea}>
          <TextInput
            style={appStyles.searchBox}
            placeholder="Buscar por nombre o marca"
            placeholderTextColor={colors.muted}
            value={search}
            onChangeText={setSearch}
          />

          <Text style={appStyles.resultText}>
            {loading ? 'Cargando...' : `${filteredGadgets.length} resultado(s)`}
          </Text>

          <FlatList
            data={filteredGadgets}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={appStyles.scrollContent}
            ItemSeparatorComponent={() => <View style={appStyles.listSeparator} />}
            ListEmptyComponent={
              <View style={appStyles.emptyBox}>
                <Text style={appStyles.emptyTitle}>Sin resultados</Text>
                <Text style={appStyles.emptyText}>Agrega un gadget o cambia la busqueda.</Text>
              </View>
            }
          />
        </View>

        <TouchableOpacity style={appStyles.fab} activeOpacity={0.85} onPress={() => navigation.navigate('Form')}>
          <Text style={appStyles.fabText}>+</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
