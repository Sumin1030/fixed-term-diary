const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const getDate = (myDate, sort="asc") => {
    const date = timeFormat(myDate.getDate());
    const month = myDate.getMonth();
    const year = myDate.getFullYear();
    const hr = timeFormat(myDate.getHours());
    const min = timeFormat(myDate.getMinutes());
    const sec = timeFormat(myDate.getSeconds());
    let fullDate = `${hr}:${min}:${sec} ${date} ${months[month]} ${year}`;
    if(sort != "asc") {
        fullDate = `${year}-${month+1}-${date} ${hr}:${min}:${sec}`;
    }
    return fullDate;
} 
const timeFormat = (time) => {
    return time < 10 ? "0"+time : time;
} 

module.exports = { getDate };