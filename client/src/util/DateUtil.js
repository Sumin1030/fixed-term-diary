export default {
    get DAYS() {
        return ['Sun', 'Mon', 'Tue', 'Wen', 'Thur', 'Fri', 'Sat'];
    },
    get DAYS_INITIAL() {
        return ['SU', 'M', 'TU', 'W', 'TH', 'F', 'SA'];
    },
    get MONTHS() {
        return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    },
    get DAY_TO_MILLISECONDS() {
        return 1000*60*60*24;
    },
    get HOUR_TO_MILLISECONDS() {
        return 1000*60*60;
    },
    get MINUTES_TO_MILLISECONDS() {
        return 1000*60;
    },
    get SECOND_TO_MILLISECONDS() {
        return 1000;
    },
    get OFFSET_SUMMERTIME() {
        return -60;
    },
    get _TORONTO_OFFSET() {
        return 300;
    },
    get TORONTO_OFFSET() {
        if(this.isSummerTime()) {
            return this._TORONTO_OFFSET + this.OFFSET_SUMMERTIME;
        }
        return this._TORONTO_OFFSET;
    },
    get KOREA_OFFSET() {
        return -540;
    },
    isSummerTime() {
        const current = new Date();
        const month = current.getMonth();
        if(month >= 5 && month < 9) return true;
        return false;
    },
    dateToTime(date) {
        return date.getTime();
    },
    timeFormat(time) {
        return time < 10 ? "0"+time : time;
    },
    checkDate_time(date) {
        if(typeof date === 'object') {
            return this.dateToTime(date);
        }
        return date;
    },
    checkDate_object(date) {
        if(typeof date != 'object') {
            return new Date(date);
        }
        return date;
    },
    getUtc(time) {
        const _time = this.checkDate_object(time);
        // 현재 시간에서 offset을 더해서 표준시를 구함
        return _time.getTime() + (_time.getTimezoneOffset() * this.MINUTES_TO_MILLISECONDS);
    },
    getDate(_myDate, sort="asc", deleteSec=false) {
        const myDate = this.checkDate_object(_myDate);
        const date = this.timeFormat(myDate.getDate());
        const month = myDate.getMonth();
        const year = myDate.getFullYear();
        const hr = this.timeFormat(myDate.getHours());
        const min = this.timeFormat(myDate.getMinutes());
        const sec = this.timeFormat(myDate.getSeconds());
        let fullDate = `${hr}:${min}:${sec} ${date} ${this.MONTHS[month]} ${year}`;
        if(sort != "asc") {
            const _month = this.timeFormat(month+1)
            deleteSec? fullDate = `${year}-${_month}-${date} ${hr}:${min}` 
                            : fullDate = `${year}-${_month}-${date} ${hr}:${min}:${sec}`;
        }
        
        return fullDate;
    },
    getFixedDate(date) {
        const myDate = this.checkDate_object(date);
        const _date = this.timeFormat(myDate.getDate());
        const _month = myDate.getMonth()+1;
        const _year = myDate.getFullYear();
        return `${_year}-${_month}-${_date}`;
    },
    getTimeDiff(start, finish) {
        const diff = finish-start;
        const day = Math.floor(diff/(this.DAY_TO_MILLISECONDS));
        const hour = Math.floor((diff%(this.DAY_TO_MILLISECONDS))/(this.HOUR_TO_MILLISECONDS));
        const minute = Math.floor((diff%(this.HOUR_TO_MILLISECONDS))/(this.MINUTES_TO_MILLISECONDS));
        const second = Math.floor((diff%(this.MINUTES_TO_MILLISECONDS))/(this.SECOND_TO_MILLISECONDS));
        return {
            day: day,
            hour: hour,
            minute: minute,
            second: second
        };   
    },
    addDate(date, numOfDays) {
        return new Date(this.checkDate_time(date) + numOfDays*this.DAY_TO_MILLISECONDS);
    },
    subDate(date, numOfDays) {
        return new Date(this.checkDate_time(date) - numOfDays*this.DAY_TO_MILLISECONDS)
    },
    calcDate(date, numOfDays) {
        return new Date(this.checkDate_time(date) + numOfDays*this.DAY_TO_MILLISECONDS);
    }
};