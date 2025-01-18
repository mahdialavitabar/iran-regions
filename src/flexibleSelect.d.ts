import React from 'react';
import './flexibleSelect.css';
type InputType = 'select' | 'autocomplete' | 'combobox';
type FlexibleInputProps = {
    value: string;
    onChange: (value: string) => void;
    options: {
        value: string;
        label: string;
    }[];
    inputType?: InputType;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    theme?: 'light' | 'dark';
    size?: 'sm' | 'md' | 'lg';
    variant?: 'outlined' | 'filled';
    label?: string;
    error?: boolean;
    className?: string;
    style?: React.CSSProperties;
};
declare const _default: React.NamedExoticComponent<FlexibleInputProps>;
export default _default;
