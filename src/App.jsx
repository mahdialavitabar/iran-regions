import { useState } from 'react'
import './App'
import ProvinceCitySelect from './ProvinceCitySelect'
import { provinces } from './provinces'
function App() {
  var _a = useState({ province: '', city: '' }),
    location = _a[0],
    setLocation = _a[1]
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
