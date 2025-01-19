import React from 'react';
import './ProvinceCitySelect.css';
export type Province = {
    name: string;
    cities: string[];
};
type SelectorType = 'select' | 'autocomplete' | 'combobox';
export type ProvinceCitySelectProps = {
    value?: {
        province: string;
        city: string;
    };
    selectorType?: SelectorType;
    onChange?: (value: {
        province: string;
        city: string;
    }) => void;
    theme?: 'light' | 'dark';
    size?: 'sm' | 'md' | 'lg';
    variant?: 'outlined' | 'filled';
    isRequired?: boolean;
    isDisabled?: boolean;
    placeholders?: {
        province?: string;
        city?: string;
    };
    labels?: {
        province?: string;
        city?: string;
    };
    className?: string;
    onProvinceChange?: (province: string) => void;
    onCityChange?: (city: string) => void;
    style?: React.CSSProperties;
    groupStyle?: React.CSSProperties;
    provinceInputStyle?: React.CSSProperties;
    cityInputStyle?: React.CSSProperties;
    errorStyle?: React.CSSProperties;
    loadingStyle?: React.CSSProperties;
};
declare const ProvinceCitySelect: React.FC<ProvinceCitySelectProps>;
export default ProvinceCitySelect;
