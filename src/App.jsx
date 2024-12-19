import { useEffect, useRef, useState } from 'react'
import './App.css'
import clear_icon from './assets/clear.png'
import cloud_icon from './assets/cloud.png'
import drizile_icon from './assets/drizile.png'
import mist_icon from './assets/mist.png'
import rain_icon from './assets/rain.png'
import snow_icon from './assets/snow.png'
import thunderstrom_icon from './assets/thunderstrom.png'
import img_404 from './assets/404.png'
import search_img from './assets/search.png'
function App() {
  const [weatherData, setWeatherData] = useState(false)
  const inputRef = useRef()
  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": cloud_icon,
    "04n": cloud_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "11d": thunderstrom_icon,
    "11n": thunderstrom_icon,
    "13d": snow_icon,
    "13n": snow_icon,
    "50d": mist_icon,
    "50n": mist_icon,
  }

  const displayDate = (apiTimeStamp) => {
    const timestamp = apiTimeStamp;
    const date = new Date(timestamp * 1000);
    const formattedDate = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: '2-digit' });
    return formattedDate
  }

  const enterSearch = (event, inputValue) => {
    if (event.key === "Enter") {
      search(inputValue)
    }
  }

  const search = async (city) => {
    if (city == "") {
      alert("Enter City Name")
      return
    }
    try {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=6ee3cc2771b56b4688e1e90641011479`
      const response = await fetch(apiUrl)
      const result = await response.json()
      if (!response.ok) {
        alert(result.message)
        return
      }
      console.log(result);
      const icon = allIcons[result.weather[0].icon]
      setWeatherData({
        humidity: result.main.humidity,
        temp: Math.floor(result.main.temp),
        city: result.name,
        date: displayDate(result.dt),
        windSpeed: Math.ceil(result.wind.speed),
        icon: icon,
        condition: result.weather[0].main
      })
    }
    catch (err) {
      console.error(err)
      setWeatherData(false)
    }
  }

  // useEffect(() => { search("Kochi") }, [])

  return (
    <div className='main-container d-flex justify-content-center align-items-center'>

      <section className='section-container '>
        {/* INPUT AND SEARCH */}
        <div className="input-group">
          <input ref={inputRef} onKeyDown={(event) => { enterSearch(event, event.target.value.trim()) }} type="text" placeholder="Search City " id="city-input" autoComplete="off" />
          <button className="search-btn" onClick={() => { search(inputRef.current.value) }}><i className="fa-solid fa-magnifying-glass"></i></button>
        </div>
        {/* DISPLAY WEATHER */}
        {
          weatherData ? <section id="weather-info">
            <div className="location-date-container">
              <div className="location">
                <span className="material-symbols-outlined">
                  location_on
                </span>
                <h4 className="country-txt">{weatherData.city}</h4>
              </div>
              <h5 className="current-date regular-txt">{weatherData.date}</h5>
            </div>
            <div className="weather-summary-container">
              <img src={weatherData.icon} className="weather-summary-image" />
              <div className="weather-summary-info">
                <h1 className="temp-txt">{weatherData.temp} ℃</h1>
                <h3 className="condition-txt regular-txt">{weatherData.condition}</h3>
              </div>
            </div>
            <div className="weather-condition-container">
              <div className="condition-item">
                <span className="material-symbols-outlined">
                  water_drop
                </span>
                <div className="condition-info">
                  <h5 className="regular-txt">Humidity</h5>
                  <h5 className="humidity-value-txt">{weatherData.humidity}%</h5>
                </div>
              </div>
              <div className="condition-item">
                <span className="material-symbols-outlined">
                  air
                </span>
                <div className="condition-info">
                  <h5 className="regular-txt">Wind Speed</h5>
                  <h5 className="wind-value-txt">{weatherData.windSpeed} Km/s</h5>
                </div>
              </div>
            </div>
          </section> : <div>
            <img width={'100%'} src={search_img} alt="" />
            <h5 style={{ textAlign: 'center' }} className='fw-bold fs-4'>Search  City</h5>
            <p style={{ textAlign: 'center' }} className='pt-3'>Find out the weather conditon of the city</p>
          </div>
        }

      </section>

    </div>
  )
}

export default App
