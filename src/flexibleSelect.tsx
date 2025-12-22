import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import './flexibleSelect.css';
import type {
  AccessibilityConfig,
  AnimationConfig,
  DropdownConfig,
  IconConfig,
  KeyboardNavigationConfig,
  SearchConfig,
  SelectOption,
  SelectorType,
  Size,
  Variant,
} from './types';
import { calculateVisibleRange, debounce, throttle } from './utils/performance';

interface FlexibleInputProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  inputType?: SelectorType;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  readonly?: boolean;
  clearable?: boolean;
  theme?: 'light' | 'dark' | 'modern' | 'minimal' | 'ocean';
  size?: Size;
  variant?: Variant;
  label?: string;
  error?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onBlur?: (event: React.FocusEvent) => void;
  onFocus?: (event: React.FocusEvent) => void;
  name?: string;
  id?: string;
  tabIndex?: number;
  accessibility?: AccessibilityConfig;
  animation?: AnimationConfig;
  dropdown?: DropdownConfig;
  search?: SearchConfig;
  keyboard?: KeyboardNavigationConfig;
  icons?: IconConfig;
}

const FlexibleInput: React.FC<FlexibleInputProps> = ({
  value,
  onChange,
  options,
  inputType = 'select',
  placeholder = '',
  disabled = false,
  required = false,
  readonly = false,
  clearable = false,
  theme = 'light',
  size = 'md',
  variant = 'outlined',
  label,
  error = false,
  className = '',
  style,
  onBlur,
  onFocus,
  name,
  id,
  tabIndex,
  accessibility,
  animation,
  dropdown,
  search,
  keyboard,
  icons,
}): React.ReactNode => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(value);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [scrollTop, setScrollTop] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | HTMLSelectElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const searchEnabled = search?.enabled ?? inputType !== 'select';
  const searchMinChars = search?.minCharacters ?? 0;
  const dropdownPlacement = dropdown?.placement ?? 'bottom';
  const virtualScrollEnabled = dropdown?.virtualScroll ?? options.length > 100;
  const itemHeight = dropdown?.itemHeight ?? 36;

  const debouncedSearch = useMemo(
    () =>
      debounce(
        (val: string) => {
          setSearchValue(val);
        },
        search?.debounceMs ?? 150,
      ),
    [search?.debounceMs],
  );

  const filteredOptions = useMemo(() => {
    if (!searchEnabled || inputType === 'select') return options;

    const query = searchValue.toLowerCase().trim();

    if (query.length < searchMinChars) return options;

    return options.filter((option) => {
      const label = option.label.toLowerCase();
      if (search?.caseSensitive) {
        return option.label.includes(searchValue);
      }
      return label.includes(query);
    });
  }, [
    options,
    searchValue,
    searchEnabled,
    inputType,
    search?.caseSensitive,
    searchMinChars,
  ]);

  const visibleOptions = useMemo(() => {
    if (!virtualScrollEnabled || !dropdownRef.current) return filteredOptions;

    const containerHeight = dropdown?.maxHeight
      ? typeof dropdown.maxHeight === 'number'
        ? dropdown.maxHeight
        : parseInt(dropdown.maxHeight)
      : 300;

    const range = calculateVisibleRange(scrollTop, {
      itemHeight,
      containerHeight,
      buffer: 5,
    });

    return filteredOptions.slice(range.start, range.end).map((opt, idx) => ({
      ...opt,
      actualIndex: range.start + idx,
    }));
  }, [
    filteredOptions,
    virtualScrollEnabled,
    scrollTop,
    itemHeight,
    dropdown?.maxHeight,
  ]);

  useEffect(() => {
    const selectedOption = options.find((opt) => opt.value === value);
    setSearchValue(selectedOption?.label || value || '');
  }, [value, options]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (
        keyboard?.closeOnEscape !== false &&
        event.key === 'Escape' &&
        isOpen
      ) {
        event.preventDefault();
        setIsOpen(false);
        setHighlightedIndex(-1);
        inputRef.current?.blur();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      if (keyboard?.enabled !== false) {
        document.addEventListener('keydown', handleEscape);
      }
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, keyboard?.closeOnEscape, keyboard?.enabled]);

  const containerClasses = [
    'flexible-input',
    `theme-${theme}`,
    `size-${size}`,
    `variant-${variant}`,
    error && 'error',
    disabled && 'disabled',
    readonly && 'readonly',
    isOpen && 'open',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      if (search?.debounceMs) {
        debouncedSearch(newValue);
      } else {
        setSearchValue(newValue);
      }
      setIsOpen(true);
      setHighlightedIndex(-1);
    },
    [search?.debounceMs, debouncedSearch],
  );

  const handleOptionClick = useCallback(
    (optionValue: string) => {
      if (disabled || readonly) return;

      const selectedOption = options.find((opt) => opt.value === optionValue);
      if (selectedOption?.disabled) return;

      onChange(optionValue);
      setIsOpen(false);
      setHighlightedIndex(-1);
      inputRef.current?.focus();
    },
    [onChange, options, disabled, readonly],
  );

  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (disabled || readonly) return;

      onChange('');
      setSearchValue('');
      setIsOpen(false);
      setHighlightedIndex(-1);
      inputRef.current?.focus();
    },
    [onChange, disabled, readonly],
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (keyboard?.enabled === false) return;

      const navigateEnabled = keyboard?.navigateWithArrows !== false;
      const selectOnEnter = keyboard?.selectOnEnter !== false;

      if (!navigateEnabled) return;

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          } else {
            setHighlightedIndex((prev) =>
              prev < filteredOptions.length - 1 ? prev + 1 : prev,
            );
          }
          break;

        case 'ArrowUp':
          event.preventDefault();
          if (isOpen) {
            setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
          }
          break;

        case 'Enter':
          if (selectOnEnter && isOpen && highlightedIndex >= 0) {
            event.preventDefault();
            const option = filteredOptions[highlightedIndex];
            if (option && !option.disabled) {
              handleOptionClick(option.value);
            }
          }
          break;

        case 'Tab':
          if (isOpen) {
            setIsOpen(false);
            setHighlightedIndex(-1);
          }
          break;
      }
    },
    [keyboard, isOpen, highlightedIndex, filteredOptions, handleOptionClick],
  );

  const handleDropdownScroll = useCallback(
    throttle((e: React.UIEvent<HTMLDivElement>) => {
      if (virtualScrollEnabled) {
        setScrollTop(e.currentTarget.scrollTop);
      }
    }, 16),
    [virtualScrollEnabled],
  );

  const renderInput = () => {
    const commonProps = {
      ref: inputRef as React.RefObject<HTMLInputElement>,
      disabled,
      required,
      placeholder,
      className: 'flexible-input__input',
      onFocus: (e: React.FocusEvent) => {
        if (!readonly) setIsOpen(true);
        onFocus?.(e);
      },
      onBlur: (e: React.FocusEvent) => {
        onBlur?.(e);
      },
      onKeyDown: handleKeyDown,
      name,
      id,
      tabIndex,
      'aria-label': accessibility?.ariaLabel || label,
      'aria-required': accessibility?.ariaRequired ?? required,
      'aria-invalid': accessibility?.ariaInvalid ?? error,
      'aria-describedby': accessibility?.ariaDescribedBy,
      'aria-expanded': isOpen,
      'aria-autocomplete': searchEnabled ? ('list' as const) : undefined,
      readOnly: readonly,
    };

    if (inputType === 'select' && !searchEnabled) {
      return (
        <input {...commonProps} type="text" value={searchValue} readOnly />
      );
    }

    return (
      <input
        {...commonProps}
        type="text"
        value={searchValue}
        onChange={handleInputChange}
      />
    );
  };

  const totalHeight = virtualScrollEnabled
    ? filteredOptions.length * itemHeight
    : 'auto';
  const offsetY =
    virtualScrollEnabled && visibleOptions[0]
      ? visibleOptions[0].actualIndex! * itemHeight
      : 0;

  const dropdownStyle: React.CSSProperties = {
    maxHeight: dropdown?.maxHeight || '300px',
    width: dropdown?.width || '100%',
    ...(animation?.disabled === false && {
      transition: `opacity ${animation?.duration || 200}ms ${
        animation?.easing || 'ease'
      }`,
    }),
  };

  return (
    <div className={containerClasses} ref={containerRef} style={style}>
      {label && (
        <label className="flexible-input__label" htmlFor={id}>
          {label}
          {required && <span className="required-mark">*</span>}
        </label>
      )}

      <div className="flexible-input__input-container">
        {renderInput()}

        {clearable && value && !disabled && !readonly && (
          <button
            type="button"
            className="flexible-input__clear"
            onClick={handleClear}
            aria-label="Clear selection"
            tabIndex={-1}
          >
            {icons?.clear || '×'}
          </button>
        )}

        <svg
          className={`flexible-input__arrow ${isOpen ? 'open' : ''}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          {icons?.arrow || <path d="M19 9l-7 7-7-7" />}
        </svg>
      </div>

      {isOpen && (
        <div
          className={`flexible-input__options ${dropdownPlacement}`}
          ref={dropdownRef}
          style={dropdownStyle}
          onScroll={handleDropdownScroll}
          role="listbox"
          aria-label={`${label || 'Select'} options`}
        >
          {virtualScrollEnabled && (
            <div style={{ height: totalHeight, position: 'relative' }}>
              <div style={{ transform: `translateY(${offsetY}px)` }}>
                {visibleOptions.map((option, idx) => (
                  <div
                    key={option.value}
                    className={`flexible-input__option ${
                      value === option.value ? 'selected' : ''
                    } ${
                      highlightedIndex === (option.actualIndex ?? idx)
                        ? 'highlighted'
                        : ''
                    } ${option.disabled ? 'disabled' : ''}`}
                    onClick={() => handleOptionClick(option.value)}
                    style={{ height: `${itemHeight}px` }}
                    role="option"
                    aria-selected={value === option.value}
                    aria-disabled={option.disabled}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            </div>
          )}

          {!virtualScrollEnabled &&
            filteredOptions.map((option, idx) => (
              <div
                key={option.value}
                className={`flexible-input__option ${
                  value === option.value ? 'selected' : ''
                } ${highlightedIndex === idx ? 'highlighted' : ''} ${
                  option.disabled ? 'disabled' : ''
                }`}
                onClick={() => handleOptionClick(option.value)}
                role="option"
                aria-selected={value === option.value}
                aria-disabled={option.disabled}
              >
                {option.label}
              </div>
            ))}

          {filteredOptions.length === 0 && (
            <div className="flexible-input__no-results">
              {search?.placeholder || 'هیچ نتیجه‌ای یافت نشد'}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

FlexibleInput.displayName = 'FlexibleInput';

export default memo(FlexibleInput);
