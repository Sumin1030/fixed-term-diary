import {useEffect, useState} from 'react';
import axios from 'axios';
// import BlogWrite from './BlogWrite';

function BlogPosting(props) {

    const [content, setContent] = useState([]);
    const getPost = () => {
        axios.get(`/api/getPost?sq=${props.selectedPost}`, {'headers': { "Content-type": "application/json; charset=UTF-8" },'responseType': "blob"}).then((res) => {
            // const _content = res.data.result[0].CONTENT;
            console.log(res.data);
            const newFile = new File([res.data], 'test');
            const reader = new FileReader(); // 1
            reader.onload = (event) => {
                const previewImage = String(event.target?.result);
                setContent(previewImage);
                // setImageURL(previewImage); // 2
            };
            reader.readAsDataURL(newFile); // 3
            // setContent(_content);
        });
    }

    useEffect(() => {
        if(props.selectedPost) {
            getPost();
        }
    }, [props.selectedPost]);

    return (
        <div className="blog-posting">
            {/* {content} */}
            <img src={content}></img>
        </div>
    );
}

export default BlogPosting;