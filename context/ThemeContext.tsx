import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, ThemeColors } from '../constants/Theme';

const ThemeContext = createContext<any>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(16); // Default font size


  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const savedTheme = await AsyncStorage.getItem('isDarkMode');
    const savedFontSize = await AsyncStorage.getItem('fontSize');
    if (savedTheme !== null) setIsDarkMode(JSON.parse(savedTheme));
    if (savedFontSize !== null) setFontSize(Number(savedFontSize));
  };

  const toggleTheme = async () => {
    const newValue = !isDarkMode;
    setIsDarkMode(newValue);
    await AsyncStorage.setItem('isDarkMode', JSON.stringify(newValue));
  };

  const updateFontSize = async (size: number) => {
    setFontSize(size);
    await AsyncStorage.setItem('fontSize', size.toString());
  };

  const colors = isDarkMode ? COLORS.dark : COLORS .light;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, colors, fontSize, updateFontSize }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);