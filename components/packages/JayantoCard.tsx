import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const JayantoCard = () => {
  const { colors, fontSize, isDarkMode } = useTheme();

  const scale = fontSize / 16;
  const dynamicSize = (base: number) => base * scale;

  return (
    <View style={styles.container}>
      {/* နိဒါန်း */}
      <Text style={[styles.mainTitle, { color: colors.primary, fontSize: dynamicSize(20) }]}>
        ဇယန္တော ဂါထာတော် (ပါဠိတော်)
      </Text>

      {/* ဂါထာတော်ပိုင်း - Victory Gold Theme */}
      <View style={[
        styles.verseCard, 
        { 
          backgroundColor: isDarkMode ? 'rgba(212, 175, 55, 0.05)' : '#FFFDFA',
          borderColor: isDarkMode ? 'rgba(212, 175, 55, 0.3)' : '#D4AF37'
        }
      ]}>
        <Text style={[styles.paliText, { color: colors.textPrimary, fontSize: dynamicSize(17) }]}>
          ဇယန္တော ဗောဓိယာ မူလေ၊ သကျာနံ နန္ဒိဝဍ္ဍနော။{"\n"}
          ဧဝံ တွံ ဝိဇယော ဟောဟိ၊ ဇယဿု ဇယမင်္ဂလေ။
        </Text>

        <View style={styles.divider} />

        <Text style={[styles.paliText, { color: colors.textPrimary, fontSize: dynamicSize(17) }]}>
          အပရာဇိတပလ္လင်္ကေ၊ သီသေ ပုထုဝိပုဂ္ဂလေ။{"\n"}
          အဘိသေကေ သဗ္ဗဗုဒ္ဓါနံ၊ အဂ္ဂပ္ပတ္တော ပမောဒတိ။
        </Text>

        <View style={styles.divider} />

        <Text style={[styles.paliText, { color: colors.textPrimary, fontSize: dynamicSize(17) }]}>
          သုနက္ခတ္တံ သုမင်္ဂလံ၊ သုပ္ပဘာတံ သုဟုဋ္ဌိတံ။{"\n"}
          သုမုဟုတ္တော သုဟုတ္တော စ၊ သုယိဋ္ဌံ ဗြဟ္မစာရိသု။
        </Text>

        <View style={styles.divider} />

        <Text style={[styles.paliText, { color: colors.textPrimary, fontSize: dynamicSize(17) }]}>
          ပဒက္ခိဏံ ကာယကမ္မံ၊ ဝါစာကမ္မံ ပဒက္ခိဏံ။{"\n"}
          ပဒက္ခိဏံ မနောကမ္မံ၊ ပဏီဓိ တေ ပဒက္ခိဏေ။
        </Text>

        <View style={styles.divider} />

        <Text style={[styles.paliText, { color: colors.textPrimary, fontSize: dynamicSize(17) }]}>
          ပဒက္ခိဏာနိ ကတွာန၊ လဘန္တတ္ထေ ပဒက္ခိဏေ။
        </Text>
      </View>

      {/* မြန်မာပြန် အနှစ်ချုပ် */}
      <View style={[styles.translationBox, { backgroundColor: isDarkMode ? '#161B22' : '#F8FAFC' }]}>
        <Text style={[styles.transTitle, { color: colors.primary, fontSize: dynamicSize(15) }]}>
          ✨ မြန်မာပြန် အနှစ်ချုပ်
        </Text>
        <Text style={[styles.transText, { color: colors.textSecondary, fontSize: dynamicSize(14) }]}>
          မြတ်စွာဘုရားရှင်သည် ဗောဓိပင်ရင်း၌ ရန်သူမရ်နတ်မင်းကို အောင်မြင်၍ သာကီဝင်မင်းတို့၏ ဝမ်းမြောက်ခြင်းကို တိုးပွားစေသကဲ့သို့၊ သင်သည်လည်း အောင်မြင်မှုအပေါင်းနှင့် ပြည့်စုံပါစေ။{"\n\n"}
          ဘုရားအဆူဆူတို့ အောင်ပွဲခံရာ အပရာဇိတ ပလ္လင်တော်ထက်၌ အမြတ်ဆုံးသို့ရောက်၍ ဝမ်းမြောက်တော်မူသကဲ့သို့၊ သင်သည်လည်း အောင်ပွဲရ၍ ဝမ်းမြောက်ပါစေ။{"\n\n"}
          သင်ပြုသမျှသော ကာယကံ၊ ဝါစီကံ၊ မနောကံတို့သည် ကောင်းမြတ်သော အမှုများ ဖြစ်ကြပါစေ။{"\n\n"}
          ထိုသို့ ကောင်းမြတ်သော အမှုတို့ကို ပြုလုပ်ခြင်းကြောင့် ကောင်းမြတ်သော အကျိုးတရားများကို ရရှိပိုင်ဆိုင်နိုင်ပါစေ။
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingBottom: 30 },
  mainTitle: { textAlign: 'center', fontWeight: 'bold', marginBottom: 20 },
  verseCard: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1.5,
    elevation: 2,
    shadowColor: '#D4AF37',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  paliText: {
    textAlign: 'center',
    lineHeight: 32,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    marginVertical: 15,
    width: '50%',
    alignSelf: 'center',
  },
  translationBox: {
    marginTop: 25,
    padding: 20,
    borderRadius: 15,
    borderLeftWidth: 5,
    borderLeftColor: '#D4AF37',
  },
  transTitle: { fontWeight: 'bold', marginBottom: 10 },
  transText: { lineHeight: 24, textAlign: 'justify' },
});

export default JayantoCard;