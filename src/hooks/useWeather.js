import { useState } from 'react';
import { getLocationByCity, getLocationByCoords, getWeather } from './useLocation';

export function useWeather() {
  const [weatherData, setWeatherData] = useState(null);
  const [defaultLocation, setUserLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchCity = async (city) => {
    try {
      setError(null);
      setIsLoading(true);
      
      if (!city.trim()) return;

      const location = await getLocationByCity(city);
      if (!location?.length) {
        throw new Error("Cidade não encontrada");
      }

      const { lat, lon, name, state, country } = location[0];
      const data = await getWeather(lat, lon);
      if (!data) throw new Error("Erro ao buscar dados do clima");
      
      data.name = name;
      data.sys.state = state;
      data.sys.country = country;
      
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getUserLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocalização não suportada");
      return;
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude: lat, longitude: lon } = position.coords;
          
          const locationInfo = await getLocationByCoords(lat, lon);
          const weatherData = await getWeather(lat, lon);
          
          if (locationInfo && weatherData) {
            weatherData.name = locationInfo.name;
            weatherData.sys.state = locationInfo.state;
            weatherData.sys.country = locationInfo.country;
            setUserLocation(weatherData);
          }
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      },
      (error) => {
        setError("Erro ao obter localização: ", error);
        setIsLoading(false);
      }
    );
  };

  return {
    weatherData,
    defaultLocation,
    isLoading,
    error,
    searchCity,
    getUserLocation
  };
}
