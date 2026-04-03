import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const WattaSuttaCard = () => {
  const { colors, fontSize, themeMode } = useTheme();

  const scale = fontSize / 16;
  const dynamicSize = (base: number) => base * scale;

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={[styles.titleLine, { backgroundColor: colors.primary }]} />
        <Text style={[styles.mainTitle, { color: colors.primary, fontSize: dynamicSize(18) }]}>
          ဝဋ္ဋသုတ် (ပါဠိတော်)
        </Text>
      </View>

      {/* Scripture Card */}
      <View style={[
        styles.card, 
        { 
          backgroundColor: themeMode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : '#FFFFFF',
          borderColor: colors.border
        }
      ]}>
        <Text style={[styles.suttaText, { color: colors.textPrimary, fontSize: dynamicSize(17) }]}>
          အတ္ထိ လောကေ သီလဂုဏော၊{"\n"}
          သစ္စံ သောစေယျ နုဒ္ဒယာ။{"\n"}
          တေန သစ္စေန ကာဟာမိ၊{"\n"}
          သစ္စကိရိယ မုတ္တမံ။{"\n\n"}

          အာဝဇ္ဇေတွာ ဓမ္မဗလံ၊{"\n"}
          သရိတွာ ပုဗ္ဗကေ ဇိနေ။{"\n"}
          သစ္စဗလ မဝဿာယ၊{"\n"}
          သစ္စကိရိယ မကာသဟံ။{"\n\n"}

          သန္တိ ပက္ခာ အပတနာ၊{"\n"}
          သန္တိ ပါဒါ အဝဉ္စနာ။{"\n"}
          မာတာပိတာ စ နိက္ခန္တာ၊{"\n"}
          ဇာတဝေဒ ပဋိက္ကမ။{"\n\n"}

          သဟ သစ္စေ ကတေ မယှံ၊{"\n"}
          မဟာပဇ္ဇလိတော သိခီ။{"\n"}
          ဝဇ္ဇေသိ သောဠသ ကရီသာနိ၊{"\n"}
          ဥဒကံ ပတွာ ယထာ သိခီ။{"\n\n"}

          သစ္စေန မေ သမော နတ္ထိ၊{"\n"}
          ဧသာ မေ သစ္စပါရမီ။
        </Text>

        {/* Footer Note */}
        <View style={[
          styles.footerNote, 
          { backgroundColor: themeMode === 'dark' ? 'rgba(99, 102, 241, 0.1)' : '#EFF6FF' }
        ]}>
          <Text style={[styles.footerText, { color: colors.primary, fontSize: dynamicSize(13) }]}>
            မီးဘေးအန္တရာယ်မှ ကင်းဝေးစေရန်နှင့် သစ္စာဆိုခြင်း၏ အစွမ်းထက်မြက်မှုကို ယုံကြည်ကြည်ညိုစွာဖြင့် ဤဝဋ္ဋသုတ်ကို ရွတ်ဆိုပူဇော်ကြသည်။
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 5,
  },
  titleLine: {
    width: 4,
    height: 20,
    borderRadius: 2,
    marginRight: 10,
  },
  mainTitle: {
    fontWeight: '700',
  },
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
    padding: 12,
    borderRadius: 12,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)', // Soft blue border
  },
  footerText: {
    textAlign: 'center',
    lineHeight: 20,
    fontWeight: '600',
    fontStyle: 'italic',
  },
});

export default WattaSuttaCard;

