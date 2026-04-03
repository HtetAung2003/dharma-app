import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const MahasamayaSuttaFinalPart = () => {
  const { colors, fontSize, themeMode } = useTheme();

  const scale = fontSize / 16;
  const dynamicSize = (base: number) => base * scale;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={[styles.titleLine, { backgroundColor: colors.primary }]} />
        <Text style={[styles.mainTitle, { color: colors.primary, fontSize: dynamicSize(18) }]}>
          မဟာသမယသုတ် (ဂါထာ ၃၃ - ၃၉)
        </Text>
      </View>

      <View style={[
        styles.card, 
        { 
          backgroundColor: themeMode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : '#FFFFFF',
          borderColor: colors.border
        }
      ]}>
        
        {/* ၃၃။ ခေမိယ၊ တုသိတ နှင့် ယာမနတ်များ */}
        <View style={styles.stanza}>
          <Text style={[styles.stanzaNumber, { color: colors.secondary }]}>၃၃။ခေမိယာ တုသိတာ ယာမာ၊</Text>
          <Text style={[styles.stanzaText, { color: colors.textPrimary, fontSize: dynamicSize(17) }]}>
           ကဋ္ဌကာ စ ယသဿိနော။
   လမ္ဗီတကာ လာမသေဋ္ဌာ၊ 
   ဇောတိနာမာ စ အာသဝါ။
   နိမ္မာနရတိနော အာဂုံ၊ 
   အထာဂုံ ပရနိမ္မိတာ။
   ဒသေ’တေ ဒသဓာ ကာယာ၊ 
   သဗ္ဗေ နာနတ္တဝဏ္ဏိနော။
   ဣဒ္ဓိမန္တော ဇုတိမန္တော၊ 
   ဝဏ္ဏဝန္တော ယသဿိနော။
   မောဒမာနာ အဘိက္ကာမုံ၊ 
   ဘိက္ခူနံ သမိတိံ ဝနံ။
          </Text>
        </View>
  <View style={styles.stanza}>
          <Text style={[styles.stanzaNumber, { color: colors.secondary }]}>၃၄။သဋ္ဌေတေ ဒေဝနိကာယာ၊</Text>
          <Text style={[styles.stanzaText, { color: colors.textPrimary, fontSize: dynamicSize(17) }]}>
      သဗ္ဗေ နာနတ္တဝဏ္ဏိနော။
   နာမနွယေန အာဂစ္ဆုံ၊ 
   ယေ စညေ သဒိသာ သဟ။
   ပဝုဋ္ဌဇာတိမခိလံ၊ 
   ဩဃတိဏ္ဏမနာသဝံ။
   ဒက္ခေမောဃတရံ နာဂံ၊ 
   စန္ဒံဝ အသိတာတိဂံ။ 
          </Text>
        </View>
                  <Text style={[styles.subTitle, { color: colors.primary }]}>ဗြဟ္မာမင်းကြီးများ ကဏ္ဍ</Text>

          <View style={styles.stanza}>
          <Text style={[styles.stanzaNumber, { color: colors.secondary }]}>၃၅။သုဗြဟ္မာ ပရမတ္တော စ၊</Text>
          <Text style={[styles.stanzaText, { color: colors.textPrimary, fontSize: dynamicSize(17) }]}>
     ပုတ္တာ ဣဒ္ဓိမတော သဟ။
   သနင်္ကုမာရော တိဿော စ၊ 
   သောပါဂ သမိတိံ ဝနံ။
          </Text>
        </View>
        <View style={styles.divider} />

        {/* ၃၆။ ဗြဟ္မာမင်းကြီးများ ကြွရောက်လာပုံ */}
        <View style={styles.kingSection}>
          <View style={styles.stanza}>
            <Text style={[styles.stanzaNumber, { color: colors.secondary }]}>၃၆။သဟဿံ ဗြဟ္မလောကာနံ၊</Text>
            <Text style={[styles.stanzaText, { color: colors.textPrimary, fontSize: dynamicSize(17) }]}>
              မဟာဗြဟ္မာဘိတိဋ္ဌတိ။
   ဥပပန္နော ဇုတိမန္တော၊ 
   ဘိသ္မာကာယော ယသဿိသော။
   ဒသေတ္ထ ဣဿရာ အာဂုံ၊ 
   ပစ္စေကဝသဝတ္တိနော။
   တေသဉ္စ မဇ္ဈတော အာဂ၊ 
   ဟာရိတော ပရိဝါရိတော။ 
            </Text>
          </View>
        </View>

        <View style={styles.divider} />
          <Text style={[styles.subTitle, { color: colors.secondary  }]}> နိဂုံး(၇)ဂါထာ</Text>

        {/* ၃၇။ မာရ်နတ်မင်း လာရောက်နှောင့်ယှက်ပုံ */}
        <View style={styles.maraSection}>
          <View style={styles.stanza}>
            <Text style={[styles.stanzaNumber, { color: colors.secondary  }]}>၃၇။တေ စ သဗ္ဗေ အဘိက္ကန္တေ၊</Text>
            <Text style={[styles.stanzaText, { color: colors.textPrimary, fontSize: dynamicSize(17) }]}>
           သဣန္ဒေ ဒေဝေ သဗြဟ္မကေ။
   မာရသေနာ အဘိက္ကာမိ၊ 
   ပဿ ကဏှဿ မန္ဒိယံ။
   ဧထ ဂဏှထ ဗန္ဓထ၊ 
   ရာဂေန ဗဒ္ဓ’မတ္ထု ဝေါ။
   သမန္တာ ပရိဝါရေထ၊ 
   မာ ဝေါ မုဉ္စိတ္တ ကောစိ နံ။
   ဣတိ တတ္ထ မဟာသေနော၊ 
   ကဏှော သေနံ အပေသယိ။
   ပါဏိနာ တလ’မာဟစ္စ၊ 
   သရံ ကတွာန ဘေရဝံ။
   ယထာ ပါဝုဿကော မေဃော၊ 
   ထနယန္တော သဝိဇ္ဇုကော၊
   တဒါ သော ပစ္စုဒါဝတ္တိ၊ 
   သင်္ကုဒ္ဓေါ အသယံဝသေ။
            </Text>
          </View>
        </View>
          <View style={styles.divider} />
 <View style={styles.stanza}>
            <Text style={[styles.stanzaNumber, { color: colors.secondary  }]}>၃၈။တဉ္စ သဗ္ဗံ အဘိညာယ၊</Text>
            <Text style={[styles.stanzaText, { color: colors.textPrimary, fontSize: dynamicSize(17) }]}>
    ဝဝတ္ထိတွာန စက္ခုမာ။
   တတော အာမန္တယီ သတ္ထာ၊ 
   သာဝကေ သာသနေ ရတေ။
   မာရသေနာ အဘိက္ကန္တာ၊ 
   တေ ဝိဇာနာထ ဘိက္ခဝေါ။
   တေ စ အာတပ္ပ’မကရုံ၊ 
   သုတွာ ဗုဒ္ဓဿ သာသနံ။
   ဝီတရာဂေဟိ ပက္ကာမုံ၊ 
   နေ’သံ လောမာပိ ဣဉ္စယုံ။
            </Text>
          </View>
            <View style={styles.divider} />
        {/* ၃၉။ မာရ်နတ်မင်း ရှုံးနိမ့်၍ ပြန်လည်ဆုတ်ခွာပုံ */}
        <View style={styles.stanza}>
          <Text style={[styles.stanzaNumber, { color: colors.secondary }]}>၃၉။သဗ္ဗေ ဝိဇိတသင်္ဂါမာ၊</Text>
          <Text style={[styles.stanzaText, { color: colors.textPrimary, fontSize: dynamicSize(17) }]}>
           ဘယာတီတာ ယသဿိနော။
   မောဒန္တိ သဟ ဘူတေဟိ၊ 
   သာဝကာ တေ ဇနေသုတာတိ။
            <Text style={{ fontWeight: '800', color: colors.primary }}>မဟာသမယသုတ္တံ နိဋ္ဌိတံ။</Text>
          </Text>
        </View>
  <View style={styles.divider} />
        {/* Closing Note */}
        <View style={[styles.footer, { backgroundColor: themeMode === 'dark' ? 'rgba(34, 197, 94, 0.1)' : '#F0FDF4' }]}>
          <Text style={[styles.footerText, { color: '#15803D', fontSize: dynamicSize(13) }]}>
            မဟာသမယသုတ်တော် မြတ်စွာဘုရားဟောကြားတော်မူ၍ ပြီးပြည့်စုံသွားပါပြီ။
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: '100%', paddingVertical: 10 },
  kingSection: { 
    marginVertical: 10 
  },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 15, paddingHorizontal: 5 },
  titleLine: { width: 4, height: 20, borderRadius: 2, marginRight: 10 },
  mainTitle: { fontWeight: '700' },
  card: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 24,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  subTitle: { fontWeight: '800', fontSize: 13, marginBottom: 10, letterSpacing: 1 },
  stanza: { fontWeight: '800', marginBottom: 8, fontSize: 14, textTransform: 'uppercase' },
  stanzaNumber: { fontWeight: '800'},
  stanzaText: { lineHeight: 32, fontWeight: '600', flex: 1 },
  divider: { height: 1, backgroundColor: '#E5E7EB', marginVertical: 15, opacity: 0.3 },
  maraSection: { marginVertical: 10 },
  footer: { marginTop: 20, padding: 15, borderRadius: 15, alignItems: 'center' },
  footerText: { fontWeight: '700', textAlign: 'center' },
});

export default MahasamayaSuttaFinalPart;

