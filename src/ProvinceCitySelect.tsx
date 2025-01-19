import React, { memo, useEffect, useMemo, useState } from 'react'
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
  theme?: 'light' | 'dark'
  size?: 'sm' | 'md' | 'lg'
  variant?: 'outlined' | 'filled'
  isRequired?: boolean
  isDisabled?: boolean
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

// Memoized error message component
const ErrorMessage = memo(
  ({ message, style }: { message: string; style?: React.CSSProperties }) => (
    <div className="province-city-select__error" style={style}>
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
      <span>{message}</span>
    </div>
  )
)

// Memoized loading component
const LoadingSpinner = memo(({ style }: { style?: React.CSSProperties }) => (
  <div className="province-city-select__loading" style={style}>
    <div className="loading-spinner"></div>
  </div>
))

const ProvinceCitySelect: React.FC<ProvinceCitySelectProps> = memo(
  ({
    value = { province: '', city: '' },
    onChange,
    theme = 'light',
    size = 'md',
    variant = 'outlined',
    isRequired = false,
    isDisabled = false,
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
    const [provinces, setProvinces] = useState<Province[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Memoize options to prevent unnecessary recalculations
    const provinceOptions = useMemo(
      () =>
        provinces.map(p => ({
          value: p.name,
          label: p.name,
        })),
      [provinces]
    )

    const cityOptions = useMemo(
      () =>
        provinces
          .find(p => p.name === selectedProvince)
          ?.cities.map(city => ({
            value: city,
            label: city,
          })) || [],
      [provinces, selectedProvince]
    )

    useEffect(() => {
      const fetchProvinces = async () => {
        const cachedData = localStorage.getItem('provincesData')
        if (cachedData) {
          try {
            const data = JSON.parse(cachedData)
            if (Array.isArray(data)) {
              setProvinces(data)
              setIsLoading(false)
              return
            }
          } catch (error) {
            console.error('Error parsing cached data:', error)
          }
        }

        try {
          const response = await fetch(
            'https://gist.githubusercontent.com/mahdialavitabar/115d131d6fe1f56e1f177aa4c741739d/raw/a070a0fe4f82a8a378c67d42abda3046134ed97c/data.json'
          )
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          const data = await response.json()

          if (Array.isArray(data)) {
            setProvinces(data)
            localStorage.setItem('provincesData', JSON.stringify(data))
            setIsLoading(false)
          } else {
            throw new Error('Fetched data is not an array')
          }
        } catch (error) {
          console.error('Error fetching provinces data:', error)
          setError(error.message)
          setIsLoading(false)
        }
      }

      fetchProvinces()
    }, [])

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

    // Memoize handlers to prevent unnecessary rerenders
    const handleProvinceChange = React.useCallback(
      (province: string) => {
        setSelectedProvince(province)
        setSelectedCity('')
        onChange?.({ province, city: '' })
        onProvinceChange?.(province)
      },
      [onChange, onProvinceChange]
    )

    const handleCityChange = React.useCallback(
      (city: string) => {
        setSelectedCity(city)
        onChange?.({ province: selectedProvince, city })
        onCityChange?.(city)
        if (selectedProvince && city) {
          setErrorMessageState('')
        }
      },
      [onChange, onCityChange, selectedProvince]
    )

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
          <ErrorMessage message={errorMessageState} style={errorStyle} />
        )}
        {isLoading && <LoadingSpinner style={loadingStyle} />}
        {error && <ErrorMessage message={error} style={errorStyle} />}
      </div>
    )
  }
)

export default ProvinceCitySelect
