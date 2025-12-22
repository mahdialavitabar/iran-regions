import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import FlexibleInput from './flexibleSelect';
import './ProvinceCitySelect.css';
import type {
  AccessibilityConfig,
  AnimationConfig,
  Direction,
  DropdownConfig,
  ErrorConfig,
  IconConfig,
  KeyboardNavigationConfig,
  LoadingConfig,
  Province,
  ProvinceCity,
  RTLConfig,
  SearchConfig,
  SelectorType,
  Size,
  ValidationRule,
  Variant,
} from './types';
import { DataSource, defaultDataSource } from './utils/dataSource';

export type { Province, ProvinceCity };

export interface ProvinceCitySelectProps {
  value?: ProvinceCity;
  defaultValue?: ProvinceCity;
  selectorType?: SelectorType;
  onChange?: (value: ProvinceCity) => void;
  onProvinceChange?: (province: string) => void;
  onCityChange?: (city: string) => void;
  onBlur?: (event: React.FocusEvent) => void;
  onFocus?: (event: React.FocusEvent) => void;

  theme?: 'light' | 'dark' | 'modern' | 'minimal' | 'ocean';
  customTheme?: Record<string, string>;
  size?: Size;
  variant?: Variant;
  direction?: Direction;

  isRequired?: boolean;
  isDisabled?: boolean;
  readonly?: boolean;
  clearable?: boolean;

  placeholders?: {
    province?: string;
    city?: string;
  };
  labels?: {
    province?: string;
    city?: string;
  };

  validation?: ValidationRule;
  showErrorMessages?: boolean;
  errorMessages?: {
    provinceRequired?: string;
    cityRequired?: string;
    custom?: string;
  };

  loading?: LoadingConfig;
  error?: ErrorConfig;
  accessibility?: AccessibilityConfig;
  animation?: AnimationConfig;
  dropdown?: DropdownConfig;
  search?: SearchConfig;
  rtl?: RTLConfig;
  keyboard?: KeyboardNavigationConfig;
  icons?: IconConfig;

  className?: string;
  style?: React.CSSProperties;
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
  groupClassName?: string;
  groupStyle?: React.CSSProperties;
  provinceClassName?: string;
  provinceInputStyle?: React.CSSProperties;
  cityClassName?: string;
  cityInputStyle?: React.CSSProperties;
  errorClassName?: string;
  errorStyle?: React.CSSProperties;
  loadingClassName?: string;
  loadingStyle?: React.CSSProperties;

  dataSource?: DataSource;
  provinces?: Province[];
  filterProvinces?: (provinces: Province[]) => Province[];
  filterCities?: (cities: string[], province: string) => string[];
  sortProvinces?: boolean | ((a: Province, b: Province) => number);
  sortCities?: boolean | ((a: string, b: string) => number);

  renderProvince?: (province: Province) => React.ReactNode;
  renderCity?: (city: string, province: string) => React.ReactNode;
  renderError?: (error: string) => React.ReactNode;
  renderLoading?: () => React.ReactNode;

  id?: string;
  name?: string;
  'data-testid'?: string;
  tabIndex?: number;
}

const ErrorMessage = memo(
  ({
    message,
    className = '',
    style,
    showRetry = false,
    onRetry,
    icon,
  }: {
    message: string;
    className?: string;
    style?: React.CSSProperties;
    showRetry?: boolean;
    onRetry?: () => void;
    icon?: React.ReactNode;
  }) => (
    <div className={`province-city-select__error ${className}`} style={style}>
      {icon || (
        <svg
          className="error-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12" y2="16" />
        </svg>
      )}
      <span>{message}</span>
      {showRetry && onRetry && (
        <button type="button" className="error-retry-button" onClick={onRetry}>
          تلاش مجدد
        </button>
      )}
    </div>
  ),
);

ErrorMessage.displayName = 'ErrorMessage';

const LoadingSpinner = memo(
  ({
    config,
    className = '',
    style,
    icon,
  }: {
    config?: LoadingConfig;
    className?: string;
    style?: React.CSSProperties;
    icon?: React.ReactNode;
  }) => (
    <div className={`province-city-select__loading ${className}`} style={style}>
      {config?.component || icon || (
        <div
          className="loading-spinner"
          style={
            config?.spinnerColor
              ? { borderTopColor: config.spinnerColor }
              : undefined
          }
        ></div>
      )}
      {config?.text && <span className="loading-text">{config.text}</span>}
    </div>
  ),
);

