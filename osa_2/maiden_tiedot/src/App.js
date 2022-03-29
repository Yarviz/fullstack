import { useState, useEffect } from 'react'
import axios from 'axios'

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

const CountryList = ({countries}) => {
  if (countries.length === 1) {
    return(
      <Country country={countries[0]}/>
    )
  }

  if (countries.length > 10) {
    return(
      <div>Too many matches, specify another filter</div>
    )
  }

  const list_countries = countries.map(country =>
    <div key={country.name.common}>{country.name.common}</div>
  )
  return(
    <div>{list_countries}</div>
  )
}

const Country = ({country}) => {
  return(
    <div>
      <h1>{country.name.common}</h1>
      <div>
        capital {country.capital[0]}<br/>
        area {country.area}<br/><br/>
      </div>
      <b>languages</b>
      <ul>
        {Object.keys(country.languages).map((key) =>
          <li>{country.languages[key]}</li>
        )}
      </ul>
      <img src={country.flags.png} alt='flag'/>
    </div>
  )
}

const App = () => {
  const [countries, setCountry] = useState([]);
  const [filter, setFilter] = useState('');

  const filterChange = (event) => {
    setFilter(event.target.value);
  }

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
      <CountryList countries={filtered_countries}/>
    </div>
  )
}

export default App
