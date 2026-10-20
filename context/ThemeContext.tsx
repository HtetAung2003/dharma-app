import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, ThemeMode } from '../constants/Theme';

type ThemeContextValue = {
  colors: (typeof COLORS)[ThemeMode];
  fontSize: number;
  themeMode: ThemeMode;
  loading: boolean;
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const [savedThemeMode, legacyTheme, savedFontSize] = await Promise.all([
          AsyncStorage.getItem(THEME_STORAGE_KEY),
          AsyncStorage.getItem(LEGACY_THEME_STORAGE_KEY),
          AsyncStorage.getItem(FONT_SIZE_STORAGE_KEY),
        ]);
        if (savedThemeMode === 'light' || savedThemeMode === 'dark') setThemeModeState(savedThemeMode);
        else if (legacyTheme !== null) setThemeModeState(JSON.parse(legacyTheme) ? 'dark' : 'light');
        if (savedFontSize !== null && Number.isFinite(Number(savedFontSize))) setFontSize(Number(savedFontSize));
      } catch (error) {
        console.warn('Failed to load theme settings', error);
      } finally {
        setLoading(false);
      }
    };
    loadSettings();
  }, []);

  const setThemeMode = async (mode: ThemeMode) => {
    setThemeModeState(mode);
    await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
    await AsyncStorage.removeItem(LEGACY_THEME_STORAGE_KEY);
  };
  const toggleTheme = async () => setThemeMode(themeMode === 'dark' ? 'light' : 'dark');
  const updateFontSize = async (size: number) => {
    setFontSize(size);
    await AsyncStorage.setItem(FONT_SIZE_STORAGE_KEY, size.toString());
  };
  const value = useMemo(() => ({ colors: COLORS[themeMode], fontSize, themeMode, loading, toggleTheme, setThemeMode, updateFontSize }), [fontSize, themeMode, loading]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
