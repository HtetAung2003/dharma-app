import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const SolasaMangalaCard = () => {
  const { colors, fontSize, themeMode } = useTheme();

  const scale = fontSize / 16;
  const dynamicSize = (base: number) => base * scale;

  const verses = [
    "၁။ သမ္ဗုဒ္ဓေါ ဒီပဒံ သေဋ္ဌော၊ နိသိန္နော သေရိသာဝှယေ။\nမုနိန္ဒော လောကပါလာနံ၊ ယသဿီ ဟောတု မင်္ဂလံ။",
    "၂။ မဟိဒ္ဓိကော မဟာတေဇော၊ မဟာပညော မဟာယသော။\nမဟာသုခံ မဟာလာဘံ၊ သုခဿီ ဟောတု မင်္ဂလံ။",
    "၃။ ပါရမီ ဂုဏသမ္ပန္နော၊ ဣန္ဒြိယေဟိ ဝိသောဓိတော။\nသဗ္ဗညူ သဗ္ဗလောကဂ္ဂေါ၊ သုခဿီ ฮောတု မင်္ဂလံ။",
    "၄။ ဝိဇ္ဇာစရဏသမ္ပန္နော၊ သုဂတော လောကဝိဒူ စ။\nအနုတ္တရော ဓမ္မရာဇာ၊ ယသဿီ ဟောတု မင်္ဂလံ။",
    "၅။ သမ္မာသမ္ဗုဒ္ဓ ပက္ခန္တော၊ သဒ္ဓမ္မော စရဏော ဝရော။\nဣမသ္မိံ သမယေ ဒေဝါ၊ ယသဿီ ဟောတု မင်္ဂလံ။",
    "၆။ သမ္ပန္နော သမ္ပဝါရေဟိ၊ သံဃော ဝါ သီလသံဝရော။\nဒက္ခိဏေယျော မဟာပုညော၊ သုခဿီ ဟောတု မင်္ဂလံ။",
    "၇။ သုသီလော သုသမာဓိ စ၊ သုပညော သုစိတပ္ပဒေါ။\nသုခဒေါ သုခဟာရော စ၊ သုခဿီ ဟောတု မင်္ဂလံ။",
    "၈။ ဇယန္တော ဇယဒါတာ စ၊ ဇယဟာရော ဇယင်္ကရော။\nဇယော ဇယကရော ဓီရော၊ ဇယဿု ဇယမင်္ဂလံ။",
    "၉။ သော စ သဗ္ဗဇိတော ဓီရော၊ သဗ္ဗဝါရိတ ဝါရကော။\nသဗ္ဗဒေါ သဗ္ဗဟာရော စ၊ သဗ္ဗကာရော သုနိမ္မလော။",
    "၁၀။ ဝိသုဒ္ဓေါ ဝိမလော စေဝ၊ ဝိပ္ပမုတ္တော ဝိနုဒ္ဒကော။\nဝိနယော ဝိနယော ဓီရော၊ ဝိမုတ္တော ဝိမုတ္တိက္ကမော။",
    "၁၁။ ဓမ္မော ဓမ္မကရော ဓီရော၊ ဓမ္မဒေါ ဓမ္မဟာရကော။\nဓမ္မကော ဓမ္မရာဇာ စ၊ ဓမ္မေသု ဓမ္မသာမိကော။",
    "၁၁။ ဓမ္မော ဓမ္မကရော ဓီရော၊ ဓမ္မဒေါ ဓမ္မဟာရကော။\nဓမ္မကော ဓမ္မရာဇာ စ၊ ဓမ္မေသု ဓမ္မသာမိကော။",
    "၁၂။ သံဃော သံဃကရော ဓီရော၊ သံဃဒေါ သံဃဟာရကော။\nသံဃော သံဃဝရော စေဝ၊ သံဃော သံဃဂုဏော တထာ။",
    "၁၃။ ဣတိ သော ဘဂဝါ အရဟံ၊ သမ္မာသမ္ဗုဒ္ဓေါ အနုတ္တရော။\nပုရိသဒမ္မ သာရထိ၊ သုခဿီ ဟောတု မင်္ဂလံ။",
    "၁၄။ သတ္တာ ဒေဝ မနုဿာနံ၊ ဗုဒ္ဓေါ ဘဂဝါတိ အာဒိကော။\nအဂ္ဂပ္ပတ္တော ပမောဒတိ၊ ယသဿီ ဟောတု မင်္ဂလံ။",
    "၁၅။ သော စ သဗ္ဗဂုဏော ဓီရော၊ သဗ္ဗသမ္ပတ္တိ ဒါယကော။\nသဗ္ဗဒေါ သဗ္ဗဟာရော စ၊ သဗ္ဗကာရော သုနိမ္မလော။",
    "၁၆။ ဧတေန သစ္စဝဇ္ဇေန၊ သဗ္ဗသမ္ပတ္တိ ဒါယကော။\nသဗ္ဗဒေါ သဗ္ဗဟာရော စ၊ သဗ္ဗကာရော သုနိမ္မလော။"
  ];

  return (
    <View style={styles.card}>
      {/* ခေါင်းစဉ် */}
      <View style={styles.headerSection}>
        <Text style={[styles.title, { color: colors.primary, fontSize: dynamicSize(19) }]}>
          သောဠသ မင်္ဂလာ ဂါထာတော်
        </Text>
        <Text style={[styles.homage, { color: colors.textSecondary, fontSize: dynamicSize(15) }]}>
          နမော တဿ ဘဂဝတော အရဟတော သမ္မာသမ္ဗုဒ္ဓဿ
        </Text>
      </View>

      {/* ဂါထာတော်များ Area */}
      <View style={[
        styles.verseContainer,
        { backgroundColor: themeMode === 'dark' ? 'rgba(16, 185, 129, 0.05)' : '#F0FDFA' }
      ]}>
        {verses.map((verse, index) => (
          <View key={index} style={styles.verseWrapper}>
            <Text style={[styles.verseText, { color: colors.textPrimary, fontSize: dynamicSize(17) }]}>
              {verse}
            </Text>
          </View>
        ))}
      </View>

      {/* ရွတ်ဖတ်ရကျိုး Note */}
      <View style={[styles.benefitBox, { backgroundColor: themeMode === 'dark' ? '#1E293B' : '#E0F2FE' }]}>
        <Text style={[styles.benefitTitle, { color: colors.primary, fontSize: dynamicSize(15) }]}>
          🌿 ရွတ်ဖတ်ရကျိုး
        </Text>
        <Text style={[styles.benefitText, { color: colors.textSecondary, fontSize: dynamicSize(14) }]}>
          ဤသောဠသ မင်္ဂလာကို နေ့စဉ် ရွတ်ဖတ်ခြင်းဖြင့် မကောင်းသော အနှောင့်အယှက်များ ကင်းစင်ပြီး၊ စီးပွားတက်ခြင်း၊ ကျန်းမာခြင်းနှင့် မိစုအတွင်း ကျက်သရေမင်္ဂလာ တိုးပွားခြင်းတို့ကို ရရှိစေနိုင်ပါသည်။
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { paddingBottom: 30 },
  headerSection: { alignItems: 'center', marginBottom: 20 },
  title: { fontWeight: 'bold', marginBottom: 8 },
  homage: { fontStyle: 'italic' },
  verseContainer: {
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.2)', // Emerald tint
    marginBottom: 20,
  },
  verseWrapper: {
    paddingVertical: 18,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(16, 185, 129, 0.1)',
  },
  verseText: {
    textAlign: 'center',
    lineHeight: 34,
  },
  benefitBox: {
    padding: 20,
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#10B981', // Emerald primary
  },
  benefitTitle: { fontWeight: 'bold', marginBottom: 8 },
  benefitText: { lineHeight: 22, textAlign: 'justify' },
});

export default SolasaMangalaCard;

