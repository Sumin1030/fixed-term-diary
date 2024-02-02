import {useEffect, useState} from 'react';
import axios from 'axios';
// import BlogWrite from './BlogWrite';

function BlogPosting(props) {

    const [content, setContent] = useState([]);

    const getPost = () => {
        axios.get(`/api/getPost?sq=${props.selectedPost}`).then((res) => {
            const _content = res.data.result[0].CONTENT;
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
            {content}
        </div>
    );
}

export default BlogPosting;