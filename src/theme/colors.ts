import { useColorScheme } from 'react-native';

/** Midnight Brass. Light and dark follow the device setting. */
export type Palette = {
  paper: string;
  surface: string;
  raised: string;
  track: string;
  ink: string;
  muted: string;
  hairline: string;
  accent: string;
  accentText: string;
  onAccent: string;
  overdue: string;
  onOverdue: string;
  flag: string;
  scrim: string;
};

const light: Palette = {
  paper: '#EEF0F3',
  surface: '#FFFFFF',
  raised: '#FFFFFF',
  track: '#E3E6EC',
  ink: '#141A28',
  muted: '#626777',
  hairline: '#D8DCE3',
  accent: '#8A6A2B',
  accentText: '#6E5420',
  onAccent: '#FFFFFF',
  overdue: '#B8442F',
  onOverdue: '#FFFFFF',
  flag: '#8A6A2B',
  scrim: 'rgba(20, 26, 40, 0.45)',
};

const dark: Palette = {
  paper: '#0F1420',
  surface: '#161D2C',
  raised: '#1E2638',
  track: '#263046',
  ink: '#EDE6D6',
  muted: '#A39C8A',
  hairline: '#263046',
  accent: '#C8A45D',
  accentText: '#C8A45D',
  onAccent: '#0F1420',
  overdue: '#E5735F',
  onOverdue: '#0F1420',
  flag: '#C8A45D',
  scrim: 'rgba(4, 6, 12, 0.62)',
};

/** Section colors are stored by name so each one can have a light and a dark shade. */
export const sectionColorNames = ['blue', 'grey', 'teal', 'plum', 'green', 'rust', 'rose'] as const;
export type SectionColorName = (typeof sectionColorNames)[number];

const sectionLight: Record<SectionColorName, string> = {
  blue: '#3559B5',
  grey: '#737A8A',
  teal: '#227A84',
  plum: '#6B4FA0',
  green: '#2F7D5B',
  rust: '#B4602A',
  rose: '#A8436A',
};

const sectionDark: Record<SectionColorName, string> = {
  blue: '#7393DB',
  grey: '#8C93A3',
  teal: '#63B8C1',
  plum: '#A58BD6',
  green: '#6FBF97',
  rust: '#E0965F',
  rose: '#DB86A6',
};

export type Theme = {
  p: Palette;
  isDark: boolean;
  section: (name: SectionColorName) => string;
};

export function useTheme(): Theme {
  const isDark = useColorScheme() === 'dark';
  const shades = isDark ? sectionDark : sectionLight;
  return {
    p: isDark ? dark : light,
    isDark,
    section: (name) => shades[name],
  };
}

/** Blend two #RRGGBB colors. amount 0 = a, 1 = b. */
export function mix(a: string, b: string, amount: number): string {
  const pa = parseHex(a);
  const pb = parseHex(b);
  const out = pa.map((c, i) => Math.round(c + (pb[i] - c) * amount));
  return `#${out.map((c) => c.toString(16).padStart(2, '0')).join('')}`;
}

/** The greyed version of a section color used for completed tasks. */
export function completedTone(color: string, p: Palette): string {
  return mix(mix(color, p.muted, 0.5), p.surface, 0.35);
}

function parseHex(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)) as [number, number, number];
}
