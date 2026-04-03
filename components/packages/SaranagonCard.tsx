import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


const SaranagonCard = () => {
  const { colors, fontSize, themeMode } = useTheme();

  const scale = fontSize / 16;
  const dynamicSize = (base: number) => base * scale;

  return (
    <View style={styles.container}>
      {/* Title */}
      <View style={styles.titleWrapper}>
        <View style={[styles.titleLine, { backgroundColor: colors.primary }]} />
        <Text style={[styles.subtitle, { color: colors.primary, fontSize: dynamicSize(16) }]}>
          သရဏဂုံ သုံးပါး ဆောက်တည်ပုံ
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
        {/* နမောတဿ အပိုင်း */}
        <View style={styles.namoSection}>
          <Text style={[styles.namoText, { color: colors.textPrimary, fontSize: dynamicSize(20) }]}>
            နမော တဿ ဘဂဝတော အရဟတော သမ္မာသမ္ဗုဒ္ဓဿ။ (၃ ကြိမ်)
          </Text>
        </View>

        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        {/* သရဏဂုံ အပိုင်း */}
        <View style={styles.listSection}>
          <Text style={[styles.scriptText, { color: colors.textPrimary, fontSize: dynamicSize(20), lineHeight: dynamicSize(38) }]}>
            ဗုဒ္ဓံ သရဏံ ဂစ္ဆာမိ။{"\n"}
            ဓမ္မံ သရဏံ ဂစ္ဆာမိ။{"\n"}
            သံဃံ သရဏံ ဂစ္ဆာမိ။{"\n\n"}

            ဒုတိယမ္ပိ ဗုဒ္ဓံ သရဏံ ဂစ္ဆာမိ။{"\n"}
            ဒုတိယမ္ပိ ဓမ္မံ သရဏံ ဂစ္ဆာမိ။{"\n"}
            ဒုတိယမ္ပိ သံဃံ သရဏံ ဂစ္ဆာမိ။{"\n\n"}

            တတိယမ္ပိ ဗုဒ္ဓံ သရဏံ ဂစ္ဆာမိ။{"\n"}
            တတိယမ္ပိ ဓမ္မံ သရဏံ ဂစ္ဆာမိ။{"\n"}
            တတိယမ္ပိ သံဃံ သရဏံ ဂစ္ဆာမိ။
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
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
    letterSpacing: 0.5,
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
  namoSection: {
    marginBottom: 15,
  },
  namoText: {
    textAlign: 'center',
    fontWeight: '700',
    fontStyle: 'italic',
  },
  divider: {
    height: 1,
    width: '40%',
    alignSelf: 'center',
    marginVertical: 15,
    opacity: 0.5,
  },
  listSection: {
    marginTop: 5,
  },
  scriptText: {
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default SaranagonCard;

