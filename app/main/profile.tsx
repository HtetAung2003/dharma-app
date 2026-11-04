import { Ionicons } from "@expo/vector-icons";
import { sendPasswordResetEmail, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { auth, db } from "../../services/firebaseConfig";

export default function ProfileScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { user, userData, refreshUserData } = useAuth();
  const [username, setUsername] = useState(userData?.fullName ?? "");
  const [saving, setSaving] = useState(false);

  useEffect(() => setUsername(userData?.fullName ?? ""), [userData?.fullName]);

  const saveUsername = async () => {
    const nextName = username.trim();
    if (!user || !nextName) {
      Alert.alert("အချက်အလက် မပြည့်စုံပါ", "အမည်ကို ဖြည့်သွင်းပါ။");
      return;
    }
    setSaving(true);
    try {
      await updateProfile(user, { displayName: nextName });
      await setDoc(doc(db, "users", user.uid), { fullName: nextName, email: user.email ?? "" }, { merge: true });
      await refreshUserData();
      Alert.alert("အောင်မြင်ပါသည်", "အသုံးပြုသူအမည်ကို ပြင်ဆင်ပြီးပါပြီ။");
    } catch (error) {
      console.warn("Failed to update profile name", error);
      Alert.alert("မအောင်မြင်ပါ", "အသုံးပြုသူအမည်ကို ပြင်ဆင်၍မရပါ။ ထပ်မံကြိုးစားပါ။");
    } finally {
      setSaving(false);
    }
  };

  const sendPasswordReset = async () => {
    if (!user?.email) return;
    try {
      await sendPasswordResetEmail(auth, user.email);
      Alert.alert("အီးမေးလ် ပို့ပြီးပါပြီ", `${user.email} သို့ လျှို့ဝှက်နံပါတ် ပြောင်းရန် လင့်ခ်ပို့ထားပါသည်။`);
    } catch (error) {
      console.warn("Failed to send password reset email", error);
      Alert.alert("မအောင်မြင်ပါ", "လျှို့ဝှက်နံပါတ် ပြောင်းရန် အီးမေးလ်ပို့၍မရပါ။");
    }
  };

  return (
    <LinearGradient colors={[colors.splashBackground, colors.gradientMiddle, colors.gradientEnd]} style={styles.background}>
      <SafeAreaView style={styles.container}>
        <Stack.Screen options={{ headerShown: false }} />
        <View style={styles.header}>
          <TouchableOpacity accessibilityRole="button" accessibilityLabel="Go back to settings" onPress={() => router.canGoBack() ? router.back() : router.replace("/main/settings")} style={[styles.backButton, { borderColor: colors.border }]}>
            <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: colors.textPrimary }]}>My Profile</Text>
        </View>
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>Username</Text>
          <TextInput value={username} onChangeText={setUsername} autoCapitalize="words" placeholder="သင့်အမည်" placeholderTextColor={colors.placeholder} style={[styles.input, { color: colors.textPrimary, borderColor: colors.border, backgroundColor: colors.inputBackground }]} />
          <Text style={[styles.label, { color: colors.textSecondary, marginTop: 20 }]}>Email</Text>
          <Text style={[styles.email, { color: colors.textPrimary }]}>{user?.email ?? "—"}</Text>
          <Text style={[styles.label, { color: colors.textSecondary, marginTop: 20 }]}>Password</Text>
          <Text style={[styles.hint, { color: colors.textSecondary }]}>အီးမေးလ်မှတစ်ဆင့် လုံခြုံစွာ ပြောင်းလဲနိုင်ပါသည်။</Text>
          <TouchableOpacity onPress={sendPasswordReset} style={[styles.secondaryButton, { borderColor: colors.primary }]}>
            <Ionicons name="mail-outline" size={19} color={colors.primary} />
            <Text style={[styles.secondaryButtonText, { color: colors.primary }]}>လျှို့ဝှက်နံပါတ် ပြောင်းရန် လင့်ခ်ပို့ပါ</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity disabled={saving} onPress={saveUsername} style={[styles.saveButton, { backgroundColor: colors.primary }]}>
          <Text style={[styles.saveText, { color: colors.textOnPrimary }]}>{saving ? "သိမ်းဆည်းနေသည်…" : "အမည် သိမ်းဆည်းရန်"}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { flex: 1, padding: 22 },
  header: { flexDirection: "row", alignItems: "center", gap: 12, marginTop: 16, marginBottom: 24 },
  backButton: { width: 42, height: 42, padding: 10, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 27, fontWeight: "700" },
  card: { borderWidth: 1, borderRadius: 16, padding: 18 },
  label: { fontSize: 14, fontWeight: "600", marginBottom: 8 },
  input: { minHeight: 50, borderWidth: 1, borderRadius: 10, paddingHorizontal: 13, fontSize: 16 },
  email: { fontSize: 16, paddingVertical: 8 },
  hint: { fontSize: 13, marginBottom: 12 },
  secondaryButton: { minHeight: 48, borderWidth: 1, borderRadius: 10, paddingHorizontal: 12, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8 },
  secondaryButtonText: { fontSize: 14, fontWeight: "600" },
  saveButton: { minHeight: 52, borderRadius: 12, alignItems: "center", justifyContent: "center", marginTop: 18 },
  saveText: { fontSize: 16, fontWeight: "700" },
});
