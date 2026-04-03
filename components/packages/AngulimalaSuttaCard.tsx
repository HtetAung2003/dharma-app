import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const AngulimalaSuttaCard = () => {
  const { colors, fontSize, themeMode } = useTheme();

  const scale = fontSize / 16;
  const dynamicSize = (base: number) => base * scale;

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={[styles.titleLine, { backgroundColor: colors.primary }]} />
        <Text style={[styles.mainTitle, { color: colors.primary, fontSize: dynamicSize(18) }]}>
          အင်္ဂုလိမာလသုတ် (ပါဠိတော်)
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
        <Text style={[styles.suttaText, { color: colors.textPrimary, fontSize: dynamicSize(17.5) }]}>
          ယတောဟံ ဘဂိနိ အရိယာယ ဇာတိယာ ဇာတော၊{"\n"}
          နာဘိဇာနာမိ သဉ္စိစ္စ ပါဏံ ဇီဝိတာ ဝေါရောပေတာ။{"\n\n"}
          <Text style={{ fontWeight: '800', color: colors.primary }}>
            ဧတေန သစ္စဝဇ္ဇေန သောတ္ထိ တေ ဟောတု သောတ္ထိ ဂဗ္ဘဿ။
          </Text>
        </Text>

        {/* Footer Note */}
        <View style={[
          styles.footerNote, 
          { backgroundColor: themeMode === 'dark' ? 'rgba(99, 102, 241, 0.1)' : '#FDF2F8' }
        ]}>
          <Text style={[styles.footerText, { color: colors.primary, fontSize: dynamicSize(13) }]}>
            ကိုယ်ဝန်ဆောင်မိခင်များ ဘေးအန္တရာယ်ကင်းရှင်းစွာ သားဖွားနိုင်စေရန်နှင့် သစ္စာဆိုခြင်း၏ အကျိုးအာနိသင်ကို ရရှိစေရန် ဤအင်္ဂုလိမာလသုတ်ကို ရွတ်ဆိုပူဇော်ကြသည်။
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
    padding: 30,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  suttaText: {
    lineHeight: 36,
    textAlign: 'center',
    fontWeight: '500',
  },
  footerNote: {
    marginTop: 25,
    padding: 15,
    borderRadius: 15,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: 'rgba(219, 39, 119, 0.3)', // Soft pinkish border
  },
  footerText: { textAlign: 'center', lineHeight: 22, fontWeight: '600', fontStyle: 'italic' },
});

export default AngulimalaSuttaCard;

