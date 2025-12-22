import { Meta, StoryFn } from '@storybook/react';
import ProvinceCitySelect, {
  ProvinceCitySelectProps,
} from '../ProvinceCitySelect';

export default {
  title: 'Components/ProvinceCitySelect',
  component: ProvinceCitySelect,
} as Meta<typeof ProvinceCitySelect>;

const Template: StoryFn<ProvinceCitySelectProps> = (args) => (
  <ProvinceCitySelect {...args} />
);

export const Default = Template.bind({});
Default.args = {
  theme: 'light',
  size: 'md',
  variant: 'outlined',
  provinces: [
    {
      name: 'تهران',
      cities: ['تهران', 'اسلامشهر', 'ری'],
    },
    {
      name: 'اصفهان',
      cities: ['اصفهان', 'نجف آباد', 'کاشان'],
    },
  ],
  isRequired: false,
  isDisabled: false,
  placeholders: {
    province: 'انتخاب استان',
    city: 'انتخاب شهر',
  },
  labels: {
    province: 'استان',
    city: 'شهر',
  },
  selectorType: 'select',
};

export const DarkTheme = Template.bind({});
DarkTheme.args = {
  theme: 'dark',
  size: 'md',
  variant: 'outlined',
  provinces: [
    {
      name: 'تهران',
      cities: ['تهران', 'اسلامشهر', 'ری'],
    },
    {
      name: 'اصفهان',
      cities: ['اصفهان', 'نجف آباد', 'کاشان'],
    },
  ],
  isRequired: false,
  isDisabled: false,
  placeholders: {
    province: 'انتخاب استان',
    city: 'انتخاب شهر',
  },
  labels: {
    province: 'استان',
    city: 'شهر',
  },
  selectorType: 'select',
};

export const Autocomplete = Template.bind({});
Autocomplete.args = {
  selectorType: 'autocomplete',
  theme: 'light',
  size: 'md',
  variant: 'outlined',
  provinces: [
    {
      name: 'تهران',
      cities: ['تهران', 'اسلامشهر', 'ری'],
    },
    {
      name: 'اصفهان',
      cities: ['اصفهان', 'نجف آباد', 'کاشان'],
    },
  ],
  isRequired: false,
  isDisabled: false,
  placeholders: {
    province: 'انتخاب استان',
    city: 'انتخاب شهر',
  },
  labels: {
    province: 'استان',
    city: 'شهر',
  },
};

export const Combobox = Template.bind({});
Combobox.args = {
  selectorType: 'combobox',
  theme: 'light',
  size: 'md',
  variant: 'outlined',
  provinces: [
    {
      name: 'تهران',
      cities: ['تهران', 'اسلامشهر', 'ری'],
    },
    {
      name: 'اصفهان',
      cities: ['اصفهان', 'نجف آباد', 'کاشان'],
    },
  ],
  isRequired: false,
  isDisabled: false,
  placeholders: {
    province: 'انتخاب استان',
    city: 'انتخاب شهر',
  },
  labels: {
    province: 'استان',
    city: 'شهر',
  },
};
