import Label from '../component/Label';
import { useState, useEffect } from 'react';
import Plotly from "plotly.js-dist";
import axios from "axios";

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

function Info() {
    // 토론토 기준 현재시간
    let curr = new Date();

    const getUtc = (currTime) => {
        // 현재 시간에서 offset을 더해서 표준시를 구함
        return currTime.getTime() + (currTime.getTimezoneOffset() * 60 * 1000);
    }
    let utc = getUtc(curr);
    const torontoOffset = 240;
    const koreaOffset = -540;
    // 표준시에서 토론토, 한국 시차를 각각 빼서 시간을 구함.
    const [today_t, setToday_t] = useState(new Date(utc - (torontoOffset * 60 * 1000)));
    const [today_s, setToday_s] = useState(new Date(utc - (koreaOffset * 60 * 1000)));
    const [leftTime, setLeftTime] = useState({});
  
    const lastDay = new Date(2024, 7, 14);
    // 마지막 날짜에서 offset을 더해 표준시 기준으로 만듦.
    const lastDay_utc = lastDay.getTime() + (lastDay.getTimezoneOffset() * 60 * 1000);;
    const updateLeftTime = () => {
        const diff = lastDay_utc-utc;
        const leftDay = Math.floor(diff/(1000*60*60*24));
        const leftHour = Math.floor((diff%(1000*60*60*24))/(1000*60*60));
        const leftMinute = Math.floor((diff%(1000*60*60))/(1000*60));
        const leftSecond = Math.floor((diff%(1000*60))/(1000));
        return {
            leftDay: leftDay,
            leftHour: leftHour,
            leftMinute: leftMinute,
            leftSecond: leftSecond
        };   
    }

    const updateCurrTime = () => {
        curr =  new Date();
        utc = getUtc(curr);
    }

    useEffect(()=>{
        const interval = setInterval(() => {
            updateCurrTime();
            setToday_t(new Date(utc - (torontoOffset * 60 * 1000)));
            setToday_s(new Date(utc - (koreaOffset * 60 * 1000)));
            setLeftTime(updateLeftTime());
        }, 1000);
        const todayDate = today_t.getDate();
        const x = [];
        for(let i = 0; i < 5; i++) x[i] = todayDate-i;
        let trace1 = {
            x: x,
            y: [0, 0, 0, 0, 0],
            // mode: "lines",
            type: 'scatter',
            marker: {
                color: "gray"
            }
        };
        // 로그인 시 utc 기준으로 로그 쌓음
        // 현재 날짜의 00시를 utc기준으롤 바꾸어 파라미터 구성
        const today = getDate(new Date(getUtc(new Date(`${curr.getFullYear()}-${curr.getMonth()+1}-${curr.getDate()+1}`))), "desc");
        axios.get(`/api/getVisits?today=${today}`).then((res)=>{
            const result = res.data.result;
            if(result) {
                let min = 0, max = 0;
                for(let i = 0; i < 5; i++) {
                    // y축 범위 test
                    // trace1.y[i] = i*100;
                    if(result[i]) trace1.y[i] = result[i].cnt;
                    if(min > trace1.y[i]) min = trace1.y[i];
                    if(max < trace1.y[i]) max = trace1.y[i];
                }
                const dtick = Math.ceil((max-min)/4);
                if(dtick > 1) layout.yaxis.dtick = dtick;
            } else {
                console.log("getVisits: ", "결과 없음");
            }
            const data = [trace1];
            Plotly.newPlot('myDiv', data, layout, option);
        });
        

        return () => clearInterval(interval);
    }, []);

    const layout = {
        xaxis: {
            title: 'Date',
            automargin: 'height'
        },
        yaxis: {
            title: 'Visitors',
            rangemode: 'nonnegative',
            // tickformat: `,d`,
            dtick: 1
        },
        paper_bgcolor: "black",
        plot_bgcolor: "black",
        showlegend: false,
        margin: {
            t: 50,
            b: 70,
            l: 60,
            r: 30,
            pad: 10
        }
    };

    const option = {
        staticPlot: true
    };

    return(
        <div className="info">
            information
            <div className="info-time">
                <div className="left-time">
                    <div className="left-time-time">
                        <div className="left-day">
                            {leftTime.leftDay} Days 
                        </div>
                        <div className="left-hour">
                            {leftTime.leftHour} hr {leftTime.leftMinute} min {leftTime.leftSecond} sec
                        </div>
                    </div>
                    <div className="left-time-text">
                        Left to explode
                    </div>
                </div>
                <div className="curr-time">
                    <div className="seoul-time">
                        <div className="time-title">
                            SEOUL
                        </div>
                        <div className="today-time">
                            {getDate(today_s)}
                        </div>
                    </div>
                    <div className="toronto-time">
                        <div className="time-title">
                            TORONTO
                        </div>
                        <div className="today-time">
                            {getDate(today_t)}
                        </div>
                    </div>
                </div>
            </div>
            <div className="visitor" id="myDiv">
            </div>
            <div className="grass">

            </div>
        </div>
    )
}

export default Info;