import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DevaReturnSection = () => {
  const title = "နတ်အမျှဝေ ဂါထာ";
  const stanza = [
    "ဧတ္တာဝတာ စ အမှေဟိ၊",
    "သမ္ဘတံ ပုညသမ္ပဒံ။",
    "သဗ္ဗေ ဒေဝါနုမောဒန္တု၊",
    "သဗ္ဗသမ္ပတ္တိ သိဒ္ဓိယာ။"
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{title}</Text>
      <View style={styles.contentBox}>
        {stanza.map((line, index) => (
          <Text key={index} style={styles.stanzaText}>
            {line}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8e44ad', // Spiritual purple tone
    marginBottom: 10,
    textAlign: 'center',
  },
  contentBox: {
    alignItems: 'center',
  },
  stanzaText: {
    fontSize: 16,
    lineHeight: 28,
    color: '#2c3e50',
    textAlign: 'center',
    fontFamily: 'Pyidaungsu', // မြန်မာဖောင့် သီးသန့်ရှိရင် ထည့်ပေးပါ
  },
});

export default DevaReturnSection;