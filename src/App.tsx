import { useState } from 'react';
import './App.css';
import ProvinceCitySelect from './ProvinceCitySelect';

function App() {
  const [location, setLocation] = useState({ province: '', city: '' });

  return (
    <ProvinceCitySelect
      value={location}
      onChange={setLocation}
      theme="light"
      size="md"
      selectorType="combobox"
      variant="outlined"
      isRequired
      labels={{
        province: 'استان',
        city: 'شهر',
      }}
    />
  );
}
export default App;
