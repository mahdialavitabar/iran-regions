# Documentation and Tips...

[![npm version](https://img.shields.io/npm/v/iran-regions.svg)](https://www.npmjs.com/package/iran-regions)
[![license](https://img.shields.io/npm/l/iran-regions.svg)](https://github.com/meyt/iran-regions/blob/main/LICENSE)
[![npm downloads](https://img.shields.io/npm/dm/iran-regions.svg)](https://www.npmjs.com/package/iran-regions)

## Installation Guide

A React component for selecting Iranian provinces and cities with support for multiple input types, themes, and customization options.

## Installation Guide

To install the `iran-regions` package, run the following command:

```bash
npm install iran-regions
```

```bash
yarn add iran-regions
```

## Quick Start

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
- 🔥 Auto caching data and UI for improved performance

Here is a basic example of how to use the `ProvinceCitySelect` component:

```jsx
import ProvinceCitySelect from 'iran-regions'
import 'iran-regions/dist/index.css'
import { useState } from 'react'

function App() {
  const [location, setLocation] = useState({ province: '', city: '' })

  const handleChange = value => {
    console.log('Selected:', value)
    setLocation(value)
  }

  return (
    <ProvinceCitySelect
      value={location}
      onChange={handleChange}
      theme="light"
      size="md"
      variant="outlined"
    />
  )
}

export default App
```

## API Reference

### ProvinceCitySelect Props

#### Callbacks

- **onProvinceChange**: `(province: string) => void`

  - Callback function that is called when the selected province changes. It receives the new province as an argument.

- **onCityChange**: `(city: string) => void`

  - Callback function that is called when the selected city changes. It receives the new city as an argument.

#### Custom Styles

- **provinceInputStyle**: `React.CSSProperties`

  - Custom styles for the province input field.

- **cityInputStyle**: `React.CSSProperties`

  - Custom styles for the city input field.

- **errorStyle**: `React.CSSProperties`

  - Custom styles for the error message.

- **loadingStyle**: `React.CSSProperties`

  - Custom styles for the loading indicator.

| Prop               | Type                                                | Default                                          | Description                           |
| ------------------ | --------------------------------------------------- | ------------------------------------------------ | ------------------------------------- |
| value              | { province: string; city: string }                  | { province: '', city: '' }                       | Selected province and city            |
| onChange           | (value: { province: string; city: string }) => void | -                                                | Callback when selection changes       |
| selectorType       | 'select' \| 'autocomplete' \| 'combobox'            | 'select'                                         | Type of input to display              |
| theme              | 'light' \| 'dark'                                   | 'light'                                          | Color theme                           |
| size               | 'sm' \| 'md' \| 'lg'                                | 'md'                                             | Component size                        |
| variant            | 'outlined' \| 'filled'                              | 'outlined'                                       | Visual variant                        |
| isRequired         | boolean                                             | false                                            | Whether fields are required           |
| isDisabled         | boolean                                             | false                                            | Whether component is disabled         |
| isLoading          | boolean                                             | false                                            | Whether component is in loading state |
| errorMessage       | string                                              | ''                                               | Error message to display              |
| placeholders       | { province?: string; city?: string }                | { province: 'انتخاب استان', city: 'انتخاب شهر' } | Input placeholders                    |
| labels             | { province?: string; city?: string }                | { province: 'استان', city: 'شهر' }               | Field labels                          |
| className          | string                                              | ''                                               | Additional CSS class                  |
| onProvinceChange   | (province: string) => void                          | -                                                | Callback when province changes        |
| onCityChange       | (city: string) => void                              | -                                                | Callback when city changes            |
| provinceInputStyle | React.CSSProperties                                 | -                                                | Custom styles for province input      |
| cityInputStyle     | React.CSSProperties                                 | -                                                | Custom styles for city input          |
| errorStyle         | React.CSSProperties                                 | -                                                | Custom styles for error message       |
| loadingStyle       | React.CSSProperties                                 | -                                                | Custom styles for loading indicator   |

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

### Data Fetching in App.tsx

The `App.tsx` file includes a mechanism to fetch provinces data from a URL and cache it in `localStorage`. This ensures that the data is only fetched once and reused on subsequent renders.

```jsx
useEffect(() => {
  const fetchProvinces = async () => {
    const cachedData = localStorage.getItem('provincesData')
    if (cachedData) {
      const data = JSON.parse(cachedData)
      if (Array.isArray(data)) {
        console.log('Using cached data:', data)
        setProvinces(data)
      } else {
        console.error('Cached data is not an array:', data)
      }
    } else {
      try {
        const response = await fetch(
          'https://gist.githubusercontent.com/mahdialavitabar/115d131d6fe1f56e1f177aa4c741739d/raw/a070a0fe4f82a8a378c67d42abda3046134ed97c/data.json'
        )
        console.log('Response received:', response)
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        console.log(data)

        if (Array.isArray(data)) {
          console.log('Fetched data:', data) // Add this line to log the fetched data
          setProvinces(data)
          localStorage.setItem('provincesData', JSON.stringify(data))
        } else {
          console.error('Fetched data is not an array:', data)
        }
      } catch (error) {
        console.error('Error fetching provinces data:', error)
      }
    }
  }
  fetchProvinces()
}, [])
```

This code snippet demonstrates how the `App.tsx` component fetches provinces data from a URL and caches it in `localStorage` to avoid unnecessary network requests.

### Performance and Caching

To enhance performance, the component caches the fetched provinces data in `localStorage`. This caching mechanism ensures that the data is only fetched once and reused on subsequent renders, reducing network requests and improving load times.

```jsx
localStorage.setItem('provincesData', JSON.stringify(data))
```

#### Caching the ProvinceCitySelect Component

The `ProvinceCitySelect` component itself does not have built-in caching mechanisms. However, the data it relies on (provinces and cities) is cached in `localStorage` within the `App.tsx` component. This means that once the data is fetched and stored in `localStorage`, the `ProvinceCitySelect` component can be rendered without additional network requests, leveraging the cached data.

Here is a breakdown of how the caching works:

1. **Data Fetching**: When the `App` component mounts, it checks if the provinces data is already cached in `localStorage`.
2. **Using Cached Data**: If the data is found in `localStorage`, it is parsed and used to set the `provinces` state.
3. **Fetching New Data**: If the data is not found in `localStorage`, the component fetches the data from the specified URL.
4. **Caching New Data**: After fetching the data, it is stored in `localStorage` for future use.

This caching strategy ensures that the `ProvinceCitySelect` component can render quickly and efficiently, as it does not need to fetch data from the network on every render.

### Basic Usage

```jsx
import ProvinceCitySelect from 'iran-regions'
import 'iran-regions/dist/index.css'
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
import ProvinceCitySelectProps, { Province } from 'iran-regions'
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

## Contact

<a href="https://www.coffeebede.com/mahdialavitabar"><img class="img-fluid" src="https://coffeebede.ir/DashboardTemplateV2/app-assets/images/banner/default-yellow.svg" /></a>

- Website: [https://www.mahdialavitabar.com/en](https://www.mahdialavitabar.com/en)
- GitHub: [https://github.com/mahdialavitabar](https://github.com/mahdialavitabar)
- npm: [https://www.npmjs.com/~mahdialavitabar](https://www.npmjs.com/~mahdialavitabar)
- LinkedIn: [https://www.linkedin.com/in/mehdialavitabar/](https://www.linkedin.com/in/mehdialavitabar/)

## Storybook Documentation

For an interactive demo and more detailed examples, visit the [Storybook Documentation](http://localhost:6006).

## Keywords

- iran-regions
- province-city-select
- react-component
- iran-provinces
- iran-cities
- dropdown-select
- autocomplete
- combobox
- react-select
- province-city-selector
- iran-locations
- iran-data
- react-library
- iran-regions-data
- iran-province-city
- iran-select
- iran-dropdown
- iran-autocomplete
- iran-combobox
- iran-react
- iran-ui
- iran-province-city-select
- iran-react-component
- iran-province-city-data
- iran-react-library
- iran-ui-components
- iran-react-select
- iran-react-autocomplete
- iran-react-combobox
- iran-react-dropdown
- iran-react-ui
- iran-react-library
- iran-react-components
- iran-react-ui-components
- iran-react-select-component
- iran-react-autocomplete-component
- iran-react-combobox-component
- iran-react-dropdown-component
- iran-react-ui-component
- iran-react-library-component
- iran-react-components-library
- iran-react-ui-components-library
- iran-react-select-components
- iran-react-autocomplete-components
- iran-react-combobox-components
- iran-react-dropdown-components
- iran-react-ui-components-library
- iran-react-library-components
- iran-react-ui-library-components
- iran-react-select-library-components
- iran-react-autocomplete-library-components
- iran-react-combobox-library-components
- iran-react-dropdown-library-components
- iran-react-ui-library-components
- iran-react-library-ui-components
- iran-react-select-ui-components
- iran-react-autocomplete-ui-components
- iran-react-combobox-ui-components
- iran-react-dropdown-ui-components
- iran-react-ui-library
- iran-react-library-ui
- iran-react-select-library
- iran-react-autocomplete-library
- iran-react-combobox-library
- iran-react-dropdown-library
- iran-react-ui-library-components
- iran-react-library-ui-components
- iran-react-select-library-ui-components
- iran-react-autocomplete-library-ui-components
- iran-react-combobox-library-ui-components
- iran-react-dropdown-library-ui-components
- iran-react-ui-library-ui-components
- iran-react-library-ui-ui-components
- iran-react-select-library-ui-ui-components
- iran-react-autocomplete-library-ui-ui-components
- iran-react-combobox-library-ui-ui-components
- iran-react-dropdown-library-ui-ui-components
- iran-react-ui-library-ui-ui-components
- iran-react-library-ui-ui-ui-components
- iran-react-select-library-ui-ui-ui-components
- iran-react-autocomplete-library-ui-ui-ui-components
- iran-react-combobox-library-ui-ui-ui-components
- iran-react-dropdown-library-ui-ui-ui-components
- iran-react-ui-library-ui-ui-ui-components
- iran-react-library-ui-ui-ui-ui-components
- iran-react-select-library-ui-ui-ui-ui-components
- iran-react-autocomplete-library-ui-ui-ui-ui-components
- iran-react-combobox-library-ui-ui-ui-ui-components
- iran-react-dropdown-library-ui-ui-ui-ui-components
- iran-react-ui-library-ui-ui-ui-ui-components
- iran-react-library-ui-ui-ui-ui-ui-components
- iran-react-select-library-ui-ui-ui-ui-ui-components
- iran-react-autocomplete-library-ui-ui-ui-ui-ui-components
- iran-react-combobox-library-ui-ui-ui-ui-ui-components
- iran-react-dropdown-library-ui-ui-ui-ui-ui-components
- iran-react-ui-library-ui-ui-ui-ui-ui-components
- iran-react-library-ui-ui-ui-ui-ui-ui-components
- iran-react-select-library-ui-ui-ui-ui-ui-ui-components
- iran-react-autocomplete-library-ui-ui-ui-ui-ui-ui-components
- iran-react-combobox-library-ui-ui-ui-ui-ui-ui-components
- iran-react-dropdown-library-ui-ui-ui-ui-ui-ui-components
- iran-react-ui-library-ui-ui-ui-ui-ui-ui-components
- iran-react-library-ui-ui-ui-ui-ui-ui-ui-components
- iran-react-select-library-ui-ui-ui-ui-ui-ui-ui-components
- iran-react-autocomplete-library-ui-ui-ui-ui-ui-ui-components
