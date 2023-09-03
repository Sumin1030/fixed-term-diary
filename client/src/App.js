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

function App() {
  // const callApi = ()=>{
  //   axios.get("/api").then((res)=>{console.log("app.js call get api callback : ", res.data.result)});
  //   axios.post("/api").then((res)=>{console.log("app.js call post api callback : ", res.data.result)});
  // };

  // 두 번째 인자에 빈 배열로 넣으면 처음 렌더링 시에만 함수 호출됨.
  // useEffect(()=>{
  //   callApi();
  // }, []);
  
  return (
    <div className="App">
    </div>
  );
}

export default App;