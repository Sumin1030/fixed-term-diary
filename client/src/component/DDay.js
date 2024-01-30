import CANADA from "../resource/text/canada";
import {D, Plus, NUMBER} from "../resource/text/day";
import CANADAFLAG from "../resource/text/canadaFlag";
function DDay(props) {
    const getInnerHTML = (txt) => {
        return {
            __html: txt.replaceAll(' ', '&nbsp;')
        }
    }
    return (
        <div className='d-day'>
            <div className='country' dangerouslySetInnerHTML={getInnerHTML(CANADA)}></div>
            <div className='secondRow'>
                <div className='date'>
                    <div className='d' dangerouslySetInnerHTML={getInnerHTML(D)}></div>
                    <div className='plus' dangerouslySetInnerHTML={getInnerHTML(Plus)}></div>
                    <div className='num num1' dangerouslySetInnerHTML={getInnerHTML(NUMBER[1])}></div>
                    <div className='num num4' dangerouslySetInnerHTML={getInnerHTML(NUMBER[4])}></div>
                    <div className='num num5' dangerouslySetInnerHTML={getInnerHTML(NUMBER[5])}></div>
                </div>
                <div className='flag'>
                    {CANADAFLAG}
                </div>
            </div> 
        </div>
    );
}
export default DDay;