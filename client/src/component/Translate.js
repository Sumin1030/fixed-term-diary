import LanguageUtil from '../util/LanguageUtil';
function Translate(props) {

    const txt = LanguageUtil.getMessage(props.text);
    
    return (
        <div className={props.className}>{txt}</div>
    )
}

export default Translate;