import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

import { LinearGradient } from 'expo-linear-gradient';
import { usePathname, useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const BottomNav = () => {
    const router = useRouter();
    const pathname = usePathname();
  const { colors,fontSize ,isDarkMode} = useTheme();
  const scale = fontSize / 16;
  const dynamicSize = (base: number) => base * scale
    // Active ဖြစ်နေတဲ့ Icon အရောင် (သင်သုံးထားတဲ့ color code အတိုင်း)
    const getIconColor = (path: string) => (pathname === path ? '#1A3C5A' : '#90A4AE');

    return (
         <LinearGradient
                            colors={isDarkMode ? ['#0F0F0F', '#1A1A1A', '#000000'] : ['#F5F9FF', '#E0E7FF', '#FFFFFF']}
                            style={styles.background}
                        >
        <View style={styles.navBar}>
            {/* Home */}
            <TouchableOpacity style={styles.navItem} onPress={() => router.push('/main/dashboard')}> 
                <Ionicons 
                    name={pathname === '/main/dashboard' ? "home" : "home-outline"} 
                    size={24} 
                    color={getIconColor('/')} 
                />
                <Text style={[styles.navText, { color: getIconColor('/') }]}>ပင်မ</Text>
            </TouchableOpacity>

       
           

            {/* Favorite */}
            <TouchableOpacity style={styles.navItem} onPress={() => router.push('/main/favorite')}>
                <Ionicons 
                    name={pathname === '/favorites' ? "heart" : "heart-outline"} 
                    size={24} 
                    color={getIconColor('/favorites')} 
                />
                <Text style={[styles.navText, { color: getIconColor('/favorites') }]}>နှစ်သက်</Text>
            </TouchableOpacity>
    <TouchableOpacity style={styles.navItem} onPress={() => router.push('/main/favorite')}>
                <Ionicons 
                    name={pathname === '/favorites' ? "heart" : "heart-outline"} 
                    size={24} 
                    color={getIconColor('/favorites')} 
                />
          <Text
            style={[
              styles.navText,
              { color: getIconColor("/main/beadCounter") },
            ]}
          >
            ပုတီး
          </Text>
        </TouchableOpacity>
        {/* Plan / Schedule */}
        {/* <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/main/mycalendar")}
        >
          <Ionicons
            name={
              pathname === "/main/mycalendar" ? "calendar" : "calendar-outline"
            }
            size={24}
            color={getIconColor("/main/mycalendar")}
          />
          <Text
            style={[
              styles.navText,
              { color: getIconColor("/main/mycalendar") },
            ]}
          >
            ပြက္ခဒိန်
          </Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/main/analysis")}
        >
          <Ionicons
            name={
              pathname === "/main/analysis"
                ? "stats-chart"
                : "stats-chart-outline"
            }
            size={24}
            color={getIconColor("/main/analysis")}
          />

            {/* Plan / Schedule */}
            <TouchableOpacity style={styles.navItem} onPress={() => router.push('/main/mycalendar')}>
                <Ionicons 
                    name={pathname === '/main/mycalendar' ? "calendar" : "calendar-outline"} 
                    size={24} 
                    color={getIconColor('/main/mycalendar')} 
                />
                <Text style={[styles.navText, { color: getIconColor('/main/mycalendar') }]}>ပြက္ခဒိန်</Text>
            </TouchableOpacity>
               <TouchableOpacity style={styles.navItem} onPress={() => router.push('/main/analysis')}>
                <Ionicons 
                    name={pathname === '/main/analysis' ? "stats-chart" : "stats-chart-outline"} 
                    size={24} 
                    color={getIconColor('/main/analysis')} 
                />
               
                <Text style={[styles.navText, { color: getIconColor('/main/analysis') }]}>စစ်ဆေး</Text>
            </TouchableOpacity>
        </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    background : {
      
    },
    navBar: {
        flexDirection: 'row',
        height: 75, 
   

    
        paddingBottom: 12,
        justifyContent: 'space-around',
        alignItems: 'center',
        // Shadow (iOS/Android)
  
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 10,
    },
    navItem: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    navText: { fontSize: 10, marginTop: 4, fontWeight: '500' },
});

export default BottomNav;