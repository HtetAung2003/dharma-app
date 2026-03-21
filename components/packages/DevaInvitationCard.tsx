import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

const DevaInvitationCard = () => {
  const { colors, isDarkMode, fontSize } = useTheme();

  const scale = fontSize / 16;
  const dynamicSize = (base: number) => base * scale;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerWrapper}>
        <View style={[styles.titleLine, { backgroundColor: '#8B5CF6' }]} />
        <Text style={[styles.subtitle, { color: '#8B5CF6', fontSize: dynamicSize(17) }]}>
          နတ်ပင့်ဂါထာ (ပါဠိတော်)
        </Text>
      </View>

      {/* Main Card */}
      <View style={[
        styles.card, 
        { 
          backgroundColor: isDarkMode ? 'rgba(139, 92, 246, 0.05)' : '#F5F3FF',
          borderColor: isDarkMode ? 'rgba(139, 92, 246, 0.2)' : '#EDE9FE'
        }
      ]}>
        <Text style={[
          styles.scriptText, 
          { 
            color: colors.textPrimary, 
            fontSize: dynamicSize(20),
            lineHeight: dynamicSize(38)
          }
        ]}>
          "သမန္တာ စက္ကဝါဠေသု၊{"\n"}
          အတြာဂစ္ဆန္တု ဒေဝတာ။{"\n"}
          သဒ္ဓမ္မံ မုနိရာဇဿ၊{"\n"}
          သုဏန္တု သဂ္ဂမောက္ခဒံ။"
        </Text>

        <View style={[styles.divider, { backgroundColor: '#8B5CF6', opacity: 0.2 }]} />

        <Text style={[styles.meaningText, { color: colors.textSecondary, fontSize: dynamicSize(15) }]}>
          အနန္တစကြာဝဠာရှိ နတ်ဗြဟ္မာအပေါင်းတို့သည် ဤနေရာသို့ လာရောက်ကြပါကုန်လော့။ နတ်ရွာနိဗ္ဗာန်ကို ပေးစွမ်းနိုင်သော မြတ်စွာဘုရား၏ တရားတော်ကို နာယူကြပါကုန်လော့။
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
    padding: 25,
    borderRadius: 24,
    borderWidth: 1,
    elevation: 2,
  },
  scriptText: {
    textAlign: 'center',
    fontWeight: '600',
    fontStyle: 'italic',
  },
  divider: {
    height: 1,
    width: '40%',
    alignSelf: 'center',
    marginVertical: 15,
  },
  meaningText: {
    textAlign: 'center',
    lineHeight: 24,
    fontStyle: 'normal',
  },
});

export default DevaInvitationCard;