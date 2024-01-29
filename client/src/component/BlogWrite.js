import axios from 'axios';
import {useRef} from 'react';

function BlogWrite(props) {

    const padding = 10;

    const handleOnKeyPress = (e) => {
        console.log(e.key, e.target.value);
    }
    const postingArea = useRef(null);

    const addTextArea = () => {
        console.log('addTextArea');
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
                <div className="blog-write-content" ref={postingArea}></div>
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