import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const MoraSuttaCard = () => {
  const { colors, fontSize, themeMode } = useTheme();

  const scale = fontSize / 16;
  const dynamicSize = (base: number) => base * scale;

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={[styles.titleLine, { backgroundColor: colors.primary }]} />
        <Text style={[styles.mainTitle, { color: colors.primary, fontSize: dynamicSize(18) }]}>
          မောရသုတ် (ပါဠိတော်)
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
          {/* Morning Section */}
          ဥဒေတယံ စက္ခုမာ ဧကရာဇာ၊{"\n"}
          ဟရိဿဝဏ္ဏော ပဌဝိပ္ပဘာသော။{"\n"}
          တံ တံ နမဿာမိ ဟရိဿဝဏ္ဏံ၊{"\n"}
          ပဌဝိပ္ပဘာသံ၊ တယဇ္ဇ ဂုတ္တာ ဝိဟရေမု ဒိဝသံ။{"\n\n"}

          ယေ ဗြာဟ္မဏာ ဝေဒဂူ သဗ္ဗဓမ္မေ၊{"\n"}
          တေ မေ နမော တေ စ မံ ပါလယန္တု။{"\n"}
          နမတ္ထု ဗုဒ္ဓါနံ နမတ္ထု ဗောဓိယာ၊{"\n"}
          နမော ဝိမုတ္တာနံ နမော ဝိမုတ္တိယာ။{"\n"}
          ဣမံ သော ပရိတ္တံ ကတွာ၊ မောရော စရတိ ဧသနာ။{"\n\n"}

          <View style={styles.divider} />

          {/* Evening Section */}
          အပေတယံ စက္ခုမာ ဧကရာဇာ၊{"\n"}
          ဟရိဿဝဏ္ဏော ပဌဝိပ္ပဘာသော။{"\n"}
          တံ တံ နမဿာမိ ဟရိဿဝဏ္ဏံ၊{"\n"}
          ပဌဝိပ္ပဘာသံ၊ တယဇ္ဇ ဂုတ္တာ ဝိဟရေမု ရတ္တိံ။{"\n\n"}

          ယေ ဗြာဟ္မဏာ ဝေဒဂူ သဗ္ဗဓမ္မေ၊{"\n"}
          တေ မေ နမော တေ စ မံ ပါလယန္တု။{"\n"}
          နမတ္ထု ဗုဒ္ဓါနံ နမတ္ထု ဗောဓိယာ၊{"\n"}
          နမော ဝိမုတ္တာနံ နမော ဝိမုတ္တိယာ။{"\n"}
          ဣမံ သော ပရိတ္တံ ကတွာ၊ မောရော ဝါသမကပ္ပယိ။
        </Text>

        {/* Footer Note */}
        <View style={[
          styles.footerNote, 
          { backgroundColor: themeMode === 'dark' ? 'rgba(99, 102, 241, 0.1)' : '#FFFBEB' }
        ]}>
          <Text style={[styles.footerText, { color: colors.primary, fontSize: dynamicSize(13) }]}>
            အန္တရာယ်ကင်းစေရန်နှင့် အစောင့်အရှောက်ရရှိရန် ဤမောရသုတ်ကို နံနက်နှင့် ညအချိန်များတွင် ရွတ်ဆိုပူဇော်ကြသည်။
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
  divider: {
    height: 1,
    width: '60%',
    backgroundColor: '#E5E7EB',
    alignSelf: 'center',
    marginVertical: 15,
    opacity: 0.5,
  },
  footerNote: {
    marginTop: 20,
    padding: 12,
    borderRadius: 12,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: 'rgba(217, 119, 6, 0.3)', // Amber-ish for Mora Sutta
  },
  footerText: {
    textAlign: 'center',
    lineHeight: 20,
    fontWeight: '600',
    fontStyle: 'italic',
  },
});

export default MoraSuttaCard;

