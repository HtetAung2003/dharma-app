import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const AtanatiyaSuttaCard = () => {
  const { colors, isDarkMode, fontSize } = useTheme();

  const scale = fontSize / 16;
  const dynamicSize = (base: number) => base * scale;

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={[styles.titleLine, { backgroundColor: colors.primary }]} />
        <Text style={[styles.mainTitle, { color: colors.primary, fontSize: dynamicSize(18) }]}>
          အာဋာနာဋိယသုတ် (ပါဠိတော်)
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
          ဝိပဿိဿ စ နမတ္ထု၊ စက္ခုမန္တဿ သိရီမတော။{"\n"}
          သိခိဿပိ စ နမတ္ထု၊ သဗ္ဗဘူတာနုကမ္ပိနော။{"\n"}
          ဝေဿဘုဿ စ နမတ္ထု၊ နဟာတကဿ တပဿိနော။{"\n"}
          နမတ္ထု ကကုသန္ဓဿ၊ မာရသေနာပမဒ္ဒိနော။{"\n"}
          ကောဏာဂမနဿ နမတ္ထု၊ ဗြာဟ္မဏဿ ဝုသီမတော။{"\n"}
          ကဿပဿ စ နမတ္ထု၊ ဝိပ္ပမုတ္တဿ သဗ္ဗဓိ။{"\n"}
          အင်္ဂီရသဿ နမတ္ထု၊ သကျပုတ္တဿ သိရီမတော။{"\n\n"}

          ယော ဣမံ ဓမ္မမဒေသေသိ၊ သဗ္ဗဒုက္ခာပနူဒနံ။{"\n"}
          ယေ စာပိ နိဗ္ဗုတာ လောကေ၊ ယထာဘူတံ ဝိပဿိသုံ။{"\n"}
          တေ ဇနာ အပိသုဏာ မဟန္တာ၊ ဝီတသာရဒါ။{"\n"}
          ဟိတံ ဒေဝမနုဿာနံ၊ ယံ နမဿန္တိ ဂေါတမံ။{"\n"}
          ဝိဇ္ဇာစရဏသမ္ပန္နံ၊ မဟန္တံ ဝီတသာရဒံ။{"\n\n"}

          ဧတေ စညေ စ သမ္ဗုဒ္ဓါ၊ အနေကသတကောဋယော။{"\n"}
          သဗ္ဗေ ဗုဒ္ဓါ အသမသမာ၊ သဗ္ဗေ ဗုဒ္ဓါ မဟိဒ္ဓကာ။{"\n"}
          သဗ္ဗေ ဒသဗလုပေတာ၊ ဝေသာရဇ္ဇေဟုပါဂတာ။{"\n"}
          သဗ္ဗေ တေ ပဋိဇာနန္တိ၊ အာသဘံ ဌာန မုတ္တမံ။{"\n\n"}

          သီဟနာဒံ နဒန္တေ တေ၊ ပရိသာသု ဝိသာရဒါ။{"\n"}
          ဗြဟ္မစက္ကံ ပဝတ္တန္တိ၊ လောကေ အပ္ပဋိဝတ္တိယံ။{"\n"}
          ဥပေတာ ဗုဒ္ဓဓမ္မေဟိ၊ အဋ္ဌာရသဟိ နာယကာ။{"\n"}
          ဗျာမာပ္ပဘာယ သပ္ပန္နာ၊ သဗ္ဗေ တေ မုနိကုဉ္ဇရာ။{"\n\n"}

          ဗုဒ္ဓါ သဗ္ဗညုနော ဧတေ၊ သဗ္ဗေ ခီဏာသဝါ ဇိနာ။{"\n"}
          မေတ္တံ သုရာဂတာ ဧတေ၊ အဗ္ဗယာ ဘူမိနော ဇိနာ။{"\n"}
          ဧတေ သစ္စာ ဝစော တေသံ၊ နတ္ထိ တေသံ ပရာဘဝေါ။{"\n"}
          ဧတေ သစ္စာ ဝစော တေသံ၊ နတ္ထိ တေသံ ပရာဘဝေါ။
        </Text>

        {/* Footer Note */}
        <View style={[
          styles.footerNote, 
          { backgroundColor: isDarkMode ? 'rgba(99, 102, 241, 0.1)' : '#F0FDF4' }
        ]}>
          <Text style={[styles.footerText, { color: colors.primary, fontSize: dynamicSize(13) }]}>
            မကောင်းသော ဘေးအန္တရာယ်များမှ ကာကွယ်ရန်နှင့် နတ်ကောင်းနတ်မြတ်တို့၏ စောင့်ရှောက်မှုကို ရရှိစေရန် ဤအာဋာနာဋိယသုတ်ကို ရွတ်ဆိုပူဇော်ကြသည်။
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
  footerNote: {
    marginTop: 20,
    padding: 15,
    borderRadius: 15,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  footerText: { textAlign: 'center', lineHeight: 22, fontWeight: '600', fontStyle: 'italic' },
});

export default AtanatiyaSuttaCard;