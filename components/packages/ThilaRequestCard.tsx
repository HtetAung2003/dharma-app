import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


const ThilaRequestCard = () => {
  const { colors, fontSize, themeMode } = useTheme();

  const scale = fontSize / 16;
  const dynamicSize = (base: number) => base * scale;

  return (
    <View style={styles.container}>
      {/* Title */}
      <View style={styles.titleWrapper}>
        <View style={[styles.titleLine, { backgroundColor: colors.primary }]} />
        <Text style={[styles.subtitle, { color: colors.primary, fontSize: dynamicSize(16) }]}>
          ငါးပါးသီလ တောင်းခံခြင်း
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
        <Text style={[
          styles.scriptText, 
          { 
            color: colors.textPrimary, 
            fontSize: dynamicSize(20), 
            lineHeight: dynamicSize(36) 
          }
        ]}>
          <Text style={{ fontWeight: '700', color: colors.primary }}>ပထမအကြိမ် -</Text>{"\n"}
          အဟံ ဘန္တေ တိသရဏေန သဟ ပဉ္စသီလံ ဓမ္မံ ယာစာမိ၊ အနုဂ္ဂဟံ ကတွာ သီလံ ဒေထ မေ ဘန္တေ။{"\n\n"}

          <Text style={{ fontWeight: '700', color: colors.primary }}>ဒုတိယမ္ပိ -</Text>{"\n"}
          အဟံ ဘန္တေ တိသရဏေန သဟ ပဉ္စသီလံ ဓမ္မံ ယာစာမိ၊ အနုဂ္ဂဟံ ကတွာ သီလံ ဒေထ မေ ဘန္တေ။{"\n\n"}

          <Text style={{ fontWeight: '700', color: colors.primary }}>တတိယမ္ပိ -</Text>{"\n"}
          အဟံ ဘန္တေ တိသရဏေန သဟ ပဉ္စသီလံ ဓမ္မံ ယာစာမိ၊ အနုဂ္ဂဟံ ကတွာ သီလံ ဒေထ မေ ဘန္တေ။
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
  scriptText: {
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default ThilaRequestCard;

