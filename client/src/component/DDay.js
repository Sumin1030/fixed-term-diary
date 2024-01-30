import CANADA from "../resource/text/canada";
import {D, Plus, NUMBER} from "../resource/text/day";
import CANADAFLAG from "../resource/text/canadaFlag";
import { useEffect, useState } from "react";
import DateUtil from "../util/DateUtil";

function DDay(props) {
    const getInnerHTML = (txt) => {
        return {
            __html: txt.replaceAll(' ', '&nbsp;')
        }
    }

    const country = props.country;
    const startTime = props.startTime;

    // d+ 디데이 날짜 계산
    const getNum = (startTime) => {
        let num = DateUtil.getTimeDiff(startTime, new Date()).day;
        let _num = 0;
        const _numArr = [];
        let key = 1;
        while(num >= 1) {
            _num = num % 10;
            _numArr.push(<div key={key++} className={`num num${_num}`} dangerouslySetInnerHTML={getInnerHTML(NUMBER[_num])}></div>);
            num = Math.floor(num /= 10);
        }
        if(_numArr.length == 0) {
            _numArr.push(<div key={key++} className={`num num${_num}`} dangerouslySetInnerHTML={getInnerHTML(NUMBER[_num])}></div>);
        }
        return _numArr.reverse();
    }

    const [numArr, setNumArr] = useState([]);

    const startInterval = (callback, interval) => {
        callback();
        const _interval = setInterval(callback, interval);
        return _interval;
    }
    useEffect(() => {
        const interval = startInterval(() => {
            console.log(getNum(startTime));
            setNumArr(getNum(startTime));
        }, DateUtil.HOUR_TO_MILLISECONDS);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className='d-day'>
            <div className='country' dangerouslySetInnerHTML={getInnerHTML(CANADA)}></div>
            <div className='secondRow'>
                <div className='date'>
                    <div className='d' dangerouslySetInnerHTML={getInnerHTML(D)}></div>
                    <div className='plus' dangerouslySetInnerHTML={getInnerHTML(Plus)}></div>
                    {numArr}
                </div>
                <div className='flag'>
                    {CANADAFLAG}
                </div>
            </div> 
        </div>
    );
}
export default DDay;