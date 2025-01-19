import React, { memo, useEffect, useRef, useState } from 'react'
import './flexibleSelect.css'

type InputType = 'select' | 'autocomplete' | 'combobox'

type FlexibleInputProps = {
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
  inputType?: InputType
  placeholder?: string
  disabled?: boolean
  required?: boolean
  theme?: 'light' | 'dark'
  size?: 'sm' | 'md' | 'lg'
  variant?: 'outlined' | 'filled'
  label?: string
  error?: boolean
  className?: string
  style?: React.CSSProperties
}

const FlexibleInput: React.FC<FlexibleInputProps> = ({
  value,
  onChange,
  options,
  inputType = 'select',
  placeholder = '',
  disabled = false,
  required = false,
  theme = 'light',
  size = 'md',
  variant = 'outlined',
  label,
  error = false,
  className = '',
  style,
}): React.ReactNode => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchValue, setSearchValue] = useState(value)
  const [filteredOptions, setFilteredOptions] = useState(options)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement | HTMLSelectElement>(null)

  useEffect(() => {
    setSearchValue(value)
    if (inputType !== 'select') {
      const filtered = options.filter(option =>
        option.label.toLowerCase().includes(searchValue.toLowerCase())
      )
      setFilteredOptions(filtered)
    } else {
      setFilteredOptions(options)
    }
  }, [value, searchValue, options, inputType])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const containerClasses = [
    'flexible-input',
    `theme-${theme}`,
    `size-${size}`,
    `variant-${variant}`,
    error && 'error',
    disabled && 'disabled',
    isOpen && 'open',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
    setIsOpen(true)
  }

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue)
    const selectedOption = options.find(opt => opt.value === optionValue)
    if (inputType !== 'select' && selectedOption) {
      setSearchValue(selectedOption.label)
    }
    setIsOpen(false)
  }

  const renderInput = () => {
    switch (inputType) {
      case 'select':
      case 'autocomplete':
      case 'combobox':
        return (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="text"
            value={inputType === 'select' ? value : searchValue}
            onChange={handleInputChange}
            disabled={disabled}
            required={required}
            placeholder={placeholder}
            className="flexible-input__input"
            onFocus={() => setIsOpen(true)}
          />
        )
      default:
        return (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="text"
            value={searchValue}
            onChange={handleInputChange}
            disabled={disabled}
            required={required}
            placeholder={placeholder}
            className="flexible-input__input"
            onFocus={() => setIsOpen(true)}
          />
        )
    }
  }

  return (
    <div className={containerClasses} ref={containerRef} style={style}>
      {label && (
        <label className="flexible-input__label">
          {label}
          {required && <span className="required-mark">*</span>}
        </label>
      )}

      <div className="flexible-input__input-container">
        {renderInput()}
        <svg
          className={`flexible-input__arrow ${isOpen ? 'open' : ''}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {isOpen && (
        <div className="flexible-input__options">
          {filteredOptions.map(option => (
            <div
              key={option.value}
              className={`flexible-input__option ${
                value === option.value ? 'selected' : ''
              }`}
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </div>
          ))}
          {filteredOptions.length === 0 && (
            <div className="flexible-input__no-results">
              هیچ نتیجه‌ای یافت نشد
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default memo(FlexibleInput)
