export default function getNearestHoliDay(Holidays) {
    let presentDay = new Date();
    const year = presentDay.getFullYear();
    const month = parseInt(String(presentDay.getMonth() + 1).padStart(2, "0"));
    const day = String(presentDay.getDate()).padStart(2, "0");

    let storedDay = 32;

    console.log("Length :" + Holidays.length);

    for (let i = 0; i < Holidays.length; i++) {
        let temp = String(Holidays[i].getMonth() + 1).padStart(2, "0")
        temp = parseInt(temp)
        let tempDay = parseInt(String(Holidays[i].getDate() ).padStart(2, "0"))
        if (temp > month || temp === month) {
            if (tempDay > day) {
                storedDay = Math.min(storedDay, tempDay)
            }
        }
    }
    return storedDay;
}

