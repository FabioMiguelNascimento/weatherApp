import { useState } from 'react';
import { getLocationByCity, getWeather } from './useLocation';

export function useWeather() {
  const [weatherData, setWeatherData] = useState(null);
  const [defaultLocation, setUserLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const searchCity = async (city) => {
    setIsLoading(true);
    
    if (!city.trim()) {
      setIsLoading(false);
      return;
    }

    const location = await getLocationByCity(city);
    if (!location?.length) {
      console.warn("Cidade não encontrada");
      setIsLoading(false);
      return;
    }

    const { lat, lon } = location[0];
    const data = await getWeather(lat, lon);
    
    setWeatherData(data);
    setIsLoading(false);
  };

  const getUserLocation = () => {
    if (!navigator.geolocation) {
      console.error("Geolocalização não suportada");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const userData = await getWeather(latitude, longitude);
        setUserLocation(userData);
      },
      (error) => console.error("Erro na geolocalização:", error)
    );
  };

  return {
    weatherData,
    defaultLocation,
    isLoading,
    searchCity,
    getUserLocation
  };
}
