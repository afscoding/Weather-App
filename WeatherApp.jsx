import React, { useEffect, useRef, useState } from "react";
import styles from "./WeatherAppStyles.module.css";
import searchIcon from "/src/assets/search.png";
import clearIcon from "/src/assets/clear.png";
import cloudIcon from "/src/assets/cloud.png";
import drizzleIcon from "/src/assets/drizzle.png";
import rainIcon from "/src/assets/rainIcon.png";
import snowIcon from "/src/assets/snow.png";
import windIcon from "/src/assets/wind.png";
import humidityIcon from "/src/assets/humidity.png";

function WeatherApp() {
  const apiKey = "0589f990656d926722d867849a0bf3c4";

  const inputRef = useRef();

  const [weatherData, setWeatherData] = useState(false);

  const allIcons = {
    "01d": clearIcon,
    "01n": clearIcon,
    "02d": cloudIcon,
    "02n": cloudIcon,
    "03d": cloudIcon,
    "03n": cloudIcon,
    "04d": drizzleIcon,
    "04n": drizzleIcon,
    "09d": rainIcon,
    "09n": rainIcon,
    "10d": rainIcon,
    "10n": rainIcon,
    /*"11d": "https://openweathermap.org/img/wn/11d@2x.png",
    "11n":" https://openweathermap.org/img/wn/11n@2x.png",*/
    "13d": snowIcon,
    "13n": snowIcon,
    /*"50d": "https://openweathermap.org/img/wn/50d@2x.png",
    "50n": "https://openweathermap.org/img/wn/50n@2x.png",*/
  };

  const search = async (city) => {
    if (city === "") {
      alert("Enter City Name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
      const responce = await fetch(url);
      const data = await responce.json();

      if (!responce.ok) {
        alert(data.message);
        return;
      }
      console.log(data);

      const icon = allIcons[data.weather[0].icon] || clearIcon;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temprature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      setWeatherData(false);
      console.error("Error fetching weather data:");
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search(inputRef.current.value);
    }
  };

  useEffect(() => {
    search("paris");
  }, []);

  return (
    <section className={styles.container}>
      <div className={styles.weather}>
        <div className={styles.searchBar}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search"
            onKeyDown={handleKeyDown}
          />
          <img
            src={searchIcon}
            onClick={() => search(inputRef.current.value)}
          />
        </div>

        {weatherData ? (
          <>
            <img src={weatherData.icon} alt="" className={styles.weatherIcon} />
            <p className={styles.temprature}>{weatherData.temprature} ℃</p>
            <p className={styles.location}>{weatherData.location}</p>

            <div className={styles.weatherData}>
              <div className={styles.col}>
                <img src={humidityIcon} /> <br />
                <div>
                  <span>Humidity</span>
                  <br />
                  <p>{weatherData.humidity} %</p>
                </div>
              </div>

              <div className={styles.col}>
                <img src={windIcon} />
                <br />
                <div>
                  <span>Wind Speed</span>
                  <br />
                  <p>{weatherData.windSpeed} Km/h</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </section>
  );
}

export default WeatherApp;
