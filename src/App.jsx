import './App.css';
import { useState } from "react";

function App() {

  const[city, setCity] = useState("");
  const[weather, setWeather] = useState(null);
  const[error , setError] = useState(null);
  const[loading, setLoading] = useState(false);
  const [cityName, setCityName] = useState('')

  async function handleSearch(){
    setError('')
    setWeather(null)
    setLoading(true)
    const response = await fetch (`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`)
    const data = await response.json();

    if (!data.results){
      setError('City not found')
      setLoading(false)
      return;
    }

    const { latitude, longitude, name, country } = data.results[0]
    setCityName(`${name}, ${country}`)
    const weatherResponse = await fetch(` https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`)
    const weatherData = await weatherResponse.json();
    setWeather(weatherData.current_weather);
    setLoading(false)
  }

  return (
    <div className="app">
      <h1>🌤️ Weather App</h1>
  
      <div className="search">
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
  
      {loading && <p className="message">Loading...</p>}
      {error && <p className="message error">{error}</p>}
  
      {weather && (
        <div className="card">
           <p className="place">{cityName}</p>
          <p className="temp">{weather.temperature}°C</p>
          <p>Wind: {weather.windspeed} km/h</p>
        </div>
      )}
    </div>
  )
}

export default App;