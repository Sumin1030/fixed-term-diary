import DateUtil from "../util/DateUtil";
function User(props) {
    /*
        const info = {
            date: user.SIGNUP_DATE,
            id: user.ID,
            name: user.NAME,
            confirmed: user.CONFIRMED
        }   
    */
   let date = props.info.date;
   let className = 'userComp ';
   if (!props.info.title) {
        className += Number(props.info.confirmed) == 1? "confirmed" : "unconfirmed";
        date = DateUtil.getDate(new Date(props.info.date).getTime() - new Date(props.info.date).getTimezoneOffset()*DateUtil.MINUTES_TO_MILLISECONDS, "desc", true);
   }
   if(props.info.name == 'MASTER') className += ' master';
    return (
        <div className={`userComp ${className}`} onClick={props.info.onClick} >
            <div className="userComp-date">
                {date}
            </div>
            <div className="userComp-name">
                {props.info.name}
            </div>
            <div className="userComp-message">
                {props.info.message}
            </div>
        </div>
    );
}

export default User;