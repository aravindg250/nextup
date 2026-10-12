import { Pressable, StyleSheet, Text, View } from 'react-native';

import { completedTone, useTheme } from '@/theme/colors';
import { fonts, liningNumbers } from '@/theme/fonts';

type Props = {
  title: string;
  /** The task's section color. */
  color: string;
  done: boolean;
  /** Draw a hairline above this row (every row in a section box except the first). */
  divider?: boolean;
  /** For completed tasks: when it was finished, e.g. "2:14 PM". */
  finishedAt?: string;
  onToggle: () => void;
};

export function TaskRow({ title, color, done, divider, finishedAt, onToggle }: Props) {
  const { p } = useTheme();
  const tone = done ? completedTone(color, p) : color;

  return (
    <Pressable
      onPress={onToggle}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: done }}
      accessibilityLabel={title}
      style={({ pressed }) => [
        styles.row,
        done ? styles.doneRow : styles.activeRow,
        divider && { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: p.hairline },
        pressed && { opacity: 0.6 },
      ]}
    >
      <View style={[styles.check, { borderColor: tone }, done && { backgroundColor: tone }]}>
        {done && <View style={[styles.tick, { borderColor: p.paper }]} />}
      </View>
      <Text style={[styles.title, { color: done ? tone : p.ink }, done && styles.struck]}>{title}</Text>
      {done && finishedAt ? <Text style={[styles.when, { color: tone }]}>{finishedAt}</Text> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minHeight: 44,
  },
  activeRow: {
    paddingVertical: 12,
  },
  doneRow: {
    paddingVertical: 8,
  },
  check: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tick: {
    width: 10,
    height: 5.5,
    marginTop: -2,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    transform: [{ rotate: '-45deg' }],
  },
  title: {
    flex: 1,
    fontFamily: fonts.body,
    fontSize: 17.5,
    lineHeight: 23,
  },
  struck: {
    textDecorationLine: 'line-through',
  },
  when: {
    fontFamily: fonts.body,
    fontSize: 14.5,
    lineHeight: 19,
    fontVariant: liningNumbers,
  },
});
