import { useState, useEffect } from 'react'
import axios from 'axios'
import CountryList from './components/Country';

const Filter = ({value, cb}) => {
  return (
    <div>
      find countries{' '}
        <input
          value={value}
          onChange={cb}
        />
    </div>
  )
}

const App = () => {
  const [countries, setCountry] = useState([]);
  const [filter, setFilter] = useState('');

  const filterChange = (event) => setFilter(event.target.value);
  const fillFilter = (name) => setFilter(name);

  const filtered_countries = countries.filter(
    country => country.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then(response => {
      console.log(`loaded ${response.data.length} countries`);
      setCountry(response.data);
    })
  }, []);

  return (
    <div>
      <Filter values={filter} cb={filterChange}/>
      <CountryList countries={filtered_countries} cb={fillFilter}/>
    </div>
  )
}

export default App
