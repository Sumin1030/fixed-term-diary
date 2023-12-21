import Info from './Info';
import Users from './Users';
import GuestBook from './GuestBook';
import TopPost from './TopPost';
import Challenge from './Challenge';
import axios from 'axios';
function MainPage(props) {

    const logout = (e) => {
        axios.get(`/api/logout`).then((res) => {
            console.log("logout");
            props.changeState(false);
        });
    }
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
            <div className="main-left">
                <Info/>
            </div>
            <div className="main-center">
                <Users/>
            </div>    
            <div className="main-right">
                <GuestBook/>
                {/* <TopPost/> */}
                <div className='toppost'>
                    <div className="logout-btn" onClick={logout}>로그아웃</div>
                </div>
            </div>
            <div className="main-bottom">
                <Challenge/>
            </div>
        </div>
    )

}

export default MainPage;