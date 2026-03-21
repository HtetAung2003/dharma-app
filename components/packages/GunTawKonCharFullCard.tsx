import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

const GunTawKonCharFullCard = () => {
  const { colors, isDarkMode, fontSize } = useTheme();

  const scale = fontSize / 16;
  const dynamicSize = (base: number) => base * scale;

  const gathaLines = [
    "၁။ ဣ တိပိသော ဘဂဝါ အရဟံ", "၂။ တိ လောကဂ္ဂု နမောတဿ", "၃။ ပိ သုဏေဟိ ဝိမုတ္တော သော",
    "၄။ သော ဘမာနော သုပ္ပဘော", "၅။ ဘ ဂဝါ အရဟံ သမ္မာ", "၆။ ဂ စ္ဆန္တော သုဂတိံ ဝရံ",
    "၇။ ဝါ စံ သိဒ္ဓိံ ပယစ္ဆန္တု", "၈။ အ ရဟံ ပရမံ သုခံ", "၉။ ရ တနံ ပရမံ သေဋ္ဌံ",
    "၁၀။ ဟံ သနာသံ ဝိနာသေန္တု", "၁၁။ သံ ဝိဘတ္တော သမ္မာသမ္ဗုဒ္ဓေါ", "၁၂။ မ္မာ ပထံ ပယစ္ဆန္တု",
    "၁၃။ သံ ဝိဘတ္တော သမ္မာသမ္ဗုဒ္ဓေါ", "၁၄။ ဗု ဒ္ဓေါ လောကဂ္ဂု နမောတဿ", "၁၅။ ဒ္ဓေါ ဇာနန္တော သုဂတိံ ဝရံ",
    "၁၆။ ဝိ ဇ္ဇာစရဏ သမ္ပန္နော", "၁၇။ ဇ္ဇာ ပထံ ပယစ္ဆန္တု", "၁၈။ စ ရဏံ ပရမံ သေဋ္ဌံ",
    "၁၉။ ရ တနံ ပရမံ သေဋ္ဌံ", "၂၀။ ဏ မာမိ သုဂတိံ ဝရံ", "၂၁။ သံ ဝိဘတ္တော သမ္မာသမ္ဗုဒ္ဓေါ",
    "၂၂။ ပ ရမံ သုခံ ပယစ္ဆန္တု", "၂၃။ န္နော ဇာနန္တော သုဂတိံ ဝရံ", "၂၄။ သု ဂတော လောကဂ္ဂု နမောတဿ",
    "၂၅။ ဂ စ္ဆန္တော သုဂတိံ ဝရံ", "၂၆။ တော ဇာနန္တော သုဂတိံ ဝရံ", "၂၇။ လော ကဝိဒူ နမောတဿ",
    "၂၈။ က ရုဏာယ ဝိမုတ္တော သော", "၂၉။ ဝိ ဇ္ဇာစရဏ သမ္ပန္နော", "၃၀။ ဒူ ရေဟိ ဝိမုတ္တော သော",
    "၃၁။ အ ရဟံ ပရမံ သုခံ", "၃၂။ နု တ္တရော ပုရိသဒမ္မ သာရထိ", "၃၃။ တ္တ မံ သုခံ ပယစ္ဆန္တု",
    "၃၄။ ရော ဇာနန္တော သုဂတိံ ဝရံ", "၃၅။ ပု ရိသဒမ္မ သာရထိ", "၃၆။ ရိ တံ သိဒ္ဓိံ ပယစ္ဆန္တု",
    "၃၇။ သ တ္ထာ ဒေဝမနုဿာနံ", "၃၈။ ဒ မနံ သုဂတိံ ဝရံ", "၃၉။ မ္မ ပထံ ပယစ္ဆန္တု",
    "၄၀။ သာ ဓု သာဓု သုခိတေ ဟောန္တု", "၄၁။ ရ တနံ ပရမံ သေဋ္ဌံ", "၄၂။ ထိ တံ သိဒ္ဓိံ ပယစ္ဆန္တု",
    "၄၃။ သ တ္ထာ ဒေဝမနုဿာနံ", "၄၄။ တ္တာ ဇာနန္တော သုဂတိံ ဝရံ", "၄၅။ ဒေ ဝါ သိဒ္ဓိံ ပယစ္ဆန္တု",
    "၄၆။ ဝ ရံ သုခံ ပယစ္ဆန္တု", "၄၇။ မ တံ သိဒ္ဓိံ ပယစ္ဆန္တု", "၄၈။ နု တ္တရော ပုရိသဒမ္မ သာရထိ",
    "၄၉။ ဿာ ပထံ ပယစ္ဆန္တု", "၅၀။ နံ ဝိမုတ္တံ သုဂတိံ ဝရံ", "၅၁။ ဗု ဒ္ဓေါ လောကဂ္ဂု နမောတဿ",
    "၅၂။ ဒ္ဓေါ ဇာနန္တော သုဂတိံ ဝရံ", "၅၃။ ဘ ဂဝါ အရဟံ သမ္မာ", "၅၄။ ဂ စ္ဆန္တော သုဂတိံ ဝရံ",
    "၅၅။ ဝါ စံ သိဒ္ဓိံ ပယစ္ဆန္တု", "၅၆။ တိ လောကဂ္ဂု နမောတဿ။"
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={[styles.titleLine, { backgroundColor: colors.primary }]} />
        <Text style={[styles.mainTitle, { color: colors.primary, fontSize: dynamicSize(18) }]}>
          ဂုဏ်တော်ကွန်ချာ (အပြည့်အစုံ)
        </Text>
      </View>

      <View style={[
        styles.card, 
        { 
          backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.03)' : '#FFFFFF',
          borderColor: colors.border
        }
      ]}>
        {/* Info Header */}
        <Text style={[styles.infoText, { color: colors.textSecondary, fontSize: dynamicSize(14) }]}>
          ဂုဏ်တော်ကွန်ချာသည် ဘုရားဂုဏ်တော် (၉) ပါးကို အက္ခရာအစီအစဉ်ဖြင့် ယှက်နွယ်ထားခြင်း ဖြစ်ပါသည်။
        </Text>

        <View style={styles.divider} />

        {/* Gatha List */}
        <View style={styles.gathaContainer}>
          {gathaLines.map((line, index) => {
            const firstWord = line.split(" ")[1];
            const restOfLine = line.split(" ").slice(2).join(" ");
            const number = line.split(" ")[0];

            return (
              <View key={index} style={styles.lineWrapper}>
                <Text style={[styles.gathaText, { color: colors.textPrimary, fontSize: dynamicSize(16) }]}>
                  <Text style={{ color: colors.secondary, fontWeight: '500' }}>{number}</Text>{" "}
                  <Text style={{ color: colors.primary, fontWeight: '800' }}>{firstWord}</Text>{" "}
                  {restOfLine}
                </Text>
              </View>
            );
          })}
        </View>

        {/* Closing Note */}
        <View style={[styles.footer, { backgroundColor: isDarkMode ? 'rgba(99, 102, 241, 0.1)' : '#EEF2FF' }]}>
          <Text style={[styles.footerText, { color: colors.primary, fontSize: dynamicSize(13) }]}>
            နေ့စဉ် ရွတ်ဆိုပူဇော်ခြင်းဖြင့် ဘေးအန္တရာယ်ကင်း၍ ဘုန်းကံကြီးမားစေပါသည်။
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
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoText: { fontStyle: 'italic', marginBottom: 15, lineHeight: 22, textAlign: 'center' },
  divider: { height: 1, backgroundColor: '#E5E7EB', opacity: 0.3, marginBottom: 15 },
  gathaContainer: { paddingHorizontal: 5 },
  lineWrapper: { paddingVertical: 6, borderBottomWidth: 0.5, borderBottomColor: 'rgba(0,0,0,0.05)' },
  gathaText: { lineHeight: 28 },
  footer: { marginTop: 20, padding: 15, borderRadius: 12, alignItems: 'center' },
  footerText: { fontWeight: '600', textAlign: 'center' },
});

export default GunTawKonCharFullCard;