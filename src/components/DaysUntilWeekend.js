import {useEffect, useState} from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ConfettiExplosion from "react-confetti-explosion";
import holidaysList from "./Datemap";
import getNearestHoliDay from "./holidayCalculation";

const DaysUntilFriday = () => {
    const [timeUntilWeekend, settimeUntilWeekend] = useState(null);
    const [day, setDay] = useState('Friday');
    let [holiday,setHoliday]=useState('')

    const handleChange = (event) => {
        const selectedDay = event.target.value;
        setDay(event.target.value);
        settimeUntilWeekend(null);
        localStorage.setItem("selectedDay", selectedDay);
    };

    useEffect(() => {
        // Load the selected day from localStorage on component mount
        const storedDay = localStorage.getItem("selectedDay");
        if (storedDay) {
            setDay(storedDay);
        }
    }, []);

    useEffect(() => {
        const calculatetimeUntilWeekend = () => {
            const now = new Date();
            const currentDay = now.getDay(); // 0: Sunday, 1: Monday, ..., 6: Saturday

            // Calculate days left based on selected day
            let daysLeft = null;
            if (day === "Friday") {
                daysLeft = (5 - currentDay + 7) % 7; // Calculate days left until Friday (5)
            } else if (day === "Saturday") {
                daysLeft = (6 - currentDay + 7) % 7; // Calculate days left until Saturday (6)
            } else if (day === "Sunday") {
                daysLeft = (7 - currentDay + 7) % 7; // Calculate days left until Sunday (0)
            } else if (day === "Thursday") {
                daysLeft = (4 - currentDay + 7) % 7; // Calculate days left until Sunday (0)
            }
            else if (day==="Govt Holiday"){
                if(holiday){
                    daysLeft=(holiday.getDate()-currentDay)
                }
            }

            if (daysLeft != null) {
                // Set the target time to Friday 12:00
                const targetTime = new Date(now);
                targetTime.setDate(now.getDate() + daysLeft);
                if (day === "Thursday") {
                    targetTime.setHours(19, 0, 0, 0);
                } else {
                    targetTime.setHours(0, 0, 0, 0);
                }

                // Calculate the difference between the target time and the current time
                const timeDiff = targetTime - now;
                const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
                const hours = Math.floor(
                    (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                );
                const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

                settimeUntilWeekend({
                    days,
                    hours,
                    minutes,
                    seconds,
                });
            }
        };

        // Update the remaining time every second
        const interval = setInterval(calculatetimeUntilWeekend, 1000);

        // Clean up the interval on unmount
        return () => clearInterval(interval);
    }, [day]); // Run the effect whenever the selected day changes




    function checkHolidays() {
        for (let i = 0; i < 24; i++) {
            console.log(holidaysList()[i]);
        }
    }

    return (
        <div>
            <div>
                <FormControl sx={{minWidth: 210}}>
                    <Select
                        value={day}
                        onChange={handleChange}
                        displayEmpty
                        renderValue={(selected) => {
                            if (selected == null) {
                                return <em>Weekend?</em>;
                            } else if (selected === "Thursday") {
                                return "পবিত্র বৃহস্পতিবার রাত";
                            } else {
                                return selected;
                            }
                        }}
                        inputProps={{"aria-label": "Without label"}}
                    >
                        <MenuItem value={"Thursday"}>পবিত্র বৃহস্পতিবার রাত</MenuItem>
                        <MenuItem value={"Friday"}>Friday</MenuItem>
                        <MenuItem value={"Saturday"}>Saturday</MenuItem>
                        <MenuItem value={"Sunday"}>Sunday</MenuItem>
                        <MenuItem value={"Govt Holiday"} onClick={() => {
                            holiday= getNearestHoliDay(holidaysList())
                            setHoliday(holiday)
                        }}>
                            Govt Holiday
                        </MenuItem>
                    </Select>
                </FormControl>
            </div>
            {timeUntilWeekend != null &&
                day !== null &&
                !isNaN(timeUntilWeekend.seconds) && (
                    <p>
                        {timeUntilWeekend.days <= 0 &&
                        timeUntilWeekend.hours <= 0 &&
                        timeUntilWeekend.minutes <= 0 &&
                        timeUntilWeekend.seconds <= 0 ? (
                            <span>
                It's {day}! Happy Weekend! 🎉
                <ConfettiExplosion
                    force={0.5}
                    duration={8000}
                    width={6000}
                    particleCount={250}
                    height={2000}
                />
              </span>
                        ) : (
                            <span>
                {timeUntilWeekend.days} day
                                {timeUntilWeekend.days === 1 ? "" : "s"},{" "}
                                {timeUntilWeekend.hours} hour
                                {timeUntilWeekend.hours === 1 ? "" : "s"},{" "}
                                {timeUntilWeekend.minutes} minute
                                {timeUntilWeekend.minutes === 1 ? "" : "s"}, and{" "}
                                {timeUntilWeekend.seconds} second
                                {timeUntilWeekend.seconds === 1 ? "" : "s"}
              </span>
                        )}
                    </p>
                )}
            {timeUntilWeekend == null && <p>Weekend wen?</p>}
        </div>
    );
};

export default DaysUntilFriday;
=======
import { useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ConfettiExplosion from "react-confetti-explosion";
import holidaysList from "./Datemap";
import getNearestHoliDay from "./holidayCalculation";

const DaysUntilFriday = () => {
  const [timeUntilWeekend, settimeUntilWeekend] = useState(null);
  const [day, setDay] = useState("Friday");
  let [holiday, setHoliday] = useState("");

  const handleChange = (event) => {
    const selectedDay = event.target.value;
    setDay(event.target.value);
    settimeUntilWeekend(null);
    localStorage.setItem("selectedDay", selectedDay);
  };

  useEffect(() => {
    // Load the selected day from localStorage on component mount
    const storedDay = localStorage.getItem("selectedDay");
    if (storedDay) {
      setDay(storedDay);
    }
  }, []);

  useEffect(() => {
    const calculatetimeUntilWeekend = () => {
      const now = new Date();
      const currentDay = now.getDay(); // 0: Sunday, 1: Monday, ..., 6: Saturday

      // Calculate days left based on selected day
      let daysLeft = null;
      if (day === "Friday") {
        daysLeft = (5 - currentDay + 7) % 7; // Calculate days left until Friday (5)
      } else if (day === "Saturday") {
        daysLeft = (6 - currentDay + 7) % 7; // Calculate days left until Saturday (6)
      } else if (day === "Sunday") {
        daysLeft = (7 - currentDay + 7) % 7; // Calculate days left until Sunday (0)
      } else if (day === "Thursday") {
        daysLeft = (4 - currentDay + 7) % 7; // Calculate days left until Sunday (0)
      } else if (day === "Govt Holiday") {
        if (holiday) {
          daysLeft = holiday.getDate() - currentDay;
        }
      }

      if (daysLeft != null) {
        // Set the target time to Friday 12:00
        const targetTime = new Date(now);
        targetTime.setDate(now.getDate() + daysLeft);
        if (day === "Thursday") {
          targetTime.setHours(19, 0, 0, 0);
        } else {
          targetTime.setHours(0, 0, 0, 0);
        }

        // Calculate the difference between the target time and the current time
        const timeDiff = targetTime - now;
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        settimeUntilWeekend({
          days,
          hours,
          minutes,
          seconds,
        });
      }
    };

    // Update the remaining time every second
    const interval = setInterval(calculatetimeUntilWeekend, 1000);

    // Clean up the interval on unmount
    return () => clearInterval(interval);
  }, [day]); // Run the effect whenever the selected day changes

  function checkHolidays() {
    for (let i = 0; i < 24; i++) {
      console.log(holidaysList()[i]);
    }
  }

  return (
    <div>
      <div>
        <FormControl sx={{ minWidth: 210 }}>
          <Select
            value={day}
            onChange={handleChange}
            displayEmpty
            renderValue={(selected) => {
              if (selected == null) {
                return <em>Weekend?</em>;
              } else if (selected === "Thursday") {
                return "পবিত্র বৃহস্পতিবার রাত";
              } else {
                return selected;
              }
            }}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value={"Thursday"}>পবিত্র বৃহস্পতিবার রাত</MenuItem>
            <MenuItem value={"Friday"}>Friday</MenuItem>
            <MenuItem value={"Saturday"}>Saturday</MenuItem>
            <MenuItem value={"Sunday"}>Sunday</MenuItem>
            {/* <MenuItem
              value={"Govt Holiday"}
              onClick={() => {
                holiday = getNearestHoliDay(holidaysList());
                setHoliday(holiday);
              }}
            >
              Govt Holiday
            </MenuItem> */}
          </Select>
        </FormControl>
      </div>
      {timeUntilWeekend != null &&
        day !== null &&
        !isNaN(timeUntilWeekend.seconds) && (
          <p>
            {timeUntilWeekend.days <= 0 &&
            timeUntilWeekend.hours <= 0 &&
            timeUntilWeekend.minutes <= 0 &&
            timeUntilWeekend.seconds <= 0 ? (
              <span>
                It's {day}! Happy Weekend! 🎉
                <ConfettiExplosion
                  force={0.5}
                  duration={8000}
                  width={6000}
                  particleCount={250}
                  height={2000}
                />
              </span>
            ) : (
              <span>
                {timeUntilWeekend.days} day
                {timeUntilWeekend.days === 1 ? "" : "s"},{" "}
                {timeUntilWeekend.hours} hour
                {timeUntilWeekend.hours === 1 ? "" : "s"},{" "}
                {timeUntilWeekend.minutes} minute
                {timeUntilWeekend.minutes === 1 ? "" : "s"}, and{" "}
                {timeUntilWeekend.seconds} second
                {timeUntilWeekend.seconds === 1 ? "" : "s"}
              </span>
            )}
          </p>
        )}
      {timeUntilWeekend == null && <p>Weekend wen?</p>}
    </div>
  );
};

export default DaysUntilFriday;
