import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const AnattaLakkhanaSuttaCard = () => {
  const { colors, isDarkMode, fontSize } = useTheme();

  const scale = fontSize / 16;
  const dynamicSize = (base: number) => base * scale;

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={[styles.titleLine, { backgroundColor: colors.primary }]} />
        <Text style={[styles.mainTitle, { color: colors.primary, fontSize: dynamicSize(18) }]}>
          အနတ္တလက္ခဏသုတ် (အနှစ်ချုပ်)
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
        {/* Intro Context */}
        <View style={styles.contextBox}>
          <Text style={[styles.contextText, { color: colors.secondary, fontSize: dynamicSize(14) }]}>
            ပဉ္စဝဂ္ဂီ ၅ ဦးကို ရဟန္တာဖြစ်စေခဲ့သော "ငါ၊ ငါ့ဥစ္စာ မဟုတ်ကြောင်း" ကို ဟောကြားသည့် တရားတော်။
          </Text>
        </View>

        <Text style={[styles.suttaText, { color: colors.textPrimary, fontSize: dynamicSize(16.5) }]}>
          {/* Logic of Anatta */}
          ရူပံ ဘိက္ခဝေ <Text style={styles.anattaHighlight}>အနတ္တာ</Text>၊{"\n"}
          ရူပံ စ ဟိဒံ ဘိက္ခဝေ အတ္တာ အဘဝိဿ၊{"\n"}
          နယိဒံ ရူပံ အာဗာဓာယ သံဝတ္တေယျ။{"\n\n"}

          {/* The Five Aggregates */}
          <Text style={styles.fiveAggregates}>
            ဝေဒနာ အနတ္တာ၊ သညာ အနတ္တာ၊{"\n"}
            သင်္ခါရာ အနတ္တာ၊ ဝိညာဏံ အနတ္တာ။
          </Text>
          {"\n\n"}

      

          {/* Core Insight Equation */}
          <Text style={[styles.conclusion, { color: colors.primary }]}>
            ယံ အနိစ္စံ တံ ဒုက္ခံ၊{"\n"}
            ယံ ဒုက္ခံ တဒနတ္တာ။
          </Text>
        </Text>

        {/* Footer Note */}
        <View style={[
          styles.footerNote, 
          { backgroundColor: isDarkMode ? 'rgba(99, 102, 241, 0.1)' : '#F8FAFC' }
        ]}>
          <Text style={[styles.footerText, { color: colors.textSecondary, fontSize: dynamicSize(13) }]}>
            မမြဲခြင်း (အနိစ္စ) ဖြစ်သောကြောင့် ဆင်းရဲ (ဒုက္ခ) ဖြစ်၏၊ ဆင်းရဲခြင်းဖြစ်သောကြောင့် ငါ မဟုတ် (အနတ္တ) ဟု ဆင်ခြင်ရန် ဖြစ်သည်။
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
  contextBox: { marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#f0f0f0', paddingBottom: 10 },
  contextText: { fontStyle: 'italic', lineHeight: 22 },
  suttaText: { lineHeight: 32, textAlign: 'center', fontWeight: '500' },
  anattaHighlight: { fontWeight: '800', color: '#6366F1' },
  fiveAggregates: { fontWeight: '700' },
  divider: {
    height: 1,
    width: '40%',
    backgroundColor: '#E5E7EB',
    alignSelf: 'center',
    marginVertical: 15,
    opacity: 0.5,
  },
  conclusion: { fontWeight: '800', fontSize: 18, lineHeight: 34 },
  footerNote: {
    marginTop: 20,
    padding: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  footerText: { textAlign: 'center', lineHeight: 20, fontWeight: '600' },
});

export default AnattaLakkhanaSuttaCard;