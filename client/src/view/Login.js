import React, { useState, useRef, useEffect } from 'react';
import axios from "axios";
// info: 회원가입 시 정보 저장 위함.
//       정보 가입할 때 마다 함수 실행하기 때문에 전역변수로 설정.
// loginPw: 로그인 시 아이디 정보 불러오는 시점에 미리 비밀번호 저장하기 위함.
let info = {}, loginPw;
function Login() {

    const sayHi = `Hi. this is fixed-term diary made by Sumin.
    If you want to join us, type(y) in the ID field.`;
    const signUpTxt = `\n Ready to Sign Up.. \n ID must be consist of only alphabet and number. \n And ID must be at least 5 characters.`;
    const ID = `ID:`;
    const PW = `PW:`;
    const NAME = `NAME:`;
    const MSG = `MESSAGE:`;
    const ANSWER = `ANSWER:`;
    const currentText = useRef(sayHi);
    const isSignUp = useRef(false);
    const textBox = useRef(null);
    const [fixedText, setFixedText] = useState(currentText.current);
    const [title, setTitle] = useState(ID);
    
    // fixedText 수정
    const changeCurrentText = (txt, includeTitle = true) =>{
        let _title = "";
        if(includeTitle) _title = title;
        currentText.current += `\n${_title + txt}`;
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
                changeCurrentText("id has to be more than 5 letters", false);
            } else {
                info.id = txt;
                setTitle(PW);
            }
        } else if(title == PW) {
            if(txt.length <= 8) {
                changeCurrentText("pw has to be more than 8 letters", false);
            } else {
                info.pw = txt;
                setTitle(NAME);
            }
        } else if(title == NAME) {
            setTitle(MSG);
            info.name = txt;
        } else if (title == MSG) {
            setTitle(ANSWER);
            info.msg = txt;
            changeCurrentText(`****************************
            **                      **
            **   ID: ${info.id}         **
            **   Password: ${info.pw}   **
            **   Name: ${info.name}            **
            **   message: ${info.msg}    **
            **                        **
            ****************************
            Y: yes, R: rewrite, L: login`, false);
        } else if (title == ANSWER) {
            if(txt == "L") {
                isSignUp.current = false;
                setTitle(ID);
            } else if (txt == "R") {
                setTitle(ID);
            } else if (txt == "Y") {
                axios.post(`/api/signUp`, info).then((res)=>{
                    if(res.data.result) {
                        isSignUp.current = false;
                        changeCurrentText("성공! 로그인하십시오.", false);
                    } else {
                        changeCurrentText("오류. 다시 시도하십시오.", false);
                    }
                    setTitle(ID);
                    
                });
            } else {
                changeCurrentText("wrong answer", false);
            }

        }
    }

    // Y 입력하면 회원가입, 아니면 PW 확인
    const login = (txt) => {
        if(txt == "Y" || txt == "y") {
            isSignUp.current = true;
            changeCurrentText(signUpTxt, false);
            setTitle(ID);
        } else {
            if(title == ID){
                if(txt.length > 5) {
                    const id = txt;
                    axios.get(`/api/getId?id=${id}`).then((res)=>{
                        if (res.data.result.length > 0) {
                            loginPw = res.data.result[0].PW
                            setTitle(PW);
                        } else {
                            changeCurrentText("no such ID", false);
                        }   
                    });
                } else {
                    changeCurrentText("id has to be more than 5 letters", false);
                }
            }
        }
    }

    // 비밀번호 확인
    const isValid = (txt) => {
        if(txt != null && txt.length > 8) {
            if(txt == loginPw) {
                setFixedText(`${fixedText} \n Ready to start..`);
            } else {
                setFixedText(`${fixedText} \n Incorrect Password.`);
            }
        } else {
            changeCurrentText("pw has to be more than 8 letters", false);
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

    useEffect(() => {
        if(textBox.current) {
            textBox.current.scrollTop = textBox.current.scrollHeight;
        }
    }, [fixedText]);
    

    return(
        <div className="login">
            <div className="login-prompt">
                <div className="login-top-bar">
                    <div className="login-top-bar-buttons">
                        <div className="red-button"></div>
                        <div className="yellow-button"></div>
                        <div className="green-button"></div>
                    </div>
                    <div className="login-top-bar-text">
                        &#127968; Welcome to Sumin's Page
                    </div>
                </div>
                <div className="login-text-box" ref={textBox}>
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