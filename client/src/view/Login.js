import React, { useState, useRef } from 'react';
let id, pw, name, msg;
function Login() {

    const sayHi = `Hi. this is fixed-term diary made by Sumin.
    If you want to join us, type(y) in the ID field.`;
    const signUpTxt = `\n Ready to Sign Up.. \n ID must be consist of only alphabet and number. \n And ID must be at least 5 characters.`;
    const ID = `ID: `;
    const PW = `PW: `;
    const NAME = `NAME: `;
    const MSG = `MESSAGE: `;
    const ANSWER = `ANSWER: `;
    const currentText = useRef(sayHi);
    const isSignUp = useRef(false);
    const [fixedText, setFixedText] = useState(currentText.current);
    const [title, setTitle] = useState(ID);
    

    // fixedText 수정
    const changeCurrentText = (txt) =>{
        currentText.current += `\n${title + txt}`;
        setFixedText(currentText.current);
    }

    // 입력된 텍스트 확인
    const inputText = (txt) => {
        changeCurrentText(txt);
        if(isSignUp.current) {
            signUp(txt);
        } else if(title == ID) {
            login(txt);
        } else if(title == PW) {
            isValid(txt)
        }
    }
    
    const signUp = (txt) => {
        if(title == ID) {
            if(txt.length <= 5) {
                changeCurrentText("id has to be more than 5 letters");
            } else {
                id = txt;
                setTitle(PW);
            }
        } else if(title == PW) {
            if(txt.length <= 8) {
                changeCurrentText("pw has to be more than 8 letters");
            } else {
                pw = txt;
                setTitle(NAME);
            }
        } else if(title == NAME) {
            setTitle(MSG);
            name = txt;
        } else if (title == MSG) {
            setTitle("ANSWER");
            msg = txt;
            changeCurrentText(`****************************\n
            **                        **\n
            **   ID: ${id}         **\n
            **   Password: ${pw}   **\n
            **   Name: ${name}            **\n
            **   message: ${msg}    **\n
            **                        **\n
            ****************************\nY: yes, R: rewrite, L: login`);
        } else if (title == ANSWER) {
            if(txt == "L") {
                isSignUp.current = false;
                setTitle(ID);
            } else if (txt == "R") {
                setTitle(ID);
            } else if (txt == "Y") {
                changeCurrentText("완료");
            } else {
                changeCurrentText("wrong answer");
            }

        }
    }

    // Y 입력하면 회원가입, 아니면 PW 확인
    const login = (txt) => {
        if(txt == "Y" || txt == "y") {
            isSignUp.current = true;
            changeCurrentText(signUpTxt);
            setTitle(ID);
        } else {
            if(title == ID){
                if(txt != "gjtnals2") {
                    changeCurrentText("no such ID");
                } else {
                    setTitle(PW);
                }
            }
        }
    }

    // 비밀번호 확인
    const isValid = (txt) => {
        if(txt != null && txt != "" && txt == "gjtnals12$") {
            setFixedText(`${fixedText} \n Ready to start..`);
        } else {
            setFixedText(`${fixedText} \n Incorrect Password.`);
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