import { useState, useEffect } from 'react'
import axios from 'axios'

const WEATHER_API_KEY = process.env.REACT_APP_API_KEY;
const base_url = 'https://api.openweathermap.org/data/2.5/weather'

const Weather = ({country}) => {
    const [weather, setWeather] = useState('');

    const [lat, lon] = country.capitalInfo.latlng;
    const weather_url = `${base_url}?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    console.log(weather_url);
    useEffect(() => {
        axios.get(weather_url).then(response => {
            console.log(response.data);
            const data = response.data;
            setWeather(
                <div>
                    temperature {data.main.temp} Celsius<br/>
                    <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt='icon'/><br/>
                    wind {data.wind.speed} m/s
                </div>
            );
        })
    }, []);


    return (
      <div>
        <h2>Weather in {country.capital[0]}</h2>
        {weather}
      </div>
    )
}

export default Weather;