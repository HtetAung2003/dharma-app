import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';


const PreceptsGuidelineCard = () => {
  const { colors, fontSize, themeMode } = useTheme();

  const scale = fontSize / 16;
  const dynamicSize = (base: number) => base * scale;

  const GuideSection = ({ title, items, type }: { title: string, items: string[], type: 'do' | 'dont' }) => (
    <View style={styles.section}>
      <Text style={[
        styles.sectionTitle, 
        { color: type === 'do' ? '#10B981' : '#EF4444', fontSize: dynamicSize(18) }
      ]}>
        {title}
      </Text>
      {items.map((item, index) => (
        <View key={index} style={styles.itemRow}>
          <View style={[
            styles.bullet, 
            { backgroundColor: type === 'do' ? '#10B981' : '#EF4444' }
          ]} />
          <Text style={[styles.itemText, { color: colors.textPrimary, fontSize: dynamicSize(16) }]}>
            {item}
          </Text>
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={[styles.titleLine, { backgroundColor: colors.primary }]} />
        <Text style={[styles.mainTitle, { color: colors.primary, fontSize: dynamicSize(17) }]}>
          ဥပုသ်စောင့်တည်ခြင်း လမ်းညွှန်
        </Text>
      </View>

      {/* Main Card */}
      <View style={[
        styles.card, 
        { 
          backgroundColor: themeMode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : '#FFFFFF',
          borderColor: colors.border
        }
      ]}>
        
        <GuideSection 
          title="✅ ဆောင်ရန်အချက်များ (Do's)" 
          type="do"
          items={[
            "နံနက်အာရုဏ်တက်ချိန်တွင် စောစီးစွာ သီလဆောက်တည်ပါ။",
            "တစ်နေ့တာလုံး သတိ၊ သမ္ပဇဉ်ဖြင့် နေထိုင်ပါ။",
            "ဂုဏ်တော်ပွားခြင်း၊ ပရိတ်ရွတ်ခြင်းတို့ဖြင့် အချိန်ကို အသုံးချပါ။",
            "သတ္တဝါအားလုံးကို မေတ္တာပို့သပါ။",
            "စကားနည်းနည်းပြောပြီး တည်ငြိမ်စွာ နေထိုင်ပါ။"
          ]}
        />

        <View style={styles.divider} />

        <GuideSection 
          title="❌ ရှောင်ရန်အချက်များ (Don'ts)" 
          type="dont"
          items={[
            "စိတ်တိုခြင်း၊ ဒေါသထွက်ခြင်းနှင့် ရန်ဖြစ်ခြင်း။",
            "သူတစ်ပါးအပေါ် အတင်းအဖျင်းပြောခြင်း။",
            "မူးယစ်စေသော အရာဝတ္ထုများ သုံးစွဲခြင်း။",
            "ကာမဂုဏ်အာရုံများတွင် အလွန်အမင်း စိတ်ရောက်ခြင်း။",
            "အကျိုးမဲ့သော ဖျော်ဖြေရေးကိစ္စများ (ဥပမာ- ရုပ်ရှင်ကြည့်ခြင်း)။"
          ]}
        />

        {/* Note Box */}
        <View style={[
          styles.noteBox, 
          { backgroundColor: themeMode === 'dark' ? 'rgba(99, 102, 241, 0.1)' : '#EEF2FF' }
        ]}>
          <Text style={[styles.noteText, { color: colors.primary, fontSize: dynamicSize(14) }]}>
            မှတ်ချက်။ ။ ၅ ပါးသီလသည် နေ့စဉ်စောင့်ထိန်းအပ်သော သီလဖြစ်သော်လည်း ဥပုသ်နေ့များတွင် ပိုမိုစင်ကြယ်အောင် ထိန်းသိမ်းခြင်းက အကျိုးကြီးမားစေပါသည်။
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 5,
  },
  titleLine: {
    width: 4,
    height: 18,
    borderRadius: 2,
    marginRight: 10,
  },
  mainTitle: {
    fontWeight: '700',
  },
  card: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 20,
    elevation: 1,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontWeight: '800',
    marginBottom: 12,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
    paddingLeft: 5,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 10,
    marginRight: 12,
  },
  itemText: {
    flex: 1,
    lineHeight: 26,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#E5E7EB',
    opacity: 0.3,
    marginBottom: 20,
  },
  noteBox: {
    padding: 15,
    borderRadius: 15,
    marginTop: 5,
  },
  noteText: {
    lineHeight: 22,
    fontWeight: '600',
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

export default PreceptsGuidelineCard;

