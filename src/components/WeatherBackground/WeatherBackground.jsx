import { useEffect, useMemo, useState } from 'react';
import { weatherAnimations, weatherBackgrounds } from '../../utils/constants';
import './WeatherBackground.scss';

export function WeatherBackground({ weatherCode, isLoading }) {
  const [isChanging, setIsChanging] = useState(false);
  
  useEffect(() => {
    setIsChanging(true);
    const timer = setTimeout(() => setIsChanging(false), 100);
    return () => clearTimeout(timer);
  }, [weatherCode]);

  const backgroundSrc = useMemo(() => {
    if (isLoading) return weatherBackgrounds['03d']; // Usar nuvens como padrão
    return weatherBackgrounds[weatherCode] || weatherBackgrounds['01d'];
  }, [weatherCode, isLoading]);

  const animationClass = useMemo(() => {
    return weatherAnimations[weatherCode] ? `weather-animation--${weatherAnimations[weatherCode]}` : '';
  }, [weatherCode]);

  return (
    <div className={`weather-background ${animationClass}`}>
      <img 
        className={`weather-background__image ${isChanging ? 'changing' : ''}`}
        src={backgroundSrc}
        alt=""
        loading="lazy"
      />
    </div>
  );
}