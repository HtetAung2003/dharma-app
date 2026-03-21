import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const PubbanhaSuttaCard = () => {
  const { colors, isDarkMode, fontSize } = useTheme();

  const scale = fontSize / 16;
  const dynamicSize = (base: number) => base * scale;

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={[styles.titleLine, { backgroundColor: colors.primary }]} />
        <Text style={[styles.mainTitle, { color: colors.primary, fontSize: dynamicSize(18) }]}>
          ပုဗ္ဗဏှသုတ် (ပါဠိတော်)
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
        <Text style={[styles.suttaText, { color: colors.textPrimary, fontSize: dynamicSize(17) }]}>
          {/* Buddha, Dhamma, Sangha Anubhava */}
          ယံ ဒုန္နိမိတ္တံ အဝမင်္ဂလဉ္စ၊ ယော စာမနာပေါ သကုဏဿ သဒ္ဓေါ။{"\n"}
          ပါပဂ္ဂဟော ဒုဿပိနံ အကန္တံ၊ <Text style={styles.highlight}>ဗုဒ္ဓါနုဘာဝေန</Text> ဝိနာသမေန္တု။{"\n\n"}
          
          ယံ ဒုန္နိမိတ္တံ အဝမင်္ဂလဉ္စ၊ ယော စာမနာပေါ သကုဏဿ သဒ္ဓေါ။{"\n"}
          ပါပဂ္ဂဟော ဒုဿပိနံ အကန္တံ၊ <Text style={styles.highlight}>ဓမ္မာနုဘာဝေန</Text> ဝိနာသမေန္တု။{"\n\n"}
          
          ယံ ဒုန္နိမိတ္တံ အဝမင်္ဂလဉ္စ၊ ယော စာမနာပေါ သကုဏဿ သဒ္ဓေါ။{"\n"}
          ပါပဂ္ဂဟော ဒုဿပိနံ အကန္တံ၊ <Text style={styles.highlight}>သံဃာနုဘာဝေန</Text> ဝိနာသမေန္တု။{"\n\n"}

          ဒုက္ခပ္ပတ္တာ စ နိဒ္ဒုက္ခာ၊ ဘယပ္ပတ္တာ စ နိဗ္ဘယာ။{"\n"}
          သောကပ္ပတ္တာ စ နိဿောကာ၊ ဟောန္တု သဗ္ဗေပိ ပါဏိနော။{"\n\n"}

          <View style={styles.divider} />

          {/* Sharing Merit with Devas */}
          ဧတ္တာဝတာ စ အမှေဟိ၊ သမ္ဘတံ ပုညသမ္ပဒံ။{"\n"}
          သဗ္ဗေ ဒေဝါနုမောဒန္တု၊ သဗ္ဗသမ္ပတ္တိ သိဒ္ဓိယာ။{"\n\n"}

          ဒါနံ ဒဒန္တု သဒ္ဓါယ၊ သီလံ ရက္ခန္တု သဗ္ဗဒါ။{"\n"}
          ဘာဝနာဘိရတာ ဟောန္တု၊ ဂစ္ဆန္တု ဒေဝတာဂတာ။{"\n\n"}

          {/* Protection Conclusion */}
          သဗ္ဗေ ဗုဒ္ဓါ ဗလပ္ပတ္တာ၊ ပစ္စေကာနဉ္စ ယံ ဗလံ။{"\n"}
          အရဟန္တာနဉ္စ တေဇေန၊ ရက္ခံ ဗန္ဓာမိ သဗ္ဗသော။
        </Text>

        {/* Footer Note */}
        <View style={[
          styles.footerNote, 
          { backgroundColor: isDarkMode ? 'rgba(99, 102, 241, 0.1)' : '#F0F9FF' }
        ]}>
          <Text style={[styles.footerText, { color: colors.primary, fontSize: dynamicSize(13) }]}>
            မကောင်းသော အိပ်မက်များ၊ အတိတ်နိမိတ်များနှင့် ဂြိုဟ်ဆိုးများ၏ အန္တရာယ်မှ ကင်းဝေးစေရန် ဤပုဗ္ဗဏှသုတ်ကို ရွတ်ဆိုပူဇော်ကြသည်။
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
  suttaText: {
    lineHeight: 34,
    textAlign: 'center',
    fontWeight: '500',
  },
  highlight: {
    fontWeight: '800',
    color: '#3B82F6', // Blue for protection/calm
  },
  divider: {
    height: 1,
    width: '50%',
    backgroundColor: '#E5E7EB',
    alignSelf: 'center',
    marginVertical: 15,
    opacity: 0.5,
  },
  footerNote: {
    marginTop: 20,
    padding: 15,
    borderRadius: 15,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
  },
  footerText: { textAlign: 'center', lineHeight: 22, fontWeight: '600', fontStyle: 'italic' },
});

export default PubbanhaSuttaCard;