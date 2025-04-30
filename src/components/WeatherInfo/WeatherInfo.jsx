import { weatherIcons } from '../../utils/constants';
import './WeatherInfo.scss';

export function WeatherInfo({ data }) {
  return (
    <header className="mainHeader">
      <div className="mainTemp">
        <span className="temp-value">
          {data.main.temp.toFixed(0)}
        </span>
        <span className="unit">°</span>
      </div>
      <img
        src={weatherIcons[data.weather[0].icon] || "/icons/default.png"}
        alt="weather"
        className="icon"
      />
      <span className="description">
        {data.weather[0].description}
      </span>
    </header>
  );
}
