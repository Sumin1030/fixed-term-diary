import axios from 'axios';
import {useEffect, useState} from 'react';
import BlogWriteTextArea from './BlogWriteTextArea';
let IDX = 1;
function BlogWrite(props) {
    const clickDelete = (e) => {
        const id = e.target.id;
        setDeleteId(id);
    }
    const getTextArea = (idx) => {
        const ta = <BlogWriteTextArea key={idx} idx={idx} clickDelete={clickDelete}/>
        return ta;
    }
    const [postingArea, setPostingArea] = useState([getTextArea(0)]);
    const [deleteId, setDeleteId] = useState();
    let textArr = postingArea;

    const padding = 10;

    useEffect(() => {
        deleteTextArea();
    }, [deleteId]);
    /* 
     버튼으로 textArea, Image 추가하도록 한 이유
     기존 블로그들처럼 text와 image가 어울려서 있으려면 Html 형식으로 저장해야 함.
     (글자 따로, 이미지 따로 저장하면 이미지가 어디에 들어가는지 확인할 수 없으므로.)
     라이브러리 쓰지 않고 수정과 등록을 할 수 있는 방법은 문단별로 텍스트를 쉽게 수정할 수 있어야 하고
     image와 text의 순서를 사용자가 정할 수 있어야 한다.
     그래서 이미지와 이미지 사이의 텍스트를 하나의 textarea로 각각 관리함으로써
     바로바로 수정도 되고, 전체적인 순서 저장도 용이하도록 함.

     -- 티스토리 개발자도구 관찰
     커서가 있는 게 아니라 커서처럼 보이도록 css, js로 한 거 같음.
     입력받아서 엔터 치면 p태그 생성, 내용 쓰면 그 안에 내용값 넣기.
     문제는 수정 시 해당 글자를 클릭하면 그 부분을 입력한 텍스트 값에서 찾아야 함.
     시간이 꽤 걸릴 거 같으므로 보류
    */

    // useEffect(() => {
    //     postingArea[postingArea.length-1].
    // }, []);

    const addTextArea = () => {
        textArr.push(getTextArea(IDX++));
        setPostingArea([...textArr]);
    }

    const deleteTextArea = () => {
        let idx;
        if(deleteId) {
            let _idx = 0;
            textArr.filter((textArea) => {
                if(textArea.key == deleteId) {
                    idx = _idx;
                    return;
                }
                _idx++;
            });
            textArr.splice(idx, 1);
            setPostingArea([...textArr]);
        }
    }

    const addImage = () => {
        console.log('addImage');
    }

    // 제목 작성 시 엔터 입력되지 않도록 함.
    const checkEnter = (e) => {
        if(e.key == 'Enter') e.nativeEvent.returnValue = false;
    }

    // textErea height 조절
    const setTitleHeight = (e) => {
        e.target.style.height = 'auto'; //height 초기화
        e.target.style.height = (e.target.scrollHeight - padding) + 'px';
    }

    return (
        <div className="blog-write">
            <div className="blog-write-area">
                <div className="blog-write-title">
                    <textarea className='blog-write-title-input input-text' type='text' placeholder='title' onKeyPress={checkEnter} onChange={setTitleHeight} rows={1}></textarea>
                </div>
                <div className="blog-write-content">
                    {postingArea}
                </div>
            </div>
            <div className="blog-write-button">
                <div className="add-textarea" onClick={addTextArea}>TEXT</div>
                <div className="add-image" onClick={addImage}>IMAGE</div>
            </div>
            {/* <textarea className='input-text' onKeyDown={handleOnKeyPress}/> */}
        </div>
    );
}

export default BlogWrite;