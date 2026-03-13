import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

const MangalaSuttaCard = () => {
  const { colors, isDarkMode, fontSize } = useTheme();

  const scale = fontSize / 16;
  const dynamicSize = (base: number) => base * scale;

  return (
    <View style={styles.container}>
      {/* Title Header */}
      <View style={styles.titleWrapper}>
        <View style={[styles.titleLine, { backgroundColor: colors.primary }]} />
        <Text style={[styles.subtitle, { color: colors.primary, fontSize: dynamicSize(17) }]}>
          မင်္ဂလသုတ်ပါဠိတော် (သံပြိုင်ရွတ်ဆိုရန်)
        </Text>
      </View>

      {/* Main Content Card */}
      <View style={[
        styles.card, 
        { 
          backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : '#FFFFFF',
          borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#E2E8F0'
        }
      ]}>
        <Text style={[
          styles.scriptText, 
          { 
            color: colors.textPrimary, 
            fontSize: dynamicSize(20), 
            lineHeight: dynamicSize(38) 
          }
        ]}>
          <Text style={styles.verseNum}>(၁)</Text> ယံ မင်္ဂလံ ဒွါဒသဟိ၊ စိန္တယိံသု သဒေဝကာ။{"\n"}
          သောတ္ထာနံ နာဓိဂစ္ဆန္တိ၊ အဋ္ဌတ္တိံသဉ္စ မင်္ဂလံ။{"\n\n"}

          <Text style={styles.verseNum}>(၂)</Text> ဒေသိတံ ဒေဝဒေဝေန၊ သဗ္ဗပါပဝိနာသနံ။{"\n"}
          သဗ္ဗလောကဟိတတ္ထာယ၊ မင်္ဂလံ တံ ဘဏာမ ဟေ။{"\n\n"}

          <Text style={styles.verseNum}>(၃)</Text> <Text style={{fontWeight: '700'}}>ဧဝံ မေ သုတံ—</Text>{"\n"}
          ဧကံ သမယံ ဘဂဝါ သာဝတ္ထိယံ ဝိဟရတိ ဇေတဝနေ အနာထပိဏ္ဍိကဿ အာရာမေ။{"\n"}
          အထ ခေါ အညတရာ ဒေဝတာ အဘိက္ကန္တာယ ရတ္တိယာ အဘိက္ကန္တဝဏ္ဏာ ကေဝလကပ္ပံ ဇေတဝနံ သြဘာသေတွာ ယေန ဘဂဝါ တေနုပသင်္ကမိ။{"\n"}
          ဥပသင်္ကမိတွာ ဘဂဝန္တံ အဘိဝါဒေတွာ ဧကမန္တံ အဋ္ဌာသိ။{"\n"}
          ဧကမန္တံ ဌိတာ ခေါ သာ ဒေဝတာ ဘဂဝန္တံ ဂါထာယ အဇ္ဈဘာသိ။{"\n\n"}

          <Text style={styles.verseNum}>(၄)</Text> ဗဟူ ဒေဝါ မနုဿာ စ၊ မင်္ဂလာနိ အစိန္တယုံ။{"\n"}
          အာကင်္ခမာနာ သောတ္ထာနံ၊ ဗြူဟိ မင်္ဂလမုတ္တမံ။{"\n\n"}

          <Text style={styles.verseNum}>(၅)</Text> အသေဝနာ စ ဗာလာနံ၊ ပဏ္ဍိတာနဉ္စ သေဝနာ။{"\n"}
          ပူဇာ စ ပူဇနေယျာနံ၊ ဧတံ မင်္ဂလမုတ္တမံ။{"\n\n"}

          <Text style={styles.verseNum}>(၆)</Text> ပတိရူပဒေသဝါသော စ၊ ပုဗ္ဗေ စ ကတပုညတာ။{"\n"}
          အတ္တသမ္မာပဏိဓိ စ၊ ဧတံ မင်္ဂလမုတ္တမံ။{"\n\n"}

          <Text style={styles.verseNum}>(၇)</Text> ဗာဟုသစ္စဉ္စ သိပ္ပဉ္စ၊ ဝိနယော စ သုသိက္ခိတော။{"\n"}
          သုဘာသိတာ စ ယာ ဝါစာ၊ ဧတံ မင်္ဂလမုတ္တမံ။{"\n\n"}

          <Text style={styles.verseNum}>(၈)</Text> မာတာပိတု ဥပဋ္ဌာနံ၊ ပုတ္တဒါရဿ သင်္ဂဟော။{"\n"}
          အနာကုလာ စ ကမ္မန္တာ၊ ဧတံ မင်္ဂလမုတ္တမံ။{"\n\n"}

          <Text style={styles.verseNum}>(၉)</Text> ဒါနဉ္စ ဓမ္မစရိယာ စ၊ ဉာတကာနဉ္စ သင်္ဂဟော။{"\n"}
          အနဝဇ္ဇာနိ ကမ္မာနိ၊ ဧတံ မင်္ဂလမုတ္တမံ။{"\n\n"}

          <Text style={styles.verseNum}>(၁၀)</Text> အာရတီ ဝိရတီ ပါပါ။ မဇ္ဇပါနာ စ သံယမော။{"\n"}
          အပ္ပမာဒေါ စ ဓမ္မေသု၊ ဧတံ မင်္ဂလမုတ္တမံ။{"\n\n"}

          <Text style={styles.verseNum}>(၁၁)</Text> ဂါရဝေါ စ နိဝါတော စ၊ သန္တုဋ္ဌီ စ ကတညုတာ။{"\n"}
          ကာလေန ဓမ္မဿဝနံ၊ ဧတံ မင်္ဂလမုတ္တမံ။{"\n\n"}

          <Text style={styles.verseNum}>(၁၂)</Text> ခန္တီ စ သောဝစဿတာ၊ သမဏာနဉ္စ ဒဿနံ။{"\n"}
          ကာလေန ဓမ္မသာကစ္ဆာ၊ ဧတံ မင်္ဂလမုတ္တမံ။{"\n\n"}

          <Text style={styles.verseNum}>(၁၃)</Text> တပေါ စ ဗြဟ္မစရိယဉ္စ၊ အရိယသစ္စာန ဒဿနံ။{"\n"}
          နိဗ္ဗာနသစ္ဆိကိရိယာ စ၊ ဧတံ မင်္ဂလမုတ္တမံ။{"\n\n"}

          <Text style={styles.verseNum}>(၁၄)</Text> ဖုဋ္ဌဿ လောကဓမ္မေဟိ၊ စိတ္တံ ယဿ န ကမ္ပတိ။{"\n"}
          အသောကံ ဝိရဇံ ခေမံ၊ ဧတံ မင်္ဂလမုတ္တမံ။{"\n\n"}

          <Text style={styles.verseNum}>(၁၅)</Text> ဧတာဒိသာနိ ကတွာန၊ သဗ္ဗတ္ထမပရာဇိတာ။{"\n"}
          သဗ္ဗတ္ထ သောတ္ထိံ ဂစ္ဆန္တိ၊ တံ တေသံ မင်္ဂလမုတ္တမံ။{"\n\n"}

          <Text style={{fontWeight: '700', color: colors.primary}}>(မင်္ဂလသုတ် နိဋ္ဌိတံ)</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 25,
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
  scriptText: {
    textAlign: 'center',
    fontWeight: '500',
  },
  verseNum: {
    fontWeight: 'bold',
    color: '#6366F1',
  }
});

export default MangalaSuttaCard;