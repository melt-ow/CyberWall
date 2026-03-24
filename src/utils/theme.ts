export const COLORS = {
  bg: '#0A1628',
  bgLight: '#132039',
  bgCard: '#1A2A45',
  primary: '#00E5A0',
  primaryDark: '#00B87A',
  accent: '#4FC3F7',
  danger: '#EF5350',
  warning: '#FFA726',
  gold: '#FFD700',
  text: '#FFFFFF',
  textSecondary: '#8BA3C7',
  textMuted: '#4A6285',
  border: '#1E3A5F',
  success: '#66BB6A',
  path: '#0D2137',
  placeable: '#1A3A55',
  blocked: '#0A1628',
};

export const FONTS = {
  title: { fontSize: 28, fontWeight: '800' as const, color: COLORS.text },
  subtitle: { fontSize: 20, fontWeight: '700' as const, color: COLORS.text },
  body: { fontSize: 16, fontWeight: '400' as const, color: COLORS.text },
  small: { fontSize: 13, fontWeight: '400' as const, color: COLORS.textSecondary },
  caption: { fontSize: 11, fontWeight: '400' as const, color: COLORS.textMuted },
};

export const CELL_SIZE = 48;
export const GRID_COLS = 8;
export const GRID_ROWS = 6;
