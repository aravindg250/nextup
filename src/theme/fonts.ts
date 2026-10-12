// Import each weight from its own folder so only these five get bundled.
import { EBGaramond_400Regular } from '@expo-google-fonts/eb-garamond/400Regular';
import { EBGaramond_400Regular_Italic } from '@expo-google-fonts/eb-garamond/400Regular_Italic';
import { EBGaramond_500Medium } from '@expo-google-fonts/eb-garamond/500Medium';
import { EBGaramond_500Medium_Italic } from '@expo-google-fonts/eb-garamond/500Medium_Italic';
import { EBGaramond_600SemiBold } from '@expo-google-fonts/eb-garamond/600SemiBold';
import { useFonts } from 'expo-font';

/**
 * Font family names. Custom fonts need one family per weight/style,
 * so pick the family instead of setting fontWeight or fontStyle.
 *
 * Bodoni Moda is bundled as two static cuts of the variable font:
 * "display" is cut for the big date (44px+), "heading" for section names (~22px).
 */
export const fonts = {
  display: 'BodoniModa-DisplayItalic',
  heading: 'BodoniModa-HeadingItalic',
  body: 'EBGaramond_400Regular',
  bodyMedium: 'EBGaramond_500Medium',
  bodySemiBold: 'EBGaramond_600SemiBold',
  bodyItalic: 'EBGaramond_400Regular_Italic',
  bodyMediumItalic: 'EBGaramond_500Medium_Italic',
} as const;

/** Times, dates and counts use straight (lining) numbers so they don't dip below the line. */
export const liningNumbers = ['lining-nums', 'tabular-nums'] as ('lining-nums' | 'tabular-nums')[];

export function useAppFonts(): boolean {
  const [loaded, error] = useFonts({
    [fonts.display]: require('../../assets/fonts/BodoniModa-DisplayItalic.ttf'),
    [fonts.heading]: require('../../assets/fonts/BodoniModa-HeadingItalic.ttf'),
    EBGaramond_400Regular,
    EBGaramond_400Regular_Italic,
    EBGaramond_500Medium,
    EBGaramond_500Medium_Italic,
    EBGaramond_600SemiBold,
  });
  // If a font fails to load, show the app with system fonts rather than a blank screen.
  return loaded || error != null;
}
