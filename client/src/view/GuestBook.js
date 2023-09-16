import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import DateUtil from '../util/DateUtil';
import GuestBookContent from '../component/GuestBookContent';

function GuestBook() {
    const input = useRef(null);
    const guestBook = useRef(null);
    const [contents, setContents] = useState([]);

    const sortContents = (contents) => {
        // 같은 depth끼리 모으기
        let _contents = [[]];
        contents.forEach((content) => {
            if(!_contents[content.DEPTH]) _contents[content.DEPTH] = [];
            _contents[content.DEPTH].push(content);
        });
        _contents.forEach((content) => {
            content[content.length-1].LAST = true;
        });
        let result = [];
        for(let i = 0; i < _contents[0].length; i++) {
            const depth0 = _contents[0][i];
            result[depth0.GUEST_BOOK_SQ] = [];
            result[depth0.GUEST_BOOK_SQ].push(depth0);
        }
        for(let i = 1; i < _contents.length; i++) {
            const contents = _contents[i];
            contents.forEach((content) => {
                result[content.PARENT].push(content);
            });
            
        }
        console.log(result);
        return result;
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
                    for(let i = 0; i < contents.length; i++) {
                        const content = contents[i];
                        content.LAST ? resultArr.push(<GuestBookContent info={content} key={key++} last/>) : resultArr.push(<GuestBookContent info={content} key={key++}/>);
                        
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
