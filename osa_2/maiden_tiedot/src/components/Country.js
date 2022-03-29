import Weather from "./Weather"

const CountryList = ({countries, cb}) => {
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
      <div key={country.name.common}>
        {country.name.common}{' '}
        <button onClick={() => cb(country.name.common)}>
          show
        </button>
      </div>
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
            <li key={key}>{country.languages[key]}</li>
          )}
        </ul>
        <img src={country.flags.png} alt='flag'/>
        <Weather country={country}/>
      </div>
    )
  }

  export default CountryList;