import DateUtil from '../util/DateUtil';

function Calendar() {
    const today = new Date();
    const end = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    // const end_day = end.getDay();
    const start = new Date(today.getFullYear()-1, today.getMonth(), today.getDate()-1);
    const start_day = start.getDay();
    const totalDay = (end - start + 1) / DateUtil.DAY_TO_MILLISECONDS;

    // ******** 설정사항 - row 수, 라벨 표시 방법, 색상
    const isMonthLabelNum = true;
    const isDayLabelShort = true; // 바꾸면 .first width 수정 필요
    // 블로그 잔디 기준 및 색상 설정
    const levelOfContribution = [0, 5, 8, 9];
    // 흰색 계열
    // const levelOfColor = ['rgb(50, 50, 50)', 'rgb(85, 85, 85)', 'rgb(125, 125, 125)', 'rgb(160, 160, 160)', 'rgb(200, 200, 200)'];
    // 초록 계열
    const levelOfColor = ['rgb(50, 50, 50)', 'rgb(0, 64, 0)', 'rgb(0, 115, 0)', 'rgb(0, 198, 0)', 'rgb(0, 255, 0)'];

    // row 는 고정
    const numOfRow = DateUtil.DAYS.length;

    // 첫 주 일수 구하기
    const dayOfFirstWeek = numOfRow - start_day;

    // col 수 구하기 (빼두었던 첫 주 포함시킴, 범례 포함)
    const numOfCol = Math.ceil((totalDay - dayOfFirstWeek) / numOfRow) + 2;

    // 마지막 주 일수 구하기
    const dayOfLastWeek = (totalDay - dayOfFirstWeek) % numOfRow;

    const setColor = (num) => {
        let color = levelOfColor[0];
        if(num >= levelOfContribution[0] && num < levelOfContribution[1]) color = levelOfColor[1];
        else if(num >= levelOfContribution[1] && num < levelOfContribution[2]) color = levelOfColor[2];
        else if(num >= levelOfContribution[2] && num < levelOfContribution[3]) color = levelOfColor[3];
        else if (num >= levelOfContribution[3]) color = levelOfColor[4];
        return color;
    }
    
    const makeTable = () => {
        // 시작 = 첫 주의 일요일
        // 끝 = 마지막 주의 토요일
        let _today;
        // _today 직전 날짜
        let _lastDay;
        
        // tbody
        const tbody = [];
        const monthLoc = [];
        let lastMonth = '';
        for(let j = 0; j < numOfRow; j++) {
            const tdArr = [];
            let tr;
            // tr마다 첫 날 다시 설정 (시작일에서 +j일씩 더해줌)
            _today = DateUtil.calcDate(start, -start_day+j);
            _lastDay = DateUtil.subDate(_today, 7);
            for(let i = 0; i < numOfCol; i++) {
                let td;
                if(i == 0) {
                    // 월, 수, 금만 표시
                    if(j%2 == 1) {
                        const label = isDayLabelShort? DateUtil.DAYS_INITIAL[j%DateUtil.DAYS_INITIAL.length] : DateUtil.DAYS[j%DateUtil.DAYS.length];
                        td = <td className='td first day' idx={`${i}`} key={i}>{label}</td>
                    } else td = <td className='td first' key={i}></td>;
                } else {
                    // thead 월 표시 위함
                    const thisMonth = _today.getMonth();
                    if(j == 0 && lastMonth != thisMonth) {
                        if(monthLoc.length > 0 && monthLoc[monthLoc.length-1].idx+1 == i) monthLoc.splice(monthLoc.length-1);
                        monthLoc.push({idx: i, month: thisMonth});
                        lastMonth = thisMonth;
                    }
                    if(_today >= start && _today <= end) {
                        let contribution = Math.floor(Math.random()*10);
                        if(contribution == 0) contribution = 'No';
                        let tooltipClass = "calendar-tooltip";
                        if(i < 3) tooltipClass += " left";
                        else if(i < 6) tooltipClass += " left-2";
                        else if(i < 20) tooltipClass += " left-3";
                        // 최근 1년에 해당하는 날짜
                        td = <td key={i} className='td date' idx={`${i}`} date={`${_today.getFullYear()}-${thisMonth+1}-${_today.getDate()}`} style={{backgroundColor: setColor(contribution)}}>
                            <span className={tooltipClass}>{contribution} contributions on {DateUtil.DAYS[_today.getDay()]}, {DateUtil.MONTHS[_today.getMonth()]} {_today.getDate()}, {_today.getFullYear()}</span>
                        </td>;
                    } else {
                        // 범위 밖의 날짜
                        let contribution = Math.floor(Math.random()*10);
                        if(contribution == 0) contribution = 'No';
                        let tooltipClass = "calendar-tooltip";
                        if(i < 6) tooltipClass += " left";
                        td = <td className='td' idx={`${i}`} key={i}></td>;
                    }
                    // 세로가 한 주이므로, 다음 칸은 +7일이 됨.
                    _today = DateUtil.addDate(_today, numOfRow);
                    _lastDay = DateUtil.addDate(_lastDay, numOfRow);
                }      
                tdArr.push(td);
            }
            tr = <tr className='tr' key={j}>{tdArr}</tr>;
            tbody.push(tr);
        }
        // thead
        const tdArr = [];
        let monthIdx = 0;
        let td;
        let content;
        for(let i = 0; i < numOfCol; i++) {
            td = null;
            if (i == 0) td = <td className='td first' key={i}></td>;
            else if (monthLoc[monthIdx].idx == i) {
                // 월 표시 라벨은 해당 월에 해당하는 만큼 colspan으로 넓혀주기 -> 화면 크기에 맞춰 수정했으므로 주석처리함.
                if(isMonthLabelNum)content = monthLoc[monthIdx].month + 1;
                else content = DateUtil.MONTHS[monthLoc[monthIdx].month];
                // const colspan = monthIdx < monthLoc.length - 1? monthLoc[monthIdx+1].idx - i : numOfCol - i;
                // td = <td className='td month' colSpan={colspan} idx={`${monthIdx+1}`} key={`${monthIdx+1}`}>{content}</td>;
                td = <td className='td month' idx={`${i}`} key={i}>{content}</td>;
                if(monthIdx < monthLoc.length-1) monthIdx++;
            } else td = <td className='td' idx={`${i}`} key={i}></td>;
            if(td) tdArr.push(td);
        }
        const thead = <tr className='tr'>{tdArr}</tr>;

        return (
            <table>
                <thead className='thead'>{thead}</thead>
                <tbody className='tbody'>{tbody}</tbody>
            </table>
        );
    }
    return (
        <div className="calendar">
            {makeTable()}
        </div>
    );
}

export default Calendar;