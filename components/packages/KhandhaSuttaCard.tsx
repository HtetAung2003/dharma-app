import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

const KhandhaSuttaCard = () => {
  const { colors, fontSize, themeMode } = useTheme();

  const scale = fontSize / 16;
  const dynamicSize = (base: number) => base * scale;

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={[styles.titleLine, { backgroundColor: colors.primary }]} />
        <Text style={[styles.mainTitle, { color: colors.primary, fontSize: dynamicSize(18) }]}>
          ခန္ဓသုတ် (ပါဠိတော်)
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
          ဝိရူပက္ခေဟိ မေ မေတ္တံ၊ မေတ္တံ ဧရာပထေဟိ မေ။{"\n"}
          ဆဗျာပုတ္တေဟိ မေ မေတ္တံ၊ မေတ္တံ ကဏှာဂေါတမေဟိ စ။{"\n\n"}

          အပါဒကေဟိ မေ မေတ္တံ၊ မေတ္တံ ဒွိပါဒကေဟိ မေ။{"\n"}
          စတုပ္ပဒေဟိ မေ မေတ္တံ၊ မေတ္တံ ဗဟုပ္ပဒေဟိ မေ။{"\n\n"}

          မာ မံ အပါဒကော ဟိံသု၊ မာ မံ ဟိံသု ဒွိပါဒကော။{"\n"}
          မာ မံ စတုပ္ပဒေါ ဟိံသု၊ မာ မံ ဟိံသု ဗဟုပ္ပဒေါ။{"\n\n"}

          သဗ္ဗေ သတ္တာ သဗ္ဗေ ပါဏာ၊ သဗ္ဗေ ဘူတာ စ ကေဝလာ။{"\n"}
          သဗ္ဗေ ဘဒြာနိ ပဿန္တု၊ မာ ကဉ္စိ ပါပ မာဂမာ။{"\n\n"}

          အပ္ပမာဏော ဗုဒ္ဓေါ၊ အပ္ပမာဏော ဓမ္မော၊ အပ္ပမာဏော သံဃော။{"\n"}
          ပမာဏဝန္တာနိ သရီသပ္ပါနိ၊ အဟိဝိစ္ဆိကာ သတပဒီ၊{"\n"}
          ဥဏ္ဏနာဘီ သရဗူ၊ မူသိကာ။{"\n\n"}

          ကတာ မေ ရက္ခာ၊ ကတာ မေ ပရိတ္တံ၊ ပဋိက္ကမန္တု ဘူတာနိ။{"\n"}
          သောဟံ နမော ဘဂဝတော၊ နမော သတ္တန္နံ သမ္မာသမ္ဗုဒ္ဓါနံ။
        </Text>

        {/* Footer Protection Note */}
        <View style={[
          styles.footerNote, 
          { backgroundColor: themeMode === 'dark' ? 'rgba(99, 102, 241, 0.1)' : '#F5F3FF' }
        ]}>
          <Text style={[styles.footerText, { color: colors.primary, fontSize: dynamicSize(13) }]}>
            ဘေးအန္တရာယ်ကင်းစင်စေရန်နှင့် အဆိပ်ရှိသတ္တဝါတို့၏ ဘေးမှ ကာကွယ်ရန် ဤခန္ဓသုတ်ကို ရွတ်ဆိုပူဇော်ကြသည်။
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
    lineHeight: 32,
    textAlign: 'center',
    fontWeight: '500',
  },
  footerNote: {
    marginTop: 20,
    padding: 12,
    borderRadius: 12,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.3)',
  },
  footerText: {
    textAlign: 'center',
    lineHeight: 20,
    fontWeight: '600',
    fontStyle: 'italic',
  },
});

export default KhandhaSuttaCard;

