import { StyleSheet } from 'react-native';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

export const colors = {
  background: '#fbf7f0',
  panel: '#f2e7d8',
  card: '#fffaf3',
  cardStrong: '#ead9c4',
  text: '#3d2b20',
  muted: '#806a5a',
  border: '#d9c3aa',
  primary: '#a86f3d',
  primaryDark: '#6f4526',
  green: '#2f7d50',
  red: '#b34136',
  blue: '#7d5a3a',
  white: '#ffffff',
};

export const appStyles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 28,
  },
  loadingScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    padding: 24,
  },
  loadingText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  header: {
    backgroundColor: colors.panel,
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 22,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  overline: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '900',
    marginTop: 4,
  },
  subtitle: {
    color: colors.muted,
    fontSize: 14,
    marginTop: 4,
  },
  countBadge: {
    minWidth: 68,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  countNumber: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '900',
  },
  countLabel: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  content: {
    padding: 16,
    gap: 12,
  },
  listArea: {
    flex: 1,
    padding: 16,
    gap: 12,
  },
  searchBox: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: colors.text,
    fontSize: 16,
  },
  resultText: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '700',
    marginLeft: 2,
  },
  listSeparator: {
    height: 12,
  },
  card: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: colors.primaryDark,
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  cardPressed: {
    opacity: 0.8,
  },
  iconBox: {
    width: 56,
    height: 56,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    color: colors.white,
    fontSize: 22,
    fontWeight: '900',
  },
  cardInfo: {
    flex: 1,
    gap: 4,
  },
  gadgetName: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '900',
  },
  gadgetBrand: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '700',
  },
  cardSide: {
    alignItems: 'flex-end',
    gap: 4,
  },
  price: {
    color: colors.green,
    fontSize: 16,
    fontWeight: '900',
  },
  year: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '700',
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  badgeLaptop: {
    backgroundColor: '#8b5e34',
  },
  badgePhone: {
    backgroundColor: '#b07d50',
  },
  badgeTablet: {
    backgroundColor: '#6f8b58',
  },
  badgeOther: {
    backgroundColor: '#906b55',
  },
  emptyBox: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 18,
    alignItems: 'center',
    marginTop: 16,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
  },
  emptyText: {
    color: colors.muted,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 6,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 24,
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primaryDark,
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  fabText: {
    color: colors.white,
    fontSize: 36,
    lineHeight: 38,
    fontWeight: '400',
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.cardStrong,
  },
  backText: {
    color: colors.text,
    fontSize: 28,
    lineHeight: 30,
    fontWeight: '700',
  },
  detailHero: {
    alignItems: 'center',
    backgroundColor: colors.panel,
    paddingVertical: 22,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: 10,
  },
  detailIcon: {
    width: 92,
    height: 92,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  detailIconText: {
    color: colors.white,
    fontSize: 34,
    fontWeight: '900',
  },
  infoGrid: {
    padding: 16,
    gap: 10,
  },
  infoCard: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 14,
    gap: 4,
  },
  twoColumns: {
    flexDirection: 'row',
    gap: 10,
  },
  columnCard: {
    flex: 1,
  },
  infoLabel: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  infoValue: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
  },
  priceCard: {
    borderColor: colors.green,
    backgroundColor: '#eef7ee',
  },
  priceValue: {
    color: colors.green,
    fontSize: 24,
    fontWeight: '900',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  button: {
    flex: 1,
    minHeight: 52,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  dangerButton: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.red,
  },
  secondaryButton: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '900',
  },
  dangerText: {
    color: colors.red,
    fontSize: 16,
    fontWeight: '900',
  },
  secondaryText: {
    color: colors.muted,
    fontSize: 16,
    fontWeight: '800',
  },
  buttonDisabled: {
    opacity: 0.55,
  },
  formHero: {
    backgroundColor: colors.panel,
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 22,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modeBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 16,
  },
  modeText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: '900',
  },
  formTitle: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '900',
  },
  formSubtitle: {
    color: colors.muted,
    fontSize: 14,
    marginTop: 4,
  },
  form: {
    padding: 16,
    gap: 12,
  },
  field: {
    gap: 6,
  },
  fieldLabel: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  input: {
    minHeight: 50,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 14,
    color: colors.text,
    fontSize: 16,
  },
  inputActive: {
    borderColor: colors.primary,
    backgroundColor: colors.white,
  },
  helpText: {
    color: colors.muted,
    fontSize: 12,
    fontStyle: 'italic',
  },
  formRow: {
    flexDirection: 'row',
    gap: 10,
  },
  formHalf: {
    flex: 1,
  },
  formButtonBox: {
    gap: 10,
    marginTop: 12,
  },
});

export function getCategoryBadgeStyle(category: string): StyleProp<ViewStyle> {
  const value = category.toLowerCase();

  if (value.includes('laptop')) {
    return appStyles.badgeLaptop;
  }

  if (value.includes('phone')) {
    return appStyles.badgePhone;
  }

  if (value.includes('tablet')) {
    return appStyles.badgeTablet;
  }

  return appStyles.badgeOther;
}

export function getCategoryIconStyle(category: string): StyleProp<ViewStyle> {
  return [appStyles.iconBox, getCategoryBadgeStyle(category)];
}

export function getDetailIconStyle(category: string): StyleProp<ViewStyle> {
  return [appStyles.detailIcon, getCategoryBadgeStyle(category)];
}

export function activeInputStyle(active: boolean): StyleProp<TextStyle> {
  if (active) {
    return [appStyles.input, appStyles.inputActive];
  }

  return appStyles.input;
}
