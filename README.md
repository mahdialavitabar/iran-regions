# Iran Regions

A highly customizable React component library for selecting Iranian provinces and cities. Built with TypeScript, featuring multiple themes, performance optimizations, and extensive configuration options.

[![npm version](https://img.shields.io/npm/v/iran-regions.svg)](https://www.npmjs.com/package/iran-regions)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

## Features

🎨 **Multiple Built-in Themes** - Light, Dark, Modern, Minimal, and Ocean themes
🛠️ **Highly Customizable** - Extensive props for styling and behavior
⚡ **Performance Optimized** - Virtual scrolling, memoization, debouncing
♿ **Accessible** - ARIA attributes and keyboard navigation
🌍 **RTL Support** - Automatic RTL detection for Persian text
📦 **TypeScript** - Full type definitions included
🎯 **Zero Dependencies** - Only requires React
🔍 **Smart Search** - Multiple input types (select, autocomplete, combobox)
💾 **Data Caching** - Automatic localStorage caching
🎭 **Custom Rendering** - Override default renderers

## Installation

```bash
npm install iran-regions
```

```bash
yarn add iran-regions
```

```bash
pnpm add iran-regions
```

## Quick Start

```tsx
import { ProvinceCitySelect } from 'iran-regions';
import 'iran-regions/styles';

function App() {
  const [value, setValue] = useState({ province: '', city: '' });

  return (
    <ProvinceCitySelect
      value={value}
      onChange={setValue}
      theme="light"
      size="md"
    />
  );
}
```

## Themes

### Using Built-in Themes

```tsx
import { ProvinceCitySelect } from 'iran-regions';

// Available themes: 'light', 'dark', 'modern', 'minimal', 'ocean'
<ProvinceCitySelect theme="dark" />;
```

### Using Theme Provider

```tsx
import { ThemeProvider, ProvinceCitySelect } from 'iran-regions';

function App() {
  return (
    <ThemeProvider theme="modern">
      <ProvinceCitySelect />
    </ThemeProvider>
  );
}
```

### Custom Theme

```tsx
import { applyTheme } from 'iran-regions';

// Apply custom theme programmatically
applyTheme({
  colors: {
    primary: '#ff6b6b',
    background: '#ffffff',
    // ... other color tokens
  },
  spacing: { sm: '0.5rem', md: '1rem', lg: '1.5rem' },
  borderRadius: { sm: '4px', md: '8px', lg: '12px' },
  // ... other theme tokens
});
```

## Props Reference

### Core Props

| Prop               | Type                            | Default                      | Description                |
| ------------------ | ------------------------------- | ---------------------------- | -------------------------- |
| `value`            | `ProvinceCity`                  | -                            | Controlled value           |
| `defaultValue`     | `ProvinceCity`                  | `{ province: '', city: '' }` | Default uncontrolled value |
| `onChange`         | `(value: ProvinceCity) => void` | -                            | Change handler             |
| `onProvinceChange` | `(province: string) => void`    | -                            | Province change handler    |
| `onCityChange`     | `(city: string) => void`        | -                            | City change handler        |

### Appearance Props

| Prop        | Type                                                     | Default       | Description         |
| ----------- | -------------------------------------------------------- | ------------- | ------------------- |
| `theme`     | `'light' \| 'dark' \| 'modern' \| 'minimal' \| 'ocean'`  | `'light'`     | Built-in theme      |
| `size`      | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                   | `'md'`        | Component size      |
| `variant`   | `'outlined' \| 'filled' \| 'underlined' \| 'borderless'` | `'outlined'`  | Input style variant |
| `direction` | `'ltr' \| 'rtl'`                                         | Auto-detected | Text direction      |

### Behavior Props

| Prop           | Type                                       | Default    | Description       |
| -------------- | ------------------------------------------ | ---------- | ----------------- |
| `selectorType` | `'select' \| 'autocomplete' \| 'combobox'` | `'select'` | Input type        |
| `isRequired`   | `boolean`                                  | `false`    | Mark as required  |
| `isDisabled`   | `boolean`                                  | `false`    | Disable component |
| `readonly`     | `boolean`                                  | `false`    | Make read-only    |
| `clearable`    | `boolean`                                  | `false`    | Show clear button |

### Data Props

| Prop              | Type                             | Default | Description           |
| ----------------- | -------------------------------- | ------- | --------------------- |
| `provinces`       | `Province[]`                     | Fetched | Custom provinces data |
| `dataSource`      | `DataSource`                     | Default | Custom data source    |
| `filterProvinces` | `(provinces) => Province[]`      | -       | Filter provinces      |
| `filterCities`    | `(cities, province) => string[]` | -       | Filter cities         |
| `sortProvinces`   | `boolean \| Function`            | `false` | Sort provinces        |
| `sortCities`      | `boolean \| Function`            | `false` | Sort cities           |

### Advanced Configuration

```tsx
<ProvinceCitySelect
  // Validation
  validation={{
    required: { message: 'This field is required' },
    custom: (value) => {
      if (!value.province || !value.city) return 'Please select both';
      return null;
    },
  }}
  // Dropdown configuration
  dropdown={{
    maxHeight: 300,
    placement: 'auto',
    virtualScroll: true,
    itemHeight: 36,
    width: '100%',
  }}
  // Search configuration
  search={{
    enabled: true,
    debounceMs: 150,
    caseSensitive: false,
    placeholder: 'جستجو...',
    minCharacters: 2,
  }}
  // Keyboard navigation
  keyboard={{
    enabled: true,
    closeOnEscape: true,
    selectOnEnter: true,
    navigateWithArrows: true,
  }}
  // Accessibility
  accessibility={{
    ariaLabel: 'Province and City Selector',
    ariaRequired: true,
  }}
  // Custom icons
  icons={{
    arrow: <ChevronDownIcon />,
    clear: <XIcon />,
    error: <AlertIcon />,
    loading: <SpinnerIcon />,
  }}
  // Loading configuration
  loading={{
    text: 'در حال بارگذاری...',
    spinnerColor: '#3b82f6',
  }}
  // Error configuration
  error={{
    showIcon: true,
    retryButton: true,
    onRetry: () => refetch(),
  }}
/>
```

## Examples

### Autocomplete with Search

```tsx
<ProvinceCitySelect
  selectorType="autocomplete"
  search={{ enabled: true, debounceMs: 200 }}
  placeholder={{ province: 'جستجوی استان...', city: 'جستجوی شهر...' }}
/>
```

### Custom Styling

```tsx
<ProvinceCitySelect
  className="my-custom-class"
  style={{ maxWidth: '400px' }}
  provinceInputStyle={{ backgroundColor: '#f0f0f0' }}
  cityInputStyle={{ backgroundColor: '#f0f0f0' }}
  variant="filled"
  size="lg"
/>
```

### With Custom Data Source

```tsx
import { DataSource } from 'iran-regions'

const customDataSource = new DataSource({
  url: 'https://api.example.com/provinces',
  cacheKey: 'my-provinces',
  cacheDuration: 1000 * 60 * 60, // 1 hour
  onError: (error) => console.error(error),
  onSuccess: (data) => console.log('Data loaded', data)
})

<ProvinceCitySelect dataSource={customDataSource} />
```

### Controlled with Validation

```tsx
function ControlledExample() {
  const [value, setValue] = useState({ province: '', city: '' });
  const [error, setError] = useState('');

  const handleChange = (newValue) => {
    setValue(newValue);
    if (newValue.province && newValue.city) {
      setError('');
    }
  };

  return (
    <ProvinceCitySelect
      value={value}
      onChange={handleChange}
      isRequired
      showErrorMessages
      validation={{
        custom: (val) => {
          if (!val.province) return 'استان را انتخاب کنید';
          if (!val.city) return 'شهر را انتخاب کنید';
          return null;
        },
      }}
    />
  );
}
```

### With Theme Switching

```tsx
function ThemeSwitcher() {
  const [theme, setTheme] = useState('light');

  return (
    <div>
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="modern">Modern</option>
        <option value="minimal">Minimal</option>
        <option value="ocean">Ocean</option>
      </select>

      <ProvinceCitySelect theme={theme} />
    </div>
  );
}
```

## Performance Features

### Virtual Scrolling

Automatically enabled for large option lists (>100 items):

```tsx
<ProvinceCitySelect dropdown={{ virtualScroll: true, itemHeight: 36 }} />
```

### Debounced Search

```tsx
<ProvinceCitySelect search={{ enabled: true, debounceMs: 300 }} />
```

### Memoization

All options and handlers are memoized for optimal performance.

### Data Caching

Province data is automatically cached in localStorage with configurable duration.

## TypeScript

Full TypeScript support with exported types:

```tsx
import type {
  Province,
  ProvinceCity,
  ProvinceCitySelectProps,
  ThemeConfig,
  DataSourceConfig,
} from 'iran-regions';
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

ISC © Mahdi Alavitabar

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues and feature requests, please use the [GitHub issue tracker](https://github.com/mahdialavitabar/iran-regions/issues).
