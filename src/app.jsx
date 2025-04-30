import { useEffect } from "react";
import { LoadingSpinner } from "./components/LoadingSpinner/LoadingSpinner";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { WeatherCard } from "./components/WeatherCard/WeatherCard";
import { useWeather } from "./hooks/useWeather";
import "./styles/imports.scss";

export default function App() {
  const { weatherData, defaultLocation, isLoading, searchCity, getUserLocation } = useWeather();

  useEffect(() => {
    getUserLocation();
  }, []);

  const getLocationText = () => {
    const data = weatherData || defaultLocation;
    return data ? `${data.name}, ${data.sys.country}` : "";
  };

  return (
    <>
      <SearchBar onSearch={searchCity} locationText={getLocationText()} />
      {isLoading && <LoadingSpinner />}
      <div className="main-area">
        <WeatherCard weatherData={weatherData || defaultLocation} />
      </div>
    </>
  );
}
