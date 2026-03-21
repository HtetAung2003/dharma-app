import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

const PatthanaCard = () => {
  const { colors, isDarkMode, fontSize } = useTheme();

  const scale = fontSize / 16;
  const dynamicSize = (base: number) => base * scale;

  const patthanaItems = [
    "၁။ ဟေတုပစ္စယော", "၂။ အာရမ္မဏပစ္စယော", "၃။ အဓိပတိပစ္စယော",
    "၄။ အနန္တရပစ္စယော", "၅။ သမနန္တရပစ္စယော", "၆။ သဟဇာတပစ္စယော",
    "၇။ အညမညပစ္စယော", "၈။ နိဿယပစ္စယော", "၉။ ဥပနိဿယပစ္စယော",
    "၁၀။ ပုရေဇာတပစ္စယော", "၁၁။ ပစ္ဆာဇာတပစ္စယော", "၁၂။ အာသေဝနပစ္စယော",
    "၁၃။ ကမ္မပစ္စယော", "၁၄။ ဝိပါကပစ္စယော", "၁၅။ အာဟာရပစ္စယော",
    "၁၆။ ဣန္ဒြိယပစ္စယော", "၁၇။ ဈာနပစ္စယော", "၁၈။ မဂ္ဂပစ္စယော",
    "၁၉။ သမ္ပယုတ္တပစ္စယော", "၂၀။ ဝိပယုတ္တပစ္စယော", "၂၁။ အတ္ထိပစ္စယော",
    "၂၂။ နတ္ထိပစ္စယော", "၂၃။ ဝိဂတပစ္စယော", "၂၄။ အဝိဂတပစ္စယော"
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerWrapper}>
        <View style={[styles.titleLine, { backgroundColor: '#B45309' }]} />
        <Text style={[styles.subtitle, { color: '#B45309', fontSize: dynamicSize(17) }]}>
          ပဋ္ဌာန်း ၂၄ ပစ္စည်း (ပစ္စယုဒ္ဒေသ)
        </Text>
      </View>

      {/* Main Card */}
      <View style={[
        styles.card, 
        { 
          backgroundColor: isDarkMode ? 'rgba(180, 83, 9, 0.05)' : '#FFFBEB',
          borderColor: isDarkMode ? 'rgba(180, 83, 9, 0.2)' : '#FEF3C7'
        }
      ]}>
        <View style={styles.gridContainer}>
          {patthanaItems.map((item, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={[
                styles.itemText, 
                { 
                  color: colors.textPrimary, 
                  fontSize: dynamicSize(18),
                  lineHeight: dynamicSize(34)
                }
              ]}>
                {item}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.footerDivider} />
        <Text style={[styles.footerText, { color: colors.textSecondary, fontSize: dynamicSize(14) }]}>
          ပဋ္ဌာန်း ၂၄ ပစ္စည်း ပါဠိတော် ပြီး၏။
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 25,
  },
  headerWrapper: {
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
  gridContainer: {
    flexDirection: 'column',
  },
  listItem: {
    paddingVertical: 2,
  },
  itemText: {
    fontWeight: '500',
  },
  footerDivider: {
    height: 1,
    backgroundColor: '#B45309',
    opacity: 0.1,
    marginVertical: 15,
  },
  footerText: {
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default PatthanaCard;