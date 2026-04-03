import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const MahasamayaSuttaIntroCard = () => {
  const { colors, fontSize, themeMode } = useTheme();

  const scale = fontSize / 16;
  const dynamicSize = (base: number) => base * scale;

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={[styles.titleLine, { backgroundColor: colors.primary }]} />
        <Text style={[styles.mainTitle, { color: colors.primary, fontSize: dynamicSize(18) }]}>
          မဟာသမယသုတ် (နိဒါန်း)
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
        
        {/* Pali Introduction Text */}
        <Text style={[styles.paliBody, { color: colors.textPrimary, fontSize: dynamicSize(16.5) }]}>
          ၁။ ဧဝံ မေ သုတံ-ဧကံ သမယံ ဘဂဝါ သက္ကေသု ဝိဟရတိ ကပိလဝတ္ထုသ္မိံ မဟာဝနေ မဟတာ ဘိက္ခုသံဃေန သဒ္ဓိံ ပဉ္စမတ္တေဟိ ဘိက္ခုသတေဟိ သဗ္ဗေဟေဝ အရဟန္တေဟိ။ ဒသဟိ စ လောကဓာတူဟိ ဒေဝတာ ယေဘုယျေန သန္နိပတိတာ ဟောန္တိ ဘဂဝန္တံ ဒဿနာယ၊ ဘိက္ခုသံဃဉ္စ။
          {"\n\n"}
          အထ ခေါ စတုန္နံ သုဒ္ဓါဝါသကာယိကာနံ ဒေဝတာနံ ဧတဒဟောသိ- "အယံ ခေါ ဘဂဝါ သက္ကေသု ဝိဟရတိ ကပိလဝတ္ထုသ္မိံ မဟာဝနေ မဟတာ ဘိက္ခုသံဃေန သဒ္ဓိံ ပဉ္စမတ္တေဟိ ဘိက္ခုသတေဟိ သဗ္ဗေဟေဝ အရဟန္တေဟိ။ ဒသဟိ စ လောကဓာတူဟိ ဒေဝတာ ယေဘုယျေန သန္နိပတိတာ ဟောန္တိ ဘဂဝန္တံ ဒဿနာယ၊ ဘိက္ခုသံဃဉ္စ။ ယံနူန မယမ္ပိ ယေန ဘဂဝါ တေနုပသင်္ကမေယျာမ၊ ဥပသင်္ကမိတွာ ဘဂဝတော သန္တိကေ ပစ္စေကံ ဂါထံ ဘာသေယျာမာ"တိ။
        {"\n\n"}
        အထ ခေါ တာ ဒေဝတာ သေယျတာပိ နာမ
ဗလဝါ ပုရိသော သမိဉ္ဇိတံ ဝါ ဗာဟံ ပသာရေယျ၊
ပသာရိတံ ဝါ ဗာဟံ သမိဉ္ဇေယျ၊ ဧဝမေဝ သုဒ္ဓါဝါသေသု ဒေဝေသု
အန္တရဟိတာ ဘဂဝတော ပုရတော ပါတုရဟေသုံ။
အထ ခေါ တာ ဒေဝတာ ဘဂဝန္တံ အဘိဝါဒေတွာ
ဧကမန္တံ အဋ္ဌံသု။
  {"\n\n"}
  ဧကမန္တံ ဌိတာ ခေါ ဧကာ ဒေဝတာ
ဘဂဝတော သန္တိကေ ဣမံ ဂါထံ အဘာသိ −
 {"\n\n"}
 မဟာသမယော ပဝနသ္မိံ၊ ဒေဝကာယာ သမာဂတာ။
အာဂတ’မှ ဣမံ ဓမ္မသမယံ၊ ဒက္ခိတာယေ အပရာဇိတသံဃ”န္တိ။
         </Text>

        <View style={styles.divider} />

    

        {/* Second Gatha */}
        <View style={styles.stanzaBox}>
          <Text style={[styles.stanzaNumber, { color: colors.secondary }]}>၂။</Text>
          <Text style={[styles.stanzaText, { color: colors.textPrimary, fontSize: dynamicSize(17.5) }]}>
          
            အထ ခေါ အပရာ ဒေဝတာ ဘဂဝတော သန္တိကေ 
ဣမံ ဂါထံ အဘာသိ −

"တတြ ဘိက္ခဝေါ သမာဒဟံသု၊ စိတ္တ’မတ္တနော ဥဇုကံ အကံသု။
သာရထီဝ နေတ္တာနိ ဂဟေတွာ၊ ဣန္ဒြိယာနိ ရက္ခန္တိ ပဏ္ဍိတာ”တိ။
          </Text>
        </View>
 <View style={styles.stanzaBox}>
          <Text style={[styles.stanzaNumber, { color: colors.secondary }]}>၃။</Text>
          <Text style={[styles.stanzaText, { color: colors.textPrimary, fontSize: dynamicSize(17.5) }]}>
 အထ ခေါ အပရာ ဒေဝတာ ဘဂဝတော သန္တိကေ
ဣမံ ဂါထံ အဘာသိ −{"\n"}

"ဆေတွာ ခီလံ ဆေတွာ ပလိဃံ၊ ဣန္ဒခီလံ ဦဟစ္စ မနေဇာ။
တေ စရန္တိ သုဒ္ဓါ ဝိမလာ၊ စက္ခုမတာ သုဒန္တာ သုသုနာဂါ”တိ။
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
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  paliBody: { lineHeight: 30, textAlign: 'justify', fontWeight: '400' },
  divider: { height: 1, backgroundColor: '#E5E7EB', marginVertical: 20, opacity: 0.3 },
  stanzaBox: { flexDirection: 'row', marginBottom: 20 },
  stanzaNumber: { fontWeight: '800', marginBottom: 8, fontSize: 14, textTransform: 'uppercase' },
  stanzaText: { lineHeight: 34, fontWeight: '700' },
  footerNote: {
    marginTop: 10,
    padding: 15,
    borderLeftWidth: 4,
    backgroundColor: 'rgba(0,0,0,0.02)',
  },
  footerText: { lineHeight: 20, fontStyle: 'italic' },
});

export default MahasamayaSuttaIntroCard;