LoadingSpinner.displayName = 'LoadingSpinner';

const ProvinceCitySelect: React.FC<ProvinceCitySelectProps> = memo(
  ({
    value,
    defaultValue = { province: '', city: '' },
    onChange,
    theme = 'light',
    customTheme,
    size = 'md',
    variant = 'outlined',
    direction,
    isRequired = false,
    isDisabled = false,
    readonly = false,
    clearable = false,
    placeholders = {
      province: 'انتخاب استان',
      city: 'انتخاب شهر',
    },
    labels = {
      province: 'استان',
      city: 'شهر',
    },
    validation,
    showErrorMessages = true,
    errorMessages = {
      provinceRequired: 'لطفا استان را انتخاب کنید',
      cityRequired: 'لطفا شهر را انتخاب کنید',
    },
    className = '',
    onProvinceChange,
    onCityChange,
    onBlur,
    onFocus,
    selectorType = 'select',
    style,
    containerClassName = '',
    containerStyle,
    groupClassName = '',
    groupStyle,
    provinceClassName = '',
    provinceInputStyle,
    cityClassName = '',
    cityInputStyle,
    errorClassName = '',
    errorStyle,
    loadingClassName = '',
    loadingStyle,
    loading,
    error: errorConfig,
    accessibility,
    animation,
    dropdown,
    search,
    rtl,
    keyboard,
    icons,
    dataSource,
    provinces: customProvinces,
    filterProvinces,
    filterCities,
    sortProvinces = false,
    sortCities = false,
    renderProvince,
    renderCity,
    renderError,
    renderLoading,
    id,
    name,
    'data-testid': dataTestId,
    tabIndex,
  }) => {
    const [internalValue, setInternalValue] = useState<ProvinceCity>(
      value || defaultValue,
    );
    const [errorMessageState, setErrorMessageState] = useState('');
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [isLoading, setIsLoading] = useState(!customProvinces);
    const [error, setError] = useState<string | null>(null);
    const [isTouched, setIsTouched] = useState(false); // Track if user has interacted

    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;

    const handleValueChange = useCallback(
      (newValue: ProvinceCity) => {
        if (!isControlled) {
          setInternalValue(newValue);
        }
        onChange?.(newValue);
      },
      [isControlled, onChange],
    );

    const rtlEnabled =
      rtl?.enabled ??
      (rtl?.autoDetect ? /[\u0600-\u06FF]/.test(labels.province || '') : true);
    const actualDirection = direction || (rtlEnabled ? 'rtl' : 'ltr');

    const provinceOptions = useMemo(() => {
      let filtered = customProvinces || provinces;

      if (filterProvinces) {
        filtered = filterProvinces(filtered);
      }

      if (sortProvinces) {
        filtered = [...filtered].sort(
          typeof sortProvinces === 'function'
            ? sortProvinces
            : (a, b) => a.name.localeCompare(b.name),
        );
      }

      return filtered.map((p) => ({
        value: p.name,
        label: p.name,
      }));
    }, [provinces, customProvinces, filterProvinces, sortProvinces]);

    const cityOptions = useMemo(() => {
      const province = (customProvinces || provinces).find(
        (p) => p.name === currentValue.province,
      );

      let cities = province?.cities || [];

      if (filterCities && currentValue.province) {
        cities = filterCities(cities, currentValue.province);
      }

      if (sortCities) {
        cities = [...cities].sort(
          typeof sortCities === 'function'
            ? sortCities
            : (a, b) => a.localeCompare(b),
        );
      }

      return cities.map((city) => ({
        value: city,
        label: city,
      }));
    }, [
      provinces,
      customProvinces,
      currentValue.province,
      filterCities,
      sortCities,
    ]);

    useEffect(() => {
      if (customProvinces) {
        setProvinces(customProvinces);
        setIsLoading(false);
        return;
      }

      const source = dataSource || defaultDataSource;
      const fetchProvinces = async () => {
        setIsLoading(true);
        try {
          const data = await source.fetchProvinces();
          setProvinces(data);
          setError(null);
        } catch (err) {
          const errorMessage =
            err instanceof Error ? err.message : 'Failed to load provinces';
          setError(errorMessage);
        } finally {
          setIsLoading(false);
        }
      };

      fetchProvinces();
    }, [customProvinces, dataSource]);

    useEffect(() => {
      if (!showErrorMessages || !isTouched) {
        setErrorMessageState('');
        return;
      }

      if (validation?.custom) {
        const customError = validation.custom(currentValue);
        if (customError) {
          setErrorMessageState(customError);
          return;
        }
      }

      const requiredValidation = validation?.required ?? isRequired;

      if (requiredValidation) {
        const message =
          typeof requiredValidation === 'object'
            ? requiredValidation.message
            : '';

        if (!currentValue.province) {
          setErrorMessageState(message || errorMessages.provinceRequired || '');
        } else if (!currentValue.city) {
          setErrorMessageState(message || errorMessages.cityRequired || '');
        } else {
          setErrorMessageState('');
        }
      } else {
        setErrorMessageState('');
      }
    }, [
      currentValue,
      validation,
      isRequired,
      showErrorMessages,
      errorMessages.provinceRequired,
      errorMessages.cityRequired,
      isTouched,
    ]);

    const handleProvinceChange = useCallback(
      (province: string) => {
        const newValue = { province, city: '' };
        handleValueChange(newValue);
        onProvinceChange?.(province);
      },
      [handleValueChange, onProvinceChange],
    );

    const handleCityChange = useCallback(
      (city: string) => {
        const newValue = { province: currentValue.province, city };
        handleValueChange(newValue);
        onCityChange?.(city);
      },
      [handleValueChange, onCityChange, currentValue.province],
    );

    const handleBlur = useCallback(
      (event: React.FocusEvent) => {
        setIsTouched(true);
        onBlur?.(event);
      },
      [onBlur],
    );

    const containerClasses = [
      'province-city-select',
      `theme-${theme}`,
      `direction-${actualDirection}`,
      containerClassName,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const commonInputProps = {
      theme,
      size,
      variant,
      disabled: isDisabled || isLoading,
      required: isRequired,
      error: !!errorMessageState || !!error,
      inputType: selectorType,
      accessibility,
      animation,
      dropdown,
      search,
      keyboard,
      icons,
      tabIndex,
    };

    return (
      <div
        className={containerClasses}
        style={{ ...containerStyle, ...style }}
        id={id}
        data-testid={dataTestId}
        dir={actualDirection}
      >
        <div
          className={`province-city-select__group ${groupClassName}`}
          style={groupStyle}
        >
          <FlexibleInput
            {...commonInputProps}
            value={currentValue.province}
            onChange={handleProvinceChange}
            options={provinceOptions}
            placeholder={placeholders.province}
            label={labels.province}
            className={provinceClassName}
            style={provinceInputStyle}
            onBlur={handleBlur}
            onFocus={onFocus}
            name={name ? `${name}-province` : undefined}
            clearable={clearable}
            readonly={readonly}
          />
        </div>

        <div
          className={`province-city-select__group ${groupClassName}`}
          style={groupStyle}
        >
          <FlexibleInput
            {...commonInputProps}
            value={currentValue.city}
            onChange={handleCityChange}
            options={cityOptions}
            placeholder={placeholders.city}
            disabled={!currentValue.province || isDisabled || isLoading}
            label={labels.city}
            className={cityClassName}
            style={cityInputStyle}
            onBlur={handleBlur}
            onFocus={onFocus}
            name={name ? `${name}-city` : undefined}
            clearable={clearable}
            readonly={readonly}
          />
        </div>

        {showErrorMessages &&
          errorMessageState &&
          (renderError ? (
            renderError(errorMessageState)
          ) : (
            <ErrorMessage
              message={errorMessageState}
              className={errorClassName}
              style={errorStyle}
              icon={icons?.error}
            />
          ))}

        {isLoading &&
          (renderLoading ? (
            renderLoading()
          ) : (
            <LoadingSpinner
              config={loading}
              className={loadingClassName}
              style={loadingStyle}
              icon={icons?.loading}
            />
          ))}

        {error && errorConfig && (
          <ErrorMessage
            message={error}
            className={errorClassName}
            style={errorStyle}
            showRetry={errorConfig.retryButton}
            onRetry={errorConfig.onRetry}
            icon={icons?.error}
          />
        )}
      </div>
    );
  },
);

ProvinceCitySelect.displayName = 'ProvinceCitySelect';

export default ProvinceCitySelect;
