import {useEffect} from 'react';
import LanguageUtil from '../util/LanguageUtil';
import { useSelector, useDispatch } from 'react-redux';
import { languageActions } from '../store/languageSlice';

function Setting(props) {
    // 라벨을 반대로.
    // 현재 영어면 kor을 보여주고
    // 현재 kor이면 eng를 보여줘야 함.

    const dispatch = useDispatch();
    const lang = useSelector(state => state.language.lang);

    const getLabel = (cur) => {
        if(cur == LanguageUtil.eng) return LanguageUtil.getLangObj(LanguageUtil.eng);
        return LanguageUtil.getLangObj(LanguageUtil.kor);
    }
    const _changeLang = () => {
        console.log('changeLang', lang, 'to ', getLabel(lang).label);
        // props.setLang(getLabel(props.lang));
        // LanguageUtil.changeLang(getLabel(props.lang), props.setLang);
        dispatch(languageActions.changeLang(getLabel(lang).label));
    }

    useEffect(() => {
        console.log('setting useEffect', props.lang);
        // let result = getLang(LanguageUtil.getCurLeng());
        // console.log('mount');
        // if(!result) result = ENG;
        // setLanguage(result);
    }, ([]));

    

    return (
        <div className='main-setting'>
            <span className='lang' onClick={_changeLang}>{getLabel(lang).label}</span>
        </div>
    );
}

export default Setting;