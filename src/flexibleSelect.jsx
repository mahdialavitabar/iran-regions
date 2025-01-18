import React, { memo, useEffect, useRef, useState } from 'react';
import './flexibleSelect.css';
var FlexibleInput = function (_a) {
    var value = _a.value, onChange = _a.onChange, options = _a.options, _b = _a.inputType, inputType = _b === void 0 ? 'select' : _b, _c = _a.placeholder, placeholder = _c === void 0 ? '' : _c, _d = _a.disabled, disabled = _d === void 0 ? false : _d, _e = _a.required, required = _e === void 0 ? false : _e, _f = _a.theme, theme = _f === void 0 ? 'light' : _f, _g = _a.size, size = _g === void 0 ? 'md' : _g, _h = _a.variant, variant = _h === void 0 ? 'outlined' : _h, label = _a.label, _j = _a.error, error = _j === void 0 ? false : _j, _k = _a.className, className = _k === void 0 ? '' : _k, style = _a.style;
    var _l = useState(false), isOpen = _l[0], setIsOpen = _l[1];
    var _m = useState(value), searchValue = _m[0], setSearchValue = _m[1];
    var _o = useState(options), filteredOptions = _o[0], setFilteredOptions = _o[1];
    var containerRef = useRef(null);
    var inputRef = useRef(null);
    useEffect(function () {
        setSearchValue(value);
        if (inputType !== 'select') {
            var filtered = options.filter(function (option) {
                return option.label.toLowerCase().includes(searchValue.toLowerCase());
            });
            setFilteredOptions(filtered);
        }
        else {
            setFilteredOptions(options);
        }
    }, [value, searchValue, options, inputType]);
    useEffect(function () {
        var handleClickOutside = function (event) {
            if (containerRef.current &&
                !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return function () { return document.removeEventListener('mousedown', handleClickOutside); };
    }, []);
    var containerClasses = [
        'flexible-input',
        "theme-".concat(theme),
        "size-".concat(size),
        "variant-".concat(variant),
        error && 'error',
        disabled && 'disabled',
        isOpen && 'open',
        className,
    ]
        .filter(Boolean)
        .join(' ');
    var handleInputChange = function (event) {
        setSearchValue(event.target.value);
        setIsOpen(true);
    };
    var handleOptionClick = function (optionValue) {
        onChange(optionValue);
        var selectedOption = options.find(function (opt) { return opt.value === optionValue; });
        if (inputType !== 'select' && selectedOption) {
            setSearchValue(selectedOption.label);
        }
        setIsOpen(false);
    };
    var renderInput = function () {
        switch (inputType) {
            case 'select':
            case 'autocomplete':
            case 'combobox':
                return (<input ref={inputRef} type="text" value={inputType === 'select' ? value : searchValue} onChange={handleInputChange} disabled={disabled} required={required} placeholder={placeholder} className="flexible-input__input" onFocus={function () { return setIsOpen(true); }}/>);
            default:
                return (<input ref={inputRef} type="text" value={searchValue} onChange={handleInputChange} disabled={disabled} required={required} placeholder={placeholder} className="flexible-input__input" onFocus={function () { return setIsOpen(true); }}/>);
        }
    };
    return (<div className={containerClasses} ref={containerRef} style={style}>
      {label && (<label className="flexible-input__label">
          {label}
          {required && <span className="required-mark">*</span>}
        </label>)}

      <div className="flexible-input__input-container">
        {renderInput()}
        <svg className={"flexible-input__arrow ".concat(isOpen ? 'open' : '')} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 9l-7 7-7-7"/>
        </svg>
      </div>

      {isOpen && (<div className="flexible-input__options">
          {filteredOptions.map(function (option) { return (<div key={option.value} className={"flexible-input__option ".concat(value === option.value ? 'selected' : '')} onClick={function () { return handleOptionClick(option.value); }}>
              {option.label}
            </div>); })}
          {filteredOptions.length === 0 && (<div className="flexible-input__no-results">
              هیچ نتیجه‌ای یافت نشد
            </div>)}
        </div>)}
    </div>);
};
export default memo(FlexibleInput);
