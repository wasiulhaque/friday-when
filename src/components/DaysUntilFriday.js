import { useEffect, useState } from "react";

const DaysUntilFriday = () => {
  const [timeUntilFriday, setTimeUntilFriday] = useState(null);

  useEffect(() => {
    const calculateTimeUntilFriday = () => {
      const now = new Date();
      const currentDay = now.getDay(); // 0: Sunday, 1: Monday, ..., 6: Saturday
      const daysLeft = (5 - currentDay + 7) % 7; // Calculate days left until Friday (5)

      // Set the target time to Friday 12:00
      const targetTime = new Date(now);
      targetTime.setDate(now.getDate() + daysLeft);
      targetTime.setHours(0, 0, 0, 0);

      // Calculate the difference between the target time and the current time
      const timeDiff = targetTime - now;
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      setTimeUntilFriday({
        days,
        hours,
        minutes,
        seconds,
      });
    };

    // Update the remaining time every second
    const interval = setInterval(calculateTimeUntilFriday, 1000);

    // Clean up the interval on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {timeUntilFriday !== null && (
        <p>
          {timeUntilFriday.days === 0 &&
          timeUntilFriday.hours === 0 &&
          timeUntilFriday.minutes === 0 &&
          timeUntilFriday.seconds === 0 ? (
            <span>It's Friday today!</span>
          ) : (
            <span>
              {timeUntilFriday.days} day
              {timeUntilFriday.days === 1 || timeUntilFriday.days === 0
                ? ""
                : "s"}
              , {timeUntilFriday.hours} hour
              {timeUntilFriday.hours === 1 || timeUntilFriday.hours === 0
                ? ""
                : "s"}
              , {timeUntilFriday.minutes} minute
              {timeUntilFriday.minutes === 1 || timeUntilFriday.minutes === 0
                ? ""
                : "s"}
              , and {timeUntilFriday.seconds} second
              {timeUntilFriday.seconds === 1 || timeUntilFriday.seconds === 0
                ? ""
                : "s"}
            </span>
          )}
        </p>
      )}
      {timeUntilFriday == null && <p>Friday wen?</p>}
    </div>
  );
};

export default DaysUntilFriday;
