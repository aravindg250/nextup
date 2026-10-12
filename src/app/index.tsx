import Constants, { ExecutionEnvironment } from 'expo-constants';
import { useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, LayoutAnimation, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { DayHeader } from '@/components/DayHeader';
import { SectionBlock } from '@/components/SectionBlock';
import { TaskRow } from '@/components/TaskRow';
import { useToday } from '@/lib/useToday';
import { useTheme, type SectionColorName } from '@/theme/colors';
import { fonts } from '@/theme/fonts';

/**
 * Step 1 placeholder: proves the app builds and runs on iPhone and Windows.
 * Tasks live in memory only; the real day view replaces this in step 4.
 */

type Section = { id: string; name: string; color: SectionColorName };
type Task = { id: string; title: string; sectionId: string; order: number; completedAt: number | null };

const SECTIONS: Section[] = [
  { id: 'setup', name: 'Setup', color: 'blue' },
  { id: 'general', name: 'General', color: 'grey' },
];

const STARTER_TASKS: Task[] = [
  { id: 't1', title: 'Install NextUp on my iPhone', sectionId: 'setup', order: 1, completedAt: null },
  { id: 't2', title: 'Open NextUp on Windows', sectionId: 'setup', order: 2, completedAt: null },
  { id: 't3', title: 'Connect the database', sectionId: 'setup', order: 3, completedAt: null },
  { id: 't4', title: 'Check something off', sectionId: 'general', order: 1, completedAt: null },
];

export default function TodayScreen() {
  const { p, section } = useTheme();
  const today = useToday();
  const [tasks, setTasks] = useState(STARTER_TASKS);
  const reduceMotion = useReduceMotion();

  const toggle = (id: string) => {
    if (!reduceMotion.current) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completedAt: t.completedAt ? null : Date.now() } : t)),
    );
  };

  const colorOf = (sectionId: string) => section(SECTIONS.find((s) => s.id === sectionId)?.color ?? 'grey');
  const completed = tasks
    .filter((t) => t.completedAt !== null)
    .sort((a, b) => (b.completedAt ?? 0) - (a.completedAt ?? 0));

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: p.paper }]} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.column}>
          <DayHeader day={today} today={today} />

          {SECTIONS.map((s) => {
            const active = tasks
              .filter((t) => t.sectionId === s.id && t.completedAt === null)
              .sort((a, b) => a.order - b.order);
            if (active.length === 0) return null;
            return (
              <SectionBlock key={s.id} name={s.name} color={section(s.color)}>
                {active.map((t, i) => (
                  <TaskRow
                    key={t.id}
                    title={t.title}
                    color={section(s.color)}
                    done={false}
                    divider={i > 0}
                    onToggle={() => toggle(t.id)}
                  />
                ))}
              </SectionBlock>
            );
          })}

          {completed.length > 0 && (
            <View style={styles.completed}>
              <Text style={[styles.completedTitle, { color: p.muted }]} accessibilityRole="header">
                Completed
              </Text>
              {completed.map((t) => (
                <TaskRow
                  key={t.id}
                  title={t.title}
                  color={colorOf(t.sectionId)}
                  done
                  finishedAt={formatTime(t.completedAt ?? 0)}
                  onToggle={() => toggle(t.id)}
                />
              ))}
            </View>
          )}

          <Text style={[styles.note, { color: p.muted }]}>
            {`This preview doesn't save checkmarks yet. ${runtimeLabel()}, version ${Constants.expoConfig?.version ?? '0.1.0'}.`}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function formatTime(ms: number): string {
  return new Date(ms).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

function runtimeLabel(): string {
  if (Platform.OS === 'web') return 'Running in the web build';
  if (Constants.executionEnvironment === ExecutionEnvironment.StoreClient) return 'Running in Expo Go';
  return 'Running as the installed app';
}

function useReduceMotion() {
  const ref = useRef(false);
  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then((v) => (ref.current = v));
    const sub = AccessibilityInfo.addEventListener('reduceMotionChanged', (v) => (ref.current = v));
    return () => sub.remove();
  }, []);
  return ref;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 48,
    alignItems: 'center',
  },
  column: {
    width: '100%',
    maxWidth: 640,
    gap: 22,
  },
  completed: {
    gap: 2,
  },
  completedTitle: {
    fontFamily: fonts.heading,
    fontSize: 22,
    lineHeight: 28,
    marginBottom: 4,
  },
  note: {
    fontFamily: fonts.bodyItalic,
    fontSize: 15,
    lineHeight: 20,
  },
});
