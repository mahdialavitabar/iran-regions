import ProvinceCitySelect from '../ProvinceCitySelect';
export default {
    title: 'Components/ProvinceCitySelect',
    component: ProvinceCitySelect,
};
var Template = function (args) { return (<ProvinceCitySelect {...args}/>); };
export var Default = Template.bind({});
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
    isLoading: false,
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
export var DarkTheme = Template.bind({});
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
    isLoading: false,
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
export var Autocomplete = Template.bind({});
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
    isLoading: false,
    placeholders: {
        province: 'انتخاب استان',
        city: 'انتخاب شهر',
    },
    labels: {
        province: 'استان',
        city: 'شهر',
    },
};
export var Combobox = Template.bind({});
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
    isLoading: false,
    placeholders: {
        province: 'انتخاب استان',
        city: 'انتخاب شهر',
    },
    labels: {
        province: 'استان',
        city: 'شهر',
    },
};
