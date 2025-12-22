import {
  ProvinceCitySelect,
  ThemeProvider,
  type Province,
  type ProvinceCity,
} from 'iran-regions';
import 'iran-regions/styles';
import React, { useState } from 'react';

// Example 1: Basic Usage
export function BasicExample() {
  const [value, setValue] = useState<ProvinceCity>({ province: '', city: '' });

  return (
    <ProvinceCitySelect
      value={value}
      onChange={setValue}
      placeholders={{
        province: 'انتخاب استان',
        city: 'انتخاب شهر',
      }}
    />
  );
}

// Example 2: With All Themes
export function ThemeShowcase() {
  const [theme, setTheme] = useState<
    'light' | 'dark' | 'modern' | 'minimal' | 'ocean'
  >('light');
  const [value, setValue] = useState<ProvinceCity>({ province: '', city: '' });

  return (
    <div>
      <select
        value={theme}
        onChange={(e) =>
          setTheme(
            e.target.value as 'light' | 'dark' | 'modern' | 'minimal' | 'ocean',
          )
        }
        style={{ marginBottom: '1rem' }}
      >
        <option value="light">Light Theme</option>
        <option value="dark">Dark Theme</option>
        <option value="modern">Modern Theme</option>
        <option value="minimal">Minimal Theme</option>
        <option value="ocean">Ocean Theme</option>
      </select>

      <ProvinceCitySelect value={value} onChange={setValue} theme={theme} />
    </div>
  );
}

// Example 3: Autocomplete with Search
export function AutocompleteExample() {
  const [value, setValue] = useState<ProvinceCity>({ province: '', city: '' });

  return (
    <ProvinceCitySelect
      value={value}
      onChange={setValue}
      selectorType="autocomplete"
      search={{
        enabled: true,
        debounceMs: 200,
        placeholder: 'جستجو...',
        minCharacters: 2,
      }}
      dropdown={{
        maxHeight: 300,
        virtualScroll: true,
      }}
    />
  );
}

// Example 4: Different Sizes
export function SizeExample() {
  const [value, setValue] = useState<ProvinceCity>({ province: '', city: '' });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3>Extra Small</h3>
        <ProvinceCitySelect value={value} onChange={setValue} size="xs" />
      </div>

      <div>
        <h3>Small</h3>
        <ProvinceCitySelect value={value} onChange={setValue} size="sm" />
      </div>

      <div>
        <h3>Medium (Default)</h3>
        <ProvinceCitySelect value={value} onChange={setValue} size="md" />
      </div>

      <div>
        <h3>Large</h3>
        <ProvinceCitySelect value={value} onChange={setValue} size="lg" />
      </div>

      <div>
        <h3>Extra Large</h3>
        <ProvinceCitySelect value={value} onChange={setValue} size="xl" />
      </div>
    </div>
  );
}

// Example 5: Different Variants
export function VariantExample() {
  const [value, setValue] = useState<ProvinceCity>({ province: '', city: '' });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3>Outlined (Default)</h3>
        <ProvinceCitySelect
          value={value}
          onChange={setValue}
          variant="outlined"
        />
      </div>

      <div>
        <h3>Filled</h3>
        <ProvinceCitySelect
          value={value}
          onChange={setValue}
          variant="filled"
        />
      </div>

      <div>
        <h3>Underlined</h3>
        <ProvinceCitySelect
          value={value}
          onChange={setValue}
          variant="underlined"
        />
      </div>

      <div>
        <h3>Borderless</h3>
        <ProvinceCitySelect
          value={value}
          onChange={setValue}
          variant="borderless"
        />
      </div>
    </div>
  );
}

