import './App.css';
import { useState } from "react";

function App() {

  const[city, setCity] = useState("Delhi");
  const[weather, setWeather] = useState(null);
  const[error , setError] = useState(null);
  const[loading, setLoading] = useState(false);

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

    const { latitude, longitude } = data.results[0]
    const weatherResponse = await fetch(` https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`)
    const weatherData = await weatherResponse.json();
    setWeather(weatherData.current_weather);
    setLoading(false)
  }

  return(
    <div>
      <h1>Weather App</h1>
      <p>City: {city}</p>
      <input type="text"
       value={city}
       onChange={(e)=> setCity(e.target.value)}      
      />
      <button onClick={handleSearch}>Search</button>
      {weather && (
  <div className="card">
    <p>Temperature: {weather.temperature}°C</p>
    <p>Wind: {weather.windspeed} km/h</p>
  </div>
)}
      {error && <p>{error}</p>}
      {loading && <p>Loading...</p>}
    </div>
  )
}

export default App;