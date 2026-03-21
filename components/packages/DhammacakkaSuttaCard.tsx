import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const DhammacakkaSuttaCard = () => {
  const { colors, isDarkMode, fontSize } = useTheme();

  const scale = fontSize / 16;
  const dynamicSize = (base: number) => base * scale;

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={[styles.titleLine, { backgroundColor: colors.primary }]} />
        <Text style={[styles.mainTitle, { color: colors.primary, fontSize: dynamicSize(18) }]}>
          ဓမ္မစကြာ (ပါဠိတော် - အနှစ်ချုပ်)
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
        <Text style={[styles.suttaText, { color: colors.textPrimary, fontSize: dynamicSize(16.5) }]}>
          {/* Introductory Verse */}
          <Text style={{ fontStyle: 'italic' }}>
            အနုတ္တရံ သဗ္ဗလောကသ္မိံ၊ ဓမ္မစက္ကံ ပဝတ္တိတံ။{"\n"}
            ယတ္ထ ဓမ္မော စ ဝိနယော၊ သံဃော စ သုပ္ပတိဋ္ဌိတော။
          </Text>
          {"\n\n"}

          {/* Two Extremes */}
          ဒွေမေ ဘိက္ခဝေ အန္တာ ပဗ္ဗဇိတေန န သေဝိတဗ္ဗာ။{"\n"}
          ယော စာယံ <Text style={styles.highlightRed}>ကာမေသု ကာမသုခလ္လိကာနုယောဂေါ</Text>၊ ဟီနော ဂမ္မော ပေါထုဇ္ဇနိကော အနရိယော အနတ္ထသံဟိတော။{"\n"}
          ယော စာယံ <Text style={styles.highlightRed}>အတ္တကိလမထာနုယောဂေါ</Text>၊ ဒုက္ခော အနရိယော အနတ္ထသံဟိတော။{"\n\n"}

          <View style={styles.divider} />

          {/* Middle Way */}
          ဧတေ တေ ဘိက္ခဝေ ဥဘော အန္တေ အနုပဂမ္မ <Text style={styles.highlightGold}>မဇ္ဈိမာ ပဋိပဒါ</Text> သထာဂတေန အဘိသမ္ဗုဒ္ဓါ၊ စက္ခုကရဏီ ဉာဏကရဏီ ဥပသမာယ အဘိညာယ သမ္ဗောဓာယ နိဗ္ဗာနာယ သံဝတ္တတိ။{"\n\n"}

          ကတမာ စ သာ ဘိက္ခဝေ မဇ္ဈိမာ ပဋိပဒါ သထာဂတေန အဘိသမ္ဗုဒ္ဓါ၊ စက္ခုကရဏီ ဉာဏကရဏီ ဥပသမာယ အဘိညာယ သမ္ဗောဓာယ နိဗ္ဗာနာယ သံဝတ္တတိ။{"\n\n"}

          {/* Noble Eightfold Path */}
          <Text style={[styles.pathTitle, { color: colors.primary }]}>
            အယမေဝ အရိယော အဋ္ဌင်္ဂိကော မဂ္ဂေါ။
          </Text>
          {"\n"}
          သေယျထိဒံ -{"\n"}
          <View style={styles.pathGrid}>
            <Text style={[styles.pathItem, { color: colors.textPrimary }]}>
              သမ္မာဒိဋ္ဌိ၊ သမ္မာသင်္ကပ္ပော၊{"\n"}
              သမ္မာဝါစာ၊ သမ္မာကမ္မန္တော၊{"\n"}
              သမ္မာအာဇီဝေါ၊ သမ္မာဝါယာမော၊{"\n"}
              သမ္မာသတိ၊ သမ္မာသမာဓိ။
            </Text>
          </View>
        </Text>

        {/* Footer Note */}
        <View style={[
          styles.noteBox, 
          { backgroundColor: isDarkMode ? 'rgba(217, 119, 6, 0.1)' : '#FFFBEB' }
        ]}>
          <Text style={[styles.noteText, { color: '#B45309', fontSize: dynamicSize(13) }]}>
            မှတ်ချက်။ ။ ဤတရားတော်သည် အစွန်းနှစ်ပါးကို ရှောင်ကြဉ်၍ မဇ္ဈိမာပဋိပဒါ လမ်းစဉ်ကို လျှောက်လှမ်းရန် လမ်းညွှန်သော မြတ်စွာဘုရား၏ ပထမဦးဆုံးသော တရားတော်ဖြစ်သည်။
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
  suttaText: { lineHeight: 32, textAlign: 'justify', fontWeight: '500' },
  highlightRed: { color: '#EF4444', fontWeight: '700' },
  highlightGold: { color: '#D97706', fontWeight: '800' },
  pathTitle: { fontWeight: '800', textAlign: 'center', marginTop: 10 },
  pathGrid: { marginTop: 5, padding: 10, alignItems: 'center' },
  pathItem: { textAlign: 'center', lineHeight: 28, fontWeight: '700' },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#E5E7EB',
    marginVertical: 15,
    opacity: 0.2,
  },
  noteBox: { padding: 15, borderRadius: 15, marginTop: 20, borderLeftWidth: 4, borderLeftColor: '#D97706' },
  noteText: { lineHeight: 20, fontWeight: '600', fontStyle: 'italic' },
});

export default DhammacakkaSuttaCard;