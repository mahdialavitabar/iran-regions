var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import React, { memo, useEffect, useMemo, useState } from 'react';
import FlexibleInput from './flexibleSelect';
import './ProvinceCitySelect.css';
// Memoized error message component
var ErrorMessage = memo(function (_a) {
    var message = _a.message, style = _a.style;
    return (<div className="province-city-select__error" style={style}>
      <svg className="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12" y2="16"/>
      </svg>
      <span>{message}</span>
    </div>);
});
// Memoized loading component
var LoadingSpinner = memo(function (_a) {
    var style = _a.style;
    return (<div className="province-city-select__loading" style={style}>
    <div className="loading-spinner"></div>
  </div>);
});
var ProvinceCitySelect = memo(function (_a) {
    var _b = _a.value, value = _b === void 0 ? { province: '', city: '' } : _b, onChange = _a.onChange, _c = _a.theme, theme = _c === void 0 ? 'light' : _c, _d = _a.size, size = _d === void 0 ? 'md' : _d, _e = _a.variant, variant = _e === void 0 ? 'outlined' : _e, _f = _a.isRequired, isRequired = _f === void 0 ? false : _f, _g = _a.isDisabled, isDisabled = _g === void 0 ? false : _g, _h = _a.placeholders, placeholders = _h === void 0 ? {
        province: 'انتخاب استان',
        city: 'انتخاب شهر',
    } : _h, _j = _a.labels, labels = _j === void 0 ? {
        province: 'استان',
        city: 'شهر',
    } : _j, _k = _a.className, className = _k === void 0 ? '' : _k, onProvinceChange = _a.onProvinceChange, onCityChange = _a.onCityChange, _l = _a.selectorType, selectorType = _l === void 0 ? 'select' : _l, style = _a.style, groupStyle = _a.groupStyle, provinceInputStyle = _a.provinceInputStyle, cityInputStyle = _a.cityInputStyle, errorStyle = _a.errorStyle, loadingStyle = _a.loadingStyle;
    var _m = useState(value.province), selectedProvince = _m[0], setSelectedProvince = _m[1];
    var _o = useState(value.city), selectedCity = _o[0], setSelectedCity = _o[1];
    var _p = useState(''), errorMessageState = _p[0], setErrorMessageState = _p[1];
    var _q = useState([]), provinces = _q[0], setProvinces = _q[1];
    var _r = useState(true), isLoading = _r[0], setIsLoading = _r[1];
    var _s = useState(null), error = _s[0], setError = _s[1];
    // Memoize options to prevent unnecessary recalculations
    var provinceOptions = useMemo(function () {
        return provinces.map(function (p) { return ({
            value: p.name,
            label: p.name,
        }); });
    }, [provinces]);
    var cityOptions = useMemo(function () {
        var _a;
        return ((_a = provinces
            .find(function (p) { return p.name === selectedProvince; })) === null || _a === void 0 ? void 0 : _a.cities.map(function (city) { return ({
            value: city,
            label: city,
        }); })) || [];
    }, [provinces, selectedProvince]);
    useEffect(function () {
        var fetchProvinces = function () { return __awaiter(void 0, void 0, void 0, function () {
            var cachedData, data, response, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cachedData = localStorage.getItem('provincesData');
                        if (cachedData) {
                            try {
                                data = JSON.parse(cachedData);
                                if (Array.isArray(data)) {
                                    setProvinces(data);
                                    setIsLoading(false);
                                    return [2 /*return*/];
                                }
                            }
                            catch (error) {
                                console.error('Error parsing cached data:', error);
                            }
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch('https://gist.githubusercontent.com/mahdialavitabar/115d131d6fe1f56e1f177aa4c741739d/raw/a070a0fe4f82a8a378c67d42abda3046134ed97c/data.json')];
                    case 2:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return [4 /*yield*/, response.json()];
                    case 3:
                        data = _a.sent();
                        if (Array.isArray(data)) {
                            setProvinces(data);
                            localStorage.setItem('provincesData', JSON.stringify(data));
                            setIsLoading(false);
                        }
                        else {
                            throw new Error('Fetched data is not an array');
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        console.error('Error fetching provinces data:', error_1);
                        setError(error_1.message);
                        setIsLoading(false);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        fetchProvinces();
    }, []);
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
    // Memoize handlers to prevent unnecessary rerenders
    var handleProvinceChange = React.useCallback(function (province) {
        setSelectedProvince(province);
        setSelectedCity('');
        onChange === null || onChange === void 0 ? void 0 : onChange({ province: province, city: '' });
        onProvinceChange === null || onProvinceChange === void 0 ? void 0 : onProvinceChange(province);
    }, [onChange, onProvinceChange]);
    var handleCityChange = React.useCallback(function (city) {
        setSelectedCity(city);
        onChange === null || onChange === void 0 ? void 0 : onChange({ province: selectedProvince, city: city });
        onCityChange === null || onCityChange === void 0 ? void 0 : onCityChange(city);
        if (selectedProvince && city) {
            setErrorMessageState('');
        }
    }, [onChange, onCityChange, selectedProvince]);
    return (<div className={"province-city-select ".concat(className)} style={style}>
        <div className="province-city-select__group" style={groupStyle}>
          <FlexibleInput value={selectedProvince} onChange={handleProvinceChange} options={provinceOptions} inputType={selectorType} placeholder={placeholders.province} disabled={isDisabled || isLoading} required={isRequired} theme={theme} size={size} variant={variant} label={labels.province} error={!!errorMessageState} style={provinceInputStyle}/>
        </div>
        <div className="province-city-select__group" style={groupStyle}>
          <FlexibleInput value={selectedCity} onChange={handleCityChange} options={cityOptions} inputType={selectorType} placeholder={placeholders.city} disabled={!selectedProvince || isDisabled || isLoading} required={isRequired} theme={theme} size={size} variant={variant} label={labels.city} error={!!errorMessageState} style={cityInputStyle}/>
        </div>
        {errorMessageState && (<ErrorMessage message={errorMessageState} style={errorStyle}/>)}
        {isLoading && <LoadingSpinner style={loadingStyle}/>}
        {error && <ErrorMessage message={error} style={errorStyle}/>}
      </div>);
});
export default ProvinceCitySelect;
