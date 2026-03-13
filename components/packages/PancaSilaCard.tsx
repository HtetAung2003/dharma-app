import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

const PancaSilaCard = () => {
  const { colors, isDarkMode, fontSize } = useTheme();

  const scale = fontSize / 16;
  const dynamicSize = (base: number) => base * scale;

  return (
    <View style={styles.container}>
      {/* Title */}
      <View style={styles.titleWrapper}>
        <View style={[styles.titleLine, { backgroundColor: colors.primary }]} />
        <Text style={[styles.subtitle, { color: colors.primary, fontSize: dynamicSize(17) }]}>
          ငါးပါးသီလ ခံယူဆောက်တည်ခြင်း
        </Text>
      </View>

      {/* Script Card */}
      <View style={[
        styles.card, 
        { 
          backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : '#FFFFFF',
          borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#E2E8F0'
        }
      ]}>
        <View style={styles.listSection}>
          <Text style={[
            styles.scriptText, 
            { 
              color: colors.textPrimary, 
              fontSize: dynamicSize(20), 
              lineHeight: dynamicSize(40) 
            }
          ]}>
            ၁။ ပါဏာတိပါတာ ဝေရမဏိ သိက္ခာပဒံ သမာဒိယာမိ။{"\n"}
            ၂။ အဒိန္နာဒါနာ ဝေရမဏိ သိက္ခာပဒံ သမာဒိယာမိ။{"\n"}
            ၃။ ကာမေသုမိစ္ဆာစာရာ ဝေရမဏိ သိက္ခာပဒံ သမာဒိယာမိ။{"\n"}
            ၄။ မုသာဝါဒါ ဝေရမဏိ သိက္ခာပဒံ သမာဒိယာမိ။{"\n"}
            ၅။ သုရာမေရယ မဇ္ဇပမာဒဋ္ဌာနာ ဝေရမဏိ သိက္ခာပဒံ သမာဒိယာမိ။
          </Text>
        </View>

        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        {/* ဝန်ခံခြင်း အပိုင်း */}
        <Text style={[
          styles.footerText, 
          { 
            color: colors.primary, 
            fontSize: dynamicSize(20),
            fontWeight: '700'
          }
        ]}>
          အာမ ဘန္တေ။
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 5,
  },
  titleLine: {
    width: 4,
    height: 18,
    borderRadius: 2,
    marginRight: 10,
  },
  subtitle: {
    fontWeight: '700',
  },
  card: {
    padding: 22,
    borderRadius: 24,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  listSection: {
    marginBottom: 10,
  },
  scriptText: {
    textAlign: 'left', // သီလများကို နံပါတ်စဉ်ဖြင့်ဖြစ်၍ ဘယ်ဘက်ကပ်ထားပါသည်
    fontWeight: '500',
  },
  divider: {
    height: 1,
    width: '100%',
    marginVertical: 15,
    opacity: 0.3,
  },
  footerText: {
    textAlign: 'center',
  },
});

export default PancaSilaCard;