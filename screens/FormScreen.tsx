import { useCallback, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import type { FormScreenProps } from '../navigation/types';
import type { GadgetForm, NewGadget } from '../types/Gadget';
import GadgetService from '../services/gadgetService';
import { activeInputStyle, appStyles, colors } from '../styles/appStyles';

type FieldName = 'name' | 'brand' | 'category' | 'price' | 'purchaseYear' | '';

const emptyForm: GadgetForm = {
  name: '',
  brand: '',
  category: '',
  price: '',
  purchaseYear: '',
};

export default function FormScreen({ navigation, route }: FormScreenProps) {
  const id = route.params?.id;
  const isEdit = typeof id === 'number';
  const [form, setForm] = useState<GadgetForm>(emptyForm);
  const [focusedField, setFocusedField] = useState<FieldName>('');
  const [saving, setSaving] = useState(false);

  const loadForm = useCallback(async () => {
    if (!isEdit || id === undefined) {
      setForm(emptyForm);
      return;
    }

    try {
      const gadget = await GadgetService.getGadgetById(id);
      if (gadget !== null) {
        setForm({
          name: gadget.name,
          brand: gadget.brand,
          category: gadget.category,
          price: String(gadget.price),
          purchaseYear: String(gadget.purchaseYear),
        });
      }
    } catch {
      Alert.alert('Error', 'No se pudo cargar el formulario');
    } finally {
      await Promise.resolve();
    }
  }, [id, isEdit]);

  useFocusEffect(
    useCallback(() => {
      loadForm();
    }, [loadForm])
  );

  const changeField = (field: keyof GadgetForm, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const changePrice = (value: string) => {
    const cleanValue = value.replace(',', '.').replace(/[^0-9.]/g, '');
    const parts = cleanValue.split('.');
    const nextValue = parts.length > 2 ? `${parts[0]}.${parts.slice(1).join('')}` : cleanValue;
    changeField('price', nextValue);
  };

  const changeYear = (value: string) => {
    changeField('purchaseYear', value.replace(/[^0-9]/g, '').slice(0, 4));
  };

  const validateForm = (): NewGadget | null => {
    const name = form.name.trim();
    const brand = form.brand.trim();
    const category = form.category.trim();
    const price = Number(form.price);
    const purchaseYear = Number(form.purchaseYear);

    if (name.length === 0) {
      Alert.alert('Validacion', 'El nombre no puede estar vacio');
      return null;
    }

    if (brand.length === 0) {
      Alert.alert('Validacion', 'La marca no puede estar vacia');
      return null;
    }

    if (category.length === 0) {
      Alert.alert('Validacion', 'La categoria no puede estar vacia');
      return null;
    }

    if (form.price.trim().length === 0) {
      Alert.alert('Validacion', 'El precio no puede estar vacio');
      return null;
    }

    if (!Number.isFinite(price) || price <= 0) {
      Alert.alert('Validacion', 'El precio debe ser mayor a 0');
      return null;
    }

    if (form.purchaseYear.trim().length === 0) {
      Alert.alert('Validacion', 'El anio no puede estar vacio');
      return null;
    }

    if (!Number.isInteger(purchaseYear) || purchaseYear < 2000 || purchaseYear > 2026) {
      Alert.alert('Validacion', 'El anio debe estar entre 2000 y 2026');
      return null;
    }

    return { name, brand, category, price, purchaseYear };
  };

  const saveGadget = async () => {
    const data = validateForm();

    if (data === null) {
      return;
    }

    try {
      setSaving(true);
      if (isEdit && id !== undefined) {
        await GadgetService.updateGadget(id, data);
      } else {
        await GadgetService.createGadget(data);
      }
      navigation.goBack();
    } catch {
      Alert.alert('Error', 'No se pudo guardar el gadget');
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={appStyles.safe}>
      <KeyboardAvoidingView
        style={appStyles.screen}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView style={appStyles.scroll} contentContainerStyle={appStyles.scrollContent}>
          <View style={appStyles.formHero}>
            <View style={appStyles.modeBadge}>
              <Text style={appStyles.modeText}>{isEdit ? 'EDITAR' : 'CREAR'}</Text>
            </View>
            <Text style={appStyles.formTitle}>{isEdit ? 'Editar gadget' : 'Nuevo gadget'}</Text>
            <Text style={appStyles.formSubtitle}>
              {isEdit ? 'Actualiza la informacion del inventario' : 'Completa la informacion del producto'}
            </Text>
          </View>

          <View style={appStyles.form}>
            <View style={appStyles.field}>
              <Text style={appStyles.fieldLabel}>Nombre *</Text>
              <TextInput
                style={activeInputStyle(focusedField === 'name')}
                placeholder="MacBook Pro 14"
                placeholderTextColor={colors.muted}
                value={form.name}
                onChangeText={(value) => changeField('name', value)}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField('')}
              />
            </View>

            <View style={appStyles.field}>
              <Text style={appStyles.fieldLabel}>Marca *</Text>
              <TextInput
                style={activeInputStyle(focusedField === 'brand')}
                placeholder="Apple"
                placeholderTextColor={colors.muted}
                value={form.brand}
                onChangeText={(value) => changeField('brand', value)}
                onFocus={() => setFocusedField('brand')}
                onBlur={() => setFocusedField('')}
              />
            </View>

            <View style={appStyles.field}>
              <Text style={appStyles.fieldLabel}>Categoria *</Text>
              <TextInput
                style={activeInputStyle(focusedField === 'category')}
                placeholder="Laptop, Phone, Tablet"
                placeholderTextColor={colors.muted}
                value={form.category}
                onChangeText={(value) => changeField('category', value)}
                onFocus={() => setFocusedField('category')}
                onBlur={() => setFocusedField('')}
              />
            </View>

            <View style={appStyles.formRow}>
              <View style={[appStyles.field, appStyles.formHalf]}>
                <Text style={appStyles.fieldLabel}>Precio *</Text>
                <TextInput
                  style={[activeInputStyle(focusedField === 'price'), appStyles.formNumberInput]}
                  placeholder="1999.99"
                  placeholderTextColor={colors.muted}
                  value={form.price}
                  onChangeText={changePrice}
                  onFocus={() => setFocusedField('price')}
                  onBlur={() => setFocusedField('')}
                  keyboardType="decimal-pad"
                />
              </View>

              <View style={[appStyles.field, appStyles.formHalf]}>
                <Text style={appStyles.fieldLabel}>Anio *</Text>
                <TextInput
                  style={[activeInputStyle(focusedField === 'purchaseYear'), appStyles.formNumberInput]}
                  placeholder="2024"
                  placeholderTextColor={colors.muted}
                  value={form.purchaseYear}
                  onChangeText={changeYear}
                  onFocus={() => setFocusedField('purchaseYear')}
                  onBlur={() => setFocusedField('')}
                  keyboardType="numeric"
                />
              </View>
            </View>
            <Text style={appStyles.formRowHelp}>Rango de anio permitido: 2000-2026</Text>

            <View style={appStyles.formButtonBox}>
              <TouchableOpacity
                style={[appStyles.button, appStyles.crudButton, appStyles.primaryButton, saving && appStyles.buttonDisabled]}
                disabled={saving}
                onPress={saveGadget}
              >
                <Text style={appStyles.buttonText}>{isEdit ? 'Actualizar gadget' : 'Guardar gadget'}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[appStyles.button, appStyles.crudButton, appStyles.secondaryButton]}
                disabled={saving}
                onPress={() => navigation.goBack()}
              >
                <Text style={appStyles.secondaryText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
