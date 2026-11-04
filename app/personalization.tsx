import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';

export default function PersonalizationScreen() {
  const router = useRouter();
  const { colors, themeMode, setThemeMode, fontSize, updateFontSize } = useTheme();
  const isDarkTheme = themeMode === 'dark';

  const handleFinish = () => {
    router.replace('/main/dashboard');
  };

  const handleBack = () => {
    if (router.canGoBack()) router.back();
    else router.replace('/main/settings');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity accessibilityRole="button" accessibilityLabel="Go back" onPress={handleBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={26} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: colors.textPrimary }]}>အသွင်အပြင် ရွေးချယ်ပါ</Text>
        </View>
        <Text style={[styles.subTitle, { color: colors.textSecondary }]}>
          သင့်အတွက် ဖတ်ရအဆင်ပြေမယ့် အရောင်နဲ့ စာလုံးအရွယ်အစားကို ရွေးချယ်ပေးပါ။
        </Text>

        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Theme အရောင်</Text>
        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.optionBtn, !isDarkTheme && styles.activeBtn, { borderColor: colors.primary }]}
            onPress={() => setThemeMode('light')}
          >
            <Text style={{ color: !isDarkTheme ? colors.primary : colors.textSecondary }}>Light Mode</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.optionBtn, isDarkTheme && styles.activeBtn, { borderColor: colors.primary }]}
            onPress={() => setThemeMode('dark')}
          >
            <Text style={{ color: isDarkTheme ? colors.primary : colors.textSecondary }}>Dark Mode</Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.sectionTitle, { color: colors.textPrimary, marginTop: 30 }]}>စာလုံးအရွယ်အစား</Text>
        <View style={styles.row}>
          {['Small', 'Medium', 'Large'].map((label, index) => {
            const sizes = [14, 18, 22];
            return (
              <TouchableOpacity
                key={label}
                style={[styles.optionBtn, fontSize === sizes[index] && styles.activeBtn, { borderColor: colors.primary }]}
                onPress={() => updateFontSize(sizes[index])}
              >
                <Text
                  style={{
                    fontSize: sizes[index],
                    color: fontSize === sizes[index] ? colors.primary : colors.textSecondary,
                  }}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <TouchableOpacity style={[styles.finishBtn, { borderColor: colors.primary, backgroundColor: colors.background }]} onPress={handleFinish}>
        <Text style={[styles.finishBtnText, { color: colors.textPrimary }]}>စတင်အသုံးပြုမည်</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  backButton: { padding: 10 },
  content: { flex: 1, justifyContent: 'center' },
  title: { flex: 1, fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginRight: 46 },
  subTitle: { fontSize: 16, textAlign: 'center', marginBottom: 40 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 15 },
  row: { flexDirection: 'row', gap: 10, justifyContent: 'space-between' },
  optionBtn: {
    flex: 1,
    padding: 15,
    borderWidth: 1,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeBtn: { borderWidth: 2 },
  finishBtn: { padding: 18, borderRadius: 15, borderWidth: 1, alignItems: 'center' },
  finishBtnText: { fontSize: 18, fontWeight: 'bold' },
});
