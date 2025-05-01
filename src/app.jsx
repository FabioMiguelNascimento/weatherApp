import { useEffect, useState } from "react";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { WeatherBackground } from "./components/WeatherBackground/WeatherBackground";
import { WeatherCard } from "./components/WeatherCard/WeatherCard";
import { useWeather } from "./hooks/useWeather";
import "./styles/imports.scss";

export default function App() {
  const { weatherData, defaultLocation, isLoading, error, searchCity, getUserLocation } = useWeather();
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    getUserLocation();
  }, []);

  useEffect(() => {
    const updateTitle = () => {
      const data = weatherData || defaultLocation;
      if (!data) return;

      const date = new Date();
      const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
      const cityTime = new Date(utc + (data.timezone * 1000));
      
      const hours = cityTime.getHours().toString().padStart(2, '0');
      const minutes = cityTime.getMinutes().toString().padStart(2, '0');
      const timeStr = `${hours}:${minutes}`;
      
      setCurrentTime(timeStr);
      document.title = `${data.name} ${timeStr}`;
    };

    updateTitle();
    const timer = setInterval(updateTitle, 1000);

    return () => clearInterval(timer);
  }, [weatherData, defaultLocation]);

  const getLocationText = () => {
    const data = weatherData || defaultLocation;
    if (!data) return "";
    
    const state = data.sys.state ? `${data.sys.state}, ` : '';
    return `${data.name}, ${state}${data.sys.country}`;
  };

  const currentWeather = weatherData || defaultLocation;

  return (
    <>
      <WeatherBackground 
        weatherCode={currentWeather?.weather[0]?.icon}
        isLoading={isLoading && !currentWeather}
      />
      <SearchBar 
        onSearch={searchCity} 
        locationText={getLocationText()}
        error={error}
      />
      <div className="main-area">
        <WeatherCard 
          weatherData={currentWeather} 
          isLoading={isLoading}
          timezone={currentWeather?.timezone}
          timezone_name={currentWeather?.timezone_name}
        />
      </div>
    </>
  );
}