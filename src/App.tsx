import { useState } from 'react';
import './App.css';
import ProvinceCitySelect from './ProvinceCitySelect';

function App() {
  const [location, setLocation] = useState({ province: '', city: '' });

  return (
    <div style={{ margin: 100 }}>
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
    </div>
  );
}

export default App;
