export default function getNearestHoliDay(Holidays) {
    let presentDay = new Date();
    const year = presentDay.getFullYear();
    const month = parseInt(String(presentDay.getMonth() + 1).padStart(2, "0"));
    const day = String(presentDay.getDate()).padStart(2, "0");

    let storedDay = 32;
    let tempMonth = 14;

    for (let i = 0; i < Holidays.length; i++) {
        let temp = String(Holidays[i].getMonth() + 1).padStart(2, "0")
        let tempDay = parseInt(String(Holidays[i].getDate()).padStart(2, "0"))
        temp = parseInt(temp)
        if (temp > month || temp === month) {
            if (temp < tempMonth) {
                tempMonth = Math.min(temp, tempMonth)
                console.log(tempMonth)
                storedDay = tempDay

            } else if (temp === tempMonth && tempDay>day) {
                storedDay = Math.min(storedDay, tempDay)
            }

        }
    }

    return new Date(year,tempMonth-1,storedDay);

