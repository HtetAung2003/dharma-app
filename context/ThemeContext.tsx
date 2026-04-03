import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, ThemeMode } from '../constants/Theme';

type ThemeContextValue = {
  colors: (typeof COLORS)[ThemeMode];
  fontSize: number;
  themeMode: ThemeMode;
  toggleTheme: () => Promise<void>;
  setThemeMode: (mode: ThemeMode) => Promise<void>;
  updateFontSize: (size: number) => Promise<void>;
};

const THEME_STORAGE_KEY = 'themeMode';
const LEGACY_THEME_STORAGE_KEY = 'isDarkMode';
const FONT_SIZE_STORAGE_KEY = 'fontSize';

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>('light');
  const [fontSize, setFontSize] = useState(16);

  useEffect(() => {
    const loadSettings = async () => {
      const savedThemeMode = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      const legacyTheme = await AsyncStorage.getItem(LEGACY_THEME_STORAGE_KEY);
      const savedFontSize = await AsyncStorage.getItem(FONT_SIZE_STORAGE_KEY);

      if (savedThemeMode === 'light' || savedThemeMode === 'dark') {
        setThemeModeState(savedThemeMode);
      } else if (legacyTheme !== null) {
        setThemeModeState(JSON.parse(legacyTheme) ? 'dark' : 'light');
      }

      if (savedFontSize !== null) {
        setFontSize(Number(savedFontSize));
      }
    };

    loadSettings();
  }, []);

  const setThemeMode = async (mode: ThemeMode) => {
    setThemeModeState(mode);
    await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
    await AsyncStorage.removeItem(LEGACY_THEME_STORAGE_KEY);
  };

  const toggleTheme = async () => {
    const nextMode = themeMode === 'dark' ? 'light' : 'dark';
    await setThemeMode(nextMode);
  };

  const updateFontSize = async (size: number) => {
    setFontSize(size);
    await AsyncStorage.setItem(FONT_SIZE_STORAGE_KEY, size.toString());
  };

  const value = useMemo(
    () => ({
      colors: COLORS[themeMode],
      fontSize,
      themeMode,
      toggleTheme,
      setThemeMode,
      updateFontSize,
    }),
    [fontSize, themeMode]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }

  return context;
};
