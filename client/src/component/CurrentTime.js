import DateUtil from '../util/DateUtil';
import { useEffect, useState } from 'react';
function CurrentTime() {

    // 토론토 기준 현재시간
    let curr = new Date();

    let utc = DateUtil.getUtc(curr);
    // 표준시에서 토론토, 한국 시차를 각각 빼서 시간을 구함.
    const [today_t, setToday_t] = useState(new Date(utc - (DateUtil.TORONTO_OFFSET * DateUtil.MINUTES_TO_MILLISECONDS)));
    const [today_s, setToday_s] = useState(new Date(utc - (DateUtil.KOREA_OFFSET * DateUtil.MINUTES_TO_MILLISECONDS)));
    // const [leftTime, setLeftTime] = useState({});
  
    // const lastDay = new Date(2024, 7, 14);
    // 마지막 날짜에서 offset을 더해 표준시 기준으로 만듦.
    // const lastDay_utc = lastDay.getTime() + (lastDay.getTimezoneOffset() * DateUtil.MINUTES_TO_MILLISECONDS);;
    // const updateLeftTime = () => {
    //     const diff = lastDay_utc-utc;
    //     const leftDay = Math.floor(diff/(DateUtil.DAY_TO_MILLISECONDS));
    //     const leftHour = Math.floor((diff%(DateUtil.DAY_TO_MILLISECONDS))/(DateUtil.HOUR_TO_MILLISECONDS));
    //     const leftMinute = Math.floor((diff%(DateUtil.HOUR_TO_MILLISECONDS))/(DateUtil.MINUTES_TO_MILLISECONDS));
    //     const leftSecond = Math.floor((diff%(DateUtil.MINUTES_TO_MILLISECONDS))/(DateUtil.SECOND_TO_MILLISECONDS));
    //     return {
    //         leftDay: leftDay,
    //         leftHour: leftHour,
    //         leftMinute: leftMinute,
    //         leftSecond: leftSecond
    //     };   
    // }

    const updateCurrTime = () => {
        curr =  new Date();
        utc = DateUtil.getUtc(curr);
    }

    useEffect(()=>{
        const interval = setInterval(() => {
            updateCurrTime();
            setToday_t(new Date(utc - (DateUtil.TORONTO_OFFSET * DateUtil.MINUTES_TO_MILLISECONDS)));
            setToday_s(new Date(utc - (DateUtil.KOREA_OFFSET * DateUtil.MINUTES_TO_MILLISECONDS)));
            // setLeftTime(updateLeftTime());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="curr-time">
            <div className="seoul-time">
                <div className="time-title">
                    SEOUL
                </div>
                <div className="today-time">
                    {DateUtil.getDate(today_s)}
                </div>
            </div>
            <div className="toronto-time">
                <div className="time-title">
                    TORONTO
                </div>
                <div className="today-time">
                    {DateUtil.getDate(today_t)}
                </div>
            </div>
        </div>
    );
}

export default CurrentTime;