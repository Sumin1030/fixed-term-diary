import {useEffect, useState} from 'react';
import axios from 'axios';
import User from '../component/User';
import Blog from './Blog';
import closeButton from '../resource/images/closeButton.png';
function Users(props) {
    const [modalSwitch, setModalSwitch] = useState(false);
    const [users, setUsers] = useState([]);

    const getUsers = () => {
        let users = [];
        const title ={
            date: 'DATE',
            name: 'NAME',
            message: 'MESSAGE'
        };
        users.push(<User info={{title: true, ...title}} key='0' />);
        axios.get('/api/getUsers').then((res) => {
            if(res.data.result.length > 0) {
                for(let i = 0; i < res.data.result.length; i++) {
                    const user = res.data.result[i];
                    const info = {
                        date: user.SIGNUP_DATE,
                        id: user.ID,
                        name: user.NAME,
                        confirmed: user.CONFIRMED,
                        message: user.MSG,
                        onClick: userClick
                    }   
                    users.push(<User info={info} key={i+1} />);
                }
                setUsers(users)
            }
        });
    }

    const userClick = (e) => {
        // master을 클릭했을 때는 글 목록으로 모달창 띄움
        if(e.currentTarget.classList.contains('master')) {
            setModalSwitch(true);
        }
    }

    useEffect(() => {
        getUsers();
    }, []);

    return(
        <div className="users">
            {users}
            {/* <User info={{date: '2023-10-20', id: 'gjtnals2', name: 'sumin', confirmed: '1', message: 'hi'}} /> */}
               
            { modalSwitch? (
            <div className="modal">
                <button className="btn close-btn" onClick={()=>setModalSwitch(false)}>
                    <img alt="X" src={closeButton} />
                </button>
                <Blog/>
            </div>) : null }
        </div>
    );
    // 디자인 변경으로 주석처리
    // const master = useRef(null);
    // const [circles, setCircles] = useState([]);
    // /*
    //     친구 목록 아이디어
    //     - master 원을 중심으로 하는 큰 원을 그림
    //     - 시작점은 master 원의 x좌표, y-반지름
    //     - 원의 둘레 / 사람 수 해서 각각 좌표 구함
    //     - 적은 수를 범위로 하는 랜덤 수를 구해서 더하거나 뺌
    //     - 애니메이션 적용
    // */
    // let masterCoor = {x:null, y:null};
    // let radius;

    // const getCoordinate = (numOfCircle) => {
    //     console.log(masterCoor, master.current);
    //     // const radius = 35%;
    //     const coordinates = [];
    //     const angle = 360 / numOfCircle;
    //     let angleSum = 0;
    //     // 처음 시작
    //     // coordinates.push({
    //     //     x: masterCoor.x,
    //     //     y: masterCoor.y - radius
    //     // });
    //     for(let i = 0; i < numOfCircle; i++) {
    //         let coor = {};
    //         angleSum += angle;
    //         console.log(angleSum);
    //         // coor.x = masterCoor.x + cos(angle) * radius;
    //         // coor.y = masterCoor.y + sin(angle) * radius;
    //         if (angleSum <= 90) {
    //             coor.x = masterCoor.x + Math.cos(90 - angleSum) * radius;
    //             coor.y = masterCoor.y + Math.sin(90 - angleSum) * radius;
    //             coordinates.push(coor);
    //         } else if (angleSum <= 90*2) {
    //             coor.x = masterCoor.x - Math.cos(90*2 - angleSum) * radius;
    //             coor.y = masterCoor.y - Math.sin(90*2 - angleSum) * radius;
    //             coordinates.push(coor);
    //         } else if (angleSum <= 90*3) {
    //             coor.x = masterCoor.x + Math.sin(90*3 - angleSum) * radius;
    //             coor.y = masterCoor.y + Math.cos(90*3 - angleSum) * radius;
    //             coordinates.push(coor);
    //         } else if (angleSum <= 90*4) {
    //             coor.x = masterCoor.x - Math.sin(90*4 - angleSum) * radius;
    //             coor.y = masterCoor.y - Math.cos(90*4 - angleSum) * radius;
    //             coordinates.push(coor);
    //         }
    //     }

    //     return coordinates;
    // };

    // const getUsers = (num) => {
    //     const coordinates = getCoordinate(num);
    //     const result = [];
    //     let i = 0;
    //     console.log(coordinates);
    //     coordinates.forEach((coordinate) => {
    //         const userCircle = <g><circle cx={coordinate.x} cy={coordinate.y} r="7%" fill="green" key={i++}></circle><text x={coordinate.x} y={coordinate.y} fontSize="20" fill="white">{i}</text></g>;
    //         result.push(userCircle);
    //     });
    //     setCircles(result);
    // }

    // useEffect(()=> {
    //     masterCoor.x = master.current.cx.animVal.value;
    //     masterCoor.y = master.current.cy.animVal.value;
    //     radius = masterCoor.x - 50;
    //     getUsers(10);
    // }, [master.current]);
    // return(
    //     <div className="user">
    //         <svg className="user-svg" width="100%" height="100%">
    //             <g id="master">
    //                 <circle ref={master} cx="50%" cy="50%" r="10%" fill="gray" />
    //             </g>
    //             <g id="user">
    //                 {circles}
    //             </g>
    //         </svg>
    //     </div>
    // )
}

export default Users;