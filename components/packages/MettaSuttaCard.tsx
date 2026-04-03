import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


const MettaSuttaCard = () => {
  const { colors, fontSize, themeMode } = useTheme();

  const scale = fontSize / 16;
  const dynamicSize = (base: number) => base * scale;

  return (
    <View style={styles.container}>
      {/* Title */}
      <View style={styles.titleWrapper}>
        <View style={[styles.titleLine, { backgroundColor: colors.primary }]} />
        <Text style={[styles.subtitle, { color: colors.primary, fontSize: dynamicSize(17) }]}>
          မေတ္တသုတ်ပါဠိတော်
        </Text>
      </View>

      {/* Script Card */}
      <View style={[
        styles.card, 
        { 
          backgroundColor: themeMode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#FFFFFF',
          borderColor: themeMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : '#E2E8F0'
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
          <Text style={styles.verseNum}>(၁)</Text> ယဿာနုဘာဝတော ယက္ခာ၊ နေဝ ဒဿေန္တိ ဘီသနံ။{"\n"}
          ယဉှိ စေဝါနုယုဉ္ဇန္တော၊ ရတ္တိန္ဒိဝ' မတန္ဒိတော။{"\n\n"}

          <Text style={styles.verseNum}>(၂)</Text> သုခံ သုပတိ သုတ္တော စ၊ ပါပံ ကိဉ္စိ န ပဿတိ။{"\n"}
          ဧဝမာဒီ ဂုဏူပေတံ၊ ပရိတ္တံ တံ ဘဏာမ ဟေ။{"\n\n"}

          <Text style={styles.verseNum}>(၃)</Text> ကရဏီယ' မတ္ထကုသလေန၊ ယန္တ သန္တံ ပဒံ အဘိသမေစ္စ။{"\n"}
          သက္ကော ဥဇူ စ သုဟုဇူ စ၊ သုဝစော စဿ မုဒု အနတိမာနီ။{"\n\n"}

          <Text style={styles.verseNum}>(၄)</Text> သန္တုဿကော စ သုဘရော စ၊ အပ္ပကိစ္စော စ သလ္လဟုကဝုတ္တိ။{"\n"}
          သန္တိန္ဒြိယော စ နိပကော စ၊ အပ္ပဂဗ္ဘော ကုလေသွ' နနုဂိဒ္ဓေါ။{"\n\n"}

          <Text style={styles.verseNum}>(၅)</Text> န စ ခုဒ္ဒ' မာစရေ ကိဉ္စိ၊ ယေန ဝိညူ ပရေ ဥပဝဒေယျုံ။{"\n"}
          သုခိနော ဝါ ခေမိနော ဟောန္တု၊ သဗ္ဗသတ္တာ ဘဝန္တု သုခိတတ္တာ။{"\n\n"}

          <Text style={styles.verseNum}>(၆)</Text> ယေ ကေစိ ပါဏဘူတတ္ထိ၊ တသာ ဝါ ထာဝရာ ဝ' နဝသေသာ။{"\n"}
          ဒီဃာ ဝါ ယေ ဝ မဟန္တာ၊ မဇ္ဈိမာ ရဿကာ အဏုကထူလာ။{"\n\n"}

          <Text style={styles.verseNum}>(၇)</Text> ဒိဋ္ဌာ ဝါ ယေ ဝ အဒိဋ္ဌာ၊ ယေ ဝ ဒူရေ ဝသန္တိ အဝိဒူရေ။{"\n"}
          ဘူတာ ဝါ သမ္ဘဝေသီ ဝါ၊ သဗ္ဗသတ္တာ ဘဝန္တု သုခိတတ္တာ။{"\n\n"}

          <Text style={styles.verseNum}>(၈)</Text> န ပရော ပရံ နိကုဗ္ဗေထ၊ နာတိမညေထ ကတ္ထစိ န ကိဉ္စိ။{"\n"}
          ဗျာရောသနာ ပဋိဃသည၊ နာညမညဿ ဒုက္ခမိစ္ဆေယျ။{"\n\n"}

          <Text style={styles.verseNum}>(၉)</Text> မာတာ ယထာ နိယံပုတ္တ- မာယုသာ ဧကပုတ္တ' မနုရက္ခေ။{"\n"}
          ဧဝမ္ပိ သဗ္ဗဘူတေသု၊ မာနသံ ဘာဝယေ အပရိမာဏံ။{"\n\n"}

          <Text style={styles.verseNum}>(၁၀)</Text> မေတ္တဉ္စ သဗ္ဗလောကသ္မိံ၊ မာနသံ ဘာဝယေ အပရိမာဏံ။{"\n"}
          ဥဒ္ဓံ အဓော စ တိရိယဉ္စ၊ အသမ္ဗာဓံ အဝေရ' မသပတ္တံ။{"\n\n"}

          <Text style={styles.verseNum}>(၁၁)</Text> တိဋ္ဌံ စရံ နိသိန္နော ဝါ၊ သယာနော ယာဝတဿ ဝိတမိဒ္ဓေါ။{"\n"}
          ဧတံ သတိံ အဓိဋ္ဌေယျ၊ ဗြဟ္မ'မေတံ ဝိဟာရ' မိဓ' မာဟု။{"\n\n"}

          <Text style={styles.verseNum}>(၁၂)</Text> ဒိဋ္ဌိဉ္စ အနုပဂ္ဂမ္မ၊ သီလဝါ ဒဿနေန သမ္ပန္နော။{"\n"}
          ကာမေသု ဝိနယ ဂေဓံ၊ န ဟိ ဇာတုဂ္ဂဗ္ဘသေယျံ ပုန ရေတီ။
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
    textAlign: 'center', // ရွတ်ဖတ်ရန် အဆင်ပြေစေရန် အလယ်တွင်ထားပါသည်
    fontWeight: '500',
  },
  verseNum: {
    fontWeight: 'bold',
    color: '#6366F1', // Indigo color for highlighting verse numbers
  }
});

export default MettaSuttaCard;

