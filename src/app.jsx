import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { getLocationByCity, getWeather } from "./hooks/useLocation";
import "./styles/imports.scss";

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [defaultLocation, setUserLocation] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);

  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const days = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];

  const weatherIcons = {
    "01d": "/icons/clear-day.png",
    "01n": "/icons/clear-night.png",
    "02d": "/icons/partly-cloudy-day.png",
    "02n": "/icons/partly-cloudy-night.png",
    "03d": "/icons/cloudy.png",
    "03n": "/icons/cloudy.png",
    "04d": "/icons/cloudy.png",
    "04n": "/icons/cloudy.png",
    "09d": "/icons/rain.png",
    "09n": "/icons/rain.png",
    "10d": "/icons/rain.png",
    "10n": "/icons/rain.png",
    "11d": "/icons/thunderstorm.png",
    "11n": "/icons/thunderstorm.png",
    "13d": "/icons/snow.png",
    "13n": "/icons/snow.png",
    "50d": "/icons/mist.png",
    "50n": "/icons/mist.png",
  };

  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const date = currentTime.getDate();
  const day = days[currentTime.getDay()];
  const month = months[currentTime.getMonth()];

  useEffect(() => {
    getUserLocation();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const userData = await getWeather(latitude, longitude);
          setUserLocation(userData);
        },
        (error) => {
          console.error("Error pegando localizacao do usuario:", error);
        }
      );
    } else {
      console.error("Geolocalização não é suportada por este navegador.");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      fetchData();
    }
  };

  async function fetchData() {
    setIsLoading(true);
    const value = inputValue;

    if (value.trim() === "") {
      setIsLoading(false);
      return;
    }

    const location = await getLocationByCity(value);

    if (!location || location.length === 0) {
      console.warn("Cidade nao encontrada");
      setIsLoading(false);
      return;
    }

    const { lat, lon } = location[0];
    const data = await getWeather(lat, lon);
    
    setWeatherData(data);
    setInputValue("");
    setIsLoading(false);
    inputRef.current?.blur();
  }

  const getLocationText = () => {
    const data = weatherData || defaultLocation;
    return data ? `${data.name}, ${data.sys.country}` : "";
  };

  return (
    <>
      <div className="input-container">
        <input
          ref={inputRef}
          type="text"
          value={isFocused ? inputValue : getLocationText()}
          placeholder="Insira a cidade..."
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <FontAwesomeIcon 
          icon={faMagnifyingGlass} 
          className="search-icon"
          onClick={fetchData}
        />
      </div>

      {isLoading && (
        <div className="loader">
          <div className="spinner"></div>
        </div>
      )}

      <div className="main-area">
        <div className="popup">
          <header className="mainHeader">
            <div className="mainTemp">
              <span className="temp-value">
                {(weatherData || defaultLocation)?.main.temp.toFixed(0)}
              </span>
              <span className="unit">°</span>
            </div>
            <img
              src={
                weatherIcons[
                  (weatherData || defaultLocation)?.weather[0].icon
                ] || "/icons/default.png"
              }
              alt="weather"
              className="icon"
            />
            <span className="description">
              {(weatherData || defaultLocation)?.weather[0].description}
            </span>
          </header>
          <div className="main-content">
            <header className="header">
              <div className="temps feels">
                <span>Sensação de </span>
                <span>
                  {(weatherData || defaultLocation)?.main.feels_like.toFixed(0)}
                  °
                </span>
              </div>
              <div className="temps minTemp">
                <span>Min: </span>
                <span>
                  {(weatherData || defaultLocation)?.main.temp_min.toFixed(0)}°
                </span>
              </div>
              <div className="temps maxTemp">
                <span>Max: </span>
                <span>
                  {(weatherData || defaultLocation)?.main.temp_max.toFixed(0)}°
                </span>
              </div>
            </header>
            <div className="centralContent">
              {`${hours === 0 ? 12 : hours > 12 ? hours - 12 : hours}:${minutes
                .toString()
                .padStart(2, "0")}`}{" "}
              <span className="type">{hours >= 12 ? "PM" : "AM"}</span>
              <div className="dateString">
                <p className="day">{day}</p>
                <p className="month">{month}</p>
                <p className="monthDay">{date}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}