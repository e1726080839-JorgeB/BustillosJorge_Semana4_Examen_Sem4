import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  List: undefined;
  Detail: { id: number };
  Form: { id?: number } | undefined;
};

export type ListScreenProps = NativeStackScreenProps<RootStackParamList, 'List'>;
export type DetailScreenProps = NativeStackScreenProps<RootStackParamList, 'Detail'>;
export type FormScreenProps = NativeStackScreenProps<RootStackParamList, 'Form'>;
