import { useCallback, useEffect, useState } from 'react';
import './App.css';
import type { Province } from './ProvinceCitySelect';
import ProvinceCitySelect from './ProvinceCitySelect';

function App() {
  const [location, setLocation] = useState({ province: '', city: '' });
  const [provinces, setProvinces] = useState<Province[]>([]);

  // Memoize the fetch function to prevent unnecessary recreations
  const fetchProvinces = useCallback(async () => {
    const cachedData = localStorage.getItem('provincesData');
    if (cachedData) {
      try {
        const data = JSON.parse(cachedData);
        if (Array.isArray(data)) {
          setProvinces(data);
          return;
        }
      } catch (error) {
        console.error('Error parsing cached data:', error);
      }
    }

    try {
      const response = await fetch(
        'https://gist.githubusercontent.com/mahdialavitabar/115d131d6fe1f56e1f177aa4c741739d/raw/a070a0fe4f82a8a378c67d42abda3046134ed97c/data.json',
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      if (Array.isArray(data)) {
        setProvinces(data);
        localStorage.setItem('provincesData', JSON.stringify(data));
      } else {
        throw new Error('Fetched data is not an array');
      }
    } catch (error) {
      console.error('Error fetching provinces data:', error);
    }
  }, []);

  useEffect(() => {
    fetchProvinces();
  }, [fetchProvinces]);

  return (
    <ProvinceCitySelect
      value={location}
      onChange={setLocation}
      theme="light"
      size="md"
      selectorType="select"
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
