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
  console.log("client.app.js");
  const callApi = async()=>{
    axios.get("/api").then((res)=>{console.log("app.js call api callback : ", res.data.result)});
  };

  useEffect(()=>{
    callApi();
  }, []);
  
  return (
    <div className="App">
	...
    </div>
  );
}

export default App;