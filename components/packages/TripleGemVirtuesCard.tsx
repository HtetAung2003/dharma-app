import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

const TripleGemVirtuesCard = () => {
  const { colors, fontSize, themeMode } = useTheme();

  const scale = fontSize / 16;
  const dynamicSize = (base: number) => base * scale;

  const SectionTitle = ({ title }: { title: string }) => (
    <View style={styles.sectionTitleWrapper}>
      <Text style={[styles.sectionTitle, { color: colors.primary, fontSize: dynamicSize(18) }]}>
        {title}
      </Text>
      <View style={[styles.titleUnderline, { backgroundColor: colors.primary, opacity: 0.3 }]} />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerWrapper}>
        <View style={[styles.titleLine, { backgroundColor: colors.primary }]} />
        <Text style={[styles.mainTitle, { color: colors.primary, fontSize: dynamicSize(17) }]}>
          ရတနာသုံးပါး ဂုဏ်တော်များ
        </Text>
      </View>

      {/* Main Card */}
      <View style={[
        styles.card, 
        { 
          backgroundColor: themeMode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#FFFFFF',
          borderColor: themeMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : '#E2E8F0'
        }
      ]}>
        
        {/* ၁။ ဘုရားဂုဏ်တော် */}
        <SectionTitle title="၁။ ဘုရားဂုဏ်တော် (၉) ပါး" />
        <Text style={[styles.scriptText, { color: colors.textPrimary, fontSize: dynamicSize(20) }]}>
          "ဣတိပိ သော ဘဂဝါ အရဟံ၊ သမ္မာသမ္ဗုဒ္ဓေါ၊ ဝိဇ္ဇာစရဏသမ္ပန္နော၊ သုဂတော၊ လောကဝိဒူ၊ အနုတ္တရော ပုရိသဒမ္မသာရထိ၊ သတ္ထာ ဒေဝမနုဿာနံ၊ ဗုဒ္ဓေါ၊ ဘဂဝါ" တိ။
        </Text>

        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        {/* ၂။ တရားဂုဏ်တော် */}
        <SectionTitle title="၂။ တရားဂုဏ်တော် (၆) ပါး" />
        <Text style={[styles.scriptText, { color: colors.textPrimary, fontSize: dynamicSize(20) }]}>
          "သွာက္ခာတော ဘဂဝတော ဓမ္မော၊ သန္ဒိဋ္ဌိကော၊ အကာလိကော၊ ဧဟိပဿိကော၊ ဩပနေယျိကော၊ ပစ္စတ္တံ ဝေဒိတဗ္ဗော ဝိညူဟီ" တိ။
        </Text>

        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        {/* ၃။ သံဃာဂုဏ်တော် */}
        <SectionTitle title="၃။ သံဃာဂုဏ်တော် (၉) ပါး" />
        <View style={styles.listSection}>
          <Text style={[styles.listText, { color: colors.textPrimary, fontSize: dynamicSize(20) }]}>
            • သုပ္ပဋိပန္နော ဘဂဝတော သာဝကသံဃော၊{"\n"}
            • ဥဇုပ္ပဋိပန္နော ဘဂဝတော သာဝကသံဃော၊{"\n"}
            • ဉာယပ္ပဋိပန္နော ဘဂဝတော သာဝကသံဃော၊{"\n"}
            • သာမီစိပ္ပဋိပန္နော ဘဂဝတော သာဝကသံဃော၊{"\n"}
            • ယဒိဒံ စတ္တာရိ ပုရိသယုဂါနိ အဋ္ဌ ပုရိသပုဂ္ဂလာ ဧသ ဘဂဝတော သာဝကသံဃော၊{"\n"}
            • အာဟုနေယျော၊ ပါဟုနေယျော၊ ဒက္ခိဏေယျော၊ အဉ္စလီကရဏီယျော၊ အနုတ္တရံ ပုညက္ခေတ္တံ လောကဿ။
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 25,
  },
  headerWrapper: {
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
  mainTitle: {
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
  sectionTitleWrapper: {
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  sectionTitle: {
    fontWeight: '700',
    marginBottom: 2,
  },
  titleUnderline: {
    height: 2,
    width: '100%',
    borderRadius: 1,
  },
  scriptText: {
    textAlign: 'justify',
    lineHeight: 38,
    fontWeight: '500',
    fontStyle: 'italic',
  },
  listSection: {
    marginTop: 5,
  },
  listText: {
    lineHeight: 38,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    width: '100%',
    marginVertical: 20,
    opacity: 0.2,
  },
});

export default TripleGemVirtuesCard;

