import DateUtil from "../util/DateUtil";
import Depth from "./Depth";
function GuestBookContent(props) {
    const date = DateUtil.getDate(new Date(props.info.DATE).getTime() - new Date(props.info.DATE).getTimezoneOffset()*DateUtil.MINUTES_TO_MILLISECONDS, "desc", true);


    const getDepth = (depth) => {
        const depthArr = [];
        for(let i = 0; i < depth; i++) {
            let comp;
            if(i == depth-1) {
                comp = (props.last[`${i}`])? <Depth key={i} depth={i} end last /> : <Depth key={i} depth={i} end/>;
            } else {
                comp = (props.last[`${i}`])? <Depth key={i} depth={i} last/> : <Depth key={i} depth={i} />;
            }
            depthArr.push(comp);
        }
        return depthArr;
    }

    return (
        <div className='guest-book-content'>
            <div className='gb-date'>{date}</div>
            {getDepth(props.info.DEPTH+1)}
            <div className='gb-name'>{props.info.NAME} / </div>
            <div className='gb-content'>{props.info.CONTENT}</div>
        </div>
    );
}

export default GuestBookContent;