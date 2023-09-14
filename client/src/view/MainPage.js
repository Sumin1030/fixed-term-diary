import Info from './Info';
import User from './User';
import GuestBook from './GuestBook';
import TopPost from './TopPost';
import Challenge from './Challenge';

function MainPage() {
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
                <User/>
            </div>    
            <div className="main-right">
                <GuestBook/>
                <TopPost/>
            </div>
            <div className="main-bottom">
                <Challenge/>
            </div>
        </div>
    )

}

export default MainPage;