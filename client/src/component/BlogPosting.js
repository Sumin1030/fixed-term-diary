import {useEffect, useState} from 'react';
import axios from 'axios';
// import BlogWrite from './BlogWrite';

function BlogPosting(props) {

    const [content, setContent] = useState();
    const [title, setTitle] = useState();
    const getPost = () => {
        axios.get(`/api/getPost?sq=${props.selectedPost}`, {
            // 'headers': {"Content-type": "application/json; charset=UTF-8" },
            // 'responseType': "blob"
        }).then((res) => {
            /*
            console.log(res.data);
            const newFile = new File([res.data], 'test');
            const reader = new FileReader(); // 1
            reader.onload = (event) => {
                const previewImage = String(event.target?.result);
                setContent(previewImage);
                // setImageURL(previewImage); // 2
            };
            reader.readAsDataURL(newFile); // 3
            */
            const contentObj = JSON.parse(res.data.CONTENT);
            const _content = [];
            const _title = res.data.TITLE;
            let idx = 1;
            for (const [key, content] of Object.entries(contentObj)) {
                if(content?.type == 'img') {
                    console.log(content.content);
                    _content.push(<img className='image-preview' key={idx++} src={'api'+content.content} />);
                } else {
                    _content.push(<p className='posting-text' key={idx++}>{content}</p>);
                }
            }
            setTitle(_title);
            setContent(_content);
        });
    }

    useEffect(() => {
        if(props.selectedPost) {
            getPost();
        }
    }, [props.selectedPost]);

    return (
        <div className="blog-posting">
            <p className='blog-title'>{title}</p>
            {content}
            {/* <img src={content}></img> */}
        </div>
    );
}

export default BlogPosting;