# Iran Province City Selector

A React component for selecting Iranian provinces and cities with support for multiple input types, themes, and customization options.

[![npm version](https://img.shields.io/npm/v/iran-province-city-selector.svg)](https://www.npmjs.com/package/iran-province-city-selector)
[![license](https://img.shields.io/npm/l/iran-province-city-selector.svg)](https://github.com/meyt/iran-province-city-selector/blob/main/LICENSE)

## Features

- 🌍 Complete list of Iranian provinces and cities
- 🎨 Multiple themes (light/dark)
- 📱 Responsive design
- ⌨️ Multiple input types (select/autocomplete/combobox)
- 🎯 TypeScript support
- 🔍 Search functionality
- 🎭 Different variants and sizes
- ♿ Accessibility support
- 🌐 RTL support
- 🎛️ Highly customizable

## Installation

```bash
npm install iran-province-city-selector
```

or

```bash
yarn add iran-province-city-selector
```

## Quick Start

```jsx
import ProvinceCitySelect from 'iran-province-city-selector'
import 'iran-province-city-selector/dist/index.css'

function App() {
  const handleChange = value => {
    console.log('Selected:', value)
    // value = { province: "تهران", city: "تهران" }
  }

  return (
    <ProvinceCitySelect
      onChange={handleChange}
      theme="light"
      size="md"
      variant="outlined"
    />
  )
}
```

## API Reference

### ProvinceCitySelect Props

| Prop             | Type                                                | Default                                          | Description                           |
| ---------------- | --------------------------------------------------- | ------------------------------------------------ | ------------------------------------- |
| value            | { province: string; city: string }                  | { province: '', city: '' }                       | Selected province and city            |
| onChange         | (value: { province: string; city: string }) => void | -                                                | Callback when selection changes       |
| selectorType     | 'select' \| 'autocomplete' \| 'combobox'            | 'select'                                         | Type of input to display              |
| theme            | 'light' \| 'dark'                                   | 'light'                                          | Color theme                           |
| size             | 'sm' \| 'md' \| 'lg'                                | 'md'                                             | Component size                        |
| variant          | 'outlined' \| 'filled'                              | 'outlined'                                       | Visual variant                        |
| isRequired       | boolean                                             | false                                            | Whether fields are required           |
| isDisabled       | boolean                                             | false                                            | Whether component is disabled         |
| isLoading        | boolean                                             | false                                            | Whether component is in loading state |
| errorMessage     | string                                              | ''                                               | Error message to display              |
| placeholders     | { province?: string; city?: string }                | { province: 'انتخاب استان', city: 'انتخاب شهر' } | Input placeholders                    |
| labels           | { province?: string; city?: string }                | { province: 'استان', city: 'شهر' }               | Field labels                          |
| className        | string                                              | ''                                               | Additional CSS class                  |
| onProvinceChange | (province: string) => void                          | -                                                | Callback when province changes        |
| onCityChange     | (city: string) => void                              | -                                                | Callback when city changes            |

### Styling

The component can be styled using CSS classes:

```css
.province-city-select {
  /* Container styles */
}

.province-city-select__group {
  /* Field group styles */
}

.province-city-select__error {
  /* Error message styles */
}

.province-city-select__loading {
  /* Loading indicator styles */
}
```

### Themes

Two built-in themes are available:

```jsx
// Light theme (default)
<ProvinceCitySelect theme="light" />

// Dark theme
<ProvinceCitySelect theme="dark" />
```

### Input Types

Three input types are supported:

```jsx
// Regular select dropdown
<ProvinceCitySelect selectorType="select" />

// Autocomplete with search
<ProvinceCitySelect selectorType="autocomplete" />

// Combobox with search and custom input
<ProvinceCitySelect selectorType="combobox" />
```

### Sizes

Three sizes are available:

```jsx
// Small
<ProvinceCitySelect size="sm" />

// Medium (default)
<ProvinceCitySelect size="md" />

// Large
<ProvinceCitySelect size="lg" />
```

### Variants

Two variants are supported:

```jsx
// Outlined (default)
<ProvinceCitySelect variant="outlined" />

// Filled
<ProvinceCitySelect variant="filled" />
```

## Examples

### Basic Usage

```jsx
import ProvinceCitySelect from 'iran-province-city-selector'
import 'iran-province-city-selector/dist/index.css'
;<ProvinceCitySelect onChange={value => console.log(value)} />
```

### With Initial Value

```jsx
<ProvinceCitySelect
  value={{ province: 'تهران', city: 'تهران' }}
  onChange={value => console.log(value)}
/>
```

### With Custom Labels and Placeholders

```jsx
<ProvinceCitySelect
  labels={{
    province: 'استان محل سکونت',
    city: 'شهر محل سکونت',
  }}
  placeholders={{
    province: 'استان را انتخاب کنید',
    city: 'شهر را انتخاب کنید',
  }}
/>
```

### With Validation

```jsx
<ProvinceCitySelect
  isRequired={true}
  errorMessage="انتخاب استان و شهر الزامی است"
/>
```

### With Loading State

```jsx
<ProvinceCitySelect isLoading={true} />
```

### Dark Theme with Autocomplete

```jsx
<ProvinceCitySelect theme="dark" selectorType="autocomplete" variant="filled" />
```

## TypeScript Support

The package includes TypeScript definitions. Types can be imported:

```typescript
import ProvinceCitySelectProps, { Province } from 'iran-province-city-selector'
```

## Browser Support

- Chrome
- Firefox
- Safari
- Edge
- Opera

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

ISC License - See [LICENSE](LICENSE) for details.

## Documentation

- [Detailed documentation](docs/README.md)
- [Storybook Documentation](http://localhost:6006)

## More Details

For more detailed information including:

- Installation guide with all required dependencies and environment setup
- Detailed API reference documenting all components, functions, props, and methods
- Configuration options and customization capabilities
- Code snippets and implementation examples
- Common use cases and best practices
- Troubleshooting guide and known limitations
- TypeScript type definitions and interfaces
- Integration examples with popular frameworks
- Performance considerations and optimization tips
- Interactive component demos and live code examples
- Component variants and states
- Props playground for testing different configurations
- Accessibility testing scenarios
- Responsive design testing
- Theme customization examples
- Integration testing examples
- Edge case demonstrations
- Loading and error states
- Component composition patterns
- Version compatibility information
- Contributing guidelines
- License details
- Support channels
- Changelog and migration guides
- Security considerations
- Browser/device compatibility matrix
  check the `docs` folder and the Storybook documentation.
