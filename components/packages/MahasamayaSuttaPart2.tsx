import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const MahasamayaSuttaPart2 = () => {
  const { colors, fontSize, themeMode } = useTheme();

  const scale = fontSize / 16;
  const dynamicSize = (base: number) => base * scale;

  return (
    <View style={styles.container}>
    

      <View style={[
        styles.card, 
        { 
          backgroundColor: themeMode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : '#FFFFFF',
          borderColor: colors.border
        }
      ]}>
        
        {/* Stanza 4 */}
        <View style={styles.stanza}>
          <Text style={[styles.stanzaNumber, { color: colors.secondary }]}>၄။</Text>
          <Text style={[styles.stanzaText, { color: colors.textPrimary, fontSize: dynamicSize(17) }]}>
            အထ ခေါ အပရာ ဒေဝတာ ဘဂဝတော သန္တိကေ
ဣမံ ဂါထံ အဘာသိ −{"\n"}
            "ယေကေစိ ဗုဒ္ဓံ သရဏံ ဂတာသေ၊{"\n"}
            န တေ ဂမိဿန္တိ အပါယဘူမိံ။{"\n"}
            ပဟာယ မာနုသံ ဒေဟံ၊{"\n"}
            ဒေဝကာယံ ပရိပူရေဿန္တီ"တိ။
          </Text>
        </View>
 <View style={styles.divider} />
        {/* Narrative Section 5 */}
        <View style={styles.stanza}>
         <Text style={[styles.stanzaNumber, { color: colors.secondary }]}>၅။ </Text>

          <Text style={[styles.stanzaText, { color: colors.textPrimary, fontSize: dynamicSize(17) }]}>
            
ဒေဝတာသန္နိပါတ  {"\n"}
 အထ ခေါ ဘဂဝါ ဘိက္ခူ အာမန္တေသိ {"\n"}

“ယေဘုယျေန ဘိက္ခဝေ ဒသသု လောကဓာတူသု {"\n"}
 
ဒေဝတာ သန္နိပတိတာ ဟောန္တိ {"\n"}

တထာဂတံ ဒဿနာယ ဘိက္ခုသံဃဉ္စ။ {"\n"}

ယေပိ တေ ဘိက္ခဝေ {"\n"}

အဟေသုံ အတီတမဒ္ဓါနံ အရဟန္တော သမ္မာသမ္ဗုဒ္ဓါ၊ {"\n"}

တေသမ္ပိ ဘဂဝန္တာနံ ဧတံပရမာယေဝ {"\n"}

ဒေဝတာ သန္နိပတိတာ အဟေသုံ သေယျထာပိ မယှံ ဧတရဟိ။ {"\n"}

ယေပိ တေ ဘိက္ခဝေ {"\n"}

ဘဝိဿန္တိ အနာဂတမဒ္ဓါနံ အရဟန္တော သမ္မာသမ္ဗုဒ္ဓါ၊ {"\n"}

တေသမ္ပိ ဘဂဝန္တာနံ ဧတံပရမာယေဝ {"\n"}

ဒေဝတာ သန္နိပတိတာ ဘဝိဿန္တိ၊ {"\n"}

သေယျထာပိ မယှံ ဧတရဟိ။ {"\n"}

အာစိက္ခိဿာမိ ဘိက္ခဝေ ဒေဝကာယာနံ နာမာနိ၊ {"\n"}

ကိတ္တယိဿာမိ ဘိက္ခဝေ ဒေဝကာယာနံ နာမာနိ၊{"\n"}

ဒေသေဿာမိ ဘိက္ခဝေ ဒေဝကာယာနံ နာမာနိ၊{"\n"}

တံ သုဏာထ, သာဓုကံ မနသိ ကရောထ, ဘာသိဿာမီ”တိ။{"\n"}

“ဧဝံ ဘန္တေ”တိ ခေါ တေ ဘိက္ခူ ဘဂဝတော ပစ္စဿောသုံ။{"\n"}
          </Text>
        </View>
 <View style={styles.divider} />
        {/* Stanza 6 - 8 (The Monks' Purity) */}
        <View style={styles.stanza}>
          <Text style={[styles.stanzaNumber, { color: colors.secondary }]}>၆။</Text>
          <Text style={[styles.stanzaText, { color: colors.textPrimary, fontSize: dynamicSize(17) }]}>
          ဘဂဝါ ဧတဒဝေါစ − {"\n"}

သိလောက’မနုကဿာမိ၊ ယတ္ထ ဘုမ္မာ တဒဿိတာ။ {"\n"}

ယေ သိတာ ဂိရိဂဗ္ဘရံ၊ ပဟိတတ္တာ သမာဟိတာ။ {"\n"}

ပုထူသီဟာဝ သလ္လီနာ၊ လောမဟံသာဘိသမ္ဘုနော။ {"\n"}

ဩဒါတမနသာ သုဒ္ဓါ၊ ဝိပ္ပသန္န မနာဝိလာ။
          </Text>
        </View>
 <View style={styles.divider} />
        <View style={styles.stanza}>
          <Text style={[styles.stanzaNumber, { color: colors.secondary }]}>၇။</Text>
          <Text style={[styles.stanzaText, { color: colors.textPrimary, fontSize: dynamicSize(17) }]}>
            ဘိယျော ပဉ္စသတေ ဉတွာ၊ ဝနေ ကာပိလဝတ္ထဝေ။

တတော အာမန္တယီ သတ္ထာ၊ သာဝကေ သာသနေ ရတေ။

ဒေဝကာယာ အဘိက္ကန္တာ၊ တေ ဝိဇာနာထ ဘိက္ခဝေါ။

တေ စ အာတပ္ပ’မကရုံ၊ သုတွာ ဗုဒ္ဓဿ သာသနံ။


          </Text>
        </View>
         <View style={styles.divider} />
          <View style={styles.stanza}>
          <Text style={[styles.stanzaNumber, { color: colors.secondary }]}>၈။</Text>
          <Text style={[styles.stanzaText, { color: colors.textPrimary, fontSize: dynamicSize(17) }]}>
         တေသံ ပါတုရဟု ဉာဏံ၊ အမနုဿာနဒဿနံ။

အပ္ပေကေ သတ’မဒ္ဒက္ခုံ၊ သဟဿံ အထ သတ္တရိံ။

သတံ ဧကေ သဟဿာနံ၊ အမနုဿာန’မဒ္ဒသုံ။

အပ္ပေကေ’နန္တ’မဒ္ဒက္ခုံ၊ ဒိသာ သဗ္ဗာ ဖုဋာ အဟုံ။


          </Text>
        </View>
         <View style={styles.divider} />
          <View style={styles.stanza}>
          <Text style={[styles.stanzaNumber, { color: colors.secondary }]}>၉။</Text>
          <Text style={[styles.stanzaText, { color: colors.textPrimary, fontSize: dynamicSize(17) }]}>
         တဉ္စ သဗ္ဗံ အဘိညာယ၊ ဝဝတ္ထိတွာန စက္ခုမာ။

တတော အာမန္တယီ သတ္ထာ၊ သာဝကေ သာသနေ ရတေ။

ဒေဝကာယာ အဘိက္ကန္တာ၊ တေ ဝိဇာနာထ ဘိက္ခဝေါ။

ယေ ဝေါ’ဟံ ကိတ္တယိဿာမိ၊ ဂိရာဟိ အနုပုဗ္ဗသော။


          </Text>
        </View>
         <View style={styles.divider} />

        {/* Stanza 10 - 14 (Devas coming in groups) */}
       
        

        <View style={styles.stanza}>
          <Text style={[styles.stanzaNumber, { color: colors.secondary }]}>၁၀။</Text>
          <Text style={[styles.stanzaText, { color: colors.textPrimary, fontSize: dynamicSize(17) }]}>
            သတ္တသဟဿာ ဝေ ယက္ခာ၊{"\n"}
            ဘူမာ ကာပိလဝတ္ထဝေ။{"\n"}
            ဣဒ္ဓိမန္တော ဇုတိမန္တော၊{"\n"}
            ဝဏ္ဏဝန္တော ယသဿိနော။{"\n"}
            မောဒမာနာ အဘိက္ကာမုံ၊{"\n"}
            ဘိက္ခူနံ သမိတိံ ဝနံ။
          </Text>
        </View>
 <View style={styles.divider} />
        <View style={styles.stanza}>
          <Text style={[styles.stanzaNumber, { color: colors.secondary }]}>၁၁။</Text>
          <Text style={[styles.stanzaText, { color: colors.textPrimary, fontSize: dynamicSize(17) }]}>
          ယက္ခာ နာနတ္တဝဏ္ဏိနော။
   ဣဒ္ဓိမန္တော ဇုတိမန္တော၊ 
   ဝဏ္ဏဝန္တော ယသဿိနော။
   မောဒမာနာ အဘိက္ကာမုံ၊ 
   ဘိက္ခူနံ သမိတိံ ဝနံ။
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
    padding: 20,
  },
  stanza: { flexDirection: 'row', marginBottom: 20 },
  stanzaNumber: { fontWeight: '800' },
  stanzaText: { lineHeight: 32, fontWeight: '600', flex: 1 },
  narrativeBox: { 
    padding: 15, 
    borderRadius: 12, 
    backgroundColor: 'rgba(99, 102, 241, 0.05)', 
    marginBottom: 20,
    borderLeftWidth: 3,
    borderLeftColor: '#6366F1'
  },
  narrativeText: { lineHeight: 24, fontStyle: 'italic' },
  divider: { height: 1, backgroundColor: '#E5E7EB', marginVertical: 15, opacity: 0.3 },
  subHeading: { fontWeight: '800', textAlign: 'center', marginBottom: 15, color: '#6B7280' },
  footer: { marginTop: 10, padding: 12, borderRadius: 10 },
  footerText: { fontSize: 12, textAlign: 'center' }
});

export default MahasamayaSuttaPart2;

