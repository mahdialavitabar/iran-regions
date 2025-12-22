export interface ThemeConfig {
  colors: {
    primary: string;
    primaryHover: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    borderHover: string;
    borderFocus: string;
    error: string;
    disabled: string;
    shadow: string;
    focusRing: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
  };
  fontSize: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  transitions: {
    fast: string;
    normal: string;
    slow: string;
  };
}

export const lightTheme: ThemeConfig = {
  colors: {
    primary: '#3b82f6',
    primaryHover: '#2563eb',
    background: '#ffffff',
    surface: '#f8fafc',
    text: '#1f2937',
    textSecondary: '#6b7280',
    border: '#e5e7eb',
    borderHover: '#3b82f6',
    borderFocus: '#3b82f6',
    error: '#ef4444',
    disabled: '#9ca3af',
    shadow: 'rgba(0, 0, 0, 0.1)',
    focusRing: 'rgba(59, 130, 246, 0.2)',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
  },
  transitions: {
    fast: '150ms ease',
    normal: '200ms ease',
    slow: '300ms ease',
  },
};

export const darkTheme: ThemeConfig = {
  colors: {
    primary: '#60a5fa',
    primaryHover: '#3b82f6',
    background: '#0f172a',
    surface: '#1e293b',
    text: '#f1f5f9',
    textSecondary: '#94a3b8',
    border: '#334155',
    borderHover: '#60a5fa',
    borderFocus: '#60a5fa',
    error: '#f87171',
    disabled: '#64748b',
    shadow: 'rgba(0, 0, 0, 0.3)',
    focusRing: 'rgba(96, 165, 250, 0.3)',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
  },
  transitions: {
    fast: '150ms ease',
    normal: '200ms ease',
    slow: '300ms ease',
  },
};

export const modernTheme: ThemeConfig = {
  colors: {
    primary: '#8b5cf6',
    primaryHover: '#7c3aed',
    background: '#ffffff',
    surface: '#faf5ff',
    text: '#1f2937',
    textSecondary: '#6b7280',
    border: '#e9d5ff',
    borderHover: '#8b5cf6',
    borderFocus: '#8b5cf6',
    error: '#f43f5e',
    disabled: '#9ca3af',
    shadow: 'rgba(139, 92, 246, 0.1)',
    focusRing: 'rgba(139, 92, 246, 0.2)',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
  },
  borderRadius: {
    sm: '0.375rem',
    md: '0.75rem',
    lg: '1rem',
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
  },
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    normal: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

export const minimalTheme: ThemeConfig = {
  colors: {
    primary: '#000000',
    primaryHover: '#374151',
    background: '#ffffff',
    surface: '#f9fafb',
    text: '#111827',
    textSecondary: '#6b7280',
    border: '#d1d5db',
    borderHover: '#000000',
    borderFocus: '#000000',
    error: '#dc2626',
    disabled: '#9ca3af',
    shadow: 'rgba(0, 0, 0, 0.05)',
    focusRing: 'rgba(0, 0, 0, 0.1)',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
  },
  borderRadius: {
    sm: '0.125rem',
    md: '0.25rem',
    lg: '0.375rem',
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
  },
  transitions: {
    fast: '100ms ease',
    normal: '150ms ease',
    slow: '200ms ease',
  },
};

export const oceanTheme: ThemeConfig = {
  colors: {
    primary: '#0891b2',
    primaryHover: '#0e7490',
    background: '#ffffff',
    surface: '#ecfeff',
    text: '#164e63',
    textSecondary: '#0e7490',
    border: '#a5f3fc',
    borderHover: '#0891b2',
    borderFocus: '#0891b2',
    error: '#ef4444',
    disabled: '#9ca3af',
    shadow: 'rgba(8, 145, 178, 0.1)',
    focusRing: 'rgba(8, 145, 178, 0.2)',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
  },
  transitions: {
    fast: '150ms ease',
    normal: '200ms ease',
    slow: '300ms ease',
  },
};

export const themes = {
  light: lightTheme,
  dark: darkTheme,
  modern: modernTheme,
  minimal: minimalTheme,
  ocean: oceanTheme,
};

export type ThemeName = keyof typeof themes;

export function applyTheme(
  theme: ThemeConfig | ThemeName,
  element?: HTMLElement,
): void {
  const root = element || document.documentElement;
  const themeConfig = typeof theme === 'string' ? themes[theme] : theme;

  Object.entries(themeConfig.colors).forEach(([key, value]) => {
    root.style.setProperty(`--iran-regions-color-${key}`, value);
  });

  Object.entries(themeConfig.spacing).forEach(([key, value]) => {
    root.style.setProperty(`--iran-regions-spacing-${key}`, value);
  });

  Object.entries(themeConfig.borderRadius).forEach(([key, value]) => {
    root.style.setProperty(`--iran-regions-radius-${key}`, value);
  });

  Object.entries(themeConfig.fontSize).forEach(([key, value]) => {
    root.style.setProperty(`--iran-regions-font-${key}`, value);
  });

  Object.entries(themeConfig.transitions).forEach(([key, value]) => {
    root.style.setProperty(`--iran-regions-transition-${key}`, value);
  });
}
