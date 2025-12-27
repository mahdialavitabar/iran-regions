import type { CSSProperties, ReactNode } from 'react';

export interface Province {
  name: string;
  cities: string[];
}

export type SelectorType = 'select' | 'autocomplete' | 'combobox';

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type Variant = 'outlined' | 'filled' | 'underlined' | 'borderless';

export interface ProvinceCity {
  province: string;
  city: string;
}

export interface SelectOption {
  value: string;
  label: string;
  rendered?: ReactNode;
  meta?: unknown;
  disabled?: boolean;
  actualIndex?: number;
}

export interface BaseComponentProps {
  className?: string;
  style?: CSSProperties;
  id?: string;
  'data-testid'?: string;
}

export interface ValidationRule {
  required?: boolean | { message: string };
  custom?: (value: ProvinceCity) => string | null;
}

export interface LoadingConfig {
  component?: ReactNode;
  text?: string;
  spinnerColor?: string;
}

export interface ErrorConfig {
  component?: ReactNode;
  showIcon?: boolean;
  retryButton?: boolean;
  onRetry?: () => void;
}

export interface AccessibilityConfig {
  ariaLabel?: string;
  ariaDescribedBy?: string;
  ariaRequired?: boolean;
  ariaInvalid?: boolean;
}

export interface AnimationConfig {
  duration?: number;
  easing?: string;
  disabled?: boolean;
}

export interface DropdownConfig {
  maxHeight?: number | string;
  placement?: 'top' | 'bottom' | 'auto';
  width?: number | string;
  virtualScroll?: boolean;
  itemHeight?: number;
}

export interface SearchConfig {
  enabled?: boolean;
  debounceMs?: number;
  caseSensitive?: boolean;
  fuzzy?: boolean;
  placeholder?: string;
  minCharacters?: number;
  noResultsText?: string;
}

export interface RTLConfig {
  enabled?: boolean;
  autoDetect?: boolean;
}

export interface KeyboardNavigationConfig {
  enabled?: boolean;
  closeOnEscape?: boolean;
  selectOnEnter?: boolean;
  navigateWithArrows?: boolean;
}

export type Direction = 'ltr' | 'rtl';

export interface IconConfig {
  arrow?: ReactNode;
  clear?: ReactNode;
  search?: ReactNode;
  error?: ReactNode;
  loading?: ReactNode;
}
