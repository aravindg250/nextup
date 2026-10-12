import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

import { useTheme } from '@/theme/colors';
import { useAppFonts } from '@/theme/fonts';

export default function RootLayout() {
  const { p } = useTheme();
  const fontsReady = useAppFonts();

  if (!fontsReady) {
    return <View style={{ flex: 1, backgroundColor: p.paper }} />;
  }

  return (
    <>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: p.paper },
        }}
      />
    </>
  );
}
