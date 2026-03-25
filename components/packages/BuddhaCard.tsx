
import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const BuddhaCard = () => {
  const { colors, isDarkMode, fontSize } = useTheme();

  const scale = fontSize / 16;
  const dynamicSize = (base: number) => base * scale;

  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <View style={[styles.titleLine, { backgroundColor: colors.primary }]} />
        <Text style={[styles.subtitle, { color: colors.primary, fontSize: dynamicSize(17) }]}>
          ဘုရားဂုဏ်တော် (၉) ပါး
        </Text>
      </View>

      <View style={[
        styles.card, 
        { 
          backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : '#FFFFFF',
          borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#E2E8F0'
        }
      ]}>
        <Text style={[styles.scriptText, { color: colors.textPrimary, fontSize: dynamicSize(20) }]}>
          "ဣတိပိ သော ဘဂဝါ အရဟံ၊ သမ္မာသမ္ဗုဒ္ဓေါ၊ ဝိဇ္ဇာစရဏသမ္ပန္နော၊ သုဂတော၊ လောကဝိဒူ၊ အနုတ္တရော ပုရိသဒမ္မသာရထိ၊ သတ္ထာ ဒေဝမနုဿာနံ၊ ဗုဒ္ဓေါ၊ ဘဂဝါ" တိ။
        </Text>
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
    lineHeight: 38,
    fontWeight: '500',
    fontStyle: 'italic',
  },
});

export default BuddhaCard;
