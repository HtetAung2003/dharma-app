import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

const SharingMeritCard = () => {
  const { colors, fontSize, themeMode } = useTheme();

  const scale = fontSize / 16;
  const dynamicSize = (base: number) => base * scale;

  return (
    <View style={styles.container}>
      {/* Title */}
      <View style={styles.titleWrapper}>
        <View style={[styles.titleLine, { backgroundColor: colors.primary }]} />
        <Text style={[styles.subtitle, { color: colors.primary, fontSize: dynamicSize(17) }]}>
          အမျှပေးဝေခြင်း
        </Text>
      </View>

      {/* Script Card */}
      <View style={[
        styles.card, 
        { 
          backgroundColor: themeMode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#FFFFFF',
          borderColor: themeMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : '#E2E8F0'
        }
      ]}>
        {/* တစ်ဦးတည်းရွတ်ဆိုရန် အပိုင်း */}
        <Text style={[
          styles.scriptText, 
          { 
            color: colors.textPrimary, 
            fontSize: dynamicSize(19), 
            lineHeight: dynamicSize(36) 
          }
        ]}>
          ဤသို့ပြုရ၊ မြတ်ပုညကို၊ ကြီးထွားမြင့်ခေါင်၊ မြင့်မိုရ်တောင်ဦး၊ မကကျူးသား၊ ကျေးဇူးအရှင်၊ မွေးမိခင်နှင့်၊ ဖခင်တို့အား၊ ရငြားပါစေ၊ အမျှဝေ၏။{"\n\n"}
          မသွေနိစ္စ၊ ဤကာယကို၊ စောင့်တတ်ပေထ၊ ကိုယ်စောင့်နတ်လည်း၊ မလပ်စေရ၊ ပေးဝေငှ၏။{"\n\n"}
          မိတ္တဆွေဉာ၊ ဆရာသမား၊ ဘိုးဘွားကစ၊ ယမရာဇာ၊ ဒေဝါယက္ခ၊ ဣန္ဒြာသုဗ္ဗာ၊ အာကာသနတ်၊ အထူးမှတ်၍၊ အမြတ်ပုည၊ ကုသလကို၊ ရကြပါစေ၊ အမျှဝေ၏။{"\n\n"}
          သဗ္ဗေသတ္တာ၊ သတ္တဝါဟု၊ နာနာလောက၊ အနန္တတွင်၊ မပြတ်စဉ်ကာ၊ သတ္တဝါသ၊ ဘုံကိုးဝနှင့်၊ ဝိညာဏဋ္ဌိတိ၊ တည်ရှိခုနစ်ပါး၊ များစွာလုံးစုံ၊ ဘုံသုံးဆယ့်တစ်၊ ဖြစ်ဖြစ်သမျှ၊ ဝေနေယျအား၊ အမျှကုသိုလ်၊ ပေးဝေလို၏။{"\n\n"}
          ထိုကုသလ၊ ဤပုညကို၊ အမျှရကြသည် ဖြစ်စေသော်။ ဝသုန္ဓရေ၊ ဤမြေပံသု၊ သီလာထုလည်း၊ သက်သေအမှု တည်စေသော်။
        </Text>

        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        {/* သံပြိုင်ရွတ်ဆိုရန် အပိုင်း */}
        <View style={styles.groupSection}>
          <Text style={[styles.groupLabel, { color: colors.primary, fontSize: dynamicSize(14) }]}>
            (အားလုံး သံပြိုင်ရွတ်ဆိုရန်)
          </Text>
          
          {[1, 2, 3].map((item) => (
            <View key={item} style={styles.sadhuWrapper}>
              <Text style={[
                styles.groupText, 
                { color: colors.textPrimary, fontSize: dynamicSize(19) }
              ]}>
                • အားလုံး ကြားကြားသမျှ၊ အမျှ အမျှ အမျှ၊ ယူတော်မူကြပါကုန်လော။
              </Text>
              <Text style={[
                styles.sadhuText, 
                { color: colors.primary, fontSize: dynamicSize(20) }
              ]}>
                (သာဓု သာဓု သာဓု)
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 30,
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 5,
  },
  titleLine: {
    width: 4,
    height: 18,
    borderRadius: 2,
    marginRight: 10,
  },
  subtitle: {
    fontWeight: '700',
  },
  card: {
    padding: 22,
    borderRadius: 24,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  scriptText: {
    textAlign: 'justify',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    width: '100%',
    marginVertical: 20,
    opacity: 0.2,
  },
  groupSection: {
    alignItems: 'center',
  },
  groupLabel: {
    fontWeight: '700',
    marginBottom: 15,
    textTransform: 'uppercase',
  },
  sadhuWrapper: {
    alignItems: 'center',
    marginBottom: 15,
  },
  groupText: {
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 5,
  },
  sadhuText: {
    fontWeight: '800',
    fontStyle: 'italic',
  },
});

export default SharingMeritCard;

