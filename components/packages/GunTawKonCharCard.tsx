import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const GunTawKonCharCard = () => {
  const { colors, isDarkMode, fontSize } = useTheme();

  const scale = fontSize / 16;
  const dynamicSize = (base: number) => base * scale;

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={[styles.titleLine, { backgroundColor: colors.primary }]} />
        <Text style={[styles.mainTitle, { color: colors.primary, fontSize: dynamicSize(18) }]}>
          ဂုဏ်တော်ကွန်ချာ (အန္တရာယ်ကင်းဂါထာ)
        </Text>
      </View>

      {/* Scripture Card */}
      <View style={[
        styles.card, 
        { 
          backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.03)' : '#FFFFFF',
          borderColor: colors.border
        }
      ]}>
        {/* Intro Context */}
        <View style={[styles.contextBox, { borderLeftColor: colors.primary }]}>
          <Text style={[styles.contextText, { color: colors.textSecondary, fontSize: dynamicSize(14) }]}>
            ဘုရားဂုဏ်တော် ၉ ပါးကို အပြန်အလှန် ယှက်နွယ်ကာ ဘေးအန္တရာယ်ကင်းစေရန်နှင့် စိတ်ဓာတ်ခွန်အားရရှိရန် ရွတ်ဆိုပူဇော်ကြသည်။
          </Text>
        </View>

        {/* Main Pali Text with Shield-like styling */}
        <View style={styles.paliContainer}>
          <Text style={[styles.suttaText, { color: colors.textPrimary, fontSize: dynamicSize(17.5) }]}>
            ဣတိပိသော ဘဂဝါ{"\n"}
            <Text style={[styles.highlight, { color: colors.primary }]}>အရဟံ သမ္မာသမ္ဗုဒ္ဓေါ၊</Text>{"\n"}
            ဝိဇ္ဇာစရဏသမ္ပန္နော သုဂတော လောကဝိဒူ၊{"\n"}
            အနုတ္တရော ပုရိသဒမ္မသာရထိ၊{"\n"}
            သတ္တာ ဒေဝမနုဿာနံ ဗုဒ္ဓေါ ဘဂဝါတိ။
          </Text>
        </View>

        {/* Footer Protection Note */}
        <View style={[
          styles.footerNote, 
          { backgroundColor: isDarkMode ? 'rgba(99, 102, 241, 0.1)' : '#F0F9FF' }
        ]}>
          <Text style={[styles.footerText, { color: colors.primary, fontSize: dynamicSize(13) }]}>
            "ကွန်ချာ" ဟု ဆိုသည့်အတိုင်း ဘုရားဂုဏ်တော်များဖြင့် ဘေးအန္တရာယ်များ မဝင်ရောက်နိုင်အောင် ကာကွယ်ထားခြင်း ဖြစ်သည်။
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
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  contextBox: { 
    marginBottom: 20, 
    paddingLeft: 12, 
    borderLeftWidth: 3,
  },
  contextText: { fontStyle: 'italic', lineHeight: 22 },
  paliContainer: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  suttaText: {
    lineHeight: 36,
    textAlign: 'center',
    fontWeight: '600',
  },
  highlight: {
    fontWeight: '800',
  },
  footerNote: {
    marginTop: 20,
    padding: 15,
    borderRadius: 15,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
  },
  footerText: { textAlign: 'center', lineHeight: 20, fontWeight: '700' },
});

export default GunTawKonCharCard;
