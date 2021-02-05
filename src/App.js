import "./App.scss";
import "./dist/wu-icons-style.css";
import { useState } from "react";
import { WiStrongWind } from "react-icons/wi";

const api = {
  key: "c89d7e9ead18e27f41050c881beb6856",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState([]);

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  let date = String(new window.Date());
  date = date.slice(0, 15);

  return (
    <div className="container">
      <div className="header">
        <h2>Weather App</h2>
      </div>
      <div className="search-box">
        <input
          value={query}
          type="text"
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={search}
          placeholder="search..."
        />
      </div>
      {typeof weather.main !== "undefined" && (
        <>
          <div className="location-box">
            <div className="location">
              {weather.name}, {weather.sys.country}
            </div>
            <div className="date">{date}</div>
          </div>
          <div>
            <i
              className={`wu wu-white wu-128 wu-${
                weather.weather[0].icon === "11d"
                  ? "tstorms"
                  : weather.weather[0].icon === "09d"
                  ? "chancerain"
                  : weather.weather[0].icon === "10d"
                  ? "rain"
                  : weather.weather[0].icon === "09d"
                  ? "rain"
                  : weather.weather[0].icon === "13d"
                  ? "snow"
                  : weather.weather[0].icon === "50d"
                  ? "hazy"
                  : weather.weather[0].icon === "01n"
                  ? "clear"
                  : weather.weather[0].icon === "01d"
                  ? "clear"
                  : weather.weather[0].icon === "04n"
                  ? "cloudy"
                  : "cloudy"
              }`}
            ></i>
          </div>
          <div className="weather-box">
            <div className="temp">
              <div>{Math.round(weather.main.temp)}°C</div>
              <div>
                <WiStrongWind />
                {weather.wind.speed} m/s
              </div>
            </div>
            <div className="weather">{weather.weather[0].description}</div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
