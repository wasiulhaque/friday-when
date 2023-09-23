import getHoliday from "./Holiday.js";
const dayNumber = 21;
const monthString = 'Feb';
let  dateList=[]
const currentDate = new Date();
currentDate.setDate(dayNumber);

const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];
const monthNumber = monthNames.indexOf(monthString);

currentDate.setMonth(monthNumber);

// Format the date as "DD MMM YYYY"
const formattedDate = currentDate.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
});
let holidays =await getHoliday();
export  default function holidaysList(){
    for(let i = 0; i<holidays.length; i++) {
        currentDate.setDate(holidays[i]["number"])
        const monthNumber = monthNames.indexOf(monthString);
        currentDate.setMonth(monthNumber);
        dateList.push(currentDate)
    }
}


console.log(dateList)