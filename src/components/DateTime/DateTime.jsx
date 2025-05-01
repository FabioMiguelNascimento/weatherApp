import { useEffect, useState } from 'react';
import './DateTime.scss';

export function DateTime({ timezone = 0 }) {
  const [currentTime, setCurrentTime] = useState(() => getLocalTime());

  function getLocalTime() {
    const date = new Date();
    const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
    return new Date(utc + (timezone * 1000));
  }

  useEffect(() => {
    setCurrentTime(getLocalTime());
    
    const timer = setInterval(() => {
      setCurrentTime(getLocalTime());
    }, 1000);

    return () => clearInterval(timer);
  }, [timezone]);

  const formatHour = (hour) => {
    if (hour === 0) return 12;
    if (hour > 12) return hour - 12;
    return hour;
  };

  const hours = formatHour(currentTime.getHours());
  const minutes = currentTime.getMinutes().toString().padStart(2, "0");
  const ampm = currentTime.getHours() >= 12 ? "PM" : "AM";

  const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
  });

  const dateParts = dateFormatter.formatToParts(currentTime).reduce((acc, part) => {
    acc[part.type] = part.value;
    return acc;
  }, {});

  return (
    <div className="centralContent">
      {`${hours}:${minutes}`}{" "}
      <span className="type">{ampm}</span>
      <div className="dateString">
        <p className="day">{dateParts.weekday}</p>
        <p className="month">{dateParts.month}</p>
        <p className="monthDay">{dateParts.day}</p>
      </div>
    </div>
  );
}
