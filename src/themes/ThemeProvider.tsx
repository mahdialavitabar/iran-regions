import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { ThemeConfig, ThemeName, applyTheme, themes } from './index';

interface ThemeContextValue {
  theme: ThemeConfig | ThemeName;
  setTheme: (theme: ThemeConfig | ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export interface ThemeProviderProps {
  children: React.ReactNode;
  theme?: ThemeConfig | ThemeName;
  defaultTheme?: ThemeName;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  theme,
  defaultTheme = 'light',
}) => {
  const [currentTheme, setCurrentTheme] = React.useState<
    ThemeConfig | ThemeName
  >(theme || defaultTheme);

  useEffect(() => {
    if (theme) {
      setCurrentTheme(theme);
    }
  }, [theme]);

  useEffect(() => {
    applyTheme(currentTheme);
  }, [currentTheme]);

  const value = useMemo(
    () => ({
      theme: currentTheme,
      setTheme: setCurrentTheme,
    }),
    [currentTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export { themes, type ThemeConfig, type ThemeName };
