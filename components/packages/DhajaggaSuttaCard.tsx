import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

const DhajaggaSuttaCard = () => {
  const { colors, isDarkMode, fontSize } = useTheme();

  const scale = fontSize / 16;
  const dynamicSize = (base: number) => base * scale;

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={[styles.titleLine, { backgroundColor: colors.primary }]} />
        <Text style={[styles.mainTitle, { color: colors.primary, fontSize: dynamicSize(18) }]}>
          ဓဇဂ္ဂသုတ် (ပါဠိတော်)
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
        <Text style={[styles.suttaText, { color: colors.textPrimary, fontSize: dynamicSize(16.5) }]}>
          {/* Buddha Anussati */}
          ယေဟိ ကေစိ ဘိက္ခဝေ ဘိက္ခု၊ အရညဂတာ ဝါ ရုက္ခမူလဂတာ ဝါ၊ သုညာဂါရဂတာ ဝါ၊ သျာဒေဝ ဘယံ၊ သျာဒေဝ ဆမ္ဘိတတ္တံ၊ သျာဒေဝ လောမဟံသော၊ တေဟိ သမယေဟိ မမေဝ အနုဿရိတဗ္ဗာ၊{"\n\n"}
          <Text style={{ fontWeight: '800', color: colors.primary }}>
            ဣတိပိ သော ဘဂဝါ အရဟံ သမ္မာသမ္ဗုဒ္ဓေါ၊ ဝိဇ္ဇာစရဏသမ္ပန္နော သုဂတော လောကဝိဒူ၊ အနုတ္တရော ပုရိသဒမ္မသာရထိ၊ သတ္ထာ ဒေဝမနုဿာနံ ဗုဒ္ဓေါ ဘဂဝါတိ။
          </Text>
          {"\n\n"}
          မမံ ဟိ ဝေါ ဘိက္ခဝေ အနုဿရတံ၊ ယံ ဘယံ သျာဒေဝ ဆမ္ဘိတတ္တံ သျာဒေဝ လောမဟံသော၊ သော ပါဟိဂမိဿတိ။{"\n\n"}

          <View style={styles.divider} />

          {/* Dhamma Anussati */}
          နော စေ မံ အနုဿရေယျာထ၊ အထ ဓမ္ံ အနုဿရိတဗ္ဗော၊{"\n\n"}
          <Text style={{ fontWeight: '800', color: colors.primary }}>
            သွာက္ခာတော ဘဂဝတာ ဓမ္မော၊ သန္ဒိဋ္ဌိကော အကာလိကော၊ ဧဟိပဿိကော သြပနေယျိကော၊ ပစ္စတ္တံ ဝေဒိတဗ္ဗော ဝိညူဟီတိ။
          </Text>
          {"\n\n"}
          ဓမ္မံ ဟိ ဝေါ ဘိက္ခဝေ အနုဿရတံ၊ ယံ ဘယံ သျာဒေဝ ဆမ္ဘိတတ္တံ သျာဒေဝ လောမဟံသော၊ သော ပါဟိဂမိဿတိ။{"\n\n"}

          <View style={styles.divider} />

          {/* Sangha Anussati */}
          နော စေ ဓမ္မံ အနုဿရေယျာထ၊ အထ သံဃံ အနုဿရိတဗ္ဗော၊{"\n\n"}
          <Text style={{ fontWeight: '800', color: colors.primary }}>
            သုပ္ပဋိပန္နော ဘဂဝတော သာဝကသံဃော၊ ဥဇုပ္ပဋိပန္နော ဘဂဝတော သာဝကသံဃော၊ ဉာယပ္ပဋိပန္နော ဘဂဝတော သာဝကသံဃော၊ သာမီစိပ္ပဋိပန္နော ဘဂဝတော သာဝကသံဃော၊ ယဒိဒံ စတ္တာရိ ပုရိသယုဂါနိ အဋ္ဌ ပုရိသပုဂ္ဂလာ၊ ဧသ ဘဂဝတော သာဝကသံဃော၊ အာဟုနေယျော ပါဟုနေယျော ဒက္ခိဏေယျော အဉ္ဇလိကရဏီယော၊ အနုတ္တရံ ပုညက္ခေတ္တံ လောကဿာတိ။
          </Text>
          {"\n\n"}
          သံဃံ ဟိ ဝေါ ဘိက္ခဝေ အနုဿရတံ၊ ယံ ဘယံ သျာဒေဝ ဆမ္ဘိတတ္တံ သျာဒေဝ လောမဟံသော၊ သော ပါဟိဂမိဿတိ။{"\n\n"}

          {/* Conclusion */}
          တံ ကိဿ ဟေတု၊ အပ္ပိတော ဟိ ဘိက္ခဝေ ဘဂဝါ အရဟံ သမ္မာသမ္ဗုဒ္ဓေါ၊ ဝီတရာဂေါ ဝီတဒေါသော ဝီတမောဟော၊ အဘီရု အဆမ္ဘီ အနုတြာသီ အပလာယီတိ။
        </Text>

        {/* Footer Note */}
        <View style={[
          styles.footerNote, 
          { backgroundColor: isDarkMode ? 'rgba(99, 102, 241, 0.1)' : '#F0F9FF' }
        ]}>
          <Text style={[styles.footerText, { color: colors.primary, fontSize: dynamicSize(13) }]}>
            ထိတ်လန့်ခြင်း၊ ကြောက်ရွံ့ခြင်းနှင့် မွေးညင်းမတ်ရပ်ထခြင်းတို့မှ ကင်းဝေးစေရန် ဤဓဇဂ္ဂသုတ်ကို ရွတ်ဆိုပူဇော်ကြသည်။
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
  suttaText: { lineHeight: 32, textAlign: 'justify', fontWeight: '500' },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#E5E7EB',
    marginVertical: 15,
    opacity: 0.2,
  },
  footerNote: {
    marginTop: 20,
    padding: 15,
    borderRadius: 15,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: 'rgba(14, 165, 233, 0.3)',
  },
  footerText: { textAlign: 'center', lineHeight: 22, fontWeight: '600', fontStyle: 'italic' },
});

export default DhajaggaSuttaCard;