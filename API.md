# API Reference

## Components

### ProvinceCitySelect

Main component for selecting Iranian provinces and cities.

```tsx
import { ProvinceCitySelect } from 'iran-regions';
```

#### Props

##### Core Props

| Prop               | Type                            | Default                      | Description                                           |
| ------------------ | ------------------------------- | ---------------------------- | ----------------------------------------------------- |
| `value`            | `ProvinceCity`                  | `undefined`                  | Controlled value `{ province: string, city: string }` |
| `defaultValue`     | `ProvinceCity`                  | `{ province: '', city: '' }` | Default uncontrolled value                            |
| `onChange`         | `(value: ProvinceCity) => void` | `undefined`                  | Callback when value changes                           |
| `onProvinceChange` | `(province: string) => void`    | `undefined`                  | Callback when province changes                        |
| `onCityChange`     | `(city: string) => void`        | `undefined`                  | Callback when city changes                            |
| `onBlur`           | `(event: FocusEvent) => void`   | `undefined`                  | Callback on blur                                      |
| `onFocus`          | `(event: FocusEvent) => void`   | `undefined`                  | Callback on focus                                     |

##### Appearance Props

| Prop          | Type                                                     | Default       | Description                |
| ------------- | -------------------------------------------------------- | ------------- | -------------------------- |
| `theme`       | `'light' \| 'dark' \| 'modern' \| 'minimal' \| 'ocean'`  | `'light'`     | Theme name                 |
| `customTheme` | `Record<string, string>`                                 | `undefined`   | Custom theme CSS variables |
| `size`        | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                   | `'md'`        | Component size             |
| `variant`     | `'outlined' \| 'filled' \| 'underlined' \| 'borderless'` | `'outlined'`  | Input variant              |
| `direction`   | `'ltr' \| 'rtl'`                                         | Auto-detected | Text direction             |

##### Behavior Props

| Prop           | Type                                       | Default    | Description       |
| -------------- | ------------------------------------------ | ---------- | ----------------- |
| `selectorType` | `'select' \| 'autocomplete' \| 'combobox'` | `'select'` | Input type        |
| `isRequired`   | `boolean`                                  | `false`    | Mark as required  |
| `isDisabled`   | `boolean`                                  | `false`    | Disable component |
| `readonly`     | `boolean`                                  | `false`    | Make read-only    |
| `clearable`    | `boolean`                                  | `false`    | Show clear button |

##### Label & Placeholder Props

| Prop           | Type                                   | Default          | Description       |
| -------------- | -------------------------------------- | ---------------- | ----------------- |
| `placeholders` | `{ province?: string, city?: string }` | Persian defaults | Placeholder texts |
| `labels`       | `{ province?: string, city?: string }` | Persian defaults | Label texts       |

##### Validation Props

| Prop                | Type                                                                    | Default          | Description              |
| ------------------- | ----------------------------------------------------------------------- | ---------------- | ------------------------ |
| `validation`        | `ValidationRule`                                                        | `undefined`      | Validation configuration |
| `showErrorMessages` | `boolean`                                                               | `true`           | Show/hide error messages |
| `errorMessages`     | `{ provinceRequired?: string, cityRequired?: string, custom?: string }` | Persian defaults | Custom error messages    |

##### Data Props

| Prop              | Type                                               | Default          | Description          |
| ----------------- | -------------------------------------------------- | ---------------- | -------------------- |
| `provinces`       | `Province[]`                                       | Fetched from API | Custom province data |
| `dataSource`      | `DataSource`                                       | Default instance | Custom data source   |
| `filterProvinces` | `(provinces: Province[]) => Province[]`            | `undefined`      | Filter provinces     |
| `filterCities`    | `(cities: string[], province: string) => string[]` | `undefined`      | Filter cities        |
| `sortProvinces`   | `boolean \| ((a, b) => number)`                    | `false`          | Sort provinces       |
| `sortCities`      | `boolean \| ((a, b) => number)`                    | `false`          | Sort cities          |

##### Configuration Objects

| Prop            | Type                       | Default     | Description                  |
| --------------- | -------------------------- | ----------- | ---------------------------- |
| `loading`       | `LoadingConfig`            | `undefined` | Loading state configuration  |
| `error`         | `ErrorConfig`              | `undefined` | Error state configuration    |
| `accessibility` | `AccessibilityConfig`      | `undefined` | Accessibility settings       |
| `animation`     | `AnimationConfig`          | `undefined` | Animation settings           |
| `dropdown`      | `DropdownConfig`           | `undefined` | Dropdown settings            |
| `search`        | `SearchConfig`             | `undefined` | Search settings              |
| `rtl`           | `RTLConfig`                | `undefined` | RTL settings                 |
| `keyboard`      | `KeyboardNavigationConfig` | `undefined` | Keyboard navigation settings |
| `icons`         | `IconConfig`               | `undefined` | Custom icons                 |

##### Style Props

| Prop                 | Type            | Default     | Description              |
| -------------------- | --------------- | ----------- | ------------------------ |
| `className`          | `string`        | `''`        | Container class name     |
| `style`              | `CSSProperties` | `undefined` | Container inline styles  |
| `containerClassName` | `string`        | `''`        | Wrapper class name       |
| `containerStyle`     | `CSSProperties` | `undefined` | Wrapper inline styles    |
| `groupClassName`     | `string`        | `''`        | Group class name         |
| `groupStyle`         | `CSSProperties` | `undefined` | Group inline styles      |
| `provinceClassName`  | `string`        | `''`        | Province input class     |
| `provinceInputStyle` | `CSSProperties` | `undefined` | Province input styles    |
| `cityClassName`      | `string`        | `''`        | City input class         |
| `cityInputStyle`     | `CSSProperties` | `undefined` | City input styles        |
| `errorClassName`     | `string`        | `''`        | Error message class      |
| `errorStyle`         | `CSSProperties` | `undefined` | Error message styles     |
| `loadingClassName`   | `string`        | `''`        | Loading indicator class  |
| `loadingStyle`       | `CSSProperties` | `undefined` | Loading indicator styles |

