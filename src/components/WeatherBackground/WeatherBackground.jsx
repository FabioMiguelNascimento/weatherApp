import { useMemo } from 'react';
import { weatherAnimations, weatherBackgrounds } from '../../utils/constants';
import './WeatherBackground.scss';

export function WeatherBackground({ weatherCode }) {
  const backgroundSrc = useMemo(() => {
    return weatherBackgrounds[weatherCode] || weatherBackgrounds['01d'];
  }, [weatherCode]);

  const animationClass = useMemo(() => {
    return weatherAnimations[weatherCode] ? `weather-animation--${weatherAnimations[weatherCode]}` : '';
  }, [weatherCode]);

  return (
    <div className={`weather-background ${animationClass}`}>
      <img 
        className="weather-background__image"
        src={backgroundSrc}
        alt=""
        loading="lazy"
      />
    </div>
  );
}