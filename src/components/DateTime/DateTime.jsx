import { useEffect, useState } from 'react';
import { days, months } from '../../utils/constants';
import './DateTime.scss';

export function DateTime() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const date = currentTime.getDate();
  const day = days[currentTime.getDay()];
  const month = months[currentTime.getMonth()];

  return (
    <div className="centralContent">
      {`${hours === 0 ? 12 : hours > 12 ? hours - 12 : hours}:${minutes
        .toString()
        .padStart(2, "0")}`}{" "}
      <span className="type">{hours >= 12 ? "PM" : "AM"}</span>
      <div className="dateString">
        <p className="day">{day}</p>
        <p className="month">{month}</p>
        <p className="monthDay">{date}</p>
      </div>
    </div>
  );
}
