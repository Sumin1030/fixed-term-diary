import closeButton from '../resource/images/closeButton.png';
// import {use} from 'react';
function BlogWriteTextArea(props) {
    let txt;
    const padding = 10;

    const setHeight = (e) => {
        e.target.style.height = 'auto'; //height 초기화
        const height = (e.target.scrollHeight - padding) + 'px';
        e.target.style.height = height
        txt = e.target.value;
        props.setTxt(props.idx, e.target.value);
    }

    return (
        <div id={props.idx} className='blog-text-area'>
            <div className='blog-text-area-delete' onClick={props.clickDelete}>
                <img alt="X" src={closeButton} id={props.idx}/>
            </div>
            <textarea className='input-text blog-write-content-input' autoFocus onChange={setHeight}></textarea>
        </div>
    );
}

export default BlogWriteTextArea;