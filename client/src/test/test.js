import React, { useState, useRef } from 'react';
import Message from './Message';
function Test() {
    
    const [msg, setMsg] = useState([]);
    const msgVal = useRef(null);
    const setlist = (e) => {
        const value = msgVal.current.value;
        const arr = [...msg];
        if(arr.length > 3) arr.pop();
        arr.unshift(value);
        setMsg(arr);
    }

    const keyDown = (e) => {
        if(e.key == 'Enter') {
            if(e.nativeEvent.isComposing == true) setlist(e);
            msgVal.current.value = '';
        }
    }

    return (
      <div className="main">
        <div>
            <input type="text" ref={msgVal} onKeyDown={keyDown}></input>
            <button onClick={setlist}>입력</button>
        </div>
        <div>
            <Message msg={msg}/>
        </div>
      </div>
    );
  }
  
  export default Test;