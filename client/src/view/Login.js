import React, { useState, useRef } from 'react';
function Login() {

    const sayHi = `Hi. this is fixed-term diary made by Sumin.
    If you want to join us, type(y) in the ID field.`;
    const ID = `ID: `;
    const PW = `PW: `;
    const [fixedText, setFixedText] = useState(sayHi);
    const [title, setTitle] = useState(ID);

    // 입력된 텍스트 확인
    const inputText = (txt) => {
        if(title == ID) {
            // 동기처리
            setFixedText(`${fixedText} \n ${title + txt}`);
            isSignUp(txt);
        } else if(title == PW) {
            isValid(txt)
        }
    }

    // Y 입력하면 회원가입, 아니면 PW 확인
    const isSignUp = (txt) => {
        if(txt == "Y" || txt == "y") {
            console.log("회원가입으로 넘기기");
            setFixedText(`${fixedText} \n Ready to Sign Up.. \n ID must be consist of only alphabet and number. \n And ID must be at least 5 characters.`);
            setTitle(ID);
        } else {
            setTitle(PW);
        }
    }

    // 비밀번호 확인
    const isValid = (txt) => {
        if(txt != null && txt != "") {
            setFixedText(`${fixedText} \n Ready to start..`);
        } else {
            setFixedText(`${fixedText} \n Incorrect Password.`);
            setTitle(ID);
        }
    }

    // 엔터 눌렸는지 확인
    const handleOnKeyPress = (e) => {
        if(e.key == 'Enter') {
            const val = e.currentTarget.value;
            inputText(val);
            e.currentTarget.value = "";
        }
    }
    

    return(
        <div className="login">
            <div className="login-prompt">
                <div className="login-top-bar">
                    <div className="login-top-bar-buttons"></div>
                    <div className="login-top-bar-text">
                        Welcome to Sumin's Page
                    </div>
                </div>
                <div className="login-text-box">
                    <div className="written-text">
                        {fixedText}
                    </div>
                    <div className="input-field">
                        <span className="title">
                            {title}
                        </span>
                        <input type="text" className="input-text" onKeyDown={handleOnKeyPress}></input>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;