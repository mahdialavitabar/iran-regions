import { useState } from 'react'
import './App'
import ProvinceCitySelect from './ProvinceCitySelect'
import { provinces } from './provinces'
function App() {
  const [location, setLocation] = useState({ province: '', city: '' })

  return (
    <ProvinceCitySelect
      value={location}
      onChange={setLocation}
      provinces={provinces}
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
  )
}
export default App
