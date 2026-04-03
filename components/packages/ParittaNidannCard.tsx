import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

const ParittaNidannCard = () => {
  const { colors, fontSize, themeMode } = useTheme();

  const scale = fontSize / 16;
  const dynamicSize = (base: number) => base * scale;

  return (
    <View style={styles.container}>
      {/* Title Header */}
      <View style={styles.titleWrapper}>
        <View style={[styles.titleLine, { backgroundColor: colors.primary }]} />
        <Text style={[styles.subtitle, { color: colors.primary, fontSize: dynamicSize(17) }]}>
          ပရိတ်ကြီးပါဠိတော် နိဒါန်း
        </Text>
      </View>

      {/* Main Content Card */}
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
          <Text style={styles.namoText}>နမော တဿ ဘဂဝတော အရဟတော သမ္မာသမ္ဗုဒ္ဓဿ။</Text>{"\n\n"}

          <Text style={styles.verseNum}>(၁)</Text> သမန္တာ စက္ကဝါဠေသု၊ အတြာဂစ္ဆန္တု ဒေဝတာ။{"\n"}
          သဒ္ဓမ္မံ မုနိရာဇဿ၊ သုဏန္တု သဂ္ဂမောက္ခဒံ။{"\n\n"}

          <Text style={styles.verseNum}>(၂)</Text> ဓမ္မဿဝနကာလော အယံ ဘဒ္ဒန္တာ။ (၃ ကြိမ်){"\n\n"}

          <Text style={styles.verseNum}>(၃)</Text> နမော တဿ ဘဂဝတော အရဟတော သမ္မာသမ္ဗုဒ္ဓဿ။ (၃ ကြိမ်){"\n\n"}

          <Text style={styles.verseNum}>(၄)</Text> ယေ သန္တာ သန္တစိတ္တာ၊ တိသရဏသရဏာ၊ ဧတ္ထ လောကန္တရေ ဝါ။{"\n"}
          ဘုမ္မာ ဘုမ္မာ စ ဒေဝါ၊ ဂုဏဂဏဂဟဏာ၊ ဗျာဝဋာ သဗ္ဗကာလံ။{"\n"}
          ဧတေ အာယန္တု ဒေဝါ၊ ဝရကနကမယေ၊ မေရုရာဇေ ဝသန္တော။{"\n"}
          သန္တော သန္တောသဟေတုံ၊ မုနိဝရဝစနံ၊ သောတုမဂ္ဂံ သမဂ္ဂံ။{"\n\n"}

          <Text style={styles.verseNum}>(၅)</Text> သဗ္ဗေသု စက္ကဝါဠေသု၊ ယက္ခာ ဒေဝါ စ ဗြဟ္မုနော။{"\n"}
          ယံ အမှေဟိ ကတံ ပုညံ၊ သဗ္ဗသမ္ပတ္တိသာဓကံ။{"\n\n"}

          <Text style={styles.verseNum}>(၆)</Text> သဗ္ဗေ တံ အနုမောဒိတွာ၊ သမဂ္ဂါ သာသနေ ရတာ။{"\n"}
          ပမာဒရဟိတာ ဟောန္တု၊ အာရက္ခာသု ဝိသေသတော။{"\n\n"}

          <Text style={styles.verseNum}>(၇)</Text> သာသနဿ စ လောကဿ၊ ဝုဍ္ဎိ ဘဝတု သဗ္ဒဒါ။{"\n"}
          သာသနမ္ပိ စ လောကဉ္စ၊ ဒေဝါ ရက္ခန္တု သဗ္ဗဒါ။{"\n\n"}

          <Text style={styles.verseNum}>(၈)</Text> သဒ္ဓိံ ဟောန္တု သုခီ သဗ္ဗေ၊ ပရိဝါရေဟိ အတ္တနော။{"\n"}
          အနီဃာ သုမနာ ဟောန္တု၊ သဟ သဗ္ဗေဟိ ဉာတိဘိ။{"\n\n"}

          <Text style={styles.verseNum}>(၉)</Text> ရာဇတော ဝါ စောရတော ဝါ၊{"\n"}
          မနုဿတော ဝါ အမနုဿတော ဝါ၊{"\n"}
          အဂ္ဂိတော ဝါ ဥဒကတော ဝါ၊{"\n"}
          ပိသာစတော ဝါ ခါဏုကတော ဝါ၊{"\n"}
          ကဏ္ဋကတော ဝါ နက္ခတ္တတော ဝါ၊{"\n"}
          ဇနပဒရောဂတော ဝါ အသဒ္ဓမ္မတော ဝါ၊{"\n"}
          အသန္ဒိဋ္ဌိတော ဝါ အသပ္ပုရိသတော ဝါ၊{"\n"}
          စဏ္ဍ ဟတ္ထိ အဿ မိဂ ဂေါဏ ကုက္ကုရ၊{"\n"}
          အဟိ ဝိစ္ဆိက သပ္ပ နကုလ သီဟ ဗျဂ္ဃ ဒီပိ အစ္ဆ တရစ္ဆ သကရ မဟိံသ ယက္ခ ရက္ခသာဒီဟိ၊{"\n"}
          နာနာဘယတော ဝါ နာနာရောဂတော ဝါ၊{"\n"}
          နာနာဥပဒ္ဒဝတော ဝါ အာရက္ခံ ဂဏှန္တု။
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
  namoText: {
    fontWeight: '700',
    fontStyle: 'italic',
  },
  verseNum: {
    fontWeight: 'bold',
    color: '#6366F1',
  }
});

export default ParittaNidannCard;

