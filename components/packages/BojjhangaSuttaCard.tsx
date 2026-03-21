import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const BojjhangaSuttaCard = () => {
  const { colors, isDarkMode, fontSize } = useTheme();

  const scale = fontSize / 16;
  const dynamicSize = (base: number) => base * scale;

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={[styles.titleLine, { backgroundColor: colors.primary }]} />
        <Text style={[styles.mainTitle, { color: colors.primary, fontSize: dynamicSize(18) }]}>
          ဗောဇ္ဈင်္ဂသုတ် (ပါဠိတော်)
        </Text>
      </View>

      {/* Scripture Card */}
      <View style={[
        styles.card, 
        { 
          backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.03)' : '#FFFFFF',
          borderColor: colors.border
        }
      ]}>
        <Text style={[styles.suttaText, { color: colors.textPrimary, fontSize: dynamicSize(17) }]}>
          သမ္ဗောဓိင်္ဂါ စ ယေ သတ္တာ၊ သဗ္ဗေသာ နန္ဒမဟိသု။{"\n"}
          သမ္ဗောဓိဿ အင်္ဂါ စ၊ တေဇံ ဗောဇ္ဈင်္ဂါ တေ၊{"\n"}
          သဗ္ဗေသာ နန္ဒမဟိသု၊ သမ္မာ သမ္ဗောဓိယာ စ။{"\n"}
          <Text style={styles.boldPrimary}>ဧတေန သစ္စဝဇ္ဇေန၊ သောတ္ထိ တေ ဟောတု သဗ္ဗဒါ။</Text>{"\n\n"}

          ဧကသမိန် သမယေ နာထော၊ မောဂ္ဂလ္လာနဉ္စ ကဿပံ။{"\n"}
          ဂိလာနေ ဒုက္ခိတေ ဒိသွာ၊ ဗောဇ္ဈင်္ဂေ သတ္တ ဒေသယိ။{"\n"}
          တေ စ တံ အဘိနန္ဒိတွာ၊ ရောဂါ မုစ္စန္တိ တက္ခဏေ။{"\n"}
          <Text style={styles.boldPrimary}>ဧတေန သစ္စဝဇ္ဇေန၊ သောတ္ထိ တေ ဟောတု သဗ္ဗဒါ။</Text>{"\n\n"}

          ဧကဒါ ဓမ္မရာဇာပိ၊ ဂေလညေနာဘိပီဠိတော။{"\n"}
          စုန္ဒတ္ထေရေန တံယေဝ၊ ဘဏာပေတွာန သာဒရံ။{"\n"}
          သမ္မောဒိတွာန အာဗာဓာ၊ တမှာ ဝုဋ္ဌာသိ ဌာနသော။{"\n"}
          <Text style={styles.boldPrimary}>ဧတေန သစ္စဝဇ္ဇေန၊ သောတ္ထိ တေ ဟောတု သဗ္ဗဒါ။</Text>{"\n\n"}

          ပဟီနာ တေ စ အာဗာဓာ၊ တိဏ္ဏန္နမ္ပိ မဟေသိနံ။{"\n"}
          မဂ္ဂါဟတကိလေသာဝ၊ ပတ္တာနုပ္ပတ္တိဓမ္မတံ။{"\n"}
          <Text style={styles.boldPrimary}>ဧတေန သစ္စဝဇ္ဇေန၊ သောတ္ထိ တေ ဟောတု သဗ္ဗဒါ။</Text>
        </Text>

        {/* Footer Note */}
        <View style={[
          styles.footerNote, 
          { backgroundColor: isDarkMode ? 'rgba(16, 185, 129, 0.1)' : '#ECFDF5' }
        ]}>
          <Text style={[styles.footerText, { color: colors.primary, fontSize: dynamicSize(13) }]}>
            နာမကျန်းဖြစ်ခြင်းနှင့် ရောဂါဝေဒနာများမှ ကင်းဝေးစေရန်နှင့် အမြန်ဆုံး ကျန်းမာလာစေရန် ဤဗောဇ္ဈင်္ဂသုတ်ကို ယုံကြည်ကြည်ညိုစွာဖြင့် ရွတ်ဆိုပူဇော်ကြသည်။
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
  suttaText: { lineHeight: 34, textAlign: 'center', fontWeight: '500' },
  boldPrimary: { fontWeight: '800', color: '#10B981' }, // Emerald color for healing/health
  footerNote: {
    marginTop: 20,
    padding: 15,
    borderRadius: 15,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  footerText: { textAlign: 'center', lineHeight: 22, fontWeight: '600', fontStyle: 'italic' },
});

export default BojjhangaSuttaCard;