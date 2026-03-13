import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';


const RatanaSuttaCard = () => {
  const { colors, isDarkMode, fontSize } = useTheme();

  const scale = fontSize / 16;
  const dynamicSize = (base: number) => base * scale;

  return (
    <View style={styles.container}>
      {/* Title Header */}
      <View style={styles.titleWrapper}>
        <View style={[styles.titleLine, { backgroundColor: colors.primary }]} />
        <Text style={[styles.subtitle, { color: colors.primary, fontSize: dynamicSize(17) }]}>
          ရတနသုတ်ပါဠိတော် (သံပြိုင်ရွတ်ဆိုရန်)
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
          <Text style={styles.verseNum}>(၁)</Text> ပဏိဓာနတော ပဋ္ဌာယ တထာဂတဿ ဒသ ပါရမိယော၊{"\n"}
          ဒသ ဥပပါရမိယော၊ ဒသ ပရမတ္ထ ပါရမိယောတိ၊{"\n"}
          သမတ္တိံသ ပါရမိယော၊ ပဉ္စ မဟာပရိစ္စာဂေ၊{"\n"}
          လောကတ္ထစရိယံ၊ ဉာတတ္ထစရိယံ၊ ဗုဒ္ဓတ္ထစရိယန္တိ{"\n"}
          တိဿော စရိယယော၊ ပစ္ဆိမဘဝေ ဂဗ္ဘဝေါက္ကန္တိံ၊ ဇာတိံ၊{"\n"}
          အဘိနိက္ခမနံ၊ ပဓာနစရိယံ၊ ဗောဓိပလ္လင်္ကေ မာရဝိဇယံ၊{"\n"}
          သဗ္ဗညုတညာဏပ္ပဋိဝေဓံ၊ ဓမ္မစက္ကပ္ပဝတ္တနံ၊{"\n"}
          နဝလောကုတ္တရဓမ္မေတိ၊ သဗ္ဗေပိမေ ဗုဒ္ဓဂုဏေ အာဝဇ္ဇေတွာ၊{"\n"}
          ဝေသာလိယာ တီသု ပါကာရန္တရေသု၊{"\n"}
          တိယာမရတ္တိံ ပရိတ္တံ ကရောန္တော၊{"\n"}
          အာယသ္မာ အာနန္ဒတ္ထေရော ဝိယ၊{"\n"}
          ကာရုညစိတ္တံ ဥပဋ္ဌပေတွာ—{"\n\n"}

          <Text style={styles.verseNum}>(၂)</Text> ကောဋီသတသဟဿေသု၊ စက္ကဝါဠေသု ဒေဝတာ။{"\n"}
          ယဿာဏံ ပဋိဂ္ဂဏှန္တိ၊ ယဉ္စ ဝေသာလိယာ ပုရေ။{"\n\n"}

          <Text style={styles.verseNum}>(၃)</Text> ရောဂါမနုဿဒုဗ္ဘိက္ခ-သမ္ဘူတံ တိဝိဓံ ဘယံ။{"\n"}
          ခိပ္ပမန္တရဓာပေသိ၊ ပရိတ္တံ တံ ဘဏာမ ဟေ။{"\n\n"}

          <Text style={styles.verseNum}>(၄)</Text> ယာနီဓ ဘူတာနိ သမာဂတာနိ၊{"\n"}
          ဘုမ္မာနိ ဝါ ယာနိ ဝ အန္တလိက္ခေ။{"\n"}
          သဗ္ဗေဝ ဘူတာ သုမနာ ဘဝန္တု၊{"\n"}
          အထောပိ သက္ကစ္စ သုဏန္တု ဘာသိတံ။{"\n\n"}

          <Text style={styles.verseNum}>(၅)</Text> တသ္မာ ဟိ ဘူတာ နိသာမေထ သဗ္ဗေ၊{"\n"}
          မေတ္တံ ကရောထ မာနုသိယာ ပဇာယ။{"\n"}
          ဒိဝါ စ ရတ္တော စ ဟရန္တိ ယေ ဗလိံ၊{"\n"}
          တသ္မာ ဟိ နေ ရက္ခထ အပ္ပမတ္တာ။{"\n\n"}

          <Text style={styles.verseNum}>(၆)</Text> ယံကိဉ္စိ ဝိတ္တံ ဣဓ ဝါ ဟုရံ ဝါ၊{"\n"}
          သဂ္ဂေသု ဝါ ယံ ရတနံ ပဏီတံ။{"\n"}
          န နော သမံ အတ္ထိ တထာဂတေန၊{"\n"}
          ဣဒမ္ပိ ဗုဒ္ဓေ ရတနံ ပဏီတံ။{"\n"}
          ဧတေန သစ္စေန သုဝတ္ထိ ဟောတု။{"\n\n"}

          <Text style={styles.verseNum}>(၇)</Text> ခယံ ဝိရာဂံ အမတံ ပဏီတံ၊{"\n"}
          ယဒဇ္ဈဂါ သကျမုနီ သမာဟိတော။{"\n"}
          န တေန ဓမ္မေန သမတ္ထိ ကိဉ္စိ၊{"\n"}
          ဣဒမ္ပိ ဓမ္မေ ရတနံ ပဏီတံ။{"\n"}
          ဧတေန သစ္စေန သုဝတ္ထိ ဟောတု။{"\n\n"}

          <Text style={styles.verseNum}>(၈)</Text> ယံ ဗုဒ္ဓသေဋ္ဌော ပရိဝဏ္ဏယီ သုစိံ၊{"\n"}
          သမာဓိမာနန္တရိကညမာဟု။{"\n"}
          သမာဓိနာ တေန သမော န ဝိဇ္ဇတိ၊{"\n"}
          ဣဒမ္ပိ ဓမ္မေ ရတနံ ပဏီတံ။{"\n"}
          ဧတေန သစ္စေန သုဝတ္ထိ ဟောတု။{"\n\n"}

          <Text style={styles.verseNum}>(၉)</Text> ယေ ပုဂ္ဂလာ အဋ္ဌ သတံ ပသတ္ထာ၊{"\n"}
          စတ္တာရိ ဧတာနိ ယုဂါနိ ဟောန္တိ။{"\n"}
          တေ ဒက္ခိဏေယျာ သုဂတဿ သာဝကာ၊{"\n"}
          ဧတေသု ဒိန္နာနိ မဟပ္ဖလာနိ။{"\n"}
          ဣဒမ္ပိ သံဃေ ရတနံ ပဏီတံ၊{"\n"}
          ဧတေန သစ္စေန သုဝတ္ထိ ဟောတု။{"\n\n"}

          <Text style={styles.verseNum}>(၁၀)</Text> ယေ သုပ္ပယုတ္တာ မနသာ ဒဠှေန၊{"\n"}
          နိက္ကာမိနော ဂေါတမသာသနမှိ။{"\n"}
          တေ ပတ္တိပတ္တာ အမတံ ဝိဂယှ၊{"\n"}
          လဒ္ဓာ မုဓာ နိဗ္ဗုတိံ ဘုဉ္ဇမာနာ။{"\n"}
          ဣဒမ္ပိ သံဃေ ရတနံ ပဏီတံ၊{"\n"}
          ဧတေန သစ္စေန သုဝတ္ထိ ဟောတု။{"\n\n"}

          <Text style={styles.verseNum}>(၁၁)</Text> ယထိန္ဒခီလော ပထဝိဿိတော သိယာ၊{"\n"}
          စတုဗ္ဘိ ဝါတေဟိ အသမ္ပကမ္ပိယော။{"\n"}
          တထူပမံ သပ္ပုရိသံ ဝဒါမိ၊{"\n"}
          ယော အရိယသစ္စာနိ အဝေစ္စ ပဿတိ။{"\n"}
          ဣဒမ္ပိ သံဃေ ရတနံ ပဏီတံ၊{"\n"}
          ဧတေန သစ္စေန သုဝတ္ထိ ဟောတု။{"\n\n"}

          <Text style={styles.verseNum}>(၁၂)</Text> ယေ အရိယသစ္စာနိ ဝိဘာဝယန္တိ၊{"\n"}
          ဂမ္ဘီရပညေန သုဒေသိတာနိ။{"\n"}
          ကိဉ္စာပိ တေ ဟောန္တိ ဘုသံ ပမတ္တာ၊{"\n"}
          န တေ ဘဝံ အဋ္ဌမမာဒိယန္တိ။{"\n"}
          ဣဒမ္ပိ သံဃေ ရတနံ ပဏီတံ၊{"\n"}
          ဧတေန သစ္စေန သုဝတ္ထိ ဟောတု။{"\n\n"}

          <Text style={styles.verseNum}>(၁၃)</Text> သဟာဝဿ ဒဿနသမ္ပဒါယ၊{"\n"}
          တယဿု ဓမ္မာ ဇဟိတာ ဘဝန္တိ။{"\n"}
          သက္ကာယဒိဋ္ဌိ ဝိစိကိစ္ဆိတဉ္စ၊{"\n"}
          သီလဗ္ဗတံ ဝါပိ ယဒတ္ထိ ကိဉ္စိ။{"\n\n"}

          <Text style={styles.verseNum}>(၁၄)</Text> စတူဟပါယေဟိ စ ဝိပ္ပမုတ္တော၊{"\n"}
          ဆစ္စာဘိဌာနာနိ အဘဗ္ဗ ကာတုံ။{"\n"}
          ဣဒမ္ပိ သံဃေ ရတနံ ပဏီတံ၊{"\n"}
          ဧတေန သစ္စေန သုဝတ္ထိ ဟောတု။{"\n\n"}

          <Text style={styles.verseNum}>(၁၅)</Text> ကိဉ္စာပိ သော ကမ္မံ ကရောတိ ပါပကံ၊{"\n"}
          ကာယေန ဝါစာ ဥဒ စေတသာ ဝါ။{"\n"}
          အဘဗ္ဗ သော တဿ ပဋိစ္ဆဒါယ၊{"\n"}
          အဘဗ္ဗတာ ဒိဋ္ဌပဒဿ ဝုတ္တာ။{"\n"}
          ဣဒမ္ပိ သံဃေ ရတနံ ပဏီတံ၊{"\n"}
          ဧတေန သစ္စေန သုဝတ္ထိ ဟောတု။{"\n\n"}

          <Text style={styles.verseNum}>(၁၆)</Text> ဝနပ္ပဂုမ္ဗေ ယထ ဖုဿိတဂ္ဂေ၊{"\n"}
          ဂိမှာနမာသေ ပဌမသ္မိံ ဂိမှေ။{"\n"}
          တထူပမံ ဓမ္မဝရံ အဒေသယီ၊{"\n"}
          နိဗ္ဗာနဂါမိံ ပရမံ ဟိတာယ။{"\n"}
          ဣဒမ္ပိ ဗုဒ္ဓေ ရတနံ ပဏီတံ၊{"\n"}
          ဧတေန သစ္စေန သုဝတ္ထိ ဟောတု။{"\n\n"}

          <Text style={styles.verseNum}>(၁၇)</Text> ဝရော ဝရညူ ဝရဒေါ ဝရာဟရော၊{"\n"}
          အနုတ္တရော ဓမ္မဝရံ အဒေသယီ။{"\n"}
          ဣဒမ္ပိ ဗုဒ္ဓေ ရတနံ ပဏီတံ၊{"\n"}
          ဧတေန သစ္စေန သုဝတ္ထိ ဟောတု။{"\n\n"}

          <Text style={styles.verseNum}>(၁၈)</Text> ခီဏံ ပုရာဏံ နဝ နတ္ထိ သမ္ဘဝံ၊{"\n"}
          ဝိရတ္တစိတ္တာ ယတိကေ ဘဝသ္မိံ။{"\n"}
          တေ ခီဏဗီဇာ အဝိရုဠှိဆန္ဒာ၊{"\n"}
          နိဗ္ဗန္တိ ဓီရာ ယထာယံ ပဒီပေါ။{"\n"}
          ဣဒမ္ပိ သံဃေ ရတနံ ပဏီတံ၊{"\n"}
          ဧတေန သစ္စေန သုဝတ္ထိ ဟောတု။{"\n\n"}

          <Text style={styles.verseNum}>(၁၉)</Text> ယာနီဓ ဘူတာနိ သမာဂတာနိ၊{"\n"}
          ဘုမ္မာနိ ဝါ ယာနိ ဝ အန္တလိက္ခေ။{"\n"}
          တထာဂတံ ဒေဝမနုဿပူဇိတံ၊{"\n"}
          ဗုဒ္ဓံ နမဿာမ သုဝတ္ထိ ဟောတု။{"\n\n"}

          <Text style={styles.verseNum}>(၂၀)</Text> ယာနီဓ ဘူတာနိ သမာဂတာနိ၊{"\n"}
          ဘုမ္မာနိ ဝါ ယာနိ ဝ အန္တလိက္ခေ။{"\n"}
          တထာဂတံ ဒေဝမနုဿပူဇိတံ၊{"\n"}
          ဓမ္မံ နမဿာမ သုဝတ္ထိ ဟောတု။{"\n\n"}

          <Text style={styles.verseNum}>(၂၁)</Text> ယာနီဓ ဘူတာနိ သမာဂတာနိ၊{"\n"}
          ဘုမ္မာနိ ဝါ ယာနိ ဝ အန္တလိက္ခေ။{"\n"}
          တထာဂတံ ဒေဝမနုဿပူဇိတံ၊{"\n"}
          သံဃံ နမဿာမ သုဝတ္ထိ ဟောတု။{"\n\n"}
          
          <Text style={{fontWeight: '700', color: colors.primary}}>(ရတနသုတ် နိဋ္ဌိတံ)</Text>
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

export default RatanaSuttaCard;