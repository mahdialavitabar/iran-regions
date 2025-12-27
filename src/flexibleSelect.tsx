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
  renderOption?: (option: SelectOption) => React.ReactNode;
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
  renderOption,
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
  const [isClosing, setIsClosing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [displayValue, setDisplayValue] = useState(value);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [scrollTop, setScrollTop] = useState(0);
  const [isSearching, setIsSearching] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | HTMLSelectElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const debouncedSearchRef = useRef<ReturnType<typeof debounce> | null>(null);
  const throttledScrollRef = useRef<ReturnType<typeof throttle> | null>(null);

  const searchEnabled = search?.enabled ?? inputType !== 'select';
  const searchMinChars = search?.minCharacters ?? 0;
  const dropdownPlacement = dropdown?.placement ?? 'bottom';
  const virtualScrollEnabled = dropdown?.virtualScroll ?? options.length > 100;
  const itemHeight = dropdown?.itemHeight ?? 36;
  const [resolvedPlacement, setResolvedPlacement] = useState(dropdownPlacement);

  useEffect(() => {
    debouncedSearchRef.current = debounce(
      (val: string) => {
        setSearchQuery(val);
      },
      search?.debounceMs ?? 150,
    );

    return () => {
      debouncedSearchRef.current?.cancel();
    };
  }, [search?.debounceMs]);

  useEffect(() => {
    throttledScrollRef.current = throttle((scrollTopValue: number) => {
      if (virtualScrollEnabled) {
        setScrollTop(scrollTopValue);
      }
    }, 16);

    return () => {
      throttledScrollRef.current?.cancel();
    };
  }, [virtualScrollEnabled]);

  const filteredOptions = useMemo(() => {
    if (!searchEnabled || !isSearching) return options;

    const query = searchQuery.toLowerCase().trim();

    if (query.length < searchMinChars) return options;

    return options.filter((option) => {
      const label = option.label.toLowerCase();
      if (search?.caseSensitive) {
        return option.label.includes(searchQuery);
      }
      return label.includes(query);
    });
  }, [
    options,
    searchQuery,
    searchEnabled,
    isSearching,
    search?.caseSensitive,
    searchMinChars,
  ]);

  const containerHeight = useMemo(() => {
    if (dropdown?.maxHeight) {
      return typeof dropdown.maxHeight === 'number'
        ? dropdown.maxHeight
        : parseInt(dropdown.maxHeight);
    }
    return 300;
  }, [dropdown?.maxHeight]);

  const closeDropdown = useCallback(() => {
    if (!isOpen || isClosing) return;
    setIsClosing(true);
    setHighlightedIndex(-1);
    setIsSearching(false);
    setSearchQuery('');
    const selectedOption = options.find((opt) => opt.value === value);
    setDisplayValue(selectedOption?.label || value || '');
    const duration = animation?.disabled ? 0 : animation?.duration ?? 150;
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, duration);
  }, [
    isOpen,
    isClosing,
    animation?.disabled,
    animation?.duration,
    options,
    value,
  ]);

  const visibleOptions = useMemo(() => {
    if (!virtualScrollEnabled) return filteredOptions;

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
    containerHeight,
  ]);

  useEffect(() => {
    const selectedOption = options.find((opt) => opt.value === value);
    const newDisplayValue = selectedOption?.label || value || '';
    if (!isSearching) {
      setDisplayValue(newDisplayValue);
    }
  }, [value, options, isSearching]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (
        keyboard?.closeOnEscape !== false &&
        event.key === 'Escape' &&
        isOpen
      ) {
        event.preventDefault();
        closeDropdown();
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
  }, [isOpen, keyboard?.closeOnEscape, keyboard?.enabled, closeDropdown]);

  useEffect(() => {
    if (!isOpen) return;

    if (dropdownPlacement === 'auto' && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const spaceBelow = viewportHeight - rect.bottom;
      const spaceAbove = rect.top;
      const needed = containerHeight;
      setResolvedPlacement(
        spaceBelow >= needed || spaceBelow >= spaceAbove ? 'bottom' : 'top',
      );
    } else {
      setResolvedPlacement(dropdownPlacement);
    }
  }, [isOpen, dropdownPlacement, containerHeight]);

  useEffect(() => {
    if (!isOpen || highlightedIndex < 0 || !dropdownRef.current) return;

    const container = dropdownRef.current;
    const currentScroll = container.scrollTop;
    const targetTop = highlightedIndex * itemHeight;
    const targetBottom = targetTop + itemHeight;
    const visibleTop = currentScroll;
    const visibleBottom = currentScroll + containerHeight;

    let nextScroll = currentScroll;
    if (targetTop < visibleTop) {
      nextScroll = targetTop;
    } else if (targetBottom > visibleBottom) {
      nextScroll = targetBottom - containerHeight;
    }

    if (nextScroll !== currentScroll) {
      container.scrollTo({ top: nextScroll });
      if (virtualScrollEnabled) {
        throttledScrollRef.current?.(nextScroll);
      }
    }
  }, [
    highlightedIndex,
    isOpen,
    itemHeight,
    containerHeight,
    virtualScrollEnabled,
  ]);

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
      setDisplayValue(newValue);
      setIsSearching(true);
      if (search?.debounceMs && debouncedSearchRef.current) {
        debouncedSearchRef.current(newValue);
      } else {
        setSearchQuery(newValue);
      }
      if (!isOpen) {
        setIsOpen(true);
      }
      setHighlightedIndex(0);
    },
    [search?.debounceMs, isOpen],
  );

  const handleOptionClick = useCallback(
    (optionValue: string) => {
      if (disabled || readonly) return;

      const selectedOption = options.find((opt) => opt.value === optionValue);
      if (selectedOption?.disabled) return;

      onChange(optionValue);
      closeDropdown();
      inputRef.current?.focus();
    },
    [onChange, options, disabled, readonly, closeDropdown],
  );

  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (disabled || readonly) return;

      onChange('');
      setSearchQuery('');
      setDisplayValue('');
      setIsSearching(false);
      closeDropdown();
      inputRef.current?.focus();
    },
    [onChange, disabled, readonly, closeDropdown],
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
            closeDropdown();
          }
          break;
      }
    },
    [
      keyboard,
      isOpen,
      highlightedIndex,
      filteredOptions,
      handleOptionClick,
      closeDropdown,
    ],
  );

  const handleDropdownScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      throttledScrollRef.current?.(e.currentTarget.scrollTop);
    },
    [],
  );

  const renderInput = () => {
    const highlightedOptionId =
      highlightedIndex >= 0 && filteredOptions[highlightedIndex]
        ? `${id || 'flexible-input'}-option-${highlightedIndex}`
        : undefined;

    const commonProps = {
      ref: inputRef as React.RefObject<HTMLInputElement>,
      disabled,
      required,
      placeholder,
      className: 'flexible-input__input',
      onFocus: (e: React.FocusEvent) => {
        if (!readonly && inputType !== 'select') {
          setIsOpen(true);
          if (inputType === 'combobox' && inputRef.current) {
            (inputRef.current as HTMLInputElement).select();
          }
        }
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
      'aria-activedescendant': isOpen ? highlightedOptionId : undefined,
      'aria-controls': isOpen ? `${id || 'flexible-input'}-listbox` : undefined,
      role: 'combobox',
      readOnly: readonly,
    };

    if (inputType === 'select' && !searchEnabled) {
      return (
        <input {...commonProps} type="text" value={displayValue} readOnly />
      );
    }

    return (
      <input
        {...commonProps}
        type="text"
        value={displayValue}
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
    ...(animation?.disabled !== true && {
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

      <div
        className="flexible-input__input-container"
        onClick={() => {
          if (disabled || readonly) return;
          if (inputType === 'select' && !searchEnabled) {
            if (isOpen && !isClosing) {
              closeDropdown();
            } else if (!isOpen && !isClosing) {
              setIsOpen(true);
              inputRef.current?.focus();
            }
          } else if (!isOpen && !isClosing) {
            setIsOpen(true);
            inputRef.current?.focus();
          }
        }}
      >
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

        <span
          className={`flexible-input__arrow ${isOpen ? 'open' : ''}`}
          aria-hidden="true"
        >
          {icons?.arrow || (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </span>

        {(isOpen || isClosing) && (
          <div
            className={`flexible-input__options ${resolvedPlacement} ${
              isClosing ? 'closing' : ''
            }`}
            ref={dropdownRef}
            style={dropdownStyle}
            onScroll={handleDropdownScroll}
            onClick={(e) => e.stopPropagation()}
            role="listbox"
            id={`${id || 'flexible-input'}-listbox`}
            aria-label={`${label || 'Select'} options`}
          >
            {virtualScrollEnabled && (
              <div style={{ height: totalHeight, position: 'relative' }}>
                <div style={{ transform: `translateY(${offsetY}px)` }}>
                  {visibleOptions.map((option, idx) => {
                    const actualIdx = option.actualIndex ?? idx;
                    return (
                      <div
                        key={option.value}
                        id={`${id || 'flexible-input'}-option-${actualIdx}`}
                        className={`flexible-input__option ${
                          value === option.value ? 'selected' : ''
                        } ${
                          highlightedIndex === actualIdx ? 'highlighted' : ''
                        } ${option.disabled ? 'disabled' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOptionClick(option.value);
                        }}
                        style={{ height: `${itemHeight}px` }}
                        role="option"
                        aria-selected={value === option.value}
                        aria-disabled={option.disabled}
                      >
                        {renderOption
                          ? renderOption(option)
                          : option.rendered ?? option.label}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {!virtualScrollEnabled &&
              filteredOptions.map((option, idx) => (
                <div
                  key={option.value}
                  id={`${id || 'flexible-input'}-option-${idx}`}
                  className={`flexible-input__option ${
                    value === option.value ? 'selected' : ''
                  } ${highlightedIndex === idx ? 'highlighted' : ''} ${
                    option.disabled ? 'disabled' : ''
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOptionClick(option.value);
                  }}
                  role="option"
                  aria-selected={value === option.value}
                  aria-disabled={option.disabled}
                >
                  {renderOption
                    ? renderOption(option)
                    : option.rendered ?? option.label}
                </div>
              ))}

            {filteredOptions.length === 0 && (
              <div className="flexible-input__no-results">
                {search?.noResultsText || 'هیچ نتیجه‌ای یافت نشد'}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

FlexibleInput.displayName = 'FlexibleInput';

export default memo(FlexibleInput);
