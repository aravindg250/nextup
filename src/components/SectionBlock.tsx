import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from '@/theme/colors';
import { fonts } from '@/theme/fonts';

type Props = {
  name: string;
  color: string;
  children: ReactNode;
};

/** A day section: its name in italic Bodoni, a line in its color, and its tasks in a box outlined in that color. */
export function SectionBlock({ name, color, children }: Props) {
  const { p } = useTheme();

  return (
    <View style={styles.wrap}>
      <Text style={[styles.name, { color: p.ink }]} accessibilityRole="header">
        {name}
      </Text>
      <View style={[styles.rule, { backgroundColor: color }]} />
      <View style={[styles.box, { borderColor: color, backgroundColor: p.surface }]}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 8,
  },
  name: {
    fontFamily: fonts.heading,
    fontSize: 22,
    lineHeight: 28,
  },
  rule: {
    height: 1,
  },
  box: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    overflow: 'hidden',
  },
});