// Example 6: With Validation
export function ValidationExample() {
  const [value, setValue] = useState<ProvinceCity>({ province: '', city: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (value.province && value.city) {
      alert(`Selected: ${value.province} - ${value.city}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <ProvinceCitySelect
        value={value}
        onChange={setValue}
        isRequired
        validation={{
          required: { message: 'لطفا استان و شهر را انتخاب کنید' },
          custom: (val) => {
            if (!val.province) return 'استان الزامی است';
            if (!val.city) return 'شهر الزامی است';
            return null;
          },
        }}
        showErrorMessages={submitted}
      />
      <button type="submit" style={{ marginTop: '1rem' }}>
        ثبت
      </button>
    </form>
  );
}

// Example 7: With Custom Data
export function CustomDataExample() {
  const customProvinces: Province[] = [
    {
      name: 'تهران',
      cities: ['تهران', 'شمیرانات', 'ری', 'ورامین'],
    },
    {
      name: 'اصفهان',
      cities: ['اصفهان', 'کاشان', 'نجف‌آباد', 'خمینی‌شهر'],
    },
    {
      name: 'فارس',
      cities: ['شیراز', 'مرودشت', 'فسا', 'کازرون'],
    },
  ];

  const [value, setValue] = useState<ProvinceCity>({ province: '', city: '' });

  return (
    <ProvinceCitySelect
      value={value}
      onChange={setValue}
      provinces={customProvinces}
    />
  );
}

// Example 8: With Filtering and Sorting
export function FilterSortExample() {
  const [value, setValue] = useState<ProvinceCity>({ province: '', city: '' });

  return (
    <ProvinceCitySelect
      value={value}
      onChange={setValue}
      filterProvinces={(provinces) =>
        provinces.filter(
          (p) => p.name.startsWith('ت') || p.name.startsWith('ا'),
        )
      }
      sortProvinces={(a, b) => a.name.localeCompare(b.name, 'fa')}
      sortCities={(a, b) => a.localeCompare(b, 'fa')}
    />
  );
}

// Example 9: With Theme Provider
export function ThemeProviderExample() {
  const [value, setValue] = useState<ProvinceCity>({ province: '', city: '' });

  return (
    <ThemeProvider theme="modern">
      <div style={{ padding: '2rem' }}>
        <h2>Form with Theme Provider</h2>
        <ProvinceCitySelect value={value} onChange={setValue} />
      </div>
    </ThemeProvider>
  );
}

// Example 10: Clearable with Callbacks
export function CallbackExample() {
  const [value, setValue] = useState<ProvinceCity>({ province: '', city: '' });

  return (
    <ProvinceCitySelect
      value={value}
      onChange={setValue}
      clearable
      onProvinceChange={(province) =>
        console.log('Province changed:', province)
      }
      onCityChange={(city) => console.log('City changed:', city)}
      onFocus={(e) => console.log('Focused:', e.target)}
      onBlur={(e) => console.log('Blurred:', e.target)}
    />
  );
}

// Example 11: Performance - Virtual Scrolling
export function PerformanceExample() {
  const [value, setValue] = useState<ProvinceCity>({ province: '', city: '' });

  return (
    <ProvinceCitySelect
      value={value}
      onChange={setValue}
      dropdown={{
        virtualScroll: true,
        itemHeight: 40,
        maxHeight: 400,
      }}
      search={{
        enabled: true,
        debounceMs: 150,
      }}
    />
  );
}

// Example 12: Fully Customized
export function FullyCustomizedExample() {
  const [value, setValue] = useState<ProvinceCity>({ province: '', city: '' });

  return (
    <ProvinceCitySelect
      value={value}
      onChange={setValue}
      theme="ocean"
      size="lg"
      variant="filled"
      clearable
      selectorType="combobox"
      placeholders={{
        province: '🏙️ استان خود را انتخاب کنید',
        city: '🏘️ شهر خود را انتخاب کنید',
      }}
      labels={{
        province: 'استان محل سکونت',
        city: 'شهر محل سکونت',
      }}
      validation={{
        required: true,
      }}
      dropdown={{
        maxHeight: 350,
        placement: 'auto',
        virtualScroll: true,
      }}
      search={{
        enabled: true,
        debounceMs: 200,
        placeholder: 'جستجو کنید...',
      }}
      keyboard={{
        enabled: true,
        closeOnEscape: true,
        selectOnEnter: true,
      }}
      accessibility={{
        ariaLabel: 'انتخاب استان و شهر',
        ariaRequired: true,
      }}
      containerStyle={{
        maxWidth: '500px',
        margin: '0 auto',
      }}
      sortProvinces
      sortCities
    />
  );
}
