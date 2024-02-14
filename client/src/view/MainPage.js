import Info from './Info';
import Users from './Users';
import GuestBook from './GuestBook';
import TopPost from './TopPost';
import Challenge from './Challenge';
import axios from 'axios';
import Setting from '../component/Setting';
import { useEffect, useState } from 'react';
import LanguageUtil from '../util/LanguageUtil';
function MainPage(props) {

    const logout = (e) => {
        axios.get(`/api/logout`).then((res) => {
            console.log("logout", res.data);
            props.changeState(res.data);
        });
    }

    // const _setLang = () => {
    //     let rst;
    //     const callback = (result) => {
    //         rst = LanguageUtil.getLangObj(result);
    //         console.log('callback: ', rst);
    //     }
    //     LanguageUtil.getCurLeng(callback);
    //     return rst;
        // LanguageUtil.getCurLeng().then((result) => {
        //     return LanguageUtil.getLangObj(result);
        // });
    // }

    const [lang, setLang] = useState(props.lang);

    useEffect(() => {
        console.log('main useEffect', lang);
        // language가 바뀌면 state를 바꾸는 게 아니라, axios호출을 하고 받아온 값으로 state를 바꿔야 할 듯.
        // LanguageUtil.changeLang(lang);
    }, [lang]);

    return (
        // <div className="main">
        //     <Info/>
        //     <div className="main-right">
        //         <div className="main-right-top">
        //             <User/>
        //             <div className="main-right-top-right">
        //                 <GuestBook/>
        //                 <TopPost/>
        //             </div>
        //         </div>
        //         <Challenge/>
        //     </div>
        // </div>
        <div className="main">
            {console.log('render')}
            <div className="main-left">
                <Info lang={lang}/>
            </div>
            <div className="main-center">
                <Users lang={lang}/>
                <div className='from-host'>
                    <div className='host-msg'>welcome</div>
                </div>
            </div>    
            <div className="main-right">
                <Setting lang={lang} setLang ={setLang}/>
                <GuestBook lang={lang}/>
                <TopPost/>
                <div className='toppost'>
                    <div className="logout-btn" onClick={logout}>로그아웃</div>
                </div>
            </div>
            <div className="main-bottom">
                <Challenge/>
            </div>
        </div>
    );

}

export default MainPage;