import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

const DirectionalMettaCard = () => {
  const { colors, isDarkMode, fontSize } = useTheme();

  const scale = fontSize / 16;
  const dynamicSize = (base: number) => base * scale;

  const directions = [
    { id: 1, name: "အရှေ့အရပ်၌ရှိသော", target: "အနန္တစကြာဝဠာ အနန္တသတ္တဝါတို့" },
    { id: 2, name: "အနောက်အရပ်၌ရှိသော", target: "အနန္တစကြာဝဠာ အနန္တသတ္တဝါတို့" },
    { id: 3, name: "မြောက်အရပ်၌ရှိသော", target: "အနန္တစကြာဝဠာ အနန္တသတ္တဝါတို့" },
    { id: 4, name: "တောင်အရပ်၌ရှိသော", target: "အနန္တစကြာဝဠာ အနန္တသတ္တဝါတို့" },
    { id: 5, name: "အနောက်တောင်ထောင့်အရပ်၌ရှိသော", target: "အနန္တစကြာဝဠာ အနန္တသတ္တဝါတို့" },
    { id: 6, name: "အနောက်မြောက်ထောင့်အရပ်၌ရှိသော", target: "အနန္တစကြာဝဠာ အနန္တသတ္တဝါတို့" },
    { id: 7, name: "အရှေ့မြောက်ထောင့်အရပ်၌ရှိသော", target: "အနန္တစကြာဝဠာ အနန္တသတ္တဝါတို့" },
    { id: 8, name: "အရှေ့တောင်ထောင့်အရပ်၌ရှိသော", target: "အနန္တစကြာဝဠာ အနန္တသတ္တဝါတို့" },
    { id: 9, name: "အောက်အရပ်၌ရှိသော", target: "ထက်ဝန်းကျင် အနန္တစကြာဝဠာ အပါယ်ဘုံသား အနန္တသတ္တဝါတို့" },
    { id: 10, name: "အထက်အရပ်၌ရှိသော", target: "ထက်ဝန်းကျင် အနန္တစကြာဝဠာ အနန္တနတ်ဗြဟ္မာတို့" },
  ];

  return (
    <View style={styles.container}>
      {/* Title Header */}
      <View style={styles.titleWrapper}>
        <View style={[styles.titleLine, { backgroundColor: colors.primary }]} />
        <Text style={[styles.subtitle, { color: colors.primary, fontSize: dynamicSize(17) }]}>
          ဒိသာဖရဏ မေတ္တာပွားပုံ
        </Text>
      </View>

      {/* Main Content Card */}
      <View style={[
        styles.card, 
        { 
          backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : '#FFFFFF',
          borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#E2E8F0'
        }
      ]}>
        {directions.map((dir, index) => (
          <View key={dir.id} style={styles.directionSection}>
            <Text style={[styles.directionHeader, { color: colors.primary, fontSize: dynamicSize(18) }]}>
              {dir.id}။ {dir.name} {dir.target}-
            </Text>
            
            <View style={styles.prayerList}>
              <Text style={[styles.prayerText, { color: colors.textPrimary, fontSize: dynamicSize(19) }]}>
                • ဘေးရန်ခပ်သိမ်း ငြိမ်းကြပါစေ။{"\n"}
                • ဒေါသခပ်သိမ်း ငြိမ်းကြပါစေ။{"\n"}
                • ဆင်းရဲခပ်သိမ်း ငြိမ်းကြပါစေ။{"\n"}
                • နှလုံးစိတ်ဝမ်း အေးချမ်းကြပါစေ။
              </Text>
            </View>
            
            {index !== directions.length - 1 && (
              <View style={[styles.divider, { backgroundColor: colors.border }]} />
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 25,
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
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    elevation: 2,
  },
  directionSection: {
    marginVertical: 10,
  },
  directionHeader: {
    fontWeight: '700',
    marginBottom: 8,
    lineHeight: 28,
  },
  prayerList: {
    paddingLeft: 10,
  },
  prayerText: {
    lineHeight: 34,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    width: '100%',
    marginTop: 20,
    marginBottom: 10,
    opacity: 0.15,
  },
});

export default DirectionalMettaCard;