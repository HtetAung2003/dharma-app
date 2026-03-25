import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View as RNView, Alert, ActivityIndicator } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { View } from 'moti'; 
import * as Haptics from 'expo-haptics';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

// Theme & Firebase Imports
import { useTheme } from '../../context/ThemeContext';
import { SIZES } from '../../constants/Theme';
import { auth, db } from '../../services/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const RegisterScreen = () => {
  const router = useRouter();
  const { colors, isDarkMode, fontSize } = useTheme();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert("သတိပေးချက်", "အချက်အလက်အားလုံးကို ဖြည့်စွက်ပေးပါ။");
      return;
    }

    setLoading(true);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    try {
      // ၁။ Firebase Auth ဖြင့် အကောင့်ဆောက်ခြင်း
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // ၂။ Firestore ထဲတွင် User Data သိမ်းဆည်းခြင်း
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        fullName: name,
        email: email,
        createdAt: new Date().toISOString(),
        role: 'user'
      });

      Alert.alert("အောင်မြင်ပါသည်", "အကောင့်အသစ် ဖွင့်လှစ်ပြီးပါပြီ။", [
        { text: "OK", onPress: () => router.replace('/personalization') }
      ]);
    } catch (error: any) {
      let message = "အမှားတစ်ခုရှိနေပါသည်။";
      if (error.code === 'auth/email-already-in-use') message = "ဤအီးမေးလ်မှာ အသုံးပြုပြီးသားဖြစ်နေသည်။";
      if (error.code === 'auth/weak-password') message = "လျှို့ဝှက်နံပါတ်မှာ အားနည်းလွန်းသည်။";
      
      Alert.alert("မအောင်မြင်ပါ", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={isDarkMode ? ['#0F0F0F', '#1A1A1A'] : ['#F5F9FF', '#E0E7FF']} 
      style={styles.background}
    >
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      <SafeAreaView style={{ flex: 1 }}>
        <Stack.Screen options={{ headerTitle: "အကောင့်သစ်ဖွင့်ရန်", headerTransparent: true }} />

        <View 
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={styles.container}
        >
          <View style={styles.formSection}>
            <View style={styles.inputWrapper}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>အမည်</Text>
              <TextInput
                style={[styles.input, { backgroundColor: isDarkMode ? '#1E1E1E' : '#FFF', borderColor: colors.border, color: colors.textPrimary }]}
                placeholder="သင့်အမည် ရိုက်ထည့်ပါ"
                placeholderTextColor="#666"
                value={name}
                onChangeText={setName}
              />
            </View>

            <View style={styles.inputWrapper}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>အီးမေးလ်</Text>
              <TextInput
                style={[styles.input, { backgroundColor: isDarkMode ? '#1E1E1E' : '#FFF', borderColor: colors.border, color: colors.textPrimary }]}
                placeholder="example@email.com"
                placeholderTextColor="#666"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputWrapper}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>လျှို့ဝှက်နံပါတ်</Text>
              <TextInput
                style={[styles.input, { backgroundColor: isDarkMode ? '#1E1E1E' : '#FFF', borderColor: colors.border, color: colors.textPrimary }]}
                placeholder="အနည်းဆုံး ၆ လုံး"
                placeholderTextColor="#666"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <TouchableOpacity 
              style={[styles.mainButton, { backgroundColor: colors.primary }]}
              onPress={handleRegister}
              disabled={loading}
            >
              {loading ? <ActivityIndicator color="#1A3C5A" /> : <Text style={styles.buttonText}>အကောင့်သစ်ယူမည်</Text>}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 20 }}>
              <Text style={{ textAlign: 'center', color: colors.textSecondary }}>
                အကောင့်ရှိပြီးသားလား? <Text style={{ color: colors.primary, fontWeight: 'bold' }}>ဝင်ရန်</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  formSection: { rowGap: 15 },
  inputWrapper: { rowGap: 8 },
  label: { fontSize: 14, fontWeight: '600', marginLeft: 4 },
  input: { height: 55, borderRadius: SIZES.radius, paddingHorizontal: 16, fontSize: 16, borderWidth: 1 },
  mainButton: { height: 55, borderRadius: SIZES.radius, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  buttonText: { fontSize: 16, fontWeight: 'bold', color: '#1A3C5A' }
});

export default RegisterScreen;