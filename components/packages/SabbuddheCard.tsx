import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

const SabbuddheCard = () => {
  const { colors, isDarkMode, fontSize } = useTheme();

  const scale = fontSize / 16;
  const dynamicSize = (base: number) => base * scale;

  return (
    <View style={styles.container}>
      {/* Title */}
      <View style={styles.titleWrapper}>
        <View style={[styles.titleLine, { backgroundColor: colors.primary }]} />
        <Text style={[styles.subtitle, { color: colors.primary, fontSize: dynamicSize(17) }]}>
          သဗ္ဗုဒ္ဓေ ဂါထာတော်
        </Text>
      </View>

      {/* Script Card */}
      <View style={[
        styles.card, 
        { 
          backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : '#FFFFFF',
          borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#E2E8F0'
        }
      ]}>
        <Text style={[
          styles.scriptText, 
          { 
            color: colors.textPrimary, 
            fontSize: dynamicSize(21), 
            lineHeight: dynamicSize(40) 
          }
        ]}>
          သဗ္ဗုဒ္ဓေ အဋ္ဌဝီသဉ္စ၊ ဒွါဒသဉ္စ သဟဿကေ။{"\n"}
          ပဉ္စသတ္တ သဟဿာနိ၊ နမာမိ သိရသာမဟံ။{"\n\n"}

          အပ္ပကာ ဝါဠုကာ ဂင်္ဂါ၊ အနန္တာ နိဗ္ဗုတာ ဇိနာ။{"\n"}
          တေသံ ဓမ္မဉ္စ သံဃဉ္စ၊ အာဒရေန နမာမဟံ။{"\n\n"}

          နမက္ကာရာ နုဘာဝေန၊ ဟိတွာ သဗ္ဗေ ဥပဒ္ဒဝေ။{"\n"}
          အနေက အန္တရာယာပိ၊ ဝိနဿန္တု အသေသတော။
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
    padding: 25,
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

export default SabbuddheCard;