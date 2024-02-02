import closeButton from '../resource/images/closeButton.png';
function BlogWriteTextArea(props) {
    const padding = 10;

    const setHeight = (e) => {
        e.target.style.height = 'auto'; //height 초기화
        const height = (e.target.scrollHeight - padding) + 'px';
        e.target.style.height = height
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