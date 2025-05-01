import { DateTime } from '../DateTime/DateTime';
import { WeatherInfo } from '../WeatherInfo/WeatherInfo';
import './WeatherCard.scss';

export function WeatherCard({ weatherData, isLoading }) {
  if (!weatherData && isLoading) {
    return (
      <div className="popup loading-placeholder">
        <div className="placeholder-content">
          <div className="placeholder-icon"></div>
          <div className="placeholder-text"></div>
          <div className="placeholder-temp"></div>
        </div>
      </div>
    );
  }

  if (!weatherData) return null;

  return (
    <div className={`popup ${isLoading ? 'loading' : ''}`}>
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
        <DateTime timezone={weatherData.timezone} />
      </div>
    </div>
  );
}
