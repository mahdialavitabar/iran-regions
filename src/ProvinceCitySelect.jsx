import React, { useEffect, useState } from 'react';
import FlexibleInput from './flexibleSelect';
import './ProvinceCitySelect.css';
var ProvinceCitySelect = function (_a) {
    var _b;
    var _c = _a.value, value = _c === void 0 ? { province: '', city: '' } : _c, onChange = _a.onChange, _d = _a.provinces, provinces = _d === void 0 ? [] : _d, _e = _a.theme, theme = _e === void 0 ? 'light' : _e, _f = _a.size, size = _f === void 0 ? 'md' : _f, _g = _a.variant, variant = _g === void 0 ? 'outlined' : _g, _h = _a.isRequired, isRequired = _h === void 0 ? false : _h, _j = _a.isDisabled, isDisabled = _j === void 0 ? false : _j, _k = _a.isLoading, isLoading = _k === void 0 ? false : _k, _l = _a.placeholders, placeholders = _l === void 0 ? {
        province: 'انتخاب استان',
        city: 'انتخاب شهر',
    } : _l, _m = _a.labels, labels = _m === void 0 ? {
        province: 'استان',
        city: 'شهر',
    } : _m, _o = _a.className, className = _o === void 0 ? '' : _o, onProvinceChange = _a.onProvinceChange, onCityChange = _a.onCityChange, _p = _a.selectorType, selectorType = _p === void 0 ? 'select' : _p, style = _a.style, groupStyle = _a.groupStyle, provinceInputStyle = _a.provinceInputStyle, cityInputStyle = _a.cityInputStyle, errorStyle = _a.errorStyle, loadingStyle = _a.loadingStyle;
    var _q = useState(value.province), selectedProvince = _q[0], setSelectedProvince = _q[1];
    var _r = useState(value.city), selectedCity = _r[0], setSelectedCity = _r[1];
    var _s = useState(''), errorMessageState = _s[0], setErrorMessageState = _s[1];
    useEffect(function () {
        setSelectedProvince(value.province);
        setSelectedCity(value.city);
        if (value.province && value.city) {
            setErrorMessageState('');
        }
        else if (!value.province) {
            setErrorMessageState('لطفا استان را انتخاب کنید');
        }
        else if (!value.city) {
            setErrorMessageState('لطفا شهر را انتخاب کنید');
        }
    }, [value]);
    var handleProvinceChange = function (province) {
        setSelectedProvince(province);
        setSelectedCity('');
        onChange === null || onChange === void 0 ? void 0 : onChange({ province: province, city: '' });
        onProvinceChange === null || onProvinceChange === void 0 ? void 0 : onProvinceChange(province);
    };
    var handleCityChange = function (city) {
        setSelectedCity(city);
        onChange === null || onChange === void 0 ? void 0 : onChange({ province: selectedProvince, city: city });
        onCityChange === null || onCityChange === void 0 ? void 0 : onCityChange(city);
        if (selectedProvince && city) {
            setErrorMessageState('');
        }
    };
    var provinceOptions = provinces.map(function (p) { return ({
        value: p.name,
        label: p.name,
    }); });
    var cityOptions = ((_b = provinces
        .find(function (p) { return p.name === selectedProvince; })) === null || _b === void 0 ? void 0 : _b.cities.map(function (city) { return ({
        value: city,
        label: city,
    }); })) || [];
    return (<div className={"province-city-select ".concat(className)} style={style}>
      <div className="province-city-select__group" style={groupStyle}>
        <FlexibleInput value={selectedProvince} onChange={handleProvinceChange} options={provinceOptions} inputType={selectorType} placeholder={placeholders.province} disabled={isDisabled || isLoading} required={isRequired} theme={theme} size={size} variant={variant} label={labels.province} error={!!errorMessageState} style={provinceInputStyle}/>
      </div>

      <div className="province-city-select__group" style={groupStyle}>
        <FlexibleInput value={selectedCity} onChange={handleCityChange} options={cityOptions} inputType={selectorType} placeholder={placeholders.city} disabled={!selectedProvince || isDisabled || isLoading} required={isRequired} theme={theme} size={size} variant={variant} label={labels.city} error={!!errorMessageState} style={cityInputStyle}/>
      </div>

      {errorMessageState && (<div className="province-city-select__error" style={errorStyle}>
          <svg className="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12" y2="16"/>
          </svg>
          <span>{errorMessageState}</span>
        </div>)}

      {isLoading && (<div className="province-city-select__loading" style={loadingStyle}>
          <div className="loading-spinner"></div>
        </div>)}
    </div>);
};
export default ProvinceCitySelect;
