import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext'; // အရင်ကဆောက်ထားတဲ့ Context
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PersonalizationScreen() {
  const router = useRouter();
  const { colors, isDarkMode, toggleTheme, fontSize, updateFontSize } = useTheme();

  const handleFinish = () => {
    // ရွေးချယ်မှုပြီးရင် Dashboard ကိုသွားမယ်
    router.replace('/main/dashboard');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>အသွင်အပြင် ရွေးချယ်ပါ</Text>
        <Text style={[styles.subTitle, { color: colors.textSecondary }]}>
          သင့်အတွက် ဖတ်ရအဆင်ပြေမယ့် အရောင်နဲ့ စာလုံးအရွယ်အစားကို ရွေးချယ်ပေးပါ။
        </Text>

        {/* --- Theme Selection --- */}
        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Theme အရောင်</Text>
        <View style={styles.row}>
          <TouchableOpacity 
            style={[styles.optionBtn, !isDarkMode && styles.activeBtn, { borderColor: colors.primary }]} 
            onPress={() => isDarkMode && toggleTheme()}
          >
            <Text style={{ color: !isDarkMode ? colors.primary : colors.textSecondary }}>Light Mode</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.optionBtn, isDarkMode && styles.activeBtn, { borderColor: colors.primary }]} 
            onPress={() => !isDarkMode && toggleTheme()}
          >
            <Text style={{ color: isDarkMode ? colors.primary : colors.textSecondary }}>Dark Mode</Text>
          </TouchableOpacity>
        </View>

        {/* --- Font Size Selection --- */}
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
                <Text style={{ 
                    fontSize: sizes[index], 
                    color: fontSize === sizes[index] ? colors.primary : colors.textSecondary 
                }}>{label}</Text>
              </TouchableOpacity>
            )
          })}
        </View>
      </View>

      <TouchableOpacity 
        style={[styles.finishBtn, { backgroundColor: colors.secondary }]} 
        onPress={handleFinish}
      >
        <Text style={styles.finishBtnText}>စတင်အသုံးပြုမည်</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  content: { flex: 1, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  subTitle: { fontSize: 16, textAlign: 'center', marginBottom: 40 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 15 },
  row: { flexDirection: 'row', gap: 10, justifyContent: 'space-between' },
  optionBtn: { 
    flex: 1, padding: 15, borderWidth: 1, borderRadius: 12, 
    alignItems: 'center', justifyContent: 'center' 
  },
  activeBtn: { borderWidth: 2, backgroundColor: 'rgba(255, 215, 0, 0.1)' },
  finishBtn: { padding: 18, borderRadius: 15, alignItems: 'center' },
  finishBtnText: { color: 'white', fontSize: 18, fontWeight: 'bold' }
});