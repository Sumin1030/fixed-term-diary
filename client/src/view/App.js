// import logo from './logo.svg';
// import './App.css';
// // index.js에서 이 코드를 불러다 씀
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
import axios from "axios";
import { useEffect } from 'react';
import { useState } from 'react';
import MainPage from './MainPage';
import Login from './Login';
// import Calander from '../component/Calendar';

function App() {
  // const callApi = ()=>{
  //   axios.get("/api").then((res)=>{console.log("app.js call get api callback : ", res.data.result)});
  //   axios.post("/api").then((res)=>{console.log("app.js call post api callback : ", res.data.result)});
  // };
  const [isLogined, setIsLogined] = useState(false);
  const [content, setContent] = useState();

  const changeLoginState = (state) => {
    setIsLogined(state);
  }

  const MAIN = <MainPage changeState={changeLoginState}/>;
  const LOGIN = <Login changeState={changeLoginState} />;

  // 두 번째 인자에 빈 배열로 넣으면 처음 렌더링 시에만 함수 호출됨.
  useEffect(()=> {
    if(isLogined == 'enter') {
      setContent(MAIN)
    } else {
      axios.get(`/api/isLogined`).then((res) => {
        if(res && !res.data.isLogined) {
          setContent(LOGIN);
        } else if(res && res.data.isLogined) setContent(MAIN);
      });
    }
    }, [isLogined]);

  return (
    <div className="app">
      {content}
    </div>
  );
  // return <Calander />
}

export default App;