import { useEffect } from "react";
import { LoadingSpinner } from "./components/LoadingSpinner/LoadingSpinner";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { WeatherBackground } from "./components/WeatherBackground/WeatherBackground";
import { WeatherCard } from "./components/WeatherCard/WeatherCard";
import { useWeather } from "./hooks/useWeather";
import "./styles/imports.scss";

export default function App() {
  const { weatherData, defaultLocation, isLoading, error, searchCity, getUserLocation } = useWeather();

  useEffect(() => {
    getUserLocation();
  }, []);

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
      />
      <SearchBar 
        onSearch={searchCity} 
        locationText={getLocationText()}
        error={error}
      />
      {isLoading && <LoadingSpinner />}
      <div className="main-area">
        <WeatherCard weatherData={currentWeather} />
      </div>
    </>
  );
}