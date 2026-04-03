import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const MahasamayaSuttaAsurasAndDevas = () => {
  const { colors, fontSize, themeMode } = useTheme();

  const scale = fontSize / 16;
  const dynamicSize = (base: number) => base * scale;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={[styles.titleLine, { backgroundColor: colors.primary }]} />
        <Text style={[styles.mainTitle, { color: colors.primary, fontSize: dynamicSize(18) }]}>
          မဟာသမယသုတ် (အသူရာနှင့် နတ်အမျိုးမျိုး)
        </Text>
      </View>

      <View style={[
        styles.card, 
        { 
          backgroundColor: themeMode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : '#FFFFFF',
          borderColor: colors.border
        }
      ]}>
         <View style={styles.stanza}>
          <Text style={[styles.stanzaNumber, { color: colors.secondary }]}>၂၅။ယေ နာဂရာဇေ သဟသာ ဟရန္တိ၊</Text>
          <Text style={[styles.stanzaText, { color: colors.textPrimary, fontSize: dynamicSize(17) }]}>
      ဒိဗ္ဗာ ဒိဇာ ပက္ခိ ဝိသုဒ္ဓစက္ခူ၊
   ဝေဟာယသာ တေ ဝန’မဇ္ဈပတ္တာ၊
   စိတြာ သုပဏ္ဏာ ဣတိ တေသ နာမံ။
          </Text>
        </View>
           <View style={styles.divider} />
        {/* ၂၆။ အသူရာများနှင့် ဝေပစိတ္တိနတ်မင်း */}
        <View style={styles.stanza}>
          <Text style={[styles.stanzaNumber, { color: colors.secondary }]}>၂၆။အဘယံ တဒါ နာဂရာဇာန’မာသိ၊</Text>
          <Text style={[styles.stanzaText, { color: colors.textPrimary, fontSize: dynamicSize(17) }]}>
         သုပဏ္ဏတော ခေမ’မကာသိ ဗုဒ္ဓေါ။
   သဏှာဟိ ဝါစာဟိ ဥပဝှယန္တာ၊
   နာဂါ သုပဏ္ဏာ သရဏမကံသု ဗုဒ္ဓံ။ 
          </Text>
        </View>

        <View style={styles.divider} />

        {/* ၂၇။ ဗေမာစိတ္တိ၊ သုစိတ္တိ နှင့် ရာဟုအသူရင် */}
        <View style={styles.stanza}>
          <Text style={[styles.stanzaNumber, { color: colors.secondary }]}>၂၇။ဇိတာ ဝဇိရဟတ္ထေန၊</Text>
          <Text style={[styles.stanzaText, { color: colors.textPrimary, fontSize: dynamicSize(17) }]}>
       သမုဒ္ဒံ အသုရာသိတာ။
   ဘာတရော ဝါသဝဿေ’တေ၊ 
   ဣဒ္ဓိမန္တော ယသဿိနော။
   ကာဠကဉ္စာ မဟာဘိသ္မာ၊ 
   အသုရာ ဒါနဝေဃသာ။
   ဝေပစိတ္တိ သုစိတ္တိ စ၊ 
   ပဟာရာဒေါ နမုစီ သဟ။
   သတဉ္စ ဗလိပုတ္တာနံ၊ 
   သဗ္ဗေ ဝေရောစနာမကာ။
   သန္နယှိတွာ ဗလိသေနံ၊ 
   ရာဟု ဘဒ္ဒ’မုပါဂမုံ၊
   သမယော ဒါနိ ဘဒ္ဒန္တေ၊ 
   ဘိက္ခူနံ သမိတိံ ဝနံ။ 
          </Text>
        </View>

        <View style={styles.divider} />

        {/* ၂၈။ အာပေါ၊ ပထဝီ၊ တေဇော၊ ဝါယော နတ်များ */}
        <View style={styles.stanza}>
          <Text style={[styles.stanzaNumber, { color: colors.secondary }]}>၂၈။အာပေါ စ ဒေဝါ ပထဝီ၊</Text>
          <Text style={[styles.stanzaText, { color: colors.textPrimary, fontSize: dynamicSize(17) }]}>
           တေဇော ဝါယော တဒါဂမုံ။
   ဝရုဏာ ဝါရဏာ ဒေဝါ၊ 
   သောမော စ ယသသာ သဟ။
   မေတ္တာ ကရုဏာ ကာယိကာ၊ 
   အာဂုံ “ဒေဝါ” ယသဿိနော။
   ဒသေ’တေ ဒသဓာ ကာယာ၊ 
   သဗ္ဗေ နာနတ္တဝဏ္ဏိနော။
   ဣဒ္ဓိမန္တော ဇုတိမန္တော၊ 
   ဝဏ္ဏဝန္တော ယသဿိနော။
   မောဒမာနာ အဘိက္ကာမုံ၊ 
   ဘိက္ခူနံ သမိတိံ ဝနံ။ 
          </Text>
        </View>

        <View style={styles.divider} />
       <View style={styles.stanza}>
          <Text style={[styles.stanzaNumber, { color: colors.secondary }]}>၂၉။ဝေဏ္ဍုဒေဝါ သဟလိ စ၊</Text>
          <Text style={[styles.stanzaText, { color: colors.textPrimary, fontSize: dynamicSize(17) }]}>
    အသမာ စ ဒုဝေ ယမာ။
   စန္ဒဿူပနိသာ ဒေဝါ၊ 
   စန္ဒမာဂုံ ပုရက္ခတွာ။
   သူရိယဿူပနိသာ ဒေဝါ၊ 
   သူရိယမာဂုံ ပုရက္ခတွာ။
   နက္ခတ္တာနိ ပုရက္ခတွာ၊ 
   အာဂုံ မန္ဒဝလာဟကာ။
   ဝသူနံ ဝါသဝေါ သေဋ္ဌော၊ 
   သက္ကောပါဂါ ပုရိန္ဒဒေါ။
   ဒသေ’တေ ဒသဓာ ကာယာ၊ 
   သဗ္ဗေ နာနတ္တဝဏ္ဏိနော။
   ဣဒ္ဓိမန္တော ဇုတိမန္တော၊ 
   ဝဏ္ဏဝန္တော ယသဿိနော။
   မောဒမာနာ အဘိက္ကာမုံ၊ 
   ဘိက္ခူနံ သမိတိံ ဝနံ။
          </Text>
        </View>

        <View style={styles.divider} />
        {/* ၃၀။ သဟဓမ္မ နတ်အုပ်စု */}
        <View style={styles.stanza}>
          <Text style={[styles.stanzaNumber, { color: colors.secondary }]}>၃၀။အထာဂုံ သဟဘူ ဒေဝါ၊</Text>
          <Text style={[styles.stanzaText, { color: colors.textPrimary, fontSize: dynamicSize(17) }]}>
           ဇလ’မဂ္ဂိ သိခါရိဝ။
   အရိဋ္ဌကာ စ ရောဇာ စ၊ 
   ဥမာပုပ္ဖနိဘာသိနော။
   ဝရုဏာ သဟဓမ္မာ စ၊  
   အစ္စုတာ စ အနေဇကာ။
   သူလေယျရုစိရာ အာဂုံ၊ 
   အာဂုံ ဝါသဝနေသိနော။
   ဒသေတေ ဒသဓာ ကာယာ၊ 
   သဗ္ဗေ နာနတ္တဝဏ္ဏိနော။
   ဣဒ္ဓိမန္တော ဇုတိမန္တော၊ 
   ဝဏ္ဏဝန္တော ယသဿိနော။
   မောဒမာနာ အဘိက္ကာမုံ၊ 
   ဘိက္ခူနံ သမိတိံ ဝနံ။
          </Text>
        </View>
   <View style={styles.divider} />
       <View style={styles.stanza}>
          <Text style={[styles.stanzaNumber, { color: colors.secondary }]}>၃၁။သမာနာ မဟာသမနာ၊</Text>
          <Text style={[styles.stanzaText, { color: colors.textPrimary, fontSize: dynamicSize(17) }]}>
       မာနုသာ မာနုသုတ္တမာ။
   ခိဍ္ဍာပဒေါသိကာ အာဂုံ၊ 
   အာဂုံ မနောပဒေါသိကာ။
   အထာဂုံ ဟရယော ဒေဝါ၊ 
   ယေ စ လောဟိတဝါသိနော။
   ပါရဂါ မဟာပါရဂါ၊ 
   အာဂုံ ဒေဝါ ယသဿိနော။
   ဒသေ’တေ ဒသဓာ ကာယာ၊ 
   သဗ္ဗေနာနတ္တဝဏ္ဏိနော။
   ဣဒ္ဓိမန္တော ဇုတိမန္တော၊ 
   ဝဏ္ဏဝန္တော ယသဿိနော။
   မောဒမာနာ အဘိက္ကာမုံ၊ 
   ဘိက္ခူနံ သမိတိံ ဝနံ။
          </Text>
        </View>
   <View style={styles.divider} />
        {/* ၃၂။ သုဠုမ္မာ နှင့် အခြားနတ်များ */}
        <View style={styles.stanza}>
          <Text style={[styles.stanzaNumber, { color: colors.secondary }]}>၃၂။သုက္ကာ ကရမ္ဘာ အရုဏာ၊</Text>
          <Text style={[styles.stanzaText, { color: colors.textPrimary, fontSize: dynamicSize(17) }]}>
            အာဂုံ ဝေဃနသာ သဟ။
   ဩဒါတဂယှာ ပါမောက္ခာ၊ 
   အာဂုံ ဒေဝါ ဝိစက္ခဏာ။
   သဒါမတ္တာ ဟာရဂဇာ၊ 
   မိဿကာ စ ယသဿိနော။
   ထနယံ အာဂ ပဇ္ဇုန္နော၊ 
   ယော ဒိသာ အဘိဝဿတိ။
   ဒသေ’တေ ဒသဓာ ကာယာ၊ 
   သဗ္ဗေ နာနတ္တဝဏ္ဏိနော။
   ဣဒ္ဓိမန္တော ဇုတိမန္တော၊ 
   ဝဏ္ဏဝန္တော ယသဿိနော။
   မောဒမာနာ အဘိက္ကာမုံ၊ 
   ဘိက္ခူနံ သမိတိံ ဝနံ။
          </Text>
        </View>

        <View style={[styles.footer, { backgroundColor: themeMode === 'dark' ? 'rgba(99, 102, 241, 0.1)' : '#F5F3FF' }]}>
          <Text style={[styles.footerText, { color: colors.primary }]}>
            ဤအပိုင်းတွင် အသူရာများနှင့် သဟဗျူနတ်များ၏ အမည်များကို အဓိကထား၍ ရွတ်ဆိုပူဇော်ရပါသည်။
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
  stanza: { marginVertical: 5},
  stanzaNumber: { fontWeight: '800', marginBottom: 8, fontSize: 14, textTransform: 'uppercase' },
  stanzaText: { lineHeight: 32, fontWeight: '600', flex: 1 },
  divider: { height: 1, backgroundColor: '#E5E7EB', marginVertical: 15, opacity: 0.3 },
  footer: { marginTop: 15, padding: 15, borderRadius: 15 },
  footerText: { fontSize: 13, textAlign: 'center', fontWeight: '700', lineHeight: 20 }
});

export default MahasamayaSuttaAsurasAndDevas;

