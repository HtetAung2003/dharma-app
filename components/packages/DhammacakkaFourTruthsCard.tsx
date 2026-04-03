import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

const DhammacakkaFourTruthsCard = () => {
  const { colors, fontSize, themeMode } = useTheme();

  const scale = fontSize / 16;
  const dynamicSize = (base: number) => base * scale;

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={[styles.titleLine, { backgroundColor: colors.primary }]} />
        <Text style={[styles.mainTitle, { color: colors.primary, fontSize: dynamicSize(18) }]}>
          ဓမ္မစက္ကပဝတ္တနသုတ် (အရိယသစ္စာ ၄ ပါး)
        </Text>
      </View>

      {/* Main Scripture Card */}
      <View style={[
        styles.card, 
        { 
          backgroundColor: themeMode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : '#FFFFFF',
          borderColor: colors.border
        }
      ]}>
        
        {/* 1. Dukkha Ariya Sacca */}
        <View style={styles.section}>
          <Text style={[styles.suttaTitle, { color: colors.primary, fontSize: dynamicSize(17) }]}>
            ၁။ ဒုက္ခအရိယသစ္စာ
          </Text>
          <Text style={[styles.suttaText, { color: colors.textPrimary, fontSize: dynamicSize(16.5) }]}>
            ဣဒံ ခေါ ပန ဘိက္ခဝေ ဒုက္ခံ အရိယသစ္စံ -{"\n"}
            <Text style={styles.subText}>
              ဇာတိပိ ဒုက္ခာ၊ ဇရာပိ ဒုက္ခာ၊ ဗျာဓိပိ ဒုက္ခော၊ မရဏမ္ပိ ဒုက္ခံ၊{"\n"}
              အပ္ပိယေဟိ သမ္ပယောဂေါ ဒုက္ခော၊ ပိယေဟိ ဝိပ္ပယောဂေါ ဒုက္ခော၊ ယမ္ပိစ္ဆံ န လဘတိ တမ္ပိ ဒုက္ခံ၊ သံခိတ္တေန ပဉ္စုပါဒါနက္ခန္ဓာ ဒုက္ခာ။
            </Text>
          </Text>
        </View>

        <View style={styles.divider} />

        {/* 2. Dukkha Samudaya Ariya Sacca */}
        <View style={styles.section}>
          <Text style={[styles.suttaTitle, { color: colors.primary, fontSize: dynamicSize(17) }]}>
            ၂။ ဒုက္ခသမုဒယအရိယသစ္စာ
          </Text>
          <Text style={[styles.suttaText, { color: colors.textPrimary, fontSize: dynamicSize(16.5) }]}>
            ဣဒံ ခေါ ပန ဘိက္ခဝေ ဒုက္ခသမုဒယံ အရိယသစ္စံ -{"\n"}
            <Text style={styles.subText}>
              ယာယံ တဏှာ ပေါနောဗ္ဘဝိကာ နန္ဒီရာဂသဟဂတာ တတြ တတြာဘိနန္ဒိနီ၊ သေယျထိဒံ - <Text style={styles.boldText}>ကာမတဏှာ၊ ဘဝတဏှာ၊ ဝိဘဝတဏှာ။</Text>
            </Text>
          </Text>
        </View>

        <View style={styles.divider} />

        {/* 3. Dukkha Nirodha Ariya Sacca */}
        <View style={styles.section}>
          <Text style={[styles.suttaTitle, { color: colors.primary, fontSize: dynamicSize(17) }]}>
            ၃။ ဒုက္ခနိရောဓအရိယသစ္စာ
          </Text>
          <Text style={[styles.suttaText, { color: colors.textPrimary, fontSize: dynamicSize(16.5) }]}>
            ဣဒံ ခေါ ပန ဘိက္ခဝေ ဒုက္ခနိရောဓံ အရိယသစ္စံ -{"\n"}
            <Text style={styles.subText}>
              ယော တဿာယေဝ တဏှာယ အသေသဝိရာဂနိရောဓော စာဂေါ ပဋိနိဿဂ္ဂေါ မုတ္တိ အနာလယော။
            </Text>
          </Text>
        </View>

        <View style={styles.divider} />

        {/* 4. Dukkha Nirodha Gamini Patipada Ariya Sacca */}
        <View style={styles.section}>
          <Text style={[styles.suttaTitle, { color: colors.primary, fontSize: dynamicSize(17) }]}>
            ၄။ မဂ္ဂအရိယသစ္စာ
          </Text>
          <Text style={[styles.suttaText, { color: colors.textPrimary, fontSize: dynamicSize(16.5) }]}>
            ဣဒံ ခေါ ပန ဘိက္ခဝေ ဒုက္ခနိရောဓဂါမိနီ ပဋိပဒါ အရိယသစ္စံ -{"\n"}
            <Text style={styles.pathHighlight}>
              အယမေဝ အရိယော အဋ္ဌင်္ဂိကော မဂ္ဂေါ။ သေယျထိဒံ - သမ္မာဒိဋ္ဌိ၊ သမ္မာသင်္ကပ္ပော၊ သမ္မာဝါစာ၊ သမ္မာကမ္မန္တော၊ သမ္မာအာဇီဝေါ၊ သမ္မာဝါယာမော၊ သမ္မာသတိ၊ သမ္မာသမာဓိ။
            </Text>
          </Text>
        </View>

        {/* Closing Footer */}
        <View style={[styles.footer, { borderTopColor: colors.border }]}>
          <Text style={[styles.footerText, { color: colors.secondary }]}>
            သစ္စာလေးပါး မြတ်တရားကို သိမြင်နိုင်ကြပါစေ။
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
    borderWidth: 1,
    padding: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  section: { marginVertical: 8 },
  suttaTitle: { fontWeight: '800', marginBottom: 8 },
  suttaText: { lineHeight: 28, textAlign: 'justify' },
  subText: { fontWeight: '400', opacity: 0.9 },
  boldText: { fontWeight: '700' },
  pathHighlight: { fontWeight: '700', color: '#10B981' }, // Emerald for the Path
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#E5E7EB',
    marginVertical: 16,
    opacity: 0.2,
  },
  footer: { marginTop: 20, paddingTop: 15, borderTopWidth: 1, alignItems: 'center' },
  footerText: { fontStyle: 'italic', fontWeight: '600' },
});

export default DhammacakkaFourTruthsCard;

