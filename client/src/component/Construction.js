import { useSelector } from "react-redux";
import LanguageUtil from "../util/LanguageUtil";
function Construction() {

    const lang = useSelector(state => state.language.lang);
    return (
        <div className="construction-outer">
            <div className="construction-inner">
                <div>{LanguageUtil.getMessage('construction.underConstruction', lang)}</div>
                <br/>
                <div>{LanguageUtil.getMessage('construction.commingSoon', lang)}</div>
            </div>
        </div>
    );
}

export default Construction;