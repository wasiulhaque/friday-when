import { useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import ConfettiExplosion from "react-confetti-explosion";
import holidaysList from "./Datemap";
import getNearestHoliDay from "./holidayCalculation";

const DaysUntilFriday = () => {
  const [timeUntilWeekend, setTimeUntilWeekend] = useState(null);
  const [day, setDay] = useState("Sunday"); // default Sunday

  // default 05:00 PM
  const [hour, setHour] = useState("05");
  const [minute, setMinute] = useState("00");
  const [period, setPeriod] = useState("PM");

  useEffect(() => {
    const storedDay = localStorage.getItem("selectedDay");
    const storedHour = localStorage.getItem("selectedHour");
    const storedMinute = localStorage.getItem("selectedMinute");
    const storedPeriod = localStorage.getItem("selectedPeriod");
    if (storedDay) setDay(storedDay);
    if (storedHour) setHour(storedHour);
    if (storedMinute) setMinute(storedMinute);
    if (storedPeriod) setPeriod(storedPeriod);
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedDay", day);
    localStorage.setItem("selectedHour", hour);
    localStorage.setItem("selectedMinute", minute);
    localStorage.setItem("selectedPeriod", period);
  }, [day, hour, minute, period]);

  useEffect(() => {
    function calculateTimeUntilTarget() {
      const now = new Date();
      const today = now.getDay();

      const targetWeekday = {
        Thursday: 4,
        Friday: 5,
        Saturday: 6,
        Sunday: 0,
      }[day];

      let daysLeft = (targetWeekday - today + 7) % 7;

      const target = new Date(now);
      target.setDate(now.getDate() + daysLeft);

      const h = (parseInt(hour, 10) % 12) + (period === "PM" ? 12 : 0);
      target.setHours(h, parseInt(minute, 10), 0, 0);

      const diff = target - now;
      if (diff <= 0) {
        setTimeUntilWeekend({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeUntilWeekend({ days, hours, minutes: mins, seconds: secs });
    }

    const iv = setInterval(calculateTimeUntilTarget, 1000);
    return () => clearInterval(iv);
  }, [day, hour, minute, period]);

  const HOURS = Array.from({ length: 12 }, (_, i) =>
    String(i + 1).padStart(2, "0")
  );
  const MINUTES = Array.from({ length: 60 }, (_, i) =>
    String(i).padStart(2, "0")
  );
  const PERIODS = ["AM", "PM"];

  return (
    <Stack
      spacing={3}
      alignItems="center"
      justifyContent="center"
      sx={{ width: "100%" }}
    >
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="center"
        sx={{ width: "100%" }}
      >
        <FormControl sx={{ minWidth: 150 }}>
          <Select value={day} onChange={(e) => setDay(e.target.value)}>
            <MenuItem value="Thursday">পবিত্র বৃহস্পতিবার রাত</MenuItem>
            <MenuItem value="Friday">Friday</MenuItem>
            <MenuItem value="Saturday">Saturday</MenuItem>
            <MenuItem value="Sunday">Sunday</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ width: 80 }}>
          <Select value={hour} onChange={(e) => setHour(e.target.value)}>
            {HOURS.map((h) => (
              <MenuItem key={h} value={h}>
                {h}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ width: 80 }}>
          <Select value={minute} onChange={(e) => setMinute(e.target.value)}>
            {MINUTES.map((m) => (
              <MenuItem key={m} value={m}>
                {m}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ width: 80 }}>
          <Select value={period} onChange={(e) => setPeriod(e.target.value)}>
            {PERIODS.map((p) => (
              <MenuItem key={p} value={p}>
                {p}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      {timeUntilWeekend ? (
        timeUntilWeekend.days === 0 &&
        timeUntilWeekend.hours === 0 &&
        timeUntilWeekend.minutes === 0 &&
        timeUntilWeekend.seconds === 0 ? (
          <span>
            It’s {day} at {hour}:{minute} {period}! 🎉
            <ConfettiExplosion
              force={0.5}
              duration={8000}
              particleCount={200}
            />
          </span>
        ) : (
          <span>
            {timeUntilWeekend.days} day{timeUntilWeekend.days !== 1 && "s"}
            ,&nbsp;
            {timeUntilWeekend.hours} hour{timeUntilWeekend.hours !== 1 && "s"}
            ,&nbsp;
            {timeUntilWeekend.minutes} minute
            {timeUntilWeekend.minutes !== 1 && "s"}, and&nbsp;
            {timeUntilWeekend.seconds} second
            {timeUntilWeekend.seconds !== 1 && "s"}
          </span>
        )
      ) : (
        <p>Weekend wen?</p>
      )}
    </Stack>
  );
};

export default DaysUntilFriday;
