import React, { useEffect, useState } from 'react'
import FlexibleInput from './flexibleSelect'
import './ProvinceCitySelect.css'

export type Province = {
  name: string
  cities: string[]
}
type SelectorType = 'select' | 'autocomplete' | 'combobox'
export type ProvinceCitySelectProps = {
  value?: {
    province: string
    city: string
  }
  selectorType?: SelectorType
  onChange?: (value: { province: string; city: string }) => void
  provinces: Province[]
  theme?: 'light' | 'dark'
  size?: 'sm' | 'md' | 'lg'
  variant?: 'outlined' | 'filled'
  isRequired?: boolean
  isDisabled?: boolean
  isLoading?: boolean
  placeholders?: {
    province?: string
    city?: string
  }
  labels?: {
    province?: string
    city?: string
  }
  className?: string
  onProvinceChange?: (province: string) => void
  onCityChange?: (city: string) => void
  style?: React.CSSProperties
  groupStyle?: React.CSSProperties
  provinceInputStyle?: React.CSSProperties
  cityInputStyle?: React.CSSProperties
  errorStyle?: React.CSSProperties
  loadingStyle?: React.CSSProperties
}

const ProvinceCitySelect: React.FC<ProvinceCitySelectProps> = ({
  value = { province: '', city: '' },
  onChange,
  provinces = [],
  theme = 'light',
  size = 'md',
  variant = 'outlined',
  isRequired = false,
  isDisabled = false,
  isLoading = false,
  placeholders = {
    province: 'انتخاب استان',
    city: 'انتخاب شهر',
  },
  labels = {
    province: 'استان',
    city: 'شهر',
  },
  className = '',
  onProvinceChange,
  onCityChange,
  selectorType = 'select',
  style,
  groupStyle,
  provinceInputStyle,
  cityInputStyle,
  errorStyle,
  loadingStyle,
}) => {
  const [selectedProvince, setSelectedProvince] = useState(value.province)
  const [selectedCity, setSelectedCity] = useState(value.city)
  const [errorMessageState, setErrorMessageState] = useState('')

  useEffect(() => {
    setSelectedProvince(value.province)
    setSelectedCity(value.city)
    if (value.province && value.city) {
      setErrorMessageState('')
    } else if (!value.province) {
      setErrorMessageState('لطفا استان را انتخاب کنید')
    } else if (!value.city) {
      setErrorMessageState('لطفا شهر را انتخاب کنید')
    }
  }, [value])

  const handleProvinceChange = (province: string) => {
    setSelectedProvince(province)
    setSelectedCity('')
    onChange?.({ province, city: '' })
    onProvinceChange?.(province)
  }

  const handleCityChange = (city: string) => {
    setSelectedCity(city)
    onChange?.({ province: selectedProvince, city })
    onCityChange?.(city)
    if (selectedProvince && city) {
      setErrorMessageState('')
    }
  }

  const provinceOptions = provinces.map(p => ({
    value: p.name,
    label: p.name,
  }))

  const cityOptions =
    provinces
      .find(p => p.name === selectedProvince)
      ?.cities.map(city => ({
        value: city,
        label: city,
      })) || []

  return (
    <div className={`province-city-select ${className}`} style={style}>
      <div className="province-city-select__group" style={groupStyle}>
        <FlexibleInput
          value={selectedProvince}
          onChange={handleProvinceChange}
          options={provinceOptions}
          inputType={selectorType}
          placeholder={placeholders.province}
          disabled={isDisabled || isLoading}
          required={isRequired}
          theme={theme}
          size={size}
          variant={variant}
          label={labels.province}
          error={!!errorMessageState}
          style={provinceInputStyle}
        />
      </div>

      <div className="province-city-select__group" style={groupStyle}>
        <FlexibleInput
          value={selectedCity}
          onChange={handleCityChange}
          options={cityOptions}
          inputType={selectorType}
          placeholder={placeholders.city}
          disabled={!selectedProvince || isDisabled || isLoading}
          required={isRequired}
          theme={theme}
          size={size}
          variant={variant}
          label={labels.city}
          error={!!errorMessageState}
          style={cityInputStyle}
        />
      </div>

      {errorMessageState && (
        <div className="province-city-select__error" style={errorStyle}>
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
          <span>{errorMessageState}</span>
        </div>
      )}

      {isLoading && (
        <div className="province-city-select__loading" style={loadingStyle}>
          <div className="loading-spinner"></div>
        </div>
      )}
    </div>
  )
}

export default ProvinceCitySelect
