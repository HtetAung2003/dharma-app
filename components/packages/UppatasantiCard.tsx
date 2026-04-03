import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UppatasantiCard = () => {
  const { colors, fontSize, themeMode } = useTheme();

  const scale = fontSize / 16;
  const dynamicSize = (base: number) => base * scale;

  const verses = [
    "၁။ သန္တိပက္ခော သမုဒ္ဒေါ စ၊ သန္တိသေဋ္ဌော သန္တာနနော။\nသန္တိဒေါ သန္တိဟာရော စ၊ သန္တိကာရော သန္တမုနိ။",
    "၂။ သုမနော သုမနော ဓီရော၊ သုစိဏ္ဏော သုစိတပ္ပဒေါ။\nသုပ္ပကာသော သုပ္ပတိဋ္ဌော၊ သုခဒေါ သုခဟာရကော။",
    "၃။ သုတော သုဒ္ဓေါ သုက္ကဓမ္မော၊ သုစိဏ္ဏော သုစိတပ္ပဒေါ။\nသုပ္ပကာသော သုပ္ပတိဋ္ဌော၊ သုခဒေါ သုခဟာရကော။",
    "၄။ ဇေယျော ဇေယျော ဇယဒါတာ၊ ဇယဟာရော ဇယင်္ကရော။\nဇယော ဇယကရော ဓီရော၊ ဇယော ဇယဒေါ ဇီနော။",
    "၅။ သော စ သဗ္ဗဇိတော ဓီရော၊ သဗ္ဗဝါရိတဝါရကော။\nသဗ္ဗဒေါ သဗ္ဗဟာရော စ၊ သဗ္ဗကာရော သုနိမ္မလော။",
    "၆။ ဝိသုဒ္ဓေါ ဝိမလော စေဝ၊ ဝိပ္ပမုတ္တော ဝိနုဒ္ဒကော။\nဝိနယော ဝိနယော ဓီရော၊ ဝိမုတ္တော ဝိမုတိက္ကမော။",
    "၇။ ဓမ္မော ဓမ္မကရော ဓီရော၊ ဓမ္မဒေါ ဓမ္မဟာရကော။\nဓမ္မကော ဓမ္မရာဇာ စ၊ ဓမ္မေသု ဓမ္မသာမိကော။",
    "၈။ သံဃော သံဃကရော ဓီရော၊ သံဃဒေါ သံဃဟာရကော။\nသံဃော သံဃဝရော စေဝ၊ သံဃော သံဃဂုဏော တထာ။"
  ];

  return (
    <View style={styles.card}>
      {/* နိဒါန်း */}
      <Text style={[styles.title, { color: colors.primary, fontSize: dynamicSize(18) }]}>
        နမော တဿ ဘဂဝတော အရဟတော သမ္မာသမ္ဗုဒ္ဓဿ။
      </Text>

      {/* ဂါထာတော်များ ထည့်သွင်းထားသည့် အဝါနုရောင် Area */}
      <View style={[
        styles.verseContainer,
        { backgroundColor: themeMode === 'dark' ? 'rgba(180, 83, 9, 0.05)' : '#FFFBEB' }
      ]}>
        {verses.map((verse, index) => (
          <View 
            key={index} 
            style={[
              styles.verseWrapper, 
              index === verses.length - 1 && { borderBottomWidth: 0 } // နောက်ဆုံးတစ်ခုဆိုရင် border ဖျောက်မည်
            ]}
          >
            <Text style={[styles.verseText, { color: colors.textPrimary, fontSize: dynamicSize(17) }]}>
              {verse}
            </Text>
          </View>
        ))}
      </View>

      {/* ထူးခြားချက် Note */}
      <View style={[styles.noteBox, { backgroundColor: themeMode === 'dark' ? '#1A242F' : '#F0F7FF' }]}>
        <Text style={[styles.noteTitle, { color: colors.primary, fontSize: dynamicSize(14) }]}>
          💡 ကျမ်းစာ၏ ထူးခြားချက်
        </Text>
        <Text style={[styles.noteText, { color: colors.textSecondary, fontSize: dynamicSize(13) }]}>
          ဤဂါထာတော်များသည် ဘုရား၊ တရား၊ သံဃာ ရတနာမြတ်သုံးပါး၏ ဂုဏ်တော်များကို "သန္တိ" (ငြိမ်းချမ်းခြင်း)၊ "ဇယ" (အောင်မြင်ခြင်း)၊ "သုခ" (ချမ်းသာခြင်း) စသည့် မင်္ဂလာရှိသော စကားလုံးများဖြင့် သီကုံးထားခြင်း ဖြစ်ပါသည်။
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { paddingBottom: 20 },
  title: { textAlign: 'center', fontWeight: 'bold', marginBottom: 20, lineHeight: 28 },
  verseContainer: {
    borderRadius: 16,
    padding: 15,
    borderWidth: 1,
    borderColor: 'rgba(180, 83, 9, 0.2)', // Amber light border
    marginBottom: 20,
    overflow: 'hidden',
  },
  verseWrapper: {
    paddingVertical: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(180, 83, 9, 0.15)',
    alignItems: 'center',
  },
  verseText: { 
    textAlign: 'center', 
    lineHeight: 34, // ဖတ်ရလွယ်အောင် line height မြှင့်ထားပါတယ်
  },
  noteBox: { 
    padding: 16, 
    borderRadius: 12, 
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3' // Blue accent for info
  },
  noteTitle: { fontWeight: 'bold', marginBottom: 6 },
  noteText: { lineHeight: 22 }
});

export default UppatasantiCard;

