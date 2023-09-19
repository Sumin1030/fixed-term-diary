import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import DateUtil from '../util/DateUtil';
import GuestBookContent from '../component/GuestBookContent';

function GuestBook() {
    const input = useRef(null);
    const selectedContent = useRef(null);
    const [contents, setContents] = useState([]);

    const getToday = () => {
        let curr = new Date();
        return DateUtil.getDate(DateUtil.getUtc(`${curr.getFullYear()}-${curr.getMonth()+1}-${curr.getDate()+1}`), "desc");
    }

    const sortContents = (contents) => {
        let _contents = [];
        let lastGrandParent;
        let GPindex = -1;
        // 순서대로 정렬하기 위해 depth 0 을 index 0으로 하는 2차배열 생성
        for(let i = 0; i < contents.length; i++) {
            const content = contents[i];
            if(content.DEPTH > 0 && (i+1 == contents.length || (contents[i+1].DEPTH != content.DEPTH))) content.LAST = true;
            if(lastGrandParent != content.GRAND_PARENT) GPindex++; 
            if(!_contents[GPindex]) {
                // 새로운 granparent 맨 처음 생성, 데이터 삽입
                _contents[GPindex] = [];
                _contents[GPindex].push(content);
            } else {
                // depth 1 부터는 거꾸로 탐색하며 정렬
                let length = _contents[GPindex].length-1;
                let last;
                for(let j = length; j >= 0; j--) {
                    last = _contents[GPindex][j];
                    if(last.GUEST_BOOK_SQ == content.PARENT) {
                        // depth는 더 깊지만 부모가 더 위에 있으면 부모 바로 아래로 끼워넣기
                        _contents[GPindex].splice(j+1, 0, content);
                        break;
                    } else if(last.DEPTH == content.DEPTH) {
                        // depth가 같으면 순서대로
                        _contents[GPindex].splice(j+1, 0, content);
                        break;
                    }
                }
            }
            lastGrandParent = content.GRAND_PARENT;
        }
        // last 표시
        // _contents.forEach((contentArr) => {
        //     for(let i = 1; i < contentArr.length - 1; i++) {
        //         const content = contentArr[i];
        //         if(content.DEPTH > contentArr[i+1].DEPTH) content.LAST = true;
        //     }
        //     contentArr[contentArr.length-1].LAST = true;
        // });
        _contents[_contents.length-1][0].LAST = true;
        return _contents;
    }

    const getContent = () => {
        const resultArr = [];
        axios.get(`/api/getGuestBook?today=${getToday()}`).then((res) => {
            let result = res.data.result;
            if(result.length > 0) {
                result = sortContents(result);
                let key = 0;
                result.forEach((contents) => {
                    let last = {};
                    for(let i = 0; i < contents.length; i++) {
                        const content = contents[i];
                        if(content.LAST) last[`${content.DEPTH}`] = true;
                        resultArr.push(<GuestBookContent info={content} key={key++} last={{...last}} onClick={clickContent} />);
                    }
                })
                setContents(resultArr);
            }
        });
    }

    useEffect(() => {
        getContent();
    }, []);

    // 엔터 눌렸는지 확인
    const handleOnKeyPress = (e) => {
        if(e.key == 'Enter') {
            const val = e.currentTarget.value;
            const data = selectedContent.current? selectedContent.current.data : null;
            const utc = DateUtil.getUtc(new Date());
            const sequence = `SQ_${utc}`;
            let currTime = new Date();
            let info;
            if(data) {
                info = {
                    sq: sequence,
                    content: val,
                    date: DateUtil.getDate(utc, "desc"),
                    id: 'gjtnals2',
                    depth: Number(data.d)+1,
                    parent: data.p,
                    grandParent: data.gp
                };
            } else {
                info = {
                    sq: sequence,
                    content: val,
                    date: DateUtil.getDate(utc, "desc"),
                    id: 'gjtnals2',
                    depth: 0,
                    grandParent: sequence
                }
            }
            axios.post("/api/insertGuestBook", info).then((res) => {
                if(res.data.result) getContent();
                else console.log('댓글 insert 실패', res);
            });
            e.currentTarget.value = "";
        }
    }

    const removeSelected = () => {
        if(selectedContent.current && selectedContent.current.dom) {
            selectedContent.current.dom.classList.remove('selected');
            selectedContent.current = null;
        }
    }

    // 댓글 클릭
    //  -> selected 클래스 css 적용 및 해당 댓글 데이터 가져옴
    const clickContent = (e, data) => {
        // 기존 선택한 content 있으면 class 삭제
        if(selectedContent.current && selectedContent.current.dom == e.currentTarget) {
            removeSelected();
            e.stopPropagation();
            return;    
        }
        removeSelected();
        input.current.focus();
        if(data.gp){
            // 방명록 상위 댓글 저장
            selectedContent.current = {
                data: data,
                dom: e.currentTarget
            };
            selectedContent.current.dom.classList.add('selected');
        }
        e.stopPropagation();
    }

    // .guest-book-contents 클릭
    //  -> 빈 공간이면 selected 삭제, 
    const clickContents = (e) => {
        if(!e.target.classList.contains('guest-book-content')) removeSelected();
        e.stopPropagation();
    }



    return(
        <div className="guest-book-outer">
            GuestBook
            <div className="guest-book-inner">
                <div className="guest-book-contents" onClick={clickContents}>{contents}</div>
                <div className="guest-book-input">
                    <input type="text" className="input-text" ref={input} autoFocus onKeyDown={handleOnKeyPress}></input>
                </div>
            </div>
        </div>
    )
}

export default GuestBook;

// user, sequence, depth, 시간, 내용
