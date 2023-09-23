
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function convertDate(day,month){
    const indexMonth=monthNames.indexOf(month)
    const dateObject=new Date(2023,indexMonth,day)
    let date=dateObject.getDate()
    let monthIndex=dateObject.getMonth()+1
    console.log( `Date ${date} Month ${monthIndex}`)
}
