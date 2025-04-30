import { DateTime } from '../DateTime/DateTime';
import { WeatherInfo } from '../WeatherInfo/WeatherInfo';
import './WeatherCard.scss';

export function WeatherCard({ weatherData }) {
  if (!weatherData) return null;

  return (
    <div className="popup">
      <WeatherInfo data={weatherData} />
      <div className="main-content">
        <header className="header">
          <div className="temps feels">
            <span>Sensação de </span>
            <span>{weatherData.main.feels_like.toFixed(0)}°</span>
          </div>
          <div className="temps minTemp">
            <span>Min: </span>
            <span>{weatherData.main.temp_min.toFixed(0)}°</span>
          </div>
          <div className="temps maxTemp">
            <span>Max: </span>
            <span>{weatherData.main.temp_max.toFixed(0)}°</span>
          </div>
        </header>
        <DateTime />
      </div>
    </div>
  );
}
