import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import DateUtil from '../util/DateUtil';
import GuestBookContent from '../component/GuestBookContent';

function GuestBook() {
    const input = useRef(null);
    const guestBook = useRef(null);
    const [contents, setContents] = useState([]);

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
        _contents[_contents.length-1][0].LAST = true;
        console.log(_contents);
        return _contents;
    }

    const getContent = () => {
        let curr = new Date();
        const _today = new Date(DateUtil.getUtc(new Date(`${curr.getFullYear()}-${curr.getMonth()+1}-${curr.getDate()+1}`)));
        const today = DateUtil.getDate(_today, "desc");
        const resultArr = [];
        axios.get(`/api/getGuestBook?today=${today}`).then((res) => {
            let result = res.data.result;
            if(result.length > 0) {
                result = sortContents(result);
                let key = 0;
                result.forEach((contents) => {
                    let last = {};
                    for(let i = 0; i < contents.length; i++) {
                        const content = contents[i];
                        if(content.LAST) last[`${content.DEPTH}`] = true;
                        resultArr.push(<GuestBookContent info={content} key={key++} last={{...last}}/>);
                    }
                })
                setContents(resultArr);
            }
        });
    }

    useEffect(() => {
        getContent();
    }, []);


    return(
        <div className="guest-book-outer">
            GuestBook
            <div className="guest-book-inner">
                <div className="guest-book-contents" ref={guestBook} onClick={()=>{input.current.focus()}}>{contents}</div>
                <div className="guest-book-input">
                    <input type="text" className="input-text" ref={input} autoFocus ></input>
                </div>
            </div>
        </div>
    )
}

export default GuestBook;

// user, sequence, depth, 시간, 내용
