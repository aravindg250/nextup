/**
 * Days are stored as plain local calendar dates ("2026-10-11"), never
 * timestamps, so a task never shifts days because of time zones.
 */
export type DateKey = string;

export function toDateKey(date: Date): DateKey {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function fromDateKey(key: DateKey): Date {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function todayKey(): DateKey {
  return toDateKey(new Date());
}

/** "Sunday" */
export function formatWeekday(key: DateKey): string {
  return fromDateKey(key).toLocaleDateString('en-US', { weekday: 'long' });
}

/** "October 11, 2026" */
export function formatMonthDayYear(key: DateKey): string {
  return fromDateKey(key).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

/** "Sunday, October 11, 2026" — used for accessibility labels. */
export function formatFullDate(key: DateKey): string {
  return `${formatWeekday(key)}, ${formatMonthDayYear(key)}`;
}
