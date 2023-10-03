import getHoliday from "./Holiday.js";
const dayNumber = 21;
const monthString = "Feb";
const currentDate = new Date();
currentDate.setDate(dayNumber);

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Format the date as "DD MMM YYYY"
const formattedDate = currentDate.toLocaleDateString("en-US", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});
let holidays = await getHoliday();
export default function holidaysList() {
  let dateList = [];

  for (let i = 0; i < holidays.length; i++) {
    let date = new Date();
    let monthNumber = monthNames.indexOf(holidays[i]["word"]);
    date.setDate(parseInt(holidays[i]["number"]));
    date.setMonth(monthNumber);
    dateList.push(date);
  }
  return dateList;
}

holidaysList();
