import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'; // ScrollView ထည့်ထားပါသည်
import { Calendar } from 'react-native-calendars';
import { useTheme } from '@/context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ceMmDateTime } from '@/services/ceMmDateTime';

// Thingyan Month အတွက် နောက်ခံ Overlay
const PataukOverlay = () => (
  <View style={styles.overlayContainer} pointerEvents="none">
     <View style={styles.pataukPlaceholder} />
  </View>
);

const MyanmarBuddhistCalendar = () => {
  const { colors, isDarkMode } = useTheme();
  const [selected, setSelected] = useState(new Date().toISOString().split('T')[0]);

  // ယနေ့ရက်စွဲအတွက် String
  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);

  const getMyanmarDateInfo = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const mdt = new ceMmDateTime(date);
      const sDays = mdt.getSpecialDay();
      const hDays = mdt.getHolidays(date);
      const astroData = mdt.getAstrologyInfo();

      return {
        fullString: mdt.ToMString(),
        myanmarYear: mdt.my,
        myanmarMonth: mdt.mm,
        myanmarDay: mdt.md,
        isFullMoon: mdt.md === 15 && mdt.mp === 0,
        isNewMoon: mdt.md >= 14 && mdt.mp === 2,
        specialDays: sDays,
        holidays: hDays,
        isSabbath: sDays.includes("ဥပုသ်နေ့"),
        astrology: astroData,
        isYatyaza: astroData.includes("ရက်ရာဇာ"),
      };
    } catch (e) {
      return null;
    }
  };

  // ယနေ့အတွက် မြန်မာရက်စွဲ အချက်အလက် (Dashboard အတွက်)
  const todayInfo = useMemo(() => getMyanmarDateInfo(todayStr), [todayStr]);
  
  // ရွေးချယ်ထားသော ရက်စွဲအတွက် အချက်အလက် (Card အတွက်)
  const selectedInfo = useMemo(() => getMyanmarDateInfo(selected), [selected]);
  const isApril = useMemo(() => new Date(selected).getMonth() === 3, [selected]);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]} edges={['top']}>
      
      {/* 🌟 Current Date Dashboard (Calendar အပေါ်တွင် ထည့်သွင်းခြင်း) */}
      <View style={[styles.todayHeader, { backgroundColor: isDarkMode ? '#1E293B' : '#E0F2F1' }]}>
        <Text style={[styles.todayLabel, { color: colors.textSecondary }]}>✨ ယနေ့သည်</Text>
        <Text style={[styles.todayEng, { color: colors.textPrimary }]}>{new Date().toDateString()}</Text>
        {todayInfo && (
          <Text style={[styles.todayMM, { color: isDarkMode ? '#FFD700' : '#00796B' }]}>
            {todayInfo.fullString}
          </Text>
        )}
      </View>

      <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
        
        {isApril && <PataukOverlay />}

        <Calendar
          current={selected}
          onDayPress={day => setSelected(day.dateString)}
          theme={{
            calendarBackground: 'transparent',
            monthTextColor: colors.textPrimary,
            dayTextColor: colors.textPrimary,
            todayTextColor: '#FF5252',
            selectedDayBackgroundColor: isDarkMode ? '#FFD70033' : '#0288D122',
          }}
          dayComponent={({ date, state, onPress }) => {
            if (!date) return <View style={styles.dayBox} />;
            
            const info = getMyanmarDateInfo(date.dateString);
            const isSelected = selected === date.dateString;
            const isHoliday = info && info.holidays.length > 0;
            const isSpecialMoon = info?.isFullMoon || info?.isNewMoon;

            return (
              <TouchableOpacity 
                onPress={() => onPress && onPress(date)}
                style={[
                  styles.dayBox, 
                  isSelected && { backgroundColor: isDarkMode ? '#FFD70044' : '#0288D122', borderRadius: 8 },
                  isHoliday && { backgroundColor: isDarkMode ? '#FF525215' : '#FF525208', borderRadius: 8 }
                ]}
              >
                <Text style={[
                  styles.englishDay, 
                  { color: state === 'disabled' ? colors.textSecondary : colors.textPrimary },
                  isHoliday && { color: '#FF5252' }
                ]}>
                  {String(date.day)}
                </Text>

                {info && (
                  <Text style={[
                    styles.myanmarDay, 
                    { color: isSpecialMoon ? '#E91E63' : colors.textSecondary }
                  ]}>
                    {info.isFullMoon ? 'ပြည့်' : info.isNewMoon ? 'ကွယ်' : String(info.myanmarDay)}
                  </Text>
                )}
                
                <View style={styles.dotRow}>
                  {info?.isFullMoon && <View style={[styles.dot, { backgroundColor: '#FFD700' }]} />}
                  {isHoliday && <View style={[styles.dot, { backgroundColor: '#FF5252' }]} />}
                  {info?.isSabbath && <View style={[styles.dot, { backgroundColor: '#FFD700' }]} />}
                </View>
              </TouchableOpacity>
            );
          }}
        />
        
        {selectedInfo && (
          <View style={[styles.detailCard, { backgroundColor: isDarkMode ? '#1A2634' : '#F5F5F5' }]}>
            <Text style={[styles.detailTitle, { color: colors.textPrimary }]}>
               {selected === todayStr ? "🌟 ယနေ့အတွက် အချက်အလက်" : `📅 ${selected} အချက်အလက်`}
            </Text>
            
            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>မြန်မာရက်စွဲ:</Text>
              <Text style={[styles.infoValue, { color: isDarkMode ? '#FFD700' : '#0288D1' }]}>
                {selectedInfo.fullString}
              </Text>
            </View>

            {selectedInfo.astrology.length > 0 && (
              <View style={styles.specialContainer}>
                <Text style={[styles.astroText, { color: selectedInfo.isYatyaza ? '#FF9100' : '#F44336' }]}>
                  {`📍 ${selectedInfo.astrology.join(', ')} (မင်္ဂလာယူရမည့်ရက်)`}
                </Text>
              </View>
            )}

            {selectedInfo.specialDays.length > 0 && (
              <View style={styles.specialContainer}>
                <Text style={[styles.specialText, { color: isDarkMode ? '#FFD700' : '#0288D1' }]}>
                  {`✨ ${selectedInfo.specialDays.join(', ')}`}
                </Text>
              </View>
            )}

            {selectedInfo.holidays.length > 0 && (
              <View style={styles.specialContainer}>
                <Text style={styles.holidayText}>
                  {`📌 ပိတ်ရက်: ${selectedInfo.holidays.join(', ')}`}
                </Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1, padding: 10, position: 'relative' },
  // Header Style
  todayHeader: {
    margin: 15,
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 3,
    shadowOpacity: 0.1,
  },
  todayLabel: { fontSize: 12, fontWeight: 'bold', marginBottom: 2 },
  todayEng: { fontSize: 14, fontWeight: '500' },
  todayMM: { fontSize: 16, fontWeight: 'bold', marginTop: 4 },
  
  overlayContainer: { ...StyleSheet.absoluteFillObject, zIndex: -1 },
  pataukPlaceholder: {
    width: '100%',
    height: '100%',
    opacity: 0.1,
    backgroundColor: '#FF910022',
  },
  dayBox: { width: 45, height: 50, justifyContent: 'center', alignItems: 'center' },
  englishDay: { fontSize: 15, fontWeight: '500' },
  myanmarDay: { fontSize: 9, marginTop: 1 },
  dotRow: { flexDirection: 'row', marginTop: 2, gap: 2 },
  dot: { width: 4, height: 4, borderRadius: 2 },
  detailCard: { marginTop: 25, padding: 20, borderRadius: 16, marginHorizontal: 10, elevation: 3, marginBottom: 20 },
  detailTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 12 },
  infoRow: { flexDirection: 'column', gap: 4 },
  infoLabel: { fontSize: 14 },
  infoValue: { fontSize: 18, fontWeight: '700' },
  specialContainer: { marginTop: 12, paddingTop: 8, borderTopWidth: 0.5, borderTopColor: 'rgba(128,128,128,0.2)' },
  astroText: { fontSize: 14, fontWeight: '700' },
  specialText: { fontSize: 14, fontWeight: '700' },
  holidayText: { fontSize: 14, fontWeight: '700', color: '#FF5252' },
});

export default MyanmarBuddhistCalendar;