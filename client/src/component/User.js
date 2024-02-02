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
   let className = '';
   if (!props.info.title) {
        className += Number(props.info.confirmed) == 1? "confirmed" : "unconfirmed";
        date = DateUtil.getDate(new Date(props.info.date).getTime() - new Date(props.info.date).getTimezoneOffset()*DateUtil.MINUTES_TO_MILLISECONDS, "desc", true);
   } else className += 'user-title'
   if(props.info.name == 'MASTER') className += ' master';
    return (
        <div className={`user ${className}`} onClick={props.info.onClick} >
            <div className="user-date">
                {date}
            </div>
            <div className="user-name">
                {props.info.name}
            </div>
            <div className="user-message">
                {props.info.message}
            </div>
        </div>
    );
}

export default User;