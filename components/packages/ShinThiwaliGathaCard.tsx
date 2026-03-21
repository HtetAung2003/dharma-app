import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ShinThiwaliGathaCard = () => {
  const { colors, isDarkMode, fontSize } = useTheme();

  const scale = fontSize / 16;
  const dynamicSize = (base: number) => base * scale;

  // လာဘ်လာဘအတွက် သီးသန့် Gold accent color
  const goldColor = '#D97706'; 

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={[styles.titleLine, { backgroundColor: goldColor }]} />
        <Text style={[styles.mainTitle, { color: goldColor, fontSize: dynamicSize(18) }]}>
          ရှင်သီဝလိဂါထာ (လာဘ်လာဘပေါများစေရန်)
        </Text>
      </View>

      {/* Scripture Card */}
      <View style={[
        styles.card, 
        { 
          backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.03)' : '#FFFFFF',
          borderColor: isDarkMode ? 'rgba(217, 119, 6, 0.3)' : '#FEF3C7'
        }
      ]}>
        {/* Intro Context */}
        <View style={styles.contextBox}>
          <Text style={[styles.contextText, { color: colors.textSecondary, fontSize: dynamicSize(14) }]}>
            စီးပွားရေး အဆင်ပြေစေရန်နှင့် လာဘ်လာဘ ရွှင်လန်းစေရန် ရည်မှန်း၍ ရွတ်ဆိုပူဇော်ကြသည်။
          </Text>
        </View>

        {/* Main Pali Text */}
        <View style={styles.paliContainer}>
          <Text style={[styles.suttaText, { color: colors.textPrimary, fontSize: dynamicSize(17.5) }]}>
            <Text style={{ color: goldColor, fontWeight: '800' }}>သီဝလိ စ မဟာနာမံ၊</Text>{"\n"}
            သဗ္ဗလာဘံ ဘဝိဿတိ။{"\n\n"}
            ထေရဿ အာနုဘာဝေန၊{"\n"}
            သဗ္ဗေ ဟောန္တု သုခိတေ။{"\n\n"}
            ကတေန ပုညကမ္မေန၊{"\n"}
            သဗ္ဗေ ဘဒြာနိ ပဿန္တု။
          </Text>
        </View>

        {/* Prosperity Footer */}
        <View style={[
          styles.footerNote, 
          { backgroundColor: isDarkMode ? 'rgba(217, 119, 6, 0.1)' : '#FFFBEB' }
        ]}>
          <Text style={[styles.footerText, { color: goldColor, fontSize: dynamicSize(13) }]}>
            ရှင်သီဝလိမထေရ်မြတ်၏ ဧတဒဂ်ရ အာနုဘော်တော်ကြောင့် အစစအရာရာ ပြည့်စုံကြပါစေ။
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: '100%', paddingVertical: 10 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 15, paddingHorizontal: 5 },
  titleLine: { width: 4, height: 20, borderRadius: 2, marginRight: 10 },
  mainTitle: { fontWeight: '700' },
  card: {
    borderRadius: 24,
    borderWidth: 2,
    padding: 24,
    elevation: 2,
    shadowColor: '#D97706',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  contextBox: { 
    marginBottom: 20, 
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(217, 119, 6, 0.1)',
    paddingBottom: 10,
  },
  contextText: { fontStyle: 'italic', textAlign: 'center', lineHeight: 22 },
  paliContainer: { paddingVertical: 5 },
  suttaText: {
    lineHeight: 34,
    textAlign: 'center',
    fontWeight: '600',
  },
  footerNote: {
    marginTop: 20,
    padding: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(217, 119, 6, 0.2)',
  },
  footerText: { textAlign: 'center', lineHeight: 20, fontWeight: '700' },
});

export default ShinThiwaliGathaCard;