import styles from './Weather.module.css'
import SearchIcon from '../../assets/search.png' //para usar iconos primero debo importarlos, sino no funcionan
import CloudIcon from '../../assets/cloud.png'
import HumidityIcon from '../../assets/humidity.png'
import WindIcon from '../../assets/wind.png'
import { useState, useEffect } from 'react'

const Weather = () => {
    // * API KEY
    const API_KEY = import.meta.env.VITE_API_KEY;

    // * Local States
    const [city, setCity] = useState('')
    const [weather, setweather] = useState(null)

    // * Component LifeCicle
    useEffect(() => {
        // Obtener la temperatura de Londres
        const city = "London"
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            setweather({
              name: data.name,
              main: {
                temp: data.main.temp,
                humidity: data.main.humidity
              },
              wind: {
                speed: data.wind.speed
              }
            })
          })
      }, [])

    // * Handlers
    // Con esto obtengo la ciudad pasada por input
    const handleCity = (e) => {
        setCity(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(city.length > 0) fetchApi()
    }

    const fetchApi = async() => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)

            const data = await response.json()

            setweather(data)

        } catch (error) {
            console.error("Ops! ha ocurrido un error")
        }
    }



    return (
      <div className={styles.WeatherContainer}>
        {/* //! Search Section */}
        <div className={styles.SearchContainer}>
          <form onSubmit={handleSubmit}>
            <input
              placeholder="Search by city"
              type="text"
              value={city}
              onChange={handleCity}
            />
            <button type="submit">
              <img src={SearchIcon} alt="" />
            </button>
          </form>
          {/* <input
            placeholder="Search by city"
            type="text"
            value={city}
            onChange={handleCity}
           
          />
          <button type='submit' onClick={handleSubmit}>
            <img src={SearchIcon} alt="" />
          </button> */}
        </div>

        {/* //! Center Section */}
        <div className={styles.CenterContainer}>
          <img src={CloudIcon} alt="" />

          {weather && (
            <>
              <p className={styles.CenterContainer_grades}>
                {parseInt(weather?.main?.temp - 273.15)}ºC
              </p>

              <p className={styles.CenterContainer_city}>{weather.name}</p>
            </>
          )}
        </div>

        {/* //! Bot Section */}
        <div className={styles.BotContainer}>
          <div className={styles.Humidity}>
            <div>
              <img src={HumidityIcon} alt="" />
            </div>

            <div>
              {weather && (
                <>
                  <p className={styles.Number}>{weather.main.humidity} %</p>
                </>
              )}

              <p className={styles.Text}>Humidity</p>
            </div>
          </div>

          <div className={styles.Wind}>
            <div>
              <img src={WindIcon} alt="" />
            </div>

            <div>
              {weather && (
                <>
                  <p className={styles.Number}>{weather.wind.speed} km/h</p>
                </>
              )}

              <p className={styles.Text}>Wind Speed</p>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Weather