##### Custom Rendering Props

| Prop             | Type                                            | Default     | Description              |
| ---------------- | ----------------------------------------------- | ----------- | ------------------------ |
| `renderProvince` | `(province: Province) => ReactNode`             | `undefined` | Custom province renderer |
| `renderCity`     | `(city: string, province: string) => ReactNode` | `undefined` | Custom city renderer     |
| `renderError`    | `(error: string) => ReactNode`                  | `undefined` | Custom error renderer    |
| `renderLoading`  | `() => ReactNode`                               | `undefined` | Custom loading renderer  |

##### HTML Props

| Prop          | Type     | Default     | Description       |
| ------------- | -------- | ----------- | ----------------- |
| `id`          | `string` | `undefined` | HTML id attribute |
| `name`        | `string` | `undefined` | Form field name   |
| `data-testid` | `string` | `undefined` | Test ID           |
| `tabIndex`    | `number` | `undefined` | Tab index         |

### ThemeProvider

Context provider for theme management.

```tsx
import { ThemeProvider } from 'iran-regions';

<ThemeProvider theme="modern">
  <ProvinceCitySelect />
</ThemeProvider>;
```

#### Props

| Prop           | Type                       | Default     | Description         |
| -------------- | -------------------------- | ----------- | ------------------- |
| `children`     | `ReactNode`                | Required    | Child components    |
| `theme`        | `ThemeConfig \| ThemeName` | `undefined` | Theme configuration |
| `defaultTheme` | `ThemeName`                | `'light'`   | Default theme       |

### FlexibleInput

Internal input component (can be used standalone).

```tsx
import { FlexibleInput } from 'iran-regions';
```

## Hooks

### useTheme

Hook to access and update theme from context.

```tsx
import { useTheme } from 'iran-regions';

function MyComponent() {
  const { theme, setTheme } = useTheme();

  return <button onClick={() => setTheme('dark')}>Toggle Theme</button>;
}
```

## Utilities

### applyTheme

Programmatically apply a theme.

```tsx
import { applyTheme } from 'iran-regions';

applyTheme('dark');
// or
applyTheme(customThemeConfig);
```

### DataSource

Custom data source class for fetching provinces.

```tsx
import { DataSource } from 'iran-regions'

const customDataSource = new DataSource({
  url: 'https://api.example.com/provinces',
  cacheKey: 'my-provinces',
  cacheDuration: 3600000, // 1 hour
  onError: (error) => console.error(error),
  onSuccess: (data) => console.log('Loaded', data)
})

<ProvinceCitySelect dataSource={customDataSource} />
```

## Types

### ProvinceCity

```tsx
interface ProvinceCity {
  province: string;
  city: string;
}
```

### Province

```tsx
interface Province {
  name: string;
  cities: string[];
}
```

### ValidationRule

```tsx
interface ValidationRule {
  required?: boolean | { message: string };
  custom?: (value: ProvinceCity) => string | null;
}
```

### SearchConfig

```tsx
interface SearchConfig {
  enabled?: boolean;
  debounceMs?: number;
  caseSensitive?: boolean;
  fuzzy?: boolean;
  placeholder?: string;
  minCharacters?: number;
}
```

### DropdownConfig

```tsx
interface DropdownConfig {
  maxHeight?: number | string;
  placement?: 'top' | 'bottom' | 'auto';
  width?: number | string;
  virtualScroll?: boolean;
  itemHeight?: number;
}
```

### KeyboardNavigationConfig

```tsx
interface KeyboardNavigationConfig {
  enabled?: boolean;
  closeOnEscape?: boolean;
  selectOnEnter?: boolean;
  navigateWithArrows?: boolean;
}
```

### LoadingConfig

```tsx
interface LoadingConfig {
  component?: ReactNode;
  text?: string;
  spinnerColor?: string;
}
```

### ErrorConfig

```tsx
interface ErrorConfig {
  component?: ReactNode;
  showIcon?: boolean;
  retryButton?: boolean;
  onRetry?: () => void;
}
```

### AccessibilityConfig

```tsx
interface AccessibilityConfig {
  ariaLabel?: string;
  ariaDescribedBy?: string;
  ariaRequired?: boolean;
  ariaInvalid?: boolean;
}
```

### ThemeConfig

```tsx
interface ThemeConfig {
  colors: {
    primary: string;
    primaryHover: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    borderHover: string;
    borderFocus: string;
    error: string;
    disabled: string;
    shadow: string;
    focusRing: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
  };
  fontSize: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  transitions: {
    fast: string;
    normal: string;
    slow: string;
  };
}
```

## CSS Variables

All theme values are available as CSS variables with the `--iran-regions-` prefix:

```css
--iran-regions-color-primary
--iran-regions-color-background
--iran-regions-spacing-md
--iran-regions-radius-md
--iran-regions-font-md
--iran-regions-transition-normal
/* ... and more */
```

Override them in your CSS:

```css
.my-custom-selector {
  --iran-regions-color-primary: #ff6b6b;
  --iran-regions-radius-md: 12px;
}
```
