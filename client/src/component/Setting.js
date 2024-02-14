import axios from 'axios';
import {useState, useEffect} from 'react';
import LanguageUtil from '../util/LanguageUtil';

function Setting(props) {
    // 라벨을 반대로.
    // 현재 영어면 kor을 보여주고
    // 현재 kor이면 eng를 보여줘야 함.
    const getLabel = (cur) => {
        if(cur.val == LanguageUtil.eng) return LanguageUtil.getLangObj(LanguageUtil.kor);
        return LanguageUtil.getLangObj(LanguageUtil.eng);
    }
    const changeLang = () => {
        console.log('changeLang');
        // props.setLang(getLabel(props.lang));
        LanguageUtil.changeLang(getLabel(props.lang), props.setLang);
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
            <span className='lang' onClick={changeLang}>{props.lang?.label}</span>
        </div>
    );
}

export default Setting;