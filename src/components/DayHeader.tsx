import { Pressable, StyleSheet, Text, View } from 'react-native';

import { formatFullDate, formatMonthDayYear, formatWeekday, type DateKey } from '@/lib/dates';
import { useTheme } from '@/theme/colors';
import { fonts, liningNumbers } from '@/theme/fonts';

type Props = {
  day: DateKey;
  today: DateKey;
  onPressToday?: () => void;
};

/** "Sunday" in italic Bodoni, a Today badge (or a Today button on other days), and the full date. */
export function DayHeader({ day, today, onPressToday }: Props) {
  const { p } = useTheme();
  const isToday = day === today;

  return (
    <View style={styles.wrap} accessibilityRole="header" accessibilityLabel={formatFullDate(day)}>
      <View style={styles.row}>
        <Text style={[styles.weekday, { color: p.ink }]}>{formatWeekday(day)}</Text>
        {isToday ? (
          <View style={[styles.badge, { borderColor: p.accent }]}>
            <Text style={[styles.badgeText, { color: p.accentText }]}>Today</Text>
          </View>
        ) : (
          <Pressable
            onPress={onPressToday}
            accessibilityRole="button"
            accessibilityLabel="Go to today"
            hitSlop={10}
            style={({ pressed }) => [styles.badge, styles.button, { backgroundColor: p.accent, borderColor: p.accent, opacity: pressed ? 0.7 : 1 }]}
          >
            <Text style={[styles.badgeText, { color: p.onAccent }]}>Today</Text>
          </Pressable>
        )}
      </View>
      <Text style={[styles.date, { color: p.muted }]}>{formatMonthDayYear(day)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  weekday: {
    fontFamily: fonts.display,
    fontSize: 44,
    lineHeight: 50,
    letterSpacing: -0.5,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: 999,
    borderWidth: 1.5,
  },
  button: {
    paddingHorizontal: 14,
  },
  badgeText: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 15.5,
    lineHeight: 20,
  },
  date: {
    fontFamily: fonts.body,
    fontSize: 18.5,
    lineHeight: 24,
    fontVariant: liningNumbers,
  },
});
